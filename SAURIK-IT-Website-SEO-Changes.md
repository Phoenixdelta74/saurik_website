# SAURIK IT — Website Changes Required

Reviewed: 26 September 2026
Website: https://www.saurikit.in/
Scope: Website content, design, routing and technical implementation only.

This checklist records live observations and proposed changes. It excludes Google Business Profile setup, backlink campaigns, search-account administration and advertising. No website changes have been deployed by this review.

## 1. Repair direct page access — P0

Observed: Direct visits to /software, /hardware, /about, /privacy and /contact?topic=saurik_track displayed Vercel's 404 NOT_FOUND page. Software and Contact rendered when reached through internal navigation; refreshing Contact reproduced the 404. Home, /track and /arthos loaded directly.

- [ ] Fix hosting route handling for every existing public page, including /contact and its topic query parameters.
- [ ] Preserve the separate Track and Arthos landing pages when configuring routing.
- [ ] Prefer static generation or prerendering for public marketing pages so each URL serves its own content and metadata in the initial HTML. Google can render JavaScript, but this reduces dependence on rendering.
- [ ] Make valid public routes return HTTP 200 when opened directly, refreshed or opened in a new tab.
- [ ] Keep genuinely nonexistent routes as real HTTP 404 responses with a helpful branded error page. Do not turn every unknown route into a 200 homepage.
- [ ] Test contact destinations from both product pages and all service links after deployment.

Acceptance: Every intended page loads directly and after refresh; its source contains appropriate page content, title and canonical. Unknown URLs return 404. Test desktop and mobile navigation.

Impact: Critical. Estimated effort: half to one day for routing diagnosis and repair; allow additional time for prerendering depending on the existing build.

## 2. Align domain and canonical signals — P0

Observed: Home, Track, Arthos, Software and Contact declare canonical URLs on https://www.wwwsaurikit.com/. The homepage's social URLs and Organization/WebSite structured data also use that domain.

- [ ] Treat https://www.saurikit.in as the intended primary domain for this implementation. Confirm the intended domain before changing production redirect rules; if another domain is deliberately primary, align all signals to that instead.
- [ ] Give every indexable page one self-referencing canonical on the selected primary domain.
- [ ] Replace stale domain references in Open Graph, Twitter cards, structured-data IDs, organization URLs, logo URLs and share-image URLs.
- [ ] Make old domains under your control permanently redirect to their equivalent primary-domain pages, retaining meaningful query parameters. Avoid redirect loops and unrelated homepage redirects.
- [ ] Choose one trailing-slash convention. Make /track and /track/ resolve consistently, likewise /arthos and /arthos/.
- [ ] Use the selected canonical URL forms in internal links and the XML sitemap.
- [ ] Canonicalize enquiry topic variants to /contact when their only difference is a preselected form topic.

Acceptance: One canonical per page; no initial-versus-rendered canonical conflict; intended alternative URL forms permanently redirect in a single hop where feasible; social images load successfully.

Impact: High. Estimated effort: half to one day. Dependency: primary-domain decision and hosting access.

## 3. Repair and clarify the product enquiry journey — P0/P1

Observed: Track's “Start free 30-day trial” buttons point to /contact?topic=saurik_track. The reachable Contact page prepares an email draft or opens WhatsApp, rather than creating a product account. Its visible service choices did not include Saurik Track. Track also says no setup call is required. Arthos mixes present-tense trial language with a trial planned for launch.

- [ ] Add a Saurik Track enquiry option and correctly preselect it from topic=saurik_track.
- [ ] If onboarding is assisted, use “Request a trial” or “Book a demo” and explain the next step.
- [ ] Use “Start free trial” only when the destination actually starts the published trial flow. Connect it to verified onboarding if that flow exists.
- [ ] Reconcile trial lengths, launch status, pricing references and product availability across homepage, product pages, footer and assistant responses.
- [ ] Review Track claims such as hardware-level spoofing detection, offline sync, iOS support and rapid setup against current release evidence. Describe supported conditions and limitations accurately.
- [ ] Clearly label Arthos Desktop/Cloud features and trial terms as available or planned, using consistent wording throughout.
- [ ] Retain explicit labels on illustrative dashboards and hypothetical examples; never present them as customer results.

Acceptance: Every CTA reaches a working destination that delivers what its label promises. Trial terms and feature claims match the actual product offer.

Impact: High for enquiries and trust; not a standalone ranking guarantee. Estimated effort: half a day for copy and form corrections; actual onboarding development is a separate scope.

## 4. Make homepage positioning easier to understand — P1

Observed: The hero leads with “operational guesswork” and “controlled field workflows”; internal-strategy labels such as “PRIMARY WEDGE” also appear in customer-facing content.

- [ ] Lead with recognizable services and the real service region.
- [ ] Suggested H1: “Software, field-team tools and IT services in Tripura”.
- [ ] Suggested supporting copy: “SAURIK IT helps businesses manage field operations, build custom software, and set up dependable IT infrastructure across Agartala and Tripura.” Adjust geographic coverage to actual delivery capability.
- [ ] Suggested homepage title: “Software & IT Services in Tripura | SAURIK IT”.
- [ ] Suggested meta description: “Explore field-team software, custom applications, CCTV and IT support from SAURIK IT in Tripura. Discuss your business requirements with our team.”
- [ ] Replace “PRIMARY WEDGE”, “operational stack” and similar strategy language with customer labels such as “Field-team software”, “Software services” and “IT hardware & support”.
- [ ] Keep one clear primary action, such as “Discuss your requirement”, with a secondary product action such as “Explore Saurik Track”.
- [ ] Use one clear main heading and a logical section hierarchy. Write useful titles and descriptions rather than targeting rigid character counts.
- [ ] Bring homepage Twitter-card wording into line with its updated title and description.

Acceptance: The first screen explains what the business offers, where it works and what a visitor should do next.

Impact: Medium to high. Estimated effort: half to one day.

## 5. Give priority services dedicated pages — P1/P2

Observed: Six software services currently share /software through fragment links; hardware services are also linked as sections of one page. Fragment links do not create separate service documents.

- [ ] Retain /software and /hardware as useful overview pages.
- [ ] First publish dedicated pages for the services the business most wants to sell and can support with original detail.
- [ ] Start with website development and CCTV installation if they are active commercial priorities; then expand to custom software and other services based on demand and capacity.
- [ ] For each page, include the customer problem, audience, concrete deliverables, process, real service coverage, support boundaries, relevant work examples, FAQs and a specific enquiry action.
- [ ] Link service pages from their overview page, relevant homepage sections and related content. Add breadcrumbs to deeper pages.
- [ ] Avoid duplicate city pages, keyword-stuffed copy and unsupported “best company” claims.

### Candidate keyword-to-page map

These are proposed content targets, not measured rankings or search-volume estimates. Priorities reflect business relevance; validate demand before expanding the entire list. Multiple related phrases should share a page where they serve the same intent.

| Priority | Candidate search phrase | Intent | Proposed destination/content |
|---|---|---|---|
| High | software company in Tripura | Commercial | Homepage |
| High | IT services in Agartala | Commercial | Homepage; local service summary |
| High | website development in Agartala | Commercial | /services/website-development/ |
| High | website design in Tripura | Commercial | Same website-development page |
| High | CCTV installation in Agartala | Transactional | /services/cctv-installation/ |
| High | CCTV maintenance in Tripura | Transactional | Same CCTV page, maintenance section |
| High | custom software development in Tripura | Commercial | /services/custom-software/ |
| High | GPS attendance app for field staff | Commercial | Existing Track page |
| High | field employee tracking software | Commercial | Existing Track page |
| High | van stock management software | Commercial | Existing Track page |
| Medium | computer sales and service in Agartala | Transactional | /services/computer-sales-service/ |
| Medium | server installation in Tripura | Commercial | /services/server-installation/ |
| Medium | mobile app development in Tripura | Commercial | /services/mobile-app-development/ |
| Medium | data analytics services for small businesses | Commercial | /services/data-analytics/ |
| Medium | AI workflow automation for businesses | Commercial | /services/ai-automation/ |
| Medium | GST invoicing software for small businesses | Commercial | Existing Arthos page, accurate availability |
| Medium | how to choose CCTV for a small shop | Informational | Original buyer guide linked to CCTV service |
| Medium | how to track stock in delivery vans | Informational | Practical guide linked to Track |

Acceptance: Every added page has a distinct purpose, unique useful content, working direct access, page-specific metadata and relevant internal links. Do not publish empty placeholder pages.

Impact: High over time. Estimated effort: one to two days per well-supported service page. Dependency: repaired routing and approved business details.

## 6. Strengthen factual business information — P1

Observed: The visible homepage footer lists +91 98620 87157, while Organization structured data lists +91 93664 36569. The correct primary number needs verification.

- [ ] Confirm the correct contact number, then align visible content, structured data, tel links and WhatsApp destinations. If both numbers are valid, label their separate roles accurately.
- [ ] Keep business name, public contact details, actual service area and any published business hours consistent across pages.
- [ ] Add verified company and team information to About, along with the real process for local support.
- [ ] Show a public business address only where appropriate and accurate; do not invent an office or imply a walk-in location if none exists.
- [ ] Add original photographs, permissioned testimonials and genuine work examples when available.
- [ ] Use case studies with actual scope, role, outputs and attributable results. Keep illustrative examples clearly separate.
- [ ] Preserve the existing Organization/WebSite structured data while correcting stale URLs and contact information. Add more specific business or breadcrumb markup only when it matches the page.
- [ ] Do not add fabricated ratings, prices, customer counts or schema claims.

Acceptance: Structured data matches visible verified facts, and all business contact actions reach the intended destination.

Impact: Medium to high. Estimated effort: half to one day, excluding collecting new evidence.

## 7. Refine the visual design and mobile experience — P1/P2

Observed in the narrow browser viewport: The dark text, light background and teal CTA are coherent. The hero is text-heavy, and floating assistant/WhatsApp controls overlap or crowd the lower trust text.

- [ ] Retain the existing restrained colour palette and readable typography.
- [ ] Shorten the hero paragraph and reduce jargon so the main promise and action fit comfortably on mobile.
- [ ] Use a real product screenshot or a real installation photograph to support the main offer. Clearly label any concept preview.
- [ ] Group visitor choices into Products, Software Services and IT Hardware & Support.
- [ ] Move useful evidence closer to the top: real screenshots, service coverage and permissioned work examples.
- [ ] Replace the “Zero unverified claims” badge with useful, verifiable information about delivery or support.
- [ ] Consolidate mobile chat controls into one help launcher, or reposition them with sufficient reserved space so they never obscure text, buttons or form fields.
- [ ] Keep optional assistant panels closed by default; load their heavier code when needed.
- [ ] Use this homepage sequence: clear offer → service/product choices → real evidence → how work proceeds → company/local support → enquiry.
- [ ] Check keyboard focus, text contrast, descriptive image alternatives and form labels. Use empty alt text for purely decorative images.

Acceptance: No overlap or horizontal overflow at 360, 390, 768 and 1440 CSS pixels; actions are easy to tap; keyboard users can navigate the menu and contact flow; mobile content remains readable with text enlargement.

Impact: Medium, with direct enquiry benefits. Estimated effort: one to two days plus browser verification.

## 8. Complete remaining technical checks and fix any failures — P1

The following are verification tasks, not confirmed defects. robots.txt and sitemap.xml could not be inspected because the browser blocked those resource types. Initial-response HTML, HTTP redirect chains and measured performance were not verified in this review.

- [ ] Ensure robots.txt is accessible, allows intended public content and required rendering assets, and names the correct sitemap.
- [ ] Ensure sitemap.xml is valid and contains only intended canonical, indexable, successful page URLs. Use truthful modification dates.
- [ ] Check for accidental noindex directives and conflicting HTTP indexing headers.
- [ ] Inspect initial HTML for each route and compare it with the rendered title, description, main content and canonical.
- [ ] Audit internal links, section anchors, images and social-share images; repair confirmed failures.
- [ ] Measure mobile performance for homepage, Track, Arthos and a service page before selecting optimizations.
- [ ] Optimize identified bottlenecks: appropriately sized WebP/AVIF images, explicit image dimensions, deferred optional scripts, reduced unused JavaScript and suitable font loading. Do not lazy-load the main above-the-fold image.
- [ ] Target real-user 75th-percentile LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds and CLS ≤ 0.1. Treat lab results as diagnostics if real-user data is unavailable.
- [ ] If adding website analytics, distinguish enquiry-button clicks, draft creation and actual received enquiries. Do not label an email-draft click as a completed lead.

Acceptance: Save a concise route/metadata/link test record and performance measurements after the fixes. Mark unavailable measurements as unknown rather than passed.

Impact: High if failures are found. Estimated effort: half a day for checks; remediation depends on findings.

## Implementation sequence

1. Days 1–2: Repair direct-route access, domain consistency and broken enquiry destinations.
2. Days 3–5: Correct product copy, business facts, metadata and mobile overlay issues.
3. Week 2: Publish the first two substantive service pages and improve homepage evidence and hierarchy.
4. Weeks 3–4: Add further pages only where justified, then fix measured performance and accessibility issues.

Dates are planning estimates, not delivery commitments. Complete and verify each stage before expanding scope.
