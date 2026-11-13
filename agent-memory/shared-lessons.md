# Shared Cross-Role Lessons

This file records verified lessons that affect multiple roles across the SAURIK IT development team.

---

## Lesson 001: Dual-Engine Voice Pipeline Separation

- **Date:** 2026-11-07
- **Roles Involved:** Architect, Developer, Product, QA
- **Task:** Multilingual Voice Agent & Maya 2 Native Serverless GPU Integration
- **Context:** User tested voice agent with Bengali/Assamese and encountered "temporarily unable to connect to knowledge base" when LLM keys were empty.
- **Problem:** Chat widget conflated the LLM cognition layer with the TTS speech synthesis layer. If the LLM returned an error or was unconfigured, speech could not be generated.
- **Cause:** Lack of explicit separation between text cognition (answering the question) and audio synthesis (speaking the answer).
- **Action:** Formally separated the dual-engine pipeline:
  1. *Cognitive Layer (LLM)*: Grounded in `src/data/chatContext.js`, answers user enquiries via `api/chat.js`. Requires an active LLM key.
  2. *Audio Layer (Speech)*: Driven primarily by `window.speechSynthesis` (Zero-Cost Native Engine Rule). Falls back to `/api/tts` (Maya on Modal / OpenAI `tts-1`) only when client device lacks regional voices.
- **Evidence:** Verified across `AGENTS.md`, `architecture.md` (Section 11), `scripts/test_maya_tts.cjs`, and `test/verify_voice_assistant.cjs`.
- **Result:** Clear isolation allows the chat UI to display grounded text responses even if audio fails, and allows speech fallback to cascade cleanly without breaking the LLM conversation.
- **Status:** Verified
- **Applies when:** Developing, testing, or configuring voice assistant, chatbot, or TTS features.
- **Next check:** Verify on any new speech engine or provider integration.

---

## Lesson 002: Truthful Contact and Form Submission Feedback

- **Date:** 2026-10-09
- **Roles Involved:** Product, UI/UX, QA
- **Task:** Contact and Enquiry Form Implementation
- **Context:** Contact form submits an enquiry draft via mailto or WhatsApp link.
- **Problem:** Wording claimed "Your enquiry has been received" before any server or human confirmed receipt.
- **Cause:** Over-optimistic default UI copy.
- **Action:** Changed confirmation copy to explicitly state "Draft opened in email client" or "WhatsApp chat prepared".
- **Evidence:** Audited in `test/verify_track_spec_v3.cjs` and `test/verify_chatbot.cjs`.
- **Result:** Full compliance with negative marketing constraints. Zero misleading claims.
- **Status:** Verified
- **Applies when:** Building any user-facing form, CTA feedback, or enquiry mechanism.
- **Next check:** Audit any new contact modal or RFQ flow.

