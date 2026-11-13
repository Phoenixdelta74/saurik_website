---
name: systematic-debugging
description: Investigates and resolves defects methodically using reproduction, root-cause hypothesis, focused testing, and regression verification for SAURIK IT. Respects the 2-attempt anti-thrashing circuit breaker.
---

# Skill: Systematic Debugging (`systematic-debugging`)

The `systematic-debugging` skill enforces a scientific, evidence-based methodology for diagnosing and resolving software defects. It eliminates "guess-and-check" thrashing and ensures that bugs are fixed at their true root cause.

---

## 1. When to Use

Use this skill when:
- Investigating automated test failures (`npm test`).
- Diagnosing production build or prerender errors (`npm run build`).
- Triaging a defect report submitted by the QA Reviewer.
- Resolving network timeouts, runtime exceptions, or broken layout states.

---

## 2. The 6-Step Systematic Debugging Protocol

```
1. Reproduce ──► 2. Inspect Error ──► 3. Form Hypothesis ──►
4. Focused Test ──► 5. Fix Root Cause ──► 6. Verify & Prevent
```

### Step 1: Reproduce the Defect
- Never attempt to fix an issue without a reliable reproduction command or script.
- Execute the specific failing test (e.g. `node test/verify_track_spec_v3.cjs`) or test the affected component locally.

### Step 2: Inspect Error Logs & Stack Traces
- Read the exact error output, line number, and stack trace.
- Distinguish symptoms (e.g. `TypeError: Cannot read properties of undefined`) from the root cause (e.g. unhandled asynchronous state).

### Step 3: Formulate a Specific Root-Cause Hypothesis
- Formulate a falsifiable statement: *"The prerender script fails because the window object is referenced during static node execution."*

### Step 4: Test the Hypothesis with a Focused Check
- Apply a minimal, targeted change or log assertion to prove or disprove the hypothesis.

### Step 5: Fix the Root Cause
- Fix the structural problem at its origin—do not merely mask the symptom or silence the error with an empty catch block.

### Step 6: Verify Fix & Prevent Regressions
- Re-run the reproduction command and verify it passes.
- Run the full suite (`npm test`) and production build (`npm run build`) to confirm zero secondary regressions.

---

## 3. Anti-Thrashing Circuit Breaker (Max 2 Attempts)

- **Hard Rule:** If a fix fails twice in succession, **STOP IMMEDIATELY**.
- Do not make a third blind attempt.
- Document the exact error, the 2 attempted fixes, and escalate to **You (Human Decision Maker)** or the Solution Architect.

---

## 4. Post-Debug Memory Recording

If the bug revealed a subtle framework quirk, platform bug, or non-obvious pitfall:
- Invoke **`team-learning`** to record the lesson in [`agent-memory/developer-lessons.md`](file:///c:/Saurik/saurik_website/agent-memory/developer-lessons.md) with structured evidence.

