# SAURIK IT Website Testing & Quality Assurance Guide

**Version:** 1.2  
**Scope:** Automated testing, manual quality assurance checklists, and verification procedures for developers and AI agents.

---

## 1. Automated Testing Strategy

The repository employs a multi-tiered verification pipeline:
1. **Compilation & Bundle Verification:** Vite production build ensures strict syntax, JSX compliance, CSS compilation, asset generation, and tree-shaking.
2. **Saurik Track Landing Spec Verification:** Comprehensive assertions verifying all 13 criteria of `SAURIK-TRACK-LANDING-SPEC.md` (metadata, H1, 10 sections in order, JSON-LD, image dimensions, verbatim snippets, negative constraints, and page weight budget).
3. **End-to-End Route & SSR Artifacts Check:** Verifies both the static zero-JS HTML distribution (`dist/track/index.html`) and the React SPA routing shell.
4. **Chatbot & Context Integrity Verification:** Confirms serverless endpoint handlers, LLM provider fallbacks, empathy hooks, and prompt grounding.
5. **Accessibility (a11y) & Performance Budgets:** WCAG 2.2 AA contrast, keyboard accessibility audits, and page weight limits (≤ 250 KB).

---

## 2. Automated Test Scripts

### 2.1. Production Build Test
```bash
npm run build
```
**Pass Criteria:** Exit code `0`. Zero compilation warnings. Bundles and static assets generated in `dist/`.

### 2.2. Saurik Track v3 Spec Verification Suite
```bash
npm test
# OR
node test/verify_track_spec_v3.cjs
```
**Pass Criteria:**
- Primary crawlability: H1 `"Know where your field team is. Know what's left in the van."` verbatim.
- Verbatim title and description metadata (`Saurik Track — GPS Attendance & Van-Stock Tracking for Field Teams`).
- JSON-LD structured data parses as `SoftwareApplication` with ₹0 free trial offer.
- `og-image.png` verified at 1200×630.
- All 10 sections present in exact order with exact IDs.
- All v3 verbatim copy snippets verified (4 features in 2×2 grid, 5 problem points, 6 industry chips).
- Negative constraints verified (no fabricated metrics, no fake compliance claims, no surveillance framing).
- Conversion tracking attributes (`data-conversion="trial-start"` and `data-placement`) and verified `TRIAL_URL` (`/contact?topic=saurik_track`).
- Transferred size (HTML + CSS) ≤ 300 KB (Achieved: **39.1 KB** total).

### 2.3. Saurik Track End-to-End & Integration Suite
```bash
node test/verify_track_e2e.cjs
```
**Pass Criteria:**
- Verifies existence of all static landing page assets (`public/track/index.html`, `styles.css`, `og-image.png`, `apple-touch-icon.png`, `favicon.ico`, `robots.txt`, `sitemap.xml`).
- Verifies cross-links from `Header.jsx`, `Footer.jsx`, and route registration in `App.jsx`.
- Confirms production build output in `dist/track/index.html`.

### 2.4. Data Integrity & Formula Verification
```bash
node test/track_data_test.cjs
```
**Pass Criteria:**
- Multi-currency ROI formula accuracy (USD & INR).
- 4 pillars, 5 problem-solution rows, and security spec exports.

### 2.5. Dual-Panel Voice & Chat Assistant Verification Suite
```bash
node test/verify_voice_assistant.cjs
```
**Pass Criteria:**
- Verifies existence of `api/tts.js`, `src/hooks/useVoiceAgent.js`, `src/components/voice/VoiceVisualizer.jsx`, `src/components/voice/VoiceAgentPanel.jsx`, and `src/components/ChatWidget.jsx`.
- Confirms OpenAI Neural TTS `tts-1` integration and error handling (503/400).
- Confirms speech recognition lifecycle, neural audio playback, and browser speech synthesis fallback.
- Confirms real-time synchronization between speech input and chat message state.
- Confirms responsive desktop split and mobile tab switcher.

### 2.6. Chatbot & Specialist Assistant Verification
```bash
node test/verify_chatbot.cjs
```
**Pass Criteria:**
- `api/chat.js` endpoint validation and dynamic mode router (`mode: 'track'`, `mode: 'arthos'`).
- Multi-provider engine (Anthropic, OpenAI, OpenRouter, Ollama) with source routing.
- Grounded context and system prompt structure (`chatContext.js`).
- Specialized Saurik Track Operations Assistant grounding, mode router, and inline mounting.
- Specialized Arthos Invoice Studio Assistant grounding, mode router, and inline mounting (`ArthosInlineChat.jsx`).

### 2.7. Arthos Invoice Studio Spec Verification
```bash
node test/verify_arthos_spec.cjs
```
**Pass Criteria:**
- Verifies exact 9 section IDs in exact sequence across static HTML and React SPA.
- Confirms 60-day trial status and negative constraints (no direct GST filing, no sync claims).
- Verifies cross-links in Header, Footer, and App routing.

### 2.8. Demand-planning use-case demo
```bash
node test/verify_use_case_analytics.cjs
```
**Pass criteria:**
- FMCG, manufacturing, and apparel each produce a deterministic three-month baseline.
- Sample decisions mix prepare-more, slow-down, and keep-plan outcomes, and stay worded as example planning options.
- The page keeps the sample-data disclaimer and links to `/contact?topic=data_analytics`.
- The route is registered at `/use-cases`, with industry addresses for FMCG, manufacturing, and apparel.
- The headline leads with the planning decision. Software and the footer link to `/use-cases`. The sitemap lists all four addresses.

### 2.9. SEO & Static Prerender Verification Suite
```bash
node test/verify_seo_prerender.cjs
```
**Pass criteria:**
- Verifies existence of all 16 prerendered static HTML files in `dist/` (`index.html`, `/software`, `/hardware`, `/about`, `/contact`, `/privacy`, `/use-cases`, 3 industry demos, 3 priority service pages, `/track/`, `/arthos/`, and `404.html`).
- Validates that every static HTML artifact contains non-empty prerendered root markup and no stale `wwwsaurikit.com` domain references.
- Validates canonical tags strictly targeting `https://www.saurikit.in`.
- Validates `robots.txt` points to `https://www.saurikit.in/sitemap.xml` and `sitemap.xml` contains all public URLs including new priority services.
- Confirms Contact page topic dropdown includes `saurik_track` with 30-day trial & pilot setup notice.
- Confirms Homepage positioning highlights Agartala/Tripura & Northeast operations without internal strategy jargon.
- Confirms `vercel.json` has `cleanUrls: true` and outputDirectory `dist`.

### 2.10. Full Automated Test Suite Execution
Run the complete automated gate:
```bash
npm test
# Runs: verify_track_spec_v3 && verify_track_e2e && verify_arthos_spec && verify_voice_assistant && verify_chatbot && verify_use_case_analytics && verify_seo_prerender
```

---

## 3. Manual Testing Checklist

### 3.1. Navigation & Routing
- [ ] Clicking logo in Header navigates to `/`.
- [ ] Navigation links (`Software`, `Hardware`, `Saurik Track`, `About`, `Contact`) indicate current active state.
- [ ] Clicking "Discuss your requirement" in Header navigates to `/contact`.
- [ ] Clicking capability anchors (`/software#agentic-ai`, `/hardware#cctv`, `/track#features`) smooth-scrolls to the exact target section.
- [ ] Direct browser request to `/track` serves static HTML instantly with zero JavaScript.
- [ ] Typing an unmapped URL (e.g. `/unknown-page`) renders the custom 404 `NotFound` component.

### 3.2. Contact Form & Enquiry Validation
- [ ] Submitting with empty required fields displays inline errors under **Name**, **Email**, and **Description**.
- [ ] Entering an invalid email (e.g. `user@domain`) displays *"Please provide a valid email address."*
- [ ] Entering valid fields and clicking "Send Project Enquiry" triggers `mailto:` and displays *"Your email draft is ready. Send it from your email app."*
- [ ] Clicking "Send via WhatsApp" opens `https://wa.me/919862087157` with pre-formatted message text.
- [ ] When topic is CCTV, toggling "Commercial Facility" vs "Residential Home" works, and company name is clearly marked optional for residential clients.

### 3.3. Interactive Widgets
- [ ] **Agentic AI Workflow Visualizer (`AgenticWorkflow.jsx`):**
  - Clicking steps 1, 2, 3, 4 highlights the stage, updates badge, and updates verification details.
  - Clicking "Simulate Workflow" automatically cycles through all 4 stages with timer indicator.
- [ ] **CCTV Premise Selector (`CCTVSelector.jsx`):**
  - Clicking "For My Business" shows IP cameras, NVR storage, CAT6 cabling, and link to commercial quote.
  - Clicking "For My Home" shows weatherproof cameras, local storage, concealed wiring, and link to home quote.
- [ ] **Analytics Forecasting Chart (`AnalyticsChart.jsx`):**
  - Toggling "Demand Forecasting" vs "Revenue Trajectory" recalculates bars, confidence intervals, and refresh rates.
- [ ] **Floating WhatsApp CTA (`WhatsAppCTA.jsx`):**
  - Clicking the WhatsApp bubble opens assistance popover showing verified phone `+91 98620 87157`.
  - Clicking "X" or pressing Escape closes popover.
  - Position does not obscure submit button or footer links.
  - Hidden on `/track` route per spec.

### 3.4. AI Website Assistant
- [ ] Opening `ChatWidget.jsx` focuses the input and exposes the accessible assistant name.
- [ ] Submitting a question shows a thinking state, preserves the conversation, and renders the server reply when `/api/chat` is available.
- [ ] API failure shows the truthful fallback message with Contact and WhatsApp links; it does not claim an enquiry was received.
- [ ] Pressing Escape closes the panel and returns focus to the toggle button.
- [ ] Reduced-motion preferences disable the panel entrance animation.
- [ ] Hidden on `/track` route per spec.

### 3.5. Saurik Track Dedicated Landing Page (`/track`)
- [ ] H1 renders: `"Know where your field team is. Know what's left in the van."`
- [ ] Shift manifest visual card renders Rahul Sharma with 4 checkpoint rows and color status dots.
- [ ] Problem band renders 4 numbered items (`01` to `04`) on dark `#212F45` background.
- [ ] 2 feature cards (GPS and Inventory) render with amber bullet dots.
- [ ] 4-step shift walkthrough renders with mono step labels.
- [ ] 5 industry pill chips render in horizontal row.
- [ ] 3 privacy columns render with transparent tracking commitments.
- [ ] 5 FAQ items expand and collapse using pure HTML `<details><summary>` with CSS `+`/`–` toggle.
- [ ] Primary CTA and Repeat CTA buttons link to `#cta`.
- [ ] Footer displays `support@sauriktrack.com` and copyright.

### 3.6. Responsive Design & Mobile Reflow
Test in developer tools responsive mode at:
- **320px:** Extra-small mobile (ensure zero horizontal overflow on `/track`).
- **360px:** Small mobile.
- **390px:** Standard iPhone/Android viewport.
- **768px:** iPad/Tablet portrait (grid transitions to single column).
- **1024px:** Tablet landscape / small laptop.
- **1440px:** Desktop (content bounded to max width).
## Arthos Invoice Studio Landing Page

- `npm.cmd test` includes `test/verify_arthos_spec.cjs`, which checks:
  - The 9 required semantic sections in exact order (`hero`, `editions`, `problems`, `features`, `workflow`, `data-and-backups`, `trial-and-pricing`, `faq`, `final-cta`).
  - Strict parity between static crawler HTML (`public/arthos/index.html`) and the React SPA component (`src/pages/Arthos.jsx`).
  - Route registration in `App.jsx` (`/arthos` and `/arthos/`) and cross-links in `Header.jsx` and `Footer.jsx`.
  - Launch-state enforcement (State A: Pre-launch with "Request early access" pointing to `/contact?topic=arthos_early_access`).
  - 60-day trial claims, edition boundary disclaimers (Desktop offline local storage vs Cloud internet account storage), and zero unverified P&L/GST filing claims.
  - Social preview asset (`public/arthos/og-image.svg` at 1200×630).
