---
name: qa-browser-testing
description: Exercises end-to-end user journeys in the browser, testing navigation, form submissions, feedback copy, and network failures for SAURIK IT.
---

# Skill: Browser & User-Flow Testing (`qa-browser-testing`)

The `qa-browser-testing` skill guides the execution of realistic visitor journeys through the live or preview web application, validating functional behavior, state transitions, and error recovery from a real user's perspective.

---

## 1. When to Use

Use this skill when:
- Testing new interactive workflows, contact flows, or search features.
- Verifying client-side state machines, modal dialogs, and navigation disclosures.
- Validating that forms operate correctly on live DOM elements without console errors.

---

## 2. Core Browser Testing Protocol

### 1. The Real User Journey Walkthrough
Execute steps sequentially as an authentic visitor:
1. **Entry:** Navigate directly to the target URL or route from navigation.
2. **Scan:** Verify page paints with correct heading hierarchy, readable text, and no layout shifts.
3. **Interact:** Click links, toggle disclosures, and fill in form inputs.
4. **Trigger:** Initiate form submission or action.
5. **Observe:** Inspect loading spinners, disabled button states, and final confirmation copy.

### 2. Testing Component State Sequences
Observe that the UI transitions correctly through all mandatory states:
$$\text{Idle} \longrightarrow \text{Pending / Loading (Button Disabled)} \longrightarrow \text{Success / Failure (Input Preserved)}$$

### 3. Inspecting Browser Console & Network
- Check browser developer tools / console output for uncaught exceptions, unhandled Promise rejections, or React hydration warnings.
- Inspect network requests: verify HTTP payload, method (`POST`), response headers (`X-TTS-Engine`), and response status codes.

### 4. Critical Delivery Verification Boundary
- **A visible success banner does NOT prove backend delivery.**
- If testing an inquiry form that triggers email or external APIs, verify delivery at a safe test destination (e.g. test inbox).
- If live credentials are unconfigured, explicitly document: *"UI draft preparation PASSED; real notification delivery UNTESTED (provider keys not configured in test environment)."*

---

## 3. Browser Test Log Output Format

```markdown
# Browser Test Log: [User Flow Name]

## 1. Environment & Setup
- **URL Tested:** `http://localhost:5173/contact?service=cctv`
- **Browser / Viewport:** Chrome / Desktop (1440px) & Mobile Emulation (375px)

## 2. Step-by-Step Execution
1. Loaded `/contact?service=cctv`: Verified topic dropdown auto-selects "CCTV Installation".
2. Left Name blank, entered phone, clicked submit: Observed inline error "Name is required".
3. Entered Name, clicked "Continue via WhatsApp": Observed WhatsApp draft opened in new tab.
4. Verified on-page status: Displays "Draft prepared in WhatsApp. Please send message to complete enquiry."

## 3. Findings & Console Audit
- **Console Errors:** 0 errors, 0 warnings.
- **Network Request:** `POST /api/...` returned `200 OK` in 142ms.
- **Delivery Status:** Local draft prepared (PASS). Live SMS/Email delivery (UNTESTED).
```

