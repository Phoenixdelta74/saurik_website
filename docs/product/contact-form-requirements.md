# Feature: Contact Form (`FEAT-001`)

## 1. Feature Metadata
- **Feature ID:** `FEAT-001`
- **Feature Name:** Customer Contact & Service Enquiry Form
- **Owner:** Product / Planner (`role-product-planner`)
- **Status:** Approved Reference Spec
- **Target Release:** SAURIK IT Digital Platform

---

## 2. Business Objective
Provide prospective business clients and residential customers with an accessible, truthful, and friction-free channel to enquire about SAURIK IT services (AI Automation, Custom Software, and CCTV Installation).

---

## 3. Target User Personas
1. **Commercial / Enterprise Decision Maker:** Exploring AI automation or custom software for business operations.
2. **Residential Property Owner:** Inquiring about CCTV security installation (company name optional).
3. **Screen-Reader / Mobile User:** Accessing the website on mobile devices or assistive tech under varying network conditions.

---

## 4. User Story
**As a** prospective customer,  
**I want to** submit an enquiry with my name, phone number, and service interest,  
**So that** the SAURIK IT team can review my request and contact me with relevant technical guidance.

---

## 5. Functional Requirements
- **FR-01 (Service Selection):** Allow visitors to select a specific service topic (AI Chatbot, Software Development, CCTV Installation, Other). Support pre-population from URL query parameters (e.g., `/contact?service=cctv`).
- **FR-02 (Contact Details):** Collect visitor name and phone number. Keep company name optional for residential CCTV enquiries.
- **FR-03 (Message Payload):** Allow visitors to enter an optional project description or enquiry message.
- **FR-04 (Draft Status Confirmation):** Present unambiguous, truthful feedback upon initiating submission (e.g. "Draft prepared in email/WhatsApp").

---

## 6. Acceptance Criteria (Dual-Path Standard)

### AC-01: Required Field Validation
- **Given** the visitor leaves the Name or Phone field empty,
- **When** they click "Submit" or "Continue via WhatsApp",
- **Then** inline validation alerts appear identifying the missing fields, and no external request is sent.

### AC-02: Happy Path Submission (WhatsApp / Email Draft)
- **Given** valid contact information is entered,
- **When** the visitor submits the form,
- **Then** the application prepares the message draft in the selected channel, AND displays confirmation: *"Draft prepared in [Channel]. Please send the message to complete your enquiry."*

### AC-03: Failure / Offline Recovery Path
- **Given** external protocol launching fails or network drops,
- **When** submission fails,
- **Then** the UI presents a polite fallback notice with direct telephone contact, AND all entered form values remain preserved in the form fields.

### AC-04: Mobile & Accessibility Operability
- **Given** a visitor uses a mobile viewport (360px) or keyboard-only navigation,
- **When** navigating the form,
- **Then** all inputs are operable via `Tab`/`Enter`, focus rings are visible, and touch targets meet the $\ge 44\text{px}$ minimum standard.

---

## 7. Out of Scope
- Customer account registration or login portals.
- Payment processing or commercial billing.
- Claims of automated CRM lead acceptance prior to server confirmation.

---

## 8. Downstream Handoff
- **To UI/UX Designer:** Define layout hierarchy, responsive stacking, and the 8 component interaction states ([`contact-form-design.md`](file:///c:/Saurik/saurik_website/docs/design/contact-form-design.md)).
- **To Solution Architect:** Define endpoint schema, fast-fail timeout budgets, and secret protection ([`contact-form-architecture.md`](file:///c:/Saurik/saurik_website/docs/architecture/contact-form-architecture.md)).
- **To QA Reviewer:** Derive test matrix against AC-01 through AC-04 ([`contact-form-test-report.md`](file:///c:/Saurik/saurik_website/docs/qa/contact-form-test-report.md)).
