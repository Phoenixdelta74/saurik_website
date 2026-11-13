import OpenAI from 'openai';
import { guardRequest } from './_lib/requestGuard.js';

// Fallback only: the voice agent calls this when the visitor's device has no installed voice
// for the reply language (typically Bengali). Browser speech remains the primary engine.
const MAX_TTS_CHARS = 1000;
const ALLOWED_VOICES = ['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer'];

export default async function handler(req, res) {
  // Support non-blocking container warmup ping on GET
  if (req.method === 'GET') {
    const mayaEndpoint = process.env.MAYA_TTS_ENDPOINT;
    if (mayaEndpoint) {
      // Fire-and-forget non-blocking keepalive to Modal GPU endpoint
      fetch(mayaEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.MAYA_TTS_KEY ? `Bearer ${process.env.MAYA_TTS_KEY}` : 'Bearer saurik_maya_secret_2026',
        },
        body: JSON.stringify({ input: 'ping', voice: 'Ahana', lang: 'en' }),
      }).catch(() => {});
    }
    return res.status(200).json({ status: 'warmup_triggered', target: mayaEndpoint ? 'modal_maya' : 'none' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // 30 requests/minute to accommodate sentence-pipelined audio chunks (2-4 requests per voice turn)
  if (!guardRequest(req, res, { name: 'tts', limit: 30 })) return undefined;

  const apiKey = process.env.OPENAI_API_KEY;
  const mayaEndpoint = process.env.MAYA_TTS_ENDPOINT;
  const mayaKey = process.env.MAYA_TTS_KEY || 'saurik_maya_secret_2026';

  if (!apiKey && !mayaEndpoint) {
    return res.status(503).json({ error: 'TTS service is not configured (missing Maya endpoint or OpenAI key).' });
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
  const mayaTimeoutMs = parseInt(process.env.MAYA_TTS_TIMEOUT_MS || '7500', 10);

  // 1. Check for custom Maya 2 Native Serverless GPU endpoint (Fast warm check)
  if (mayaEndpoint) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), mayaTimeoutMs);

      const mayaRes = await fetch(mayaEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': mayaKey ? `Bearer ${mayaKey}` : '',
        },
        body: JSON.stringify({ input: cleanedText, voice: chosenVoice, lang }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (mayaRes.ok) {
        const buffer = Buffer.from(await mayaRes.arrayBuffer());
        res.setHeader('Content-Type', mayaRes.headers.get('content-type') || 'audio/wav');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        res.setHeader('X-TTS-Engine', 'maya2-native');
        return res.status(200).send(buffer);
      }
      console.warn(`Maya Serverless TTS returned status ${mayaRes.status}. Cascading immediately to OpenAI fallback...`);
    } catch (err) {
      const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
      console.warn(`Maya Serverless TTS unavailable (${isTimeout ? `cold start timeout after ${mayaTimeoutMs}ms` : err.message}). Cascading immediately to OpenAI fallback...`);
    }
  }

  // 2. Standard Cloud Fallback (OpenAI tts-1)
  if (!apiKey) {
    return res.status(502).json({
      error: 'Maya Serverless TTS was unavailable and OpenAI fallback key is not configured.',
      fallback: 'text-only',
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

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('X-TTS-Engine', 'openai-tts-1');
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('OpenAI TTS Fallback Error:', error.message || error);
    return res.status(502).json({
      error: 'Speech generation unavailable.',
      fallback: 'text-only',
      details: error.message || 'Provider failure',
    });
  }
}
