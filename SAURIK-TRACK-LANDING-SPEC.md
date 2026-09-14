# Saurik Track — Landing Page Rebuild Spec

**Role of this file:** This is an engineering brief for a coding agent (Claude Code / Codex). Execute every requirement in order. When a section says "verbatim," copy the text exactly, including punctuation and capitalization. When a section says "do not," treat that as a hard constraint.

**Deliverable:** A production-ready, SEO-crawlable landing page for the Saurik Track product, replacing whatever currently exists at the `/track` route.

**Owner-provided context (do not contradict):**
- Product name: **Saurik Track**
- Positioning: A B2B field-operations platform for small and mid-sized field sales, distribution, service, and installation teams.
- Two hero capabilities: **GPS attendance & field workforce visibility** and **Inventory / van-stock management**.
- Primary CTA: **Start free 30-day trial** (no credit card required).
- Stage: General availability marketing (present as launched, not beta).

---

## 1. Problems the existing page has (must all be fixed)

1. The page returns an empty HTML shell to crawlers. The rendered content is JavaScript-injected and invisible to Google, LinkedIn/WhatsApp link previews, and AI answer engines.
2. The `<title>` tag says "SAURIK IT Private Limited," not the product name.
3. The `<meta name="description">` describes the parent company's services ("Custom software, Agentic AI, IT hardware"), not Saurik Track.
4. There is no product-specific Open Graph or Twitter card metadata.
5. The domain `wwwsaurikit.com` is confusing (the "www" is baked into the domain, not a subdomain). Every share link is fragile.

**Every one of these must be resolved by this rebuild.**

---

## 2. Non-negotiable technical requirements

### 2.1 The page must be crawlable without JavaScript
- Render the full page HTML on the server (SSR) or at build time (SSG). No client-side-only rendering.
- Acceptance test: `curl -s <url> | grep "Know where your field team is"` must return a match. If it doesn't, the build has failed the primary requirement.

### 2.2 Recommended stack (in order of preference)
1. **Static HTML + CSS** (simplest, hosted on any CDN). Preferred if no interactivity beyond a form is needed.
2. **Astro** with a single `.astro` page. Zero-JS by default, SSG output.
3. **Next.js 14+ App Router** with the page as a Server Component. Use it only if the wider site is already on Next.js.

Do not use client-side React, Vue, or Angular for this page. Do not add unnecessary JavaScript frameworks.

### 2.3 Domain and routing
- The page must be reachable at a clean, memorable URL. Recommend one of:
  - `https://sauriktrack.com/` (root of a dedicated product domain — preferred; the support email at `support@sauriktrack.com` already implies this)
  - `https://track.saurikit.com/` (subdomain of a clean parent domain)
- Do not ship on `wwwsaurikit.com/track`. If DNS work is out of scope, flag it in the PR description as a follow-up.

### 2.4 Performance budget
- Lighthouse Performance ≥ 90 on mobile.
- Largest Contentful Paint ≤ 2.0s on a fast 3G throttle.
- Total page weight ≤ 250 KB (excluding fonts).
- No render-blocking JavaScript. CSS may be inlined for critical path.

---

## 3. Metadata — copy this verbatim into `<head>`

```html
<title>Saurik Track — GPS attendance and van-stock tracking for field teams</title>
<meta name="description" content="Know who's on shift, where visits happened, and what's left in the van. Saurik Track pairs GPS attendance with live inventory for field sales and service teams. Free 30-day trial.">
<link rel="canonical" href="https://sauriktrack.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Saurik Track">
<meta property="og:title" content="Saurik Track — GPS attendance and van-stock tracking for field teams">
<meta property="og:description" content="Know who's on shift, where visits happened, and what's left in the van. Free 30-day trial, no credit card.">
<meta property="og:url" content="https://sauriktrack.com/">
<meta property="og:image" content="https://sauriktrack.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Saurik Track — GPS attendance and van-stock tracking for field teams">
<meta name="twitter:description" content="Know who's on shift, where visits happened, and what's left in the van. Free 30-day trial, no credit card.">
<meta name="twitter:image" content="https://sauriktrack.com/og-image.png">

<!-- Structured data: SoftwareApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Saurik Track",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Android, Web",
  "description": "GPS attendance, structured visit logging, and van-stock inventory for small and mid-sized field sales and service teams.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free 30-day trial"
  }
}
</script>
```

**Also required:**
- A 1200×630 PNG named `og-image.png` in the site root. If one does not exist, generate a simple one: dark background, product name in large type, tagline "GPS attendance + van-stock for field teams" underneath, brand accent color as a single stroke.
- A `favicon.ico` and `apple-touch-icon.png` (180×180).
- A `robots.txt` allowing crawling.
- A `sitemap.xml` listing the landing page URL.

---

## 4. Information architecture — sections in this exact order

Ship exactly these sections, in this order, with the exact IDs listed:

1. `<nav id="site-nav">` — sticky top navigation
2. `<section id="hero">` — headline, subhead, primary CTA, product visual
3. `<section id="problem">` — the "before Saurik Track" state
4. `<section id="features">` — two feature blocks (GPS + Inventory)
5. `<section id="how-it-works">` — 4-step shift walkthrough
6. `<section id="industries">` — industry chips
7. `<section id="privacy">` — trust / privacy commitments
8. `<section id="faq">` — 5 questions, expandable
9. `<section id="cta">` — repeat the free-trial CTA
10. `<footer id="site-footer">` — brand, links, contact

Do not add sections not on this list. Do not reorder. Do not merge sections.

---

## 5. Full copy — use verbatim

### 5.1 Navigation

```
Brand: Saurik Track
Links (left to right): Product | How it works | Industries | Privacy
CTA button (right): Start free trial → anchor to #cta
```

### 5.2 Hero

**H1 (headline):**
```
Know where your field team is. Know what's left in the van.
```

**Subhead (max 2 lines):**
```
Saurik Track pairs GPS attendance with live van-stock, so managers stop chasing updates on WhatsApp and start seeing the day as it happens.
```

**Primary CTA button:**
```
Start free 30-day trial
```

**Micro-text under CTA:**
```
No credit card required
```

**Hero visual:** A stylized "shift manifest" showing four checkpoints in a rep's day. Render as HTML/CSS (not an image), so it stays crisp and is part of the crawlable content. Structure:

- Header row: `Rahul Sharma — North Zone` (left), today's date (right)
- Checkpoint 1: **Checked in** · 9:04 AM · "Location verified, accuracy 8m" · green status dot
- Checkpoint 2: **Visit logged — Apex Healthcare** · 10:22 AM · "Order taken · ₹1,250.00" · "Van stock auto-adjusted" tag · navy status dot
- Checkpoint 3: **Session paused — Lunch break** · 1:00 PM · "Tracking suspended until resume" · amber status dot
- Checkpoint 4: **Checked out** · 6:02 PM · "7h 58m logged · 4 visits · 1 order" · green status dot

### 5.3 Problem section

**H2:**
```
Right now, the field runs on group chats and guesswork.
```

**Four points, each with a numbered eyebrow (01–04), a bold sub-heading, and one line of body:**

```
01
Nobody knows who's active or stuck
Reps report in when it's convenient, not when a manager needs to know.

02
Attendance disputes have no evidence
"I was there" vs. "the sheet says otherwise" — with nothing to settle it.

03
Van stock and warehouse counts drift apart
Orders get booked in the field faster than stock gets reconciled on paper.

04
Weekly reports mean someone's evening is gone
Pulling attendance, visits, and orders into one sheet shouldn't be manual work.
```

### 5.4 Features section

**Section H2:**
```
Two systems, one live picture of the field
```

**Section intro (one paragraph):**
```
Attendance tells you who's working and where. Inventory tells you what they're carrying and selling. Saurik Track keeps both in sync, automatically.
```

**Feature card 1 — GPS Attendance & Field Visibility**

- Tag/eyebrow: `GPS Attendance & Field Visibility`
- H3: `See the field, not just a spreadsheet of it`
- Body: `Reps check in with a verified location, and stay visible on a live map for the length of their shift — nothing tracked before check-in or after check-out.`
- Bullet list:
  - `Live map of every on-duty rep, with pause and travel status`
  - `Structured visit outcomes — order taken, follow-up, no sale`
  - `An exceptions queue that surfaces missed checkouts and stale locations, instead of burying them in a list`
  - `Attendance correction requests with admin approval and an audit trail`

**Feature card 2 — Inventory & Van-Stock Tracking**

- Tag/eyebrow: `Inventory & Van-Stock Tracking`
- H3: `Stock that updates itself when an order closes`
- Body: `Every van is a mobile extension of the warehouse. When a rep books an order in the field, the stock ledger moves with it — no separate reconciliation step.`
- Bullet list:
  - `One-click industry templates — FMCG, pharma, electronics, apparel`
  - `Immutable price and stock revision history, with a reason attached to every change`
  - `Warehouse-to-van transfer manifests, tracked by vehicle`
  - `Spreadsheet-speed entry — arrow keys, bulk paste, single-key shortcuts`

### 5.5 How it works section

**H2:**
```
How a shift actually moves through the system
```

**Four steps, each with a mono-styled label, an H3, and one line of body:**

```
STEP 1 — Check in
A rep opens the app at their first stop and checks in. Location is verified on the spot.

STEP 2 — Log the visit
Client name, outcome, and order value are recorded — stock adjusts automatically if an order closes.

STEP 3 — Pause when needed
Lunch or a long transit break pauses tracking cleanly, with the reason recorded.

STEP 4 — Check out
The shift closes with a summary — hours worked, visits made, orders booked.
```

### 5.6 Industries section

**Lead-in phrase:**
```
Built for teams that sell and deliver in person:
```

**Chips (render as pills):**
```
FMCG & Beverages
Pharma & Healthcare
Electronics & Hardware
Fashion & Apparel
Logistics & Distribution
```

### 5.7 Privacy section

**H2:**
```
Transparent tracking, by design
```

**Three columns:**

```
Tracking has a start and an end
Location is only ever recorded between check-in and check-out. It stops the moment a shift pauses or ends.

Every company is walled off
Workspaces are strictly separated — no company can see another's employees, visits, or stock.

Employees control their own data
Reps can request an export or deletion of their personal data from inside the app, reviewed by their admin.
```

### 5.8 FAQ section

**H2:**
```
Common questions
```

**Five items — render as `<details><summary>` for zero-JS accordions:**

```
Q: Do you track employees when they're off the clock?
A: No. GPS is only active between check-in and check-out, and it fully stops when a shift is paused. There is no background tracking outside a work session.

Q: What platforms do you support?
A: Android for field employees, and a web dashboard for admins and managers. iOS support is on the roadmap.

Q: How is my company's data kept separate from other companies using Saurik Track?
A: Every workspace is tenant-isolated at the database level. Queries and permissions enforce that no user can see records belonging to another company.

Q: What happens if a rep loses signal or their phone dies?
A: The app captures the checkout attempt and flags the record for admin review. Reps can submit a correction request with a reason, and the admin approves or rejects it — with an audit trail.

Q: How does pricing work after the trial?
A: The 30-day trial gives you full access with no credit card. After the trial, plans are billed per active user per month. Talk to us before the trial ends and we'll set up the plan that fits your team size.
```

### 5.9 Repeat CTA section

**H2:**
```
Set up your workspace in a few minutes
```

**Body:**
```
Invite your first field rep the same day. No credit card, no setup calls required.
```

**Button:**
```
Start free 30-day trial
```

### 5.10 Footer

- Left: `Saurik Track` wordmark
- Center: `Product | How it works | Industries | Privacy | FAQ`
- Right: `support@sauriktrack.com`
- Below, in muted text: `© 2026 Saurik IT Private Limited. All rights reserved.`

---

## 6. Visual system

Use these tokens exactly. Define them as CSS custom properties on `:root`.

```css
:root {
  /* Color */
  --paper:      #EEF0E7;   /* Page background */
  --paper-dim:  #E5E7DB;   /* Alt section background */
  --white:      #FDFDFB;   /* Card surfaces */
  --ink:        #1C2620;   /* Body text */
  --ink-soft:   #4B5750;   /* Secondary text */
  --navy:       #212F45;   /* Dark section (problem band) */
  --amber:      #C57A2E;   /* Primary CTA */
  --amber-dark: #A9631F;   /* CTA hover */
  --moss:       #3E7C4C;   /* "Healthy" status */
  --slate:      #8C9389;   /* Tertiary text */
  --line:       #CDD0C2;   /* Borders, dividers */

  /* Type scale */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, monospace;

  /* Layout */
  --max-w: 1120px;
  --gutter: 32px;
}
```

**Type scale (mobile-first, use `clamp()` for fluid):**
- H1: `clamp(2.2rem, 4vw, 3.1rem)` / weight 600 / line-height 1.12 / display font
- H2: `clamp(1.7rem, 2.8vw, 2.3rem)` / weight 600 / display font
- H3: `1.35rem` / weight 600 / display font
- Body: `1rem` / weight 400 / line-height 1.55 / body font
- Small: `0.87rem` / body font
- Mono labels: `0.8rem` / mono font

**Design constraints — do not violate:**
- Body text line-length ≤ 80 characters.
- Only one border-radius scale: `4px` for buttons and small chips, `6px` for cards. No pill-radius except industry chips (`999px`).
- One shadow style, used sparingly. Prefer 1px borders in `--line` over shadows.
- No gradient decorations. No blurred glowing halos. This is a utility product, not a game HUD.
- No emojis in the copy or UI.
- No all-caps except the STEP labels in section 5.5.
- No "one-word-in-color-inside-headline" trope. Headlines are set in a single color.

---

## 7. Component-by-component structure hints

### 7.1 Nav
- Sticky, `position: sticky; top: 0`. Background `--paper` at 92% opacity with `backdrop-filter: blur(6px)`.
- Height 72px. Border-bottom `1px solid --line`.
- On viewports under 760px, hide the middle links; keep the brand and the CTA visible.

### 7.2 Hero
- Two-column grid on desktop (`1.05fr 0.95fr`), single column below 860px.
- Left column: H1, subhead, CTA row (button + micro-text).
- Right column: the shift-manifest card (`--white` background, `--line` border, `6px` radius, 26px padding).
- Each checkpoint row separated by a dashed border-top. Dot column is 22px wide, body column takes the rest.

### 7.3 Problem band
- Full-width dark section, `--navy` background, `--paper` text.
- Two-column grid on desktop (`0.85fr 1.15fr`): H2 on the left, four-item list on the right.
- Each item: numbered eyebrow in mono (`--amber`), bold sub-heading in white, body in muted `#C4CAD6`.

### 7.4 Features
- Two cards side by side on desktop, stacked below 860px.
- Card: `--white` background, `--line` border, `6px` radius, 32px padding.
- Bullet list uses a small filled dot in `--amber`, not a checkmark.

### 7.5 How it works
- Four columns on desktop, single column below 860px.
- Separated by vertical `--line` dividers on desktop, horizontal on mobile.
- Step label in mono (`--amber-dark`), then H3, then one line of body.

### 7.6 Industries
- Horizontal row of pill chips. Wrap onto multiple lines on narrow viewports.
- Chip: `--white` background, `--line` border, `999px` radius, 8px 18px padding.

### 7.7 Privacy
- Three columns on desktop, stacked on mobile.
- Wrapped in a single card with `--line` border for containment.

### 7.8 FAQ
- Use `<details><summary>` for accordions. **Do not** add a JavaScript accordion library.
- One question per row, border-top divider between rows.
- Rotate a `+` / `–` indicator on open using pure CSS (`details[open] .toggle::before`).

### 7.9 Repeat CTA
- Full-width band in `--amber` with white text.
- Two-column layout: text left, button right. Stack on mobile.

### 7.10 Footer
- Single row, `--line` border-top, 44px vertical padding.
- Flex layout, wrap on mobile.

---

## 8. Behavior and interactivity

- **No page-load motion.** Do not add fade-in-on-scroll, staggered reveals, or "scroll-triggered" animations. They are the generic AI-generated tell.
- **Smooth scroll for in-page anchors.** `html { scroll-behavior: smooth; }`.
- **CTA hover:** background transitions from `--amber` to `--amber-dark` over 150ms. Do not scale, do not lift, do not glow.
- **FAQ accordions:** pure `<details>`, no JS.
- **Trial CTA target:** anchor to `#cta` for now; wire to the actual signup flow in a follow-up PR. Include a placeholder `TODO` comment in the HTML at that link.

---

## 9. Accessibility requirements

- Every interactive element reachable by keyboard, with a visible focus ring (`outline: 2px solid --amber; outline-offset: 3px`).
- All color pairs must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text). Verify amber-on-paper and paper-on-navy explicitly.
- `<html lang="en">`.
- Section landmarks: `<nav>`, `<main>`, `<footer>`, and `<section>` with `aria-labelledby` pointing to the section H2.
- Respect `prefers-reduced-motion`: disable all transitions when set.
- No `<img>` without `alt`. Decorative images get `alt=""`.
- The shift-manifest card must be readable when CSS fails to load — use semantic markup (definition list or ordered list), not a `<div>` grid alone.

---

## 10. What NOT to do

Hard constraints. Violating any of these fails the review.

1. **Do not fabricate metrics or logos.** No "10,000 teams," no "trusted by [logo]," no "99.9% uptime." The product does not have that evidence yet.
2. **Do not make compliance claims.** Do not use the phrases "GDPR-compliant," "SOC 2," "ISO 27001," "enterprise-grade security," "fraud-proof," "tamper-proof," or "100% accurate." The product roadmap does not support these claims yet.
3. **Do not use surveillance framing.** No "monitor your employees," "catch time theft," "prove they were slacking." The product is positioned as transparent workforce visibility, not surveillance.
4. **Do not add live-chat widgets, cookie banners with dark patterns, exit-intent popups, or newsletter modals.** None of them.
5. **Do not include stock photography of "smiling business people."** The hero visual is the shift manifest, rendered in HTML.
6. **Do not add a client-side analytics library in this PR.** Analytics can be added in a follow-up with proper consent handling.
7. **Do not add every keyword you can think of to the page for SEO.** The copy above is the copy. Do not stuff.

---

## 11. Acceptance criteria (the definition of done)

Run through this checklist before opening the PR. Every box must be ticked.

- [ ] `curl -s <deployed-url>` returns HTML containing the H1 text `Know where your field team is. Know what's left in the van.`
- [ ] `<title>` tag reads `Saurik Track — GPS attendance and van-stock tracking for field teams`.
- [ ] `<meta name="description">` matches the copy in section 3 verbatim.
- [ ] All Open Graph and Twitter Card tags in section 3 are present.
- [ ] JSON-LD `SoftwareApplication` block is present and validates on the [Schema.org validator](https://validator.schema.org/).
- [ ] `og-image.png` exists at 1200×630 and loads at the URL declared.
- [ ] All 10 sections in section 4 are present, in order, with the correct IDs.
- [ ] Every piece of copy in section 5 is present verbatim.
- [ ] Lighthouse mobile scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- [ ] Page passes axe-core with zero violations.
- [ ] Total transferred size ≤ 250 KB (excluding fonts). Verify in DevTools Network tab.
- [ ] Page renders correctly with JavaScript disabled.
- [ ] Page is usable at 320px viewport width without horizontal scroll.
- [ ] All hard constraints in section 10 are respected.

---

## 12. Expected output structure

If shipping as static HTML:

```
/
├── index.html
├── styles.css
├── og-image.png
├── favicon.ico
├── apple-touch-icon.png
├── robots.txt
└── sitemap.xml
```

If shipping as Astro:

```
/
├── src/
│   ├── pages/
│   │   └── index.astro
│   ├── components/
│   │   ├── SiteNav.astro
│   │   ├── Hero.astro
│   │   ├── ShiftManifest.astro
│   │   ├── ProblemBand.astro
│   │   ├── Features.astro
│   │   ├── HowItWorks.astro
│   │   ├── Industries.astro
│   │   ├── Privacy.astro
│   │   ├── Faq.astro
│   │   ├── CtaBand.astro
│   │   └── SiteFooter.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── og-image.png
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.xml
└── astro.config.mjs
```

---

## 13. PR / commit message template

```
feat(landing): rebuild /track as SSR-crawlable landing page

- Replace client-rendered shell with server-rendered HTML
- Add product-specific title, description, OG, Twitter, and JSON-LD metadata
- Ship hero, problem, features, how-it-works, industries, privacy, FAQ,
  CTA, footer sections per SAURIK-TRACK-LANDING-SPEC.md
- Zero-JS accordions via <details>; no client-side framework
- Lighthouse: Perf 9x / A11y 9x / SEO 100

Follow-ups (out of scope):
- Wire trial CTA to signup flow
- Move to sauriktrack.com or track.saurikit.com domain
- Add analytics with consent flow
```

---

*End of spec. If any requirement is ambiguous, ask before making an assumption. Do not silently deviate.*
