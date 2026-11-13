# Architecture Decision Records (ADRs)

This document records the architectural and strategic decisions made for SAURIK IT's digital platform, their context, alternatives considered, and consequences.

---

## ADR-001: Zero-Cost Native Voice Engine with Serverless GPU Fallback

* **Status:** Accepted
* **Date:** 2026-10-09 (Updated 2026-11-07)
* **Deciders:** Solution Architect, Product Planner, Human Stakeholder

### Context
SAURIK IT needed an interactive voice assistant for its regional website. Traditional cloud speech APIs (OpenAI, ElevenLabs, Google Cloud TTS) charge recurring per-minute audio bills. For an early-stage regional IT and software company in Northeast India, paying continuous recurring cloud fees for casual visitors is unsustainable. However, many client devices (especially Windows and Android) lack pre-installed regional voices (such as Bengali or Assamese).

### Decision
1. **Primary Voice Engine (Zero-Cost):** Use the browser's native Web Speech API (`SpeechRecognition` for STT and `window.speechSynthesis` for TTS). This provides instant 0ms latency, zero server compute, and 100% free voice capability for devices with matching voices installed.
2. **Fallback Voice Engine:** When a visitor's device has no matching voice installed for the reply language, route through `/api/tts` to an open-weight **Maya 2 Native** (2.5B parameter) streaming TTS model hosted on a **Modal Serverless GPU** (NVIDIA L4).
3. The serverless GPU container scales down to zero when idle, ensuring zero ongoing expenses during periods of inactivity.

### Consequences
* **Positive:** Complete elimination of mandatory recurring audio subscriptions. High-fidelity 24kHz natural Indic speech for Northeast Indian languages.
* **Negative:** Serverless GPU instances encounter cold starts when idle, requiring a dedicated mitigation strategy (see ADR-002).

---

## ADR-002: Fast-Fail Timeout (7.5s) & Instant Cloud Fallback for Low-Traffic Serverless Cold Starts

* **Status:** Accepted
* **Date:** 2026-11-07
* **Deciders:** Solution Architect, Developer, Human Stakeholder

### Context
Website visitation is sporadic. As a result, when a new visitor initiates a voice turn, the Modal GPU container is typically in a scaled-to-zero state. Cold-booting an L4 GPU, mounting model weights, and loading 2.5B parameters into VRAM takes ~70–95 seconds. In voice applications, waiting 45–90 seconds in silence makes users believe the application is frozen or crashed.

### Decision
1. Implement an aggressive **7.5-second fast-fail timeout** (`MAYA_TTS_TIMEOUT_MS = 7500`) in `api/tts.js`.
2. If Maya does not deliver headers within 7.5 seconds, immediately abort the connection and cascade directly to the secondary cloud fallback (OpenAI `tts-1`).
3. Extend the Modal container warm keep-alive window (`scaledown_window`) from 3 minutes to **10 minutes (600s)**.
4. Emit telemetry header `X-TTS-Engine: maya2-native` or `X-TTS-Engine: openai-tts-1`.

### Consequences
* **Positive:** Visitors never experience a 45–90s freeze. During a cold start, speech arrives via fallback in ~2.9s. Meanwhile, the container finishes booting in the background, so subsequent questions in that same 10-minute session enjoy warm ~3.5s Maya Indic speech.
* **Negative:** First-time cold-start questions use the secondary cloud provider rather than the custom open-weight model.

---

## ADR-003: Recursive Agent Learning Protocol & Lesson Graduation Ladder

* **Status:** Accepted
* **Date:** 2026-11-13
* **Deciders:** Solution Architect, QA Reviewer, Human Stakeholder

### Context
Autonomous coding agents lack state across fresh sessions. Without a persistent feedback loop, agents repeat past implementation mistakes, ignore past bugs, and accumulate unverified assumptions. Conversely, dumping every lesson into a single instruction file causes context bloat and prompt confusion.

### Decision
1. **Persistent Project Memory:** Establish role-specific lesson files in `agent-memory/` and cross-role lessons in `agent-memory/shared-lessons.md`.
2. **Evidence-Based Standard:** Every lesson must follow a strict schema containing `Cause`, `Action`, `Evidence`, and `Status` (`Observed`, `Proposed`, `Verified`, `Superseded`).
3. **The Lesson Graduation Ladder:**
   ```
   Observation ──► Verified Lesson ──► Automated Test (test/) ──► Project Rule (AGENTS.md)
   ```
4. **Human Gatekeeper Rule:** Only **You (Human Decision Maker)** can approve promoting a lesson into root `AGENTS.md`. Agents cannot unilaterally modify their own constitution.
5. **Anti-Thrashing Circuit Breaker:** Agents are capped at a maximum of two focused correction attempts before escalating blockers to the human stakeholder.

### Consequences
* **Positive:** Self-improving development lifecycle, prevention of recurring defects, minimal prompt bloat, and regression prevention codified into fast automated test suites.
* **Negative:** Requires agents to spend a turn reading and updating memory files during task handoffs.

---

## ADR-004: Sentence-Pipelined TTS & Audio Queue Streaming for Regional Voice Synthesis

* **Status:** Accepted
* **Date:** 2026-11-13
* **Deciders:** Solution Architect, Fullstack Developer, Product Owner, Human Stakeholder

### Context
When the visitor's device has no installed regional voice (especially for Bengali or Assamese), the voice assistant invokes the serverless Maya 2 Native GPU endpoint on Modal via `/api/tts`. While warm inference takes ~3.5s–5.0s for an entire paragraph (50–100 words), this blocking delay creates an unnatural silence before speech begins. Conversely, synthesizing Sentence 1 alone (5–8 words) takes only ~600ms–800ms on an NVIDIA L4 GPU.

### Decision
1. **Sentence-Pipelined Fast-Path:** In `src/hooks/useVoiceAgent.js`, segment multi-sentence responses across Latin and Indic sentence boundaries (`.`, `!`, `?`, `।`, `\n`).
2. Dispatch Sentence 1 immediately to `/api/tts`. As soon as Sentence 1 returns (~600–800ms), begin client audio playback (Time To First Audio $\le 1.2$s).
3. Concurrently pre-fetch Sentence 2 in the background while Sentence 1 is playing.
4. Manage an in-memory `audioQueue` that stitches consecutive sentence buffers with a natural 100ms prosodic pause, preventing audio gaps or popping.
5. In `api/tts.js`, add a non-blocking `GET /api/tts?warmup=true` endpoint that can be pinged upon microphone permission or voice drawer mount to pre-warm the container before user speech finishes.

### Consequences
* **Positive:** Drops perceived conversational latency from ~5s down to $\le 1.2$s. Works reliably over HTTP without requiring persistent WebSockets. Audio playback is fluid and conversational.
* **Negative:** Makes multiple sequential HTTP calls for longer answers, requiring robust `AbortController` cancellation to handle barge-in interruptions cleanly.


