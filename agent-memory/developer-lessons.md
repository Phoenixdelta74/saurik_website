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

---

## Lesson 003: Sentence-Pipelined Audio Queue for Low Time To First Audio (TTFA)

- **Date:** 2026-11-13
- **Role:** Fullstack Developer
- **Task:** FEAT-002 Maya TTS Latency Mitigation & Sentence Pipelining
- **Context:** Regional voice synthesis on serverless GPU takes ~4.5s for whole paragraphs before playback begins.
- **Problem:** Users experience a long, awkward pause before the voice assistant speaks.
- **Cause:** Waiting for the entire audio buffer to generate, download, and decode before creating an `Audio` element.
- **Action:** Implemented `splitSentencesForSpeech` and sequential chunk pipelining in `src/hooks/useVoiceAgent.js`:
  - Fetch Sentence 1 immediately and start playing audio as soon as it arrives (~600–800ms).
  - Concurrently prefetch Sentence 2 while Sentence 1 is playing, stitching consecutive sentences with a 100ms prosodic rest.
  - Abort active chunk requests using `AbortController` on user barge-in or `cancelSpeech`.
- **Evidence:** Verified in `test/verify_tts_latency.cjs` and `npm test` (11/11 passing).
- **Result:** Perceived speech latency drops from 4.5s down to $\le 1.2$s with zero acoustic popping.
- **Status:** Verified
- **Applies when:** Integrating streaming TTS, AI audio synthesis, or LLM-driven voice assistants.
- **Next check:** Measure real-world mobile network latency on 4G connections.

---

## Lesson 004: Token Starvation from LLM Reasoning on Tight Voice Budgets

- **Date:** 2026-11-13
- **Role:** Fullstack Developer
- **Task:** Voice Chat Assistant Truncation & Token Exhaustion Remediation
- **Context:** Deploying voice assistant to Vercel with OpenRouter (Gemini 2.5 Flash) and Maya TTS.
- **Problem:** Chat assistant responses were truncated to 2–3 words ("Greetings! SA", "নমস্কার! SAUR", "I understand perfectly and I'm") appearing as if the chat crashed mid-sentence.
- **Cause:** Two compounding factors:
  1. Voice queries had an overly restrictive `max_tokens: 180`.
  2. OpenRouter reasoning models (e.g., Gemini 2.5 Flash) count internal chain-of-thought tokens against `max_tokens`. Even with `reasoning: { effort: 'low', exclude: true }`, the model spent ~165 tokens reasoning, leaving only ~15 tokens for visible completion before hard-capping.
- **Action:**
  1. In `api/_lib/llmProviders.js`, explicitly pass `extraBody: { reasoning: { max_tokens: 0 } }` to completely disable thinking tokens on OpenRouter.
  2. Increased voice `maxTokens` from 180 to 450 tokens to ensure ample headroom for multi-sentence Indic (Bengali/Hindi) and English replies.
  3. Increased `guardRequest` rate limit in `api/tts.js` from 10 to 30 requests/min to accommodate multi-sentence chunk pipelining without 429 throttling.
- **Evidence:** Tested locally and verified with `npm.cmd test` (11/11 passing) and `npm.cmd run build` (17/17 routes pre-rendered).
- **Result:** Voice and text responses complete naturally without token starvation or premature cut-offs.
- **Status:** Verified
- **Applies when:** Using reasoning/thinking models (Gemini 2.5, DeepSeek R1, o-series) on OpenRouter or OpenAI with tight token budgets.
- **Next check:** Verify response completeness on deployed Vercel instance.


