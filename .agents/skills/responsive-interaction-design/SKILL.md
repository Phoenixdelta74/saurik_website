---
name: responsive-interaction-design
description: Designs responsive viewport adaptations across 360px–1440px, mobile navigation disclosures, touch target ergonomics, and reduced-motion behavior for SAURIK IT.
---

# Skill: Responsive & Interaction Design (`responsive-interaction-design`)

The `responsive-interaction-design` skill governs device adaptation, touch ergonomics, fluid transitions, and accessible interactive behaviors across all screen form factors.

---

## 1. When to Use

Use this skill when:
- Designing mobile navigation menus, drawers, accordions, and dialogs.
- Specifying responsive breakpoint behavior across phone, tablet, and desktop viewports.
- Defining keyboard navigation flows (`Tab`, `Escape`, `Enter`) and motion preferences.

---

## 2. Responsive Viewport Matrix

All interfaces must be designed and verified against this 5-tier viewport matrix:

| Viewport Tier | Width Range | Primary Design Strategy |
|---|---|---|
| **Mobile Small** | `360px - 390px` | Single-column stack, full-width touch targets, collapsed drawers, 16px lateral padding. |
| **Mobile Large / Phablet** | `391px - 767px` | 1-column stack, enlarged touch targets, bottom bar actions. |
| **Tablet** | `768px - 1023px` | 2-column grids, sticky navigation, compact disclosures. |
| **Desktop Standard** | `1024px - 1439px` | 3-column service grids, side-by-side forms, visible navigation links. |
| **Desktop Wide** | `≥ 1440px` | Max width containment (`max-w-7xl mx-auto`), balanced negative space. |

---

## 3. Core Interaction Ergonomics

### 1. Touch Targets (44px to 48px)
- All interactive controls (buttons, navigation toggles, form fields, checkbox targets) must provide a minimum physical touch area of **44px by 44px** (preferably 48px) to prevent mis-clicks on mobile devices.

### 2. Mobile Drawer & Modal Disclosures
- When mobile menu or dialog opens:
  - Focus must be trapped inside the disclosure.
  - Pressing `Escape` must immediately close the disclosure and return focus to the trigger.
  - Page body scrolling must be locked while modal is open (`overflow: hidden`).

### 3. Motion & Reduced-Motion Ergonomics
- Interactive transitions must be brief ($150\text{ms} - 250\text{ms}$).
- Respect user reduced-motion preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 4. Interaction Specification Output

```markdown
# Interaction Specification: [Feature Name]

## 1. Viewport Adaptation
- **Mobile (< 768px):** Stack form vertically, full-width button (height 48px).
- **Desktop (≥ 1024px):** Split 2-column layout (Contact details left, form right).

## 2. Mobile Navigation & Drawer Rules
- **Trigger:** Hamburger icon with `aria-expanded` and `aria-controls`.
- **Keyboard:** `Escape` closes menu, `Tab` cycles within drawer.
- **Scroll Lock:** Background body scrolling disabled when open.

## 3. Motion & Animation
- **Transitions:** `transition-all duration-200 ease-in-out`.
- **Reduced Motion:** Instant state swap without fade/slide when `prefers-reduced-motion: reduce`.
```

