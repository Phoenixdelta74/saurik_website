---
name: website-feature-implementation
description: Translates user stories and architectural plans into production-grade React components and clean code for SAURIK IT. Handles loading, empty, success, and error states with form preservation.
---

# Skill: Feature Implementation (`website-feature-implementation`)

The `website-feature-implementation` skill guides the end-to-end authoring of website features according to agreed user stories, acceptance criteria, and architectural blueprints.

---

## 1. When to Use

Use this skill when:
- Implementing a new page, feature, or interactive component in `src/`.
- Integrating a custom hook or state machine with a UI component.
- Updating existing application logic to meet new functional requirements.

---

## 2. Core Implementation Disciplines

### 1. Minimal Coherent Changes
- Write the smallest coherent diff that completely satisfies the acceptance criteria.
- Avoid scope creep, premature refactoring, or touching unrelated components.

### 2. The 4 Mandatory Component States
Every interactive component or data-driven UI must explicitly implement and test 4 states:
1. **Initial / Idle State:** Clean, accessible default presentation.
2. **Loading / Pending State:** Clear visual progress indication (e.g. spinner, pulse), disabling repeat submit triggers to prevent duplicate submissions.
3. **Success State:** Accessible confirmation message (truthful status copy, e.g. "Draft prepared in email/WhatsApp").
4. **Failure / Recovery State:** Clear, actionable error message **while strictly preserving entered user input** so the user never has to re-type.

### 3. Non-Negotiable Content & Copy Guardrails
- **Truthful Interaction Copy:** Never claim that an enquiry was received until a server endpoint explicitly confirms receipt. State: "Draft prepared in email/WhatsApp".
- **Zero Fabricated Claims:** Never insert placeholder statistics, fake metrics, unverified testimonials, or fabricated partner badges.
- **Service Boundaries:** Server offerings cover on-premise installation and maintenance; never describe or imply public cloud VPS rental.

### 4. Zero-Cost Native Voice Integration
- If the feature involves speech or audio, ground execution in `src/hooks/useVoiceAgent.js` using browser-native Web Speech APIs (`SpeechRecognition` / `SpeechSynthesis`).
- Cloud GPU endpoints (`api/tts.js`) serve strictly as fallback when native voices are absent.

---

## 3. Implementation Workflow

1. **Review Task:** Check acceptance criteria in the user story and implementation plan.
2. **Draft Component:** Author functional React component using hooks and Tailwind design tokens.
3. **Wire States:** Connect idle, loading, success, and error states with preserved form inputs.
4. **Local Verification:** Run `npm run build` and launch verification tests before declaring completion.

