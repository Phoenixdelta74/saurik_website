---
name: accessibility-and-usability-review
description: Conducts WCAG 2.2 AA accessibility audits, color contrast checks, keyboard navigation reviews, and screen reader label verification for SAURIK IT.
---

# Skill: Accessibility & Usability Review (`accessibility-and-usability-review`)

The `accessibility-and-usability-review` skill ensures that every page, component, form, and modal disclosure complies with **WCAG 2.2 AA** accessibility standards and remains completely usable by people using assistive technologies, keyboards, or small screens.

---

## 1. When to Use

Use this skill when:
- Designing new user interfaces or wireframes.
- Conducting pre-handoff accessibility audits of components.
- Reviewing implemented code during Visual QA before declaring completion.

---

## 2. Core WCAG 2.2 AA Audit Dimensions

Every design must be evaluated against the following 6 accessibility pillars:

### 1. Color Contrast & Visual Perception
- **Normal Text (< 18pt / 24px):** Minimum contrast ratio of **4.5:1** against its background.
- **Large Text ($\ge 18\text{pt}$ / $24\text{px}$ bold):** Minimum contrast ratio of **3:1**.
- **UI Components & Graphical Objects:** Minimum contrast ratio of **3:1** for borders, focus rings, and active icons.
- **Never Rely on Color Alone:** Status states (e.g. error, success) must use text labels or distinctive icons in addition to color changes.

### 2. Keyboard Navigability & Focus Management
- **Full Keyboard Access:** Every interactive element must be operable using `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Arrow` keys.
- **Visible Focus Rings:** Every focused control must display a distinct, high-contrast focus ring (e.g. `ring-2 ring-accent-teal ring-offset-2`).
- **No Focus Traps:** Focus must cycle naturally or be logically trapped within open modal dialogs.
- **Logical Tab Order:** Tab sequence must match the visual reading order of the document.

### 3. Touch Target Sizing (Criterion 2.5.8)
- Minimum interactive target size must be **44px by 44px** (preferably 48px), with adequate spacing between adjacent buttons.

### 4. Semantic Structure & Landmarks
- Document must utilize semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
- Heading hierarchy must be logical: exactly one `<h1>` per page, followed by sequential `<h2>` and `<h3>` tags without skipping levels.

### 5. Assistive Technology & Form Labels
- All form inputs (`<input>`, `<select>`, `<textarea>`) must have explicit, permanently visible `<label>` elements.
- Placeholder text must **never** be used as a substitute for a label.
- Error messages must be programmatically linked to their input via `aria-describedby` and flagged with `aria-invalid="true"`.
- Non-text content (images) must have descriptive `alt` text; purely decorative images use `alt="" aria-hidden="true"`.

### 6. Reduced Motion (Criterion 2.3.3)
- All non-essential animations, pulsing effects, and smooth scrolls must be suppressed when `prefers-reduced-motion: reduce` is enabled.

---

## 3. Accessibility Audit Report Format

```markdown
# Accessibility Audit: [Feature / Page Name]

## 1. Summary Status
- **Standard:** WCAG 2.2 Level AA
- **Overall Result:** [COMPLIANT / MINOR ISSUES / NON-COMPLIANT]

## 2. Audit Checklist
| Verification Area | Requirement | Status | Evidence / Notes |
|---|---|---|---|
| **Text Contrast** | $\ge 4.5:1$ for body text | PASS / FAIL | Measured contrast ratio: `[X:1]` |
| **Keyboard Focus** | Visible outline on Tab | PASS / FAIL | `focus-visible:ring-2` verified |
| **Touch Targets** | Minimum 44px by 44px | PASS / FAIL | Button height `48px` |
| **Form Labels** | Explicit visible `<label>` | PASS / FAIL | Linked with `htmlFor` |
| **Error Handling** | `aria-describedby` error | PASS / FAIL | Form values preserved |
| **Reduced Motion** | Disables on preference | PASS / FAIL | `motion-reduce:` applied |

## 3. Corrective Actions Required
- [List of specific CSS or markup fixes if any checks failed]
```

