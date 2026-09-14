# Platform adapters and installation

The core skill is portable. Each platform must discover its own terminal, file inspection/editing, browser automation, screenshot, and test tools. Do not name a tool as available unless the platform exposes it in the current session.

## Codex

Install the core folder at `$CODEX_HOME/skills/web-release-tester` (normally `~/.codex/skills/web-release-tester`) and keep `agents/openai.yaml`. Automatic invocation is enabled. Invoke explicitly with `$web-release-tester` or ask for a release test. Validate with the bundled `skill-creator/scripts/quick_validate.py` against the installed folder. Browser and terminal capabilities vary by session; report unavailable capabilities.

## Claude Code

Copy the shared `SKILL.md` to `.claude/skills/web-release-tester/SKILL.md` in a repository or to the user's Claude skills location according to local policy. Invoke with the skill name or a matching testing request. Copy relevant `references/` and `scripts/` alongside it. Do not copy Codex-only metadata; Claude must discover its own tools and permission model.

## Google Antigravity

Copy the shared `SKILL.md` to `.agents/skills/web-release-tester/SKILL.md` and copy relevant `references/` and `scripts/`. Invoke the skill or a matching testing request. Do not assume browser, terminal, screenshot, or file APIs; inspect what is exposed and record limitations.

## Cursor

Place `commands/web-release-test.md` at `.cursor/commands/web-release-test.md` for manual invocation and `rules/web-release-test.mdc` at `.cursor/rules/web-release-test.mdc` for Agent Requested activation. Copy relevant core references/scripts. Cursor rules are an adapter, not a replacement for the platform-neutral core; use only when the user requests execution and preserve read-only authorization.

## Adapter validation

Confirm each adapter points to the shared workflow, contains no unfinished placeholders, preserves the authorization boundary, and explains its installation and invocation. Validate the core with `quick_validate.py`; then perform a read-only exercise in an isolated or current project and inspect the resulting report for status/evidence/limitation distinctions.
