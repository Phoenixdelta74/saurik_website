# SAURIK IT Website Architecture & Technical Design Principles

**Version:** 1.2  
**Last Updated:** 13 September 2026  
**Status:** Living Technical Architecture Document  

---

## 1. Executive Architectural Overview

The **SAURIK IT Private Limited** corporate website (saurik-it-website) is a client-rendered, high-performance Single Page Application (SPA) designed to communicate the company's two primary lines of business: **Software & IT** and **IT Hardware & Infrastructure**, along with its flagship mobile ERP product **Saurik Track**. A floating AI website assistant provides answers grounded in the same published content through a separate serverless API boundary.

The system is constructed with a strict philosophy: **"Technology, Deliberately."** Every architectural decision prioritizes clarity of information, verifiable claims, lightning-fast Core Web Vitals, accessible interaction patterns (WCAG 2.2 AA), and complete separation between content datasets and presentation components.

`mermaid
graph TD
    User([Visitor Browser]) --> IndexHTML[index.html / Google Fonts Outfit & Inter]
    IndexHTML --> MainJSX[src/main.jsx - React 18 Root]
    MainJSX --> AppShell[src/App.jsx - BrowserRouter & Layout Shell]
    
    subgraph Shell Layer
        AppShell --> Header[src/components/Header.jsx]
        AppShell --> RouterView[React Router v6 Routes]
        AppShell --> WhatsApp[src/components/WhatsAppCTA.jsx]
        AppShell --> ChatWidget[src/components/ChatWidget.jsx]
        AppShell --> Footer[src/components/Footer.jsx]
    end
    
    subgraph Route Pages [src/pages/]
        RouterView --> Home[/ Home]
        RouterView --> Software[/software Software & IT]
        RouterView --> Hardware[/hardware Hardware & IT]
        RouterView --> About[/about About & Story]
        RouterView --> Contact[/contact Smart Enquiry]
        RouterView --> Track[/track Saurik Track Flagship ERP]
        RouterView --> Privacy[/privacy Data Policy]
        RouterView --> NotFound[* 404 Fallback]
    end
    
    subgraph Data & Content Layer [src/data/]
        CompanyData[(companyData.js)]
        SoftwareData[(softwareData.js)]
        HardwareData[(hardwareData.js)]
        TrackData[(trackData.js)]
    end
    
    Home -.-> CompanyData
    Software -.-> SoftwareData
    Hardware -.-> HardwareData
    Contact -.-> CompanyData
    Track -.-> TrackData
    Footer -.-> CompanyData
    ChatWidget --> ChatAPI[api/chat.js - POST /api/chat]
    ChatAPI --> ChatContext[src/data/chatContext.js]
    ChatAPI --> Providers[api/_lib/llmProviders.js]
`

---

## 2. Technology Stack & Decision Rationale

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Runtime & Framework** | React 18 (eact, eact-dom) | Component modularity, functional hooks, declarative UI rendering. |
| **Build & Dev Tooling** | Vite 6 | Sub-second Hot Module Replacement (HMR), tree-shaking, Rollup bundling. |
| **Routing** | React Router v6 (eact-router-dom) | Declarative client-side routing, URL query parameter preservation for cross-page enquiry preselection, scroll restoration. |
| **Styling & Design Tokens** | Tailwind CSS 3 + PostCSS + Autoprefixer | Utility-first architecture bound to precise custom design tokens (canvas, surface, ink, ccent). Zero runtime CSS overhead. |
| **Iconography** | Lucide React (lucide-react) | Consistent, accessible SVG stroke icon family. Emojis are strictly banned as interface icons. |
| **Branding & Assets** | PNG + SVG | Dual asset strategy: logo.png for official lockups, logo-mark.png for icon badges & favicons. |
| **AI Assistant API** | Vercel serverless function + provider SDKs | Keeps LLM credentials server-side, limits request history, and supports provider selection without bundling secrets into the browser. |

---

## 3. Core Architectural Principles

### 3.1. "Technology, Deliberately" Philosophy
- Avoid technology bloat. We do not load heavy 3D canvas libraries, unverified third-party analytics trackers, or intrusive popups.
- Avoid artificial claims: No unverified client counts, fake testimonial avatars, or partner logos without legal agreement.
- Transparent deliverables: Every service card clearly outlines problem solved, deliverables, information needs, and timelines.

### 3.2. Single Source of Truth for Content (The Data Layer)
All business copy, contact details, capability lists, hardware specifications, and FAQ answers reside in src/data/:
- src/data/companyData.js: Legal entity name, verified phone, verified email, working principles, 4-stage delivery process.
- src/data/softwareData.js: 6 confirmed software capabilities in the owner-approved priority order, Agentic AI workflow stages, software FAQs.
- src/data/hardwareData.js: 3 confirmed hardware categories (CCTV, Computers, Servers), Home vs Business specs, buying process, hardware FAQs.
- src/data/trackData.js: Saurik Track copy, 4 core pillars, problem vs solution matrix, ROI calculator formulas, security specifications, founding partner pricing plans, and FAQs.

**Rule for developers & agents:** Never hardcode phone numbers, emails, or capability lists directly in JSX pages. Always import from the data layer.

### 3.3. Equal Division Prominence & Product Showcase
- The company operates two equal pillars: **Software & IT** (Digital Layer) and **Hardware & IT Support** (Physical Layer).
- The Homepage hero, navigation menu, and footer maintain balanced visual weight for both divisions.
- Visual distinction is maintained through semantic color coding:
  - **Teal (#087F72 / ccent-teal):** Software, AI, automation, and primary website conversions.
  - **Hardware Blue (#2456A6 / ccent-blue):** Hardware sales, CCTV surveillance, servers, and quote requests.
  - **Cyber Slate & Cyan (#0F172A / #06B6D4):** Saurik Track flagship mobile ERP landing page (/track).

---

## 4. Design Token System

The design token system is configured in 	ailwind.config.js and implemented in src/index.css:
- canvas: #F7F9F8 (Warm off-white background)
- surface: #FFFFFF (Card and modal background)
- ink.primary: #102A43 (Headings and main text, 14:1 contrast)
- ink.secondary: #486174 (Supporting copy, 6.1:1 contrast)
- ccent.teal: #087F72 (Software actions)
- ccent.blue: #2456A6 (Hardware actions)
- order.subtle: #D6E1E5 (Dividers)

### Typography
- **Headings (ont-heading):** Outfit, weights 500-800, tracking -0.02em.
- **Body Copy (ont-sans):** Inter, weights 400-700, line-height 1.6.

---

## 5. Routing and Deep-Linking Strategy

### 5.1. Route Map
- / : Home page
- /software : Software & IT capabilities (with deep hash anchors)
- /hardware : Hardware & IT Support (with deep hash anchors)
- /about : Company background and principles
- /contact : Smart enquiry form with preselected query parameters
- /track : Saurik Track flagship mobile ERP landing page
- /privacy : Plain-English data handling and enquiry policy
- * : Catch-all 404 page

### 5.2. Query-String Topic Preselection
Every call-to-action on service sections links directly to /contact with an intentional query string:
- /contact?topic=custom_apps
- /contact?topic=data_analytics
- /contact?topic=mobile_apps
- /contact?topic=saurik_track
- /contact?topic=cctv_residential
- /contact?topic=cctv_commercial
- /contact?topic=hardware_servers

Contact.jsx reads useSearchParams upon mounting, automatically selecting the relevant service category and expanding contextual sub-options.

### 5.3. Scroll Restoration & Hash Scrolling
The custom ScrollToTop component in src/App.jsx monitors both pathname and hash changes:
- Smooth-scrolls to the targeted anchor when a hash is provided (e.g. /software#agentic-ai, /track#roi).
- Smoothly scrolls to (0, 0) on regular page transitions.

---

## 6. Smart Enquiry System & State Feedback

Per design specification, the enquiry system provides truthful, accurate user feedback:
1. **Email Draft Protocol (mailto:):**
   - The form generates an encoded, structured mailto: URL with pre-filled fields.
   - Upon triggering, the interface displays: *"Your email draft is ready. Send it from your email app."* It **does not** claim "Message Sent" unless a backend server confirms receipt.
2. **Instant WhatsApp Protocol:**
   - Automatically compiles form state into an encoded WhatsApp message string and opens https://wa.me/919862087157?text=....
3. **Pluggable API Architecture:**
   - The form contains clean handler hooks ready to dispatch asynchronous etch requests to serverless endpoints if automated backend persistence is deployed.

---

## 7. AI Website Assistant

The global `ChatWidget` is a client-side conversation UI. It sends the latest conversation messages to `POST /api/chat`; the browser never receives an LLM API key.

- `api/chat.js` validates the request method and message shape, limits the forwarded history to the most recent 20 messages, and returns neutral configuration/service errors.
- `src/data/chatContext.js` assembles the system prompt from the company, software, and hardware data modules. This is the assistant's single content source and includes rules against invented claims, unsupported pricing, forecast guarantees, and unsupervised consequential actions.
- `api/_lib/llmProviders.js` selects Anthropic, OpenAI, OpenRouter, or Ollama using server-side environment variables.
- The widget provides keyboard focus handling, Escape-to-close behavior, live status updates, reduced-motion support, and a truthful fallback linking visitors to Contact and WhatsApp.
- Local Vite development renders the widget, but the API requires Vercel or `vercel dev` with a configured provider.

## 8. Accessibility & Performance Benchmarks

- **Target Standard:** WCAG 2.2 AA Conformance.
- **Minimum Touch Target:** 44px to 48px on all interactive controls.
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text headings.
- **Keyboard Navigation:** Explicit visible focus rings (ocus:ring-2 focus:ring-accent-teal), escape key listener on mobile menu, and full disclosure semantics on FAQ accordions.
- **Core Web Vitals Budget:**
  - Largest Contentful Paint (LCP): <= 2.5s
  - Interaction to Next Paint (INP): <= 200ms
  - Cumulative Layout Shift (CLS): <= 0.1
