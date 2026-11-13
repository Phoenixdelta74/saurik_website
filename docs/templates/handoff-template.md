# Inter-Agent Handoff Specification Template

## 1. Feature Identification
- **Feature Name**: [Feature Title]
- **From**: Product / Planner (`role-product-planner`)
- **To**: [UI/UX Designer (`role-ui-ux-designer`) / Solution Architect (`role-solution-architect`)]
- **Date**: [YYYY-MM-DD]

---

## 2. Business Intent & Scope Summary
- **Business Objective**: [1-2 sentences explaining why this feature is being built]
- **Target User**: [Persona profile and usage context]
- **Scope Summary**: [Bullet points of exact deliverables included in this slice]
- **Explicit Exclusions**: [What is out-of-scope]

---

## 3. Acceptance Criteria Reference
- **PRD Document**: `docs/templates/prd-template.md` (or specific PRD path)
- **User Stories**: `docs/templates/user-stories-template.md`
- **Critical Failure Path**: [Summary of required error handling and state persistence]

---

## 4. Known Constraints & Non-Negotiables
- [x] Zero-Cost Native Engine Rule (browser speech primary; serverless GPU fallback)
- [x] Zero-JS SSR Crawlability (static HTML in dist/)
- [x] Negative Marketing Copy Guardrail (zero fabricated numbers, truthful contact draft status)
- [x] WCAG 2.2 AA (touch targets >= 44px, visible focus, contrast >= 4.5:1)

---

## 5. Required Downstream Action & Open Questions
- **Action Required by Next Role**:
  - *If UI/UX*: Produce responsive layout spec and component interaction states.
  - *If Architect*: Design system topology, state flow, API contracts, and update ADRs.
- **Open Questions Needing Decision**:
  - [Any unresolved business or technical question]

