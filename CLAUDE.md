# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the SAURIK IT Private Limited marketing website: a client-rendered React 18 SPA built with Vite 6, React Router 6, and Tailwind CSS 3. Design direction is light/spacious with navy text, teal for the Software & IT division, and blue for the Hardware & IT division. Read `design.md` before making substantial content, layout, or interaction changes — it is the product and design acceptance brief.

This folder may be provided without Git metadata — confirm repository state before relying on Git-based workflows.

## Commands

- Install: `npm.cmd install`
- Dev server: `npm.cmd run dev` (http://localhost:3000)
- Automated test suites: `npm.cmd test`
- Production build: `npm.cmd run build`
- Preview production build: `npm.cmd run preview`

At minimum, run `npm.cmd test` and `npm.cmd run build` after code changes (pass criteria: exit code 0, 10/10 test suites pass, bundles emitted to `dist/`, and 17 static HTML routes pre-rendered). For visual/interaction changes, also check affected pages in a browser at 360, 390, 768, 1024, and 1440px widths.

## Architecture & Application Structure

- `src/App.jsx` — shared shell (Header, routed content, WhatsAppCTA, ChatWidget, Footer) and route definitions.
- `src/pages/` — route-level pages: Home, Software, Hardware, About, Contact, Privacy, Track, Arthos, UseCases, Services (WebsiteDevelopment, CctvInstallation, CustomSoftware), AiChatbot, Terms, RefundPolicy, and NotFound.
- `src/components/` — shared/reusable pieces: Header, Footer, WhatsAppCTA, ChatWidget, PageMetadata, ProcessTimeline, FAQAccordion, and interactive illustrations (AgenticWorkflow, CCTVSelector, AnalyticsChart).
- `src/data/` — **single source of truth for all business copy**: `companyData.js` (legal name, verified phone/email, working principles, delivery process), `softwareData.js` (capabilities, Agentic AI workflow stages, FAQs), `hardwareData.js` (CCTV/Computers/Servers categories, home vs business specs, FAQs), and `chatContext.js` (grounded AI assistant context). Never hardcode phone numbers, emails, or capability lists in JSX — always import from here.
- `api/` — Vercel serverless endpoints: `api/chat.js` (multi-provider LLM chatbot), `api/tts.js` (GPU Maya 2 Indic voice synthesis). Never expose provider API keys in client bundles.
- `docs/` — Living documentation and handoffs: `requirements.md`, `decisions.md` (ADRs), templates (`docs/templates/`), and feature specifications (`docs/product/`, `docs/design/`, `docs/architecture/`, `docs/tasks/`, `docs/qa/`, `docs/handoffs/`).
- `agent-memory/` — Persistent role lesson logs (`<role>-lessons.md`) and `shared-lessons.md`.
- `.agents/skills/` — Role personas and modular tactical skills across PO, Architect, Developer, UI/UX, and QA.
- `src/index.css` — Tailwind layers plus shared component classes (buttons, cards).
- `tailwind.config.js` — design tokens: `canvas` (#F7F9F8 bg), `surface` (#FFFFFF), `ink.primary`/`ink.secondary` (text), `accent.teal` (#087F72, software actions), `accent.blue` (#2456A6, hardware actions), `border.subtle`. Reuse these tokens and existing shared button/card classes before adding one-off values.

### Routing and deep-linking

Routes:
- **Core & Company**: `/`, `/software`, `/hardware`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`
- **Products & Platforms**: `/track` (Saurik Track), `/arthos` (Arthos Invoice Studio), `/ai-chatbot` (Saurik AI Chatbot)
- **Specialized Services**: `/services/website-development`, `/services/cctv-installation`, `/services/custom-software`
- **Industry Use Cases**: `/use-cases`, `/use-cases/fmcg-demand-planning`, `/use-cases/manufacturing-demand-planning`, `/use-cases/apparel-demand-planning`
- **Fallback**: All unmatched routes render the custom 404 page (`/404`).

Service CTAs link to `/contact?topic=<id>` (e.g. `custom_apps`, `data_analytics`, `cctv_residential`, `cctv_commercial`, `hardware_servers`); `Contact.jsx` reads this via `useSearchParams` to preselect the category and expand sub-options. Preserve this query-string topic selection whenever linking a service to `/contact`. Software/Hardware pages also expose deep hash anchors (e.g. `/software#agentic-ai`).

### Smart Enquiry System

The contact form does not submit to a backend. It only prepares a `mailto:` draft or an encoded WhatsApp message (`https://wa.me/919862087157?text=...`). Status text must say a draft was opened/prepared — never claim an enquiry was "sent" or "received" unless a server actually confirms it. Company name must stay optional for residential CCTV enquiries.

## Multi-Agent Operating Model

When collaborating with other agents (Antigravity, Codex):
- Read your role's persistent lessons in `agent-memory/<role>-lessons.md` and `agent-memory/shared-lessons.md` before starting.
- Standardize all handoffs via Markdown files in `docs/` (`docs/product/`, `docs/design/`, `docs/architecture/`, `docs/tasks/`, `docs/qa/`, `docs/handoffs/`).
- Adhere to the **Anti-Thrashing Circuit Breaker**: If a test or build fails, make at most **two focused correction attempts**. If unresolved after two attempts, stop and escalate.
- **Human Gatekeeper Rule**: Never unilaterally edit `AGENTS.md` without explicit human stakeholder approval.

## Implementation conventions

- Functional components and hooks only; route-level composition lives in `src/pages/`, reusable behavior in `src/components/`.
- Use React Router `Link`/`NavLink` for internal navigation.
- Use Lucide React icons consistently; do not use emoji as interface icons.
- Distinguish software vs. hardware content through text labels as well as color.
- Keep animation brief and respect `prefers-reduced-motion`.
- **Zero-Cost Native Voice Engine Rule**: The website voice assistant must operate primarily via the client's browser-native Web Speech APIs (`SpeechRecognition` for STT and `SpeechSynthesis` for TTS). Requests route to the Maya 2 Native Serverless GPU fallback endpoint on Modal (`api/tts.js`) only when regional voices are absent on client devices.

## Content and claims constraints

- Do not publish placeholder contact details, or unverified metrics, client logos, testimonials, warranties, response times, partnerships, certifications, geographic coverage, or project outcomes.
- Treat `design.md` text as draft unless explicitly marked confirmed.
- Server offerings cover installation/service only — never imply public cloud hosting or server rental.
- Data analytics copy may describe predictive modelling/forecasting but must not guarantee forecast accuracy.
- Agentic AI copy must show scoped permissions and human review for consequential actions.
- **Arthos Invoice Studio**: Grounded as a local-first Chrome/Edge desktop/web application with local SQLite/OPFS persistence on the customer's computer; 30-day trial with read-only access afterwards; Arthos Cloud marked as planned/in development.
- **Saurik Track**: Grounded as an on-premise operational telemetry platform; no surveillance or tracking metrics that invade privacy; verified TRIAL_URL destination.

## Accessibility and responsive requirements

- Target WCAG 2.2 AA: keyboard operability, semantic headings, visible focus rings, useful labels/errors, sufficient contrast (4.5:1 normal text, 3:1 large text).
- Minimum touch target ~44-48px.
- The mobile menu, FAQ disclosures, forms, and floating WhatsApp control must stay keyboard-usable and never obscure content.
- Preserve entered form values after submission failures; expose status changes to assistive technology.

## Pre-release testing gate before commit & push

Prior to committing and pushing to remote:
- Run `npm.cmd test` (10 automated verification suites).
- Run `npm.cmd run build` (production Vite build & SSG prerendering).
- Verify zero-JS SSR crawlability for pre-rendered pages.
- Audit for negative constraints: zero fabricated metrics, zero unsubstantiated compliance badges, and truthful contact feedback wording.
