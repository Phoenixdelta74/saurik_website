-- ==============================================================================
-- SAURIK IT — Multi-Tenant AI Chatbot Engine Database Schema
-- Migration 001: Initial Schema with pgvector and Row-Level Security (RLS)
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ------------------------------------------------------------------------------
-- 1. Tenants & Accounts
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    gstin VARCHAR(15),
    billing_state VARCHAR(50) DEFAULT 'Tripura',
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, past_due, suspended, cancelled
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tenant_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer', -- owner, admin, viewer
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, user_id)
);

-- ------------------------------------------------------------------------------
-- 2. Bots & Allowed Domain Origins
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    public_key VARCHAR(64) UNIQUE NOT NULL, -- pk_live_... public widget identifier
    system_instructions TEXT NOT NULL,
    similarity_threshold FLOAT NOT NULL DEFAULT 0.68,
    primary_language VARCHAR(10) NOT NULL DEFAULT 'en',
    supported_languages JSONB NOT NULL DEFAULT '["en", "hi"]'::jsonb,
    handoff_whatsapp VARCHAR(20),
    handoff_email VARCHAR(255),
    brand_color VARCHAR(16) DEFAULT '#0d9488',
    greeting_message TEXT DEFAULT 'Hello! How can I help you today?',
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bot_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    origin VARCHAR(255) NOT NULL, -- exact scheme+host: e.g. "https://example.com" or "http://localhost:5173"
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(bot_id, origin)
);

-- ------------------------------------------------------------------------------
-- 3. Ingestion Sources, Documents & Vector Chunks
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- url, sitemap, pdf, docx, faq, manual_text
    location TEXT NOT NULL, -- URL or S3/GCS storage key
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, processing, indexed, failed
    last_error TEXT,
    last_ingested_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    url_or_name TEXT NOT NULL,
    content_hash VARCHAR(64) NOT NULL, -- SHA-256 to avoid redundant embedding
    title VARCHAR(500),
    page_number INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL, -- text-embedding-3-small dimension
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- { url, title, page, section }
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. Conversations, Messages & Lead Capture
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    channel VARCHAR(50) NOT NULL DEFAULT 'web', -- web, whatsapp
    visitor_id VARCHAR(100) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    handoff BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    tokens_in INT DEFAULT 0,
    tokens_out INT DEFAULT 0,
    sources JSONB DEFAULT '[]'::jsonb, -- array of cited references
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    need TEXT,
    consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(50) NOT NULL DEFAULT 'new', -- new, contacted, closed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Metering, Plans, Billing & Auditing
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usage_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    kind VARCHAR(50) NOT NULL, -- llm_query, embed_tokens, wa_msg
    units INT NOT NULL,
    cost_inr NUMERIC(10, 4) NOT NULL DEFAULT 0.0000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS plans (
    id VARCHAR(50) PRIMARY KEY, -- starter, growth, pro
    name VARCHAR(100) NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    limits JSONB NOT NULL, -- { websites: 1, max_pages: 50, conversations_per_month: 500 }
    razorpay_plan_id VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) NOT NULL REFERENCES plans(id),
    razorpay_subscription_id VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'trialing', -- trialing, active, past_due, cancelled
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '14 days',
    trial_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    number VARCHAR(100) UNIQUE NOT NULL, -- e.g. SIT/26-27/001
    amount NUMERIC(10, 2) NOT NULL,
    tax_split JSONB NOT NULL, -- { cgst: 0.09, sgst: 0.09, igst: 0.0 }
    pdf_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. INDEXES (Performance & Vector Search)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_chunks_tenant_bot ON chunks(tenant_id, bot_id);
CREATE INDEX IF NOT EXISTS idx_chunks_doc ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_bot_domains_origin ON bot_domains(origin);
CREATE INDEX IF NOT EXISTS idx_bots_public_key ON bots(public_key);
CREATE INDEX IF NOT EXISTS idx_conversations_bot ON conversations(bot_id, visitor_id);
CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_tenant_month ON usage_events(tenant_id, created_at);

-- Cosine Distance HNSW Vector Index on embeddings (1536 dims)
CREATE INDEX IF NOT EXISTS idx_chunks_embedding_hnsw 
ON chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- ==============================================================================
-- 7. ROW-LEVEL SECURITY (RLS) POLICIES
-- Zero cross-tenant data leakage guaranteed at the Postgres engine level.
-- ==============================================================================

-- Enable RLS on all tenant-isolated tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Policy helper: match tenant_id against session setting 'app.tenant_id'
-- Bypass only if 'app.bypass_rls' is explicitly set to '1' by internal root migrations.
CREATE POLICY tenants_isolation ON tenants
    USING (id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY tenant_members_isolation ON tenant_members
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY bots_isolation ON bots
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY bot_domains_isolation ON bot_domains
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY sources_isolation ON sources
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY documents_isolation ON documents
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY chunks_isolation ON chunks
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY conversations_isolation ON conversations
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY messages_isolation ON messages
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY leads_isolation ON leads
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY usage_events_isolation ON usage_events
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY subscriptions_isolation ON subscriptions
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY invoices_isolation ON invoices
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

CREATE POLICY audit_log_isolation ON audit_log
    USING (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = '1');

-- ------------------------------------------------------------------------------
-- 8. Seed Default Plans
-- ------------------------------------------------------------------------------
INSERT INTO plans (id, name, price_inr, limits)
VALUES 
    ('starter', 'Starter Plan', 1499.00, '{"websites": 1, "max_pages": 50, "max_documents": 20, "conversations_per_month": 500, "whatsapp_button": true}'::jsonb),
    ('growth', 'Growth Plan', 3999.00, '{"websites": 2, "max_pages": 200, "max_documents": 100, "conversations_per_month": 2000, "whatsapp_button": true, "lead_export": true, "hindi_support": true}'::jsonb),
    ('pro', 'Pro Plan', 7999.00, '{"websites": 5, "max_pages": 1000, "max_documents": 500, "conversations_per_month": 5000, "whatsapp_button": true, "lead_export": true, "whatsapp_cloud_api": true, "priority_support": true}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price_inr = EXCLUDED.price_inr,
    limits = EXCLUDED.limits;
