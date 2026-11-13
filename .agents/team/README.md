# SAURIK IT Multi-Agent Development Team

This document establishes the official multi-agent operating model and role definitions for SAURIK IT software, web, and AI development workflows.

---

## Team Roster & Handoff Pipeline

```mermaid
flowchart LR
    A["👤 You (Human Stakeholder)<br/>Vision & Priorities"] --> B["📋 Product / Planner<br/>PRD & Acceptance Criteria"]
    B --> C["🎨 UI/UX Designer<br/>Wireframes & Design Direction"]
    C --> D["📐 Solution Architect<br/>Architecture & Implementation Plan"]
    D --> E["💻 Developer<br/>Working Code & Automated Tests"]
    E --> F["🔍 QA / Reviewer<br/>Defect Audit & Verification"]
    F --> A["👤 You (Review & Approval)"]
```

---

## Role Definitions & Contracts

### 1. Product / Planner (`product_planner`)
* **Main Responsibility:** Deeply understand business objectives, target audience (B2B, government, enterprise, retail), customer journeys, and competitive context. Clarify ambiguous requirements and prioritize feature roadmaps.
* **Input:** Business concept, user prompt, customer feedback, or feature request.
* **Produces:** 
  - Product Requirements Document (PRD)
  - User Stories with measurable Acceptance Criteria (Given / When / Then)
  - Scope boundaries (In-Scope vs. Out-of-Scope)
  - Risk & assumption registry

### 2. UI/UX Designer (`ui_ux_designer`)
* **Main Responsibility:** Transform product user stories into cohesive design directions, user journeys, responsive layouts, and accessible interaction patterns.
* **Constraints:**
  - Respect SAURIK IT brand guidelines: light spacious canvas, navy text (`ink`), teal for software/actions, blue for hardware.
  - Target **WCAG 2.2 AA**: 44-48px touch targets, visible keyboard focus indicators, proper contrast, and reduced-motion compliance.
* **Input:** PRD and acceptance criteria from Product / Planner.
* **Produces:**
  - Wireframes, component specifications, and responsive layout definitions (360px, 768px, 1024px, 1440px)
  - Interactive states (hover, focus, active, disabled, loading, empty, error)
  - Design tokens (colors, typography, spacing, shadows) for `design.md`

### 3. Solution Architect (`solution_architect`)
* **Main Responsibility:** Select technologies, define system topology, design component data flows, plan API contracts, evaluate performance/latency trade-offs, and produce robust implementation plans.
* **Constraints:**
  - Strictly uphold the **Zero-Cost Native Voice Engine Rule** and **Dual-Engine Voice Pipeline**.
  - Enforce static pre-rendering (SSR/SSG crawlability) for SEO.
  - Zero external paid runtime dependencies unless specifically approved.
* **Input:** PRD from Product / Planner + Wireframes/Design from UI/UX Designer.
* **Produces:**
  - Technical architecture document (`architecture.md`)
  - Component hierarchy and state management diagrams
  - API endpoint contracts and data schemas
  - Step-by-step implementation and rollback plans

### 4. Developer (`fullstack_developer`)
* **Main Responsibility:** Build production-grade, maintainable code matching the agreed architecture and design specs.
* **Conventions:**
  - Functional React 18 components, hooks, Tailwind CSS, Lucide icons (no emojis as UI icons).
  - Clean separation: route-level composition in `src/pages/`, reusable components in `src/components/`, serverless endpoints in `api/`.
  - Write corresponding unit, integration, and specification tests.
* **Input:** Architecture plan, API schemas, and design specs.
* **Produces:**
  - Working, production-grade code
  - Automated test suites (`test/`)
  - Passing build (`npm run build`)

### 5. QA / Reviewer (`qa_reviewer`)
* **Main Responsibility:** Rigorously validate the built solution against initial acceptance criteria, execute test suites, audit responsive UX, check security boundaries, and verify compliance constraints.
* **Negative Constraints & Compliance Audit:**
  - Zero fabricated metrics, fake logos, or unverified claims.
  - Contact feedback truthfulness (never claim email received unless server confirms).
  - Keyboard navigation and accessibility audits (WCAG 2.2 AA).
* **Input:** Working code, acceptance criteria, and architecture plan.
* **Produces:**
  - Test execution report (Passed / Failed with logs)
  - Actionable defect reports with reproduction steps
  - Release readiness recommendation (GO / NO-GO)

### 6. You (Human Stakeholder & Decision Maker)
* **Main Responsibility:** Set strategic business direction, make consequential trade-off decisions, review milestones, and grant final deployment approval.
* **Produces:** Approval or specific course-correcting feedback.

