---
name: po-discovery
description: Guides product discovery, problem framing, target audience identification, and business goal alignment for SAURIK IT. Use when exploring raw requests, clarifying unknown requirements, identifying user personas, and separating verified facts from assumptions.
---

# Skill: Product Discovery & Problem Framing (`po-discovery`)

The `po-discovery` skill guides the deconstruction of high-level or ambiguous requests into clear business objectives, target audience profiles, constraints, and testable assumptions before drafting formal requirements.

---

## 1. When to Use

Use this skill when:
- A new feature, page, or service is first requested (e.g., *"We need a contact page"* or *"Let's add a voice assistant"*).
- Requirements are ambiguous or rely on unverified claims.
- The business objective or target audience is not yet documented.

---

## 2. Core Discovery Framework

For any incoming request, answer these 5 foundational discovery dimensions:

### 1. Who is the Audience?
- **Primary Persona:** Who will interact with this feature? (e.g., industrial procurement managers, retail shop owners, residential homeowners).
- **Context of Use:** Where and when do they access it? (e.g., on a mobile device in a noisy warehouse, on a desktop in an office, over a slow 3G connection).
- **Core User Need:** What specific problem are they trying to solve?

### 2. What is the Business Goal?
- What direct business outcome does SAURIK IT expect from this feature?
  - *Example:* Generate qualified enquiries for CCTV installation without drop-off.
- What does "success" look like without inventing vanity metrics?
  - *Example:* All submitted enquiries contain a phone number, service topic, and clear note; user receives immediate feedback.

### 3. What Should Visitors Accomplish?
- What is the step-by-step visitor journey?
  - *Example:* Discover service capability $\to$ Review technical specifications $\to$ Prepare contact draft $\to$ Send via preferred channel (Email / WhatsApp).

### 4. What is Known vs. Unknown?
- **Known Facts:** Grounded in existing repository code, verified documentation, or confirmed by **You (Human Decision Maker)**.
- **Assumptions:** Working hypotheses needed to proceed. Must be labeled explicitly as `[ASSUMPTION]`.
- **Open Questions:** Blocker unknowns that must be escalated to the human stakeholder before finalizing requirements.

### 5. Constraints & Guardrails
- **Zero Fabricated Claims:** Never propose placeholder metrics (e.g. "99.9% uptime", "10,000+ happy customers"), unverified certifications, or fake testimonials.
- **Zero-Cost Native Rule:** Audio features must run locally on browser Web Speech APIs (`SpeechRecognition` / `SpeechSynthesis`) before external cloud fallback.
- **Truthful Status Copy:** Enquiries must say "Draft prepared in email/WhatsApp", never claiming "Enquiry received" without server confirmation.

---

## 3. Discovery Output Format

The output of `po-discovery` is a concise **Discovery Brief**:

```markdown
# Discovery Brief: [Feature Name]

## 1. Problem Statement
[What problem does this solve for the user and SAURIK IT?]

## 2. Target Audience
- **Primary User:** [Persona description]
- **Key Pain Point:** [What frustrates or blocks them today]

## 3. Business Objective
- **Goal:** [Expected business outcome]
- **Success Measure:** [Observable, non-fabricated criteria]

## 4. Key Constraints
- [e.g. WCAG 2.2 AA accessibility, Zero-Cost voice, responsive down to 360px]

## 5. Verified Facts vs. Assumptions
- **Verified Facts:** [List with citations/references]
- **Assumptions:** [List items tagged as ASSUMPTION]
- **Open Questions for Stakeholder:** [Items requiring human approval]
```

---

## 4. Next Step Handoff

Once the Discovery Brief is agreed upon:
- Invoke **`deliver-prd`** to generate the formal Product Requirements Document.
- Invoke **`po-decision-management`** if critical business questions require human sign-off.

