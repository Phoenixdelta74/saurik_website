# Saurik Track — Landing Page Rebuild Specification (v3)

**Status:** Approved for implementation after the pre-build checks in Section 2  
**Audience:** Claude Code, Codex, Cursor, Antigravity, or another coding agent  
**Primary route:** `https://www.wwwsaurikit.com/track/`  
**Parent company:** SAURIK IT Private Limited  
**Purpose:** Replace the existing `/track` page with a production-ready, conversion-focused, SEO-crawlable product landing page while preserving the existing company website and its routes.

When this document says **verbatim**, copy the content exactly. When it says **must**, **must not**, or **do not**, treat that as a release requirement.

---

## 1. Fixed product and deployment decisions

The following decisions are owner-confirmed and must not be changed by the implementation agent:

- Product name: **Saurik Track**
- Product stage: **Generally available**, not beta
- Product category: **Privacy-transparent field-work platform**
- Primary customers: Small and mid-sized field sales, distribution, service, installation, repair, inventory, warehouse, and van-stock teams
- Primary capabilities:
  - GPS attendance and field workforce visibility
  - Inventory and van-stock management
- Supporting capabilities:
  - Audit trail and correction workflow
  - Weekly reports and exports
- Primary offer: **Free 30-day trial; no credit card required**
- Route: **Keep the existing company route at `/track/`**
- Canonical production URL: **`https://www.wwwsaurikit.com/track/`**
- The page must remain part of the existing SAURIK IT website.
- Do not migrate the wider company website to a new framework or domain for this task.
- Product capabilities and platform claims in this specification have been confirmed by the owner.

### 1.1 Positioning statement

Saurik Track is a privacy-transparent field-work platform—not a surveillance product—for small and mid-sized teams that sell, distribute, install, repair, or service products in person. It helps managers understand active shifts, field visits, orders, and stock movement while giving employees clear tracking states and a correction workflow.

### 1.2 Geographic positioning

Keep the product copy geographically neutral so the same page can serve customers in Tripura, Northeast India, the rest of India, and international markets. Do not force regional keywords into the hero or feature copy. Regional positioning belongs on company service pages, case studies, local listings, and campaigns.

---

## 2. Pre-build checks

Complete these checks before editing code:

1. Inspect the existing repository structure, `package.json`, route handling, build scripts, shared header/footer, metadata system, and deployment configuration.
2. Confirm how the current production site serves `/track/` and trailing-slash URLs.
3. Locate the real trial signup destination.
4. Confirm that `support@sauriktrack.com` is the correct public support address. If the repository contains a different owner-approved address, stop and ask which one to publish.
5. Identify existing brand assets, favicon, logo, privacy policy, and terms pages before creating replacements.
6. Record the baseline production behaviour of `/track/`, including its status code, HTML response, metadata, and JavaScript-disabled rendering.
7. Preserve all unrelated company routes and working functionality.

### 2.1 Trial CTA release gate

The primary CTA must link to the real, working trial signup flow. Store or resolve it as `TRIAL_URL` according to the existing application conventions.

- Do not leave the CTA pointing to `#cta` only.
- Do not use `href="#"`.
- Do not ship a TODO or placeholder destination.
- Do not claim that a trial has started until the signup system confirms it.
- If no functioning signup destination exists, stop implementation and report this as a launch blocker.

### 2.2 Source-of-truth order

If instructions conflict, use this order:

1. Verified production product behaviour and repository code
2. Owner-confirmed decisions in Section 1
3. This specification
4. Agent assumptions

Do not silently rewrite marketing claims or architecture. Report a concrete conflict before deviating.

---

## 3. Technical architecture

### 3.1 Preserve the existing stack

Implement `/track/` within the existing company website. Do not rebuild the entire site in Astro, Next.js, or another framework.

The implementation may use the existing React components for maintainability, but the complete meaningful page content must be present in the initial HTML response through static generation, prerendering, server rendering, or a dedicated static route.

The requirement is **crawlable initial HTML**, not a framework preference.

### 3.2 Crawlability requirement

The deployed response for `/track/` must contain the complete page content without executing JavaScript.

Required production test:

```powershell
$response = Invoke-WebRequest -Uri "https://www.wwwsaurikit.com/track/" -UseBasicParsing
$response.StatusCode
$response.Content -match "Know where your field team is"
```

Expected result:

- Status code: `200`
- Content match: `True`

Also test:

```powershell
curl.exe -L "https://www.wwwsaurikit.com/track/"
```

The returned source must contain the H1, feature headings, privacy heading, FAQ questions, and CTA copy.

### 3.3 Route behaviour

- Canonical route: `/track/`
- `/track` may permanently redirect to `/track/`, or the inverse may be used if that is the existing site-wide convention.
- There must be only one canonical version.
- Preserve query parameters used for campaign attribution when redirecting.
- Do not create a separate product domain or subdomain in this task.
- Do not break `/`, `/software`, `/hardware`, `/about`, `/contact`, or `/privacy`.

### 3.4 JavaScript policy

- The page must work with JavaScript disabled.
- No JavaScript is required for navigation, accordions, reading content, or reaching the trial link.
- Use native `<details>` elements for FAQs.
- Minimal existing-site JavaScript is acceptable if it does not control content visibility or crawlability.
- No render-blocking application JavaScript.
- Do not add a new client-side framework.

### 3.5 Performance budget

- Lighthouse mobile Performance: target `>= 90`
- Largest Contentful Paint: target `<= 2.0 seconds` under the agreed Lighthouse mobile profile
- Cumulative Layout Shift: `<= 0.1`
- Interaction to Next Paint: `<= 200 ms` when measurable
- Total initial transferred page weight: `<= 300 KB`, including fonts
- No external font request unless already approved by the existing site's privacy and performance policy
- Prefer system fonts or locally hosted, subset WOFF2 files
- No render-blocking JavaScript
- Optimize all images and declare their dimensions

For release evidence, run three Lighthouse tests against the deployed preview with a cold cache and record the median score. Record the Lighthouse version and test URL.

---

## 4. Metadata and discovery

Insert the following product-specific metadata for `/track/`. Integrate it through the site's existing metadata system where possible.

```html
<title>Saurik Track | GPS attendance and van-stock for field teams</title>
<meta name="description" content="Privacy-transparent GPS attendance, field visits, reports, and van-stock management for sales, distribution, and service teams. Free 30-day trial.">
<link rel="canonical" href="https://www.wwwsaurikit.com/track/">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Saurik Track">
<meta property="og:title" content="Saurik Track | GPS attendance and van-stock for field teams">
<meta property="og:description" content="GPS attendance, field visits, reports, and van-stock management—with transparent tracking states and an audit trail.">
<meta property="og:url" content="https://www.wwwsaurikit.com/track/">
<meta property="og:image" content="https://www.wwwsaurikit.com/track/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Saurik Track — GPS attendance and van-stock for field teams">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Saurik Track | GPS attendance and van-stock for field teams">
<meta name="twitter:description" content="GPS attendance, field visits, reports, and van-stock management—with transparent tracking states and an audit trail.">
<meta name="twitter:image" content="https://www.wwwsaurikit.com/track/og-image.png">
<meta name="twitter:image:alt" content="Saurik Track — GPS attendance and van-stock for field teams">
```

### 4.1 Structured data

Add valid JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Saurik Track",
  "url": "https://www.wwwsaurikit.com/track/",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Android, iOS, Web",
  "description": "Privacy-transparent field-work platform for sales, distribution, service, installation, and repair teams. Includes GPS attendance, structured visit logging, van-stock inventory, reports, and audit-trailed corrections.",
  "publisher": {
    "@type": "Organization",
    "name": "SAURIK IT Private Limited",
    "url": "https://www.wwwsaurikit.com/"
  },
  "featureList": [
    "GPS attendance and field workforce visibility",
    "Structured field visits",
    "Inventory and van-stock management",
    "Audit trail and correction workflow",
    "Reports and CSV exports"
  ]
}
</script>
```

Do not add ratings, review counts, customer counts, awards, or paid pricing to structured data unless the same information is visible on the page and supported by evidence. The free-trial offer belongs in visible copy; do not describe the complete paid product as free through a zero-price structured-data offer.

### 4.2 Discovery assets

- Create or update `og-image.png` at the public `/track/og-image.png` path.
- Exact dimensions: `1200 × 630` PNG.
- Visual: dark navy background, Saurik Track product name, tagline `GPS attendance + van-stock, transparently`, and one restrained amber line.
- Reuse the site's existing favicon and Apple touch icon unless product-specific icons have been supplied.
- Keep `robots.txt` at the domain root and ensure it allows `/track/`.
- Update the existing root `sitemap.xml` to include `https://www.wwwsaurikit.com/track/`.
- Do not overwrite existing robots or sitemap entries for company pages.

---

## 5. Information architecture

Use these landmarks and section IDs in this order:

1. `<nav id="site-nav">`
2. `<main id="main-content">`
   1. `<section id="hero">`
   2. `<section id="problem">`
   3. `<section id="features">`
   4. `<section id="how-it-works">`
   5. `<section id="industries">`
   6. `<section id="privacy">`
   7. `<section id="faq">`
   8. `<section id="cta">`
3. `<footer id="site-footer">`

Do not reorder or merge the sections. Genuine product screenshots may be placed inside the hero or feature cards if owner-supplied. Do not fabricate application screenshots or add stock photography.

---

## 6. Approved page copy

Use the following copy verbatim unless a repository fact directly conflicts with it.

### 6.1 Navigation

- Brand: `Saurik Track`
- Optional relationship label: `by SAURIK IT`
- Links: `Product | How it works | Industries | Privacy | FAQ`
- Product links point to the section anchors on this page.
- The SAURIK IT relationship label or company logo links to `/`.
- CTA: `Start free trial`
- CTA destination: the verified `TRIAL_URL`

### 6.2 Hero

**H1:**

> Know where your field team is. Know what's left in the van.

**Subhead:**

> A privacy-transparent field-work platform for sales, distribution, and service teams. GPS attendance, structured visits, and live van-stock—with an audit trail your reps can see and corrections they can request.

**Primary CTA:**

> Start free 30-day trial

**CTA supporting text:**

> No credit card required

#### Hero visual

Create a semantic HTML/CSS shift manifest. Add the visible label `Illustrative shift example` so it cannot be mistaken for a live customer record.

- Header: `Rahul Sharma — North Zone`
- Date label: `Today`
- Checkpoint 1:
  - `Checked in`
  - `9:04 AM`
  - `Location captured · reported accuracy 8 m`
  - Green status marker
- Checkpoint 2:
  - `Visit logged — Apex Healthcare`
  - `10:22 AM`
  - `Order taken · ₹1,250.00`
  - `Van stock auto-adjusted`
  - Navy status marker
- Checkpoint 3:
  - `Session paused — Lunch break`
  - `1:00 PM`
  - `Tracking suspended until resume`
  - Amber status marker
- Checkpoint 4:
  - `Checked out`
  - `6:02 PM`
  - `7h 58m logged · 4 visits · 1 order`
  - Green status marker

Use an ordered list or definition list so the information remains understandable without CSS.

### 6.3 Problem section

**H2:**

> Field work should not depend on group chats and guesswork.

**Items:**

```text
01
Nobody knows who's active or stuck
Reps report in when it's convenient, not when a manager needs an update.

02
Attendance disputes have no shared evidence
“I was there” and “the sheet says otherwise” leave both sides without a fair way to settle the record.

03
Van stock and warehouse counts drift apart
Orders get booked in the field faster than paper records can be reconciled.

04
Weekly reports consume someone's evening
Attendance, visits, and orders should not require hours of manual spreadsheet work.

05
Opaque tracking damages trust
When employees cannot see when tracking starts, stops, or how records are corrected, adoption suffers.
```

### 6.4 Features

**H2:**

> Four things a field team actually needs

**Introduction:**

> Attendance shows who's working. Inventory shows what is moving. The audit trail helps settle what happened. Reports show where the week went. Saurik Track brings all four into one platform.

#### Feature 1 — GPS attendance and field visibility

**H3:**

> See the field, not just a spreadsheet of it

**Body:**

> Reps check in with a captured location and remain visible on a live map during an active shift. Tracking has clear start, pause, resume, and stop states, with nothing recorded outside the defined work session.

**Bullets:**

- Live map of on-duty representatives, including pause and travel status
- Structured visit outcomes: order taken, follow-up, or no sale
- Exceptions queue for missed checkouts and stale locations
- Native background location support on Android and iOS
- Android foreground service and platform-appropriate permission disclosures

#### Feature 2 — Inventory and van-stock tracking

**H3:**

> Stock that updates when an order closes

**Body:**

> Each van operates as a mobile extension of the warehouse. When a representative books an order, the stock ledger moves with it—without a second reconciliation entry.

**Bullets:**

- Industry templates for FMCG, pharma, electronics, and apparel
- Price and stock revision history with a reason attached to every change
- Warehouse-to-van transfer manifests tracked by vehicle
- Keyboard entry, spreadsheet paste, and barcode-scanner support
- Responsive handling of large product catalogues

#### Feature 3 — Audit trail and corrections

**H3:**

> Attendance your team can dispute—and settle

**Body:**

> Check-ins, visits, pauses, and checkouts create append-only business events. When a representative needs to correct a mistake, they provide a reason and an administrator records the decision while preserving the original event.

**Bullets:**

- Append-only audit history for attendance and visit actions
- Employee-submitted correction requests with required reasons
- Administrator approval or rejection with a decision note
- Approved corrections reflected in reports without overwriting source events

#### Feature 4 — Reports and exports

**H3:**

> The Monday report writes itself

**Body:**

> Attendance hours, visit outcomes, and order value are brought together automatically, ready to review on the web or export as CSV.

**Bullets:**

- Historical attendance reporting for a selected date range
- Filters for employee, outcome, and team
- CSV exports for payroll and accounting workflows
- Web Command Center for real-time team visibility

### 6.5 How it works

**H2:**

> How a shift moves through the system

```text
STEP 1 — Check in
A representative opens the app at their first stop and checks in. The location and its reported accuracy are recorded.

STEP 2 — Log the visit
The client, outcome, and order value are recorded. Stock adjusts automatically when an order closes.

STEP 3 — Pause when needed
A lunch or approved break pauses tracking, with the reason and tracking state clearly shown.

STEP 4 — Check out
The shift closes with a summary of hours worked, visits made, and orders booked.
```

### 6.6 Industries

**Lead-in:**

> Built for teams that sell, deliver, install, and service in person:

**Industry chips:**

- FMCG and beverages
- Pharma and healthcare
- Electronics and hardware
- Fashion and apparel
- Logistics and distribution
- Installation, field service, and repair

### 6.7 Privacy

**H2:**

> Transparent tracking, by design

#### Tracking has a visible start and end

> Location is recorded only during an active work session between check-in and check-out. Employees can see whether tracking is active, paused, or stopped. Before Android requests background-location permission, a plain-language disclosure explains what is collected and why.

#### Company workspaces are isolated

> Application access is scoped to each company workspace using authenticated roles, Firebase custom claims, and Firestore security rules. Privileged backend operations are separately restricted and audited.

#### Employees can request access, correction, or deletion

> Employees can submit requests concerning their personal data from inside the application. Requests follow an administrator-reviewed backend workflow so identity, company obligations, retention requirements, and audit history are handled safely.

Add text links beneath these columns:

- `Read our Privacy Policy` → the existing `/privacy` route
- `Contact support` → the verified support channel

Do not describe the product as certified unless a current certification exists and has been approved for publication.

### 6.8 FAQ

**H2:**

> Common questions

Use native `<details>` and `<summary>` elements.

**Q: Do you track employees when they're off the clock?**

> No. Location tracking operates only during an active work session. It stops after checkout and is suspended while the session is paused. The application shows employees when tracking is active, paused, or stopped.

**Q: What platforms do you support?**

> Field employees can use Android or iOS, with platform-appropriate background-location support. Administrators and managers use the Web Command Center. All three surfaces synchronize in real time when network connectivity is available.

**Q: How is my company's data separated from other companies?**

> Each user is authenticated into a company workspace. Application access is scoped using authenticated roles, Firebase custom claims, and Firestore security rules. Privileged backend operations are separately controlled and audited.

**Q: What happens if a representative loses signal or their phone dies?**

> The application flags incomplete or stale records for administrator review. The representative can submit a correction with a reason, and the administrator can approve or reject it. The decision is recorded without overwriting the original event.

**Q: How does pricing work after the trial?**

> The 30-day trial provides full access with no credit card required. After the trial, plans are billed per active user per month. Contact us before the trial ends and we'll help select the plan that fits your team size.

### 6.9 Final CTA

**H2:**

> Set up your workspace in a few minutes

**Body:**

> Invite your first field representative the same day. No credit card or setup call is required.

**Button:**

> Start free 30-day trial

The button must link directly to the verified `TRIAL_URL`.

### 6.10 Footer

- Product wordmark: `Saurik Track`
- Relationship text: `A product of SAURIK IT Private Limited`
- Product links: `Product | How it works | Industries | Privacy | FAQ`
- Company link: `Visit SAURIK IT`
- Company link destination: `/`
- Privacy link: `/privacy`
- Terms link: use the existing terms route; if none exists, report it as a launch follow-up and do not invent a URL
- Support: `support@sauriktrack.com`, subject to the pre-build verification in Section 2
- Copyright: `© 2026 SAURIK IT Private Limited. All rights reserved.`

---

## 7. Visual system

Define the following tokens on the product-page scope or `:root`, following the repository's existing theming conventions. Do not unintentionally change other routes.

```css
:root {
  --paper:           #EEF0E7;
  --paper-dim:       #E5E7DB;
  --white:           #FDFDFB;
  --ink:             #1C2620;
  --ink-soft:        #4B5750;
  --navy:            #212F45;
  --amber:           #C57A2E; /* decorative accent and large graphics only */
  --amber-strong:    #8E4D14; /* buttons and text on light surfaces */
  --amber-hover:     #733C0E;
  --amber-on-dark:   #E4AE70; /* small accent text on navy */
  --moss:            #3E7C4C;
  --slate:           #687169;
  --line:            #C5C9BA;

  --font-display: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, "Cascadia Mono", "SFMono-Regular", monospace;

  --max-w: 1120px;
  --gutter: clamp(18px, 4vw, 32px);
}
```

Verified reference contrast ratios:

- `--white` on `--amber-strong`: approximately `6.40:1`
- `--white` on `--amber-hover`: approximately `8.66:1`
- `--amber-on-dark` on `--navy`: approximately `6.80:1`
- `--ink` on `--paper`: approximately `13.55:1`
- `--paper` on `--navy`: approximately `11.72:1`

The implementation must still run an automated and manual contrast test; these values do not replace rendered-page verification.

### 7.1 Typography

- H1: `clamp(2.2rem, 4vw, 3.1rem)`, weight 650, line-height 1.12
- H2: `clamp(1.7rem, 2.8vw, 2.3rem)`, weight 650
- H3: `1.35rem`, weight 650
- Body: `1rem`, weight 400, line-height 1.6
- Small: `0.875rem`, line-height 1.5
- Mono label: `0.8rem`, line-height 1.4
- Body copy measure: maximum `70ch`; never exceed `80ch`

### 7.2 Design constraints

- Use `4px` radius for buttons and small controls.
- Use `6px` radius for cards.
- Use `999px` only for industry chips.
- Prefer one-pixel borders over shadows.
- If a shadow is used, define one restrained shadow token and use it sparingly.
- No gradients, glowing halos, decorative blobs, or glassmorphism.
- No emojis.
- No stock photography.
- No isolated colored word inside a headline.
- No page-load animation, scroll reveal, parallax, or staggered entrance.
- Do not use uppercase prose. Uppercase is allowed only for short `STEP` labels.

---

## 8. Layout and component behaviour

### 8.1 Navigation

- Sticky at the top with a visible bottom border.
- Height approximately `72px` on desktop.
- Use a surface that retains readable contrast over all sections.
- Below `760px`, hide the middle section links but keep the brand, company relationship, and CTA visible.
- Include a skip link as the first keyboard-focusable element.
- Account for the sticky header when navigating to section anchors with `scroll-margin-top`.

### 8.2 Hero

- Desktop: `1.05fr 0.95fr` two-column grid.
- Below `860px`: single column.
- Keep the CTA and supporting text together.
- Render the shift manifest as semantic HTML/CSS, not a flattened image.
- If genuine screenshots are supplied, they may appear beneath or inside the visual without replacing the crawlable text.

### 8.3 Problem band

- Navy background with paper text.
- Desktop: heading on the left and five-item list on the right.
- Use `--amber-on-dark` for small numbered labels.
- Stack cleanly on mobile.

### 8.4 Features

- Desktop at `>= 860px`: two-by-two grid.
- Mobile: single column.
- Order: Attendance, Inventory, Audit trail, Reports.
- Use borders and spacing rather than large shadows.
- Use a small amber decorative dot for bullets, with no semantic dependence on colour.

### 8.5 How it works

- Four columns on desktop and one column on mobile.
- Vertical dividers on desktop and horizontal dividers on mobile.
- Use `--amber-strong` on light surfaces for step labels.

### 8.6 Industries

- Wrap chips naturally.
- Ensure long translated or enlarged text does not overflow.

### 8.7 Privacy

- One contained card with three columns on desktop.
- Stack on mobile.
- Keep technical implementation details understandable to a non-technical manager or employee.

### 8.8 FAQ

- Use `<details>` and `<summary>`.
- Do not add an accordion library.
- Make the full summary row clickable.
- Use a decorative `+`/`−` indicator hidden from assistive technology.
- Retain the browser's native semantics and keyboard operation.

### 8.9 Final CTA

- Use `--amber-strong` as the band background and `--white` text.
- Desktop: copy on the left and button on the right.
- The button may use a white surface with dark text to remain distinct from the band.
- Stack on mobile.

### 8.10 Footer

- Retain a clear relationship between Saurik Track and SAURIK IT.
- Wrap links without collision on mobile.
- Do not hide legal, privacy, or support links behind menus.

---

## 9. Accessibility requirements

- Use `<html lang="en">`.
- Include a skip link to `#main-content`.
- Use one H1 and a logical H2/H3 hierarchy.
- Give each section an `aria-labelledby` reference to its heading.
- All interactive elements must be reachable and operable by keyboard.
- Use a visible focus indicator with at least 3:1 contrast against adjacent colours.
- Meet WCAG 2.2 AA contrast requirements.
- Do not use colour as the only status indicator.
- Respect `prefers-reduced-motion`; disable smooth scrolling and transitions when requested.
- Maintain usable text and controls at 200% zoom.
- Ensure no horizontal scrolling at a 320 CSS-pixel viewport.
- Provide accessible names for every link and control.
- Decorative images use empty alt text; informative images use concise, meaningful alt text.
- The shift manifest must remain readable without CSS.
- Touch targets should be at least 44 × 44 CSS pixels where practical.
- Do not add ARIA where native HTML already provides the correct semantics.

---

## 10. Security, privacy, and trust requirements

- Do not add client-side analytics, session replay, chat widgets, fingerprinting, or advertising pixels in this release.
- If analytics is added later, define consent, retention, event names, and data ownership first.
- Do not expose credentials, Firebase administrative keys, internal identifiers, or environment secrets in client code.
- Do not use `VITE_` or another public client prefix for server-side secrets.
- Do not collect location data from the marketing page.
- Apply existing site security headers. If absent, recommend a separate reviewed change for Content Security Policy, Referrer Policy, MIME sniffing protection, and permissions restrictions.
- External links must use safe `rel` values when opening a new browsing context.
- The privacy and support links must resolve successfully before release.

---

## 11. Prohibited content and patterns

Violating any item below fails review:

1. Do not fabricate customer counts, testimonials, ratings, logos, awards, uptime, savings, or performance results.
2. Do not claim GDPR certification, SOC 2, ISO 27001, or another certification unless the owner supplies current evidence and explicitly approves the wording.
3. Do not use `tamper-proof`, `fraud-proof`, `proof-grade`, `foolproof`, `guaranteed accurate`, or `100% accurate`.
4. Do not use surveillance or employee-punishment framing such as `catch time theft`, `prove they were slacking`, or `monitor employees without them knowing`.
5. Do not call competing products spyware or claim that every alternative is intrusive.
6. Do not add stock photography, fake application screenshots, or fake customer records.
7. Do not add cookie dark patterns, exit-intent popups, newsletter modals, autoplay media, or deceptive urgency.
8. Do not keyword-stuff Tripura, Northeast India, global software, or unrelated SAURIK IT services into the product page.
9. Do not replace the existing company route, header, footer, privacy page, or working metadata system without first demonstrating why integration is impossible.
10. Do not ship a trial CTA that does not reach a functioning trial flow.

---

## 12. Conversion and measurement readiness

The page's main conversion is a completed trial signup.

Add these attributes to the primary and final CTA links without installing analytics:

```html
data-conversion="trial-start"
data-placement="hero"
```

and:

```html
data-conversion="trial-start"
data-placement="final-cta"
```

These attributes prepare the page for a later consent-aware analytics implementation.

When analytics is approved in a separate task, measure:

- Landing-page visits
- Hero CTA selections
- Final CTA selections
- Trial form starts
- Successful trial workspace creation
- Signup errors
- Source and campaign parameters

Do not report CTA clicks as acquired customers. The primary business conversion is successful workspace creation; activation should later be measured as inviting the first employee or completing the first shift setup.

---

## 13. Acceptance criteria

### 13.1 Routing and crawlability

- [ ] `https://www.wwwsaurikit.com/track/` returns `200` or follows one permanent canonical redirect and then returns `200`.
- [ ] The initial HTML contains the H1 and complete meaningful copy without JavaScript.
- [ ] The page remains readable and the CTA remains reachable with JavaScript disabled.
- [ ] Existing company routes still work.
- [ ] There is exactly one canonical URL for the product page.

### 13.2 Metadata and assets

- [ ] Title and description match Section 4.
- [ ] Canonical points to `https://www.wwwsaurikit.com/track/`.
- [ ] Open Graph and Twitter metadata are present.
- [ ] `og-image.png` loads from the declared URL and is exactly 1200 × 630.
- [ ] JSON-LD parses and validates without errors.
- [ ] Root `robots.txt` allows crawling of `/track/`.
- [ ] Root sitemap includes the canonical product URL without removing other routes.

### 13.3 Content and conversion

- [ ] All sections appear in the required order.
- [ ] Approved copy is present.
- [ ] Product is positioned as transparent field-work infrastructure, not surveillance.
- [ ] Both CTA buttons link to the real trial flow.
- [ ] Trial signup completes successfully in a production-like environment.
- [ ] Failed signup produces an accurate, actionable message and does not claim success.
- [ ] Privacy, company, and support links resolve.

### 13.4 Responsive and accessibility

- [ ] No horizontal overflow at widths 320, 375, 768, 1024, and 1440 CSS pixels.
- [ ] Features are two-by-two at desktop width and single-column on mobile.
- [ ] Keyboard-only navigation works from the skip link through the footer.
- [ ] Focus remains visible on every interactive element.
- [ ] All rendered colour pairs pass WCAG 2.2 AA.
- [ ] Automated accessibility testing reports no serious or critical violations.
- [ ] Native FAQ accordions work with keyboard and screen reader semantics.
- [ ] The page remains usable at 200% zoom and with reduced motion enabled.

### 13.5 Performance and quality

- [ ] Median Lighthouse mobile Performance score across three cold runs is at least 90.
- [ ] Lighthouse Accessibility and Best Practices scores are at least 95.
- [ ] Lighthouse SEO score is at least 95, with no unresolved crawlability or metadata issue.
- [ ] Total initial transfer is at most 300 KB including fonts.
- [ ] No console errors occur during normal page use.
- [ ] No failed first-party asset requests occur.
- [ ] Internal links and the trial destination pass link checking.
- [ ] Production build completes successfully.

### 13.6 Evidence package

Attach or record:

- Build command and result
- Test command and result
- Deployed preview URL
- Initial HTML crawlability result
- Three Lighthouse run summaries and their median
- Accessibility scan result
- Desktop and mobile screenshots
- JavaScript-disabled screenshot
- Trial signup success evidence without exposing personal data or credentials
- List of files changed
- Known follow-ups that are genuinely out of scope

---

## 14. Expected repository integration

Adapt filenames to the existing repository rather than forcing a new architecture. A likely integration may resemble:

```text
src/
├── pages/
│   └── SaurikTrack.jsx
├── components/
│   └── track/
│       ├── TrackHero.jsx
│       ├── ShiftManifest.jsx
│       ├── TrackFeatures.jsx
│       ├── TrackPrivacy.jsx
│       ├── TrackFaq.jsx
│       └── TrackCta.jsx
└── styles/
    └── saurik-track.css

public/
└── track/
    └── og-image.png
```

The production build must additionally generate or serve crawlable HTML for `/track/`, such as:

```text
dist/
└── track/
    └── index.html
```

Do not assume these exact source filenames if the repository uses a different convention. Reuse existing page, metadata, layout, button, and accessibility components where doing so preserves the requirements.

---

## 15. Implementation sequence

Execute and verify in this order:

1. Inspect repository and record baseline.
2. Resolve the verified trial URL and support contact.
3. Implement route-level crawlable rendering.
4. Add product-specific metadata and JSON-LD.
5. Build the page structure and approved copy.
6. Apply the scoped visual system and responsive layout.
7. Add and optimize the OG image.
8. Update robots and sitemap without deleting existing entries.
9. Run build and automated tests.
10. Test keyboard, screen sizes, zoom, reduced motion, and JavaScript-disabled rendering.
11. Test the real trial signup flow.
12. Run deployed-preview Lighthouse and accessibility tests.
13. Fix failures and repeat affected tests.
14. Provide the evidence package and exact follow-ups.

Do not declare completion when only the source code is finished. Completion requires deployed-route evidence and a functioning trial conversion path.

---

## 16. Commit message template

```text
feat(track): rebuild product landing page at existing company route

- keep Saurik Track at /track on the SAURIK IT website
- serve crawlable product HTML without requiring JavaScript
- add product metadata, social cards, and SoftwareApplication JSON-LD
- present attendance, inventory, audit, reporting, and privacy workflows
- connect both trial CTAs to the verified signup flow
- add responsive, accessible layouts and zero-JS FAQ accordions
- update the existing sitemap and preserve company routes

Verification:
- production build: <result>
- crawlability: <result>
- accessibility: <result>
- Lighthouse median: <result>
- trial signup: <result>
```

---

## 17. Definition of done

This work is done only when:

1. The existing company website serves the product at `/track/`.
2. Crawlers receive complete product HTML.
3. The canonical, metadata, sitemap, and social assets use the same production URL.
4. The product copy accurately presents the verified capabilities.
5. The colour system and rendered interface meet accessibility requirements.
6. Both CTAs start the real trial process.
7. The trial can be completed successfully.
8. Existing company routes and workflows remain functional.
9. The acceptance evidence has been recorded.

*End of specification.*
