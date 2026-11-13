---
name: frontend-react-implementation
description: Implements responsive, accessible React 18 interfaces with Tailwind CSS, Lucide icons, WCAG 2.2 AA compliance, and keyboard navigation for SAURIK IT.
---

# Skill: Frontend React Implementation (`frontend-react-implementation`)

The `frontend-react-implementation` skill governs the creation of accessible, responsive, high-performance user interfaces using React 18 functional components and Tailwind CSS 3.

---

## 1. When to Use

Use this skill when:
- Authoring or refactoring React components in `src/components/` or pages in `src/pages/`.
- Styling layouts, interactive controls, navigation disclosures, or modal panels.
- Resolving layout bugs, accessibility violations, or responsive breakpoint regressions.

---

## 2. Core Frontend Standards

### 1. Responsive Viewport Verification (360px to 1440px)
All components must render gracefully across the standard viewport matrix without horizontal overflow:
- **Mobile Small (360px - 390px):** Single-column layout, compact typography, accordion disclosures, edge-to-edge touch targets.
- **Tablet (768px - 1024px):** Balanced multi-column grids, sticky navigation headers.
- **Desktop (1440px):** Max-width containment (`max-w-7xl mx-auto`), comfortable negative space.

### 2. WCAG 2.2 AA Accessibility Mandates
- **Keyboard Operability:** Every interactive element (`<button>`, `<a>`, `<input>`, `<select>`) must be fully reachable and operable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
- **Visible Focus Rings:** Never remove focus outlines (`outline-none`) without providing an explicit, high-contrast Tailwind replacement (e.g. `focus-visible:ring-2 focus-visible:ring-accent-teal`).
- **Touch Targets:** Maintain minimum interactive touch targets of **44px to 48px** for mobile usability.
- **Color Contrast:** Text must satisfy a minimum contrast ratio of `4.5:1` against its background (large text `3:1`). Never rely on color alone to convey state.
- **Semantic HTML:** Use proper landmark elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`) and appropriate heading hierarchy (`h1` through `h4`).

### 3. Motion & Animation Discipline
- Keep animations subtle, functional, and brief ($< 300\text{ms}$).
- Respect user motion preferences via Tailwind's `motion-reduce:` or `prefers-reduced-motion: reduce`.

### 4. Icon & Asset Rules
- Use **Lucide React** icons consistently (`import { ArrowRight, ShieldCheck, ... } from 'lucide-react'`).
- **Never introduce raw emoji** as interface icons.
- Ensure all non-decorative images have descriptive `alt` attributes; decorative images use `alt="" aria-hidden="true"`.

---

## 3. Component Code Pattern

```jsx
import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ExampleCard({ title, description, onAction }) {
  const [loading, setLoading] = useState(false);

  return (
    <article className="card-surface p-6 rounded-2xl border border-border transition-all duration-200">
      <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-6">{description}</p>
      
      <button
        type="button"
        onClick={onAction}
        disabled={loading}
        className="btn-primary min-h-[44px] px-5 py-2.5 inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent-teal"
        aria-label={`Learn more about ${title}`}
      >
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </article>
  );
}
```

