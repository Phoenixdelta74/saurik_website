---
name: po-decision-management
description: Manages stakeholder clarifications, assumption tracking, and the Taxonomy of Truth (Facts vs Assumptions vs Decisions) for SAURIK IT. Prevents AI hallucination and unverified claims by strictly distinguishing human business decisions from technical choices.
---

# Skill: Decision Management & Taxonomy of Truth (`po-decision-management`)

The `po-decision-management` skill eliminates guessing, unverified claims, and hallucinated requirements by classifying all statements, inquiries, and choices into a strict **Taxonomy of Truth**.

---

## 1. When to Use

Use this skill when:
- Encountering ambiguous instructions or gaps in requirements.
- Making architectural, design, or business assumptions.
- Preparing questions for **You (Human Decision Maker)**.
- Recording significant architectural choices in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md).

---

## 2. The 5-Category Taxonomy of Truth

Every claim, requirement, or proposition must be explicitly assigned to one of the following 5 categories:

| Category | Definition | Authority | Action Protocol |
|---|---|---|---|
| **1. Known Fact** | Grounded in verified code, documentation, or legal reality. | Existing Repo / Verified Reality | Cite file path and line number. Proceed immediately. |
| **2. Reasonable Assumption** | Low-risk, easily reversible implementation detail. | Agent Team | Document explicitly as `[ASSUMPTION]`. Proceed without blocking. |
| **3. Open Question** | Critical missing information with no safe default. | **You (Human Decision Maker)** | Halt work on blocked section; present clear question with options to the user. |
| **4. Business Decision** | Scope, pricing, legal entity, service boundaries, or branding. | **You (Human Decision Maker)** | **Never decide unilaterally.** Propose options and await explicit approval. |
| **5. Technical Decision** | Code structure, library selection, caching, or runtime tuning. | **Solution Architect** | Evaluate trade-offs and record in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md). |

---

## 3. Human Gatekeeper Protocol

### When to Ask the Human Stakeholder
Always escalate to **You (Human Decision Maker)** when:
1. Adding, modifying, or removing a service offering (e.g. adding a new AI product or hardware package).
2. Choosing contact channels (e.g. changing phone numbers, WhatsApp links, or inquiry routing).
3. Modifying constitutional project rules in `AGENTS.md`.
4. Making irreversible business decisions (e.g., pricing, commercial commitments).

### How to Ask (Structured Questioning Format)
When asking the human stakeholder, present clear context and options:
```markdown
**Decision Needed: [Topic]**
- **Context:** [1-2 sentences on why this decision is needed right now]
- **Option A (Recommended):** [Description, pros, cons]
- **Option B:** [Description, pros, cons]
- **Impact if Delayed:** [What is blocked while waiting]
```

---

## 4. Architectural Decision Records (ADRs)

For Technical Decisions, record the outcome in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md) using the standard lightweight format:
- **Number & Title:** `ADR-XXX: [Decision Title]`
- **Status:** Proposed / Accepted / Superseded
- **Context:** The problem or trade-off faced.
- **Decision:** The choice made and the rationale.
- **Consequences:** Positive benefits and accepted trade-offs.

