---
name: ux-design-brief
description: Evaluates product requirements, target audience, brand assets, existing website design, and design memory to formulate clear design briefs for SAURIK IT.
---

# Skill: UX Design Brief & Context Assessment (`ux-design-brief`)

The `ux-design-brief` skill ensures that the UI/UX Designer deeply understands business goals, target user contexts, brand conventions, and prior design lessons **before** creating layouts or styling interfaces.

---

## 1. When to Use

Use this skill when:
- Receiving a new PRD or feature request from the Product / Planner (`role-product-planner`).
- Planning a redesign or major visual adjustment to an existing page.
- Establishing the design direction and constraints for a new user journey.

---

## 2. Core Assessment Dimensions

Every design brief must evaluate the following 5 dimensions:

### 1. Business Objective & Primary Action
- What is the primary user action the design must facilitate? (e.g. Understand software offerings $\to$ prepare an enquiry draft).
- What business outcome defines success without inventing vanity metrics?

### 2. Target Audience & Usage Context
- Who is using this interface? (e.g. Industrial procurement manager on a desktop, retail owner on mobile in bright sunlight, screen-reader user).
- What are their primary pain points, time constraints, and information needs?

### 3. Existing Brand Assets & Design Direction
- Review [`design.md`](file:///c:/Saurik/saurik_website/design.md) for approved design direction: light, spacious interface using navy text, teal for software/primary actions, and blue for hardware.
- Review existing logo and favicon in `public/`.
- Review existing typography and color tokens in `tailwind.config.js`.

### 4. Non-Negotiable Negative Constraints
- **Zero Fabricated Claims:** Never design placeholder sections for unverified customer ratings, fake partner logos, or fabricated testimonials.
- **Truthful Interaction Copy:** Ensure CTA and feedback designs indicate that a draft is opened, never claiming that an enquiry was received until server confirmation.
- **Icon Discipline:** Strictly use Lucide React icons; never introduce emoji as UI icons.

### 5. Prior Design Memory (Step 0)
- Read [`agent-memory/design-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/design-lessons.md) and [`agent-memory/shared-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/shared-lessons.md) for past usability findings and layout pitfalls.

---

## 3. Design Brief Output Format

```markdown
# Design Brief: [Feature / Page Name]

## 1. Objective & Target Audience
- **Primary Goal:** [Core action to facilitate]
- **Target Persona:** [User description and context]

## 2. Brand & Visual Baseline
- **Color Theme:** Teal (`#0d9488`) for Software/Action, Blue (`#2563eb`) for Hardware, Navy (`#0f172a`) for Text.
- **Typography:** Clean sans-serif hierarchy with comfortable line heights.

## 3. Constraints Checklist
- [x] No fabricated ratings or fake testimonials
- [x] Lucide icons only (no emoji)
- [x] Truthful draft copy designed
- [x] Past design lessons reviewed

## 4. Open Design Questions
- [Items requiring stakeholder input or business clarification]
```

