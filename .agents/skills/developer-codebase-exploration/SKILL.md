---
name: developer-codebase-exploration
description: Explores and inspects existing repository layout, React components, Tailwind styling, serverless API routes, and developer lessons before modifying code for SAURIK IT. Prevents duplicate code and broken conventions.
---

# Skill: Developer Codebase Exploration (`developer-codebase-exploration`)

The `developer-codebase-exploration` skill ensures the Fullstack Developer thoroughly inspects the active codebase, reusable patterns, existing tests, and developer memory **before writing or altering a single line of code**.

---

## 1. When to Use

Use this skill when:
- Receiving an implementation plan or user story from the Architect or PO.
- Addressing a defect or bug report from QA.
- Beginning work on an existing component, route, or serverless endpoint.

---

## 2. Pre-Flight Exploration Checklist

Before starting implementation, inspect the following 6 structural areas:

### 1. Existing Component & Style Inventory
- Check `src/components/` for reusable widgets, buttons, modal dialogs, and cards.
- Check `tailwind.config.js` and `src/index.css` for defined theme tokens (`canvas`, `surface`, `ink`, `accent`, `border`).
- Reuse existing button and card utility classes (`btn-primary`, `btn-secondary`, `card-surface`) instead of declaring one-off inline hex colors.

### 2. Routes & Navigation Structure
- Inspect `src/App.jsx` for existing route declarations.
- Check `src/pages/` for existing route-level layouts before creating new pages.

### 3. Serverless Runtime & API Routes
- Inspect `api/` for existing serverless functions (e.g. `api/chat.js`, `api/tts.js`).
- Verify existing request/response formats, telemetry headers, and provider adapters.

### 4. Shared Data & Copy Constants
- Inspect `src/data/` (`servicesData.js`, `companyDetails.js`, `chatContext.js`).
- Never hardcode static company details or service copy into components; always import from shared data sources.

### 5. Automated Tests & Build Verification
- Inspect `test/` for existing verification scripts (`test/verify_*.cjs`).
- Check `package.json` scripts (`npm run build`, `npm test`).

### 6. Developer Memory (Step 0)
- Read [`agent-memory/developer-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/developer-lessons.md) and [`agent-memory/shared-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/shared-lessons.md) for past pitfalls, browser quirks, or framework warnings.

---

## 3. Exploration Findings Summary

Before editing files, formulate a concise mental or written summary:
- **Files to Modify:** Exact paths identified.
- **Existing Components to Reuse:** Established UI elements to leverage.
- **Relevant Past Lessons:** Pitfalls to avoid from `developer-lessons.md`.

