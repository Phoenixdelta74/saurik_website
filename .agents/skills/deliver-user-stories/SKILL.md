---
name: deliver-user-stories
description: Breaks requirements into user stories with testable Dual-Path Given/When/Then acceptance criteria (Happy Path and Failure/Recovery Path). Maps directly to docs/templates/user-stories-template.md and enables QA and Developers to write matching tests and code.
---

# Skill: User Stories & Acceptance Criteria (`deliver-user-stories`)

The `deliver-user-stories` skill breaks down high-level requirements into atomic, testable user stories formatted in Gherkin-style **Given / When / Then** syntax.

Crucially, every user story must specify **Dual-Path Acceptance Criteria**: both the **Happy Path** (ideal flow) and the **Failure / Recovery Path** (error handling, offline, timeout, network failure).

---

## 1. When to Use

Use this skill when:
- Converting PRD functional requirements (`deliver-prd`) into actionable backlog items.
- Defining precise acceptance criteria for the Fullstack Developer and QA Reviewer.
- Designing test specifications for automated verification suites (`test/verify_*.cjs`).

---

## 2. Standard Story Format

Every story must follow the standard persona structure:

```markdown
### US-[ID]: [Story Title]
**As a** [user persona / visitor / screen-reader user],
**I want to** [perform an action],
**So that** [achieve a specific business or user value].
```

---

## 3. The Dual-Path Acceptance Criteria Standard

Every user story must provide at least two distinct scenarios:

### Scenario 1: Happy Path (Ideal Execution)
- **Given** [valid initial context and pre-conditions],
- **When** [user triggers primary action with valid input],
- **Then** [expected success state, UI update, and accessible feedback].

### Scenario 2: Failure / Recovery Path (Resilience & Edge Cases)
- **Given** [unfavorable pre-condition, network failure, server error, or invalid input],
- **When** [user triggers action or system encounters timeout],
- **Then** [system presents clear, accessible error message AND preserves user input to prevent data re-entry].

---

## 4. Example User Story

```markdown
### US-01: Prepare CCTV Service Contact Draft
**As a** residential property owner,
**I want to** select CCTV installation on the contact page and draft an enquiry,
**So that** I can get pricing guidance without mandatory company name validation.

#### Acceptance Criteria

##### Scenario 1: Happy Path (WhatsApp Draft Prepared)
- **Given** I am on `/contact?service=cctv`,
- **When** I enter a valid name and phone number and click "Continue via WhatsApp",
- **Then** WhatsApp Web/App opens with a pre-filled message, AND the UI displays: "Draft prepared in WhatsApp. Please send the message to complete your enquiry."

##### Scenario 2: Recovery Path (Network Failure / Timeout)
- **Given** my internet connection drops or the browser fails to launch the external protocol,
- **When** the operation fails,
- **Then** the page displays a polite notice: "Unable to open WhatsApp automatically. You can contact us directly at +91...",
- **And** all entered form values (name, phone, message) remain populated in the form fields.
```

---

## 5. Acceptance Checklist

Before handing off stories to Developer and QA:
- [ ] Does every story follow `docs/templates/user-stories-template.md`?
- [ ] Is every story atomic and independently verifiable?
- [ ] Does every story contain both a Happy Path and a Failure/Recovery Path?
- [ ] Are form preservation requirements explicitly stated for all error scenarios?
- [ ] Are all UI text requirements truthful (no false claims of "Enquiry received" prior to server confirmation)?

---

## 6. Next Step Handoff

Once stories are approved:
- Invoke **`po-prioritization`** to sequence them in the implementation roadmap.
- Invoke **`agent-handoff`** to deliver stories to the Fullstack Developer and QA Reviewer.

