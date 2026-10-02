"""
SAURIK IT — Multi-Tenant AI Chatbot Engine
FastAPI Application Entry Point.
"""

from typing import List, Dict, Any, Optional
from fastapi import FastAPI, Depends, HTTPException, Header, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import jwt
from datetime import datetime, timedelta, timezone

from .config import settings
from .db import get_db, tenant_session
from .services.rag_service import RAGService
from .services.lead_service import LeadService, LeadValidationError
from .providers.factory import get_llm_provider

app = FastAPI(
    title="Saurik AI Chatbot Engine API",
    description="Multi-tenant grounded RAG engine and embeddable widget backend for SAURIK IT B2B clients.",
    version="1.0.0"
)

# Enable permissive CORS for widget requests (origin security handled explicitly via bot_domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_service = RAGService()
lead_service = LeadService()


# ------------------------------------------------------------------------------
# Schemas
# ------------------------------------------------------------------------------
class SessionInitRequest(BaseModel):
    public_key: str  # pk_live_...
    visitor_id: str


class SessionInitResponse(BaseModel):
    session_token: str
    bot_name: str
    greeting_message: str
    brand_color: str
    handoff_whatsapp: Optional[str] = None
    suggested_questions: List[str] = []


class ChatMessage(BaseModel):
    role: str  # user | assistant
    content: str


class ChatRequest(BaseModel):
    session_token: str
    messages: List[ChatMessage]


class ChatResponsePayload(BaseModel):
    answer: str
    citations: List[Dict[str, Any]]
    confidence: float
    handoff_recommended: bool


class LeadCaptureRequest(BaseModel):
    session_token: str
    name: str
    phone: str
    email: Optional[str] = None
    need: Optional[str] = None


# ------------------------------------------------------------------------------
# Helper: Verify Visitor Session Token
# ------------------------------------------------------------------------------
def decode_session_token(token: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, settings.SESSION_TOKEN_SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired widget session token."
        )


# ------------------------------------------------------------------------------
# Routes
# ------------------------------------------------------------------------------
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": "1.0.0"
    }


@app.post("/v1/widget/session", response_model=SessionInitResponse)
async def init_widget_session(
    payload: SessionInitRequest,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    Validates origin against bot_domains, verifies public key,
    and returns a short-lived visitor session token.
    """
    origin = request.headers.get("origin") or request.headers.get("referer") or ""
    clean_origin = origin.split("?")[0].rstrip("/")

    # Query bot by public key
    stmt = text("""
        SELECT b.id, b.tenant_id, b.name, b.greeting_message, b.brand_color, b.handoff_whatsapp,
               COALESCE(array_agg(bd.origin) FILTER (WHERE bd.origin IS NOT NULL), '{}') AS allowed_origins
        FROM bots b
        LEFT JOIN bot_domains bd ON b.id = bd.bot_id
        WHERE b.public_key = :pk AND b.status = 'active'
        GROUP BY b.id, b.tenant_id, b.name, b.greeting_message, b.brand_color, b.handoff_whatsapp;
    """)

    result = await db.execute(stmt, {"pk": payload.public_key})
    row = result.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Active chatbot not found for the provided key.")

    # Origin check (bypass only if origin list is empty / localhost development)
    allowed_origins = row.allowed_origins
    if allowed_origins and clean_origin:
        if not any(clean_origin.startswith(allowed.rstrip("/")) for allowed in allowed_origins):
            raise HTTPException(
                status_code=403,
                detail=f"Origin '{clean_origin}' is not authorized to embed this chatbot."
            )

    # Issue 24-hour visitor session JWT
    token_payload = {
        "tenant_id": str(row.tenant_id),
        "bot_id": str(row.id),
        "bot_name": row.name,
        "visitor_id": payload.visitor_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24)
    }
    token = jwt.encode(token_payload, settings.SESSION_TOKEN_SECRET, algorithm="HS256")

    return SessionInitResponse(
        session_token=token,
        bot_name=row.name,
        greeting_message=row.greeting_message or "Hello! How can I help you today?",
        brand_color=row.brand_color or "#0d9488",
        handoff_whatsapp=row.handoff_whatsapp,
        suggested_questions=[
            "What services do you offer?",
            "What are your business hours?",
            "How can I get a quotation?",
            "Can I speak with a human on WhatsApp?"
        ]
    )


@app.post("/v1/chat", response_model=ChatResponsePayload)
async def chat_completion(payload: ChatRequest):
    """
    RAG chat completion strictly scoped to tenant_id under PostgreSQL RLS.
    """
    session_data = decode_session_token(payload.session_token)
    tenant_id = session_data["tenant_id"]
    bot_id = session_data["bot_id"]
    bot_name = session_data["bot_name"]

    # Execute in tenant-isolated database session
    async with tenant_session(tenant_id) as session:
        formatted_messages = [{"role": m.role, "content": m.content} for m in payload.messages]
        
        result = await rag_service.answer_query(
            session=session,
            tenant_id=tenant_id,
            bot_id=bot_id,
            bot_name=bot_name,
            messages=formatted_messages,
            threshold=settings.SIMILARITY_THRESHOLD_DEFAULT
        )

        # Log usage tokens
        if result.get("tokens_in") or result.get("tokens_out"):
            total_tokens = (result.get("tokens_in") or 0) + (result.get("tokens_out") or 0)
            await session.execute(
                text("""
                    INSERT INTO usage_events (tenant_id, bot_id, kind, units, cost_inr)
                    VALUES (:tenant_id, :bot_id, 'llm_query', :units, :cost);
                """),
                {
                    "tenant_id": tenant_id,
                    "bot_id": bot_id,
                    "units": total_tokens,
                    "cost": (total_tokens / 1000.0) * 0.05  # Approximate INR cost calculation
                }
            )

        return ChatResponsePayload(
            answer=result["answer"],
            citations=result["citations"],
            confidence=result["confidence"],
            handoff_recommended=result["handoff_recommended"]
        )


@app.post("/v1/leads")
async def capture_lead(payload: LeadCaptureRequest):
    """
    Captures visitor lead and logs consent in the multi-tenant database.
    """
    session_data = decode_session_token(payload.session_token)
    tenant_id = session_data["tenant_id"]
    bot_id = session_data["bot_id"]

    try:
        async with tenant_session(tenant_id) as session:
            lead = await lead_service.create_lead(
                session=session,
                tenant_id=tenant_id,
                bot_id=bot_id,
                name=payload.name,
                phone=payload.phone,
                email=payload.email,
                need=payload.need
            )
            return {"status": "success", "lead": lead}
    except LeadValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
