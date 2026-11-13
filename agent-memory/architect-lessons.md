# Solution Architect Lessons

This file records lessons learned by the Solution Architect role (`solution_architect`) regarding system topology, trade-offs, serverless infrastructure, and data contracts.

---

## Lesson 001: Fast-Fail (7.5s) Timeout & Instant Cascading for Serverless GPU Cold Starts

- **Date:** 2026-11-07
- **Role:** Solution Architect
- **Task:** Low-Traffic Serverless GPU Fallback Architecture
- **Context:** Maya 2 Native 2.5B parameter TTS deployed on Modal Serverless GPU (NVIDIA L4). On sporadic traffic, the container scales to zero, taking 70-95s on cold start.
- **Problem:** A static 45s proxy timeout in `api/tts.js` kept visitors waiting in complete silence before falling back. Users perceived the app as crashed.
- **Cause:** Treating cold-start boot time as an acceptable user-waiting window. In voice interfaces, anything over 6-8 seconds is unacceptable.
- **Action:** Architected the multi-tier cascading fallback:
  - Set a 7.5s fast-fail threshold (`MAYA_TTS_TIMEOUT_MS = 7500`) on Maya.
  - If Maya is warm (<4.5s), return 24kHz Maya Indic speech.
  - If Maya is cold or unreached at 7.5s, immediately abort and cascade to OpenAI `tts-1` (~1.5s latency).
  - Total latency during cold start is capped at ~9s instead of 45-90s.
- **Evidence:** Verified in `scripts/test_tts_fallback.cjs` (switched to OpenAI in 2.99s, returning 200 OK with `X-TTS-Engine: openai-tts-1`).
- **Result:** Fast, dependable voice delivery for sporadic traffic without 24/7 GPU billing.
- **Status:** Verified
- **Applies when:** Integrating serverless GPU models, containerized inference, or high-cold-start third-party microservices.
- **Next check:** Benchmark latency whenever model weights or GPU instance types change.

---

## Lesson 002: Extended Scaledown Keep-Alive (10 Minutes) for Active Sessions

- **Date:** 2026-11-07
- **Role:** Solution Architect
- **Task:** Modal GPU Container Keep-Alive Tuning
- **Context:** Default `scaledown_window` in Modal is 180 seconds (3 minutes).
- **Problem:** Visitors testing or asking questions with pauses longer than 3 minutes triggered a new cold start on their second or third question.
- **Cause:** Scaledown window was too aggressive for conversational sessions.
- **Action:** Increased `scaledown_window` to 600 seconds (10 minutes) in `deploy/modal_maya_app.py`.
- **Evidence:** Deployed and verified on Modal L4 instance.
- **Result:** Once a user begins an interactive voice session, all subsequent turns are guaranteed warm (<4s latency). Container cleanly scales to zero after 10 minutes of complete inactivity.
- **Status:** Verified
- **Applies when:** Tuning scale-to-zero serverless GPU configurations on Modal or RunPod.
- **Next check:** Review GPU bill credits monthly to verify free tier bounds.

