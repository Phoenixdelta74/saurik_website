# Release test report template

## Executive result

`Release-ready` | `Conditionally ready` | `Not release-ready` | `Assessment incomplete`

Scope: [repository/version/URL]
Environment: [OS, browser/device, viewport(s), runtime/tool versions]
Authorization boundary: [read-only or explicitly authorized fixes]

## Evidence summary

| Area | Status | Evidence | Risk |
|---|---|---|---|
| Build/runtime | Pass/Fail/Warning/Not tested | [command, URL, screenshot, log] | [none/low/medium/high/critical] |
| Functional |  |  |  |
| Responsive |  |  |  |
| Accessibility |  |  |  |
| SEO |  |  |  |
| Performance |  |  |  |
| Security/privacy |  |  |  |
| Integrations |  |  |  |

## Findings

Order by Critical, High, Medium, Low. For each actionable item include:

- Affected route/file and severity.
- Reproduction steps.
- Expected result and actual observable result.
- Evidence: command output, console/network observation, screenshot, or safe URL.
- Likely cause: `confirmed` or `inferred`.
- Recommended remediation and retest condition.

## Test execution record

| Check | Command or method | Result | Notes |
|---|---|---|---|
| [check] | [command or browser method] | Pass/Fail/Warning/Not tested | [evidence/limitation] |

## Coverage limitations

List untested browsers, devices, viewports, services, credentials, production environments, integrations, routes, and scenarios. Include blocked checks and why they were blocked.

## Final recommendation

- Safe to release: [verified scope]
- Must fix first: [blocking findings]
- Owner verification required: [credentials, provider, production, or policy checks]
- Next smallest useful testing step: [one concrete action]
