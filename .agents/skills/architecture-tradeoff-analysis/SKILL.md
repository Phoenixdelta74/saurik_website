---
name: architecture-tradeoff-analysis
description: Compares technology options and architectural trade-offs systematically for SAURIK IT. Evaluates solutions against cost, maintenance, security, vendor lock-in, and reversibility without fabricated statistics.
---

# Skill: Technology Selection & Trade-Off Analysis (`architecture-tradeoff-analysis`)

The `architecture-tradeoff-analysis` skill provides an evidence-based method for evaluating competing technical solutions, frameworks, libraries, or service providers.

---

## 1. When to Use

Use this skill when:
- Selecting a new external provider, library, hosting mechanism, or service tier.
- Deciding between building custom logic vs. integrating a managed service (e.g. form handling, auth, search).
- Evaluating major refactors or architectural pivots.

---

## 2. The 7-Step Evaluation Pipeline

Every trade-off analysis must work through these 7 structured steps:

```
1. Problem Definition ──► 2. Hard Constraints ──► 3. Option Candidates ──►
4. Multi-Factor Evaluation ──► 5. Recommendation ──► 6. Reversibility ──► 7. Decision Owner
```

### Step 1: Problem Definition
- What precise technical challenge is being addressed?
- Why is an architectural decision required now?

### Step 2: Hard Constraints
- **Zero-Cost Voice Rule:** Speech operations must operate natively in the browser without mandatory paid API costs.
- **Client Security:** No secret keys or admin tokens inside client code.
- **Budget & Maintenance:** Grounded in actual provider pricing tiers (free tiers, pay-as-you-go). **Never invent or assume costs.**

### Step 3: Option Candidates
- Identify 2 to 3 realistic, viable alternatives (e.g. Option A: Native Web Speech, Option B: Self-hosted GPU container on Modal, Option C: Paid third-party Cloud API).

### Step 4: Multi-Factor Evaluation Matrix
Compare all options against the standard architecture criteria:
- **Build Cost & Complexity:** Implementation time and developer effort.
- **Operational Cost:** Recurring cloud, API, or compute expenses.
- **Maintenance Burden:** Long-term patching, uptime monitoring, and failure management.
- **Performance & Latency:** Response time, bundle size impact, cold-start delays.
- **Vendor Lock-in:** How tightly coupled is the codebase to this specific vendor?

### Step 5: Recommendation & Rationale
- Provide a clear, justified recommendation stating *why* Option X is preferred over Option Y.

### Step 6: Reversibility & Migration Path
- What is the cost of reversing or migrating away from this choice later?
- Is there a clean abstraction layer isolating vendor specifics?

### Step 7: Decision Ownership & Review Trigger
- Classify whether this is a **Technical Decision** (owned by Architect) or a **Business Decision** (escalated to Human Stakeholder via `po-decision-management`).
- Specify the review trigger (e.g., *"Revisit if enquiry volume exceeds 1,000/day"*).

---

## 3. Trade-Off Analysis Output Format

```markdown
# Architectural Trade-Off Analysis: [Topic]

## 1. Problem Statement
[Clear description of the technical choice]

## 2. Hard Constraints
- [Non-negotiable constraints, e.g. Zero-Cost Native rule, WCAG 2.2 AA]

## 3. Options Comparison Matrix

| Evaluation Criteria | Option A: [Name] | Option B: [Name] | Option C: [Name] |
|---|---|---|---|
| **Operational Cost** | [Verified cost] | [Verified cost] | [Verified cost] |
| **Complexity to Build** | Low / Med / High | Low / Med / High | Low / Med / High |
| **Performance / Latency** | [e.g. Instant / ~4s] | [e.g. ~3s] | [e.g. ~1s] |
| **Vendor Dependency** | None / Low / High | None / Low / High | None / Low / High |
| **Maintenance Burden** | Minimal | Container updates | High |

## 4. Recommendation & Rationale
**Recommended Choice:** Option [X]
**Rationale:** [1-2 paragraphs detailing why this option best satisfies the constraints]

## 5. Reversibility & Abstraction
[How the implementation will be shielded to enable easy migration if needed]

## 6. Next Step
- If consequential: Record as an ADR in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md).
```

