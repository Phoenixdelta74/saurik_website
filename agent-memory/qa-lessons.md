# QA / Reviewer Lessons

This file records lessons learned by the QA / Reviewer role (`qa_reviewer`) regarding defect detection, test harness resilience, and regression gates.

---

## Lesson 001: Automated Engine Header Assertions (`X-TTS-Engine`)

- **Date:** 2026-11-07
- **Role:** QA / Reviewer
- **Task:** Verification of Multi-Tier TTS Fallback
- **Context:** Testing whether `/api/tts` actually used Maya or OpenAI when both were configured.
- **Problem:** Without inspecting internal engine telemetry, a test could receive a valid audio buffer without knowing if it actually fell back or used the primary model.
- **Cause:** Lack of explicit provider tagging in HTTP response headers.
- **Action:** Enforced `X-TTS-Engine` response header (`maya2-native` vs `openai-tts-1`). Created `scripts/test_tts_fallback.cjs` and added explicit header assertions in `test/verify_voice_assistant.cjs`.
- **Evidence:** `node scripts/test_tts_fallback.cjs` asserts `res.getHeaders()['x-tts-engine'] === 'openai-tts-1'`.
- **Result:** Automated test suites can deterministically verify fallback behavior without inspecting server internal state.
- **Status:** Verified
- **Applies when:** Verifying multi-provider fallbacks, LLM routers, or multi-engine pipelines.
- **Next check:** Include telemetry header assertions for any new fallback mechanism.

---

## Lesson 002: Resilient Cross-Platform Python Detection in Test Harnesses

- **Date:** 2026-11-07
- **Role:** QA / Reviewer
- **Task:** Client Onboarding CLI Automated Verification (`test/verify_onboard_cli.cjs`)
- **Context:** Test executed `python -m ...` on Windows where Anaconda or non-standard Python paths were present.
- **Problem:** Test failed with `'python' is not recognized as an internal or external command` on machines lacking bare `python` in global PATH.
- **Cause:** Assuming global `python` alias exists across all environments.
- **Action:** Added candidate path resolution for Windows (`LocalAppData/Programs/Python`, `anaconda3`, `py.exe`) and added graceful static AST contract fallback if Python packages are missing in the active shell.
- **Evidence:** Tested in `test/verify_onboard_cli.cjs`; passes cleanly in both CI and local developer environments.
- **Result:** Robust test suite execution across disparate developer machines without false-positive failures.
- **Status:** Verified
- **Applies when:** Writing Node.js test scripts that spawn child CLI processes.
- **Next check:** Audit any new CLI runner scripts.

