#!/usr/bin/env node
/**
 * SAURIK IT — Automated Verification Suite: Multi-Tier Resilient TTS Fallback Engine
 * Tests the fast-fail timeout cascading logic:
 *   Tier 1: Maya 2 Native Serverless GPU (Primary when warm)
 *   Tier 2: OpenAI tts-1 (Instant Cloud Fallback when Maya is cold >7.5s or unreachable)
 *   Tier 3: Graceful text-only degradation when all remote providers are unavailable
 */

const fs = require('fs');
const path = require('path');

console.log('\n======================================================');
console.log('   SAURIK IT — MULTI-TIER TTS FALLBACK AUDIT SUITE');
console.log('======================================================\n');

// Load environment from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const mockReq = (body) => ({
  method: 'POST',
  body,
  headers: { host: 'localhost:3000' },
  socket: { remoteAddress: '127.0.0.1' },
});

const mockRes = () => {
  const headers = {};
  let statusCode = 200;
  let responseData = null;

  const res = {
    setHeader: (k, v) => {
      headers[k.toLowerCase()] = v;
      return res;
    },
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (data) => {
      headers['content-type'] = 'application/json';
      responseData = data;
      return res;
    },
    send: (data) => {
      responseData = data;
      return res;
    },
    end: (data) => {
      if (data && !responseData) responseData = data;
      return res;
    },
    getStatusCode: () => statusCode,
    getHeaders: () => headers,
    getData: () => responseData,
  };
  return res;
};

let failed = false;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ [PASS] ${message}`);
  } else {
    console.error(`  ✖ [FAIL] ${message}`);
    failed = true;
  }
}

async function runTests() {
  const ttsModule = await import('../api/tts.js');
  const handler = ttsModule.default;

  // Test 1: Simulated Maya Outage -> Cascade to OpenAI tts-1
  console.log('1. Testing Fast-Fail Cascade (Maya Offline -> OpenAI tts-1)...');
  const originalMayaEndpoint = process.env.MAYA_TTS_ENDPOINT;
  const originalOpenAIKey = process.env.OPENAI_API_KEY;

  try {
    // Point Maya to non-existent local port to simulate immediate connection failure / offline
    process.env.MAYA_TTS_ENDPOINT = 'http://127.0.0.1:54321/offline';
    process.env.MAYA_TTS_TIMEOUT_MS = '2000'; // 2s fast-fail for test

    const req1 = mockReq({ text: 'সৌরিক আইটিতে আপনাকে স্বাগতম।', lang: 'bn-IN' });
    const res1 = mockRes();

    const startTime = Date.now();
    await handler(req1, res1);
    const duration = Date.now() - startTime;

    assert(res1.getStatusCode() === 200, `Returned HTTP 200 OK (got ${res1.getStatusCode()})`);
    assert(
      res1.getHeaders()['x-tts-engine'] === 'openai-tts-1',
      `Header X-TTS-Engine correctly identifies 'openai-tts-1' fallback (got ${res1.getHeaders()['x-tts-engine']})`
    );
    assert(
      res1.getHeaders()['content-type'] === 'audio/mpeg',
      `Header Content-Type is 'audio/mpeg' from OpenAI fallback`
    );
    assert(
      Buffer.isBuffer(res1.getData()) && res1.getData().length > 1000,
      `Generated audio buffer size > 1KB (${(res1.getData()?.length || 0) / 1024} KB)`
    );
    assert(duration < 10000, `Cascading completed swiftly in ${(duration / 1000).toFixed(2)}s`);
  } catch (err) {
    assert(false, `Test 1 threw error: ${err.message}`);
  }

  // Test 2: Complete Remote Provider Failure -> Graceful 502 with text-only fallback payload
  console.log('\n2. Testing Graceful Degradation (Both Maya & OpenAI Unavailable)...');
  try {
    process.env.MAYA_TTS_ENDPOINT = 'http://127.0.0.1:54321/offline';
    process.env.OPENAI_API_KEY = ''; // Simulate missing or revoked cloud key

    const req2 = mockReq({ text: 'Hello test', lang: 'en-IN' });
    const res2 = mockRes();

    await handler(req2, res2);

    assert(res2.getStatusCode() === 502, `Returned HTTP 502 Bad Gateway (got ${res2.getStatusCode()})`);
    const data = res2.getData();
    assert(data && data.fallback === 'text-only', `Payload provides fallback='text-only' contract`);
    assert(data && data.error, `Payload provides informative error description`);
  } catch (err) {
    assert(false, `Test 2 threw error: ${err.message}`);
  }

  // Restore env
  process.env.MAYA_TTS_ENDPOINT = originalMayaEndpoint;
  process.env.OPENAI_API_KEY = originalOpenAIKey;

  // Test 3: Primary Maya Live Endpoint check (if configured)
  console.log('\n3. Testing Primary Live Maya Endpoint with Active Fallback Protection...');
  if (originalMayaEndpoint && originalOpenAIKey) {
    try {
      const req3 = mockReq({ text: 'সৌরিক আইটি', lang: 'bn-IN' });
      const res3 = mockRes();

      const start = Date.now();
      await handler(req3, res3);
      const elapsed = Date.now() - start;

      assert(res3.getStatusCode() === 200, `Returned HTTP 200 OK (got ${res3.getStatusCode()})`);
      const engine = res3.getHeaders()['x-tts-engine'];
      assert(
        engine === 'maya2-native' || engine === 'openai-tts-1',
        `Synthesized successfully via engine: '${engine}' in ${(elapsed / 1000).toFixed(2)}s`
      );
      assert(
        Buffer.isBuffer(res3.getData()) && res3.getData().length > 1000,
        `Audio buffer generated successfully (${(res3.getData()?.length || 0) / 1024} KB)`
      );
    } catch (err) {
      assert(false, `Test 3 threw error: ${err.message}`);
    }
  } else {
    console.log('  ⚠ Skipped Test 3: MAYA_TTS_ENDPOINT or OPENAI_API_KEY not found in .env.local');
  }

  console.log('\n======================================================');
  if (failed) {
    console.error('❌ SOME TTS FALLBACK TESTS FAILED!');
    process.exit(1);
  } else {
    console.log('✅ ALL MULTI-TIER TTS FALLBACK AUDIT CHECKS PASSED!');
    console.log('======================================================\n');
  }
}

runTests();

