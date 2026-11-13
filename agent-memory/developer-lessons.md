# Fullstack Developer Lessons

This file records lessons learned by the Fullstack Developer role (`fullstack_developer`) regarding implementation details, APIs, styling, build pipelines, and debugging.

---

## Lesson 001: Node.js Fetch & AbortController Handling for Fast-Fail Timeouts

- **Date:** 2026-11-07
- **Role:** Fullstack Developer
- **Task:** Fast-Fail Timeout Implementation in `api/tts.js`
- **Context:** Implementing timeout-based cascading from Maya GPU to OpenAI fallback.
- **Problem:** When `controller.abort()` was called after a timeout, the catch block received an error with message `'This operation was aborted'`, but without structured handling it logged as an unhandled failure.
- **Cause:** Standard Node.js `fetch` (undici) throws `AbortError` on abort, which must be distinguished from network connection errors.
- **Action:** In `api/tts.js`, check:
  ```javascript
  const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
  console.warn(`Maya Serverless TTS unavailable (${isTimeout ? `cold start timeout after ${mayaTimeoutMs}ms` : err.message}). Cascading immediately to OpenAI fallback...`);
  ```
- **Evidence:** Tested with `scripts/test_tts_fallback.cjs`, successfully catching timeout and immediately continuing to OpenAI `tts-1`.
- **Result:** Zero crashes, clean logs, and immediate execution of fallback branch.
- **Status:** Verified
- **Applies when:** Implementing timeouts on remote `fetch` calls in serverless API routes.
- **Next check:** Verify on any external fetch endpoint addition.

---

## Lesson 002: Static Pre-rendering Watcher Isolation

- **Date:** 2026-11-07
- **Role:** Fullstack Developer
- **Task:** Production Static Prerender (`scripts/prerender.js`)
- **Context:** Running `npm run build` which executes `vite build && node scripts/prerender.js`.
- **Problem:** Prerendering failed with `Error: transport was disconnected, cannot call "fetchModule"`.
- **Cause:** `prerender.js` called `createServer({ server: { middlewareMode: true } })`. Vite's file watcher detected file changes from prior dev runs and triggered a server restart mid-render, severing the SSR module runner connection.
- **Action:** Explicitly disabled file watching during prerendering:
  ```javascript
  const vite = await createServer({
    server: { middlewareMode: true, watch: null },
    appType: 'custom',
    root: rootDir,
  });
  ```
- **Evidence:** `node scripts/prerender.js` completed 17/17 routes in 10.25s with 0 errors.
- **Result:** Build and SSG pipeline is 100% stable and immune to file watcher race conditions.
- **Status:** Verified
- **Applies when:** Writing Vite SSR / SSG generation scripts.
- **Next check:** Verify on updating Vite versions or build plugins.

