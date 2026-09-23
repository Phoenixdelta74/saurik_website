import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export class ProviderConfigError extends Error {}

const providerForSource = (source = 'text') => {
  if (process.env.LLM_PROVIDER) {
    return process.env.LLM_PROVIDER.trim().toLowerCase();
  }
  // Voice queries run on OpenAI GPT model
  if (source === 'voice' && process.env.OPENAI_API_KEY) {
    return 'openai';
  }
  // Text chat queries run on OpenRouter model (e.g. Gemini 2.5 Pro / Flash)
  if (source === 'text' && process.env.OPENROUTER_API_KEY) {
    return 'openrouter';
  }
  // Graceful fallback to whichever key is active in environment
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.OPENROUTER_API_KEY) return 'openrouter';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  return 'openai';
};

const requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new ProviderConfigError(`Missing required environment variable ${name}.`);
  }
  return value;
};

async function callAnthropic(systemPrompt, messages) {
  const client = new Anthropic({ apiKey: requireEnv('ANTHROPIC_API_KEY') });
  const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.text ?? null;
}

async function callOpenAICompatible({ apiKey, baseURL, model, defaultHeaders, systemPrompt, messages }) {
  const client = new OpenAI({ apiKey, baseURL, defaultHeaders });

  const response = await client.chat.completions.create({
    model,
    max_tokens: 1024,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
  });

  return response.choices?.[0]?.message?.content ?? null;
}

function callOpenAI(systemPrompt, messages) {
  return callOpenAICompatible({
    apiKey: requireEnv('OPENAI_API_KEY'),
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    systemPrompt,
    messages,
  });
}

function callOpenRouter(systemPrompt, messages) {
  return callOpenAICompatible({
    apiKey: requireEnv('OPENROUTER_API_KEY'),
    baseURL: 'https://openrouter.ai/api/v1',
    model: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-pro',
    defaultHeaders: {
      'HTTP-Referer': process.env.SITE_URL || 'https://wwwsaurikit.com',
      'X-Title': 'SAURIK IT Website Assistant',
    },
    systemPrompt,
    messages,
  });
}

function callOllama(systemPrompt, messages) {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  return callOpenAICompatible({
    apiKey: 'ollama',
    baseURL: `${baseUrl.replace(/\/+$/, '')}/v1`,
    model: process.env.OLLAMA_MODEL || 'llama3.1',
    systemPrompt,
    messages,
  });
}

const PROVIDERS = {
  anthropic: callAnthropic,
  openai: callOpenAI,
  openrouter: callOpenRouter,
  ollama: callOllama,
};

export async function getChatReply(systemPrompt, messages, { source = 'text', lang } = {}) {
  const name = providerForSource(source);
  const call = PROVIDERS[name];

  if (!call) {
    throw new ProviderConfigError(
      `Unknown LLM_PROVIDER "${name}". Expected one of: ${Object.keys(PROVIDERS).join(', ')}.`
    );
  }

  // Prepend strict language mirroring instructions based on selected language and user input
  let enrichedSystemPrompt = systemPrompt;
  if (lang === 'hi-IN') {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: The user is communicating in Hindi. You MUST generate your response completely in authentic, natural Hindi (using proper Devanagari script). Do NOT answer in English. Do NOT apologize in English.';
  } else if (lang === 'bn-IN') {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: The user is communicating in Bengali. You MUST generate your response completely in authentic, natural Bengali (using Bengali script). Do NOT answer in English. Do NOT apologize in English.';
  } else {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: Always detect and respond in the exact language used by the visitor (Hindi in Hindi, Bengali in Bengali, English in English). If the visitor writes or speaks in Hindi or Bengali, never respond in English.';
  }

  if (source === 'voice') {
    enrichedSystemPrompt +=
      '\n\nVOICE ASSISTANT PACING DIRECTIVE: Keep your answer spoken-friendly, conversational, and concise (2 to 3 sentences maximum) so it sounds natural when spoken aloud.';
  }

  return call(enrichedSystemPrompt, messages);
}
