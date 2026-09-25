# SAURIK IT Website Change Log

All notable changes to the SAURIK IT Private Limited website codebase will be documented in this living file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Demand Planning AI Knowledge Base Grounding (`chatContext.js`, `api/chat.js`, `ChatWidget.jsx`):**
  - Grounded the new Demand Planning Use Case (`/use-cases` and dedicated industry routes for FMCG, manufacturing, and apparel) into the AI assistant's core knowledge base via `USE_CASES_KNOWLEDGE` and `USE_CASES_CHAT_SYSTEM_PROMPT`.
  - Added route detection (`isUseCases`) and tailored starter questions for `/use-cases` in `ChatWidget.jsx`, along with `mode === 'use-cases'` support in `api/chat.js`.
  - Added automated test 8 in `test/verify_chatbot.cjs` verifying knowledge grounding and ChatWidget integration.
- **Demand-planning demo visual alignment:**
  - Set the use-case page to the site canvas, navy text, and teal actions. Headings use Outfit at the Software page size, and body and labels use Inter at 14px or larger. The forecast panel remains the single navy stage.
- **Demand-planning demo selling copy and links:**
  - Rewrote the use-case headline around stock, production, and buy decisions, and added three visible questions about real projects, forecast limits, and sample data.
  - Added industry addresses for FMCG, manufacturing, and apparel that reuse the same demo.
  - Linked the demo from the Software data-analytics section and the footer, and listed the four addresses in the sitemap. The header menu is unchanged.
- **Demand-planning use case (`/use-cases`):**
  - Added a self-contained sample demo for FMCG, manufacturing, and apparel. A visitor picks a domain, runs the sample analysis, and sees descriptive figures, a transparent three-month baseline forecast, and example planning options.
  - All figures are labelled sample data. The page does not claim forecast accuracy. Existing header, footer, and service pages are unchanged. The route is `/use-cases`.
  - Added `test/verify_use_case_analytics.cjs` to the `npm test` script.
- **Unified Global AI Advisor Across All Pages (`ChatWidget.jsx`, `chatContext.js`):**
  - Consolidated all AI interactions into the single, omni-present floating **Saurik AI Advisor** modal across every page of the website (including `/arthos` and `/track`).
  - Incorporated full operational specifications (`TRACK_OPERATIONS_KNOWLEDGE` and `ARTHOS_OPERATIONS_KNOWLEDGE`) directly into the global `GROUNDING_CONTEXT` so the AI assistant understands deep ground-reality questions (offline operation, fake GPS detection, mountain routes, van reconciliations, ₹699 pricing, Desktop vs Cloud, 60-day trials, GST document generation) from any page.
  - Expanded route-aware starter questions in `ChatWidget.jsx` with full question sets for Arthos and Track.
- **Cleaned Product Page Layouts (`Track.jsx`, `Arthos.jsx`, `Track.css`, `Arthos.css`):**
  - Removed redundant duplicate inline chat boxes from `/track` and `/arthos` FAQ sections, eliminating clutter and providing a clean, distraction-free reading experience while maintaining 100% of the knowledge in the floating AI Advisor.
  - Archived previous inline chat components to `archive/inline-chat/` per workspace preservation standards.
  - Purged unused inline chat CSS, trimming the production CSS bundle by ~10 kB.
- **Verification Suite Alignment (`verify_chatbot.cjs`):**
  - Updated tests 6 & 7 in `test/verify_chatbot.cjs` to verify that both Track and Arthos operational knowledge are deeply grounded in the global chat context and that product pages maintain clean layouts. All test suites pass with 0 errors.

### Fixed
- **Voice Assistant Language Inversion & Speech Synthesis Cutoff (`chatContext.js`, `llmProviders.js`, `useVoiceAgent.js`):**
  - Enforced bidirectional language matching in `src/data/chatContext.js` and explicit affirmative English directives in `api/_lib/llmProviders.js`, preventing the model from inverting English queries into Hindi.
  - Calibrated voice prompt pacing to strictly 2 to 3 sentences, preventing browser Web Speech API (`SpeechSynthesis`) buffer overflow and mid-sentence audio cutoff.
  - Added dynamic Unicode script detection in `useVoiceAgent.js` (`speak()`) to ensure synthesizer voices automatically align with Devanagari, Bengali, or English text without speech synthesis error.
  - Included active `speechSynthesis.resume()` call prior to speaking to prevent browser playback stalls.

### Changed
- **Header Navigation Redesign (`Header.jsx`):**
  - Replaced the crowded flat row of products and services with a dedicated, accessible **"Products"** dropdown menu.
  - Grouped **Saurik Track** (`LIVE ERP`) and **Arthos Invoice Studio** (`INVOICING`) inside a floating flyout menu with feature summaries and iconography (`Compass`, `Receipt`).
  - Added strict `whitespace-nowrap` across all links and action buttons, completely eliminating two-line text wrapping, staggered heights, and mobile reflow issues on desktop/laptop displays.
  - Organized mobile drawer navigation into distinct "Software Products" and "Corporate Services" sections.

### Added
- **Arthos Blueprint Induction Proposal:** Added
  `docs/ARTHOS_BLUEPRINT_INDUCTION_RECOMMENDATIONS.md` with the recommended
  positioning, validation, website, funnel, content, measurement, risk, and
  founder-decision changes for a future growth-blueprint revision.

## [1.7.0] - 2026-09-23

### Added
- **Interactive Dual-Panel Voice & Chat Assistant (`ChatWidget.jsx`):**
  - Upgraded floating chat assistant into an interactive dual-panel popup modal.
  - On desktop (`md:` breakpoint), renders side-by-side: Text Chat Studio on the left, Voice Agent Studio on the right.
  - On mobile (< 768px), provides an accessible top tab switcher (`[💬 Text Chat]` and `[🎙️ Voice Agent]`) to prevent cramped layouts while maintaining unified audio/transcript state.
- **Neural Text-to-Speech Serverless Endpoint (`api/tts.js`):**
  - Added serverless endpoint using OpenAI `tts-1` (`nova` voice) returning `audio/mpeg` with audio caching headers and markdown-stripping speech text sanitization.
  - Implemented graceful HTTP 503 fallback when `OPENAI_API_KEY` is not present, triggering instant browser-native `speechSynthesis`.
- **Speech & Audio Orchestration Hook (`src/hooks/useVoiceAgent.js`):**
  - Integrated browser-native SpeechRecognition (`webkitSpeechRecognition`) for zero-cost, instant client-side speech-to-text.
  - Built dual-engine speech synthesis: streams high-fidelity neural audio from `/api/tts` with automatic fallback to natural browser voices.
  - Implemented real-time interruption: tapping the mic or speaking instantly halts active audio playback.
- **Voice Agent UI Components (`VoiceAgentPanel.jsx`, `VoiceVisualizer.jsx`):**
  - Built animated multi-ring audio visualizer orb reacting to speaking, listening, and idle states with bounce bars.
  - Added real-time interim speech transcript preview ("Hearing: ..."), microphone action button with pulse rings, and speaker mute/unmute control.
- **Zero-Cost Native Voice Engine Standard (`AGENTS.md`, `masterdeveloper.md`, `architecture.md`):**
  - Codified the non-negotiable architectural rule establishing client-side browser Web Speech APIs as the primary, zero-cost voice engine with zero recurring cloud API charges.
  - Added native multilingual selection supporting Indian English (`en-IN`), Hindi (`hi-IN`), and Bengali (`bn-IN`) for both Speech Recognition and Speech Synthesis.
  - Built continuous **Hands-Free Call Mode** with automatic 450ms acoustic cushion between speech ending and microphone reactivation for an effortless phone-call experience.
- **Automated Verification Suite (`test/verify_voice_assistant.cjs`):**
  - Added automated checks for zero-cost voice synthesis, hook lifecycle, continuous mode, and ChatWidget dual-panel layout integrated into `npm test`.
- **Apple Glass & UX Refinements (`ChatWidget.jsx`, `VoiceAgentPanel.jsx`):**
  - Locked in the 65% Apple Sheer Glass design token (`bg-white/65 backdrop-blur-3xl ring-1 ring-white/60`) with specular white highlights and deep blur.
  - Replaced the horizontal scrolling quick-prompt carousel with responsive in-chat topic suggestion cards displayed immediately upon opening the chat without horizontal scroll.
  - Unified branding across all surfaces to **"Saurik AI Advisor"** and purged internal developer cost wording from user-facing UI.
- **Multi-Model Routing & Strict Language Mirroring (`api/chat.js`, `api/_lib/llmProviders.js`, `chatContext.js`):**
  - Added source-based LLM routing: voice queries automatically run on OpenAI GPT for fast, natural spoken reasoning; text typing queries run on OpenRouter (Gemini Pro / Flash).
  - Enforced Language Matching Mandate: queries in Hindi or Bengali are guaranteed responses purely in Hindi (Devanagari) or Bengali, preventing unwanted English translation.

## [1.6.0] - 2026-09-15

### Added
- **Arthos Invoice Studio React SPA Integration (`src/pages/Arthos.jsx` & `src/pages/Arthos.css`):**
  - Integrated `Arthos.jsx` as a first-class React SPA route mounted under `/arthos` and `/arthos/` in `src/App.jsx`.
  - Scoped CSS under `.arthos-page` preventing global style leakage into the main application shell.
  - Implemented all 9 required semantic sections per `ARTHOS-LANDING-PAGE-SPEC-v2.md`: two-tier navigation, Hero with illustrative Business Health preview card, Desktop vs Cloud editions comparison, 5 structured business problem cards, 5 feature cards, 5-step workflow, data/backup isolation disclosure, 60-day trial status, and 7 native FAQ accordions.
  - Connected navigation links in `Header.jsx` (desktop and mobile) and `Footer.jsx` using React Router's `<NavLink>` and `<Link>` for instant client-side routing.
  - Extended automated test suite in `test/verify_arthos_spec.cjs` to enforce React SPA parity and App shell routing.

### Changed
- **Navigation Flow:** Converted external `<a>` tags for `/arthos` in Header and Footer into native React Router links.
- **Architecture Documentation:** Updated `architecture.md` (Section 10) to detail the dual-surface SPA and static SSR architecture for Arthos.

## [1.5.0] - 2026-09-15

### Added
- **Saurik Track Operations & Technical Specialist (`TrackInlineChat.jsx`):**
  - Built and mounted an inline interactive AI specialist directly inside the `#faq` section of `/track`.
  - Eliminates mobile clutter by rendering as a native in-page card rather than a viewport-obstructing floating widget.
  - Features high-contrast suggestion chips ("How does fake GPS detection work?", "Tally & Excel data export?", "Battery drain on budget phones?", etc.), conversational thread history, and direct trial handoff.
  - Grounded in `TRACK_CHAT_SYSTEM_PROMPT` containing 10 founder-verified operational and technical answers (location as evidence with manager exception queues, Android foreground battery checklists, offline SQLite queues, Tally field mapping, van damaged-goods stock separation, and shift-based privacy).
- **Dual-Mode Serverless AI API (`api/chat.js`):**
  - Added support for `mode: 'track'`, dynamically routing to `TRACK_CHAT_SYSTEM_PROMPT` while preserving corporate site knowledge under `mode: 'general'`.
- **Zero-JS Static Crawler Fallback (`public/track/index.html`):**
  - Added a matching static, crawler-friendly operational specialist card within `<section id="faq">` preserving all 10 section IDs and passing strict zero-JS SSR verification.
- **Automated Verification:**
  - Expanded `test/verify_chatbot.cjs` to validate dual-mode routing, prompt grounding, and inline mounting.

### Changed
- **Track CSS Styles (`src/pages/Track.css`, `public/track/styles.css`):**
  - Added comprehensive responsive styles for `.track-inline-chat-container`, suggestion chips, loading bounce dots, and mobile viewports.

## [1.4.0] - 2026-09-14

### Added
- **Homepage Strategic Repositioning (`Home.jsx`):**
  - Repositioned homepage to lead with operational workforce clarity: *"Replace operational guesswork with visible, controlled field workflows."*
  - Elevated **Saurik Track Operational Wedge** directly beneath Hero (`#wedge-track`) using warm Navy (`#212F45`) and Amber (`#C57A2E`) brand tokens with verified feature highlights.
  - Added dedicated **Regional Operational Focus** section highlighting key commercial sectors in Tripura and Northeast India (Rubber & Bamboo processing, Tea & Agro-horticulture, FMCG distribution, and Healthcare logistics).
  - Integrated three-layer operational stack overview in Hero right-hand panel (Primary Wedge, Supporting Digital, Supporting Physical).
- **SEO & Canonical Foundation (`PageMetadata.jsx`):**
  - Dynamically injected `<link rel="canonical">` pointing to `https://www.wwwsaurikit.com/` across all SPA routes.
  - Aligned page titles and meta descriptions with the operational technology positioning.

### Changed
- **Software Page Alignment (`Software.jsx`):** Updated the Saurik Track spotlight banner from legacy neon cyan styling to warm Navy & Amber tokens matching the v3 brand system.
- **Claim & Metric Scrubbing (`trackData.js`, `DemoModal.jsx`, `PilotModal.jsx`):**
  - Replaced `"100% Mock GPS Rejection"` with grounded `"Hardware-Level Spoofing Detection"`.
  - Replaced `"100% Data Delivery"` with `"Store-and-Forward Sync"`.
  - Replaced `"99.9% Uptime Guarantee"` with `"Monitored Cloud Infrastructure"`.
  - Replaced `"TAMPER-PROOF MOBILITY"` with `"TAMPER-RESISTANT MOBILITY"`.
  - Replaced `"Zero spam guarantee"` with `"No unsolicited marketing emails"`.

### Fixed
- Fixed unverified absolute claims across `Home.jsx`, `trackData.js`, `DemoModal.jsx`, and `PilotModal.jsx`.


### Added
- **Saurik Track v3 Landing Page (`/track`):**
  - Rebuilt `/track` strictly adhering to `SAURIK-TRACK-LANDING-SPEC-v3.md` with zero-JS static HTML/CSS pre-rendering (`public/track/index.html` and synchronized `src/pages/Track.jsx` component).
  - Two-tier sticky navigation inside `<nav id="site-nav">`: SAURIK IT corporate tier + Saurik Track product navigation tier.
  - 4-card 2×2 responsive desktop feature grid: GPS Attendance & Field Visibility, Live Van-Stock & In-Transit Orders, Tamper-Resistant Audit Trail, One-Click Field Reports & CSV Export.
  - 5-item structured problem breakdown including "Opaque tracking damages trust".
  - Hero shift manifest preview with "Illustrative shift example" badge and verified accuracy metadata.
  - 6 interactive industry chips (`#industries`): FMCG & Beverages, Pharmaceuticals, Consumer Durables, Building Materials, Dairy & Fresh Foods, Industrial Supplies.
  - 5 native `<details><summary>` FAQ accordions with pure CSS toggles.
  - Structured data: Embedded JSON-LD `SoftwareApplication` declaring operating systems (`Android, Web`) and ₹0 free trial offer.
  - OpenGraph card (`public/track/og-image.png`): Generated at exact 1200×630 dimensions with verified metadata.
  - Conversion tracking attributes (`data-conversion="trial-start"` and `data-placement`) routing to `/contact?topic=saurik_track`.
  - Comprehensive automated test suites: `test/verify_track_spec_v3.cjs` asserting all 17 criteria of v3 specification, plus `npm test` script in `package.json`.

### Changed
- **Previous Work Isolation:** Archived prior v1 exploration artifacts safely into `archive/track-v1/`.
- **Design Tokens & Accessibility:** Introduced `--amber-strong: #8E4D14`, `--amber-hover: #733C0E`, and `--amber-on-dark: #E4AE70` ensuring WCAG 2.2 AA contrast on both paper (`#EEF0E7`) and dark navy (`#212F45`) backgrounds.
- **Font Stack Optimization:** Switched to system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`) guaranteeing zero network font latency and page weight under 40 KB (HTML: 22.7 KB, CSS: 16.4 KB).
- **Canonical Domain:** Standardized to `https://www.wwwsaurikit.com/track/` across `index.html`, metadata, robots.txt, and sitemap.xml.
- **Support & Routing:** Updated public support contact to `contact@wwwsaurikit.com`.

### Fixed
- Fixed literal copyright symbol rendering in `public/track/index.html` and `src/pages/Track.jsx`.


### Added
- **AI Website Assistant:**
  - Added the global `ChatWidget` with keyboard-accessible open/close behavior, reduced-motion support, conversation history, thinking state, and truthful service-unavailable fallback.
  - Upgraded trigger button with high-energy pulsing rings (`animate-ping` / `animate-pulse`), spinning sparkle indicator, dynamic hook pill ("AI Advisor • Ask Instant Question"), and interactive scale feedback.
  - Added the `POST /api/chat` serverless endpoint with request validation and bounded message history.
  - Added server-side provider selection for Anthropic, OpenAI, OpenRouter, and Ollama through `api/_lib/llmProviders.js`.
  - Added empathetic, consultative tone directives and curiosity hooks in `src/data/chatContext.js`, prompting visitors with real-world operational insights and discovery questions.
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

## [1.2.0] - 2026-09-14

### Added - Saurik Track Dedicated SSR/Static Landing Page (`SAURIK-TRACK-LANDING-SPEC.md`)
- **Static SSR-Ready Landing Page (`public/track/index.html`):**
  - Zero-JS, crawler-indexable static HTML page output directly at `/track`.
  - Verbatim headline: `"Know where your field team is. Know what's left in the van."`
  - Verbatim subhead, CTA buttons (`"Start free 30-day trial"`), micro-text, and semantic Shift Manifest HTML/CSS visual.
  - Complete 10 sections in exact order with exact IDs: `#site-nav`, `#hero`, `#problem`, `#features`, `#how-it-works`, `#industries`, `#privacy`, `#faq`, `#cta`, `#site-footer`.
  - Pure CSS `<details><summary>` zero-JS FAQ accordions with CSS `+`/`–` toggles.
- **Dedicated SEO & Social Sharing Assets:**
  - `public/og-image.png`: 1200×630 high-contrast brand card with `--navy` background, `--amber` accent, and product typography.
  - `public/apple-touch-icon.png`: 180×180 high-resolution touch icon.
  - `public/favicon.ico`: Crisp 32×32 favicon.
  - `public/robots.txt` & `public/sitemap.xml`: Full crawler indexing rules and sitemap integration.
- **Design Tokens & Typography (`public/track/styles.css` & `src/pages/Track.css`):**
  - Space Grotesk, Inter, and IBM Plex Mono fonts.
  - Design tokens: `--paper: #EEF0E7`, `--paper-dim: #E5E7DB`, `--white: #FDFDFB`, `--ink: #1C2620`, `--navy: #212F45`, `--amber: #C57A2E`, `--moss: #3E7C4C`, `--line: #CDD0C2`.
  - Fluid clamp typography, 80ch max body length, WCAG AA compliance, and `prefers-reduced-motion` support.
- **Test Automation Suite (`test/verify_track_spec.cjs` & `test/verify_track_e2e.cjs`):**
  - Automated assertions validating all 13 criteria from Section 11 of the spec, including grep check, metadata tags, JSON-LD schema parsing, image dimensions, verbatim snippets, and strict negative constraint enforcement (no fabricated metrics, no fake compliance claims, no surveillance framing).

### Changed
- Refactored `src/pages/Track.jsx` to render the exact unified 10-section structure for client-side navigation.
- Updated `src/components/PageMetadata.jsx` to declare the verbatim product title and meta description.
- Updated `vercel.json` with `cleanUrls: true` and explicit routing for `/track` to `/track/index.html`.
- Updated `ChatWidget.jsx` welcome prompt to eliminate surveillance framing.
- Updated repository root rule file `AGENTS.md` to mandate continuous synchronization of `architecture.md`, `change_log.md`, and test suite execution.

---

## Guidelines for Future Log Entries

When committing changes, prepend an entry under `## [Unreleased]` or a new version header following this structure:
- **Added**: for new features, pages, or data models.
- **Changed**: for modifications to existing behavior or styling.
- **Deprecated**: for soon-to-be-removed features.
- **Removed**: for now-removed features.
- **Fixed**: for any bug or accessibility fixes.
- **Security**: in case of vulnerabilities addressed.
## 2026-09-15

### Added

- Arthos Invoice Studio v2 landing-page verification covering required sections,
  claim boundaries, pre-launch CTA routing, and crawlable metadata.
- Centralized Arthos pre-launch configuration and a 1200x630 product social
  preview asset.

### Changed

- Updated Arthos social metadata to use a large-image card and the dedicated
  product preview asset.

### Fixed

- Added automated regression coverage for the Arthos v2 acceptance criteria.
