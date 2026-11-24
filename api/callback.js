import { guardRequest } from './_lib/requestGuard.js';

const topics = new Set(['General enquiry', 'CCTV', 'Software', 'Hardware', 'Arthos', 'Saurik Track', 'AI chatbot', 'Demand planning']);
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({});
  if (!guardRequest(req, res, { name: 'callback', limit: 5 })) return;
  const { id, name, channel, contact, topic, consent, page } = req.body || {};
  if (typeof contact !== 'string') return res.status(400).json({});
  const validContact = channel === 'phone' ? /^\+?[\d ()-]{7,30}$/.test(contact) && /^[0-9]{7,15}$/.test(contact.replace(/\D/g, ''))
    : channel === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  if (!uuid.test(id) || typeof name !== 'string' || !name.trim() || name.length > 80 ||
      typeof contact !== 'string' || contact.length > 254 || !validContact || !topics.has(topic) || consent !== true) {
    return res.status(400).json({});
  }
  const { CALLBACK_SUPABASE_URL: url, CALLBACK_SUPABASE_KEY: key } = process.env;
  if (!url || !key) return res.status(503).json({});
  try {
    const result = await fetch(new URL('/rest/v1/website_callbacks?on_conflict=id', url), {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(6000),
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({ id, name: name.trim(), channel, contact: contact.trim(), topic, notice_version: '1', source_page: ['/','/arthos','/track','/ai-chatbot','/software','/hardware','/services/cctv-installation','/use-cases'].includes(page) ? page : 'other' }),
    });
    return res.status(result.ok ? 200 : 502).json({ received: result.ok });
  } catch {
    return res.status(503).json({});
  }
}
