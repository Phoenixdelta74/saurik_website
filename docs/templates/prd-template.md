# Product Requirements Document (PRD) Template

## 1. Document Control & Problem Framing
- **Feature Name**: [Feature Title]
- **Author**: Product / Planner (`role-product-planner`)
- **Status**: [Draft / In Review / Approved]
- **Target Audience**: [e.g. Northeast Regional Business Owners / Operations Managers]
- **Business Goal**: [What business outcome or customer capability this unlocks]

---

## 2. Taxonomy of Truth (Facts vs. Assumptions)
- **Known Facts**:
  - [Fact 1 with citation or evidence]
- **Reasonable Assumptions**:
  - [Assumption 1 (state why reversible)]
- **Open Questions for Human Stakeholder**:
  - [Question 1 needing decision]

---

## 3. Scope Boundaries
- **In-Scope (Must Have for Milestone)**:
  - [Core feature slice 1]
  - [Core feature slice 2]
- **Out-of-Scope (Deferred to Later)**:
  - [Deferred capability 1]

---

## 4. Key User Journeys & Functional Requirements
- **Journey 1**: [Step-by-step path user takes]
- **Requirement FR-1**: [Specific functional rule]
- **Requirement FR-2**: [Specific functional rule]

---

## 5. Non-Functional Requirements
- **Performance / Latency**: [e.g. Initial paint < 1.5s, voice response < 4s]
- **Accessibility**: WCAG 2.2 AA (touch targets >= 44px, visible focus rings, contrast >= 4.5:1)
- **Crawlability**: Zero-JS static HTML pre-rendering in `dist/`
- **Negative Constraints**: Zero fabricated metrics, zero unverified partner badges

---

## 6. Success Metrics & Verification Gate
- **Evaluation Criteria**: [How success is measured without inventing fake stats]
- **QA Verification Gate**: 100% automated test suite pass + negative constraints audit

