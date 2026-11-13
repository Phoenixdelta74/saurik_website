# SAURIK IT Agent Team Operating System & Handshake Protocol

This document defines the operating guidelines, inputs, outputs, and handshakes for the 5 specialized autonomous agents working with **You (Human Decision Maker)**.

---

## The 6-Stage Development Lifecycle

```
Stage 1: Inception & Strategy       [You] ──► Business Intent / Goals
                                       │
Stage 2: Product & Scope            ▼ [Product / Planner]
                                    Produces: PRD & Acceptance Criteria
                                       │
Stage 3: Experience Design          ▼ [UI/UX Designer]
                                    Produces: Wireframes & Responsive Layouts
                                       │
Stage 4: Technical Blueprint        ▼ [Solution Architect]
                                    Produces: Architecture & Implementation Plan
                                       │
Stage 5: Build & Tests              ▼ [Developer]
                                    Produces: Code & Automated Test Suites
                                       │
Stage 6: Quality Gate & Audit       ▼ [QA / Reviewer]
                                    Produces: Test Report & Defect Matrix
                                       │
Final Decision                      ▼ [You]
                                    Decision: Approval (Deploy) or Feedback (Iterate)
```

---

## Agent Roster & Invocation Specs

| Agent Role | Subagent Name | Role Memory File | Primary Input | Primary Deliverable | Next In Chain |
|---|---|---|---|---|---|
| **Product / Planner** | `product_planner` | `agent-memory/product-lessons.md` | User vision / feature brief | PRD & User Stories (Given/When/Then) | `ui_ux_designer` & `solution_architect` |
| **UI/UX Designer** | `ui_ux_designer` | `agent-memory/design-lessons.md` | PRD & User Stories | Layouts, Component States, Design Tokens | `solution_architect` & `fullstack_developer` |
| **Architect** | `solution_architect` | `agent-memory/architect-lessons.md` | PRD + UX Layouts | Architecture Spec (`architecture.md`) & Implementation Plan | `fullstack_developer` |
| **Developer** | `fullstack_developer` | `agent-memory/developer-lessons.md` | Architecture Plan & Design Tokens | Code (`src/`, `api/`) & Automated Tests (`test/`) | `qa_reviewer` |
| **QA / Reviewer** | `qa_reviewer` | `agent-memory/qa-lessons.md` | Working Code + PRD Acceptance Criteria | Verification Matrix, Defect Log, Release Recommendation | **You (Human Stakeholder)** |
| **You** | *(Human)* | `docs/decisions.md` | Release Recommendation & Live Demo | Final Approval or Iteration Feedback | Production Deploy / Next Feature |

---

## Standard Handoff Templates

### 1. Product / Planner Handoff: `PRD Specification`
```markdown
## Product Brief: [Feature Name]
- **Target User**: [e.g. Enterprise Operations Manager / Retail Shop Owner]
- **Business Objective**: [What metric or outcome this unlocks]

### User Stories & Acceptance Criteria
- **Story 1**: As a [user], I want to [action] so that [benefit].
  - **Given** [precondition], **When** [trigger], **Then** [expected outcome].
- **Edge Cases & Out-of-Scope**:
  - Excluded: [Explicit exclusions]
```

### 2. UI/UX Designer Handoff: `Design Specification`
```markdown
## Design Direction: [Feature Name]
- **Information Architecture**: [Hierarchy of content]
- **Breakpoint Rules**:
  - Mobile (360-390px): [Single column, accordion disclosures, fixed bottom bar]
  - Tablet/Desktop (768-1440px): [Split dual-panel, sticky navigation]
- **Component States**: Default, Hover, Active, Focus (visible outline), Loading, Empty, Error
- **Accessibility**: 44px touch targets, contrast >= 4.5:1, `prefers-reduced-motion`
```

### 3. Solution Architect Handoff: `Technical Plan`
```markdown
## Architecture Plan: [Feature Name]
- **Topology**: [Frontend SPA / SSG / Serverless Endpoint / GPU Worker]
- **Component Hierarchy**: [Parent -> Child tree]
- **API Contract**:
  - Method: `POST /api/...`
  - Payload Schema: `{ ... }`
  - Response Schema: `{ ... }` (Success 200, Fallback 502)
- **Constraint Compliance**: Zero-Cost Native Engine Rule, Zero-JS SSR Crawlability
```

### 4. Developer Handoff: `Code & Tests`
```markdown
## Implementation Summary
- **Files Modified/Created**: [List of paths]
- **Test File Added**: `test/verify_[feature].cjs`
- **Build Status**: `npm run build` passed with zero errors.
```

### 5. QA / Reviewer Handoff: `Release Recommendation`
```markdown
## QA Audit & Verification Report
- **Acceptance Criteria Verification**: [X/X Passed]
- **Negative Marketing Constraints Audit**: [PASSED: Zero fabricated claims]
- **Accessibility & Responsive Audit**: [PASSED across 360px - 1440px]
- **Defects Discovered**: [None / List of actionable issues with severity]
- **Recommendation**: [READY FOR HUMAN APPROVAL / BLOCKED]
```

