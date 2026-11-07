# SAURIK IT Website & AI Platform — Change Log

This file actively records all architectural evolutions, technical deliverables, and infrastructure modifications for the SAURIK IT digital platform (`https://www.saurikit.in`), with immediate tracking for the **Maya 2 Native Serverless GPU & Indic TTS Voice Integration**.

Historical releases are archived in [`change_log.md`](./change_log.md).

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

