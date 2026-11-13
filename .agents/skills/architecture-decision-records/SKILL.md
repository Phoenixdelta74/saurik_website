---
name: architecture-decision-records
description: Authors and maintains Architecture Decision Records (ADRs) in docs/decisions.md for SAURIK IT. Preserves technical rationale, evaluated alternatives, consequences, and validation criteria to eliminate architectural churn.
---

# Skill: Architecture Decision Records (`architecture-decision-records`)

The `architecture-decision-records` skill provides a disciplined process for documenting consequential technical decisions in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md).

An Architecture Decision Record (ADR) preserves **context, alternatives, and consequences** so future agents do not repeatedly question or dismantle critical technical choices.

---

## 1. When to Author an ADR

Author an ADR for decisions with **meaningful, long-term consequences**:
- Selection or migration of core frameworks, bundlers, or hosting providers.
- Architecture of external API integrations and failover protocols (e.g. ADR-002: Fast-Fail Timeout & Cloud Fallback).
- Architectural guardrails and cost policies (e.g. ADR-001: Zero-Cost Native Voice Engine).
- Governance protocols (e.g. ADR-003: Recursive Agent Learning Protocol).

**Do NOT author ADRs for routine choices:** CSS utility classes, minor component refactoring, or routine bug fixes do not need ADRs.

---

## 2. Standard ADR Schema

Every ADR added to [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md) must follow this schema:

```markdown
### ADR-XXX: [Descriptive Decision Title]

- **Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-YYY]
- **Date:** YYYY-MM-DD
- **Decision Owner:** Solution Architect / **You (Human Decision Maker)**

#### Context & Problem Statement
[Describe the technical context, business drivers, and the problem requiring an architectural commitment.]

#### Decision Drivers
- [Driver 1, e.g., Eliminating cold-start browser freezes]
- [Driver 2, e.g., Zero recurring third-party API expenses]
- [Driver 3, e.g., Cross-browser reliability]

#### Considered Options
1. **Option 1:** [Description]
2. **Option 2:** [Description]
3. **Option 3:** [Description]

#### Decision
[State the exact architectural choice adopted, including scope, configuration, and implementation boundaries.]

#### Consequences
- **Positive:** [What benefits and guarantees are unlocked]
- **Negative / Trade-offs:** [What complexity, cost, or limitations are accepted]

#### Validation & Verification
[How automated test suites or benchmarks confirm this decision remains effective in production, e.g. `npm test`, `test/verify_*.cjs`.]

#### Review Trigger
[Under what conditions should this decision be revisited, e.g. when native browser APIs support Indic scripts.]
```

---

## 3. ADR Lifecycle & Governance

1. **Proposed:** Drafted by the Solution Architect; awaiting verification or stakeholder review.
2. **Accepted:** Verified, supported by automated tests, and committed to `docs/decisions.md`.
3. **Superseded:** Replaced by a newer decision. When superseding, never delete the old ADR—mark it as `Superseded by ADR-YYY` and link to the new record to preserve history.

---

## 4. Integration with Test Verification Harness

Whenever a new ADR is added:
- Update [`test/verify_recursive_learning.cjs`](file:///c:/Saurik/saurik_website/test/verify_recursive_learning.cjs) to assert the presence and required sections of the new ADR.

