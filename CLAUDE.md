# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the SAURIK IT Private Limited marketing website: a client-rendered React 18 SPA built with Vite 6, React Router 6, and Tailwind CSS 3. Design direction is light/spacious with navy text, teal for the Software & IT division, and blue for the Hardware & IT division. Read `design.md` before making substantial content, layout, or interaction changes — it is the product and design acceptance brief.

This folder may be provided without Git metadata — confirm repository state before relying on Git-based workflows.

## Commands

- Install: `npm.cmd install`
- Dev server: `npm.cmd run dev` (http://localhost:3000)
- Production build: `npm.cmd run build`
- Preview production build: `npm.cmd run preview`

There is no lint or test script. At minimum, run `npm.cmd run build` after code changes (pass criteria: exit code 0, zero compilation warnings, bundles emitted to `dist/`). For visual/interaction changes, also check affected pages in a browser at 360, 390, 768, 1024, and 1440px widths — see `testing.md` for the full manual QA checklist and the route/asset HTTP crawler script pattern (`scratch/verify_routes.cjs`, run against `npm run preview` on port 4173).

## Architecture

- `src/App.jsx` — shared shell (Header, routed content, WhatsAppCTA, Footer) and route definitions, plus a `ScrollToTop` component that smooth-scrolls to a hash target on hash changes and to `(0,0)` on regular route changes.
- `src/pages/` — route-level pages: Home, Software, Hardware, About, Contact, Privacy, NotFound.
- `src/components/` — shared/reusable pieces: Header, Footer, WhatsAppCTA, PageMetadata, ProcessTimeline, FAQAccordion, and interactive illustrations (AgenticWorkflow, CCTVSelector, AnalyticsChart).
- `src/data/` — **single source of truth for all business copy**: `companyData.js` (legal name, verified phone/email, working principles, delivery process), `softwareData.js` (capabilities, Agentic AI workflow stages, FAQs), `hardwareData.js` (CCTV/Computers/Servers categories, home vs business specs, FAQs). Never hardcode phone numbers, emails, or capability lists in JSX — always import from here.
- `src/index.css` — Tailwind layers plus shared component classes (buttons, cards).
- `tailwind.config.js` — design tokens: `canvas` (#F7F9F8 bg), `surface` (#FFFFFF), `ink.primary`/`ink.secondary` (text), `accent.teal` (#087F72, software actions), `accent.blue` (#2456A6, hardware actions), `border.subtle`. Reuse these tokens and existing shared button/card classes before adding one-off values.

### Routing and deep-linking

Routes: `/`, `/software`, `/hardware`, `/about`, `/contact`, `/privacy`, and `*` → NotFound. Service CTAs link to `/contact?topic=<id>` (e.g. `custom_apps`, `data_analytics`, `cctv_residential`, `cctv_commercial`, `hardware_servers`); `Contact.jsx` reads this via `useSearchParams` to preselect the category and expand sub-options. Preserve this query-string topic selection whenever linking a service to `/contact`. Software/Hardware pages also expose deep hash anchors (e.g. `/software#agentic-ai`).

### Smart Enquiry System

The contact form does not submit to a backend. It only prepares a `mailto:` draft or an encoded WhatsApp message (`https://wa.me/919862087157?text=...`). Status text must say a draft was opened/prepared — never claim an enquiry was "sent" or "received" unless a server actually confirms it. Company name must stay optional for residential CCTV enquiries.

## Implementation conventions

- Functional components and hooks only; route-level composition lives in `src/pages/`, reusable behavior in `src/components/`.
- Use React Router `Link`/`NavLink` for internal navigation.
- Use Lucide React icons consistently; do not use emoji as interface icons.
- Distinguish software vs. hardware content through text labels as well as color.
- Keep animation brief and respect `prefers-reduced-motion`.

## Content and claims constraints

- Do not publish placeholder contact details, or unverified metrics, client logos, testimonials, warranties, response times, partnerships, certifications, geographic coverage, or project outcomes.
- Treat `design.md` text as draft unless explicitly marked confirmed.
- Server offerings cover installation/service only — never imply public cloud hosting or server rental.
- Data analytics copy may describe predictive modelling/forecasting but must not guarantee forecast accuracy.
- Agentic AI copy must show scoped permissions and human review for consequential actions.

## Accessibility and responsive requirements

- Target WCAG 2.2 AA: keyboard operability, semantic headings, visible focus rings, useful labels/errors, sufficient contrast (4.5:1 normal text, 3:1 large text).
- Minimum touch target ~44-48px.
- The mobile menu, FAQ disclosures, forms, and floating WhatsApp control must stay keyboard-usable and never obscure content.
- Preserve entered form values after submission failures; expose status changes to assistive technology.

## Documentation map

Detailed guides live at the repo root — consult them for the specifics they own rather than duplicating that content here: `architecture.md` (technical architecture/data flow diagram), `maintenance.md` (maintenance schedules, content updates, logo handling), `masterdeveloper.md` (developer/agent onboarding, coding patterns), `testing.md` (automated + manual QA), `designer.md` (UI/UX spec, color/typography tokens), `design.md` (original design brief), `change_log.md` (versioned change history).
