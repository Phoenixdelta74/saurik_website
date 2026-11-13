---
name: architect-context-assessment
description: Assesses existing repository implementation, framework stack, serverless endpoints, active constraints, and architectural memory before designing solutions for SAURIK IT. Prevents blind assumptions and over-engineering.
---

# Skill: Codebase & Context Assessment (`architect-context-assessment`)

The `architect-context-assessment` skill ensures that the Solution Architect thoroughly inspects the active codebase, runtime environment, and recorded lessons **before** selecting technologies or designing architectures.

---

## 1. When to Use

Use this skill when:
- Receiving a new PRD or feature request from the Product / Planner (`role-product-planner`).
- Planning modifications to existing services, routes, or backend integrations.
- Evaluating whether a requested feature can be satisfied with existing components or requires new infrastructure.

---

## 2. Core Assessment Dimensions

For any architectural task, the Architect must investigate and document the following 5 dimensions:

### 1. Existing Tech Stack & Runtime Footprint
- **Frontend Stack:** React 18, Vite 6, React Router 6, Tailwind CSS 3, Lucide React.
- **Build & Rendering:** Static Site Generation (SSG) with `scripts/prerender.js` ensuring 100% crawlable zero-JS HTML in `dist/`.
- **Backend / Serverless Runtime:** Vercel serverless Node.js functions in `api/` (e.g. `api/chat.js`, `api/tts.js`).
- **GPU Infrastructure:** Serverless Modal.com container (`deploy/modal_maya_app.py`) running Maya 2 Native 2.5B Indic TTS on an NVIDIA L4 GPU with persistent volume caching.

### 2. Active Architectural Constraints & Rules
- **Zero-Cost Native Voice Rule:** Browser Web Speech API (`SpeechRecognition` / `SpeechSynthesis`) must remain primary; cloud GPU endpoints serve strictly as regional or language fallback.
- **Client Bundle Secret Protection:** Zero API keys or service tokens in client bundles. Secrets must reside exclusively in serverless environment variables (`.env.local` / Vercel secrets).
- **Proportionality Mandate:** Choose the simplest architecture that meets requirements. Do not introduce microservices, Kubernetes, or redundant databases for a marketing site.

### 3. Current Code & Component Inventory
- Inspect existing route components in `src/pages/` and reusable UI in `src/components/`.
- Inspect existing data models in `src/data/` (`servicesData.js`, `companyDetails.js`, `chatContext.js`).
- Verify whether an existing hook or utility satisfies the need (e.g. `src/hooks/useVoiceAgent.js`).

### 4. Memory & Prior Lesson Check (Step 0)
- Read [`agent-memory/architect-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/architect-lessons.md) and [`agent-memory/shared-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/shared-lessons.md).
- Check existing Architecture Decision Records in [`docs/decisions.md`](file:///c:/Saurik/saurik_website/docs/decisions.md) (`ADR-001`, `ADR-002`, `ADR-003`).

### 5. Dependency & Performance Budget
- Total page weight target: `< 300 KB` gzipped for core marketing pages.
- Accessibility target: WCAG 2.2 AA compliant markup.

---

## 3. Context Assessment Output Format

```markdown
# Architectural Context Assessment: [Feature Name]

## 1. Feature Intent & PRD Alignment
- **PRD Reference:** [Link to PRD or User Stories]
- **Core Technical Goal:** [1-sentence summary]

## 2. Current State Inspection
- **Impacted Code Areas:** [List of paths, e.g., `src/components/`, `api/`]
- **Existing Capabilities Reusable:** [Existing components/hooks identified]

## 3. Active Constraints Checklist
- [x] Zero client-side API secrets
- [x] Zero-Cost Native Voice rule respected
- [x] Proportionality confirmed (no unnecessary infrastructure)
- [x] Relevant lessons in `architect-lessons.md` reviewed

## 4. Key Gaps & Technical Questions
- [Gaps requiring trade-off analysis or PO clarification]
```

