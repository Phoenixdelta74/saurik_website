# Repository Guide

## Project overview

This repository contains the SAURIK IT Private Limited marketing website. It is a client-rendered React 18 application built with Vite 6, React Router 6, Tailwind CSS 3, and Lucide React icons.

The current design direction is a light, spacious interface using navy text, teal for software and primary actions, and blue for hardware. Read `design.md` before making substantial content, layout, or interaction changes; it is the product and design acceptance brief.

## Common commands

- Install dependencies: `npm.cmd install`
- Start the development server: `npm.cmd run dev`
- Run automated test suites: `npm.cmd test`
- Create a production build: `npm.cmd run build`
- Preview the production build: `npm.cmd run preview`

At minimum, run `npm.cmd test` and `npm.cmd run build` after code changes. For visual or interaction work, also check the affected pages in a browser at mobile and desktop widths.

## Application structure

- `src/App.jsx` defines the shared shell and routes.
- `src/pages/` contains the route-level pages: Home, Software, Hardware, About, Contact, Privacy, and NotFound.
- `src/components/` contains shared navigation, footer, calls to action, process and FAQ components, plus interactive software and hardware illustrations.
- `src/data/` contains company details and service copy. Prefer updating these sources instead of duplicating content in components.
- `api/` contains the Vercel serverless chat endpoint and server-side LLM provider adapters; never move provider credentials into client-side code.
- `.agents/skills/` contains role personas and modular tactical skills (PO, Architect, Developer, UI/UX, QA).
- `.agents/team/` contains the multi-agent operating system, handshakes, and team specs (`roles.md`).
- `agent-memory/` contains persistent role-specific lesson logs and `shared-lessons.md`.
- `docs/` contains living requirements (`requirements.md`), ADRs (`decisions.md`), templates (`docs/templates/`), and role-specific feature artifacts (`product/`, `design/`, `architecture/`, `tasks/`, `qa/`, `handoffs/`).
- `src/index.css` contains Tailwind layers and shared component classes.
- `tailwind.config.js` defines the design tokens.
- `public/` contains the logo and favicon.

Routes are `/`, `/software`, `/hardware`, `/about`, `/contact`, and `/privacy`; all unmatched routes render the not-found page.

## Implementation conventions

- Use functional React components and hooks.
- Keep route-level composition in `src/pages/` and reusable behavior in `src/components/`.
- Use React Router `Link` or `NavLink` for internal navigation.
- Reuse the Tailwind theme tokens (`canvas`, `surface`, `ink`, `accent`, and `border`) and the shared button/card classes before adding one-off values.
- Use Lucide icons consistently. Do not introduce emoji as interface icons.
- Keep software and hardware understandable through text labels as well as color.
- Preserve query-string topic selection when linking a service to `/contact`.
- Keep the AI assistant grounded in `src/data/chatContext.js`; update the shared data sources when published service information changes.
- Keep animation brief and respect reduced-motion preferences.
- **Zero-Cost Native Voice Engine Rule**: The website voice assistant must operate primarily via the client's browser-native Web Speech APIs (`SpeechRecognition` for STT and `SpeechSynthesis` for TTS). It must never mandate external paid TTS/STT API keys for standard client voice operation, ensuring zero recurring voice API expenses, instant client-side performance, multilingual capability (English, Hindi, Bengali), and an accessible continuous hands-free conversation loop.
- **Dual-Engine Voice Pipeline**: The voice assistant separates text cognition from audio generation:
  1. **Cognitive Layer (LLM)**: Grounded in `src/data/chatContext.js`, answers user enquiries via `api/chat.js` using configured LLM providers (OpenRouter/OpenAI/Anthropic/Ollama). Requires an active LLM key in `.env.local` to generate text.
  2. **Audio Layer (Speech)**: Driven primarily by `window.speechSynthesis` (Zero-Cost Rule). When regional voices are absent on client devices (e.g. Bengali on Windows/Android), requests route to the Maya 2 Native Serverless GPU fallback endpoint on Modal (`api/tts.js`).

## Product and content constraints

- Do not publish placeholder contact details or unverified claims, metrics, client logos, testimonials, warranties, response times, partnerships, certifications, geographic coverage, or project outcomes.
- Treat text in `design.md` as draft unless it is explicitly identified as confirmed.
- The contact form currently prepares an email or WhatsApp message. Its feedback must say that a draft was opened or prepared; it must not claim that an enquiry was received unless a server confirms acceptance.
- Keep company optional for residential CCTV enquiries.
- Server offerings cover installation and service; do not imply public cloud hosting or server rental.
- Data analytics copy may describe predictive modelling and forecasting but must not guarantee forecast accuracy.
- Agentic AI copy must show scoped permissions and human review for consequential actions.

## Accessibility and responsive behavior

- Target WCAG 2.2 AA, including keyboard operation, semantic headings, visible focus, useful labels and errors, and sufficient contrast.
- Maintain practical touch targets around 44-48 px.
- Check layouts at 360, 390, 768, 1024, and 1440 px when a change affects responsive composition.
- Ensure the mobile menu, FAQ disclosures, forms, and floating WhatsApp control remain usable by keyboard and do not obscure content.
- Preserve entered form values after submission failures and expose status changes to assistive technology.

## Change discipline

- Keep changes scoped to the requested task and preserve unrelated local work.
- Review the complete diff before handing off a change.
- This folder may be provided without Git metadata. Confirm repository state before relying on Git-based workflows.
- **Always update documentation**: Whenever modifying architecture, routes, services, or workflows:
  - Update `architecture.md` if components, data flow, routing (e.g. static SSR vs. SPA), or design tokens change.
  - Update `change_log.md` with every deliverable under a structured version entry (`Added`, `Changed`, `Fixed`).
  - Update `testing.md` and `masterdeveloper.md` whenever test suites or developer patterns are introduced or modified.
- **Always verify builds and test suites**: Run `npm.cmd run build` and relevant verification scripts (`test/verify_track_spec.cjs`, `test/verify_track_e2e.cjs`, etc.) before concluding work.
- **Spec reset and work isolation protocol**: When directed to scrap or pivot from an existing feature implementation, never permanently delete previous work without confirmation. Archive previous work to `archive/<feature-tag>/` to maintain a clean active workspace while preserving prior implementation history.
## Pre-release testing gate before commit & push

Prior to committing and pushing to remote:
- Execute `web-release-tester` checks: production build (`npm.cmd run build`), all automated test suites (`npm.cmd test`, `test/verify_chatbot.cjs`), and verify zero-JS SSR crawlability.
- Audit for negative constraints: zero fabricated metrics, zero unsubstantiated compliance badges, and truthful contact feedback wording.
- Provide structured, descriptive commit messages documenting scope, test outcomes, and updated docs.

## Recursive learning protocol

All agents operating in this repository adhere to an evidence-based recursive learning loop:

### 1. Before starting a task
- Read the relevant requirements (`docs/requirements.md`) and existing architecture (`architecture.md`).
- Read your role's lesson file (`agent-memory/<role>-lessons.md`) and `agent-memory/shared-lessons.md`.
- Apply only lessons relevant to the active task; do not apply stale or superseded guidance.

### 2. During the task
- Work strictly toward the acceptance criteria defined by Product / Planner.
- Record material architectural choices, trade-offs, and consequences in `docs/decisions.md` (ADRs).
- Adhere to the **Anti-Thrashing Circuit Breaker**: If a test or build fails, make at most **two focused correction attempts**. If unresolved after two attempts, stop, document the blocker and tried actions, and escalate to the human stakeholder.

### 3. After the task
- Run all checks appropriate to the change (`npm.cmd test` and `npm.cmd run build`).
- If an empirical, reusable lesson was learned, append it to your role's lesson file in `agent-memory/` using the structured format: `Date`, `Role`, `Task`, `Context`, `Problem`, `Cause`, `Action`, `Evidence`, `Result`, and `Status` (`Observed`, `Proposed`, `Verified`, `Superseded`).
- Never record secrets, credentials, personal data, or unverified opinions. Mark unverified thoughts as `Status: Observed` or `Proposed`.

### 4. Lesson graduation ladder & human gatekeeper
- **Graduation Flow:**
  `Observation ──► Verified Lesson (agent-memory/) ──► Automated Test (test/verify_*.cjs) ──► Project Rule (AGENTS.md)`
- **Human Gatekeeper Rule:** Agents must **never** unilaterally edit `AGENTS.md` to promote a lesson into a permanent rule. Only **You (Human Decision Maker)** can grant approval to update project-level rules.
- **Preference for Automated Tests:** Whenever a recurring defect or invariant is identified, prefer writing an automated assertion script in `test/verify_*.cjs` rather than expanding prose rules in prompts.

