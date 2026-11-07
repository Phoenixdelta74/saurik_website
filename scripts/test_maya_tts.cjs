#!/usr/bin/env node
/**
 * Automated Tri-Lingual Benchmark for Maya 2 Native TTS
 * Language Suite: English (en-IN), Bengali (bn-IN), Hindi (hi-IN)
 * 
 * Usage:
 *   node scripts/test_maya_tts.cjs --url <ENDPOINT_URL> [--key <BEARER_TOKEN>]
 * Or set environment variables:
 *   MAYA_TTS_ENDPOINT=https://... node scripts/test_maya_tts.cjs
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Parse CLI flags
const args = process.argv.slice(2);
function getArg(flag, fallback = '') {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : fallback;
}

const isMockMode = args.includes('--mock');
const targetUrl = getArg('--url', process.env.MAYA_TTS_ENDPOINT || '');
const authToken = getArg('--key', process.env.MAYA_TTS_KEY || 'saurik_maya_secret_2026');

const OUTPUT_DIR = path.join(__dirname, '..', 'test', 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TEST_SUITE = [
  {
    lang: 'English (en-IN)',
    code: 'en',
    text: 'Welcome to SAURIK IT. We build custom software and commercial CCTV infrastructure across Tripura and Northeast India.',
  },
  {
    lang: 'Bengali (bn-IN)',
    code: 'bn',
    text: 'সৌরিক আইটিতে আপনাকে স্বাগতম। আমরা ত্রিপুরা এবং উত্তর-পূর্ব ভারতে নির্ভরযোগ্য সফটওয়্যার ও সিসিটিভি পরিষেবা প্রদান করি।',
  },
  {
    lang: 'Assamese (as-IN)',
    code: 'as',
    text: 'সৌৰিক আইটিলৈ আপোনাক স্বাগতম। আমি অসম আৰু উত্তৰ-পূৰ্বাঞ্চলত বিশ্বাসযোগ্য আইটি আৰু চিচিটিভি সেৱা প্ৰদান কৰোঁ।',
  },
  {
    lang: 'Gujarati (gu-IN)',
    code: 'gu',
    text: 'સૌરિક આઇટીમાં આપનું સ્વાગત છે. અમે વ્યવસાય માટે વિશ્વસનીય સોફ્ટવેર અને આઇટી સેવાઓ પ્રદાન કરીએ છીએ.',
  },
  {
    lang: 'Tamil (ta-IN)',
    code: 'ta',
    text: 'சௌரிக் ஐடிக்கு உங்களை வரவேற்கிறோம். வணிகங்களுக்கான நம்பகமான மென்பொருள் மற்றும் தொழில்நுட்ப தீர்வுகளை நாங்கள் வழங்குகிறோம்.',
  },
  {
    lang: 'Telugu (te-IN)',
    code: 'te',
    text: 'సౌరిక్ ఐటీకి మీకు స్వాగతం. వ్యాపారాల కోసం నమ్మకమైన సాఫ్ట్‌వేర్ మరియు సాంకేతిక పరిష్కారాలను మేము అందిస్తున్నాము.',
  },
  {
    lang: 'Hindi (hi-IN)',
    code: 'hi',
    text: 'सौरिक आईटी में आपका स्वागत है। हम त्रिपुरा और पूर्वोत्तर भारत में फील्ड ऑपरेशंस और विश्वसनीय सॉफ्टवेयर समाधान प्रदान करते हैं।',
  },
];

console.log('\n======================================================');
console.log('   SAURIK IT — MAYA 2 NATIVE TRI-LINGUAL BENCHMARK');
console.log('======================================================');

if (!targetUrl && !isMockMode) {
  console.log('\n[!] NOTICE: No target URL specified.');
  console.log('    You can run this test in three ways:');
  console.log('    1. Against deployed Modal URL:');
  console.log('       node scripts/test_maya_tts.cjs --url https://<subdomain>.modal.run');
  console.log('    2. With environment variables:');
  console.log('       MAYA_TTS_ENDPOINT=https://... node scripts/test_maya_tts.cjs');
  console.log('    3. Dry-run mock mode:');
  console.log('       node scripts/test_maya_tts.cjs --mock\n');
  process.exit(1);
}

function generateMockWav(durationSec = 1, sampleRate = 24000) {
  // Generates minimal valid 24kHz PCM WAV header and silence
  const numSamples = durationSec * sampleRate;
  const buffer = Buffer.alloc(44 + numSamples * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (Mono)
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);
  return buffer;
}

function synthesizeSpeech(text, endpointUrl, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (isMockMode) {
      setTimeout(() => {
        resolve({
          buffer: generateMockWav(2),
          contentType: 'audio/wav',
          status: 200,
        });
      }, 350);
      return;
    }

    if (redirectCount > 10) {
      return reject(new Error('Too many redirects (exceeded 10).'));
    }

    const parsed = new URL(endpointUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const isGet = redirectCount > 0;
    const payload = isGet ? null : JSON.stringify({ input: text, voice: 'default' });

    const headers = {
      'Authorization': authToken ? `Bearer ${authToken}` : '',
    };
    if (payload) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = client.request(
      parsed,
      {
        method: isGet ? 'GET' : 'POST',
        headers,
        timeout: 180000, // 3-minute timeout window
      },
      (res) => {
        // Automatically follow Modal 303 / 302 redirects for long-running cold starts
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, endpointUrl).toString();
          return resolve(synthesizeSpeech(text, redirectUrl, redirectCount + 1));
        }

        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            status: res.statusCode,
            contentType: res.headers['content-type'] || '',
            buffer,
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out after 180s.'));
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function runBenchmark() {
  const results = [];
  console.log(`Target Endpoint : ${isMockMode ? '[MOCK SIMULATOR]' : targetUrl}`);
  console.log(`Output Directory: ${OUTPUT_DIR}\n`);

  for (const item of TEST_SUITE) {
    process.stdout.write(`Testing [${item.lang}] ... `);
    const startTime = process.hrtime.bigint();

    try {
      const res = await synthesizeSpeech(item.text, targetUrl);
      const endTime = process.hrtime.bigint();
      const latencyMs = Number((endTime - startTime) / 1000000n);

      if (res.status === 200 && res.buffer.length > 100) {
        const outPath = path.join(OUTPUT_DIR, `maya_test_${item.code}.wav`);
        fs.writeFileSync(outPath, res.buffer);
        const sizeKb = (res.buffer.length / 1024).toFixed(1);

        console.log(`SUCCESS (${latencyMs}ms, ${sizeKb} KB)`);
        results.push({
          Language: item.lang,
          Status: 'PASS',
          Latency: `${latencyMs}ms`,
          Size: `${sizeKb} KB`,
          Mime: res.contentType || 'audio/wav',
          File: `test/output/maya_test_${item.code}.wav`,
        });
      } else {
        console.log(`FAILED (HTTP ${res.status}, ${res.buffer.length} bytes)`);
        results.push({
          Language: item.lang,
          Status: `FAIL (HTTP ${res.status})`,
          Latency: `${latencyMs}ms`,
          Size: '0 KB',
          Mime: res.contentType,
          File: '-',
        });
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({
        Language: item.lang,
        Status: 'ERROR',
        Latency: '-',
        Size: '0 KB',
        Mime: '-',
        File: '-',
      });
    }
  }

  console.log('\n--- BENCHMARK AUDIT SUMMARY ---');
  console.table(results);

  const passedCount = results.filter((r) => r.Status === 'PASS').length;
  console.log(`\nOverall Result: ${passedCount}/${TEST_SUITE.length} passed.`);

  if (passedCount === TEST_SUITE.length) {
    console.log('[✓] All language synthesis tests succeeded. Audio assets written to test/output/');
    process.exit(0);
  } else {
    console.log('[x] One or more synthesis benchmarks failed.');
    process.exit(1);
  }
}

runBenchmark();

