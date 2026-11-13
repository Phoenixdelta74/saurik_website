---
name: qa-acceptance-review
description: Deconstructs PO user stories and Given/When/Then acceptance criteria into comprehensive, testable QA verification matrices for SAURIK IT.
---

# Skill: Acceptance Criteria Review (`qa-acceptance-review`)

The `qa-acceptance-review` skill translates product requirements and user stories into unambiguous, testable verification matrices covering both ideal flows and adversarial edge cases.

---

## 1. When to Use

Use this skill when:
- Reviewing a new PRD or set of user stories from the Product / Planner (`role-product-planner`).
- Identifying ambiguous, untestable, or missing acceptance criteria.
- Preparing the test matrix before conducting manual or automated quality audits.

---

## 2. Core Review Principles

### 1. Dual-Path Scenario Derivation
For every user story, QA must derive at least two distinct test paths:
- **Happy Path:** Valid inputs, optimal network, expected UI updates, and truthful status feedback.
- **Failure / Recovery Path:** Malformed inputs, network disconnection, serverless timeouts (e.g. 7.5s GPU ceiling), and verification that user-entered form data is preserved.

### 2. Identifying Unstated Requirements & Gaps
QA must actively probe for missing edge conditions:
- What happens if the user double-clicks the submit button rapidly?
- What happens if the downstream notification service is unreachable?
- Does the form allow submission with spaces-only inputs?
- Does the layout remain usable if the user's browser language lacks regional fonts?

### 3. Rejecting Ambiguity
If a requirement states *"The user gets a confirmation"*, QA must clarify:
- Is it a modal, banner, or toast?
- Does it claim the enquiry was "received" (prohibited without server confirmation) or "draft prepared" (truthful)?
- Flag ambiguities back to the PO rather than making arbitrary assumptions.

---

## 3. Test Matrix Output Format

```markdown
# QA Test Matrix: [Feature / Story Name]

## 1. Story Reference
- **User Story:** `US-XX: [Story Title]`
- **Acceptance Criteria Reference:** [`docs/requirements.md`](file:///c:/Saurik/saurik_website/docs/requirements.md)

## 2. Test Scenarios Matrix

| Scenario ID | Test Path | Given (Precondition) | When (Action / Trigger) | Then (Expected Outcome) | Test Type |
|---|---|---|---|---|---|
| `TC-01` | Happy Path | On `/contact?service=cctv` | Enter valid name & phone, click submit | Draft opened, truthful copy displayed | Manual / Browser |
| `TC-02` | Failure Path | Network disconnected | Click submit | Clear error displayed, input preserved | Adversarial |
| `TC-03` | Edge Case | Rapid duplicate clicks | Click submit 3x quickly | Button disabled on first click, 1 request | Concurrency |
| `TC-04` | A11y Path | Keyboard only | Navigate using Tab & Enter | All fields operable, visible focus | Keyboard |
```

