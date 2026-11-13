---
name: po-prioritization
description: Prioritizes product backlogs and release scopes using MoSCoW (Must, Should, Could, Later) based on business value, technical dependencies, and launch necessity for SAURIK IT. Avoids fabricated ROI or fake velocity metrics.
---

# Skill: Backlog Prioritization (`po-prioritization`)

The `po-prioritization` skill provides a disciplined, evidence-based framework for ranking requirements, user stories, and technical tasks so that the team always works on what delivers the highest business value first.

---

## 1. When to Use

Use this skill when:
- Scoping a release or milestone.
- Triaging incoming feature requests against development capacity.
- Resolving trade-offs between competing requirements.
- Preventing scope creep and keeping the project focused on essential deliverables.

---

## 2. MoSCoW Prioritization Framework

All features and user stories are categorized into one of four distinct tiers:

### 1. Must Have (Launch-Critical)
*Non-negotiable core functionality.* Without these, the release cannot be deployed to users.
- **Criteria:**
  - Essential to the primary user journey (e.g., viewing services, preparing contact draft).
  - Regulatory, compliance, or core accessibility requirements (WCAG 2.2 AA).
  - Security, zero-cost voice architecture compliance, or static SSG build stability.
- **Example:** Working contact form draft preparation, responsive layout from 360px to 1440px.

### 2. Should Have (High Value / Standard Expectation)
*Important features with acceptable workarounds.* Highly desirable, but the product remains functional without them in a pinch.
- **Criteria:**
  - Improves conversion, usability, or performance significantly.
  - An alternative manual path or simpler implementation exists if delayed.
- **Example:** Filterable FAQ disclosures, automated fast-fail fallback to secondary TTS engine.

### 3. Could Have (Desirable Enhancements)
*Useful improvements to consider if time and resources permit.*
- **Criteria:**
  - Enhances polish, animation fidelity, or edge-case ergonomics.
  - Can be omitted without degrading core user experience.
- **Example:** Audio waveform equalizer visualizer, interactive 3D hardware tilt effects.

### 4. Later / Out of Scope (Deferred to Future Roadmap)
*Ideas that are acknowledged but deliberately deferred.*
- **Criteria:**
  - Requires backend infrastructure not currently planned.
  - Adds unnecessary complexity to the current release scope.
- **Example:** Customer self-service portal, real-time client billing dashboard, public cloud VPS rental.

---

## 3. Anti-Fabrication Prioritization Rule

- **No Fake Velocity or Fabricated ROI:** Never prioritize tasks based on invented ROI statistics (e.g. *"This will increase revenue by 42%"*) or arbitrary story point velocity formulas.
- **Evidence-Based Grounding:** Prioritization must be grounded in real operational facts:
  - Technical dependencies (e.g., `api/chat.js` must exist before adding chat UI).
  - Stakeholder business goals confirmed by **You (Human Decision Maker)**.
  - Verified user experience gaps identified in `agent-memory/product-lessons.md`.

---

## 4. Prioritization Matrix Output

```markdown
# Prioritization Matrix: [Release / Milestone Name]

## 1. Must Have (Deploy Blocker)
| Story / Feature ID | Description | Primary Rationale | Dependencies |
|---|---|---|---|
| `US-01` | [Core capability] | [Why launch fails without it] | None |

## 2. Should Have (High Value)
| Story / Feature ID | Description | Primary Rationale | Dependencies |
|---|---|---|---|
| `US-02` | [Enhanced flow] | [High UX value, workaround exists] | `US-01` |

## 3. Could Have (Polish)
| Story / Feature ID | Description | Primary Rationale | Dependencies |
|---|---|---|---|
| `US-03` | [Visual polish] | [Nice to have if ahead of schedule] | None |

## 4. Later / Out-of-Scope
- `[Feature]`: Deferred because [explicit reason].
```

