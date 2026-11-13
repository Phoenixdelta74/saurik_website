# Product / Planner Lessons

This file records lessons learned by the Product / Planner role (`product_planner`) regarding requirements, business priorities, customer scope, and user stories.

---

## Lesson 001: Authentic Multilingual Script Matching Mandate

- **Date:** 2026-11-07
- **Role:** Product / Planner
- **Task:** Multilingual Voice Agent Expansion (Assamese, Bengali, Gujarati, Tamil, Telugu, Hindi, English)
- **Context:** Regional users querying the assistant in their mother tongue occasionally received English replies because models defaulted to lingua franca.
- **Problem:** English replies for regional spoken questions broke the conversational immersion and user trust.
- **Cause:** Chatbot grounding prompt lacked an absolute instruction to mirror the input language's native script.
- **Action:** Added the strict `LANGUAGE MATCHING MANDATE` in `src/data/chatContext.js`:
  - When the user selects or speaks in Bengali, reply 100% in Bengali script (`বাংলা`).
  - When the user selects or speaks in Assamese, reply 100% in Assamese script (`অসমীয়া`).
  - When the user selects or speaks in Gujarati, reply 100% in Gujarati script (`ગુજરાતી`).
  - When the user selects or speaks in Tamil, reply 100% in Tamil script (`தமிழ்`).
  - When the user selects or speaks in Telugu, reply 100% in Telugu script (`తెలుగు`).
  - When the user selects or speaks in Hindi, reply 100% in Devanagari script (`हिंदी`).
- **Evidence:** Tested live in browser (`Assamese` test: "ঘৰত চিচিটিভি লগোৱাৰ বিষয়ে আলোচনা কৰিবলৈ...").
- **Result:** Assistant reliably mirrors the user's native tongue without defaulting to English.
- **Status:** Verified
- **Applies when:** Defining prompts, acceptance criteria, or language routing for AI agents.
- **Next check:** Validate on adding any new regional language or dialact.

---

## Lesson 002: Zero Fabricated Metrics & Marketing Constraints

- **Date:** 2026-10-09
- **Role:** Product / Planner
- **Task:** Product Landing Pages (Saurik Track, Arthos, Custom Software)
- **Context:** Drafting conversion copy and value propositions.
- **Problem:** Placeholder numbers (e.g. "99.9% uptime", "500+ happy clients", "instant response") slipped into drafts.
- **Cause:** Generic template copy from standard SaaS themes.
- **Action:** Established strict negative constraints in `AGENTS.md`:
  - No fabricated customer counts, logos, or SLA promises.
  - Server offerings specify installation & maintenance, never public cloud rental.
  - Analytics copy describes modeling capabilities, never guarantees prediction accuracy.
- **Evidence:** Automated grep assertions in `test/verify_track_spec_v3.cjs` and `test/verify_arthos_spec.cjs`.
- **Result:** 100% truthful, legally compliant marketing copy across all routes.
- **Status:** Verified
- **Applies when:** Writing copy, user stories, or acceptance criteria for customer-facing pages.
- **Next check:** Review all new product marketing content.

