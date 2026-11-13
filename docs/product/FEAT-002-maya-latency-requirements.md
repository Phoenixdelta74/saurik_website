# Product Requirements Document (PRD) — FEAT-002: Maya TTS Latency Mitigation & Sentence Pipelining

## 1. Document Control & Problem Framing
- **Feature Identifier**: `FEAT-002`
- **Feature Name**: Maya TTS Latency Mitigation & Sentence Pipelining
- **Author**: Product Owner (`role-product-planner`)
- **Status**: Approved for Implementation
- **Target Audience**: Website visitors engaging with the SAURIK IT Voice Assistant in regional Indic languages (Bengali, Assamese, Gujarati, Tamil, Telugu, Hindi) where native OS voices are absent.
- **Business Goal**: Reduce perceived voice synthesis latency from ~4.5–5.5 seconds down to **$\le 1.2$ seconds (Time To First Audio - TTFA)** on warm synthesis, creating a natural, conversational speech dialogue without freezing or voice dropouts.

---

## 2. Taxonomy of Truth (Facts vs. Assumptions)
- **Known Facts**:
  - The Zero-Cost Native Voice Engine Rule (`AGENTS.md`) mandates that browser Web Speech API is primary. Cloud TTS is strictly a fallback for languages absent on the visitor's device (especially Bengali/Assamese on Windows and Android).
  - Modal serverless GPU hosts the 2.5B parameter Maya 2 Native model on an NVIDIA L4 GPU (`deploy/modal_maya_app.py`).
  - Warm inference on Maya currently takes ~3.5s–5.0s for an entire paragraph (50–100 words), causing a noticeable pause before speech begins.
  - Generating audio for a short single sentence (5–8 words) on an L4 GPU takes only ~400ms–800ms.
- **Reasonable Assumptions**:
  - Pipelining Sentence 1 immediately and buffering Sentence 2 in the background will deliver an instant conversational experience without audio stutter.
  - Pre-warming the Modal container when the user initiates mic access or opens the voice panel hides container wake latency during the user's speech.
- **Human Gatekeeper Invariants**:
  - Browser-native speech must remain default and free for English and Hindi whenever client voices exist.
  - Zero external paid voice API keys required for baseline functionality.

---

## 3. Scope Boundaries
- **In-Scope (Must Have for FEAT-002)**:
  - First-Sentence Fast-Path pipelining in `src/hooks/useVoiceAgent.js`: split text into sentence chunks and dispatch Sentence 1 immediately.
  - Sequential Audio Queue: seamlessly play Sentence 1 while fetching Sentence 2 in the background, stitching audio without acoustic gaps or popping.
  - Proactive Container Warmup: lightweight non-blocking warm ping triggered on voice panel mount / microphone toggle.
  - Automated Latency Verification Suite in `test/verify_tts_latency.cjs`.
- **Out-of-Scope (Deferred)**:
  - Full bidirectional WebSockets (unnecessary complexity for current unidirectional serverless architecture).
  - Replacing the Maya 2 2.5B weights with smaller quantized models (preserving current voice naturalness).

---

## 4. User Stories & Dual-Path Acceptance Criteria

### Story US-01: First-Sentence Fast-Path Playback
**As a** visitor speaking to the AI assistant in Bengali or a regional language without native client voices,  
**I want** to hear the assistant start answering within ~1.2 seconds,  
**So that** the conversation feels snappy and responsive rather than stalled.

- **Acceptance Criteria AC-01 (Happy Path - Warm TTFA):**
  - **Given** the Modal Maya container is warm and the assistant has generated a 2+ sentence reply,
  - **When** `speakWithCloud` is invoked for a regional language,
  - **Then** Sentence 1 must be dispatched immediately and Time To First Audio (TTFA) must begin in $\le 1.2$ seconds.
- **Acceptance Criteria AC-02 (Seamless Audio Pipelining):**
  - **Given** Sentence 1 is actively playing in the client browser,
  - **When** the client fetches Sentence 2 in the background,
  - **Then** Sentence 2 must start playing immediately when Sentence 1 finishes, with an inter-sentence silence buffer between 80ms and 200ms (natural prosodic pause, no popping or clipping).
- **Acceptance Criteria AC-03 (Interruption & Cancellation Recovery):**
  - **Given** a pipelined audio queue is playing or buffering subsequent sentences,
  - **When** the visitor clicks "Stop", taps the microphone, or starts speaking (continuous mode barge-in),
  - **Then** all pending and playing audio chunks must be cancelled immediately within 100ms, and all background fetch abort controllers must fire.
- **Acceptance Criteria AC-04 (Fast-Fail Fallback Preservation):**
  - **Given** Maya GPU container encounters a cold timeout ($>7.5$s) or 502/503 error on Sentence 1,
  - **When** `api/tts.js` catches the error,
  - **Then** it must cleanly cascade to the secondary fallback without throwing unhandled exceptions, and display a non-blocking toast warning while keeping text output intact.

---

## 5. Non-Functional Requirements & Performance Budgets
- **TTFA Budget**: $\le 1.2\text{s}$ for warm Maya generation of Sentence 1 (under 12 words).
- **Acoustic Integrity**: 24kHz mono audio, zero DC offset clicks between spliced sentences.
- **Zero-Cost Rule Compliance**: Devices with native OS voices for the requested language must NEVER hit the network TTS endpoint.

---

## 6. Handoff to Architecture & Design
- **To Solution Architect**: Design the sentence delimiter boundary logic, audio queue state machine, and client-side AbortController architecture ([`docs/architecture/FEAT-002-maya-latency-architecture.md`](file:///c:/Saurik/saurik_website/docs/architecture/FEAT-002-maya-latency-architecture.md)).
- **To UI/UX Designer**: Specify visual indicators for audio stream buffering and uninterrupted wave animation ([`docs/design/FEAT-002-maya-latency-design.md`](file:///c:/Saurik/saurik_website/docs/design/FEAT-002-maya-latency-design.md)).
- **To QA Reviewer**: Formulate test harness measuring TTFA, chunk transitions, and barge-in interruption.
