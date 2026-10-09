// Lightweight abuse protection for the public AI endpoints.
// - Origin check: browsers always send Origin on cross-site POSTs, so a foreign site cannot use
//   these endpoints from a visitor's browser. (Non-browser clients can still forge headers;
//   the rate limit below is the backstop.)
// - Rate limit: best-effort, per serverless instance (memory resets on cold start). For a hard
//   global limit, move this to a shared store such as Vercel KV / Upstash.

const DEFAULT_ALLOWED_HOSTS = ['saurikit.in', 'www.saurikit.in', 'localhost', '127.0.0.1'];

const allowedHosts = () => {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => {
      try {
        return new URL(value).hostname;
      } catch {
        return value;
      }
    });
  return new Set([...DEFAULT_ALLOWED_HOSTS, ...extra]);
};

const isAllowedOrigin = (req) => {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin GET/HEAD or non-browser client; rate limit still applies

  let originHost;
  try {
    originHost = new URL(origin).hostname;
  } catch {
    return false;
  }

  // Same deployment (covers Vercel preview URLs and custom domains)
  const requestHost = (req.headers['x-forwarded-host'] || req.headers.host || '').split(':')[0];
  if (originHost === requestHost) return true;

  return allowedHosts().has(originHost);
};

const buckets = new Map();
const MAX_TRACKED_CLIENTS = 5000;

const clientKey = (req) =>
  (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
  req.headers['x-real-ip'] ||
  req.socket?.remoteAddress ||
  'unknown';

const isRateLimited = (key, { limit, windowMs }) => {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_CLIENTS) {
    // Drop the oldest entry so memory stays bounded on long-lived instances
    buckets.delete(buckets.keys().next().value);
  }
  return false;
};

/**
 * Returns true when the request may proceed; otherwise sends the error response and returns false.
 */
export function guardRequest(req, res, { name, limit, windowMs = 60_000 }) {
  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: 'Origin not allowed.' });
    return false;
  }

  if (isRateLimited(`${name}:${clientKey(req)}`, { limit, windowMs })) {
    res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
    res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    return false;
  }

  return true;
}
