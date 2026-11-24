import OpenAI from 'openai';
import { guardRequest } from './_lib/requestGuard.js';

// Fallback only: the voice agent calls this when the visitor's device has no installed voice
// for the reply language (typically Bengali). Browser speech remains the primary engine.
const MAX_TTS_CHARS = 1000;
const ALLOWED_VOICES = ['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer'];

export default async function handler(req, res) {
  // Support bounded, rate-limited container warmup check on GET
  if (req.method === 'GET') {
    if (!guardRequest(req, res, { name: 'tts_warmup', limit: 20 })) return undefined;

    const mayaEndpoint = process.env.MAYA_TTS_ENDPOINT;
    const mayaKey = process.env.MAYA_TTS_KEY;

    if (!mayaEndpoint) {
      return res.status(200).json({ status: 'unconfigured', target: 'none' });
    }

    const startCheck = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      const headers = { 'Content-Type': 'application/json' };
      if (mayaKey) {
        headers['Authorization'] = `Bearer ${mayaKey}`;
      }

      const checkRes = await fetch(mayaEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ input: 'ping', health: true }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const elapsed = Date.now() - startCheck;
      if (checkRes.ok) {
        return res.status(200).json({ status: 'ready', warmup_triggered: true, target: 'modal_maya', latencyMs: elapsed });
      }
      return res.status(200).json({ status: 'unavailable', target: 'modal_maya', upstreamStatus: checkRes.status, latencyMs: elapsed });
    } catch {
      const elapsed = Date.now() - startCheck;
      return res.status(200).json({ status: 'unavailable', target: 'modal_maya', latencyMs: elapsed });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // 30 requests/minute to accommodate sentence-pipelined audio chunks (2-4 requests per voice turn)
  if (!guardRequest(req, res, { name: 'tts', limit: 30 })) return undefined;

  const startTime = Date.now();
  const apiKey = process.env.OPENAI_API_KEY;
  const mayaEndpoint = process.env.MAYA_TTS_ENDPOINT;
  const mayaKey = process.env.MAYA_TTS_KEY;

  if (!apiKey && !mayaEndpoint) {
    return res.status(503).json({
      error: 'Speech generation unavailable.',
      fallback: 'text-only',
      details: 'TTS service is not configured (missing Maya endpoint or OpenAI key).'
    });
  }

  const { text, voice = 'nova', lang } = req.body || {};

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  // Strip excessive markdown artifacts (asterisks, hashtags, backticks) for cleaner speech
  const cleanedText = text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#+\s+/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
    .slice(0, MAX_TTS_CHARS);

  if (!cleanedText) {
    return res.status(400).json({ error: 'Text content is empty after sanitization.' });
  }

  const chosenVoice = ALLOWED_VOICES.includes(voice) ? voice : 'nova';
  const mayaTimeoutMs = parseInt(process.env.MAYA_TTS_TIMEOUT_MS || '8500', 10);

  // 1. Check for custom Maya 2 Native Serverless GPU endpoint (Fast warm check)
  if (mayaEndpoint) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), mayaTimeoutMs);

      const headers = { 'Content-Type': 'application/json' };
      if (mayaKey) {
        headers['Authorization'] = `Bearer ${mayaKey}`;
      }

      const mayaRes = await fetch(mayaEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ input: cleanedText, voice: chosenVoice, lang }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const elapsed = Date.now() - startTime;
      if (mayaRes.ok) {
        const buffer = Buffer.from(await mayaRes.arrayBuffer());
        res.setHeader('Content-Type', mayaRes.headers.get('content-type') || 'audio/wav');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        res.setHeader('X-TTS-Engine', 'maya2-native');
        res.setHeader('X-TTS-Latency-MS', elapsed.toString());
        res.setHeader('X-TTS-Fallback', 'false');
        res.setHeader('Access-Control-Expose-Headers', 'X-TTS-Engine, X-TTS-Latency-MS, X-TTS-Fallback');
        return res.status(200).send(buffer);
      }
      console.warn(`Maya Serverless TTS returned status ${mayaRes.status} in ${elapsed}ms. Cascading immediately to OpenAI fallback...`);
    } catch (err) {
      const elapsed = Date.now() - startTime;
      const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
      console.warn(`Maya Serverless TTS unavailable (${isTimeout ? `cold start timeout after ${mayaTimeoutMs}ms` : 'connection error'}) in ${elapsed}ms. Cascading immediately to OpenAI fallback...`);
    }
  }

  // 2. Standard Cloud Fallback (OpenAI tts-1)
  if (!apiKey) {
    return res.status(502).json({
      error: 'Speech generation unavailable.',
      fallback: 'text-only',
      details: 'Primary TTS was unavailable and cloud fallback key is not configured.'
    });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: chosenVoice,
      input: cleanedText,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const elapsed = Date.now() - startTime;

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('X-TTS-Engine', 'openai-tts-1');
    res.setHeader('X-TTS-Latency-MS', elapsed.toString());
    res.setHeader('X-TTS-Fallback', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'X-TTS-Engine, X-TTS-Latency-MS, X-TTS-Fallback');
    return res.status(200).send(buffer);
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`OpenAI TTS Fallback Error after ${elapsed}ms:`, error.message || error);
    return res.status(502).json({
      error: 'Speech generation unavailable.',
      fallback: 'text-only',
      details: 'All audio synthesis providers are currently unreachable.'
    });
  }
}
