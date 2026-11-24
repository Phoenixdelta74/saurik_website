import assert from 'node:assert/strict';
import test from 'node:test';
import { randomUUID } from 'node:crypto';
import callback from '../api/callback.js';
import metrics from '../api/metrics.js';
import { publicAnswer } from '../api/_lib/publicFaq.js';

function call(handler, body) {
  const response = { setHeader() {}, status(code) { this.code = code; return this; }, json(data) { return { code: this.code, data }; } };
  return handler({ method: 'POST', headers: { host: 'localhost', 'x-real-ip': randomUUID() }, body }, response);
}

test('FAQ matches a stand-alone public question in the right context', () => {
  const user = { role: 'user', content: 'Where are my invoices and records stored?' };
  assert.match(publicAnswer([user], 'arthos', 'en-IN'), /browser profile/);
  for (const lang of ['as-IN', 'bn-IN', 'hi-IN']) assert.equal(publicAnswer([user], 'arthos', lang), undefined);
  assert.equal(publicAnswer([user], 'track'), undefined);
  assert.equal(publicAnswer([user, user], 'arthos'), undefined);
  assert.equal(publicAnswer([{ ...user, content: user.content + ' My number is 12345.' }], 'arthos'), undefined);
});

test('callback requires valid consent and confirms only a successful storage response', async t => {
  const body = { id: randomUUID(), name: 'Test Visitor', channel: 'email', contact: 'visitor@example.test', topic: 'CCTV', consent: true, page: '/services/cctv-installation' };
  assert.equal((await call(callback, { ...body, consent: false })).code, 400);
  assert.equal((await call(callback, { ...body, channel: 'phone', contact: 123456789 })).code, 400);
  process.env.CALLBACK_SUPABASE_URL = 'https://storage.example.test';
  process.env.CALLBACK_SUPABASE_KEY = 'test';
  const outbound = t.mock.method(globalThis, 'fetch', async () => ({ ok: true }));
  assert.deepEqual((await call(callback, body)).data, { received: true });
  const options = outbound.mock.calls[0].arguments[1];
  assert.equal(JSON.parse(options.body).id, body.id);
  assert.match(options.headers.Prefer, /ignore-duplicates/);
  outbound.mock.mockImplementation(async () => ({ ok: false }));
  assert.equal((await call(callback, body)).code, 502);
});

test('analytics rejects unknown routes and sends only controlled dimensions', async t => {
  process.env.POSTHOG_PROJECT_TOKEN = 'test';
  const outbound = t.mock.method(globalThis, 'fetch', async () => ({ ok: true }));
  const event = { visitor: randomUUID(), session: randomUUID(), event: 'cta_clicked', page: '/contact', target: 'email', placement: 'footer', email: 'visitor@example.test' };
  assert.equal((await call(metrics, { ...event, page: '/contact?email=private' })).code, 400);
  assert.equal((await call(metrics, event)).code, 200);
  assert.doesNotMatch(outbound.mock.calls[0].arguments[1].body, /example.test/);
});
