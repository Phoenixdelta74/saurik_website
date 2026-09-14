# Arthos Invoice Studio — Landing Page Specification (v2)

## Purpose

Build a production-quality product landing page for **Arthos Invoice Studio** and
integrate it into the existing Saurik IT website.

This document is the implementation source of truth for the landing page. Before
editing, inspect the target repository, its contributor instructions, framework,
routes, shared components, design tokens, metadata system, build commands, and
existing tests. Preserve the existing website architecture unless a change is
needed to satisfy this specification.

Do not treat every product capability below as proof that it is already live. The
page represents the planned customer offering. Use the launch-state rules in this
document so that the public page never presents an unfinished purchase, trial, or
download journey as available.

---

## 1. Product definition

**Product name:** Arthos Invoice Studio  
**Short name:** Arthos  
**Company:** Saurik IT Private Limited  
**Market:** Small Indian service and trading businesses  
**Primary value:** GST-aware invoicing, payment collection, controlled pricing,
and practical business visibility  
**Commercial model:** 60-day free trial, followed by paid access  
**Currency:** Indian rupees, formatted with Indian digit grouping

Arthos has two editions:

### Arthos Desktop

- Delivered as a standalone Windows EXE application.
- Designed to work without an internet or cloud connection.
- Business records and backups remain under the customer's local control.
- Used on the Windows computer where the application is installed.
- Requires an offline-compatible licensing and trial mechanism before public
  self-service launch.

### Arthos Cloud

- Delivered as a cloud-native web application.
- Business records and backups are stored in the cloud.
- Users can access the application from supported devices and locations through
  an internet connection.
- Requires production-ready authentication, authorization, tenant isolation,
  billing, backup, recovery, security, and privacy controls before public launch.

Do not describe Arthos as universally local-first or universally cloud-based.
Every data-storage, backup, connectivity, and access statement must identify the
edition to which it applies.

---

## 2. Confirmed commercial rule

The free trial lasts **60 days**.

After the trial ends, the customer must purchase a paid licence or subscription
to continue using Arthos. Do not claim any of the following until the owner has
confirmed and the product supports them:

- No credit card required
- Automatic billing or renewal
- Monthly or annual billing
- Cancellation from account settings
- Continued read-only access after expiry
- A grace period after expiry
- A particular refund policy
- A specific price

The handling of customer records after trial expiry must be confirmed before the
trial is publicly launched. The page must link to the applicable terms and privacy
notice when those documents exist.

---

## 3. Launch-state rules

Implement one of these states through a single configuration value or equivalent
central mechanism. Do not scatter launch-state decisions through multiple page
components.

### State A — Pre-launch (default until verified)

- Primary CTA: **Request early access**
- Secondary CTA: **View editions**
- Show: **60-day free trial planned for launch**
- Do not link to an installer, signup flow, checkout, or trial activation.
- The early-access CTA must lead to a working form or contact route.

### State B — Trial available

Use this only after the complete journey has been tested.

- Primary CTA: **Start your 60-day free trial**
- Desktop CTA leads to the verified Windows download and activation journey.
- Cloud CTA leads to the verified signup and onboarding journey.
- Pricing, payment timing, expiry behaviour, support contact, terms, and privacy
  links must be final.

Do not ship a CTA that links back to the same section or points to a placeholder.

---

## 4. Messaging hierarchy

Present the product in this order:

1. Create GST-aware business documents efficiently.
2. Track payments, partial payments, and overdue balances.
3. Understand sales, receivables, and estimated profitability from recorded data.
4. Preserve product identities, historical prices, and invoice-time snapshots.
5. Choose Desktop for offline local operation or Cloud for remote access and
   cloud storage.

Avoid claiming that Arthos provides complete statutory accounts, guaranteed
profit figures, GST filing, or a full ERP system.

---

## 5. Required page structure

Use semantic HTML and keep these sections in this order:

1. `nav#site-nav`
2. `main`
   1. `section#hero`
   2. `section#editions`
   3. `section#problems`
   4. `section#features`
   5. `section#workflow`
   6. `section#data-and-backups`
   7. `section#trial-and-pricing`
   8. `section#faq`
   9. `section#final-cta`
3. `footer#site-footer`

Each section must have a heading and an `aria-labelledby` reference. Navigation
anchors must use the matching section IDs.

---

## 6. Page copy

Minor edits for grammar or layout are allowed. Do not change the factual meaning,
trial duration, edition boundaries, or capability limitations.

### Navigation

- Brand: **Arthos**
- Links: **Editions**, **Features**, **How it works**, **Trial**, **FAQ**
- CTA: determined by the launch state

### Hero

**Eyebrow**

> Arthos Invoice Studio

**H1**

> GST-aware invoicing. Clear collections. A better view of your business.

**Body**

> Create invoices, track payments, preserve pricing history, and understand
> business performance with Arthos Invoice Studio—built for small Indian service
> and trading businesses.

**Edition line**

> Choose Arthos Desktop for offline operation on your Windows computer, or Arthos
> Cloud for access from supported devices wherever you work.

**Trial line**

> Try Arthos free for 60 days. Paid access is required after the trial.

Use the launch-state CTA labels defined earlier.

### Hero visual

Create an HTML/CSS Business Health preview rather than using a screenshot. Label
it visibly as **Illustrative preview · Sample figures**.

Suggested content:

- Period: This month
- Sales: ₹8,42,500
- Receivables: ₹1,17,200
- Estimated gross profit: ₹2,63,880
- Overdue: ₹42,000
- Supporting labels: Sales trend, Category mix, Product margins, Overdue queue

The preview must not say or imply that these are customer results. It must remain
understandable when CSS is disabled. Give the container an accessible label such
as `Business Health illustrative preview with sample figures`.

### Editions

**H2**

> Choose how you want to run Arthos

**Intro**

> The core business workflow stays familiar. The difference is where Arthos runs,
> where records are stored, and how you access them.

Present two equal cards or a comparison table.

#### Arthos Desktop

- Standalone Windows application
- Works without an internet connection
- Records stored on the local computer
- Local backup and restore
- Best for a controlled, single-computer workspace

#### Arthos Cloud

- Cloud-native web application
- Access through an internet connection
- Records and backups stored in the cloud
- Access from supported devices and locations
- Best for businesses that need remote access

Do not claim automatic synchronization between Desktop and Cloud. Do not imply
that a Desktop licence includes Cloud or vice versa unless that is later confirmed.

### Problems

**H2**

> Bring the work around every invoice into one clear process

Cover these five problems without fabricated statistics:

1. Repeated entry makes billing slower and less consistent.
2. Partial payments and overdue follow-ups are difficult to track.
3. Price changes lose the history needed to explain older invoices.
4. Business reporting is repeatedly rebuilt in spreadsheets.
5. Businesses have different preferences for offline control and remote access.

### Features

**H2**

> From billing to business visibility

Use five feature cards:

#### GST-aware documents

Tax invoices, retail invoices, quotations, proformas, and delivery challans with
customer details, line items, discounts, shipping, due dates, and GST calculations.

#### Fast item entry

A spreadsheet-style item grid with keyboard navigation, paste, insert, duplicate,
delete, undo, redo, and live calculations.

#### Collections and receivables

Track paid and pending amounts, partial payments, due dates, overdue balances,
bank CSV reconciliation, and follow-up drafts.

#### Pricing history and control

Maintain stable product identities, effective-dated price history, audit events,
and invoice-time snapshots so historical documents retain their context.

#### Business Health

Review filtered sales, receivables, category contribution, product margins, and
estimated profit based on the invoices, costs, payments, and expenses recorded in
Arthos. Provide drill-through and supported CSV, Excel, PDF, or Tally-oriented
exports only where the implementation has been verified.

Avoid the phrases “live P&L” and “complete P&L” unless accounting scope and
calculation behaviour have been independently verified.

### Workflow

**H2**

> How work moves through Arthos

1. **Prepare the document.** Select the customer, add items, apply GST and other
   charges, and review the totals.
2. **Deliver it.** Print it, create a PDF, include a UPI QR, or use a supported
   email workflow.
3. **Track collection.** Record payments, follow partial balances, and review
   overdue invoices.
4. **Understand the business.** Review sales, receivables, margins, categories,
   and estimated profitability from the data entered.
5. **Export and protect records.** Prepare supported accountant exports and use
   the backup method provided by the selected edition.

### Data and backups

**H2**

> Your edition determines where your records live

Desktop and Cloud must be explained separately.

**Desktop:** Records are stored on the customer's computer. The customer is
responsible for creating backups and storing copies safely. Do not promise that a
backup restores activity created after that backup was made.

**Cloud:** Records and backups are stored in the cloud and are available through
the customer's authenticated account. Do not promise a particular backup
frequency, retention period, geographic location, encryption control, recovery
time, or uptime until it is implemented and documented.

Add this disclosure near optional email delivery:

> Arthos stores records according to the edition you choose. When you export a
> file or send a document by email, the information you select is shared through
> that service.

### Trial and pricing

**H2**

> Try Arthos free for 60 days

**Body**

> Explore the invoicing, collections, pricing, and Business Health workflow during
> your 60-day trial. Paid access is required to continue using Arthos after the
> trial ends.

Show separate Desktop and Cloud pricing only after the owner confirms each price,
tax treatment, billing period, and licence scope. Until then, omit price amounts
and use the pre-launch CTA.

### FAQ

Use native `<details>` and `<summary>` elements. Include these questions:

1. What is the difference between Arthos Desktop and Arthos Cloud?
2. Does Arthos Desktop require an internet connection?
3. Can I access Arthos Cloud from another location or device?
4. Where are my records and backups stored?
5. What happens when the 60-day trial ends?
6. Does Arthos file GST returns?
7. Can Desktop data be moved to Cloud?

For question 7, state that migration availability will be confirmed before launch;
do not promise automatic migration or synchronization.

For GST filing, use this answer:

> Arthos supports GST-aware documents and selected accounting exports. It does
> not directly file GSTR-1, GSTR-3B, or other GST returns unless that capability
> is explicitly introduced and verified in the product.

### Final CTA

**H2**

> See how Arthos can fit the way your business works

**Body**

> Choose offline control with Arthos Desktop or remote access with Arthos Cloud.
> A 60-day free trial will be available for both editions.

Use the launch-state CTA. In the trial-available state, change the final sentence
to: **Start with a 60-day free trial.**

### Footer

- Arthos Invoice Studio
- A Saurik IT product
- Editions, Features, How it works, Trial, FAQ
- Verified support or sales contact
- Privacy and terms links when available
- `© 2026 Saurik IT Private Limited. All rights reserved.` only after the legal
  company name is confirmed

---

## 7. Visual direction

Follow the existing Saurik IT design system if one exists. The Arthos page should
feel related to the parent brand while remaining recognizably product-specific.

Suggested tokens when no established equivalents exist:

```css
:root {
  --paper: #eef0e7;
  --paper-dim: #e5e7db;
  --white: #fdfdfb;
  --ink: #1c2620;
  --ink-soft: #4b5750;
  --navy: #212f45;
  --slate: #8c9389;
  --line: #cdd0c2;
  --accent: #3b4a99;
  --accent-dark: #2e3a7a;
  --positive: #3e7c4c;
  --warning: #b8730f;
  --max-width: 1120px;
}
```

Constraints:

- Use borders and spacing rather than decorative shadows.
- Do not use gradients, glowing effects, stock business photography, or fake app
  screenshots.
- Use ₹ and Indian number grouping.
- Keep body copy readable and generally below 80 characters per line.
- Use responsive layouts with no horizontal scrolling at 320 CSS pixels.
- On mobile, stack edition and feature cards in a logical reading order.
- Use motion sparingly and respect `prefers-reduced-motion`.

---

## 8. SEO and sharing

The complete page content must be present in the server response or static build
output. Do not rely on client-side rendering for primary copy.

Use product-specific metadata. Replace `<PRODUCTION_URL>` only after the final URL
is known; canonical, Open Graph URL, sitemap entry, and image URLs must agree.

```html
<title>Arthos Invoice Studio — Invoicing, collections, and business insights</title>
<meta name="description" content="Arthos helps small Indian businesses create GST-aware invoices, track collections, preserve pricing history, and understand business performance. Choose Desktop or Cloud.">
<link rel="canonical" href="<PRODUCTION_URL>">
```

Also include:

- Open Graph title, description, URL, and a 1200×630 Arthos image
- Twitter/X summary-large-image metadata
- `SoftwareApplication` structured data with truthful offer information
- An `en-IN` document language
- An indexable robots directive
- A sitemap entry for the final canonical URL
- Arthos-specific favicon and touch icon where appropriate

Do not publish `<PRODUCTION_URL>`, an unknown price, or another literal placeholder
in production output.

---

## 9. Accessibility and performance

- Meet WCAG 2.2 AA for applicable page content and interactions.
- Provide visible keyboard focus styles.
- Use one H1 and a logical heading hierarchy.
- Use semantic links and buttons according to their actual behaviour.
- Ensure colour is not the only way information is communicated.
- Keep the illustrative dashboard clearly labelled in visible text and accessible
  naming.
- Use native disclosure controls for FAQ items.
- Test at 320, 375, 768, 1024, and 1440 CSS-pixel viewport widths.
- Target Lighthouse scores of at least 90 Performance, 95 Accessibility,
  95 Best Practices, and 100 SEO on the tested production-like build.
- Keep non-font page transfer weight below 300 KB where the existing site permits.
- Do not add a client-side analytics library as part of this page unless the site
  already has an approved consent-aware implementation.

---

## 10. Claim and safety constraints

Do not add:

- Fabricated customers, metrics, testimonials, ratings, logos, or endorsements
- “Fastest,” “best,” “guaranteed,” or similar unsupported superlatives
- Claims of GST filing, CA approval, statutory compliance, or certification
- Claims of complete accounting, audited books, or guaranteed profit accuracy
- Claims of Desktop cloud sync, remote access, or automatic cloud backup
- Claims about Cloud security, uptime, backup retention, encryption, or data
  location that have not been verified
- “No lock-in” unless a documented migration path to another product exists
- A price, refund rule, or cancellation rule that the owner has not approved
- A working-trial claim before the trial journey works end to end

Use “estimated profit” or “profitability indicators” for derived figures unless
the underlying accounting scope has been verified.

---

## 11. Implementation sequence

1. Inspect the existing repository and document the current framework, route
   strategy, shared layout, metadata mechanism, and validation commands.
2. Identify the production route and initial launch state.
3. Implement the semantic page structure and responsive styling.
4. Add the illustrative Business Health preview.
5. Add final metadata only after confirming the canonical URL.
6. Wire the CTA to a working destination appropriate to the launch state.
7. Validate copy against the edition boundaries and claim constraints.
8. Run the existing project checks, build, and page-specific tests.
9. Test the generated HTML, keyboard flow, responsive behaviour, and JavaScript-
   disabled rendering.
10. Report unresolved launch dependencies without inventing values.

---

## 12. Owner decisions required before public trial launch

- Final production URL
- Desktop price, payment structure, and licence duration
- Cloud price, billing period, renewal, and cancellation behaviour
- Whether payment details are required to start the trial
- Desktop trial enforcement and paid activation mechanism
- Cloud authentication, billing, tenant isolation, backup, and recovery readiness
- Exact access and export behaviour after trial expiry for each edition
- Support and sales email address
- Privacy policy, terms, refund policy, and data-processing disclosures
- Whether Desktop-to-Cloud migration will exist
- Whether all shared capabilities are present in both editions

These decisions do not prevent building and publishing a truthful pre-launch page.
They do prevent switching the page to the trial-available state.

---

## 13. Acceptance criteria

- [ ] The page contains all required sections in the specified order.
- [ ] Desktop and Cloud are clearly distinguished.
- [ ] Every reference to the free trial says 60 days.
- [ ] The CTA matches the configured launch state and reaches a working route.
- [ ] No unconfirmed price or commercial promise appears.
- [ ] Desktop is described as a standalone Windows application without an
      internet or cloud requirement.
- [ ] Cloud is described as an internet-based application with cloud-stored
      records and backups.
- [ ] The page does not imply automatic synchronization or migration between
      editions.
- [ ] Business Health uses qualified profitability language.
- [ ] The sample dashboard is visibly labelled as illustrative.
- [ ] GST-aware invoicing is not presented as direct GST filing.
- [ ] Primary content appears in the initial HTML response.
- [ ] Metadata and sitemap use the actual canonical URL.
- [ ] The page works with JavaScript disabled except for functionality that is
      explicitly progressive enhancement.
- [ ] The page is keyboard usable and has no horizontal scroll at 320 CSS pixels.
- [ ] Existing repository checks and the production build pass.
- [ ] Lighthouse and automated accessibility results are recorded.
- [ ] Unresolved owner decisions are listed in the implementation handoff or PR.

---

## 14. Suggested change summary

```text
feat(arthos): add two-edition Arthos product landing page

- Present Arthos Desktop and Arthos Cloud with clear storage and access boundaries
- Lead with GST-aware invoicing, collections, pricing history, and Business Health
- Add a centrally controlled pre-launch/trial-available CTA state
- Set the confirmed free-trial duration to 60 days
- Add product-specific metadata and an illustrative HTML dashboard
- Preserve truthful claims around GST filing, profitability, backups, and access
- Add responsive, accessible, crawlable page output
```

