---
name: website-api-implementation
description: Implements Vercel serverless functions in api/ with strict input validation, fast-fail timeouts, telemetry headers, and clean error handling for SAURIK IT.
---

# Skill: Backend & Serverless API Implementation (`website-api-implementation`)

The `website-api-implementation` skill guides the construction and maintenance of robust, secure, and fast serverless Node.js endpoints located in the `api/` directory.

---

## 1. When to Use

Use this skill when:
- Authoring or modifying serverless endpoints (e.g. `api/chat.js`, `api/tts.js`).
- Implementing server-side request validation, provider adapters, or timeout ceilings.
- Adding telemetry headers, error payloads, or anti-abuse protections.

---

## 2. Serverless Function Implementation Standards

### 1. HTTP Verb & Payload Guards
- Enforce allowed HTTP methods at the top of the function:
  ```javascript
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  ```
- Reject malformed or oversized JSON payloads immediately.

### 2. Fast-Fail Timeout Protection
Never permit a serverless function to hang indefinitely waiting for downstream third-party APIs or GPU containers:
- Always enforce an explicit timeout using `AbortController` (e.g., `MAYA_TTS_TIMEOUT_MS = 7500`).
- If the downstream request times out, abort cleanly and return `502 Bad Gateway` or cascade immediately to secondary fallback.

### 3. Server-Only Secret Management
- Read all provider keys and API secrets exclusively from `process.env`.
- If an expected secret is missing, return a structured `502` or `500` error with a clear developer message; **never crash the process or expose raw undefined variables**.

### 4. Telemetry Headers
Inject custom telemetry headers to trace execution source:
- `res.setHeader('X-TTS-Engine', engineSource);`
- `res.setHeader('X-Response-Time', `${Date.now() - startTime}ms`);`

### 5. Privacy-Preserving Logging
- Log only operational metadata: request timestamp, method, endpoint, response latency, and error code.
- **Never log customer PII:** Do not log customer names, phone numbers, email addresses, or raw inquiry text to `console.log`.

---

## 3. Standard Serverless Function Template

```javascript
/**
 * SAURIK IT — Serverless Endpoint Template
 */

const TIMEOUT_MS = 7500;

export default async function handler(req, res) {
  const startTime = Date.now();

  // 1. Method Guard
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Input Validation
  const { input, topic } = req.body || {};
  if (!input || typeof input !== 'string' || input.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or invalid "input" parameter' });
  }

  // 3. Timeout Budget
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    // 4. Downstream Provider Call
    // const response = await fetch(PROVIDER_URL, { signal: controller.signal, ... });
    clearTimeout(timeoutId);

    res.setHeader('X-Response-Engine', 'primary-engine');
    return res.status(200).json({ success: true, timestamp: Date.now() });
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';

    // 5. Clean Error Response (No PII)
    return res.status(502).json({
      error: isTimeout ? 'Gateway Timeout' : 'Downstream Service Error',
      code: isTimeout ? 'TIMEOUT' : 'DOWNSTREAM_ERROR',
      latencyMs: Date.now() - startTime,
    });
  }
}
```

