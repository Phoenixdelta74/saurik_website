---
name: qa-accessibility-testing
description: Audits WCAG 2.2 AA accessibility standards, keyboard operation, focus indicators, color contrast, and assistive tech compatibility for SAURIK IT.
---

# Skill: Accessibility Testing & Audit (`qa-accessibility-testing`)

The `qa-accessibility-testing` skill ensures that SAURIK IT digital interfaces comply with **WCAG 2.2 Level AA** accessibility standards and provide an equitable, frictionless experience for all visitors, including keyboard-only users and assistive technology users.

---

## 1. When to Use

Use this skill when:
- Auditing new UI components, forms, or interactive pages.
- Verifying accessibility before recommending a release (`qa-release-readiness`).
- Triaging usability or accessibility regression reports.

---

## 2. Core Testing Procedures

### 1. Keyboard-Only Operability Walkthrough
Disconnect the mouse and navigate the interface using only the keyboard:
- **`Tab` / `Shift+Tab`:** Cycles sequentially through all interactive controls in a logical reading order.
- **`Enter` / `Space`:** Triggers buttons, toggles checkboxes, and opens disclosure panels.
- **`Escape`:** Dismisses modal dialogs, drawers, or tooltips and returns focus to the initiating trigger.
- **Visible Focus Rings:** Every focused control must display an unambiguous, high-contrast focus ring (`focus-visible:ring-2 focus-visible:ring-accent-teal`). **Zero invisible focus states allowed.**

### 2. Form Labels & Error Association
- Inspect every `<input>`, `<select>`, and `<textarea>`.
- Verify an explicit `<label htmlFor="...">` exists and is visible.
- Trigger validation errors: verify that error text is programmatically associated with the input via `aria-describedby` and that `aria-invalid="true"` is set.

### 3. Contrast Measurement
- Measure contrast ratios using WCAG formulas:
  - Body text ($< 18\text{pt}$): Minimum **4.5:1** contrast ratio.
  - Large headings ($\ge 18\text{pt}$ bold): Minimum **3.0:1** contrast ratio.
  - Interactive component boundaries / focus rings: Minimum **3.0:1** against adjacent colors.

### 4. Non-Text Content & Screen Reader Announcements
- Verify all images have descriptive `alt` attributes. Decorative icons must have `aria-hidden="true"`.
- Verify dynamic status changes (e.g. form submission success, audio playback state) use live regions (`aria-live="polite"`).

### 5. Reduced-Motion Preferences
- Verify that CSS animations, pulsating visualizers, and smooth scrolls are cleanly disabled when `prefers-reduced-motion: reduce` is active.

---

## 3. Accessibility Test Report Format

```markdown
# Accessibility Test Report: [Component / Page]

## 1. Compliance Summary
- **Target Standard:** WCAG 2.2 Level AA
- **Automated Audit:** 0 automated violations detected
- **Manual Keyboard Audit:** 100% reachable with visible focus rings

## 2. Assertion Matrix
| Rule | Requirement | Observed Result | Status |
|---|---|---|---|
| 2.1.1 Keyboard | All controls operable via Tab/Enter/Esc | Fully operable | PASS |
| 2.4.7 Focus Visible | High-contrast focus indicator present | Ring visible on all links/buttons | PASS |
| 1.4.3 Contrast | Text contrast >= 4.5:1 | Navy `#0f172a` on `#f8fafc` is 14.8:1 | PASS |
| 1.3.1 Info & Relationships | Form inputs linked to visible labels | All inputs have htmlFor labels | PASS |
| 2.3.3 Reduced Motion | Respects prefers-reduced-motion | Transitions disabled on reduce | PASS |
```

