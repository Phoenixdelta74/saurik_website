import { CHAT_SYSTEM_PROMPT, TRACK_CHAT_SYSTEM_PROMPT, ARTHOS_CHAT_SYSTEM_PROMPT } from '../src/data/chatContext.js';
import { getChatReply, ProviderConfigError } from './_lib/llmProviders.js';

const MAX_HISTORY_MESSAGES = 20;

const isValidMessage = (message) =>
  message &&
  (message.role === 'user' || message.role === 'assistant') &&
  typeof message.content === 'string' &&
  message.content.trim().length > 0 &&
  message.content.length <= 2000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { messages, mode, source = 'text', lang } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  try {
    let systemPrompt = CHAT_SYSTEM_PROMPT;
    if (mode === 'track') {
      systemPrompt = TRACK_CHAT_SYSTEM_PROMPT;
    } else if (mode === 'arthos') {
      systemPrompt = ARTHOS_CHAT_SYSTEM_PROMPT;
    }

    const reply = await getChatReply(
      systemPrompt,
      messages.slice(-MAX_HISTORY_MESSAGES).map((m) => ({ role: m.role, content: m.content })),
      { source, lang }
    );

    if (!reply) {
      return res.status(502).json({ error: 'Chat assistant did not return a response.' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    if (error instanceof ProviderConfigError) {
      console.error('Chat assistant configuration error:', error.message);
      return res.status(503).json({ error: 'Chat assistant is not configured.' });
    }

    console.error('Chat assistant error:', error);
    return res.status(502).json({ error: 'Chat assistant is temporarily unavailable.' });
  }
}
