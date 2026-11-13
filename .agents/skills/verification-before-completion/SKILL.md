---
name: verification-before-completion
description: Audits deliverables prior to completion, enforcing transparent reporting of what was tested, test results, and what remains unverified for SAURIK IT.
---

# Skill: Verification Before Completion (`verification-before-completion`)

The `verification-before-completion` skill prevents false claims of completion. It requires the Developer to independently verify work against real execution results and transparently declare what was tested and what remains unverified.

---

## 1. The Core Truthfulness Mandate

- **Never assume or extrapolate:** Never claim that code works because *"it should work"* or *"the logic looks correct."*
- **Evidence-Based Claims Only:** Only report tests that were actually executed with visible pass/fail outputs in the terminal or browser.
- **Explicit Declaration of Unverified Elements:** If an integration requires an external API key that is not configured locally, explicitly document: *"Live provider delivery unverified (API key not configured)."*

---

## 2. Pre-Completion Audit Protocol

Before declaring an implementation task complete, the Developer must execute and document these 4 checks:

### 1. Build Verification
- Execute `npm run build`.
- Verify zero syntax errors, zero missing imports, and that all 17 public routes pre-render successfully via SSG.

### 2. Automated Test Verification
- Execute `npm test`.
- Verify that all 10 automated test suites pass cleanly.

### 3. Responsive & Accessibility Spot Check
- Verify that the component does not cause horizontal layout overflow on mobile (360px–390px).
- Verify keyboard operability (`Tab`, `Enter`) and visible focus states.

### 4. Negative Marketing Constraints Audit
- Verify that no placeholder statistics, fake metrics, unverified client logos, or false enquiry confirmations exist in the implemented copy.

---

## 3. Verification Report Format

Include this verification summary in the developer handoff to QA:

```markdown
### Verification Summary
- **Automated Tests:** `npm test` passed (10/10 suites).
- **Production Build:** `npm run build` passed (17 routes pre-rendered).
- **Responsive Layout:** Checked at 360px and 1440px with zero horizontal scroll.
- **Negative Constraints:** Verified zero unverified metrics or false claims.
- **Not Yet Verified:** [Explicit list of items requiring staging/production keys, e.g., real SMS dispatch].
```

