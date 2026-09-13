# SAURIK IT website modernization progress

Updated: 13 September 2026

## Current status

The first implementation pass is in progress. Planned Steps 1 and 2 and the owner-approved capability-priority amendment are complete and verified. Step 3 requires owner-approved proof material before public proof content can be added without fabrication. The work is based on the codebase review and the visual comparison against current consultancy, product, and IT service websites. The goal is to make the site easier to trust, easier to navigate, and more usable on small screens while keeping the existing React/Vite structure and service routes.

## Incremental implementation record

### Step 1 - Homepage hierarchy - complete

- Replaced the catalogue-heavy homepage with two equal service paths, one delivery-process explanation, one explicitly illustrative cross-division example, a concise company introduction, and one closing enquiry action.
- Removed homepage trust badges and absolute delivery language that were not supported by repository evidence.
- Reworked the process component from four repeated cards into a connected ordered sequence.
- Fixed a responsive header overflow exposed by testing: shared button styles had overridden Tailwind's `hidden` utility on header links.
- Verified with `npm.cmd run build` and exact-width Chrome checks at 360, 390, 768, 1024, and 1440 pixels. All five widths reported no document-level horizontal overflow, and visual captures were reviewed.

### Step 2 - Unsupported-claim review - complete

- Replaced fixed delivery times, absolute ownership and confidentiality promises, warranty and authorisation claims, certification language, unsupported team credentials, and unconfirmed geographic coverage with scoped descriptions.
- Made delivery timing, ownership, warranty, support, invoice, availability, and handover terms explicitly dependent on the accepted quotation or contract.
- Reframed the analytics and agentic AI demonstrations as hypothetical examples, removed fabricated performance metrics, and retained explicit scoped permissions and human review for consequential AI actions.
- Rewrote the privacy page to reflect the implemented client-side email/WhatsApp handoff and to avoid inventing retention, deletion, confidentiality, or intellectual-property policies.
- Retained the email address and telephone/WhatsApp number because the repository release record identifies those destinations as verified; no wider geography or response commitment is inferred from that record.
- Verified with a clean prohibited-claim scan, `npm.cmd run build`, and Chrome route checks at 390 and 1440 pixels. All six public routes rendered one H1, route-specific metadata, no runtime exceptions, no rendered `undefined` values, and no document-level horizontal overflow. Contact topic preselection was also verified.

### Owner-approved capability priority amendment - complete

- Reordered Software & IT capabilities across Home, Software, About, Contact, the footer, and route metadata: Data Analytics, Generative AI, Agentic AI, Custom Web Applications, Website Design & Support, then Mobile App Development.
- Added Mobile App Development with the stable `/software#mobile-apps` anchor and `/contact?topic=mobile_apps` enquiry path; platform, device-feature, testing, release, and handover responsibilities remain scope-dependent.
- Moved the forecasting explainer directly after Data Analytics and the Agentic AI workflow directly after Agentic AI.
- Verified the exact order, all six capability enquiry links, both adjacent explainers, the mobile-app deep link and query preselection, and no horizontal overflow at 360, 390, 768, 1024, and 1440 pixels. Visual captures were reviewed at mobile and desktop widths, all public routes passed at 390 and 1440 pixels, and `npm.cmd run build` passed.

### Step 3 - Approved proof content - awaiting owner input

- No client, project, installation, outcome, team, certification, warranty, or testimonial evidence exists in this checkout that can be published as approved proof.
- The clearly labelled hypothetical examples remain illustrative and are not presented as proof.
- Required next input: at least one owner-approved screenshot, photograph, team detail, or anonymized workflow example, together with the exact caption and confirmation that it may be published.

## What has changed so far

### Accessibility and interaction

- Added a visible keyboard focus treatment and a skip-to-content link.
- Added a focusable main content landmark so route changes can return keyboard users to the page content.
- Reworked the mobile navigation to use a native modal dialog.
- Added Escape handling, focus restoration to the menu button, body scroll locking, a close control, and responsive auto-close behavior.
- Increased the minimum size of buttons and controls to make touch use more reliable.
- Increased form control text sizing to 16px to avoid mobile browser zoom on focus.
- Added reduced-motion handling for global reveal animation and route/hash scrolling.
- Added validation behavior that focuses the first invalid field and exposes the error summary with `role="alert"`.
- Added `role="status"` to the contact handoff message so assistive technology can announce it.

### Contact and enquiry flow

- Changed the contact page language to explain that the site prepares an email draft or opens WhatsApp; the website itself does not claim to receive or store the enquiry.
- Renamed the primary actions to “Prepare email draft” and “Open WhatsApp”.
- Added clearer labels, autocomplete hints, required-state semantics, and a privacy-information link.
- Put the form before the alternative contact details on mobile so the main conversion action appears earlier.
- Added `noopener,noreferrer` to the WhatsApp window call.

### Visual system

- Darkened the muted text token for better contrast against the light canvas.
- Darkened the teal action token for better contrast on pale teal surfaces and buttons.
- Added a local reveal animation because the project was using `animate-in` classes without an installed Tailwind animation plugin.
- Added a reduced-motion override for that animation.
- Changed the favicon reference from the large PNG mark to the existing SVG favicon.

### Page metadata

- Added a shared route-aware metadata component.
- Each known route now receives its own browser title, description, Open Graph title/description/type, and robots value.
- Unknown routes are marked `noindex,follow`.

## Assessment that drives the next work

The current interface already has a coherent light navy/teal/blue visual language, good desktop spacing, and sensible service separation. The main weaknesses are credibility and differentiation rather than basic styling:

- The homepage repeats many similar cards and technical labels, which makes the experience feel template-driven.
- There are few real proof elements such as approved project visuals, named outcomes, team context, or a clear delivery example.
- Several copy blocks make absolute claims that are not verified in the repository, including warranties, certifications, ownership guarantees, data-leakage guarantees, and predictable timelines.
- The contact flow is a handoff to external apps, so its wording must stay explicit about what has and has not been sent.
- The app eagerly imports every route, and the production bundle is approximately 296.6 kB before compression (about 82.9 kB gzip).
- Metadata is currently updated client-side; server-rendered or build-time route metadata would still be needed for the strongest search and social-preview behavior.

## Planned implementation sequence

1. **Complete:** Simplify the homepage hierarchy around two clear service paths, one process explanation, and one clearly labelled illustrative example.
2. **Complete:** Review and qualify all unsupported claims in the home, software, hardware, company, and privacy data sources. Keep only claims that can be evidenced or explicitly marked as terms confirmed in a quotation or contract.
3. **Awaiting owner-approved material:** Add approved proof content: real screenshots, installation imagery, team details, or anonymized workflow examples. Do not fabricate clients, metrics, certifications, warranties, or testimonials.
4. Split route imports with `React.lazy` and `Suspense` after the content and layout changes settle.
5. Add a real enquiry endpoint only if the business wants server-side intake, spam protection, delivery tracking, and confirmation receipts. Until then, retain the email/WhatsApp handoff wording.
6. Recheck keyboard behavior, focus order, contrast, and layouts at 360, 390, 768, 1024, and 1440 pixels.

## Verification

- The baseline production build passed before this implementation pass.
- The latest production build passed after Steps 1 and 2 and the capability-priority amendment (`296.40 kB`, `83.10 kB` gzip for the main JavaScript bundle).
- Browser route checks passed at 390 and 1440 pixels after Step 2; Step 1 also passed exact-width homepage checks at 360, 390, 768, 1024, and 1440 pixels.
- There is no lint or automated test script in `package.json`.
- This folder has no Git metadata, so the work cannot currently be represented as a Git diff or commit from this checkout.

## Files touched in the current pass

- `tailwind.config.js`
- `src/index.css`
- `src/components/Header.jsx`
- `src/components/ProcessTimeline.jsx`
- `src/components/AgenticWorkflow.jsx`
- `src/components/AnalyticsChart.jsx`
- `src/components/CCTVSelector.jsx`
- `src/components/Footer.jsx`
- `src/components/WhatsAppCTA.jsx`
- `src/components/PageMetadata.jsx` (new)
- `src/pages/Home.jsx`
- `src/pages/Software.jsx`
- `src/pages/Hardware.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Privacy.jsx`
- `src/data/companyData.js`
- `src/data/softwareData.js`
- `src/data/hardwareData.js`
- `src/App.jsx`
- `index.html`
- `design.md`
- `architecture.md`
- `README.md`
- `change_log.md`
- `scratch/capability-priority-smoke.mjs` (new)
- `AGENTS.md` (repository guidance added during initialization)
