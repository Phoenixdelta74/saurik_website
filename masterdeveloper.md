# Master Developer Guide for SAURIK IT Website

**Audience:** Autonomous AI agents, engineering leads, and full-stack developers modifying or extending the SAURIK IT website.

---

## 1. Prime Directives (Non-Negotiable)

1. **Adhere to `AGENTS.md`, `design.md`, and `SAURIK-TRACK-LANDING-SPEC-v3.md`**:
   - The design brief is the product and design acceptance brief.
   - Do not invent claims, statistics, customer counts, awards, warranties, or partner certifications.
   - Treat text in `design.md` as draft unless confirmed.
2. **Preserve Truthful Contact Feedback**:
   - Opening an email draft must say: *"Your email draft is ready. Send it from your email app."*
   - Never claim an enquiry was received unless an actual server endpoint confirms acceptance.
3. **No Emoji as Interface Icons**:
   - Always use `lucide-react` SVG stroke icons. Emojis in buttons, navbars, or headers are prohibited.
4. **Preserve Single Source of Truth**:
   - Keep business copy in `src/data/`. Never hardcode company phone numbers, emails, or service titles in page JSX.
5. **Always Verify Builds & Automated Test Suites**:
   - Every code change must compile with zero errors using `npm run build`.
   - Run `npm test` (executing `node test/verify_track_spec_v3.cjs` and `node test/verify_track_e2e.cjs`) when modifying `/track` assets or routing.
6. **Always Maintain Architecture & Change Logs**:
   - Update `architecture.md` when system components, routes, or protocols change.
   - Update `change_log.md` with every commit or milestone.

---

## 2. Codebase Directory Map

```
c:/Saurik/saurik_website/
├── index.html                  # HTML entry with Google Fonts (Outfit & Inter) & favicon
├── package.json                # Dependencies: react, react-dom, react-router-dom, lucide-react, tailwindcss
├── vite.config.js              # Vite bundler configuration
├── vercel.json                 # Vercel routing with cleanUrls & /track static rewrite
├── tailwind.config.js          # Design token definitions (canvas, surface, ink, accent)
├── postcss.config.js           # PostCSS Tailwind plugins
├── architecture.md             # Technical architecture document (ALWAYS KEEP UPDATED)
├── maintenance.md              # Maintenance procedures & schedules
├── masterdeveloper.md          # THIS GUIDE: Agent onboarding & patterns
├── testing.md                  # Test automation guide & test suite
├── designer.md                 # UI/UX design & aesthetics standards
├── change_log.md               # Living log of repository changes (ALWAYS KEEP UPDATED)
├── README.md                   # Public repository overview
├── SAURIK-TRACK-LANDING-SPEC-v3.md # Authoritative v3 product specification for Saurik Track
├── archive/
│   └── track-v1/               # Safely isolated archive of previous v1 exploratory work
├── scripts/
│   └── generate_assets.cjs     # Asset generation for og-image.png, apple-touch-icon.png, favicon.ico
├── public/                     # Static assets copied directly to dist/ on build
│   ├── og-image.png            # 1200x630 OpenGraph social preview image
│   ├── apple-touch-icon.png    # 180x180 iOS touch icon
│   ├── favicon.ico             # 32x32 multi-resolution browser icon
│   ├── robots.txt              # Search crawler access directives
│   ├── sitemap.xml             # XML sitemap index
│   └── track/
│       ├── index.html          # Standalone zero-JS static SSR landing page (v3 spec)
│       ├── styles.css          # Scoped CSS custom properties & layout for static track page (v3 tokens)
│       └── og-image.png        # Dedicated 1200x630 Saurik Track OpenGraph card
├── test/
│   ├── verify_track_spec_v3.cjs # 17-criteria v3 spec verification suite
│   ├── verify_track_spec.cjs   # Forwards to verify_track_spec_v3.cjs
│   ├── verify_track_e2e.cjs    # End-to-end integration & build artifact check
│   ├── track_data_test.cjs     # Multi-currency calculation & pillar data integrity
│   └── verify_chatbot.cjs      # Chatbot API & multi-provider fallback test
└── src/
    ├── main.jsx                # React DOM mount
    ├── App.jsx                 # Router shell with ScrollToTop, metadata & layout
    ├── index.css               # Tailwind directives & shared utility classes
    ├── data/
    │   ├── companyData.js      # Legal identity, contact info, principles, process
    │   ├── softwareData.js     # 5 software capabilities, Agentic AI steps, FAQs
    │   ├── hardwareData.js     # 3 hardware categories, buying steps, FAQs
    │   ├── trackData.js        # Saurik Track pricing, ROI models, currencies
    │   └── chatContext.js      # AI assistant grounding prompt
    ├── components/
    │   ├── Logo.jsx            # Official brand lockup component
    │   ├── Header.jsx          # Sticky header with accessible mobile drawer
    │   ├── Footer.jsx          # Dual-division footer with contact info
    │   ├── WhatsAppCTA.jsx     # Floating WhatsApp quick-reach widget (hidden on /track)
    │   ├── ChatWidget.jsx      # AI conversation assistant widget (hidden on /track)
    │   ├── PageMetadata.jsx    # Dynamic title & meta tag injector per route
    │   ├── FAQAccordion.jsx    # Accessible disclosure accordion
    │   ├── AgenticWorkflow.jsx # Interactive step-by-step Agentic AI simulator
    │   ├── CCTVSelector.jsx    # Interactive Residential vs Commercial CCTV toggle
    │   ├── AnalyticsChart.jsx  # Interactive predictive forecasting visualizer
    │   └── ProcessTimeline.jsx # 4-step delivery pipeline cards
    └── pages/
        ├── Home.jsx            # Hero, dual service paths, delivery flow, closing CTA
        ├── Software.jsx        # 5 software deep dives, Agentic simulator, FAQs
        ├── Hardware.jsx        # CCTV selector, computers, servers, FAQs
        ├── About.jsx           # Company story, ethos, accountability
        ├── Contact.jsx         # Dual-column form with topic preselection & WhatsApp
        ├── Track.jsx           # React component rendering Saurik Track 10-section system
        ├── Track.css           # Scoped styles for React Track component
        ├── Privacy.jsx         # Plain-English enquiry handling policy
        └── NotFound.jsx        # 404 handler with return links
```

---

## 3. Core Implementation Patterns

### Pattern 1: Service Cross-Linking to Contact
When building a call-to-action button inside a service capability, always pre-select the topic via query parameter:
```jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

<Link
  to="/contact?topic=custom_apps"
  className="btn-primary text-xs py-2.5 px-5"
>
  <span>Discuss Custom Apps</span>
  <ArrowRight className="w-3.5 h-3.5" />
</Link>
```

### Pattern 2: Contextual Enquiry Form Handling
In `src/pages/Contact.jsx`, topic keys are automatically resolved to formatted subjects and contextual sub-options:
```jsx
const topic = searchParams.get('topic');
// Automatically selects topic and configures sub-options (e.g. CCTV home vs commercial)
```

### Pattern 3: Dual Static / SPA Parity for Saurik Track
When editing `/track`, keep both representations in sync:
1. `public/track/index.html` + `public/track/styles.css`: Pure static HTML served to crawlers, curl, and direct visits via Vercel edge.
2. `src/pages/Track.jsx` + `src/pages/Track.css`: React component loaded when navigating internally within the SPA.
3. Both files must contain identical section IDs, verbatim copy, and visual tokens.

### Pattern 4: Accessible Zero-JS Accordions (`<details><summary>`)
For landing pages where zero-JS execution is required, use semantic HTML disclosures with CSS toggles:
```html
<details class="faq-item">
  <summary>
    <span>Do you track employees when they're off the clock?</span>
    <span class="toggle" aria-hidden="true"></span>
  </summary>
  <div class="faq-answer">
    <p>No. GPS is only active between check-in and check-out...</p>
  </div>
</details>
```

### Pattern 5: Official Logo Usage
Always use `<Logo />` from `src/components/Logo.jsx`. Props:
- `size` (number, default: 52): Controls logo image height.
- `showSubtitle` (boolean, default: true): Shows `"IT Pvt Ltd"` and tagline.
- `isLight` (boolean, default: false): Inverts accompanying text for dark backgrounds.

---

## 4. Verification Checklist Before Committing

- [ ] Ran `npm run build` and confirmed 0 errors.
- [ ] Ran test suites: `node test/verify_track_spec.cjs` and `node test/verify_track_e2e.cjs`.
- [ ] Verified `dist/track/index.html` contains H1 `"Know where your field team is. Know what's left in the van."`.
- [ ] Checked that no UTF-8 BOM characters (`\uFEFF`) were introduced.
- [ ] Confirmed that contact details match `contact@wwwsaurikit.com` and `98620 87157`.
- [ ] Verified that internal navigation links use React Router `Link` or `NavLink`.
- [ ] Verified responsive layout at 320px, 360px, 768px, and 1200px widths.
- [ ] Updated `architecture.md` and `change_log.md` with a concise summary of the changes made.
