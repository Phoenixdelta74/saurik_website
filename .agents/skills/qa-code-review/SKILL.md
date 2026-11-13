---
name: qa-code-review
description: Independently inspects code diffs for unhandled errors, secret leaks, missing tests, and shared component regressions for SAURIK IT.
---

# Skill: Independent Code & Change Review (`qa-code-review`)

The `qa-code-review` skill provides an independent, critical audit of modified source files to detect subtle bugs, security vulnerabilities, unhandled error conditions, and regressions before code is merged or released.

---

## 1. When to Use

Use this skill when:
- Reviewing a completed feature implementation from the Fullstack Developer (`role-fullstack-developer`).
- Auditing a pull request or git diff prior to staging or production deployment.
- Verifying that code changes adhere strictly to project architectural constraints.

---

## 2. Core Code Review Dimensions

### 1. Specification & Acceptance Criteria Parity
- Compare the code diff directly against the PO's PRD and acceptance criteria.
- Did the developer omit any failure paths?
- Did the developer implement undocumented scope or change requirements unilaterally?

### 2. Error Handling & Asynchronous Resilience
- Are all asynchronous `fetch()` calls wrapped in `try/catch` blocks?
- Do serverless functions enforce timeout ceilings (`AbortController`)?
- Are error responses typed and structured, or do they leak raw stack traces?

### 3. Security & Secret Protection Audit
- Scan the diff for accidentally committed API keys, tokens, or credentials (`sk-`, `key_`).
- Verify that secrets are referenced strictly via `process.env` in `api/` and never inside `src/`.
- Ensure no customer PII (phone numbers, email addresses, names) is logged to `console.log`.

### 4. Shared Component Regressions
- Did changes to a shared component (e.g. `src/components/Header.jsx`, `ChatWidget.jsx`) alter behavior on other pages?
- Are Tailwind design tokens reused consistently, or were one-off inline hex styles introduced?

### 5. Negative Marketing Constraints Audit
- Scan for fabricated claims: unverified customer statistics, fake uptime percentages, or placeholder testimonials.
- Verify form copy: must state "Draft prepared", never claiming "Enquiry received" prior to server acceptance.

---

## 3. Code Review Findings Output Format

```markdown
# QA Code Review: [Feature / PR Name]

## 1. Diff Scope Overview
- **Files Modified:** [List of paths]
- **Lines Changed:** `+X / -Y` lines

## 2. Findings Matrix

| Finding ID | Severity | File & Line | Description | Required Action |
|---|---|---|---|---|
| `CR-01` | High | `api/tts.js:28` | Missing timeout ceiling on fetch call | Add `AbortController` with 7.5s budget |
| `CR-02` | Medium | `src/components/Card.jsx:45` | Hardcoded hex color `#123456` | Replace with Tailwind token `accent-teal` |
| `CR-03` | Low | `src/pages/Contact.jsx:110` | Minor typo in aria-label | Correct label text |

## 3. Recommendation
- **Status:** [APPROVED / CHANGES REQUESTED / BLOCKED]
```

