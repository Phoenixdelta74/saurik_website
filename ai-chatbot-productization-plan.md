# SAURIK IT — AI Chatbot Productization: Implementation Plan

> **Audience:** AI coding/content agents and the founder.
> **Goal:** Turn the AI chat/voice assistant already running on https://www.saurikit.in into a product that SAURIK IT sells to other businesses, and sell it through the website.
> **Status:** Plan v1 — 28 Sep 2026. Research-backed; items marked **[VERIFY]** must be re-checked against the live source before shipping because they change often.

---

## 0. How agents should use this document

1. Read sections 1–4 fully before starting any task.
2. Work phase by phase (section 6). Each phase has **Tasks**, **Deliverables** and **Acceptance criteria**. A phase is done only when every acceptance criterion passes.
3. Tick checkboxes in this file (or the tracker it is copied into) as you complete them. Add a one-line note with the commit/PR link.
4. If a task depends on an **Open decision** (section 3) that the founder has not answered, use the stated **default** and log it in `DECISIONS.md` — do not block.
5. Never stop to ask about things you can discover from the codebase. Do stop and ask before anything irreversible: production deploys, DNS changes, live payment keys, deleting data, sending messages to real customers.
6. **Agent rules (hard):**
   - No secrets in code, commits, logs, or this file. Use environment variables / a secret manager.
   - Razorpay, WhatsApp and LLM providers: **test/sandbox mode only** until the founder approves go-live.
   - Every table holding customer data must have tenant isolation (section 5.3). No exceptions.
   - Do not invent customer testimonials, client logos, statistics, or case studies on the website. The site currently (correctly) labels its example as hypothetical — keep that honesty.
   - Every new public page must pass the SEO checklist in section 6, Phase 1.

---

## 1. Business context (facts from the live site)

| Item | Value |
|---|---|
| Company | SAURIK IT Private Limited, Agartala, Tripura |
| Positioning | Software, field-team tools, IT hardware for Tripura & Northeast India |
| Existing products | Saurik Track (field ERP, live), Arthos Invoice Studio (GST invoicing, early access) |
| Existing AI | Site-wide widget labelled "AI Voice & Chat • Talk or Ask" |
| Enquiry flow | `/contact` builds an email draft or opens WhatsApp (`wa.me/919862087157`); topic preselected via `?topic=` (e.g. `saurik_track`, `custom_apps`, `hardware_quote`) |
| Contact | contact@saurikit.in, +91 98620 87157 |
| SEO base | Clean robots.txt, 15-URL sitemap, canonical + OG tags present |

**Known site bugs to fix while touching these pages** (from the SEO audit):
- Phone link is `tel:+9198620 87157` (contains a space) → should be `tel:+919862087157`.
- `og:locale` is `en_US` → `en_IN`.
- On `/contact`, `twitter:url` points to the homepage instead of `/contact`.
- Sitemap uses `/track/` and `/arthos/` with trailing slash; internal links do not. Pick one form and make canonicals match.

---

## 2. Product definition

### 2.1 What we sell
An **AI assistant for business websites (and optionally WhatsApp)** that:
- Answers visitor questions **only from the client's approved content** (website pages, PDFs, FAQs, price lists) with source links.
- Captures leads (name, phone, need) and hands off to a human via WhatsApp/email when unsure or when asked.
- Works in English and Hindi at launch; Bengali and Kokborok only after quality testing (do not advertise a language until it passes the eval set in Phase 9).
- Is installed with one `<script>` tag.

### 2.2 Offer model (phased)
1. **Phase A — Done-for-you (sell immediately):** SAURIK sets up, trains, hosts and maintains the bot per client. Sold via enquiry → quote → payment link. Needs only the product page (Phase 1) plus the multi-tenant backend being able to host more than one bot (Phase 2–3).
2. **Phase B — Self-serve SaaS:** client signs up, uploads content, pays by subscription, copies the embed code. Needs Phases 4–5.
3. **Bundles:** "Website + AI assistant" package for website-development clients; AI assistant add-on for Saurik Track customers' public sites.

### 2.3 Market reference (for pricing sanity, **[VERIFY]** before publishing)
- Indian SMB-focused AI chatbot plans are commonly advertised from roughly ₹499/month, with ₹1,999–₹9,999/month described as the typical SMB range; one guide cites ₹5,000–₹25,000/month for small businesses on fuller service.
- Global self-serve tools used by Indian SMBs: Chatbase (free to ~₹3,500/month), Tidio Lyro (AI plans from ~₹2,500/month).
- For a managed, mid-market production bot, one Indian consultancy estimates ₹40,000–60,000/month all-in, with LLM API usage typically the largest ongoing cost.

### 2.4 Proposed pricing (starting hypothesis — founder decides)
All prices **+18% GST**. Annual billing = 10× monthly (2 months free).

| Plan | Monthly | Included | Channel |
|---|---|---|---|
| Starter | ₹1,499 | 1 website, up to 50 pages / 20 docs, 500 conversations/mo, lead capture to email | Web widget |
| Growth | ₹3,999 | 2 websites, 200 pages / 100 docs, 2,000 conversations/mo, WhatsApp handoff button, lead export, Hindi | Web widget |
| Pro | ₹7,999 | 5 websites, 5,000 conversations/mo, WhatsApp Business API channel (Meta charges passed through at cost), priority support | Web + WhatsApp |
| Done-for-you setup | ₹4,999–₹14,999 one-time | Content collection, cleanup, tuning, installation, 30-day tuning period | — |

Rules:
- Overage: soft warning at 80%, hard cap at 100% with a polite "please contact us on WhatsApp" fallback (never silently keep spending LLM budget). Overage packs sold in blocks.
- WhatsApp messaging fees are **not** included in plan price; they are metered and billed at Meta's rate (see Phase 6).
- Before publishing, run the unit-economics check in Phase 9.4: gross margin per plan must be ≥ 60% at 100% usage.

---

## 3. Open decisions (defaults let agents proceed)

| # | Question for founder | Default if unanswered |
|---|---|---|
| D1 | Launch with done-for-you only, or self-serve too? | Done-for-you first (Phases 0–3, 7, 8), self-serve after |
| D2 | Final prices | Table in 2.4, marked "Starting from" on site |
| D3 | Brand name for the product | "Saurik Assist" (placeholder; check trademark/domain availability first) |
| D4 | LLM provider & model | Keep whatever the current site bot uses; abstract behind a provider interface |
| D5 | Hosting region | India region (e.g. Mumbai) for DB and app servers |
| D6 | WhatsApp: own Cloud API integration or via a BSP? | Via Meta Cloud API directly if the team can run it; otherwise a zero-markup BSP |
| D7 | Invoicing: Arthos or Razorpay invoices? | Arthos Invoice Studio generates GST invoices from payment webhooks (dogfooding) |
| D8 | Free trial length | 14 days, self-serve only, capped at 100 conversations, no card for done-for-you demos |
| D9 | GST SAC code | Confirm with CA; sources differ between 998314 and 998315 for SaaS |

---

## 4. Target architecture

```
                     ┌────────────────────────── saurikit.in ───────────────────────────┐
Visitor ──> Product page /ai-chatbot ──> Demo (live widget) ──> Pricing ──> Signup/Enquiry
                                                                              │
                                                  ┌───────────────────────────┴──────────┐
                                                  │   Client dashboard (app.<domain>)     │
                                                  │   bots, sources, leads, usage, billing│
                                                  └───────────────┬──────────────────────┘
Client's website                                                  │
 <script src=widget.js data-bot-key=pk_...> ──HTTPS──> Chat API ──┤──> Retrieval (Postgres + pgvector, RLS)
 (Shadow DOM widget)                                   │          │──> LLM provider (via adapter)
WhatsApp user ──> Meta Cloud API webhook ─────────────┘          │──> Usage metering + budgets (Redis)
                                                                  │──> Leads -> email / WhatsApp handoff
Razorpay (subscriptions, webhooks) ──> Billing service ──> Entitlements ──> Arthos (GST invoice)
Ingestion workers: crawl site / parse PDFs -> chunk -> embed -> store (per tenant)
```

### 4.1 Default stack (use existing stack if Phase 0 finds one)
- **DB:** PostgreSQL with `pgvector` (managed: Supabase / Neon / RDS in an India region). One database, shared tables, `tenant_id` on every row, Row-Level Security.
- **API:** TypeScript (Node) or Python (FastAPI) — match whichever the current bot uses.
- **Cache/rate limits/budgets:** Redis.
- **Queue:** for ingestion jobs (BullMQ / Celery / managed queue).
- **Widget:** vanilla TS or Preact, built to a single small JS file, served from a CDN.
- **Dashboard:** same framework as the existing site if possible.
- **Observability:** structured logs, error tracking, LLM tracing (e.g. Langfuse) with PII redaction.

---

## 5. Cross-cutting requirements

### 5.1 Security (mapped to OWASP Top 10 for LLM Applications 2025)
Prompt injection has been the #1 risk on the OWASP LLM list, and the 2025 edition added **system prompt leakage** and **excessive agency**. Required controls:
- [ ] **Prompt injection (direct & indirect):** treat retrieved documents and crawled pages as untrusted data; wrap them in clearly delimited context blocks; instruct model to ignore instructions inside them; strip hidden text/HTML comments at ingestion.
- [ ] **System prompt leakage:** system prompts contain no secrets, keys, internal pricing logic or other tenants' info. Assume they will be extracted.
- [ ] **Excessive agency:** the bot's only side-effecting "tool" at launch is `create_lead`. No email sending, DB writes, or API calls driven directly by model output without server-side validation.
- [ ] **Improper output handling:** render bot replies as sanitized Markdown; never inject raw HTML; allowlist link schemes (`https`, `tel`, `mailto`, `wa.me`).
- [ ] **Sensitive info disclosure:** PII redaction in logs/traces; tenants can only ever see their own conversations.
- [ ] **Unbounded consumption:** per-visitor, per-IP, per-bot and per-tenant rate limits + monthly token budgets; fail closed when Redis is unavailable.
- [ ] Red-team test suite (Phase 9) using an OWASP-LLM preset (e.g. promptfoo) runs in CI.

### 5.2 Privacy & legal (India)
- DPDP Rules 2025 were notified on 13 Nov 2025 with phased commencement: consent-manager rules ~Nov 2026, and the bulk of obligations (notices, security safeguards, breach notification, erasure, rights) by **13 May 2027**. Build for the full regime now. **[VERIFY]** dates with counsel.
- Roles: for chats on a client's site, **the client is the Data Fiduciary and SAURIK IT is the Data Processor**. For SAURIK's own customers (account holders), SAURIK is the Data Fiduciary.
- [ ] **Data Processing Agreement** template for clients (processing only on instructions, security, breach notice, deletion on termination).
- [ ] **AI disclosure** visible in every widget ("You're chatting with an AI assistant").
- [ ] **Notice & consent** before collecting lead details (name/phone/email), with purpose stated and a link to the client's privacy notice + SAURIK's.
- [ ] **Retention:** configurable per tenant (default 90 days for transcripts, lead data until client deletes); automatic purge jobs.
- [ ] **Rights handling:** tenant-side export and delete of a visitor's conversations/lead.
- [ ] **Breach runbook:** the Rules require notifying affected individuals and a detailed report to the Board within 72 hours; document who does what.
- [ ] Update `/privacy`, add `/terms`, `/refund-policy` (also typically required for payment gateway activation **[VERIFY]** in Razorpay dashboard).
- [ ] Not legal advice — founder to have a lawyer review DPA, terms, and privacy text before launch.

### 5.3 Multi-tenancy (non-negotiable)
- Every tenant-scoped table has `tenant_id UUID NOT NULL` + RLS policy `USING (tenant_id = current_setting('app.tenant_id')::uuid)`.
- The API sets `app.tenant_id` per request/transaction from the authenticated context — never from client input.
- Also filter by `tenant_id` in application queries (defense in depth).
- **Do not** use `SECURITY DEFINER` functions for vector search — they bypass RLS.
- ANN + RLS gotcha: HNSW returns global top-K then RLS filters, which can yield too few results for small tenants. Use pgvector iterative index scans (0.8+) **[VERIFY]** version, or partial indexes / partitioning by tenant, and test with many tenants.
- Automated test: two tenants with overlapping content; assert zero cross-tenant retrieval, in CI.

### 5.4 GST & invoicing
- 18% GST on SaaS/IT services to Indian customers: CGST+SGST (9%+9%) when customer is in Tripura, IGST 18% when in another state. Exports can be zero-rated under LUT.
- Invoice must show GSTIN (SAURIK and customer if B2B), SAC code (D9), place of supply, tax split.
- Collect customer GSTIN (optional) and billing state at checkout.

---

## 6. Phases

### Phase 0 — Discovery (½–1 day)
**Tasks**
- [ ] Locate the source of the current site widget ("AI Voice & Chat • Talk or Ask"): repo, backend, LLM provider, how it's trained (hardcoded prompt? RAG? which docs?), voice stack, hosting, costs.
- [ ] Identify the website framework/hosting and where pages, sitemap and contact topics are defined.
- [ ] Record current monthly LLM spend and average tokens per conversation (from logs/provider dashboard).
- [ ] Write `docs/current-state.md` summarizing the above and listing reusable parts.

**Acceptance:** `current-state.md` exists; stack decisions in section 4.1 are confirmed or replaced in `DECISIONS.md`.

---

### Phase 1 — Sales surface on saurikit.in (can ship before the SaaS exists)
**Tasks**
- [ ] Create `/ai-chatbot` (or `/services/ai-chatbot` to match existing services URL pattern — pick one and be consistent).
  - H1 e.g. "AI Chat Assistant for Business Websites in Tripura & Northeast India".
  - Sections: problem → what it does → live demo (point to the on-site widget, with a "Try asking it about…" prompt list) → use cases (clinics, hotels/tourism, coaching institutes, retail, distributors) → how it stays accurate (answers only from your content, human handoff — matches the site's "human review" positioning) → pricing ("Starting from" + GST note) → setup process (reuse Understand / Plan / Deliver / Support) → FAQ → CTA.
  - CTA buttons: "Request a demo on your content" → `/contact?topic=ai_chatbot`; "Chat on WhatsApp" → prefilled `wa.me` message.
- [ ] Add `ai_chatbot` option to the contact form "Primary Service Requirement" list and support `?topic=ai_chatbot` preselection.
- [ ] Add the page to: top nav (Products or Services), homepage "What We Build" section, footer Software list, `sitemap.xml`.
- [ ] Structured data (JSON-LD): `SoftwareApplication` (or `Service`) with `offers` (priceCurrency INR, lowPrice), `provider` → Organization; `FAQPage` for the FAQ block; `BreadcrumbList`.
- [ ] SEO checklist per new page: unique `<title>` ≤ 60 chars, meta description ≤ 155 chars, one H1, canonical, OG/Twitter tags with correct URL, `og:locale=en_IN`, descriptive image alt text, internal links in and out, mobile check, no layout shift from the widget.
- [ ] Supporting content (one per week, each linking to `/ai-chatbot`):
  - "AI chatbot for small business in Agartala: cost and what to expect"
  - "WhatsApp chatbot vs website chatbot for Indian SMBs"
  - "How to stop a chatbot from making things up (answer-only-from-your-content explained)"
- [ ] Fix the site bugs listed in section 1.
- [ ] Analytics events: `chatbot_page_view`, `demo_opened`, `demo_message_sent`, `cta_contact_click`, `cta_whatsapp_click`.

**Acceptance**
- Page live on staging, passes Lighthouse SEO ≥ 95 and Accessibility ≥ 90, validates in Google Rich Results Test, appears in sitemap, contact form preselects the new topic.
- No fabricated testimonials/numbers anywhere on the page.

---

### Phase 2 — Multi-tenant backend
**Data model (minimum)**
```
tenants(id, name, legal_name, gstin, billing_state, status, created_at)
users(id, email, name, phone, created_at)
tenant_members(tenant_id, user_id, role[owner|admin|viewer])
bots(id, tenant_id, name, public_key, system_instructions, language_defaults, handoff_whatsapp, handoff_email, status)
bot_domains(id, tenant_id, bot_id, origin)          -- exact scheme+host allowlist
sources(id, tenant_id, bot_id, type[url|sitemap|pdf|docx|faq|text], location, status, last_ingested_at)
documents(id, tenant_id, source_id, url_or_name, content_hash, title, updated_at)
chunks(id, tenant_id, bot_id, document_id, content, embedding vector(N), metadata jsonb)
conversations(id, tenant_id, bot_id, channel[web|whatsapp], visitor_id, started_at, ended_at, handoff bool)
messages(id, tenant_id, conversation_id, role, content, tokens_in, tokens_out, sources jsonb, created_at)
leads(id, tenant_id, bot_id, conversation_id, name, phone, email, need, consent_at, status)
usage_events(id, tenant_id, bot_id, kind[llm|embed|wa_msg], units, cost_inr, created_at)
plans(id, code, price_inr, limits jsonb, razorpay_plan_id)
subscriptions(id, tenant_id, plan_id, razorpay_subscription_id, status, current_period_end, trial_end)
invoices(id, tenant_id, number, amount, tax_split jsonb, pdf_url, created_at)
audit_log(id, tenant_id, actor, action, target, created_at)
```
**Tasks**
- [ ] Migrations for the above; RLS enabled on every table with `tenant_id`.
- [ ] Ingestion pipeline: sitemap/URL crawl (respect robots.txt, same-domain only, page cap per plan), PDF/DOCX parsing, boilerplate removal, hidden-text stripping, chunking (~500–800 tokens with overlap), content-hash dedupe so unchanged pages aren't re-embedded, scheduled re-crawl (weekly default).
- [ ] Retrieval: embed query → top-K within tenant+bot → optional rerank → similarity threshold. Below threshold → "I'm not sure — would you like to talk to the team?" + handoff offer, **never** a guessed answer.
- [ ] Answer generation: system prompt template per bot (tone, business facts, languages, forbidden topics), retrieved context in delimited blocks, citation list returned with each answer.
- [ ] `create_lead` flow: ask consent → validate phone/email server-side → store → notify tenant (email + optional WhatsApp to owner).
- [ ] Provider adapter interface for LLM and embeddings (swap models without code changes); record tokens and cost per call into `usage_events`.
- [ ] Budgets: per-tenant monthly conversation and token caps from `plans.limits`; enforcement before calling the LLM.
- [ ] Migrate SAURIK's own site bot to become **tenant #1** on this system (dogfood).

**Acceptance**
- Cross-tenant leak test passes (section 5.3).
- On a 30-question eval set for SAURIK's own site: ≥ 90% answered correctly with valid citations, 100% of out-of-scope questions routed to handoff rather than invented.
- p95 time-to-first-token ≤ 2.5 s on staging (streaming).

---

### Phase 3 — Embeddable widget
**Tasks**
- [ ] Loader snippet: `<script async src="https://cdn.<domain>/widget.js" data-bot-key="pk_live_…"></script>`.
- [ ] Render inside a **Shadow DOM** custom element so host-site CSS can't break it; iframe fallback page for platforms that block scripts.
- [ ] Security: server checks request `Origin` against `bot_domains`; public key identifies bot only (no secrets in page); short-lived visitor session token issued by `POST /widget/session`; per-visitor and per-IP rate limits.
- [ ] Performance: loader ≤ 10 KB gzipped, lazy-load chat bundle on first open, no requests before interaction besides the loader, no CLS.
- [ ] UX: launcher bubble, streaming replies, source links, suggested questions, language toggle, "Continue on WhatsApp" button, lead form, AI disclosure line, mobile full-screen sheet (keyboard-aware), dark/light theming via tenant brand color.
- [ ] Accessibility: WCAG 2.2 AA (keyboard, focus trap in panel, ARIA live region for new messages, contrast).
- [ ] Voice (only if current site voice feature is reusable): gated behind Pro plan and a feature flag.
- [ ] Install guides: plain HTML, WordPress, Wix, Shopify, Next.js/React.

**Acceptance**
- Widget works on 5 test sites (plain HTML, WordPress, Wix, Shopify, a React SPA) without style conflicts.
- Refuses to load on a non-allowlisted origin.
- axe scan: zero critical issues.

---

### Phase 4 — Client dashboard & onboarding (self-serve)
**Tasks**
- [ ] Auth: email OTP / magic link (+ Google sign-in optional); phone OTP optional.
- [ ] Onboarding wizard (target: live bot in < 10 minutes): business details → paste website URL (auto-crawl) → upload PDFs/FAQs → preview & test chat → brand color/greeting → allowed domains → copy embed code → choose plan.
- [ ] Screens: Bots, Sources (status, re-crawl), Test chat, Conversations (search, transcript, thumbs-up/down), Leads (export CSV), Usage (vs limits), Billing (plan, invoices, update payment), Team members, Settings (retention, handoff contacts, languages).
- [ ] "Fix an answer" loop: tenant corrects a bad answer → saved as a high-priority FAQ source → re-indexed.
- [ ] Admin console for SAURIK staff: all tenants, impersonation with audit log, manual plan override (for done-for-you clients).

**Acceptance**
- A new user goes from signup to working bot on a test site in < 10 minutes without help.
- Role permissions tested (viewer cannot change billing or sources).

---

### Phase 5 — Billing (Razorpay Subscriptions)
**Tasks**
- [ ] Create Plans in Razorpay (test mode) for each plan × {monthly, annual}; store `razorpay_plan_id` in `plans`.
- [ ] Checkout flow: server creates Subscription for the plan → frontend opens Razorpay Standard Checkout with `subscription_id` → customer authorizes (card/UPI Autopay **[VERIFY]** supported methods) → server verifies signature (HMAC-SHA256 over payment id and subscription id with key secret).
- [ ] Free trial: create subscription with a future `start_at` (Razorpay's trial pattern); setup fee via upfront add-on.
- [ ] Webhooks endpoint: verify `X-Razorpay-Signature`, store raw event, process **idempotently**; handle subscription lifecycle events (activated, charged, pending, halted, cancelled, completed) and payment failures **[VERIFY]** exact event names in current docs.
- [ ] Entitlements derive **only** from webhook-confirmed state. Grace period 7 days on payment failure, then bot shows handoff-only mode (never breaks the client's site).
- [ ] Upgrade/downgrade and cancel-at-period-end from the dashboard.
- [ ] GST invoice per charge (D7): number series, tax split by billing state, PDF emailed and listed in dashboard.
- [ ] Done-for-you clients: Razorpay Subscription Links / payment links from the admin console.
- [ ] Complete Razorpay go-live checklist; switch to live keys only with founder approval.

**Acceptance**
- End-to-end test-mode run: signup → trial → first charge → invoice → failed renewal → grace → recovery → cancel. All states reflected correctly in dashboard and entitlements.
- Replaying the same webhook twice changes nothing.

---

### Phase 6 — WhatsApp channel (Pro plan, optional)
Context **[VERIFY]** on Meta's official pricing page before finalizing prices:
- Meta bills per delivered template message (since July 2025) in INR for India; marketing templates cost several times more than utility/authentication.
- Multiple Indian providers report that from **1 Oct 2026** service (customer-initiated) replies also become chargeable at the utility rate — meaning **every bot reply on WhatsApp may cost money**. This is why WhatsApp usage is metered and passed through, not bundled.
- 18% GST applies on Meta charges and on BSP fees.

**Tasks**
- [ ] Integrate WhatsApp Cloud API (or BSP per D6): tenant connects their own WhatsApp Business Account via embedded signup; per-tenant phone number id and token stored encrypted.
- [ ] Webhook → same conversation engine as web (channel = whatsapp).
- [ ] Meter every outbound message into `usage_events(kind=wa_msg)` with category and Meta rate; show running cost in dashboard; monthly pass-through invoice line.
- [ ] Templates only for utility cases at launch (lead follow-up, appointment confirmation); no marketing broadcasts in v1.
- [ ] Opt-out handling ("STOP"), 24-hour window logic, human takeover mode.

**Acceptance**
- Test number: conversation works, costs recorded per message, human takeover pauses the bot.

---

### Phase 7 — Legal pages & policies
- [ ] `/terms` (SaaS terms incl. acceptable use, AI limitations disclaimer, liability cap, fair usage).
- [ ] `/refund-policy` (and cancellation).
- [ ] `/privacy` updated for chatbot data, processors (LLM provider, hosting, Razorpay, Meta), retention, rights, grievance contact.
- [ ] DPA template downloadable from dashboard; accepted at signup with timestamp.
- [ ] Lawyer review sign-off recorded in `DECISIONS.md`.

**Acceptance:** all pages linked from footer and checkout; founder confirms legal review.

---

### Phase 8 — Security hardening
- [ ] All items in 5.1 and 5.3 implemented and tested.
- [ ] Secrets in a manager; key rotation documented; WhatsApp tokens and API keys encrypted at rest.
- [ ] Backups (daily, 30-day retention) + tested restore.
- [ ] Dependency and container scanning in CI.
- [ ] Security headers/CSP on dashboard; CORS only for allowlisted origins on widget API.
- [ ] Breach runbook (5.2) written and stored in `docs/runbooks/`.

**Acceptance:** red-team suite passes with no high-severity findings; tenant-isolation test green.

---

### Phase 9 — Quality, observability, cost control
**9.1 Evals**
- [ ] Per-bot eval set (≥ 30 Q&A incl. 10 out-of-scope and 5 injection attempts). Run on every prompt/model change; block deploy on regression.
- [ ] Language evals: separate sets for Hindi; Bengali/Kokborok only advertised once ≥ 85% pass.

**9.2 Observability**
- [ ] Trace every conversation (retrieval hits, scores, tokens, latency, cost) with PII redacted.
- [ ] Alerts: error rate, p95 latency, daily spend per tenant > 2× average, webhook failures.

**9.3 Feedback loop**
- [ ] Thumbs up/down in widget → dashboard "needs attention" queue → "Fix an answer".

**9.4 Unit economics (must do before publishing prices)**
```
cost_per_conversation = avg_turns × (avg_input_tokens × in_price + avg_output_tokens × out_price)
                        + embedding_cost + infra_share
plan_cost_at_cap      = included_conversations × cost_per_conversation + fixed_infra_per_tenant
gross_margin          = (plan_price − plan_cost_at_cap) / plan_price   → target ≥ 60%
```
- [ ] Compute from Phase 0 real numbers; adjust plan caps or model choice (small model for routine questions, larger only on escalation) until margin target is met. Record in `DECISIONS.md`.

---

### Phase 10 — Launch & go-to-market
- [ ] Pilot: 3 friendly local businesses (e.g. a clinic, a hotel/homestay, a coaching institute) on done-for-you, free or discounted for 30 days in exchange for feedback and permission to publish a **real** case study.
- [ ] Publish case studies only with written client consent and real metrics.
- [ ] Google Business Profile: add "AI chatbot" as a service; post updates.
- [ ] Cross-sell: email/WhatsApp existing website and Saurik Track clients with the bundle offer.
- [ ] Referral/agency program for other web designers in the Northeast (margin share) — after self-serve is stable.

**KPIs to track (dashboard for founder)**
| Funnel | Metric |
|---|---|
| Acquisition | `/ai-chatbot` visits, demo opens, demo messages |
| Conversion | enquiries with topic `ai_chatbot`, trial starts, trial → paid % |
| Product | answer rate with citations, handoff rate, thumbs-down rate, leads captured per bot |
| Revenue | MRR, churn, gross margin per plan, WhatsApp pass-through volume |

---

## 7. Suggested order & rough effort

| Order | Phase | Effort (1–2 devs) | Unlocks |
|---|---|---|---|
| 1 | 0 Discovery | 1 day | Everything |
| 2 | 1 Sales page | 3–5 days | Start taking enquiries now |
| 3 | 2 Backend + 3 Widget + 8 core security | 3–5 weeks | Done-for-you sales (Offer Phase A) |
| 4 | 7 Legal | parallel, 1–2 weeks incl. review | Contracts with clients |
| 5 | 9 Evals/cost | parallel | Safe pricing |
| 6 | 4 Dashboard + 5 Billing | 3–4 weeks | Self-serve SaaS (Offer Phase B) |
| 7 | 6 WhatsApp | 1–2 weeks | Pro plan |
| 8 | 10 Launch | ongoing | Growth |

---

## 8. Definition of done (whole project)
- [ ] A business can find `/ai-chatbot`, try the demo, pay (or enquire), install one script, and get accurate, cited answers from its own content.
- [ ] No cross-tenant data access is possible (tested).
- [ ] Costs are metered and capped; margin target met.
- [ ] Legal pages reviewed; DPA in place; AI disclosure everywhere.
- [ ] SAURIK's own site runs on the same system as tenant #1.

---

## 9. Sources (research used for this plan)
- Razorpay Subscriptions — integration guide, test guide, creating subscriptions (trial via future start date, upfront add-ons, signature verification): https://razorpay.com/docs/payments/subscriptions/integration-guide/ · https://razorpay.com/docs/payments/subscriptions/test · https://razorpay.com/docs/payments/subscriptions/create/
- DPDP Rules 2025 — PIB explainer: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf · phased timeline: https://www.progressive.in/blog/dpdp-rules-2025-explained/ · https://www.tcsa.in/resources/dpdp-rules-2025-implementation-roadmap · EY summary: https://www.ey.com/en_in/insights/cybersecurity/transforming-data-privacy-digital-personal-data-protection-rules-2025
- WhatsApp Business Platform pricing — Meta: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing · India 2026 analyses: https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026 · https://chatmaxima.com/whatsapp-api-pricing/india/
- Chatbot pricing in India — https://aichatbot.com.in/blog/ai-chatbot-pricing-guide-2026 · https://cyfuture.ai/blog/ai-chatbot-pricing · https://acemindtech.com/ai-chatbots-for-indian-businesses-2026-whatsapp-website-instagram/ · https://decipherconsultancy.in/ai-chatbot-cost-in-india-guide.html
- Multi-tenant RAG with pgvector + RLS — https://www.enterprisedb.com/docs/pg_extensions/pgvector/security/ · https://dev.to/virginiamwega2svg/your-where-clause-is-not-a-security-boundary-multi-tenant-rag-with-pgvector-rls-28fk · https://github.com/Mehta-Amit-Codes/multi-tenant-rag
- Embeddable widget patterns (Shadow DOM, origin allowlist, short-lived visitor tokens) — https://github.com/Heltar/web-widget · https://github.com/eneo-ai/eneo/issues/845
- OWASP Top 10 for LLM Applications 2025 — https://aembit.io/blog/owasp-top-10-llm-risks-explained/ · https://www.promptfoo.dev/docs/red-team/owasp-llm-top-10/
- GST on SaaS/IT services — https://www.registerkaro.in/post/gst-registration-for-software-it-services · https://www.xflowpay.com/blog/gst-on-software-services
