# FEAT-002 Production Voice Remediation Plan

**Date:** 2026-11-13
**Status:** In Progress; local handler verified; GPU capacity and production deployment pending
**Owners:** Website developer, Vercel/Modal operator, QA reviewer
**Scope:** Bengali and Assamese speech on Windows when no matching browser voice is installed
**Release gate:** NO-GO for production regional voice until cloud deployment & live acceptance matrix passes

## 1. Evidence and boundaries

- On 2026-11-17, Modal's latest available log reported the Maya function waiting for an L4 GPU worker; Modal was acquiring capacity. The incident-window log query returned no entries, so the November 13 timeout cause remains unconfirmed.
- On 2026-11-17, `test/verify_maya_handler.py` exercised the actual handler through FastAPI ASGI: missing and wrong bearer tokens returned 401 and a valid header returned readiness 200. It does not execute Modal infrastructure or GPU synthesis. The Node runtime tests mock both providers and now cover warmup failure and per-instance throttling. Production audio and Windows playback remain unverified.

- On 2026-11-13 at about 19:24 IST, a short Bengali `POST /api/tts` on `www.saurikit.in` returned HTTP 502 twice. The response reported that the OpenAI TTS fallback key had expired. A separate `source: voice` request to `/api/chat` returned HTTP 200 with a text reply. An earlier typed request failed transiently, so chat availability also warrants monitoring, but it is not the reproduced audio failure.
- A direct Bengali request to the locally configured Maya endpoint, whose host matches the `saurik-maya2-tts` app name, received no response within 60 seconds. This is evidence of an unavailable or slow endpoint for that request, not proof of the internal cause.
- `api/tts.js` abandons Maya after `MAYA_TTS_TIMEOUT_MS` (7,500 ms by default) and then calls OpenAI. A cold Maya container cannot satisfy that deadline if startup takes longer. Preserve the short user-facing deadline unless measured evidence supports a change.
- `deploy/modal_maya_app.py` loads model weights in `@modal.enter()`. The exact production deployment revision, container state, pending time, startup error, and synthesis error are **unverified** because Modal call logs were not accessible in this audit. The supplied Modal link selects approximately 16:53–17:53 IST, before the 19:24 IST website failure; adjust its time filter.
- `test/verify_voice_assistant.cjs` and `test/verify_tts_latency.cjs` passed during the audit. They largely check source text and simulated logic; neither proves production audio generation or playback. Prior QA `GO` evidence in `docs/qa/FEAT-002-maya-latency-test-report.md` is historical and does not clear this new production failure.
- The repository contains a default Maya authentication token in tracked files, while the `@modal.fastapi_endpoint` handler has no bearer-token validation. Modal Web Functions are public by default unless proxy authentication is enabled. Confirm the deployed revision before asserting that the live endpoint has the same exposure. Do not copy any credential value into logs, tickets, or this plan.

## 2. Ordered work

### Phase 0 — Capture the production cause before changing infrastructure

**Owner:** Vercel/Modal operator. **Dependency:** Access to the relevant production projects.

1. In Vercel, identify the deployment serving `www.saurikit.in` and inspect `/api/tts` logs around 19:24 IST. Record the Maya response status or timeout, elapsed time, OpenAI status, and deployment ID without recording credentials or visitor text.
2. In Modal, expand the function-call window to include that time and the later direct test. Record whether calls were pending, starting, running, failed, or absent. Inspect container logs for model download/load, GPU or memory errors, authentication rejection, and synthesis exceptions. If calls are absent, verify that the production `MAYA_TTS_ENDPOINT` points to this deployment and that Vercel can reach it.
3. Compare **names, environment scope, and deployment revision** for `MAYA_TTS_ENDPOINT`, Maya authentication settings, `MAYA_TTS_TIMEOUT_MS`, and `OPENAI_API_KEY` between local development and Vercel Production. Do not export or print values. Record which engine is actually serving successful local tests; local success may be OpenAI fallback rather than Maya.

**Done when:** The incident record identifies the production deployment and separates queue/startup delay, synthesis failure, authentication failure, routing error, and network failure. If logs are insufficient, keep Maya's internal cause marked unknown.

### Phase 1 — Restore the existing audio fallback

**Owner:** Vercel operator. **Dependency:** A valid OpenAI key and approval for production configuration/deployment.

1. Rotate the expired OpenAI credential at its provider, set the new `OPENAI_API_KEY` for the Vercel **Production** environment, and make a new production deployment. Vercel environment changes do not update previous deployments.
2. Verify one short Bengali and one short Assamese `POST /api/tts` through the deployed website. Require HTTP 200, an audio MIME type, nonempty decodable audio, and `X-TTS-Engine`. The cold-start path may legitimately identify `openai-tts-1`; record any provider cost.
3. Check that `source: voice` chat still returns a complete reply before testing browser playback. Do not claim Maya is fixed merely because OpenAI now masks its failure.

**Done when:** A Windows visitor without native Bengali/Assamese voices can hear a complete first answer on production, including after Maya has scaled to zero.

### Phase 2 — Secure the Maya endpoint before its next deployment

**Owner:** Website developer and Modal operator. **Dependency:** Phase 0 deployment check and coordinated credential rotation.

1. Replace the tracked default token in `deploy/modal_maya_app.py` and `.env.example` with non-secret configuration instructions. Rotate the corresponding deployed credential; removing the literal from a new commit does not erase its history or invalidate the old token.
2. Prefer Modal `requires_proxy_auth=True` on the Web Function, a dedicated Modal proxy token stored only in Modal/Vercel secret settings, and matching request headers in `api/tts.js`. If proxy auth is unavailable, validate a secret bearer header inside the FastAPI handler before model work. Never send the credential to `src/` or the browser.
3. Ensure unauthenticated requests are rejected before GPU startup where possible. Bound public website warmup and synthesis calls; `api/_lib/requestGuard.js` is per instance and should not be treated as a global abuse limit.
4. Add authentication and rejection assertions to a focused `test/verify_tts_security.cjs` or extend a suitable existing runtime test. Confirm the deployed endpoint revision matches the reviewed source.

**Done when:** A request without valid server credentials receives 401/403, a valid server request produces audio, and no usable shared token remains in tracked current files. Review Modal billing for unexpected traffic.

### Phase 3 — Make Maya cold starts and warmup observable

**Owner:** Website developer and Modal operator. **Dependency:** Phase 0 diagnosis; Phase 2 protection before exposing new warmup behavior.

1. For a **pending/startup** bottleneck, measure the time spent waiting for a container and in `@modal.enter()`. Check that model weights are truly cached in `maya2-weights`; move repeat downloads to image build or a prepared volume when logs show them. Benchmark cold and warm calls separately. Consider `min_containers` only after the stakeholder accepts its continuous GPU cost. Modal documents this cost/latency trade-off: <https://modal.com/docs/guide/cold-start>.
2. For a **running/synthesis** failure, use the Modal traceback and the same short Bengali/Assamese inputs to fix the exact model, voice, language, GPU, or output-format error in `deploy/modal_maya_app.py`. Do not tune timeout to hide a synthesis exception.
3. Rework `GET /api/tts` in `api/tts.js`: it currently starts an unawaited Maya request, skips `guardRequest`, and returns `warmup_triggered` without confirming readiness. Rate-limit it, trigger it only when a regional fallback is likely, and use a Vercel-supported background-work mechanism if its duration fits the function budget. Otherwise remove the ineffective warmup and rely on the proven fast-fail fallback. Do not report `ready` until a health check proves it. Vercel background work is still bounded by function lifetime: <https://vercel.com/kb/guide/troubleshooting-inconsistent-logs-in-vercel-functions>.
4. Add bounded server telemetry for provider, status category, timeout, and elapsed time. Keep provider errors and credentials out of client responses; retain `X-TTS-Engine` on successful audio.

**Done when:** A cold request takes the documented fallback path within the agreed wait budget; a warm Maya request returns decodable 24 kHz WAV with `X-TTS-Engine: maya2-native`; startup and error timings are visible to operators.

### Phase 4 — Test and release

**Owner:** Developer, then QA reviewer. **Dependency:** Phases 1–3 relevant fixes.

1. Add a runtime test in `test/verify_tts_runtime.cjs` or extend `scripts/test_tts_fallback.cjs` with controlled Maya timeout, Maya 401/500, expired OpenAI 401, successful Maya audio, successful OpenAI fallback, warmup throttling, and a no-secret error response. Keep network-backed smoke tests separate from the deterministic `npm.cmd test` suite.
2. Update `architecture.md`, `docs/decisions.md` if the accepted 7.5-second/fallback or cost decision changes, `testing.md`, `masterdeveloper.md`, and `change_log.md` for implemented architecture, tests, and workflows.
3. Run `npm.cmd test` and `npm.cmd run build`; review the complete diff. Then run a production smoke test after authorized deployment and manually test Bengali and Assamese on Windows Chrome/Edge, first cold and then warm, with audible complete speech, mute, cancellation, and hands-free relisten.
4. Record results and the current release decision in a new `docs/qa/` report. Do not reuse the earlier FEAT-002 `GO` as evidence for this incident.

**Rollback:** If the new Vercel deployment fails, restore the last known working website deployment while preserving the rotated credential configuration. If Maya authentication or deployment fails, keep the 7.5-second fail-fast route and the verified OpenAI fallback active; do not reopen an unauthenticated GPU endpoint. If both providers fail, show accurate text-only status and hold regional voice at NO-GO.

## 3. Acceptance and traceability

The IDs below extend `FEAT-002` for this production incident. Automated checks `TC-06` through `TC-09` have passed locally in `test/verify_tts_runtime.cjs`. Live checks `TC-05` and `TC-10` require production cloud deployment.

| Defect | Acceptance criterion | Test ID | Verification Type | Status |
|---|---|---|---|---|
| `DEF-01` Live TTS 502 | `AC-05` Cold regional reply is audible | `TC-05` | Production Bengali & Assamese cold smoke | Pending Vercel production deployment & OpenAI key |
| `DEF-02` Maya unresponsive | `AC-06` Warm Maya synthesis works & lightweight health probe | `TC-06` | Deterministic mock runtime + Modal live timing | PASSED (Local `verify_tts_runtime.cjs`); Live pending Modal deploy |
| `DEF-03` Endpoint authentication | `AC-07` Only authorized server calls reach Maya | `TC-07` | FastAPI Bearer token assertion & no-secret audit | Local handler passed; deployed authentication and credential rotation pending |
| `DEF-04` Unreliable warmup | `AC-08` Warmup is bounded, rate-limited, and truthful | `TC-08` | Guarded GET warmup & readiness latency check | Mocked proxy checks passed; production readiness pending |
| `DEF-05` Weak release signal | `AC-09` Tests catch provider failures & sanitize leaks | `TC-09` | Fast-fail timeout & zero-credential leak audit | PASSED (Local `verify_tts_runtime.cjs`); Integrated in `npm test` |
| `DEF-06` Browser audio completion | `AC-10` Spoken reply is complete and controls work | `TC-10` | Windows Chrome/Edge manual matrix | Pending production deployment |

**Production sign-off:** Local handler and mocked proxy checks pass; Modal GPU scheduling, live synthesis, credential rotation, deployment, and Windows playback remain unverified. QA holds the production regional voice gate at NO-GO until the live acceptance checks pass.
