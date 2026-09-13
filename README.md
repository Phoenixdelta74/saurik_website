# SAURIK IT Private Limited — Corporate Website

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](LICENSE)

Official corporate marketing website for **SAURIK IT Private Limited**. Engineered with React 18, Vite 6, and Tailwind CSS following the **"Light and Precise"** design direction.

> **"Technology, Deliberately."**  
> Data Analytics, Generative AI, Agentic AI, custom web and mobile applications, website services, and dependable IT hardware sales & services shaped around your requirements.

---

## 🌟 Key Features

- **Dual Operational Divisions:** Equal prominence and tailored visitor journeys for **Software & IT** (Data Analytics, Generative AI, Agentic AI, Custom Web Apps, Websites, Mobile Apps) and **Hardware & IT Support** (CCTV, Computers, Servers).
- **Interactive Demonstrations:**
  - **Agentic AI Workflow Visualizer:** Interactive 4-step pipeline simulator showing human review gates.
  - **CCTV Premise Selector:** Instant comparison between Commercial Facility and Residential Home surveillance packages.
  - **Predictive Analytics Chart:** Interactive forecasting trendline with historical actuals and confidence bounds.
- **Truthful & Smart Enquiry System:**
  - Form validation with query parameter topic pre-selection (`?topic=...`).
  - Transparent email draft generation (`mailto:`) with accurate status feedback.
  - Direct WhatsApp chat integration (`+91 98620 87157`).
- **AI Website Assistant:** A floating, accessible chat widget grounded in the published company, software, and hardware content, with a server-side provider proxy and safe fallback messaging.
- **Official Brand Integration:** Scalable display of the official SAURIK geometric constellation logo and browser favicon.
- **Accessibility & Performance:** Built to target **WCAG 2.2 AA** contrast and keyboard navigation, with fast Core Web Vitals.

---

## 🛠️ Tech Stack

- **Runtime & UI:** React 18
- **Build Tool:** Vite 6
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3 + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **AI Chat Backend:** Vercel serverless function with Anthropic, OpenAI-compatible, OpenRouter, and Ollama provider support
- **Typography:** Outfit (Headings) + Inter (Body)

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone or navigate to the repository
cd c:/Saurik/saurik_website

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

The chat widget is visible in the Vite app, but `/api/chat` requires a Vercel
runtime (or `vercel dev`) and a server-side LLM provider configuration. See
[`maintenance.md`](maintenance.md#44-chat-assistant-setup-vercel-deployment)
for provider setup. Never expose provider keys through `VITE_` environment
variables.

### Building for Production
```bash
# Create optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Repository Documentation Map

For detailed guides, please refer to the dedicated documentation files:

| Document | Purpose |
| :--- | :--- |
| [**`architecture.md`**](architecture.md) | Technical architecture, design principles, component hierarchy, and data flow. |
| [**`maintenance.md`**](maintenance.md) | Maintenance schedules, content updates, logo handling, and troubleshooting. |
| [**`masterdeveloper.md`**](masterdeveloper.md) | Developer & AI agent onboarding guide, golden rules, and coding patterns. |
| [**`testing.md`**](testing.md) | Automated testing scripts, route crawling, and manual QA checklists. |
| [**`designer.md`**](designer.md) | UI/UX design specifications, color tokens, typography scale, and component rules. |
| [**`change_log.md`**](change_log.md) | Living log of all versioned changes and historical implementations. |
| [**`design.md`**](design.md) | Original design brief and product specification. |

---

## 📞 Official Company Contact

- **Company:** SAURIK IT Private Limited
- **Email:** [contact@wwwsaurikit.com](mailto:contact@wwwsaurikit.com)
- **Phone / WhatsApp:** [+91 98620 87157](tel:+919862087157)
- **Hours:** Monday to Saturday, 9:30 AM – 6:30 PM IST

---

## 📄 License & Rights

© 2026 SAURIK IT Private Limited. All rights reserved. Proprietary software.
