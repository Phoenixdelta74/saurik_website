import { guardRequest } from './_lib/requestGuard.js';

const pages = new Set(['/', '/about', '/software', '/hardware', '/ai-chatbot', '/track', '/arthos', '/contact', '/privacy', '/terms', '/refund-policy', '/use-cases', '/use-cases/fmcg-demand-planning', '/use-cases/manufacturing-demand-planning', '/use-cases/apparel-demand-planning', '/services/cctv-installation', '/services/custom-software', '/services/website-development', 'other']);
const events = new Set(['page_view', 'cta_clicked', 'chat_opened', 'first_question_sent', 'answer_delivered', 'lead_form_started', 'lead_submitted']);
const targets = new Set([...pages, 'callback', 'whatsapp', 'email', 'phone', 'trial-start']);
const placements = new Set(['hero', 'nav', 'footer', 'final-cta', 'assistant', 'content']);
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({});
  if (!guardRequest(req, res, { name: 'metrics', limit: 120 })) return;
  const { event, visitor, page, target, placement, session } = req.body || {};
  if (!events.has(event) || !pages.has(page) || !uuid.test(visitor) || !uuid.test(session) ||
      (target !== undefined && !targets.has(target)) || (placement !== undefined && !placements.has(placement))) {
    return res.status(400).json({});
  }
  if (!process.env.POSTHOG_PROJECT_TOKEN) return res.status(503).json({});
  const host = process.env.POSTHOG_REGION === 'eu' ? 'eu.i.posthog.com' : 'us.i.posthog.com';
  try {
    const result = await fetch(`https://${host}/i/v0/e/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(4000),
      body: JSON.stringify({ api_key: process.env.POSTHOG_PROJECT_TOKEN, event,
        properties: { distinct_id: visitor, tab_id: session, $process_person_profile: false, $geoip_disable: true, page, target, placement } }),
    });
    return res.status(result.ok ? 200 : 502).json({});
  } catch {
    return res.status(503).json({});
  }
}
