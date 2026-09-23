import OpenAI from 'openai';

const MAX_TTS_CHARS = 1000;
const ALLOWED_VOICES = ['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OpenAI TTS service is not configured.' });
  }

  const { text, voice = 'nova' } = req.body || {};

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
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('OpenAI TTS Error:', error);
    return res.status(502).json({ error: 'Failed to synthesize speech.' });
  }
}
