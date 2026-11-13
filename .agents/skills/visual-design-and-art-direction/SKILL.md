---
name: visual-design-and-art-direction
description: Establishes visual identity, typography hierarchy, color palette, imagery guidelines, and Lucide icon discipline for SAURIK IT.
---

# Skill: Visual Design & Art Direction (`visual-design-and-art-direction`)

The `visual-design-and-art-direction` skill governs the aesthetic language, mood, typography, color harmony, and visual assets of the SAURIK IT digital platform.

---

## 1. When to Use

Use this skill when:
- Establishing the visual direction for a new feature, page, or service illustration.
- Selecting color palettes, typography scales, or icon sets.
- Auditing existing pages for visual harmony, contrast, and branding consistency.

---

## 2. Core Visual Identity Principles

### 1. Aesthetic Direction: Light, Spacious, and High-Contrast
- The SAURIK IT design language is light, spacious, and uncluttered.
- Generous white space (comfortable padding and margins) ensures high legibility and an executive, corporate technology aesthetic.

### 2. The SAURIK IT Color Palette
- **Canvas / Background:** Crisp light background (`bg-canvas` / `#f8fafc` / `#ffffff`).
- **Surface / Cards:** Elevated white cards with subtle borders (`bg-surface` / `#ffffff`, border `#e2e8f0`).
- **Primary Ink (Text):** Deep navy (`#0f172a` / `#1e293b`) for maximum contrast and readability.
- **Muted Ink (Secondary Text):** Slate grey (`#475569` / `#64748b`) meeting WCAG 2.2 AA contrast ratios ($\ge 4.5:1$).
- **Software & Primary Actions:** Teal accents (`accent-teal` / `#0d9488`).
- **Hardware & Physical Infrastructure:** Blue accents (`accent-blue` / `#2563eb`).
- **Semantic Accents:** Amber/Orange for warnings/notices, Green for success confirmations.

### 3. Typography Hierarchy
- Clean, modern system sans-serif font stack (`font-sans`: Inter, system-ui, sans-serif).
- **Scale:**
  - `h1`: 36px–48px, bold, tight tracking (`tracking-tight`), leading snug.
  - `h2`: 28px–36px, bold, text-ink.
  - `h3`: 20px–24px, semibold.
  - `body`: 16px, regular, leading relaxed (`leading-relaxed`) for easy reading.
  - `caption / metadata`: 12px–14px, medium, text-ink-muted.

### 4. Icon & Graphic Asset Discipline
- **Strictly Use Lucide React Icons:** Import icons directly from `lucide-react` (e.g. `ShieldCheck`, `Cpu`, `Layers`, `ArrowRight`).
- **Zero Raw Emoji in UI:** Never use raw emojis (🚀, 💻, 💡) as interface icons.
- **Illustration Style:** Structured technical illustrations and flowcharts using clean SVG paths, subtle grid backdrops, and theme tokens.

---

## 3. Visual Specification Output

```markdown
# Visual Direction: [Feature / Section]

## 1. Mood & Tone
- **Tone:** Technical competence, transparent engineering, grounded corporate reliability.
- **Space:** Spacious layout with generous margins (`py-16 md:py-24`).

## 2. Color Application
- **Section Background:** `bg-canvas`
- **Card Containers:** `bg-surface border border-border rounded-2xl shadow-sm`
- **Action CTAs:** `bg-accent-teal text-white hover:bg-teal-700`

## 3. Typography & Icons
- **Headings:** Inter bold, text-ink (`#0f172a`).
- **Icons Selected:** `Lucide: [IconName1, IconName2]` (20px, stroke-width 1.75).
```

