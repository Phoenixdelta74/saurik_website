# Master Developer Guide for SAURIK IT Website

**Audience:** Autonomous AI agents, engineering leads, and full-stack developers modifying or extending the SAURIK IT website.

---

## 1. Prime Directives (Non-Negotiable)

1. **Adhere to `AGENTS.md` and `design.md`**:
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
5. **Always Verify Builds**:
   - Every code change must compile with zero errors using `npm run build`.

---

## 2. Codebase Directory Map

```
c:/Saurik/saurik_website/
├── index.html                  # HTML entry with Google Fonts (Outfit & Inter) & favicon
├── package.json                # Dependencies: react, react-dom, react-router-dom, lucide-react, tailwindcss
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Design token definitions (canvas, surface, ink, accent)
├── postcss.config.js           # PostCSS Tailwind plugins
├── architecture.md             # Technical architecture document
├── maintenance.md              # Maintenance procedures & schedules
├── masterdeveloper.md          # THIS GUIDE: Agent onboarding & patterns
├── testing.md                  # Test automation guide & test suite
├── designer.md                 # UI/UX design & aesthetics standards
├── change_log.md               # Living log of repository changes
├── README.md                   # Public repository overview
├── public/                     # Static assets (logo.png, logo-mark.png, favicon.svg)
└── src/
    ├── main.jsx                # React DOM mount
    ├── App.jsx                 # Router shell with ScrollToTop & layout
    ├── index.css               # Tailwind directives & shared utility classes
    ├── data/
    │   ├── companyData.js      # Legal identity, contact info, principles, process
    │   ├── softwareData.js     # 5 software capabilities, Agentic AI steps, FAQs
    │   └── hardwareData.js     # 3 hardware categories, buying steps, FAQs
    ├── components/
    │   ├── Logo.jsx            # Official brand lockup component
    │   ├── Header.jsx          # Sticky header with accessible mobile drawer
    │   ├── Footer.jsx          # Dual-division footer with contact info
    │   ├── WhatsAppCTA.jsx     # Floating WhatsApp quick-reach widget
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

### Pattern 3: Accessible Disclosures (Accordion)
Ensure all collapsible elements provide `aria-expanded`, `aria-controls`, and semantic IDs:
```jsx
<button
  type="button"
  id="faq-btn-0"
  aria-expanded={isOpen}
  aria-controls="faq-panel-0"
  onClick={() => toggle(0)}
>
  ...
</button>
<div id="faq-panel-0" role="region" aria-labelledby="faq-btn-0">
  ...
</div>
```

### Pattern 4: Official Logo Usage
Always use `<Logo />` from `src/components/Logo.jsx`. Props:
- `size` (number, default: 52): Controls logo image height.
- `showSubtitle` (boolean, default: true): Shows `"IT Pvt Ltd"` and tagline.
- `isLight` (boolean, default: false): Inverts accompanying text for dark backgrounds.

---

## 4. Verification Checklist Before Committing

- [ ] Ran `npm run build` and confirmed 0 errors.
- [ ] Checked that no UTF-8 BOM characters (`\uFEFF`) were introduced.
- [ ] Confirmed that contact details match `contact@wwwsaurikit.com` and `98620 87157`.
- [ ] Verified that internal navigation links use React Router `Link` or `NavLink`.
- [ ] Verified responsive layout at 360px, 768px, and 1200px widths.
- [ ] Updated `change_log.md` with a concise summary of the changes made.
