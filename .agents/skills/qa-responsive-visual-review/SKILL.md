---
name: qa-responsive-visual-review
description: Audits rendering across 360px–1440px viewports, text overflow, image cropping, and layout fidelity against design tokens for SAURIK IT.
---

# Skill: Responsive & Visual Quality Audit (`qa-responsive-visual-review`)

The `qa-responsive-visual-review` skill verifies that implemented interfaces render cleanly, legibly, and consistently across diverse device form factors without visual artifacts, clipped text, or broken layouts.

---

## 1. When to Use

Use this skill when:
- Auditing new or modified pages across desktop and mobile viewports.
- Verifying responsive breakpoint transitions (e.g. 360px, 768px, 1024px, 1440px).
- Checking layout integrity after CSS or design token changes.

---

## 2. The 5-Viewport Audit Matrix

Every page must be inspected at each of the 5 standard viewport widths:

### 1. Mobile Small (360px)
- **Zero Horizontal Scroll:** Ensure `document.documentElement.scrollWidth === window.innerWidth`.
- **Text Wrapping:** Ensure headlines do not break awkwardly or overflow card bounds.
- **Touch Targets:** Verify buttons and interactive targets are at least 44px by 44px with comfortable finger padding.

### 2. Mobile Standard (390px)
- Check mobile drawer navigation: opens smoothly, traps focus, closes on `Escape` or backdrop tap.
- Verify sticky bottom actions or contact buttons do not obscure essential content.

### 3. Tablet (768px)
- Verify transition from 1-column stack to 2-column grid.
- Ensure images and card containers scale proportionally without blurry upscaling.

### 4. Desktop Standard (1024px)
- Verify horizontal navigation bar renders cleanly with all links visible.
- Check multi-column service cards and side-by-side forms.

### 5. Wide Desktop (1440px)
- Ensure container max-width containment (`max-w-7xl mx-auto`) prevents uncomfortable stretching.
- Verify balanced margins and white space.

---

## 3. Visual Defect Checklist

Check specifically for these common frontend flaws:
- [ ] Text clipping or horizontal overflow on 360px screen width.
- [ ] Overlapping text or buttons when browser zoom is set to 200%.
- [ ] Images stretched or distorted due to missing `object-fit: cover` or broken aspect ratios.
- [ ] Unstyled flashes or layout shifts during component mounting.
- [ ] Inconsistent card heights causing ragged grid baselines.

---

## 4. Responsive Audit Output Format

```markdown
# Responsive & Visual Audit: [Page Name]

## 1. Viewport Matrix Results
| Viewport Width | Device Emulation | Layout Integrity | Horizontal Scroll | Touch Targets | Status |
|---|---|---|---|---|---|
| **360px** | Small Phone | 1-Column Stack | None (Pass) | $\ge 44\text{px}$ | PASS |
| **390px** | iPhone 14 | 1-Column Stack | None (Pass) | $\ge 44\text{px}$ | PASS |
| **768px** | iPad Portrait | 2-Column Grid | None (Pass) | $\ge 44\text{px}$ | PASS |
| **1024px** | iPad Landscape | 3-Column Grid | None (Pass) | $\ge 44\text{px}$ | PASS |
| **1440px** | Desktop Wide | Contained (7xl) | None (Pass) | $\ge 44\text{px}$ | PASS |

## 2. Visual Artifacts Identified
- None observed / [List of visual anomalies with viewport width and CSS fix]
```

