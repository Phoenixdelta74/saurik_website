---
name: implementation-planning
description: Breaks architectural designs into structured, ordered implementation tasks with file paths, test assertions, dependencies, and rollback strategies for SAURIK IT.
---

# Skill: Implementation Planning (`implementation-planning`)

The `implementation-planning` skill translates high-level architectural solutions into concrete, checkable, and sequentially ordered work items that the Fullstack Developer and QA Reviewer can execute without ambiguity.

---

## 1. When to Use

Use this skill when:
- Transitioning from solution design (`solution-design`) to development execution.
- Breaking a multi-file feature or architectural change into ordered phases.
- Preparing the technical section of an agent handoff (`agent-handoff`).

---

## 2. Core Implementation Planning Principles

### 1. Atomic & Checkable Steps
Every task in the plan must represent a distinct, verifiable deliverable with a clear completion condition (e.g., *"Create `src/components/MyComponent.jsx` and verify it exports cleanly"*).

### 2. Dependency Ordering
Sequence work so prerequisite tasks precede dependent ones:
$$\text{Data Models / Contracts} \longrightarrow \text{Backend / API Routes} \longrightarrow \text{React Hooks / State} \longrightarrow \text{UI Components} \longrightarrow \text{Integration Tests}$$

### 3. Explicit File Paths
Always list the exact target file paths to be created, modified, or deleted. Never leave file locations ambiguous.

### 4. Verification Harness First
Every technical plan must specify the automated test assertion file (e.g. `test/verify_[feature].cjs`) that will prove the implementation meets acceptance criteria before declaring done.

### 5. Rollback & Reversibility Strategy
For changes impacting production builds or live endpoints, define the fallback or rollback procedure if a deployment failure occurs.

---

## 3. Implementation Plan Output Format

```markdown
# Implementation Plan: [Feature Name]

## 1. Architectural Scope & Context
- **Target Feature:** [1-sentence goal]
- **Design Reference:** [`architecture.md`](file:///c:/Saurik/saurik_website/architecture.md)
- **ADR Reference:** [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md)

## 2. Work Breakdown Structure (Ordered Steps)

### Phase 1: Data Contracts & Backend
- [ ] **Step 1.1:** Define payload validation and endpoint in `api/[endpoint].js`.
- [ ] **Step 1.2:** Add fast-fail timeout ceiling and error status handling.

### Phase 2: State Management & Client Hooks
- [ ] **Step 2.1:** Implement custom hook in `src/hooks/use[Feature].js`.
- [ ] **Step 2.2:** Connect failure recovery and state preservation logic.

### Phase 3: UI Components & Styling
- [ ] **Step 3.1:** Create UI component in `src/components/[Feature].jsx`.
- [ ] **Step 3.2:** Verify WCAG 2.2 AA contrast, 44px touch targets, and responsive layout (360px–1440px).

### Phase 4: Automated Verification & Documentation
- [ ] **Step 4.1:** Author automated test suite in `test/verify_[feature].cjs`.
- [ ] **Step 4.2:** Run `npm test` and `npm run build` to confirm zero regressions.
- [ ] **Step 4.3:** Update `change_log.md` and `architecture.md`.

## 3. Rollback Considerations
- [Steps to revert or isolate this feature if tests fail]
```

