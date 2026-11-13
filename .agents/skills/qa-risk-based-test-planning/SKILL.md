---
name: qa-risk-based-test-planning
description: Evaluates change blast radius, user journey risks, and selects proportionate testing depth for SAURIK IT.
---

# Skill: Risk-Based Test Planning (`qa-risk-based-test-planning`)

The `qa-risk-based-test-planning` skill determines the appropriate testing scope and depth for a given code change, balancing rigorous quality assurance with delivery velocity.

---

## 1. When to Use

Use this skill when:
- Triaging incoming developer handoffs (`agent-handoff`).
- Planning testing effort for a sprint, milestone, or release.
- Deciding whether a change requires manual browser testing, automated assertion scripts, visual regression audits, or lightweight spot checks.

---

## 2. Risk Classification Matrix

Evaluate every change against the 4 risk tiers:

| Risk Tier | Change Characteristics | Required QA Verification Suite |
|---|---|---|
| **Tier 1: Critical Risk** | Modifications to serverless API routes (`api/`), voice fallbacks, core contact forms, or global shell (`App.jsx`). | Full regression suite (`npm test`), production SSG build (`npm run build`), browser flow testing, failure injection, and manual mobile check. |
| **Tier 2: High Risk** | New route addition, major component restructuring, shared data updates (`src/data/`), or Tailwind theme changes. | Automated test suite execution, static prerender crawlability check, responsive audit across 360px–1440px, and WCAG contrast check. |
| **Tier 3: Medium Risk** | Localized UI component styling, new FAQ disclosure items, or non-critical illustration updates. | Component interaction check, keyboard focus audit, and `npm run build` verification. |
| **Tier 4: Low Risk** | Typo corrections, documentation updates, or test assertion script improvements. | Static diff inspection, proofreading against negative constraints, and targeted single-file test run. |

---

## 3. Risk-Based Plan Output Format

```markdown
# QA Test Plan: [Task / Release Name]

## 1. Change Blast Radius
- **Risk Tier:** [Tier 1: Critical / Tier 2: High / Tier 3: Medium / Tier 4: Low]
- **Files Modified:** [List of paths]
- **Downstream Dependencies:** [Components or routes potentially impacted]

## 2. Selected Verification Suite
- [x] Automated Test Suites (`npm test` — all 10 suites)
- [x] Production SSG Build (`npm run build` — 17 static routes)
- [x] Responsive Breakpoint Audit (360px, 768px, 1440px)
- [x] Negative Constraints & Claim Audit (zero fabricated metrics)
- [ ] Staging Provider Delivery (Flagged as UNTESTED if credentials absent)

## 3. High-Risk Focus Areas for QA
- [Explicit areas where failure is most likely or consequential]
```

