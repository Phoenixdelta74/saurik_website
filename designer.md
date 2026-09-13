# SAURIK IT Design & UI/UX Principles Specification

**Version:** 1.0  
**Scope:** Aesthetic rules, color standards, layout guidelines, and visual quality benchmarks for SAURIK IT.

---

## 1. Brand Philosophy: "Light and Precise"

The SAURIK IT aesthetic is **architectural, spacious, and grounded**. Rather than relying on dark sci-fi themes or generic corporate stock art, the design communicates precision through:
- Crisp high-contrast typography (navy on warm white).
- Restrained, purposeful color accents (Teal for software, Royal Blue for hardware).
- Structural white cards with hair-line borders (`#D6E1E5`) and subtle elevations.
- Authentic diagrams that explain workflows rather than decorate.

---

## 2. Color Palette & Accessibility Tokens

| Token Name | Hex Value | Role & Usage | Contrast Ratio (vs Canvas/Surface) |
| :--- | :--- | :--- | :--- |
| `canvas` | `#F7F9F8` | Warm off-white page background. Reduces eye fatigue. | Baseline |
| `surface` | `#FFFFFF` | Content cards, modals, navigation drawers, form panels. | Baseline |
| `ink.primary` | `#102A43` | Deep navy for headings and primary body copy. | **14.2:1** (Exceeds WCAG AAA) |
| `ink.secondary` | `#486174` | Slate blue for secondary explanations, subtitles. | **6.1:1** (Exceeds WCAG AA) |
| `ink.muted` | `#829AB1` | Cool slate for labels, metadata, timestamps. | **3.2:1** (For non-text & large elements) |
| `accent.teal` | `#087F72` | Primary action buttons, software pills, success checks. | **4.6:1** (WCAG AA compliant) |
| `accent.teal-light` | `#E1F2ED` | Soft teal background for badges and chips. | Background tone |
| `accent.blue` | `#2456A6` | Hardware division accents, surveillance tags. | **5.4:1** (WCAG AA compliant) |
| `accent.blue-light` | `#EBF2FC` | Soft blue background for hardware badges and chips. | Background tone |
| `border.subtle` | `#D6E1E5` | Structural separators, card borders, dividers. | 1.3:1 (Structural) |

---

## 3. Typography Rules

### 3.1. Font Families
1. **Headings:** `Outfit` (`font-heading`)
   - Distinctive geometric sans with open counters.
   - Used for all `h1`, `h2`, `h3`, `h4` headings.
   - Always paired with negative letter spacing: `-0.02em` (`tracking-tight`).
2. **Body:** `Inter` (`font-sans`)
   - Industry-standard grotesque sans-serif optimized for legibility at small sizes.
   - Line height set to `1.6` (`leading-relaxed`).
   - Line length constrained to 65–75 characters on desktop for reading comfort.

### 3.2. Scale Table
- **Hero Title (Desktop):** 52px – 60px (`text-5xl lg:text-6xl`), weight `800` (extrabold).
- **Hero Title (Mobile):** 36px – 40px (`text-4xl`), weight `800`.
- **Section Heading:** 30px – 36px (`text-3xl sm:text-4xl`), weight `700` (bold).
- **Sub-headings / Card Titles:** 20px – 24px (`text-xl sm:text-2xl`), weight `700`.
- **Body Regular:** 15px – 16px (`text-sm sm:text-base`), weight `400`.
- **Badges / Meta:** 11px – 12px (`text-xs`), weight `600` or `700` uppercase.

---

## 4. Spacing, Borders & Elevation

### 4.1. 4px / 8px Spatial Grid
- Margins and paddings must always be multiples of 4px or 8px: `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px), `p-12` (48px).
- Section vertical spacing: `space-y-20` (80px) to `space-y-28` (112px).

### 4.2. Radii Tokens
- **Controls & Buttons:** `rounded-control` (`8px`).
- **Cards & Panels:** `rounded-panel` (`14px`).
- **Pills & Badges:** `rounded-full` (`9999px`).

### 4.3. Elevation & Shadows
- **Card Default:** `shadow-subtle` (`0 1px 3px rgba(16, 42, 67, 0.05)`).
- **Card Hover:** `shadow-card-hover` (`0 12px 24px -6px rgba(16, 42, 67, 0.1)`).
- Avoid heavy, muddy black shadows. Always use tinted navy alpha shadows (`rgba(16, 42, 67, ...)`).

---

## 5. UI Component Specifications

### 5.1. Buttons
- **Primary (`.btn-primary`):** Background `#087F72`, text `#FFFFFF`, height ~48px (`py-3 px-6`), rounded 8px. Hover: `#066358`.
- **Secondary (`.btn-secondary`):** Background `#FFFFFF`, border `#D6E1E5`, text `#102A43`. Hover: subtle slate tint.
- **Hardware Action (`.btn-hardware`):** Background `#2456A6`, text `#FFFFFF`. Hover: `#1B4282`.

### 5.2. Service Badges
- **Software:** `.badge-software` (Background `#E1F2ED`, text `#087F72`, uppercase tracking-wider, font size 11px).
- **Hardware:** `.badge-hardware` (Background `#EBF2FC`, text `#2456A6`, uppercase tracking-wider, font size 11px).

### 5.3. Iconography
- Always use `lucide-react` with stroke width `1.75` to `2.0`.
- Size icons proportionally to text: 14px–16px alongside 14px text; 20px–24px inside feature cards.
- **Do not introduce emojis as interface icons.**
