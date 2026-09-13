import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export class ProviderConfigError extends Error {}

const provider = () => (process.env.LLM_PROVIDER || 'anthropic').trim().toLowerCase();

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
    model: requireEnv('OPENAI_MODEL'),
    systemPrompt,
    messages,
  });
}

function callOpenRouter(systemPrompt, messages) {
  return callOpenAICompatible({
    apiKey: requireEnv('OPENROUTER_API_KEY'),
    baseURL: 'https://openrouter.ai/api/v1',
    model: requireEnv('OPENROUTER_MODEL'),
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

export async function getChatReply(systemPrompt, messages) {
  const name = provider();
  const call = PROVIDERS[name];

  if (!call) {
    throw new ProviderConfigError(
      `Unknown LLM_PROVIDER "${name}". Expected one of: ${Object.keys(PROVIDERS).join(', ')}.`
    );
  }

  return call(systemPrompt, messages);
}
