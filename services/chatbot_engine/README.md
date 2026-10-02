# SAURIK IT — Multi-Tenant AI Chatbot Engine (Done-For-You Phase A)

Production-grade, multi-tenant grounded RAG engine and lightweight embeddable Shadow-DOM widget for B2B client deployments in Tripura & Northeast India.

---

## 1. System Architecture

```
Client Website (Wix, WordPress, HTML, React)
    │
    ▼
<script async src=".../widget.js" data-bot-key="pk_live_...">
    │ (Shadow DOM encapsulation — 100% immune to host CSS reset)
    │ (Zero-cost native Web Speech STT/TTS toggle)
    │
    ▼
POST /v1/widget/session (Origin check against bot_domains table)
    │ (Returns 24h JWT visitor session token)
    │
    ▼
POST /v1/chat
    │
    ▼
FastAPI Application
    │
    ├── 1. Tenant RLS Session: SET LOCAL app.tenant_id = :tenant_id
    ├── 2. Vector Cosine Search (pgvector HNSW index on 1536-dim embeddings)
    ├── 3. Anti-Hallucination Guardrail: If similarity < threshold (0.65), 
    │      returns zero-guess human handoff (wa.me link) without LLM call
    ├── 4. Grounded Delimited Generation: Wraps verified sources in <<<SOURCE>>> blocks
    └── 5. Usage Metering: Logs token consumption and INR cost to usage_events
```

---

## 2. Directory Structure

```
services/chatbot_engine/
├── app/
│   ├── main.py                  # FastAPI entry point (/v1/widget/session, /v1/chat, /v1/leads, /health)
│   ├── config.py                # Environment configuration & defaults
│   ├── db.py                    # Async connection pool & tenant RLS session manager
│   ├── providers/               # Abstract adapter interface (OpenAI, OpenRouter, Anthropic)
│   │   ├── base.py
│   │   ├── factory.py
│   │   ├── openai_provider.py
│   │   └── openrouter_provider.py
│   └── services/
│       ├── rag_service.py       # Vector retrieval, citation grounding & anti-hallucination
│       └── lead_service.py      # Visitor lead validation & consent logging
├── db/
│   └── migrations/
│       └── 001_initial_schema.sql # PostgreSQL + pgvector + RLS policies on all 16 tables
├── ingestion/
│   ├── crawler.py               # Domain-scoped web crawler with page capping
│   ├── parser.py                # HTML & PDF parser with indirect injection stripping
│   └── chunker.py               # 600-word sliding window chunker with SHA-256 deduplication
├── widget/
│   └── widget.js                # Standalone vanilla JS Shadow-DOM embeddable widget (<15KB)
├── tests/
│   ├── test_tenant_isolation.py # Verifies 0% cross-tenant data leakage
│   └── test_grounding.py        # Verifies citation integrity and out-of-scope handoffs
└── requirements.txt             # Python 3.12 dependencies
```

---

## 3. Quickstart & Deployment

### 3.1 Database Setup (PostgreSQL with pgvector)
Run a local or cloud Postgres container with pgvector:
```bash
docker run -d --name saurik-pgvector \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=saurik_chatbot \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```
Apply migration DDL:
```bash
psql -U postgres -d saurik_chatbot -f db/migrations/001_initial_schema.sql
```

### 3.2 Running the FastAPI Service
```bash
cd services/chatbot_engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3.3 Running Unit Tests
```bash
pytest tests/ -v
```

---

## 4. Client Website Embedding
Embed on any client website by placing this single script tag before `</body>`:

```html
<script 
  async 
  src="https://www.saurikit.in/widget/widget.js" 
  data-bot-key="pk_live_your_client_key"
  data-api-base="https://api.saurikit.in">
</script>
```

### Key Embed Features:
- **Zero Style Collision:** Rendered in an isolated Shadow Root; host CSS never breaks the UI.
- **WhatsApp Handoff:** Dedicated direct button opens `wa.me` with prefilled context.
- **Zero-Cost Voice:** Uses browser-native Web Speech API (`SpeechRecognition` + `SpeechSynthesis`) with **zero recurring voice API costs**, strictly adhering to the repository voice engine rule.
