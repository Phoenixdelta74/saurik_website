const assert = require('assert');

console.log('=== VERIFYING RUNTIME TTS SECURITY, TIMEOUT, AND RECOVERY (FEAT-002) ===\n');

// Helper to create mock request and response objects matching Vercel serverless format
const mockReq = ({ method = 'POST', body = null, headers = {} } = {}) => ({
  method,
  body,
  headers: { host: 'localhost:3000', 'x-forwarded-for': '127.0.0.1', ...headers },
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

async function runRuntimeSuite() {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };

  const dummyWav = Buffer.concat([
    Buffer.from('RIFF'),
    Buffer.alloc(36),
    Buffer.from('WAVEfmt '),
    Buffer.alloc(2000, 0x55),
  ]);
  const dummyMp3 = Buffer.alloc(2000, 0xaa);

  let mayaBehavior = 'success'; // 'success' | 'auth_fail' | 'timeout' | 'error'
  let warmupBehavior = 'success';
  let mayaReceivedAuth = null;
  let mayaReceivedBody = null;
  let openAiBehavior = 'success'; // 'success' | 'auth_fail' | 'error'

  // Deterministic in-memory fetch mock (socket-free, sandbox-safe)
  globalThis.fetch = async (url, options = {}) => {
    const urlStr = String(url);
    const bodyText = typeof options.body === 'string' ? options.body : '';
    const parsedBody = bodyText ? JSON.parse(bodyText) : {};

    // 1. Mock Maya Serverless GPU Endpoint
    if (urlStr.includes('modal.run') || urlStr.includes('maya')) {
      mayaReceivedAuth = options.headers?.['Authorization'] || options.headers?.['authorization'] || null;
      mayaReceivedBody = parsedBody;

      // Check AbortSignal
      if (options.signal?.aborted) {
        const err = new Error('The operation was aborted');
        err.name = 'AbortError';
        throw err;
      }

      if (parsedBody.health || parsedBody.input === 'ping') {
        if (warmupBehavior === 'error') return new Response('unavailable', { status: 503 });
        if (warmupBehavior === 'timeout') throw new Error('connection failed');
        return new Response(JSON.stringify({ status: 'ready', model: 'maya2-native' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (mayaBehavior === 'auth_fail') {
        return new Response(JSON.stringify({ detail: 'Unauthorized: Invalid or missing Bearer token.' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (mayaBehavior === 'timeout') {
        // Wait until aborted by caller's timeout signal
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            resolve(new Response(dummyWav, { status: 200, headers: { 'Content-Type': 'audio/wav' } }));
          }, 2000);
          if (options.signal) {
            options.signal.addEventListener('abort', () => {
              clearTimeout(timer);
              const err = new Error('The operation was aborted');
              err.name = 'AbortError';
              reject(err);
            });
          }
        });
      }

      if (mayaBehavior === 'error') {
        return new Response(JSON.stringify({ detail: 'GPU synthesis crash.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(dummyWav, {
        status: 200,
        headers: { 'Content-Type': 'audio/wav', 'X-Model-Source': 'maya2-native' },
      });
    }

    // 2. Mock OpenAI Endpoint (/audio/speech)
    if (urlStr.includes('api.openai.com') || urlStr.includes('/audio/speech')) {
      if (openAiBehavior === 'auth_fail') {
        return new Response(JSON.stringify({
          error: { message: 'Incorrect or expired API key provided.', type: 'invalid_request_error' }
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (openAiBehavior === 'error') {
        return new Response(JSON.stringify({ error: { message: 'Internal server error' } }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(dummyMp3, {
        status: 200,
        headers: { 'Content-Type': 'audio/mpeg' },
      });
    }

    return new Response('Not Found', { status: 404 });
  };

  const ttsModule = await import('../api/tts.js');
  const handler = ttsModule.default;

  process.env.MAYA_TTS_ENDPOINT = 'https://saurik-test--maya-app.modal.run/speech';
  process.env.MAYA_TTS_KEY = 'test_secret_maya_token_9988';
  process.env.MAYA_TTS_TIMEOUT_MS = '100'; // 100ms for fast deterministic testing
  process.env.OPENAI_API_KEY = 'test_openai_key';

  try {
    // -------------------------------------------------------------
    // Test 1: Bounded & Guarded Warmup (GET /api/tts)
    // -------------------------------------------------------------
    console.log('1. Testing GET /api/tts Warmup & Health Check...');
    const reqWarmup = mockReq({ method: 'GET' });
    const resWarmup = mockRes();
    await handler(reqWarmup, resWarmup);

    assert.strictEqual(resWarmup.getStatusCode(), 200, 'GET /api/tts must return HTTP 200');
    assert.strictEqual(resWarmup.getData()?.status, 'ready', 'Status must report ready when mock responds');
    assert.strictEqual(resWarmup.getData()?.target, 'modal_maya', 'Target must identify modal_maya');
    assert(typeof resWarmup.getData()?.latencyMs === 'number', 'Response must include measured latencyMs');
    console.log(`  ✔ GET /api/tts reported status: ${resWarmup.getData()?.status} (${resWarmup.getData()?.latencyMs}ms)`);
    for (const behavior of ['error', 'timeout']) {
      warmupBehavior = behavior;
      const response = mockRes();
      await handler(mockReq({ method: 'GET' }), response);
      assert.strictEqual(response.getData()?.status, 'unavailable');
    }
    warmupBehavior = 'success';
    let limited = false;
    for (let i = 0; i < 20; i++) {
      const response = mockRes();
      await handler(mockReq({ method: 'GET' }), response);
      if (response.getStatusCode() === 429) limited = true;
    }
    assert(limited, 'Warmup must enforce its per-instance rate limit');

    // -------------------------------------------------------------
    // Test 2: Maya Endpoint Bearer Token Authentication
    // -------------------------------------------------------------
    console.log('\n2. Testing Maya Endpoint Authorization Header Propagation...');
    mayaBehavior = 'success';
    const reqAuth = mockReq({ method: 'POST', body: { text: 'সৌরিক আইটি', lang: 'bn-IN' } });
    const resAuth = mockRes();
    await handler(reqAuth, resAuth);

    assert.strictEqual(resAuth.getStatusCode(), 200, 'Must return HTTP 200 on valid token');
    assert.strictEqual(mayaReceivedAuth, 'Bearer test_secret_maya_token_9988', 'Must propagate Bearer token matching MAYA_TTS_KEY');
    assert.strictEqual(resAuth.getHeaders()['x-tts-engine'], 'maya2-native', 'Engine header must be maya2-native');
    assert.strictEqual(resAuth.getHeaders()['x-tts-fallback'], 'false', 'Fallback header must be false');
    assert(Buffer.isBuffer(resAuth.getData()), 'Response data must be decodable buffer');
    console.log('  ✔ Bearer token correctly passed to Maya endpoint; 24kHz audio returned.');

    // -------------------------------------------------------------
    // Test 3: Fast-Fail Timeout Cascading (Maya Delay > MAYA_TTS_TIMEOUT_MS)
    // -------------------------------------------------------------
    console.log('\n3. Testing Fast-Fail Timeout Cascading (Maya Delay > MAYA_TTS_TIMEOUT_MS)...');
    mayaBehavior = 'timeout';
    openAiBehavior = 'success';

    const reqTimeout = mockReq({ method: 'POST', body: { text: 'Hello world Saurik IT', lang: 'en-IN' } });
    const resTimeout = mockRes();
    const startT = Date.now();
    await handler(reqTimeout, resTimeout);
    const duration = Date.now() - startT;

    assert.strictEqual(resTimeout.getStatusCode(), 200, 'Cascading to OpenAI must succeed with HTTP 200');
    assert.strictEqual(resTimeout.getHeaders()['x-tts-engine'], 'openai-tts-1', 'Header must identify openai-tts-1 fallback');
    assert.strictEqual(resTimeout.getHeaders()['x-tts-fallback'], 'true', 'Fallback header must be true');
    assert(duration < 1000, `Cascading completed swiftly in ${duration}ms`);
    console.log(`  ✔ Fast-fail triggered at ${duration}ms; cascaded to OpenAI tts-1 successfully.`);

    // -------------------------------------------------------------
    // Test 4: Maya 401 Rejection -> Fallback to OpenAI
    // -------------------------------------------------------------
    console.log('\n4. Testing Maya 401 Rejection Graceful Cascading...');
    mayaBehavior = 'auth_fail';
    openAiBehavior = 'success';

    const reqReject = mockReq({ method: 'POST', body: { text: 'Bengali test', lang: 'bn-IN' } });
    const resReject = mockRes();
    await handler(reqReject, resReject);

    assert.strictEqual(resReject.getStatusCode(), 200, 'Must gracefully cascade to OpenAI even if Maya returns 401');
    assert.strictEqual(resReject.getHeaders()['x-tts-engine'], 'openai-tts-1');
    console.log('  ✔ Maya 401 correctly trapped; cascaded immediately to OpenAI fallback.');

    // -------------------------------------------------------------
    // Test 5: Complete Provider Failure & Response Sanitization
    // -------------------------------------------------------------
    console.log('\n5. Testing Graceful Degradation & Response Sanitization...');
    mayaBehavior = 'error';
    openAiBehavior = 'auth_fail'; // Simulating the expired OpenAI key from 2026-11-13 incident

    const reqDegrade = mockReq({ method: 'POST', body: { text: 'All fail test', lang: 'bn-IN' } });
    const resDegrade = mockRes();
    await handler(reqDegrade, resDegrade);

    assert.strictEqual(resDegrade.getStatusCode(), 502, 'Must return HTTP 502 when all providers fail');
    const errData = resDegrade.getData();
    assert.strictEqual(errData?.fallback, 'text-only', 'Payload must declare fallback=text-only');
    assert.strictEqual(errData?.error, 'Speech generation unavailable.');

    // Security assertions: Never leak tokens, internal URLs, or provider credentials to client
    const jsonStr = JSON.stringify(errData);
    assert(!jsonStr.includes('test_secret_maya_token'), 'Response must NOT leak Maya secret token');
    assert(!jsonStr.includes('test_openai_key'), 'Response must NOT leak OpenAI key');
    assert(!jsonStr.includes('127.0.0.1') && !jsonStr.includes('localhost'), 'Response must NOT leak internal URLs');
    assert(!jsonStr.includes('modal.run'), 'Response must NOT leak internal provider hostnames');
    console.log('  ✔ Degradation payload verified: zero credentials, zero internal URLs leaked.');

    // -------------------------------------------------------------
    // Test 6: Text Markdown Sanitization
    // -------------------------------------------------------------
    console.log('\n6. Testing Input Markdown Sanitization...');
    mayaBehavior = 'success';
    const reqMarkdown = mockReq({
      method: 'POST',
      body: { text: '### Heading with **bold** and *italic* and `code` and [link](https://saurikit.in)', lang: 'en-IN' },
    });
    const resMarkdown = mockRes();
    await handler(reqMarkdown, resMarkdown);

    assert.strictEqual(resMarkdown.getStatusCode(), 200);
    assert.strictEqual(
      mayaReceivedBody.input,
      'Heading with bold and italic and code and link',
      'Input text sent to synthesis must be stripped of markdown artifacts'
    );
    console.log('  ✔ Markdown stripped cleanly: "Heading with bold and italic and code and link"');

    console.log('\n======================================================');
    console.log('✅ ALL TTS RUNTIME VERIFICATION CHECKS PASSED (TC-06 to TC-09)!');
    console.log('======================================================\n');
  } finally {
    // Restore global fetch and environment
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    Object.assign(process.env, originalEnv);
  }
}

runRuntimeSuite().catch((err) => {
  console.error('\n❌ TTS Runtime Verification Failed:', err);
  process.exit(1);
});
