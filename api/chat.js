import Anthropic from '@anthropic-ai/sdk';
import { CHAT_SYSTEM_PROMPT } from '../src/data/chatContext.js';

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

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'Chat assistant is not configured.' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: CHAT_SYSTEM_PROMPT,
      messages: messages.slice(-MAX_HISTORY_MESSAGES).map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === 'text');

    if (!textBlock) {
      return res.status(502).json({ error: 'Chat assistant did not return a response.' });
    }

    return res.status(200).json({ reply: textBlock.text });
  } catch (error) {
    console.error('Chat assistant error:', error);
    return res.status(502).json({ error: 'Chat assistant is temporarily unavailable.' });
  }
}
