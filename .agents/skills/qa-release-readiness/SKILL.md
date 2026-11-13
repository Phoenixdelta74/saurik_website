---
name: qa-release-readiness
description: Produces an evidence-based test result report and release recommendation (Passed, Failed, Blocked, Untested) for SAURIK IT.
---

# Skill: Release Readiness & Verification (`qa-release-readiness`)

The `qa-release-readiness` skill synthesizes all test outcomes, automated suites, code reviews, and visual audits into an evidence-based **GO / NO-GO** release recommendation for **You (Human Decision Maker)** and the Product Planner.

---

## 1. When to Use

Use this skill when:
- Evaluating whether a completed feature or sprint milestone is ready to merge or deploy.
- Formulating the final QA deliverable prior to human sign-off.
- Preparing release notes and risk assessments.

---

## 2. Core Release Gates

A release is marked as **READY FOR DEPLOYMENT** only if all 5 quality gates pass:

1. **Gate 1: Build & Prerender Integrity:** `npm run build` succeeds with zero errors, pre-rendering all 17 public routes.
2. **Gate 2: Automated Regression Suite:** `npm test` passes 10/10 test suites cleanly.
3. **Gate 3: Acceptance Criteria & Negative Constraints:** All user stories verified; zero unverified metrics, zero fabricated claims, and truthful draft feedback confirmed.
4. **Gate 4: Critical & High Defects:** Zero open Critical or High severity defects.
5. **Gate 5: Accessibility & Responsiveness:** Verified across 360px–1440px viewports with zero horizontal overflow and WCAG 2.2 AA compliant focus indicators.

---

## 3. Release Readiness Report Format

```markdown
# QA Release Readiness Report: [Release / Feature Name]

## 1. Executive Recommendation
- **Verdict:** [GO / READY FOR RELEASE | NO-GO / BLOCKED | READY WITH LIMITATIONS]
- **Target Commit / Branch:** [Branch name / Commit hash]
- **Auditor:** QA Reviewer Agent

## 2. Quality Gate Verification Matrix
| Quality Gate | Description | Outcome | Evidence |
|---|---|---|---|
| **Gate 1** | SSG Production Build (`npm run build`) | PASS | 17/17 routes pre-rendered |
| **Gate 2** | Automated Test Suites (`npm test`) | PASS | 10/10 suites passed |
| **Gate 3** | Negative Marketing Constraints | PASS | 0 fabricated metrics found |
| **Gate 4** | Defect Triage | PASS | 0 Critical, 0 High defects |
| **Gate 5** | Responsive & A11y Audit | PASS | Verified 360px–1440px |

## 3. Scope Verification Summary
- **Passed:** [List of verified functional paths]
- **Failed:** [List of active bugs if any]
- **Blocked / Untested:** [Items that could not be verified, e.g. live SMS gateway without keys]

## 4. Final Sign-Off Request
- Escalate to **You (Human Decision Maker)** for final deployment approval.
```

