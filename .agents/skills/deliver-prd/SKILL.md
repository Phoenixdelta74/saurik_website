---
name: deliver-prd
description: Authors structured, unambiguous Product Requirements Documents (PRD) for SAURIK IT features and pages. Defines in-scope and out-of-scope boundaries, user journeys, functional and non-functional requirements, and maps to docs/templates/prd-template.md.
---

# Skill: PRD Authoring (`deliver-prd`)

The `deliver-prd` skill provides the exact methodology for authoring comprehensive, unambiguous Product Requirements Documents (PRD) that bridge business intent with technical execution.

---

## 1. When to Use

Use this skill when:
- Transitioning from discovery (`po-discovery`) into formal specification.
- Planning a new page, major interactive component, or backend service integration.
- Creating the canonical single source of truth for the Architect, UI/UX Designer, Developer, and QA agents.

---

## 2. Core PRD Sections

Every PRD produced must follow the structure defined in [`docs/templates/prd-template.md`](file:///c:/Saurik/saurik_website/docs/templates/prd-template.md):

1. **Executive Summary & Business Context:**
   - Problem statement and business value.
   - Grounded in verified company services (`src/data/servicesData.js`, `src/data/companyDetails.js`).

2. **Scope Boundaries (Strict Inclusion / Exclusion):**
   - **In-Scope:** Explicit list of features, pages, or states to be built.
   - **Out-of-Scope:** Explicit list of features intentionally excluded to avoid scope creep (e.g. *"No payment gateway integration", "No user authentication portal"*).

3. **User Personas & End-to-End Journeys:**
   - Primary and secondary user personas.
   - Step-by-step navigation path through the application.

4. **Functional Requirements:**
   - Numbered, verifiable requirements (`FR-01`, `FR-02`, etc.).
   - Explicit state requirements (loading, empty, success, error, timeout).

5. **Non-Functional Requirements (NFRs):**
   - **Accessibility:** WCAG 2.2 AA compliance, visible focus states, 44-48px touch targets, full keyboard navigability.
   - **Performance:** Instant client-side response, zero-JS SSR crawlability for static routes.
   - **Responsive Breakpoints:** Fully verified across 360px, 390px, 768px, 1024px, and 1440px.
   - **Zero-Cost Voice Rule:** Mandatory use of browser Web Speech API with serverless fallback only when native voice is missing.

6. **Negative Marketing Constraints:**
   - Zero fabricated performance metrics (e.g., uptime %, customer counts).
   - Truthful form wording: "Draft prepared", never "Enquiry submitted/received" until server confirmation.
   - On-premise server scope: No claims of public cloud rental or hosting.

7. **Success Criteria & Acceptance:**
   - Observable verification criteria without fabricated KPIs.

---

## 3. PRD Quality Checklist

Before finalizing any PRD, verify:
- [ ] Are all requirements uniquely numbered (`FR-01`, `FR-02`, etc.)?
- [ ] Is out-of-scope clearly defined?
- [ ] Are failure/timeout states specified for all network operations?
- [ ] Are all data claims grounded in real repository data?
- [ ] Does it reference [`docs/templates/prd-template.md`](file:///c:/Saurik/saurik_website/docs/templates/prd-template.md)?

---

## 4. Next Step Handoff

Once the PRD is complete:
- Invoke **`deliver-user-stories`** to break down the functional requirements into testable Given/When/Then user stories.
- Invoke **`agent-handoff`** to deliver the PRD package to the Solution Architect and UI/UX Designer.

