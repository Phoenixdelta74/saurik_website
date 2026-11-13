# Implementation Task Plan: Contact Form (`FEAT-001`)

## 1. Plan Metadata
- **Feature ID:** `FEAT-001`
- **Source Documents:**
  - Requirements: [`docs/product/contact-form-requirements.md`](file:///c:/Saurik/saurik_website/docs/product/contact-form-requirements.md)
  - Design Spec: [`docs/design/contact-form-design.md`](file:///c:/Saurik/saurik_website/docs/design/contact-form-design.md)
  - Architecture: [`docs/architecture/contact-form-architecture.md`](file:///c:/Saurik/saurik_website/docs/architecture/contact-form-architecture.md)
- **Implementer:** Fullstack Developer (`role-fullstack-developer`)
- **Status:** Complete / Verified

---

## 2. Ordered Work Breakdown Structure

### Phase 1: Exploration & Shared Data Alignment
- [x] **Task 1.1:** Inspect `src/data/companyDetails.js` for verified contact numbers and emails.
- [x] **Task 1.2:** Inspect `src/data/servicesData.js` to ensure service topics match active offerings.

### Phase 2: React Component & Hook Implementation
- [x] **Task 2.1:** Implement `src/pages/Contact.jsx` with responsive split 2-column desktop layout.
- [x] **Task 2.2:** Connect URL query string reader (`useSearchParams`) to auto-populate the service topic dropdown.
- [x] **Task 2.3:** Implement client-side input validation for required fields (Name, Phone).
- [x] **Task 2.4:** Implement all 4 core component states (Idle, Submitting, Success, and Failure).
- [x] **Task 2.5:** Ensure form state is strictly preserved during failure/offline scenarios.

### Phase 3: Accessibility & Styling Refinements
- [x] **Task 3.1:** Verify visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent-teal`) on all inputs and buttons.
- [x] **Task 3.2:** Verify touch target bounding boxes are $\ge 44\text{px}$ on mobile viewports.
- [x] **Task 3.3:** Ensure truthful feedback copy: "Draft prepared in email/WhatsApp".

### Phase 4: Automated Verification & Build
- [x] **Task 4.1:** Verify static SSR crawlability in `scripts/prerender.js` for `/contact`.
- [x] **Task 4.2:** Execute `npm test` and `npm run build` to verify 0 regressions.
- [x] **Task 4.3:** Hand off to QA Reviewer via [`docs/handoffs/FEAT-001-contact-form.md`](file:///c:/Saurik/saurik_website/docs/handoffs/FEAT-001-contact-form.md).
