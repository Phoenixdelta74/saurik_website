# SAURIK IT Private Limited website design brief

Version 0.2 • 13 September 2026 • Working proposal for discussion

## Purpose and recommended direction

This document defines the proposed website experience, visual identity, page structure, content requirements, and design acceptance criteria. It is intended to guide the company owner, designer, and website developer through the same decisions. The recommendation is a spacious, predominantly light website with navy typography, teal accents, clear service explanations, and separate enquiry journeys for software projects and hardware requirements.

The website should help a visitor understand what SAURIK IT does, find the relevant service, judge whether the company fits their needs, and send a useful enquiry. A successful design combines a distinctive brand with practical information about delivery and support.

This is a design proposal, not an approved brand manual or a completed website. The accompanying page concept illustrates layout and direction; its content is draft copy.

## What the existing project establishes

The existing SaurikIT project was inspected on 13 September 2026. It contains React pages for Home, Software & IT, Hardware, About, and Contact, with shared navigation, footer, logo, and WhatsApp components. Its existing visual language uses dark navy backgrounds, cyan and purple accents, glass-style cards, Outfit headings, and Inter body text. Its tagline is “Technology, Deliberately.”

The owner confirmed two lines of business: Software & IT and IT Hardware. Software & IT covers, in priority order, Data Analytics as a Service including predictive modelling and forecasting, Generative AI, Agentic AI, custom web applications, website design and support, and mobile app development. IT Hardware covers CCTV sales and services, computer sales and services, and server installation and service. Customers are primarily B2B, with CCTV also serving B2C customers. Older source offerings such as ERP/CRM, printers, networking, and AMC are not part of this approved brief unless separately confirmed.

The source also includes “50+ Happy Clients,” “5+ Years Experience,” a placeholder phone number, an incomplete office address, and an email address that has not been verified. None should be treated as established company facts. Team descriptions, warranty claims, support promises, authorised sourcing, and free consultations also require confirmation.

The current contact form opens an email application but then displays “Message Sent.” The new design must distinguish opening an email draft from successfully receiving an enquiry.

## Business priorities and audience

Confirmed audience: mainly B2B customers across both divisions, plus B2C customers for CCTV. Proposed buyer roles include business owners, operations managers, and IT or procurement contacts. Residential CCTV visitors need a clear route that does not require a company name. Geography, business sizes, industry priorities, and the commercial ranking of services remain open.

Four proposed visitor journeys:

1. **Software project:** Home → Software & IT → relevant capability → project enquiry with service preselected.
2. **Hardware requirement:** Home or search entry → Hardware & IT Support → category and delivery process → quote enquiry.
3. **Company evaluation:** Service page → About or approved project example → Contact.
4. **Residential CCTV:** Hardware → CCTV for your home → coverage and installation questions → CCTV enquiry with residential context selected.

The main conversion is a successfully received, relevant enquiry. Secondary indicators are service-page visits and contact-channel clicks. A WhatsApp or email click is an expression of interest, not a confirmed lead. Establish a baseline after launch before setting numerical conversion targets.

## Visual direction

### Recommended route

Use a warm white canvas, strong navy text, a restrained teal accent, and occasional dark navy sections for emphasis. Large but readable headings, generous space, and carefully chosen product or installation imagery should make the company feel capable, approachable, and precise.

Use a small geometric connection motif to link software workflows with physical infrastructure. Keep it secondary to meaningful content. Preserve the existing logo as a candidate asset pending owner review; confirm its legibility, ownership, and light-background version before finalising the palette.

### Alternatives for comparison

| Direction | Appearance | Best reason to choose it | Main tradeoff |
| --- | --- | --- | --- |
| Light and precise — recommended | Warm white, navy, teal, editorial layouts | Broad appeal across software and hardware buyers | Needs strong imagery and composition to feel distinctive |
| Dark technology | Navy canvas, mint details, restrained glow | Continuity with the current project and stronger software emphasis | Long service explanations need careful contrast and density |
| People and service | White, deep blue, authentic team and installation photography | Emphasis on local relationships and dependable support | Depends on a strong supply of real photography |

These are design judgments for this project, not claims about measured customer preferences. Produce the homepage first to settle the direction before applying it to all pages.

### Proposed design tokens

| Role | Proposed value | Use |
| --- | --- | --- |
| Main canvas | `#F7F9F8` | Page background |
| Surface | `#FFFFFF` | Forms and selected content panels |
| Primary ink | `#102A43` | Headings and main text |
| Secondary ink | `#486174` | Supporting explanations |
| Primary accent | `#087F72` | Main buttons and software details |
| Hardware accent | `#2456A6` | Hardware labels and selected details |
| Soft accent | `#E1F2ED` | Small decorative areas |
| Divider | `#D6E1E5` | Structural separators; assess control borders separately |

Validate every actual foreground and background pair, including hover, focus, disabled, error, and dark sections. Colour labels must be accompanied by text so software and hardware remain distinguishable without colour perception.

Retain Outfit for headings and Inter for body copy as the initial typography proposal, with system sans-serif fallbacks. Use no more than two font families. Desktop hero headings: approximately 56–64 px; mobile: 36–40 px. Section headings: 32–40 px desktop and 28–32 px mobile. Body: 16–18 px with approximately 1.6 line spacing and a comfortable 60–70 character reading width.

Use a 4/8 px spacing system. Suggested desktop content width is 1200 px, with 24–32 px side margins and 80–96 px section spacing. Mobile uses 20 px side margins and 48–56 px section spacing. Buttons are approximately 48 px high. Corners are moderately rounded: 8 px controls and 12–16 px selected panels. Use subtle borders and minimal shadows.

## Sitemap and navigation

Launch with the five established pages, plus a privacy information page reflecting the actual enquiry system. Preserve existing service URLs where practical.

| Page | Proposed route | Main purpose | Main action |
| --- | --- | --- | --- |
| Home | `/` | Explain the company and route visitors | Discuss your requirement |
| Software & IT | `/software` | Explain digital capabilities and delivery | Discuss your project |
| Hardware & IT Support | `/hardware` | Explain supply, installation, and support | Request a quote |
| About | `/about` | Establish identity and how the company works | Talk to our team |
| Contact | `/contact` | Capture a useful enquiry | Send enquiry |
| Privacy | `/privacy` | Explain actual handling of enquiry information | Return to contact |

Desktop navigation: logo, Software & IT, Hardware & IT Support, About, and a prominent Contact button. The logo returns to Home. A five-page site does not need a large multi-level menu. Add a Work page only when approved case studies exist; add Insights only when someone owns ongoing publication. Dedicated service pages can follow when each has enough distinct content to justify a page.

The footer should contain the company name, a short service description, page links, verified contact details, service area, and privacy link. Display registrations or partner marks only when verified and approved for use.

## Page designs and content structure

### Home

**Objective:** explain the two service divisions quickly and give visitors a useful next step.

1. **Header:** compact logo and navigation, with a clearly differentiated Contact action.
2. **Hero:** left-aligned heading and short explanation taking roughly 60 percent of the row; a service relationship composition or approved image occupies the remainder. Draft heading: “Software and IT infrastructure for your business.” Draft description: “Custom software, practical automation, and dependable IT hardware and support — shaped around your requirements.” Primary action: “Discuss your requirement.” Secondary action: “Explore our services.”
3. **Two service paths:** Software & IT and Hardware & IT Support, each with a concise outcome, three representative capabilities, and a specific destination link. Keep equal prominence until commercial priorities are confirmed.
4. **Evidence section:** one or two approved project examples with meaningful descriptions. If none are available, substitute an explanation of delivery scope and outputs. Do not invent client logos, testimonials, numbers, or project outcomes.
5. **How work progresses:** Understand → Plan → Deliver → Support. Describe what the customer receives at each step in one sentence.
6. **Company introduction:** a short factual paragraph, authentic team or work image when available, and an About link.
7. **Closing enquiry section:** a specific invitation to describe the requirement, followed by the footer.

Avoid repeating the complete service catalogue on the homepage. On mobile, put the heading and actions before the visual, stack the service paths, and keep proof content in a readable vertical sequence.

### Software and IT

**Objective:** help customers recognise an applicable service and understand the delivery approach.

Start with a concise, Data Analytics-led hero and project action. Follow with six clearly separated capability sections in this order: Data Analytics as a Service; Generative AI; Agentic AI; custom web applications; website design and support; and mobile app development. Explain each through business use cases and deliverables.

Each section should answer: what problem this solves, typical deliverables, integration or information needs, and the next step. Data Analytics as a Service should explicitly include predictive modelling and forecasting. Explain the information needed, the question being answered, the analytical output, and any agreed ongoing refresh or support. Avoid guaranteeing forecast accuracy. Generative AI should explain content or knowledge-assistance applications; Agentic AI should explain multi-step workflows, connected tools, human review points, and agreed permissions. Proposed examples must be labelled illustrative until backed by client work.

Use alternating text and meaningful examples rather than identical cards throughout. Include an approved screenshot or clearly labelled illustrative workflow. Then show the delivery process, explain handover and support scope, answer common questions about discovery, existing systems, ownership, and maintenance, and end with the project action. FAQ answers must reflect actual commercial practices.

Desktop: short intro followed by two-column capability sections. Mobile: one column with each illustration adjacent to its explanation. A service CTA opens Contact with the corresponding topic selected.

### Hardware and IT support

**Objective:** make procurement and support enquiries straightforward.

Use a practical hero such as “Computer and CCTV sales. Server installation and service.” Follow with three confirmed categories: CCTV sales and services; computer sales and services; server installation and service. Each category needs scope, example requirements, and a specific enquiry action. Give CCTV two clearly labelled routes: “For my business” and “For my home.” Explain server work in terms of installation and service; do not imply server sales or hosting is offered. Confirm service coverage and on-site availability.

Show the proposed buying process: Requirement → Recommendation and quotation → Supply and setup → Agreed support. Explain that exact availability, model selection, pricing, warranties, and response arrangements are confirmed in the quotation. This page is initially a quote-led service page, not a shopping catalogue.

Use real installation photos or licensed equipment imagery. Avoid unsupported partner badges and manufacturer authorisation claims. Include FAQs about site assessment, bulk requirements, installation, and maintenance, with answers supplied by the owner. Finish with “Request a quote.” The contact topic should carry through from the selected category.

### About

**Objective:** establish who is accountable for delivery.

Sequence: factual company introduction → owner-approved company story → two service areas → people and responsibilities → working principles supported by examples → verified location and reach → Contact.

Retain “Technology, Deliberately.” as a possible brand signature, but pair it with a concrete explanation of the business. Request names, roles, photographs, founding details, and the company's reason for combining software and hardware. Publish only supplied facts. If team photography is unavailable, use an honest text layout rather than stock portraits implying employees.

Use an editorial layout with generous reading space, one strong photograph, and concise passages. Values should describe behaviours, such as documenting scope before delivery, when confirmed as real practice.

### Contact

**Objective:** let visitors send enough context without making the form burdensome.

Desktop: a narrow column for verified contact channels and service information beside a wider form. Mobile: page introduction, form, then alternate contact channels. Keep phone or WhatsApp accessible where appropriate without covering fields.

Required fields: name, email, and requirement description. Optional: company, phone, service topic, and timeframe. Add optional quantity and installation location for hardware enquiries, and a home/business choice for CCTV. Keep company optional for residential visitors. For server enquiries, offer installation or service as the requirement type. Do not require technical specifications from a visitor who needs advice. Include “Not sure yet” in the service selector. Preserve topic selection from service pages and allow it to be changed.

Design default, focus, completed, invalid, sending, received, and failed states. Errors appear next to the relevant field and explain how to correct it. Preserve entered values after a failed submission. Announce submission feedback accessibly and prevent duplicate sends while a request is pending.

A confirmed server acceptance may show “Enquiry received.” Opening an email application must instead say “Your email draft is ready. Send it from your email app.” Do not promise a response time until the company agrees to it. Provide a concise information-use explanation and privacy link aligned with the actual service provider and retention practice.

### Privacy and unavailable pages

The privacy page should explain the information collected, why it is used, recipients or service providers, retention practice, and a contact for questions. Its text requires review against the implemented process; this brief does not provide legal wording. An unavailable-page design should provide a plain explanation and links to Home and Contact.

## Shared components and interactions

Design a reusable header, mobile menu, footer, service section, project example, process list, enquiry banner, button set, form fields, and FAQ disclosure. Use one consistent icon family in place of mixed emoji. Links navigate; buttons submit or change interface state. Distinguish interactive panels from informational ones.

Navigation needs visible current-page and keyboard-focus states. The mobile menu must work by keyboard, expose its expanded state, and close predictably. FAQ questions use accessible disclosure controls. Avoid autoplay carousels, scroll hijacking, and content that appears only on hover.

Use brief opacity or small-position transitions, approximately 150–220 ms. Honour reduced-motion preferences and keep essential content visible if animation fails. Sticky navigation and any WhatsApp control must not obscure focused fields, mobile keyboards, or footer links.

## Mobile and accessibility requirements

Review page layouts at 360, 390, 768, 1024, and 1440 px, plus narrow-width and zoom checks. Stack complex rows before they become cramped. Keep forms single-column, paragraph text readable, and primary actions easy to reach.

Target WCAG 2.2 AA: readable contrast, semantic headings, keyboard operation, meaningful labels, visible focus, error guidance, text alternatives, and reflow. Normal text needs at least 4.5:1 contrast and large text 3:1. Use approximately 44–48 px touch areas as the project comfort target. Passing a colour check alone does not establish accessibility conformance. Reference: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Content and asset checklist

The owner should confirm the exact company display name, logo assets, current services, priority customers, geographic coverage, contact channels, office address, and any response commitments. Request approved project examples, photographs, team biographies, and permitted testimonials. Record the source and approval status for each factual claim.

Use plain English and explain acronyms when introduced. Prefer concrete deliverables to generic claims about innovation. Use a single consistent action phrase per journey. Give every image a purpose; remove decorative media that competes with service explanations. Do not publish placeholders.

## Search visibility and performance

Give each page a unique title, description, single main heading, and clear internal links. Keep factual company details consistent. Ensure service content is available to search crawlers; decide prerendering or another suitable rendering approach during implementation. Preserve current routes or specify redirects when routes change. Include a sitemap and a helpful unavailable-page experience.

Optimise images, reserve their display dimensions, load below-fold media progressively, and keep font files limited. Target good Core Web Vitals at the 75th percentile of real visits: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. Use prelaunch measurements as diagnostic evidence; they do not substitute for real-user results. Reference: [web.dev Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Design production and acceptance

1. Confirm the audience, service priorities, existing logo, and factual content.
2. Review the homepage concept and select the visual direction.
3. Produce detailed desktop and mobile designs for Home, both service pages, About, and Contact.
4. Complete shared component states, form feedback, mobile navigation, and privacy/unavailable-page layouts.
5. Check content, contrast, keyboard journeys, mobile reflow, and asset permissions; then implement the agreed designs.

Design handoff should include the sitemap, approved copy, colour and typography tokens, spacing rules, responsive layouts, component states, images, and the end-to-end enquiry journey. Acceptance requires that visitors can identify each division, reach a relevant enquiry route, understand required information, and receive accurate feedback. All claims and contact destinations must be verified before launch.

## Decisions still needed

The Software & IT capability priority was confirmed on 13 September 2026: Data Analytics first, followed by Generative AI, Agentic AI, Custom Web Applications, Website Design & Support, and Mobile App Development. The remaining decisions are: Which B2B sectors and geographical areas are priorities? Should hardware and software retain equal homepage prominence? Is the existing logo and tagline approved? Which projects and people can be shown publicly? Who receives enquiries, and what response expectations can be supported?

The confirmed scope is B2B across Software & IT and IT Hardware, with B2C also supported for CCTV. Until the remaining answers arrive, this brief proposes equal prominence for both divisions, English content, and the light visual direction. These assumptions are explicit so they can be revised without losing the structure already developed.

## Source record

Current project inspected: `C:\Users\soura\OneDrive\Documents\SaurikIT` — README and Home, SoftwareAI, Hardware, About, and Contact source files. This was a source-content inspection, not a rendered audit of the running website. Earlier memory was used to locate the project; current files supplied the business-content baseline. External references support the accessibility and performance targets only. The brand and layout recommendations are proposed design decisions.


## Confirmed service content plan

| Service | Page content to develop | Enquiry context |
| --- | --- | --- |
| Data Analytics as a Service | Data review, predictive modelling, forecasting, output format, validation approach, and proposed refresh cycle | Business question; available data; forecast horizon or modelling objective |
| Generative AI | Illustrative knowledge-assistance or content use cases; data sources; evaluation and review approach | Intended users; information sources; desired output |
| Agentic AI | Illustrative multi-step workflows; tools involved; permitted actions; human review and exception handling | Workflow steps; connected systems; approval needs |
| Custom web applications | Workflow problem, users, integrations, delivery stages, and handover | Current process; intended users; essential functions |
| Website design and support | Business website goals, design process, launch scope, and agreed support arrangements | New website or existing site; business goal; desired timeframe |
| Mobile app development | Intended users, mobile workflows, platform approach, device features, integrations, testing, and release responsibilities | Target devices and platforms; essential functions; APIs or data; release ownership |
| CCTV sales and services | Home and business paths; new installation versus service; site coverage needs | Home or business; new or existing system; location |
| Computer sales and services | Purchase and service paths; device requirements; deployment or fault context | Purchase or service; device count; intended use or issue |
| Server installation and service | Installation and servicing scope; environment assessment; scheduling and handover | New installation or service; current environment; issue or requirement |

The initial sitemap can accommodate all nine offerings. Give analytics, both AI services, and mobile app development visible sections and direct enquiry links rather than grouping them under a generic software label. Dedicated pages for these services are a sensible expansion once case examples and detailed copy are available. Keep the overall brand business-focused; put the explicit residential invitation inside the CCTV route and a short homepage mention.
