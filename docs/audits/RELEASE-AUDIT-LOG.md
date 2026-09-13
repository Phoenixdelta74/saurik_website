# Release audit log

## Release: modernization-step-1 - 2026-09-13
- Scope: Homepage hierarchy, process presentation, and responsive header correction.
- Auditor: Codex (auditor-executed; no delegated testing agent used for this bounded content/layout step).
- Decision: GO
- Checks: `npm.cmd run build` passed; responsive Chrome checks passed at 360, 390, 768, 1024, and 1440 pixels; visual captures reviewed.
- Testing-agent runs: Not required for this bounded content/layout change; responsive and structural checks were executed directly.
- Findings: WEB-RESP-001 High, resolved - header actions caused horizontal overflow below 390 pixels because shared button display rules overrode `hidden` utilities.
- Open risks and owners: Approved proof assets and factual company/contact confirmations remain owner inputs for later modernization steps.
- Evidence: `src/pages/Home.jsx`, `src/components/ProcessTimeline.jsx`, `src/components/Header.jsx`, `scratch/responsive-smoke.mjs`.
- Follow-up/retest: Continue with Step 2 unsupported-claim review and rerun the production build after that isolated change.

## Release: modernization-step-2 - 2026-09-13
- Scope: Public claims across home, software, hardware, company, privacy, and related shared components.
- Auditor: Codex (auditor-executed; no delegated testing agent used for this content and disclosure change).
- Decision: GO
- Checks: Prohibited-claim scan passed with no matches; `npm.cmd run build` passed; six public routes passed Chrome smoke checks at 390 and 1440 pixels.
- Testing-agent runs: Not required for this bounded content change; claim, route, metadata, query-selection, runtime-exception, undefined-text, overflow, and visual checks were executed directly.
- Findings: WEB-CONTENT-001 High, resolved - unsupported promises and credentials; WEB-PRIV-001 High, resolved - privacy text described collection and policies not implemented by the client-only handoff; WEB-CONTENT-002 Medium, resolved - illustrative AI and analytics examples could be read as client outcomes.
- Open risks and owners: Step 3 proof content requires owner-approved public material; owner to provide asset, caption, and permission confirmation.
- Evidence: `src/data/companyData.js`, `src/data/softwareData.js`, `src/data/hardwareData.js`, `src/pages/Privacy.jsx`, `scratch/route-smoke.mjs`, `MODERNIZATION_PROGRESS.md`.
- Follow-up/retest: Add and verify approved proof content when supplied; do not substitute fabricated or unlabeled examples.

## Release: software-capability-priority - 2026-09-13
- Scope: Owner-approved Software & IT capability priority, Mobile App Development addition, enquiry routing, supporting metadata, and documentation.
- Auditor: Codex (auditor-executed; no delegated testing agent used for this bounded content, navigation, and responsive-layout change).
- Decision: GO
- Checks: `npm.cmd run build` passed; capability-priority Chrome smoke passed at 360, 390, 768, 1024, and 1440 pixels; six-route smoke passed at 390 and 1440 pixels; mobile and desktop visual captures reviewed.
- Testing-agent runs: Not required for this bounded change; order, anchor, query preselection, metadata, explainer adjacency, runtime exceptions, undefined text, and horizontal overflow were tested directly.
- Findings: None open. Existing capability anchors and query topics remain available; the new mobile-app capability uses scoped, non-guaranteed delivery language.
- Open risks and owners: Modernization Step 3 still requires owner-approved public proof material; owner to provide the asset, exact caption, and permission confirmation.
- Evidence: `src/data/softwareData.js`, `src/pages/Software.jsx`, `src/pages/Contact.jsx`, `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/components/Footer.jsx`, `src/components/PageMetadata.jsx`, `scratch/capability-priority-smoke.mjs`, `scratch/route-smoke.mjs`, `MODERNIZATION_PROGRESS.md`.
- Follow-up/retest: Add and verify approved proof content when supplied; rerun capability and route smoke checks after future navigation or service-copy changes.
