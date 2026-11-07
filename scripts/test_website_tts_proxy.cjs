#!/usr/bin/env node
/**
 * Test Website TTS Proxy (api/tts.js) with .env.local configuration
 * Verifies that the website's backend proxy properly reads MAYA_TTS_ENDPOINT,
 * connects to Maya 2 Native on Modal, and returns audio stream to the client.
 */

const fs = require('fs');
const path = require('path');

// 1. Manually parse .env.local to populate process.env without external dependencies
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx !== -1) {
        const key = trimmed.slice(0, equalsIdx).trim();
        const val = trimmed.slice(equalsIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

console.log('=== TESTING SAURIK IT TTS PROXY (api/tts.js) ===\n');
console.log(`MAYA_TTS_ENDPOINT: ${process.env.MAYA_TTS_ENDPOINT || '[NOT SET]'}`);
console.log(`MAYA_TTS_KEY     : ${process.env.MAYA_TTS_KEY ? '********' : '[NOT SET]'}\n`);

if (!process.env.MAYA_TTS_ENDPOINT) {
  console.error('[x] ERROR: MAYA_TTS_ENDPOINT is not found in .env.local.');
  console.error('    Please verify that .env.local contains MAYA_TTS_ENDPOINT=https://...');
  process.exit(1);
}

// 2. Mock Vercel Request & Response objects
function createMockReqRes(body, headers = {}) {
  const req = {
    method: 'POST',
    headers: {
      origin: 'http://localhost:3000',
      'x-forwarded-for': '127.0.0.1',
      ...headers,
    },
    body,
  };

  const responseHeaders = {};
  let statusCode = 200;
  let sentData = null;

  const res = {
    setHeader(name, val) {
      responseHeaders[name.toLowerCase()] = val;
    },
    status(code) {
      statusCode = code;
      return res;
    },
    json(data) {
      sentData = data;
      return res;
    },
    send(data) {
      sentData = data;
      return res;
    },
    _getHeaders: () => responseHeaders,
    _getStatus: () => statusCode,
    _getData: () => sentData,
  };

  return { req, res };
}

async function runTest() {
  // Dynamically import ES Module api/tts.js
  const ttsModule = await import('../api/tts.js');
  const handler = ttsModule.default;

  const testText = 'সৌরিক আইটিতে আপনাকে স্বাগতম। আমরা ত্রিপুরা এবং উত্তর-পূর্ব ভারতে নির্ভরযোগ্য সফটওয়্যার ও সিসিটিভি পরিষেবা প্রদান করি।';
  console.log(`Input Text (Bengali): "${testText}"`);
  console.log('Sending request through api/tts.js handler...\n');

  const { req, res } = createMockReqRes({ text: testText, voice: 'Ahana' });
  const start = Date.now();

  await handler(req, res);

  const duration = Date.now() - start;
  const status = res._getStatus();
  const headers = res._getHeaders();
  const data = res._getData();

  console.log(`Response HTTP Status : ${status}`);
  console.log(`Response Headers     :`, headers);
  console.log(`Round-trip Latency   : ${duration}ms`);

  if (status === 200 && Buffer.isBuffer(data)) {
    const outPath = path.resolve(__dirname, '..', 'test', 'output', 'website_proxy_bengali.wav');
    fs.writeFileSync(outPath, data);
    console.log(`\n[✓] SUCCESS: Received valid audio (${(data.length / 1024).toFixed(1)} KB).`);
    console.log(`    Engine Used      : ${headers['x-tts-engine'] || 'default'}`);
    console.log(`    Saved Test Audio : ${outPath}`);
    console.log('\nThe website proxy (api/tts.js) is working with your Modal Maya 2 endpoint!');
    process.exit(0);
  } else {
    console.error(`\n[x] FAILED: Server returned status ${status}.`);
    console.error(`    Payload:`, data);
    process.exit(1);
  }
}

runTest().catch((err) => {
  console.error('\n[x] Unexpected error:', err);
  process.exit(1);
});

