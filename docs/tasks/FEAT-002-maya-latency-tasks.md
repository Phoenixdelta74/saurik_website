# Implementation Task Plan — FEAT-002: Maya TTS Latency Mitigation & Sentence Pipelining

## 1. Task Metadata
- **Feature Identifier**: `FEAT-002`
- **Owner**: Fullstack Developer (`role-fullstack-developer`)
- **Status**: In Progress
- **Specification**: [`docs/architecture/FEAT-002-maya-latency-architecture.md`](file:///c:/Saurik/saurik_website/docs/architecture/FEAT-002-maya-latency-architecture.md)
- **PRD**: [`docs/product/FEAT-002-maya-latency-requirements.md`](file:///c:/Saurik/saurik_website/docs/product/FEAT-002-maya-latency-requirements.md)

---

## 2. Ordered Implementation Tasks

- [x] **Task 1: Warmup & Health Endpoint in `api/tts.js`**
  - Path: `api/tts.js`
  - Purpose: Support `GET /api/tts?warmup=true` or query check so client can pre-warm Maya container non-blockingly during speech input.
  - Assertion: Returns `{ status: 'warmup_triggered' }` without requiring OpenAI credentials or blocking.

- [x] **Task 2: Sentence Segmentation & Fast-Path Extraction in `src/hooks/useVoiceAgent.js`**
  - Path: `src/hooks/useVoiceAgent.js`
  - Purpose: Add `splitSentencesForSpeech()` supporting Latin (`.!?`) and Indic (`।`, `\n`) sentence boundaries.
  - Assertion: Multi-sentence paragraph splits into sentence chunks with first sentence having $\le 15$ words.

- [x] **Task 3: Sequential Audio Queue & Stitching in `src/hooks/useVoiceAgent.js`**
  - Path: `src/hooks/useVoiceAgent.js`
  - Purpose: Update `speakWithCloud` to fetch and play Sentence 1 immediately, pre-fetching Sentence 2 concurrently, and chaining via `onended` with an 80–120ms prosodic transition.
  - Assertion: Sentence 1 plays in $\le 1.2$s, Sentence 2 plays continuously upon Sentence 1 completion.

- [x] **Task 4: Barge-In & Cancellation Cleanup**
  - Path: `src/hooks/useVoiceAgent.js`
  - Purpose: On `cancelSpeech()` or user interrupt, abort all active fetch requests, stop the playing audio element, and revoke object URLs.
  - Assertion: Halts all playback within 50ms without audio leakage.

- [x] **Task 5: Author Automated Latency & Pipelining Test Suite**
  - Path: `test/verify_tts_latency.cjs`
  - Purpose: Automated verification asserting:
    1. Sentence segmentation logic across English, Hindi, and Bengali.
    2. Warmup query handling in `api/tts.js`.
    3. Audio queue chaining and cancellation state logic in `useVoiceAgent.js`.
    4. Compliance with Zero-Cost Native Engine Rule.
  - Assertion: `node test/verify_tts_latency.cjs` exits with code 0.

- [x] **Task 6: Full Regression Verification**
  - Purpose: Execute `npm.cmd test` and `npm.cmd run build`.
  - Assertion: 11/11 test suites pass; 17/17 SSG routes pre-rendered with zero errors.
