---
name: web-release-tester
description: Test and diagnose websites or web applications for release readiness, including build/runtime, functional, responsive, accessibility, SEO, performance, security, privacy, and integration checks. Use when execution and evidence are requested; do not activate for purely theoretical explanations or code review without testing.
---

# Web Release Tester

Test the application in scope and produce an evidence-backed release assessment. Detect the repository's framework, scripts, package manager, browser, terminal, screenshot, and testing capabilities before choosing methods. Do not assume a particular agent, IDE, browser, or MCP tool.

## Authorization

Testing and diagnosis are read-only by default. Do not edit application files, configuration, dependencies, production data, or external systems unless the user explicitly authorizes fixes. Never submit live contact forms, create accounts, send messages, place orders, upload private files, or modify production data merely to test. Use safe data and a non-production target when possible. A successful `mailto:` or WhatsApp handoff is not proof that an enquiry or email was received. Treat missing credentials, unavailable providers, and untested production behavior as `Not tested` or `Blocked`, never as a pass.

## Required workflow

1. Read repository guidance, `AGENTS.md`, project structure, package scripts, framework/configuration, routes, current changes, and available tooling. Run `scripts/detect_tooling.py` when Python is available, or perform the same inspection with available tools.
2. Establish a baseline before any authorized change: record working-tree state, environment limitations, detected commands, route inventory, and the version/URL under test.
3. Select the platform-appropriate package command. On Windows prefer `npm.cmd` when ordinary `npm` resolution is unreliable. Run existing checks before inventing new ones: build, lint, type checking, unit, integration, and end-to-end tests.
4. Select additional checks from [references/test-matrix.md](references/test-matrix.md) based on actual features and risk. Use browser interaction and screenshots when available; otherwise state the limitation.
5. Record every check as `Pass`, `Fail`, `Warning`, or `Not tested`. Preserve command output, URLs, viewport, browser/version, timestamps, screenshots, and other safe evidence. Never print secrets, tokens, passwords, private payloads, or personal information.
6. For each failure, document observable behavior, expected behavior, reproduction steps, severity, evidence, and likely cause labeled `confirmed` or `inferred`.
7. Retest only after an explicitly authorized fix. Recheck the complete final state and distinguish verified results from owner verification.
8. Use [references/report-format.md](references/report-format.md) as the report structure and end with one executive result: `Release-ready`, `Conditionally ready`, `Not release-ready`, or `Assessment incomplete`.

## Coverage rules

Cover applicable build/runtime, functional, responsive, accessibility, SEO, performance, security/privacy, and integration checks. Directly navigate and refresh every public route, check custom 404 behavior, and test representative widths 360, 390, 768, 1024, and 1440 px when supported. Do not infer responsive or browser passes from source code or a viewport meta tag. Distinguish UI rendering from successful backend/provider operation and local laboratory measurements from real-user production data.

Read the focused references only when relevant:

- [test-matrix.md](references/test-matrix.md): detailed checks and safe integration boundaries.
- [report-format.md](references/report-format.md): reusable report template and severity/status rules.
- [platforms.md](references/platforms.md): installation, invocation, tool limitations, and validation for Codex, Claude Code, Google Antigravity, and Cursor.
- [saurik-it.md](references/saurik-it.md): load only for the SAURIK IT website or an explicit SAURIK IT request.

The `.claude`, `.agents`, and `.cursor` files are adapters for their respective platforms; the core above remains platform-neutral.
