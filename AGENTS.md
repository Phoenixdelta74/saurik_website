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

- `src/App.jsx` defines the shared shell, navigation, and route definitions.
- `src/pages/` contains the route-level pages (Home, Software, Hardware, About, Contact, Privacy, Track, Arthos, UseCases, Services, AiChatbot, Terms, RefundPolicy, and NotFound).
- `src/components/` contains shared navigation, footer, calls to action, process and FAQ components, plus interactive software and hardware illustrations.
- `src/data/` contains company details and service copy (`companyData.js`, `softwareData.js`, `hardwareData.js`, `chatContext.js`). Prefer updating these sources instead of duplicating content in components.
- `api/` contains Vercel serverless endpoints (`api/chat.js` for LLM enquiries, `api/tts.js` for voice synthesis); never move provider credentials into client-side code.
- `.agents/skills/` contains role personas (`role-*`) and modular tactical skills across PO, Architect, Developer, UI/UX, and QA.
- `.agents/team/` contains the multi-agent operating system, handshakes, and team specs (`roles.md`).
- `agent-memory/` contains persistent role-specific lesson logs (`<role>-lessons.md`) and `shared-lessons.md`.
- `docs/` contains living requirements (`requirements.md`), ADRs (`decisions.md`), templates (`docs/templates/`), and role-specific feature artifacts (`product/`, `design/`, `architecture/`, `tasks/`, `qa/`, `handoffs/`).
- `web-release-tester/` contains cross-agent release testing skills and auditing matrices.
- `src/index.css` contains Tailwind layers and shared component classes.
- `tailwind.config.js` defines the design tokens.
- `public/` contains the logo, favicon, pre-rendered static artifacts, and public launch configurations.

### Route inventory

- **Core & Company**: `/`, `/software`, `/hardware`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`
- **Products & Platforms**: `/track` (Saurik Track), `/arthos` (Arthos Invoice Studio), `/ai-chatbot` (Saurik AI Chatbot)
- **Specialized Services**: `/services/website-development`, `/services/cctv-installation`, `/services/custom-software`
- **Industry Use Cases**: `/use-cases`, `/use-cases/fmcg-demand-planning`, `/use-cases/manufacturing-demand-planning`, `/use-cases/apparel-demand-planning`
- **Fallback**: All unmatched routes render the custom 404 page (`/404`).

## Multi-Agent Operating Model & Handoffs

This repository operates on a collaborative, file-based multi-agent system across **Antigravity**, **Claude Code**, and **Codex**.

### Always-On Shared Agent Workflow

**Every user request in this project is handled through the shared agent workflow by default.** The user does not need to type "run the full workflow" or manually specify roles or skills. Describe goals naturally, and the system autonomously determines which responsibilities, skills, artifacts, and checks apply.

#### Core Always-On Rule
For every request, interpret the user's intent and scope, inspect relevant context, select the applicable workflow responsibilities and skills, perform the authorized work, verify where appropriate, and report the outcome.

#### Workflow Responsibilities (Adaptive Routing)
Route through these responsibilities as relevant to the request:
1. **Product Owner (`role-product-planner`)**: Clarify the goal, scope boundaries, and acceptance criteria.
2. **Solution Architect (`role-solution-architect`)**: Assess technical impact, decisions, dependencies, and ADRs.
3. **UI/UX Designer (`role-ui-ux-designer`)**: Assess user experience, responsive viewports, and design when user-facing behavior changes.
4. **Developer (`role-fullstack-developer`)**: Implement authorized changes following maintainable code principles.
5. **QA Reviewer (`role-qa-reviewer`)**: Verify and review the result with proportionate test evidence.
6. **Shared Learning (`team-learning`)**: Pre-flight memory check before work; record useful lessons when supported by empirical evidence.

*Note: These are responsibilities, not a requirement to invoke five separate agents for every request. A single agent may perform several responsibilities sequentially when separate agents are unavailable.*

#### Scaling the Workflow to the Request
- **1. Simple Request (Small, reversible change)**:
  - Briefly assess the requirement, make the change, run a proportionate check (`npm.cmd test`), and report the outcome.
  - **Do NOT generate unnecessary documents, handoffs, or throwaway test files.**
- **2. Standard Feature or Bug Fix**:
  - Apply relevant Product, Architecture, Design, Developer, and QA responsibilities.
  - Create or update handoff markdown files in `docs/` (`docs/product/`, `docs/design/`, `docs/architecture/`, `docs/tasks/`, `docs/qa/`, `docs/handoffs/`) where they help another role or session continue.
- **3. Complex or High-Impact Feature**:
  - Execute the full workflow: testable acceptance criteria (`deliver-user-stories`), architectural trade-offs & ADRs (`architecture-decision-records`), UI/UX design states (`website-design-system`), implementation plan (`implementation-planning`), developer implementation, independent review when available, test evidence, and a release-readiness report (`qa-release-readiness`).
- **4. Question, Research, or Review Request**:
  - Use relevant analysis and verification responsibilities.
  - **Do NOT modify code or project files** unless the user explicitly requests or authorizes changes.
- **User Override**: If the user explicitly requests a different process or asks to skip a step, follow that instruction within applicable platform and safety constraints.

#### Skill Routing & Maintainable Code
- Select relevant installed skills from `.agents/skills/` automatically based on task intent; the user should not have to name them.
- Use the `maintainable-code` skill for implementation and review when available. When unavailable, perform equivalent work using available repository instructions (SOLID principles, defensive input validation, clean component isolation, and typed contracts) and report the limitation when material.
- Use `agent-handoff` and `team-learning` whenever passing context or recording empirical findings.
- **Never invent** a skill, tool, result, or completed check.

#### Collaboration & Independence
- Use native specialist agents or subagents only when supported, available, and permitted.
- A single agent may perform several roles sequentially when separate agents are unavailable.
- **Never claim that separate agents collaborated if they did not.**
- Prefer a fresh reviewer or separate QA agent for substantial changes. If independent review is unavailable, clearly label the review as **self-review**.
- Antigravity, Codex, and Claude Code do not share chat sessions; use version-controlled Markdown artifacts in `docs/` as the shared communication bus.

#### Autonomy & Escalation
- Continue through applicable workflow stages without asking for approval at each routine step.
- Make routine, reversible implementation decisions using available context.
- Ask a focused question only when a missing business decision or authorization materially blocks progress.
- Continue independent work while a decision is pending where practical.
- Adhere to the **Anti-Thrashing Circuit Breaker**: If a test or build fails, make at most **two focused correction attempts**. If unresolved after two attempts, stop, document the blocker and tried actions, and escalate.
- Never deploy, purchase services, send external messages, or mutate production infrastructure without explicit authorization.

#### Evidence & Learning
- **Step 0 Pre-Flight Check**: Read relevant project lessons in `agent-memory/<role>-lessons.md` and `agent-memory/shared-lessons.md` before starting work.
- Distinguish assumptions from verified facts.
- Run checks appropriate to the change and report passed, failed, blocked, and untested outcomes accurately.
- Record an empirical lesson in `agent-memory/` only when useful and supported by evidence.
- **Human Gatekeeper Rule**: Never automatically turn an unverified lesson into a permanent rule in `AGENTS.md`. Only the human stakeholder may grant approval to update project-level rules.
- Never place secrets, credentials, or personal data (PII) in lessons or handoffs.

- **5 Specialist Roles**:
  1. **Product Owner (`role-product-planner`)**: Discovery, PRDs (`deliver-prd`), user stories with Dual-Path Given/When/Then acceptance criteria (`deliver-user-stories`), and prioritization (`po-prioritization`).
  2. **UI/UX Designer (`role-ui-ux-designer`)**: User journeys (`ux-journey-mapping`), wireframes (`website-wireframing`), design system tokens (`website-design-system`), and WCAG 2.2 AA accessibility (`accessibility-and-usability-review`).
  3. **Solution Architect (`role-solution-architect`)**: System topology (`solution-design`), tech trade-offs (`architecture-tradeoff-analysis`), ADRs (`architecture-decision-records`), API schemas (`api-and-integration-design`), security architecture (`website-security-architecture`), and implementation plans (`implementation-planning`).
  4. **Fullstack Developer (`role-fullstack-developer`)**: Codebase exploration (`developer-codebase-exploration`), React 18 & Tailwind implementation (`frontend-react-implementation`, `website-feature-implementation`), serverless functions (`website-api-implementation`), and automated unit/integration tests (`developer-testing`).
  5. **QA Reviewer (`role-qa-reviewer`)**: Acceptance verification (`qa-acceptance-review`), risk-based test planning (`qa-risk-based-test-planning`), 5-viewport review (`qa-responsive-visual-review`), accessibility audits (`qa-accessibility-testing`), and release readiness (`qa-release-readiness`).
- **Communication Bus**: Standardized Markdown handoff files in `docs/` (`docs/product/`, `docs/design/`, `docs/architecture/`, `docs/tasks/`, `docs/qa/`, `docs/handoffs/`). JSON is strictly reserved for runtime APIs and automated test assertions.
- **Traceability Lineage**: Every capability tracks through an unbroken identifier chain: `FEAT-XXX` → `AC-XX` → `TC-XX` → `DEF-XX`.

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
- **Arthos Invoice Studio**: Grounded as a local-first Chrome/Edge desktop/web application with local SQLite/OPFS persistence on the customer's computer; 30-day trial with read-only access afterwards; Arthos Cloud marked as planned/in development.
- **Saurik Track**: Grounded as an on-premise operational telemetry platform; no surveillance or tracking metrics that invade privacy; verified TRIAL_URL destination.

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
