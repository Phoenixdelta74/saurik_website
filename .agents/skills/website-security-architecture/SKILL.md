---
name: website-security-architecture
description: Evaluates security boundaries, secret protection, input sanitization, anti-abuse protections, and privacy-by-design for SAURIK IT. Prevents credential leakage, PII exposure, and injection vulnerabilities.
---

# Skill: Security & Privacy by Design (`website-security-architecture`)

The `website-security-architecture` skill embeds defensive security and privacy principles into every phase of system design. It ensures that SAURIK IT digital assets remain resilient against credential leaks, injection attacks, abuse, and privacy violations.

---

## 1. When to Use

Use this skill when:
- Designing new serverless endpoints or modifying `api/` routes.
- Handling user-submitted data (forms, inquiries, chat inputs).
- Adding or configuring third-party APIs, SDKs, or cloud services.
- Auditing existing components for credential exposure or PII leakage.

---

## 2. Core Security & Privacy Guardrails

### 1. Absolute Secret Protection (Zero-Leakage Mandate)
- **Rule:** Never bundle, hardcode, or interpolate API keys, Bearer tokens, or database credentials into client-side code (`src/`).
- **Storage:** Secrets must be stored exclusively in server-side environment variables (`.env.local` for local development, Vercel Project Environment Variables in production).
- **Audit Verification:** Static bundle inspections (`npm run build`) must verify that no sensitive strings appear in compiled chunks (`dist/assets/*.js`).

### 2. Input Sanitization & Boundary Validation
- All inputs from the browser (`req.body`, query params) must be treated as untrusted.
- Validate types, trim whitespace, enforce maximum payload size (e.g. `< 10 KB` for text endpoints), and sanitize against HTML/script injection before downstream forwarding.

### 3. Privacy-Preserving Logging (Zero PII in Logs)
- Never log raw customer Personally Identifiable Information (PII)—including phone numbers, email addresses, or inquiry contents—into server console logs or cloud logging sinks.
- Log only operational metadata: timestamp, response latency, HTTP status code, error category, and source engine.

### 4. Anti-Abuse & Rate Limiting
- Public serverless endpoints (e.g. `api/chat.js`, `api/tts.js`) must be defended against automated bot abuse.
- Architect rate limiting per IP or session where appropriate.
- Maintain fast-fail timeouts to prevent compute resource starvation.

### 5. Content Security & Cross-Origin Boundaries (CORS)
- Ensure endpoints restrict allowed HTTP verbs and specify appropriate CORS headers.
- Static assets must serve secure headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`).

---

## 3. Security Review Output Format

```markdown
# Security & Privacy Review: [Feature / Endpoint]

## 1. Trust Boundaries & Data Flow
- **Client Tier (Untrusted):** [User browser inputs]
- **Edge Tier (Trusted):** [Vercel serverless function, access to .env.local secrets]
- **Downstream Tier (External):** [Third-party API / Cloud GPU container]

## 2. Secret Protection Verification
- [x] No API keys or tokens present in client code (`src/`)
- [x] Secrets retrieved exclusively from `process.env` on server

## 3. Input Validation & Abuse Defenses
- **Maximum Payload Size:** [e.g. 10 KB]
- **Input Sanitization:** [Validation rules applied]
- **Rate Limiting / Timeout Strategy:** [e.g. 7.5s fast-fail]

## 4. Privacy & PII Audit
- [x] No personal names, phone numbers, or emails logged to console
- [x] Minimal retention of user-submitted query text
```

