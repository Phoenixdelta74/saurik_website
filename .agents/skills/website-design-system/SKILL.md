---
name: website-design-system
description: Manages design tokens, typography scales, spacing units, and component interaction state specifications for SAURIK IT.
---

# Skill: Design Systems & Component Specs (`website-design-system`)

The `website-design-system` skill governs reusable design tokens and standard component states to ensure complete visual, functional, and behavioral consistency across all pages.

---

## 1. When to Use

Use this skill when:
- Creating new reusable UI components for `src/components/`.
- Defining design tokens or updating `tailwind.config.js`.
- Specifying the complete interaction state matrix for buttons, form fields, cards, disclosures, and dialogs.

---

## 2. Core Design Tokens

All components must reference existing theme tokens defined in `tailwind.config.js` and `src/index.css`:

```javascript
// tailwind.config.js tokens
theme: {
  extend: {
    colors: {
      canvas: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      ink: {
        DEFAULT: '#0f172a',
        muted: '#475569',
        faint: '#94a3b8',
      },
      accent: {
        teal: '#0d9488',
        blue: '#2563eb',
        amber: '#d97706',
        green: '#16a34a',
      }
    }
  }
}
```

---

## 3. The 8 Mandatory Component Interaction States

Every interactive component specified by the designer must document its visual behavior across these 8 states:

| State | Visual Treatment | Accessibility Expectation |
|---|---|---|
| **1. Default / Idle** | Standard surface background, clean border, legible text. | Native semantic element or appropriate ARIA role. |
| **2. Hover** | Subtle elevation or background tint (`hover:bg-teal-700`). | Pointer cursor, smooth transition ($< 200\text{ms}$). |
| **3. Focus (Keyboard)** | High-contrast visible focus ring (`focus-visible:ring-2 focus-visible:ring-accent-teal`). | Never suppressed via `outline-none` without replacement. |
| **4. Active / Pressed** | Slight scale down (`active:scale-[0.98]`) or darkened tint. | Instant visual feedback on click/tap. |
| **5. Disabled** | Reduced opacity (`opacity-50 cursor-not-allowed`). | `aria-disabled="true"`, non-focusable if inactive. |
| **6. Loading / Submitting** | Inline spinner or pulsing skeleton, disabled repeat clicks. | `aria-busy="true"`, screen-reader status update. |
| **7. Error / Invalid** | Red/Amber border (`border-red-500`), error icon, clear message. | `aria-invalid="true"`, message linked via `aria-describedby`. |
| **8. Success / Confirmation** | Green check icon, accessible confirmation banner. | Live region announcement (`aria-live="polite"`). |

---

## 4. Component Specification Output Format

```markdown
# Component Specification: [Component Name]

## 1. Description & Purpose
[What the component does and where it is used]

## 2. Token Mapping
- **Background:** `bg-surface`
- **Border:** `border border-border`
- **Text:** `text-ink`
- **Focus Ring:** `focus-visible:ring-2 focus-visible:ring-accent-teal`

## 3. Interactive States Matrix
- **Default:** [Description]
- **Hover:** [Description]
- **Focus:** [Description]
- **Disabled:** [Description]
- **Loading:** [Description]
- **Error:** [Description + Form preservation rule]
- **Success:** [Description + Status announcement]
```

