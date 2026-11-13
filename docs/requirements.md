# Living Project Requirements

This document represents the current source of truth for the SAURIK IT Private Limited digital platform, active offerings, target users, and non-functional requirements.

---

## 1. Product Scope & Domains

SAURIK IT Private Limited operates across two primary domains:
1. **Software & Intelligent Automation:**
   - **Custom Web & Mobile Development:** Modern React, Tailwind, and scalable cloud architectures.
   - **Saurik Track:** Operations tracking and field management platform.
   - **Arthos Invoice Studio:** Professional invoice generation and business management software.
   - **Enterprise AI Chatbots & RAG Engines:** Multi-tenant customer support agents with WhatsApp integration.
   - **Demand Planning & Predictive Analytics:** AI forecasting for FMCG, manufacturing, and retail inventory.
2. **Hardware & Infrastructure Solutions:**
   - **Commercial & Enterprise CCTV Systems:** IP camera installation, NVR setup, remote monitoring, and maintenance.
   - **Local Networking & Structured Cabling:** Office LAN/WAN setups and wireless infrastructure.
   - **On-Premise Server Installation & Maintenance:** Physical rack mounting, local server deployment, and hardware servicing (explicitly excluding public cloud hosting or VPS rental).

---

## 2. Target Audience

- **B2B & Enterprise:** Industrial managers, logistics operators, retailers, and private businesses in Tripura, Assam, and Northeast India.
- **Commercial & Residential Property Owners:** High-reliability security cameras and local network setups.
- **Public Sector & Institutional Clients:** Local government and healthcare organizations needing dependable on-site IT operations.

---

## 3. Non-Functional & Architectural Mandates

1. **Zero-Cost Native Voice Engine:**
   - Voice assistant operates primarily via browser-native Web Speech API.
   - Scale-to-zero serverless GPU (Maya 2 Native on Modal) acts as fallback only when client devices lack regional voices.
2. **Zero-JS Static Pre-Rendering (SSG):**
   - All 17 customer-facing routes must be pre-rendered to static HTML in `dist/` for instant initial paint, search crawlability, and social sharing.
3. **WCAG 2.2 AA Accessibility:**
   - Keyboard navigable, visible focus outlines, 44–48px touch targets, adequate color contrast, and respect for `prefers-reduced-motion`.
4. **Strict Negative Marketing Constraints:**
   - Zero fabricated metrics, fake customer counts, or unearned awards.
   - Truthful contact feedback (state "Draft prepared in email/WhatsApp", never claim email received unless server confirms).
   - Server offerings describe installation and service, never public cloud hosting.

