# SAURIK IT Website Change Log

All notable changes to the SAURIK IT Private Limited website codebase will be documented in this living file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **AI Website Assistant:**
  - Added the global `ChatWidget` with keyboard-accessible open/close behavior, reduced-motion support, conversation history, thinking state, and truthful service-unavailable fallback.
  - Added the `POST /api/chat` serverless endpoint with request validation and bounded message history.
  - Added server-side provider selection for Anthropic, OpenAI, OpenRouter, and Ollama through `api/_lib/llmProviders.js`.
  - Added grounded assistant context in `src/data/chatContext.js`, assembled from the shared company, software, and hardware data sources.
- **Saurik Track Landing Page (`/track`):**
  - Dedicated, high-converting product marketing page for the Saurik Track mobile ERP application targeting field sales directors, operations managers, and distribution owners.
  - Cyber-slate dark theme (`#0F172A` canvas, `#06B6D4` cyber cyan, `#10B981` emerald indicators) with glassmorphism telemetry cards.
  - **Founding Partner Ribbon (`TrackRibbon.jsx`):** Sticky top announcement for the first 20 enterprise deployments (zero setup fee + direct Slack access).
  - **Track Header (`TrackHeader.jsx`):** Dedicated dark navigation with smooth anchor navigation (`#features`, `#inventory`, `#roi`, `#security`, `#pricing`), Admin Sign In demo modal trigger, and Free Pilot CTA, plus back-link to the corporate site.
  - **Hero Section:** Authoritative headline, live field telemetry simulation preview card, high-contrast CTAs, and 4 micro-trust badges.
  - **Problem vs. Solution Matrix (`ProblemSolutionMatrix.jsx`):** 5-row comparison between legacy manual field chaos and Saurik Track automated workflows.
  - **Four Core Product Pillars:**
    1. Hardware-Enforced Anti-Tamper (Mock GPS spoof detection, hardware geofencing, cell-tower triangulated check-ins).
    2. Dynamic Van Inventory & Leakage Shield (Rolling stock balances, camera-based barcode scanning, end-of-day discrepancy audit).
    3. Live Field Telemetry Command Center (Sub-10-second sync, live rep breadcrumbs, battery & network telemetry).
    4. Offline-First Synchronization Engine (Local SQLite storage, zero data loss, automated retry queue).
  - **Interactive ROI Calculator (`ROICalculator.jsx`):** Real-time interactive sliders for sales force size (1-100), average hourly rate, and daily time waste (15-120 min), calculating monthly payroll leakage, Saurik Track operational cost, and net savings.
  - **Multi-Currency Flexibility (USD $ and INR ₹):**
    - Seamless global toggle button across Header navigation, ROI Calculator, and Pricing section allowing switching between **USD ($)** and **INR (₹)**.
    - USD mode: pricing at \$9/user/month, wage slider \$8-\$60/hr (default \$18/hr).
    - INR mode: pricing at ₹699/user/month, localized wage slider ₹60-₹600/hr (default ₹180/hr).
    - Synchronized live updates across all recovery calculations, badges, and pricing cards.
  - **Enterprise Security & Compliance:** SOC-2 Type II roadmap, AES-256 at rest, TLS 1.3 in transit, role-based access control, tamper-evident audit logs.
  - **Founding Partner Pricing Grid:** Standard ($9 or ₹699/user/month), Professional ($15 or ₹1199/user/month), and Custom Enterprise plans with transparent SLA and feature matrix.
  - **Interactive Modals:**
    - `PilotModal.jsx`: 14-day free pilot registration modal with automated email draft generation and WhatsApp dispatch.
    - `DemoModal.jsx`: 2-minute live command center interactive walkthrough simulation.
  - **Track Footer (`TrackFooter.jsx`):** Dedicated product footer with corporate attribution to SAURIK IT Private Limited.
- **Cross-Linking Across Corporate Website:**
  - `Header.jsx`: Added `Saurik Track` link with a vibrant animated `LIVE ERP` pill badge in both desktop and mobile navigation.
  - `Footer.jsx`: Added `Saurik Track (Field & Fleet ERP)` in the Software & IT column.
  - `Home.jsx`: Added flagship product showcase banner linking directly to `/track` and `/track#roi`.
  - `Software.jsx`: Added high-impact dark glassmorphic spotlight banner linking to `/track` and `/track#roi`.
  - `Contact.jsx`: Integrated `saurik_track` topic pre-selection.
- **Automated Testing Suite:**
  - Added `test/track_data_test.cjs`: Unit test validating data exports, 5 comparison matrix rows, 4 pillars, and mathematical ROI precision in both USD and INR modes.
  - Added `test/verify_track_e2e.cjs`: End-to-end integration test validating component existence, multi-currency toggle controls, cross-page links, App routing, and production build output.

### Changed
- Reordered Software & IT capabilities across the website to lead with Data Analytics, followed by Generative AI, Agentic AI, Custom Web Applications, Website Design & Support, and Mobile App Development.
- Positioned the analytics and Agentic AI interactive explainers directly after their corresponding capability sections.
- Configured `App.jsx` layout shell to isolate corporate navigation from `/track` so that Saurik Track has an immersive dedicated navigation and footer.

## [1.0.0] - 2026-09-13

### Added
- **Complete Project Scaffolding:** Initialized React 18, Vite 6, Tailwind CSS 3, PostCSS, and React Router v6 in `c:/Saurik/saurik_website`.
- **Design System ("Light and Precise"):** Configured custom design tokens in `tailwind.config.js` and `src/index.css` (`#F7F9F8` canvas, `#102A43` navy ink, `#087F72` software teal, `#2456A6` hardware blue).
- **Centralized Data Layer (`src/data/`):**
  - `companyData.js`: Legal entity details, verified email (`contact@wwwsaurikit.com`), verified phone (`98620 87157`), working principles, 4-stage delivery process.
  - `softwareData.js`: 5 confirmed software capabilities, Agentic AI workflow steps, software FAQs.
  - `hardwareData.js`: 3 confirmed hardware categories, CCTV Home vs Business specs, buying process, hardware FAQs.
- **Full Route Suite (`src/pages/`):**
  - `Home.jsx`: Dual-division hero, 4-step delivery pipeline, scope statement, closing CTA.
  - `Software.jsx`: 5 capabilities, interactive Agentic AI visualizer, forecasting chart, FAQs.
  - `Hardware.jsx`: 3 hardware offerings, interactive CCTV premise selector, buying steps, FAQs.
  - `About.jsx`: "Technology, Deliberately." ethos, working principles, direct accountability.
  - `Contact.jsx`: Dual-column smart enquiry form with dynamic topic preselection (`?topic=...`), validation, email draft generator, and direct WhatsApp option.
  - `Privacy.jsx`: Plain-English enquiry handling and data protection policy.
  - `NotFound.jsx`: Friendly 404 page with navigation recovery links.
- **Interactive UI Components (`src/components/`):**
  - `Header.jsx`: Sticky responsive navbar with active link indicator and mobile drawer.
  - `Footer.jsx`: Dual-division sitemap, verified contact details, copyright notice.
  - `WhatsAppCTA.jsx`: Floating WhatsApp assistance widget with verified number (`98620 87157`).
  - `AgenticWorkflow.jsx`: Step-by-step interactive workflow visualizer with live simulation mode.
  - `CCTVSelector.jsx`: Dual-tab comparison switching between Home and Business surveillance.
  - `AnalyticsChart.jsx`: Interactive predictive forecasting simulation with historical actuals vs projections.
  - `FAQAccordion.jsx`: Accessible disclosure accordion component.
  - `ProcessTimeline.jsx`: 4-step delivery pipeline cards.
- **Official Brand Logo Integration:**
  - Integrated official high-resolution logo (`/logo.png`) in Header, Footer, Homepage Hero, and About page.
  - Generated cropped S-constellation mark (`/logo-mark.png`) as browser favicon and Apple touch icon in `index.html`.
- **Engineering Documentation Suite:**
  - `architecture.md`: Architectural overview, design principles, component hierarchy.
  - `maintenance.md`: Maintenance procedures, contact updates, troubleshooting.
  - `masterdeveloper.md`: Developer & AI agent onboarding guide and implementation patterns.
  - `testing.md`: Automated and manual QA checklists and verification scripts.
  - `designer.md`: UI/UX design specifications, tokens, and typographic scale.
  - `change_log.md`: THIS FILE: Living chronology of project updates.
  - `README.md`: Public repository overview and quick start guide.

### Changed
- Transitioned visual aesthetic from dark technology to warm, high-contrast "Light and Precise" theme per `design.md` v0.2.
- Replaced mock contact form feedback with truthful email draft notification (*"Your email draft is ready. Send it from your email app."*).
- Formatted contact topics to automatically pre-select from service CTA deep links.

---

## Guidelines for Future Log Entries

When committing changes, prepend an entry under `## [Unreleased]` or a new version header following this structure:
- **Added**: for new features, pages, or data models.
- **Changed**: for modifications to existing behavior or styling.
- **Deprecated**: for soon-to-be-removed features.
- **Removed**: for now-removed features.
- **Fixed**: for any bug or accessibility fixes.
- **Security**: in case of vulnerabilities addressed.
