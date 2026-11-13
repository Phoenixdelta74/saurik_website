---
name: qa-api-integration-testing
description: Verifies serverless endpoints (api/), status codes, fast-fail timeout budgets, telemetry headers, and downstream failure cascading for SAURIK IT.
---

# Skill: API & Integration Testing (`qa-api-integration-testing`)

The `qa-api-integration-testing` skill executes automated and manual tests against serverless backend endpoints (`api/`) to verify payload validation, HTTP status codes, timeout budgets, and downstream failure cascades.

---

## 1. When to Use

Use this skill when:
- Testing serverless endpoints (e.g. `api/chat.js`, `api/tts.js`).
- Verifying timeout protection and failover cascading (e.g. Maya GPU offline $\to$ OpenAI fallback).
- Auditing telemetry headers, CORS boundaries, and HTTP status codes.

---

## 2. API Test Scenarios & Invariants

Every endpoint must be tested against these 5 scenario classes:

### 1. Happy Path & Payload Integrity
- **Request:** Send valid JSON payload matching the contract.
- **Assertions:**
  - Status code is `200 OK`.
  - Response body is valid JSON or binary audio stream.
  - Required telemetry headers are present (e.g. `X-TTS-Engine`).

### 2. Method Guard Verification
- **Request:** Send `GET`, `PUT`, or `DELETE` to an endpoint that only allows `POST`.
- **Assertions:**
  - Status code is `405 Method Not Allowed`.
  - Header `Allow: POST` is included.

### 3. Input Validation & Boundary Testing
- **Request:** Send empty body `{}`, null values, missing required fields, or oversized payloads ($> 10\text{KB}$).
- **Assertions:**
  - Status code is `400 Bad Request`.
  - Response body contains clean error message without leaking internal paths.

### 4. Fast-Fail Timeout & Downstream Outage Simulation
- **Request:** Test behavior when downstream service (e.g. GPU container or external LLM) is slow or offline.
- **Assertions:**
  - Execution aborts within the defined timeout ceiling (e.g. `MAYA_TTS_TIMEOUT_MS = 7500`).
  - Cascades cleanly to fallback provider or returns structured `502 Bad Gateway`.
  - Total response latency does not exceed timeout ceiling + network margin.

### 5. Secret Protection & Header Audit
- Verify that no API keys or internal environment variables are returned in response headers or bodies.

---

## 3. API Verification Script Example

```javascript
// Test snippet from test/verify_backend_engine.cjs
const http = require('http');

async function testMethodGuard() {
  const req = http.request('http://localhost:3000/api/tts', { method: 'GET' }, (res) => {
    assert.strictEqual(res.statusCode, 405, 'Disallowed method must return 405');
  });
  req.end();
}
```

