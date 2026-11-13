# SAURIK IT Website & AI Platform — Change Log

This file actively records all architectural evolutions, technical deliverables, and infrastructure modifications for the SAURIK IT digital platform (`https://www.saurikit.in`), with immediate tracking for the **Maya 2 Native Serverless GPU & Indic TTS Voice Integration**.

Historical releases are archived in [`change_log.md`](./change_log.md).

---

## [Active Development] — 2026-11-13

### Milestone: Modular Skill Architecture & Recursive Learning System (100% Operational)
- **Modular Tactical Skills (`.agents/skills/`):** Deconstructed monolithic agent instructions into dedicated, focused `SKILL.md` playbooks with YAML frontmatter schemas:
  - `po-discovery`: Problem framing, audience profiling, and separating facts from assumptions.
  - `deliver-prd`: Authoring structured PRDs with strict in/out-of-scope boundaries.
  - `deliver-user-stories`: Authoring atomic user stories with Dual-Path Given/When/Then criteria (Happy Path + Failure/Recovery Path).
  - `po-prioritization`: MoSCoW prioritization and dependency sequencing grounded in real business value.
  - `po-decision-management`: Stakeholder clarifications and the 5-category Taxonomy of Truth.
  - `architect-context-assessment`: Codebase inspection, runtime analysis, and architectural constraints verification.
  - `solution-design`: Proportionate system topology, component composition, client/server boundaries, and failure paths.
  - `architecture-tradeoff-analysis`: 7-step technology selection comparing build/run cost, complexity, performance, and vendor lock-in.
  - `architecture-decision-records`: Authoring and maintaining ADRs in `docs/decisions.md` (Context, Drivers, Decision, Consequences, Validation).
  - `api-and-integration-design`: Serverless API route schemas, HTTP status codes, fast-fail timeout ceilings, and telemetry headers.
  - `website-security-architecture`: Defensive security, zero client credential leakage, input sanitization, anti-abuse, and log privacy.
  - `implementation-planning`: Structured, ordered developer tasks with file paths, test assertions, dependencies, and rollback strategies.
  - `developer-codebase-exploration`: Inspects existing components, styles, routes, and developer lessons before editing.
  - `website-feature-implementation`: Implements user stories with idle, loading, success, and error states (preserving form input).
  - `frontend-react-implementation`: Builds responsive (360px–1440px), accessible (WCAG 2.2 AA) React components with Tailwind design tokens.
  - `website-api-implementation`: Implements Vercel serverless endpoints (`api/`) with input validation, fast-fail timeouts, and telemetry.
  - `systematic-debugging`: Methodical 6-step root-cause debugging under the 2-attempt anti-thrashing circuit breaker.
  - `developer-testing`: Authors automated assertion scripts (`test/verify_*.cjs`) and verifies `npm test` & SSG production builds.
  - `secure-web-implementation`: Enforces zero client secrets, server-only secret retrieval, input sanitization, and PII-free logging.
  - `verification-before-completion`: Audits deliverables before handoff: transparently states what was tested, results, and what is unverified.
  - `ux-design-brief`: Evaluates requirements, user context, brand rules, and prior design lessons (`design.md`).
  - `ux-journey-mapping`: Maps visitor journeys, sitemaps, entry points, and conversion flows, strictly labeling hypotheses.
  - `website-wireframing`: Defines page structure, section sequence, and mobile-vs-desktop layout grids.
  - `visual-design-and-art-direction`: Establishes visual mood, typography hierarchy, palette application, and Lucide icon discipline.
  - `website-design-system`: Manages design tokens and the 8 mandatory component interaction states.
  - `responsive-interaction-design`: Specifies viewport adaptations (360px–1440px), mobile menu drawers, and reduced motion.
  - `accessibility-and-usability-review`: Conducts WCAG 2.2 AA audits, contrast checks ($\ge 4.5:1$), and visible focus verification.
  - `qa-acceptance-review`: Deconstructs user stories into Happy Path, Failure Path, and Edge Case scenarios.
  - `qa-risk-based-test-planning`: Evaluates change blast radius (Tier 1 to 4) to select proportionate testing depth.
  - `qa-browser-testing`: Exercises end-to-end user journeys, forms, and error states from a visitor's perspective.
  - `qa-code-review`: Audits code diffs for unhandled errors, secret leaks, missing tests, and shared component regressions.
  - `qa-responsive-visual-review`: Audits rendering across 360px–1440px viewports, text overflow, and layout fidelity against design tokens.
  - `qa-accessibility-testing`: Audits WCAG 2.2 AA: keyboard navigation, visible focus rings, form labels, and color contrast ($\ge 4.5:1$).
  - `qa-api-integration-testing`: Validates serverless endpoints (`api/`), status codes, 7.5s fast-fail timeouts, and telemetry headers.
  - `qa-defect-triage-and-retest`: Standardizes reproducible defect reports with severity ratings and verifies post-fix retests.
  - `qa-release-readiness`: Synthesizes test runs into an evidence-based GO / NO-GO recommendation (Passed, Failed, Blocked, Untested).
  - `agent-handoff`: High-density structured handoff package and contract reusable across all roles.
  - `team-learning`: Standardized protocol for Step 0 Pre-Flight memory reading, Anti-Thrashing Circuit Breaker (max 2 attempts), post-flight empirical lesson logging, and the Lesson Graduation Ladder.
- **Role Persona Orchestration (`role-product-planner`, `role-solution-architect`, `role-fullstack-developer`, `role-ui-ux-designer`, `role-qa-reviewer`):** Refactored personas to orchestrate modular skills while anchoring role memory and constitutional guardrails.
- **Persistent Role Memory (`agent-memory/`):** Established dedicated lesson logs for all 5 specialist roles (`product`, `design`, `architect`, `developer`, `qa`) plus `shared-lessons.md`.
- **Architecture Decision Records (`docs/decisions.md`):** Seeded with ADR-001 (Zero-Cost Voice), ADR-002 (Fast-Fail Cascading), and ADR-003 (Recursive Learning Protocol).
- **Living Requirements (`docs/requirements.md`):** Documented core product offerings, target audience, and non-functional requirements.
- **Constitutional Governance (`AGENTS.md`):** Codified pre-task lesson reading, post-task evidence recording, Anti-Thrashing Circuit Breaker (max 2 attempts), and the Human Gatekeeper Rule.
- **Automated Verification Gate (`test/verify_recursive_learning.cjs`):** 10/10 test suites passed in `npm test`, validating schema conformance, modular skills, and constitutional integrity.

---

## [Active Development] — 2026-11-07

### Milestone: Multi-Tier Resilient TTS Fallback Engine (100% Verified)
- **Problem Solved:** Long 45-second freezes during GPU container cold starts are eliminated.
- **7.5-Second Fast-Fail Protection:** `api/tts.js` sets a 7.5s ceiling on Maya. When Maya is cold, it immediately cascades to OpenAI `tts-1` in under 3 seconds.
- **Extended Warm Window:** `deploy/modal_maya_app.py` redeployed with `scaledown_window=600` (10 minutes) so subsequent turns stay warm (<4s).
- **Graceful Hands-Free Continuity:** Even under total cloud outage, `useVoiceAgent.js` displays the text response and keeps the hands-free loop alive.
- **Automated Fallback Audit (`scripts/test_tts_fallback.cjs`):** 3/3 scenarios passed (Cascade, Degradation, Live Protected).

### Milestone: Multilingual Indic Expansion (7 Languages — 7/7 PASSED)
- **Expanded Language Suite:** Added **Assamese (`as-IN`)**, **Gujarati (`gu-IN`)**, **Tamil (`ta-IN`)**, and **Telugu (`te-IN`)**, complementing **English (`en-IN`)**, **Bengali (`bn-IN`)**, and **Hindi (`hi-IN`)**.
- **Regex Script-Level Detection:** Integrated Unicode regex across client (`useVoiceAgent.js`), Modal backend (`modal_maya_app.py`), and chat context prompt (`chatContext.js`).
- **Live 7-Language Benchmark (`test/output/`):**
  - English (`en-IN`): 401.3 KB (cold start)
  - Bengali (`bn-IN`): 442.5 KB (5.7s)
  - Assamese (`as-IN`): 397.5 KB (3.7s)
  - Gujarati (`gu-IN`): 326.3 KB (3.3s)
  - Tamil (`ta-IN`): 360.0 KB (3.5s)
  - Telugu (`te-IN`): 371.3 KB (4.6s)
  - Hindi (`hi-IN`): 408.8 KB (4.1s)
- **Automated Verification:** All test suites passed (`npm test` 9/9) and production build prerendered 17/17 routes with 0 errors.

### Milestone: Maya 2 Native Serverless GPU Tri-Lingual Deployment & Verification (100% Succeeded)

#### Learned & Persisted (`/learn`)
- **Dual-Engine Voice Pipeline Rule (`AGENTS.md`):** Codified the functional decoupling of text cognition (LLM layer in `api/chat.js`) from speech audio generation (Zero-Cost Web Speech primary + Maya 2 on Modal fallback).
- **Hardened Skill Runbooks:**
  - `maya-serverless-deployer`: Documented `maya3` API methods (`generate()`, `max_seats=1`, script auto-detection, default voice `"Ahana"`) and Modal's 150-second `HTTP 303` redirect handling requirement.
  - `website-voice-integration`: Documented the 45-second proxy timeout window for GPU container cold boot and the local Vite dev server middleware pattern (`apiDevPlugin`) in `vite.config.js`.

#### Deployed & Operational
- **Modal Serverless GPU Function Live (`deploy/modal_maya_app.py`):**
  - Live Endpoint: `https://phoenixdelta74--saurik-maya2-tts-mayattsservice-speech.us-east.modal.run`
  - Deployed on NVIDIA L4 (24GB VRAM) running CUDA 12.8 and `maya3` engine with persistent volume caching (`maya2-weights`).
  - Implements automatic language detection (`bn` for Bengali Unicode range, `hi` for Devanagari, `en` for Latin script) and default voice `Ahana`.
- **Automated Tri-Lingual Benchmark Succeeded (`scripts/test_maya_tts.cjs`):**
  - **English (`en-IN`):** Generated `test/output/maya_test_en.wav` (401.3 KB, cold-start initialization 111s).
  - **Bengali (`bn-IN`):** Generated `test/output/maya_test_bn.wav` (405.0 KB, warm response **4.28s**).
  - **Hindi (`hi-IN`):** Generated `test/output/maya_test_hi.wav` (405.0 KB, warm response **3.94s**).
  - Verified 24kHz sampling rate, valid RIFF/WAV headers, and zero audio clipping.

#### Added
- **`skill-routing.md`**: Central skill registry and routing matrix defining all available workspace, system, and specialized AI skills, their trigger conditions, input/output contracts, and execution priority.
- **Dedicated Workspace Skills (`.agents/skills/`)**:
  - `maya-serverless-deployer`: Step-by-step procedure and runbook for provisioning, packaging, and deploying the 2.5B parameter Maya 2 Native model to Modal.com Serverless GPU (NVIDIA L4 24GB VRAM) with persistent volume caching and Bearer token security.
  - `voice-audio-benchmark-tester`: Automated benchmark and validation harness for testing tri-lingual audio synthesis (English, Bengali, Hindi), auditing 24kHz sampling, verifying MIME types, and calculating warm vs cold latency.
  - `website-voice-integration`: Workflow to connect the serverless Maya endpoint to the website's `api/tts.js` and `src/hooks/useVoiceAgent.js` while strictly respecting the **Zero-Cost Native Voice Engine Rule**.
- **`change-log.md`**: Living active change tracker established to witness and document all ongoing project changes.

#### Changed
- **`architecture.md` / `Architecture.md`**:
  - Extended **Section 11 (Dual-Panel Voice & Chat Assistant Architecture)** with **Section 11.5 (Hybrid Serverless GPU Pipeline & Maya 2 Native Fallback)**.
  - Documented the exact execution path: Browser Web Speech API as Primary $\rightarrow$ Regional Script Detection $\rightarrow$ Serverless GPU Maya Fallback (`/api/tts`) $\rightarrow$ OpenAI Cloud Fallback.
  - Formally established the tri-lingual benchmark specifications for Bengali (`bn-IN`), Hindi (`hi-IN`), and English (`en-IN`).

---

## [1.12.4] — 2026-10-09

### Fixed
- **Long Spoken Questions (`src/hooks/useVoiceAgent.js`):** Desktop browsers now use continuous recognition and submit after a ~1.8s pause (or "Done Speaking"), so long questions are no longer cut off at the first breath. Android/iOS keep single-phrase mode because their continuous mode repeats or drops results. Cancelled rounds (close / end call) are discarded instead of submitted.
- **Accuracy Claims (`src/pages/AiChatbot.jsx`):** Replaced "Zero Hallucinations" headings, chip, and "guarantee" FAQ wording with descriptions of the grounding and handoff safeguards.
- **Voice/Chat Accessibility (`src/components/voice/VoiceAgentPanel.jsx`, `src/components/ChatWidget.jsx`):** Language listbox supports Arrow/Home/End/Escape/Tab with focus return; assistant dialog traps Tab focus; mobile Chat/Voice tabs expose `aria-pressed`; controls meet the 44px touch target.

---

*(For full historical changelog from version 1.0.0 through 1.12.3, see [`change_log.md`](./change_log.md))*

