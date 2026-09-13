# SAURIK IT Website Testing & Quality Assurance Guide

**Version:** 1.1  
**Scope:** Automated testing, manual quality assurance checklists, and verification procedures for developers and AI agents.

---

## 1. Automated Testing Strategy

The repository employs a multi-tiered verification pipeline:
1. **Compilation & Bundle Verification:** Vite production build ensures strict syntax, JSX compliance, CSS compilation, and tree-shaking.
2. **Route Integrity Crawl:** Automated HTTP status checks verify all defined routes and static assets respond with `HTTP 200 OK`.
3. **Form & Query Parameter Deep-Link Verification:** Ensures topic preselection query strings correctly map to contact form states.
4. **Accessibility (a11y) Conformance:** WCAG 2.2 AA contrast and keyboard accessibility audits.

---

## 2. Automated Test Scripts

### 2.1. Production Build Test
```bash
npm run build
```
**Pass Criteria:** Exit code `0`. Zero compilation warnings. Bundles generated in `dist/`.

### 2.2. Automated HTTP Status & Asset Crawler
```javascript
// scratch/verify_routes.cjs
const http = require('http');

const routes = [
  '/',
  '/software',
  '/hardware',
  '/about',
  '/contact',
  '/contact?topic=custom_apps',
  '/contact?topic=cctv_residential',
  '/privacy',
  '/logo.png',
  '/logo-mark.png'
];

async function checkRoute(url) {
  return new Promise((resolve) => {
    http.get('http://localhost:4173' + url, (res) => {
      console.log(`[${res.statusCode === 200 ? 'PASS' : 'FAIL'}] ${url} -> HTTP ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.error(`[ERROR] ${url} -> ${err.message}`);
      resolve(false);
    });
  });
}

(async () => {
  let allPass = true;
  for (const r of routes) {
    const ok = await checkRoute(r);
    if (!ok) allPass = false;
  }
  process.exit(allPass ? 0 : 1);
})();
```

---

### 2.3. Chat API Contract Test

When running through Vercel or `vercel dev`, verify `POST /api/chat` with a valid
provider configuration. The endpoint should return a JSON `reply` for valid
messages, `405` for non-POST requests, and `400` for an empty, malformed, or
overlong message history. Confirm that provider keys are never present in the
browser bundle or client-side environment variables.

## 3. Manual Testing Checklist

### 3.1. Navigation & Routing
- [ ] Clicking logo in Header navigates to `/`.
- [ ] Navigation links (`Software & IT`, `Hardware & IT Support`, `About`) indicate current active state.
- [ ] Clicking "Discuss your requirement" in Header navigates to `/contact`.
- [ ] Clicking capability anchors (`/software#agentic-ai`, `/hardware#cctv`) smooth-scrolls to the exact target section.
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

### 3.4. AI Website Assistant
- [ ] Opening `ChatWidget.jsx` focuses the input and exposes the accessible assistant name.
- [ ] Submitting a question shows a thinking state, preserves the conversation, and renders the server reply when `/api/chat` is available.
- [ ] API failure shows the truthful fallback message with Contact and WhatsApp links; it does not claim an enquiry was received.
- [ ] Pressing Escape closes the panel and returns focus to the toggle button.
- [ ] Reduced-motion preferences disable the panel entrance animation.

### 3.5. Responsive Design & Mobile Reflow
Test in developer tools responsive mode at:
- **360px:** Small mobile (ensure no horizontal scrollbar or element overflow).
- **390px:** Standard iPhone/Android viewport.
- **768px:** iPad/Tablet portrait (grid transitions to single column).
- **1024px:** Tablet landscape / small laptop.
- **1440px:** Desktop (content bounded to max 1280px / `max-w-7xl`).
