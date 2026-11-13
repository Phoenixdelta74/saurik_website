# Design Specification: Contact Form (`FEAT-001`)

## 1. Specification Metadata
- **Feature ID:** `FEAT-001`
- **Related Requirements:** [`docs/product/contact-form-requirements.md`](file:///c:/Saurik/saurik_website/docs/product/contact-form-requirements.md)
- **Designer:** UI/UX Designer (`role-ui-ux-designer`)
- **Status:** Approved Reference Spec

---

## 2. Page Structure & Hierarchy

```
1. Header & Navigation: Brand logo + nav links + active state on "Contact"
2. Page Hero: Heading "Contact SAURIK IT" + Subtitle + Direct channels
3. Content Grid (Split 2-Column on Desktop, Stacked on Mobile):
   ├── Column A: Direct contact info (Phone, Email, Operational Address)
   └── Column B: Interactive Enquiry Form
4. Footer: Global links & company credentials
```

---

## 3. Form Fields & Interaction States

### Form Fields
1. **Service Topic:** Select dropdown (Pre-populated from `?service=` URL parameter).
2. **Full Name:** Text input (`required`, visible `<label>`).
3. **Phone Number:** Tel input (`required`, pattern validation).
4. **Company Name:** Text input (`optional`, helpful note: "Optional for residential CCTV").
5. **Message:** Textarea (`optional`, placeholder: "Tell us about your requirements...").

### The 8 Mandatory Interaction States
| State | Visual Treatment | Accessibility Expectation |
|---|---|---|
| **Default** | White surface (`bg-surface`), border `border-border`, navy label `text-ink`. | Visible `<label htmlFor="...">`. |
| **Hover** | Subtle border darkening (`hover:border-slate-400`). | Pointer cursor. |
| **Focus** | High-contrast visible focus ring (`focus-visible:ring-2 focus-visible:ring-accent-teal`). | Never suppressed via `outline-none`. |
| **Filled** | Text ink dark (`text-ink`), border intact. | Read by screen reader. |
| **Validation Error** | Red border (`border-red-500`), error icon, inline message. | `aria-invalid="true"`, `aria-describedby="[field]-error"`. |
| **Submitting** | Submit button disabled, inline spinner, button text "Preparing Draft...". | `aria-busy="true"`. |
| **Success Confirmation** | Green check banner: *"Draft prepared in [Channel]."* | Live region announcement (`aria-live="polite"`). |
| **Failure & Recovery** | Amber warning banner with telephone fallback; **form inputs remain 100% populated**. | Focus moved to error banner. |

---

## 4. Responsive Adaptation

- **Mobile Viewport (360px - 767px):**
  - Strict 1-column stack. Contact information appears first, followed immediately by the form.
  - Buttons have a minimum height of `48px` (`min-h-[48px]`) with edge-to-edge tap zones.
- **Desktop Viewport ($\ge 1024\text{px}$):**
  - Side-by-side 2-column layout (40% contact details, 60% form).
  - Maximum container width constrained to `max-w-7xl mx-auto px-6`.

---

## 5. Accessibility Expectations (WCAG 2.2 AA)
- [x] Text contrast ratio $\ge 4.5:1$ on all labels and placeholder hints.
- [x] Form inputs programmatically associated with visible `<label>` tags.
- [x] Visible focus rings on all interactive elements during keyboard traversal.
- [x] Form values strictly preserved during submission recovery path.
