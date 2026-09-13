# SAURIK IT Website Maintenance Guide

**Version:** 1.0  
**Scope:** Operating procedures for developers, maintainers, and autonomous agents maintaining `saurik-it-website`.

---

## 1. Routine Maintenance Schedule

| Cadence | Task | Scope & Command |
| :--- | :--- | :--- |
| **Weekly** | Dependency Security Audit | Run `npm audit` to inspect CVEs. Apply non-breaking fixes with `npm audit fix`. |
| **Monthly** | Contact & Verification Check | Verify official email (`contact@wwwsaurikit.com`) and WhatsApp (`98620 87157`) are functioning. |
| **Monthly** | Core Web Vitals & Build Test | Run `npm run build` and check bundle size output. Inspect build warnings. |
| **Quarterly** | Content Review | Review capability deliverables in `src/data/softwareData.js` and `src/data/hardwareData.js`. |

---

## 2. Content & Business Data Updates

All content is centralized in `src/data/`. **Never alter page JSX directly to update business copy.**

### 2.1. Updating Contact Details
Edit `src/data/companyData.js`:
```javascript
export const COMPANY_INFO = {
  name: "SAURIK IT Private Limited",
  email: "contact@wwwsaurikit.com",      // Updates footer, contact card, mailto
  phone: "98620 87157",                  // Raw digits for tel: links
  phoneDisplay: "+91 98620 87157",        // Formatted display
  whatsappNumber: "919862087157",        // Digits with country code (91)
  whatsappLink: "https://wa.me/919862087157?text=...",
  operatingHours: "Monday to Saturday, 9:30 AM – 6:30 PM IST",
};
```

### 2.2. Adding or Modifying Software Capabilities
Edit `src/data/softwareData.js`:
1. Add an entry to `SOFTWARE_CAPABILITIES` array.
2. Specify `id` (for hash scrolling `#my-cap`), `topicKey` (for `/contact?topic=my-cap`), `title`, `subtitle`, `summary`, `problemSolved`, and array of `deliverables`.
3. In `src/pages/Software.jsx`, map your `topicKey` to a Lucide icon in `capabilityIcons`.

### 2.3. Updating Hardware Offerings
Edit `src/data/hardwareData.js`:
- To update CCTV specifications, edit `routes.business` or `routes.home`.
- To update Computers or Servers, adjust `scope` arrays.
- Always retain the explicit clarification on servers: *on-premise installation and servicing only; no public cloud hosting.*

---

## 3. Brand Assets & Logo Maintenance

Brand assets live in `public/`:
- `public/logo.png` (1024x1024 RGBA transparent PNG): Full brand logo (S-constellation mark + "SAURIK" lettering). Used in `Logo.jsx`, hero cards, and about cards.
- `public/logo-mark.png` (830x800 RGBA transparent PNG): Cropped S-constellation mark. Used as the favicon and Apple touch icon in `index.html`.
- `public/favicon.svg`: SVG fallback icon.

### Updating the Logo
1. When replacing `public/logo.png`, ensure it has a transparent background (alpha channel) and uses high-resolution dimensions (>= 512x512).
2. Generate the cropped mark into `public/logo-mark.png`.
3. Test rendering at both 48px navbar size and 128px showcase size.

---

## 4. Build, Deployment & Production Workflows

### 4.1. Development Server
```bash
npm run dev
# Starts local Vite server at http://localhost:3000
```

### 4.2. Production Build
```bash
npm run build
# Outputs minified production assets to dist/
```

### 4.3. Local Preview of Production Build
```bash
npm run preview
# Serves dist/ locally
```

---

## 5. Troubleshooting Common Issues

### Issue A: `[SyntaxError] Unexpected token '﻿', "﻿{... is not valid JSON`
- **Cause:** PowerShell on Windows wrote a UTF-8 Byte Order Mark (BOM: `﻿`) into a configuration file (`package.json` or `postcss.config.js`).
- **Fix:** Strip the BOM character using Node.js:
  ```bash
  node -e "const fs=require('fs'); let c=fs.readFileSync('package.json','utf8').replace(/^﻿/,''); fs.writeFileSync('package.json',c,'utf8');"
  ```

### Issue B: Form feedback claims message sent when no server responded
- **Constraint:** Per `design.md` and `AGENTS.md`, the contact form must clearly state: *"Your email draft is ready. Send it from your email app."* Do not alter this to claim an enquiry was received by the server unless an authenticated HTTP API status 200 is confirmed.

### Issue C: Floating WhatsApp button obscuring mobile inputs
- **Rule:** `WhatsAppCTA.jsx` is positioned at `bottom-6 right-6`. It uses an expandable popover that collapses on click or Escape key, ensuring form inputs and submit buttons remain fully accessible.
