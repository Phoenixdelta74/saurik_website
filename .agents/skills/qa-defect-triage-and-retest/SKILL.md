---
name: qa-defect-triage-and-retest
description: Reports reproducible defects with severity ratings, tracks resolutions, and executes retest verification for SAURIK IT.
---

# Skill: Defect Triage & Retest Verification (`qa-defect-triage-and-retest`)

The `qa-defect-triage-and-retest` skill standardizes how software defects are documented, triaged by severity, communicated to the Fullstack Developer, and retested after a fix is submitted.

---

## 1. When to Use

Use this skill when:
- Discovering a discrepancy between observed behavior and acceptance criteria.
- Capturing a regression, runtime exception, or accessibility failure.
- Retesting a resolved issue after the Developer submits a fix.

---

## 2. Defect Severity Triage Guidelines

Assign each defect to one of 4 objective severity tiers based on user impact:

| Severity | Criteria & Impact | Example |
|---|---|---|
| **Critical** | Core business flow is completely broken; data loss; security secret leak; build failure. | Build prerender crash; enquiries fail completely with no error shown; API keys exposed in client bundle. |
| **High** | Major feature unavailable or misleading; false success claims; unhandled timeout freeze. | Form claims enquiry received when server failed; voice assistant freezes browser for 45s without fallback. |
| **Medium** | Feature works but has noticeable usability flaw, layout overflow, or non-blocking defect. | Layout clipped on 360px screen; missing visible focus indicator on mobile hamburger menu. |
| **Low** | Minor cosmetic glitch, styling inconsistency, or documentation typo. | Padding slightly inconsistent; non-functional icon color discrepancy. |

---

## 3. Standard Defect Report Format

Every defect logged must be completely reproducible:

```markdown
# Defect Report: [DEF-XXX] [Short Title]

- **Severity:** [Critical | High | Medium | Low]
- **Status:** [Open | In Progress | Fixed | Retested & Verified | Closed]
- **Found In:** [Commit hash / Branch / Local Dev]
- **Environment:** [e.g. Chrome 120, Windows 11, Viewport: 375px]

### 1. Preconditions
[Any initial state required, e.g., Maya GPU cold start or slow network emulation]

### 2. Steps to Reproduce
1. Navigate to `http://localhost:5173/contact?service=cctv`.
2. Leave the "Name" field blank.
3. Click "Continue via WhatsApp".

### 3. Expected Result
[Clear validation error displayed beside the Name field; form does not proceed.]

### 4. Actual Result
[WhatsApp opens with undefined name string in URL parameters.]

### 5. Evidence & Logs
- Screenshot: `[Link or description]`
- Terminal / Console error: `[Log output if any]`

### 6. Retest Verification (Post-Fix)
- **Retest Date:** YYYY-MM-DD
- **Retest Result:** PASS / FAIL
- **Verified By:** QA Reviewer
```

