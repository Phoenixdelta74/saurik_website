# UI/UX Designer Lessons

This file records lessons learned by the UI/UX Designer role (`ui_ux_designer`) regarding layouts, responsive viewports, interactions, and accessibility.

---

## Lesson 001: Resilient Hands-Free Loop on Audio Failure

- **Date:** 2026-11-07
- **Role:** UI/UX Designer
- **Task:** Voice Assistant Audio Fallback UI
- **Context:** User device lacking regional voices and encountering network/audio playback failures.
- **Problem:** If audio synthesis failed or threw an error, the hands-free call mode stopped abruptly, requiring the user to manually click the mic button again.
- **Cause:** Audio error callbacks did not schedule relistening.
- **Action:** In `src/hooks/useVoiceAgent.js`:
  - Show a polite, non-intrusive status notice: `"This device has no matching voice installed, so the reply is shown as text only."`
  - Always invoke `scheduleRelisten()` in `audio.onerror` and `audio.onended`, ensuring the microphone reopens smoothly so the conversation continues without human interruption.
- **Evidence:** Tested in `src/hooks/useVoiceAgent.js` and verified in dual-panel ChatWidget.
- **Result:** Hands-free call loop survives any remote audio failure.
- **Status:** Verified
- **Applies when:** Designing or modifying voice interactions, audio players, or hands-free calling states.
- **Next check:** Test hands-free mode under simulated network disconnect.

---

## Lesson 002: WCAG 2.2 AA Focus Trapping and Keyboard Dismissal

- **Date:** 2026-10-09
- **Role:** UI/UX Designer
- **Task:** Chat and Voice Modal Accessibility
- **Context:** Keyboard-only navigation testing on mobile menu and chat dialogs.
- **Problem:** Pressing Escape closed the entire chat widget even when the user just wanted to close the language dropdown; focus was lost into the document body.
- **Cause:** Global keydown handlers lacking event bubbling stops.
- **Action:** Added isolated focus trapping and scoped `stopPropagation()` on dropdown Escape keydown. Ensured min 44px touch targets on mobile switcher tabs.
- **Evidence:** Tested in `test/verify_voice_assistant.cjs` and browser accessibility audits.
- **Result:** Seamless WCAG 2.2 AA keyboard compliance across desktop and mobile.
- **Status:** Verified
- **Applies when:** Building modals, floating widgets, dropdown menus, and tabs.
- **Next check:** Inspect any new floating controls or disclosures.

