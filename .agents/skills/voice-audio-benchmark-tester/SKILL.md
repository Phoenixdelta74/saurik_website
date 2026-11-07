---
name: voice-audio-benchmark-tester
description: >-
  Guides automated benchmarking, quality validation, and audio file generation
  for tri-lingual Text-to-Speech models across English, Bengali, and Hindi.
  Audits response latency, HTTP status codes, audio buffer integrity (24kHz sampling),
  and exports playable audio artifacts to the local test directory.
---

# Voice Audio Benchmark Tester Skill

## 1. Overview & Capability
This skill provides the automated testing runbook for verifying speech synthesis models. It tests the complete audio generation pipeline across three real-world business scenarios:
1. **English (`en-IN`):** Corporate software and surveillance enquiry.
2. **Bengali (`bn-IN`):** Local regional operations enquiry for Tripura and Northeast India.
3. **Hindi (`hi-IN`):** Field logistics and Saurik Track fleet enquiry.

---

## 2. Test Matrix & Benchmark Criteria

| Language | Test Sentence | Expected Output | Acceptance Threshold |
| :--- | :--- | :--- | :--- |
| **English** (`en-IN`) | *"Welcome to SAURIK IT. We build custom software and commercial CCTV infrastructure across Tripura."* | 24kHz WAV audio | Latency < 2.5s (warm), Size > 25 KB |
| **Bengali** (`bn-IN`) | *"সৌরিক আইটিতে আপনাকে স্বাগতম। আমরা ত্রিপুরা এবং উত্তর-পূর্ব ভারতে নির্ভরযোগ্য সফটওয়্যার ও সিসিটিভি পরিষেবা প্রদান করি।"* | 24kHz WAV audio | Latency < 2.5s (warm), Size > 25 KB |
| **Hindi** (`hi-IN`) | *"सौरिक आईटी में आपका स्वागत है। हम त्रिपुरा और पूर्वोत्तर भारत में फील्ड ऑपरेशंस और विश्वसनीय सॉफ्टवेयर समाधान प्रदान करते हैं।"* | 24kHz WAV audio | Latency < 2.5s (warm), Size > 25 KB |

---

## 3. Benchmark Verification Script (`scripts/test_maya_tts.cjs`)

The test script must:
1. Support targeting either a local dev server (`http://localhost:3000/api/tts`) or the direct Modal endpoint.
2. Ensure directory `test/output/` exists.
3. Transmit the test payload with proper authentication headers.
4. Record exact request duration (high-resolution timer `process.hrtime.bigint()`).
5. Save the received buffer as `test/output/tts_test_<lang>.wav`.
6. Assert non-empty buffer, valid audio headers, and zero audio clipping.

```bash
# Run the automated benchmark
node scripts/test_maya_tts.cjs
```

---

## 4. Output Report Structure
Upon completion, the skill reports:
- **Status:** PASS / FAIL per language.
- **Latency:** Duration in milliseconds for each language synthesis.
- **Audio File Size:** Recorded file size in KB.
- **Artifact Paths:** Clickable local file links to listen to generated audio.

