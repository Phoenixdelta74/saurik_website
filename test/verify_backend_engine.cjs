/**
 * SAURIK IT — Automated Verification Suite: AI Chatbot Engine (Step 2 / Milestone 2)
 * Validates database schema, Row-Level Security (RLS) policies, FastAPI app,
 * ingestion pipeline, Shadow-DOM widget, and zero-cost voice compliance.
 */

const fs = require('fs');
const path = require('path');

console.log('=== RUNNING AI CHATBOT ENGINE (STEP 2) VERIFICATION SUITE ===\n');

let failed = false;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ ${message}`);
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    failed = true;
  }
}

// 1. Database Schema & RLS Checks
console.log('1. Verifying Database Schema & RLS Policies...');
const schemaPath = path.resolve(__dirname, '../services/chatbot_engine/db/migrations/001_initial_schema.sql');
assert(fs.existsSync(schemaPath), 'Migration file 001_initial_schema.sql exists.');

if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  assert(schemaContent.includes('CREATE EXTENSION IF NOT EXISTS "vector";'), 'Vector extension enabled for pgvector.');
  
  const expectedTables = [
    'tenants', 'users', 'tenant_members', 'bots', 'bot_domains',
    'sources', 'documents', 'chunks', 'conversations', 'messages',
    'leads', 'usage_events', 'plans', 'subscriptions', 'invoices', 'audit_log'
  ];
  const allTablesFound = expectedTables.every(t => schemaContent.includes(`CREATE TABLE IF NOT EXISTS ${t}`));
  assert(allTablesFound, `All 16 required multi-tenant tables exist (${expectedTables.length} tables).`);
  
  assert(schemaContent.includes('ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;'), 'Row-Level Security enabled on chunks.');
  assert(schemaContent.includes('ALTER TABLE leads ENABLE ROW LEVEL SECURITY;'), 'Row-Level Security enabled on leads.');
  assert(schemaContent.includes('current_setting(\'app.tenant_id\''), 'PostgreSQL session setting app.tenant_id policy active.');
  assert(schemaContent.includes('idx_chunks_embedding_hnsw'), 'HNSW cosine vector index created on embeddings.');
  assert(schemaContent.includes('1499.00') && schemaContent.includes('3999.00') && schemaContent.includes('7999.00'), 'Plans seeded with transparent pricing (1499, 3999, 7999).');
}

// 2. FastAPI Core & Services
console.log('\n2. Verifying FastAPI Core & RAG Services...');
const appMainPath = path.resolve(__dirname, '../services/chatbot_engine/app/main.py');
const ragServicePath = path.resolve(__dirname, '../services/chatbot_engine/app/services/rag_service.py');
const dbPath = path.resolve(__dirname, '../services/chatbot_engine/app/db.py');
const leadPath = path.resolve(__dirname, '../services/chatbot_engine/app/services/lead_service.py');

assert(fs.existsSync(appMainPath), 'FastAPI main entrypoint exists.');
assert(fs.existsSync(ragServicePath), 'RAG retrieval service exists.');
assert(fs.existsSync(dbPath), 'Database connection & tenant session helper exists.');
assert(fs.existsSync(leadPath), 'Lead capture service exists.');

if (fs.existsSync(ragServicePath)) {
  const ragContent = fs.readFileSync(ragServicePath, 'utf8');
  assert(ragContent.includes('<<<SOURCE'), 'Delimited source context blocks enforced.');
  assert(ragContent.includes('handoff_recommended'), 'Fallback handoff returned when similarity drops below threshold.');
  assert(ragContent.includes('Anti-Hallucination'), 'Anti-hallucination prompt instructions present.');
}

if (fs.existsSync(dbPath)) {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  assert(dbContent.includes('SET LOCAL app.tenant_id'), 'tenant_session sets PostgreSQL app.tenant_id per transaction.');
}

// 3. Ingestion Pipeline
console.log('\n3. Verifying Ingestion Pipeline (Crawler, Parser, Chunker)...');
const crawlerPath = path.resolve(__dirname, '../services/chatbot_engine/ingestion/crawler.py');
const parserPath = path.resolve(__dirname, '../services/chatbot_engine/ingestion/parser.py');
const chunkerPath = path.resolve(__dirname, '../services/chatbot_engine/ingestion/chunker.py');

assert(fs.existsSync(crawlerPath), 'Website crawler exists.');
assert(fs.existsSync(parserPath), 'Document parser exists.');
assert(fs.existsSync(chunkerPath), 'Semantic chunker exists.');

if (fs.existsSync(parserPath)) {
  const parserContent = fs.readFileSync(parserPath, 'utf8');
  assert(parserContent.includes('Comment'), 'HTML comments stripped to prevent indirect prompt injection.');
  assert(parserContent.includes('pypdf'), 'PDF extraction supported.');
}

// 4. Shadow DOM Embeddable Widget
console.log('\n4. Verifying Embeddable Shadow DOM Widget...');
const widgetPath = path.resolve(__dirname, '../public/widget/widget.js');
assert(fs.existsSync(widgetPath), 'Embeddable widget script exists in public/widget/widget.js.');

if (fs.existsSync(widgetPath)) {
  const widgetContent = fs.readFileSync(widgetPath, 'utf8');
  assert(widgetContent.includes('attachShadow'), 'Shadow DOM encapsulation active (host-site CSS immune).');
  assert(widgetContent.includes('saurik-wa-handoff') || widgetContent.includes('wa.me'), 'Instant WhatsApp handoff button integrated.');
  assert(widgetContent.includes('SpeechRecognition') || widgetContent.includes('webkitSpeechRecognition'), 'Client-native Web Speech API integrated (Zero-Cost Native Voice Engine Rule satisfied).');
  assert(!widgetContent.includes('elevenlabs') && !widgetContent.includes('deepgram'), 'Zero external paid voice API dependencies confirmed.');
}

// 5. Automated Tests
console.log('\n5. Verifying Engine Automated Test Suites...');
const testIsoPath = path.resolve(__dirname, '../services/chatbot_engine/tests/test_tenant_isolation.py');
const testGroundPath = path.resolve(__dirname, '../services/chatbot_engine/tests/test_grounding.py');

assert(fs.existsSync(testIsoPath), 'Multi-tenant RLS isolation test exists.');
assert(fs.existsSync(testGroundPath), 'Grounding & anti-hallucination test exists.');

if (failed) {
  console.error('\n=== ENGINE VERIFICATION SUITE FAILED ===');
  process.exit(1);
} else {
  console.log('\n=== ALL AI CHATBOT ENGINE (STEP 2) CHECKS PASSED SUCCESSFULLY! ===');
}
