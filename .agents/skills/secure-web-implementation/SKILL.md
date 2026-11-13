---
name: secure-web-implementation
description: Applies secure coding standards, prevents secret leakage into client bundles, sanitizes inputs, and eliminates PII logging for SAURIK IT.
---

# Skill: Secure Web Implementation (`secure-web-implementation`)

The `secure-web-implementation` skill provides concrete coding guidelines to ensure that developers write defensive, resilient, and secure code that protects user data and company infrastructure.

---

## 1. When to Use

Use this skill when:
- Writing or modifying API endpoints in `api/`.
- Handling user inputs in forms, search bars, or chat prompts.
- Adding third-party NPM packages or external scripts.
- Verifying client-side code for accidental credential exposure.

---

## 2. Core Security Implementation Rules

### 1. Absolute Secret Protection (Zero Client Secrets)
- **Mandate:** Never import, hardcode, or reference private API keys, service tokens, or database passwords in `src/` (client-side React).
- **Audit Rule:** Client bundles are public. If a secret key begins with `sk-`, `key_`, or is an authorization token, it must **never** be referenced in `src/`.
- **Environment Separation:** Access secrets strictly via `process.env.[SECRET_NAME]` inside serverless functions in `api/`.

### 2. Defensive Input Sanitization
- Never trust input from the browser.
- Validate payload shapes and types before processing:
  ```javascript
  const cleanInput = String(req.body.input || '').trim().slice(0, 500);
  ```
- Protect against script injection by using React's default JSX string escaping; **never use `dangerouslySetInnerHTML`** unless sanitized by an audited sanitizer.

### 3. Privacy-Preserving Logging (Zero PII in Logs)
- Never log user phone numbers, email addresses, names, or unmasked IP addresses to `console.log`.
- Redact or omit user payloads before logging operational errors:
  ```javascript
  console.error('[API ERROR]', { endpoint: '/api/tts', error: err.message, status: 502 });
  ```

### 4. Open-Redirect & Deep-Link Safety
- External deep links (e.g. WhatsApp, Email) must use validated parameters and encode query strings safely using `encodeURIComponent`.
- Links opening in a new tab must always include `rel="noopener noreferrer"`.

---

## 3. Pre-Handoff Security Checklist

Before handing off code to QA:
- [ ] Are all API keys stored strictly in `.env.local` / serverless environment?
- [ ] Are all client-side form inputs validated and sanitized?
- [ ] Is `console.log` free of customer personal information (PII)?
- [ ] Does `npm run build` succeed without compiling secrets into `dist/assets/*.js`?

