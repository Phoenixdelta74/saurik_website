---
name: api-and-integration-design
description: Defines serverless API route schemas, request/response contracts, HTTP status codes, telemetry headers, timeout budgets, and downstream failure handling for SAURIK IT endpoints.
---

# Skill: API & Integration Design (`api-and-integration-design`)

The `api-and-integration-design` skill establishes unambiguous data contracts, error semantics, timeout ceilings, and telemetry headers for all serverless functions in the `api/` directory.

---

## 1. When to Use

Use this skill when:
- Designing new serverless endpoints (e.g. `api/enquiries.js`, `api/chat.js`, `api/tts.js`).
- Integrating with external APIs (LLM providers, email services, cloud GPU runtimes).
- Specifying API request/response contracts for the Fullstack Developer and QA Reviewer.

---

## 2. Standard Endpoint Contract Specification

Every API design must specify the following 6 structural dimensions:

### 1. Endpoint Route & Allowed HTTP Methods
- Explicit URL path: e.g. `POST /api/chat`, `POST /api/tts`.
- Explicit method validation: Reject disallowed methods with `405 Method Not Allowed`.

### 2. Request Body Schema & Validation
- Standard JSON payload structure.
- Explicit definition of required vs. optional fields.
- Sanitization rules (trim whitespace, length limits, type validation).

### 3. Response Contracts & HTTP Status Codes
Always standardize on clean RESTful status codes:
- **`200 OK`**: Request processed successfully (with typed JSON payload or binary stream).
- **`400 Bad Request`**: Malformed JSON, missing required fields, or validation error.
- **`405 Method Not Allowed`**: Unsupported HTTP verb.
- **`429 Too Many Requests`**: Client rate limit exceeded.
- **`500 Internal Server Error`**: Unexpected uncaught server exception.
- **`502 Bad Gateway`**: Downstream service (e.g. GPU worker, LLM provider) offline or timed out.

### 4. Timeout Budgets & Fast-Fail Ceilings
Never allow serverless functions to block indefinitely:
- Always define an explicit timeout ceiling (e.g. `MAYA_TTS_TIMEOUT_MS = 7500`).
- If downstream does not respond within the ceiling, abort via `AbortController` and cascade to fallback or return `502`.

### 5. Telemetry & Source Attribution Headers
Incorporate standard custom headers to trace execution path without parsing bodies:
- Example: `X-TTS-Engine: maya2-native` vs. `X-TTS-Engine: openai-tts-1`.
- Example: `X-Cache-Status: HIT` vs. `MISS`.

### 6. Downstream Failure & Fallback Contract
Specify exact recovery behavior when an external provider fails:
- Primary fails $\to$ Cascade immediately to secondary provider.
- All providers fail $\to$ Return structured, user-friendly JSON error payload:
  ```json
  {
    "error": "Service temporarily unavailable",
    "code": "DOWNSTREAM_TIMEOUT",
    "fallbackAvailable": false
  }
  ```

---

## 3. API Contract Spec Output Format

```markdown
# API Contract Specification: [Endpoint Name]

## 1. Overview
- **Route:** `POST /api/[endpoint]`
- **Runtime:** Vercel Node.js Serverless Function
- **Authentication:** Public client with rate limiting / Server-side secret verification

## 2. Request Contract
```json
{
  "fieldA": "string (required, max 200 chars)",
  "fieldB": "string (optional)"
}
```

## 3. Response Contract

### Success: `200 OK`
- **Headers:** `Content-Type: application/json`, `X-Source-Engine: [engine-name]`
- **Body:**
```json
{
  "status": "success",
  "data": { ... }
}
```

### Downstream Error: `502 Bad Gateway`
- **Body:**
```json
{
  "error": "Downstream service unavailable",
  "code": "PROVIDER_OFFLINE"
}
```

## 4. Timeout & Resiliency Budget
- **Downstream Timeout Ceiling:** 7500ms
- **Cascade Fallback:** [e.g. OpenAI tts-1 or graceful client notice]
```

