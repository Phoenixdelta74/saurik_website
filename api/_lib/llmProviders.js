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

async function callAnthropic(systemPrompt, messages, options = {}) {
  const client = new Anthropic({ apiKey: requireEnv('ANTHROPIC_API_KEY') });
  const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';

  const response = await client.messages.create({
    model,
    max_tokens: options.maxTokens || 1024,
    system: systemPrompt,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.text ?? null;
}

async function callOpenAICompatible({ apiKey, baseURL, model, defaultHeaders, extraBody, systemPrompt, messages, maxTokens = 1024 }) {
  const client = new OpenAI({ apiKey, baseURL, defaultHeaders });

  const response = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    ...extraBody,
  });

  return response.choices?.[0]?.message?.content ?? null;
}

function callOpenAI(systemPrompt, messages, options = {}) {
  return callOpenAICompatible({
    apiKey: requireEnv('OPENAI_API_KEY'),
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    systemPrompt,
    messages,
    maxTokens: options.maxTokens || 1024,
  });
}

function callOpenRouter(systemPrompt, messages, options = {}) {
  return callOpenAICompatible({
    apiKey: requireEnv('OPENROUTER_API_KEY'),
    baseURL: 'https://openrouter.ai/api/v1',
    model: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
    defaultHeaders: {
      'HTTP-Referer': process.env.SITE_URL || 'https://www.saurikit.in',
      'X-Title': 'SAURIK IT Website Assistant',
    },
    // Setting reasoning max_tokens to 0 completely disables chain-of-thought tokens on OpenRouter
    // (e.g. Gemini 2.5 Flash), preventing reasoning from consuming the output token budget
    // and ensuring instantaneous, un-truncated replies.
    extraBody: { reasoning: { max_tokens: 0 } },
    systemPrompt,
    messages,
    maxTokens: options.maxTokens || 1024,
  });
}

function callOllama(systemPrompt, messages, options = {}) {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  return callOpenAICompatible({
    apiKey: 'ollama',
    baseURL: `${baseUrl.replace(/\/+$/, '')}/v1`,
    model: process.env.OLLAMA_MODEL || 'llama3.1',
    systemPrompt,
    messages,
    maxTokens: options.maxTokens || 1024,
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

  // A fixed language is only sent for voice turns (it is the speech-recognition language).
  // Typed turns omit it so the reply mirrors whatever language the visitor writes in.
  let enrichedSystemPrompt = systemPrompt;
  if (lang === 'en-IN') {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: The user is speaking English. You MUST generate your response completely in clear, natural, professional English. Do NOT answer in Hindi or any other language unless explicitly requested by the user.';
  } else if (lang === 'hi-IN') {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: The user is communicating in Hindi. You MUST generate your response completely in authentic, natural Hindi (using proper Devanagari script). Do NOT answer in English. Do NOT apologize in English.';
  } else if (lang === 'bn-IN') {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: The user is communicating in Bengali. You MUST generate your response completely in authentic, natural Bengali (using Bengali script). Do NOT answer in English. Do NOT apologize in English.';
  } else {
    enrichedSystemPrompt +=
      '\n\nCRITICAL LANGUAGE MANDATE: Always detect and respond in the exact language used by the visitor (English in English, Hindi in Hindi, Bengali in Bengali). Never switch languages unprompted.';
  }

  if (source === 'voice') {
    enrichedSystemPrompt +=
      '\n\nVOICE ASSISTANT PACING DIRECTIVE: Keep your answer spoken-friendly, conversational, and strictly 2 to 3 sentences maximum so it sounds natural and clear when spoken aloud by the voice engine without getting cut off.';
  }

  // Voice turns allow a generous budget of 450 tokens (~150-200 words / 2-3 sentences across Indic scripts)
  // preventing premature token starvation while keeping speech generation crisp and fast.
  const maxTokens = source === 'voice' ? 450 : 1024;
  return call(enrichedSystemPrompt, messages, { maxTokens });
}
