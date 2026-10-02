"""
Lead Capture Service.
Validates contact information, logs consent, stores in multi-tenant leads table,
and dispatches notifications.
"""

import re
from typing import Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text


class LeadValidationError(Exception):
    pass


class LeadService:
    @staticmethod
    def validate_phone(phone: str) -> str:
        """Strip non-digits and validate 10+ digits."""
        digits = re.sub(r"\D", "", phone)
        if len(digits) < 10:
            raise LeadValidationError("Please provide a valid 10-digit mobile number.")
        return digits

    @staticmethod
    def validate_email(email: Optional[str]) -> Optional[str]:
        if not email:
            return None
        cleaned = email.strip()
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", cleaned):
            raise LeadValidationError("Please provide a valid email address.")
        return cleaned

    async def create_lead(
        self,
        session: AsyncSession,
        tenant_id: str,
        bot_id: str,
        name: str,
        phone: str,
        email: Optional[str] = None,
        need: Optional[str] = None,
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        cleaned_name = name.strip()
        if not cleaned_name:
            raise LeadValidationError("Please provide your name.")
            
        cleaned_phone = self.validate_phone(phone)
        cleaned_email = self.validate_email(email)

        stmt = text("""
            INSERT INTO leads (tenant_id, bot_id, conversation_id, name, phone, email, need, consent_at, status)
            VALUES (:tenant_id, :bot_id, :conversation_id, :name, :phone, :email, :need, NOW(), 'new')
            RETURNING id, created_at;
        """)

        result = await session.execute(
            stmt,
            {
                "tenant_id": tenant_id,
                "bot_id": bot_id,
                "conversation_id": conversation_id,
                "name": cleaned_name,
                "phone": cleaned_phone,
                "email": cleaned_email,
                "need": need or ""
            }
        )
        row = result.fetchone()

        return {
            "lead_id": str(row.id),
            "name": cleaned_name,
            "phone": cleaned_phone,
            "email": cleaned_email,
            "created_at": row.created_at.isoformat(),
            "status": "new"
        }
