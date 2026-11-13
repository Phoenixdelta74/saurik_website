---
name: agent-handoff
description: Standardizes structured handoff packages between specialist agents (PO, Architect, UI/UX Designer, Developer, QA Reviewer) for SAURIK IT. Prevents context degradation across agent transitions and maps to docs/templates/handoff-template.md.
---

# Shared Skill: Agent Handoff (`agent-handoff`)

The `agent-handoff` skill provides a standardized protocol and data contract for passing work across the specialist roles in the SAURIK IT team:

$$\text{Product / Planner} \longrightarrow \text{Architect / UI-UX} \longrightarrow \text{Developer} \longrightarrow \text{QA Reviewer} \longrightarrow \text{Human Stakeholder}$$

---

## 1. Why Structured Handoffs Matter

Without structured handoffs, receiving agents must parse massive conversational transcripts, leading to missed constraints, hallucinated assumptions, and wasted tokens. 

A structured handoff provides a self-contained, high-density package containing **only the necessary context, constraints, and actionable artifacts**.

---

## 2. Standard Handoff Matrix

| Transition | Producer | Receiver | Primary Artifacts Passed |
|---|---|---|---|
| **Product $\to$ Architecture** | Product / Planner | Solution Architect | Discovery Brief, PRD, In/Out Scope, NFRs |
| **Product $\to$ UI/UX** | Product / Planner | UI/UX Designer | User Personas, End-to-End Journeys, PRD |
| **Architecture $\to$ Development** | Solution Architect | Fullstack Developer | Component Architecture, API Schemas, ADRs |
| **UI/UX $\to$ Development** | UI/UX Designer | Fullstack Developer | Wireframes, Responsive Layout Tokens, A11y Specs |
| **Development $\to$ QA** | Fullstack Developer | QA Reviewer | Implemented Code, Local Test Results, File Diffs |
| **QA $\to$ Product / Stakeholder** | QA Reviewer | Product / Stakeholder | Test Verification Report, Defect Logs, Release Gate Status |

---

## 3. Standard Handoff Package Format

Every handoff must conform to [`docs/templates/handoff-template.md`](file:///c:/Saurik/saurik_website/docs/templates/handoff-template.md):

```markdown
# Agent Handoff: [Feature Name]

## 1. Metadata
- **From Agent:** [Sending Role, e.g., Product / Planner]
- **To Agent:** [Receiving Role, e.g., Solution Architect]
- **Date:** [YYYY-MM-DD]
- **Status:** [Ready for Review / In Progress / Blocked]

## 2. Executive Context
- **Business Goal:** [1-2 sentences on what this delivers for SAURIK IT]
- **Target User:** [Primary persona]

## 3. Artifact Links
- **PRD / Requirements:** [`docs/requirements.md`](file:///c:/Saurik/saurik_website/docs/requirements.md)
- **User Stories:** [`docs/templates/user-stories-template.md`](file:///c:/Saurik/saurik_website/docs/templates/user-stories-template.md)
- **Architecture / ADRs:** [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md)

## 4. Non-Negotiable Constraints
- [e.g. Zero-Cost Native Voice rule, WCAG 2.2 AA accessibility, truthful draft copy]

## 5. Explicit Action Requested
- **What Receiver Must Produce:** [Specific output expected from receiving agent]
- **Acceptance Criteria to Satisfy:** [Given/When/Then scenarios]

## 6. Open Questions / Blockers
- [Explicit list of items requiring stakeholder input before proceeding]
```

---

## 4. Verification Gate Before Handoff

The sending agent must verify:
- [ ] Are all referenced files created and linked with working paths?
- [ ] Are all negative constraints (no fake claims, truthful copy) respected?
- [ ] Is the requested action clear and unambiguous?

