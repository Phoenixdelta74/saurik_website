# UI/UX Design Specification — FEAT-002: Voice Synthesis States & Queue Playback

## 1. Design Brief & Problem Statement
- **Feature Tag**: `FEAT-002`
- **Designer**: UI/UX Designer (`role-ui-ux-designer`)
- **Status**: Approved
- **Objective**: Design the visual feedback and audio interaction states during First-Sentence Fast-Path synthesis and chunked playback in `VoiceVisualizer` and `VoiceAgentPanel`. Ensure the user experiences continuous, fluid conversational rhythm with zero visual freezing, abrupt audio clipping, or UI jitter across sentence boundaries.

---

## 2. Interaction State Matrix

| State | Visual Feedback (VoiceVisualizer) | Header / Status Badge | Audio Engine Activity | Accessibility (ARIA) |
|---|---|---|---|---|
| **1. Idle / Ready** | 5 steady resting bars (20% height, `#087F72` / teal) | "Ready to listen" | Inactive | `aria-live="polite"`: "Assistant ready" |
| **2. Listening** | Bars react to mic input energy (20%-100% dynamic pulsing) | "Listening to your voice..." (pulsing mic icon) | Browser STT active | `aria-live="polite"`: "Listening" |
| **3. Thinking / Fast-Path Synthesizing** | Subtle wave shimmer animation across all 5 bars (`teal` with 50% opacity, wave period 800ms) | "Thinking..." | LLM done, Sentence 1 fetching (<1s) | `aria-live="assertive"`: "Synthesizing answer" |
| **4. Speaking (Chunk 1 Playing)** | Dynamic sound wave oscillation based on playback activity | "Speaking..." (Green indicator dot) | Sentence 1 audio output; Sentence 2 pre-fetching silently | `aria-live="off"` (audio speaks for itself) |
| **5. Transition (Chunk 1 to 2)** | Bars maintain gentle 30% baseline float for 100ms (no abrupt collapse to 0) | "Speaking..." | 100ms prosodic rest between sentences | No status disruption |
| **6. Speaking (Chunk 2 Playing)** | Seamless wave resumption | "Speaking..." | Sentence 2 audio output | Uninterrupted audio loop |
| **7. Barge-in / Interrupted** | Instant transition to Listening/Idle within 50ms | "Interrupted" -> "Listening..." | Immediate audio halt, pending requests aborted | `aria-live="assertive"`: "Audio stopped" |

---

## 3. Acoustic & Interaction Design Rules
1. **Zero Popping on Chunk Boundaries**:
   - The audio playback engine must not clip or pop between consecutive chunks.
   - Insert an intentional, natural prosodic pause of 80ms–120ms between sentence completions.
2. **Visual Continuity**:
   - When Sentence 1 finishes and Sentence 2 begins, the `VoiceVisualizer` wave bars must NOT collapse to 0% and restart abruptly. They must smoothly transition across the 100ms pause.
3. **Immediate Barge-In Response**:
   - Tapping the microphone button or speaking during hands-free playback must immediately mute audio, release object URLs, and switch the visualizer back into active Listening mode.
4. **Touch Target Sizing**:
   - The microphone toggle and "End Call" controls must maintain $\ge 48\text{px}$ touch targets across all 5 responsive viewports (360px, 390px, 768px, 1024px, 1440px).

---

## 4. Handoff to Developer
- **Implementation Target**: `src/components/voice/VoiceVisualizer.jsx` and `src/hooks/useVoiceAgent.js`.
- **Key Requirement**: Ensure `isSynthesizing` state smoothly transitions into `isSpeaking` on Sentence 1, while keeping `isSpeaking = true` during sentence-to-sentence stitching.

