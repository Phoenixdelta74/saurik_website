---
name: website-wireframing
description: Defines page layout, content hierarchy, section ordering, and wireframe blueprints across mobile and desktop viewports for SAURIK IT.
---

# Skill: Wireframing & Page Structure (`website-wireframing`)

The `website-wireframing` skill establishes the spatial organization, structural hierarchy, and content sequence of web pages before committing to visual styling or frontend code.

---

## 1. When to Use

Use this skill when:
- Designing a new landing page, service page, or marketing route.
- Restructuring an existing page layout to improve readability or conversion.
- Planning the layout transformation between mobile single-column and desktop multi-column grids.

---

## 2. Page Structure & Section Ordering

Every marketing page on the SAURIK IT website must follow a deliberate, logical content hierarchy:

1. **Header & Global Navigation:** Brand logo, primary route links (`Software`, `Hardware`, `About`, `Contact`), and high-contrast CTA.
2. **Hero Section:**
   - Single, prominent `<h1>` conveying value proposition clearly.
   - Concise subtitle describing core capability.
   - Dual CTAs: Primary action (e.g. "Explore Software") and Secondary action (e.g. "Contact Us").
3. **Core Offerings / Capabilities Section:**
   - Structured grid or card layout presenting verified services.
   - Distinct visual tags or color coding (Teal for software, Blue for hardware).
4. **Trust & Methodology Section:**
   - Explain working approach, deployment principles, or technical architecture.
   - Grounded strictly in real operational facts (no fake metrics or unverified client logos).
5. **Interactive Demo / Visual Feature:**
   - Structured UI mockup, flowchart, or interactive illustration demonstrating service operation.
6. **Conversion / Contact Section:**
   - Accessible enquiry form or channel selection.
7. **Global Footer:** Company information, legal links (`Privacy`, `Terms`, `Refund`), and verified address.

---

## 3. Mobile vs. Desktop Structural Adaptation

| Section | Mobile Layout (360px - 390px) | Desktop Layout (1024px - 1440px) |
|---|---|---|
| **Header** | Logo + Hamburger toggle button | Horizontal link list + prominent CTA |
| **Hero** | Stacked vertically, centered text, full-width CTAs | Split 2-column: Headline left, visual illustration right |
| **Service Grid** | 1 column stacked cards | 2 or 3-column balanced grid |
| **Contact Form** | Form stacked below company details | Side-by-side 2-column layout |
| **FAQ Section** | Collapsible accordion disclosures | Accordion or 2-column disclosure grid |

---

## 4. Wireframe Specification Output

```markdown
# Wireframe Specification: [Page Name]

## 1. Page Header & Hero
- `[Header]`: Fixed top, blur backdrop, Logo left, Nav right.
- `[Hero]`: H1: "[Clear Headline]" | P: "[Subtitle]" | [Primary CTA] [Secondary CTA]

## 2. Section Breakdown & Order
1. **Hero Banner:** Full viewport height on mobile, split-column on desktop.
2. **Services Grid:** 3 cards displaying Software, Hardware, and Custom Solutions.
3. **Architecture Illustration:** Interactive diagram showing data flow.
4. **Contact Callout:** Pre-filled enquiry button routing to `/contact?service=...`.
5. **Footer:** 4-column layout desktop, stacked on mobile.

## 3. Responsive Breakpoint Rules
- `< 768px`: Strict 1-column stack, 16px lateral padding.
- `768px - 1023px`: 2-column grid, 24px lateral padding.
- `≥ 1024px`: Max width `max-w-7xl mx-auto`, 32px lateral padding.
```

