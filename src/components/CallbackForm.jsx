import React, { useRef, useState } from 'react';

const topics = ['General enquiry', 'CCTV', 'Software', 'Hardware', 'Arthos', 'Saurik Track', 'AI chatbot', 'Demand planning'];

export default function CallbackForm({ page, back }) {
  const initial = {'/services/cctv-installation':'CCTV','/hardware':'Hardware','/software':'Software','/arthos':'Arthos','/track':'Saurik Track','/ai-chatbot':'AI chatbot'};
  const [channel, setChannel] = useState('phone');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const previous = useRef({});
  const pending = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...data, channel, contact: data.contact.trim(), name: data.name.trim(), page, consent: data.consent === 'on' };
    const fingerprint = JSON.stringify(payload);
    pending.current = true;
    setStatus('sending');
    setError('');
    try {
      if (previous.current.fingerprint !== fingerprint) previous.current = { fingerprint, id: crypto.randomUUID() };
      const res = await fetch('/api/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, id: previous.current.id }) });
      if (!res.ok || !(await res.json()).received) {
        setError(res.status === 400 ? 'Please check your name and contact details.' : 'We could not confirm receipt. Try again or use the contact page.');
        setStatus('idle');
        return;
      }
      setStatus('done');
      window.siteMetrics?.record('lead_submitted');
    } catch {
      setStatus('idle');
      setError('We could not confirm receipt. Your details are still here so you can retry.');
    } finally { pending.current = false; }
  }
  const field = 'block w-full min-h-11 rounded-lg border border-slate-300 bg-white px-3';
  return <div className="flex-1 overflow-auto p-4 text-sm">
    <button type="button" autoFocus disabled={status === 'sending'} className="min-h-11 text-accent-teal underline" onClick={back}>Back to chat</button>
    {status === 'done' ? <p role="status">Thank you. Your follow-up request has been received.</p> :
      <form onSubmit={submit}>
        <fieldset disabled={status === 'sending'} className="space-y-3">
          <legend className="mb-2 font-semibold">How should our team reach you?</legend>
          <label className="block">Your name<input className={field} name="name" autoComplete="name" required maxLength={80} /></label>
          <label className="block">Contact me by<select className={field} value={channel} onChange={e => setChannel(e.target.value)}><option value="phone">Phone</option><option value="email">Email</option></select></label>
          <label className="block">{channel === 'phone' ? 'Phone number' : 'Email address'}<input key={channel} className={field} name="contact" type={channel === 'phone' ? 'tel' : 'email'} autoComplete={channel === 'phone' ? 'tel' : 'email'} required maxLength={channel === 'phone' ? 30 : 254} /></label>
          <label className="block">Enquiry topic<select className={field} name="topic" defaultValue={initial[page] || (page.startsWith('/use-cases') ? 'Demand planning' : topics[0])}>{topics.map(t => <option key={t}>{t}</option>)}</select></label>
          <label className="flex min-h-11 items-center gap-2"><input type="checkbox" required name="consent" />SAURIK IT may contact me about this enquiry.</label>
          <button className="btn-primary" type="submit">{status === 'sending' ? 'Sending…' : 'Request follow-up'}</button>
        </fieldset>
        {error && <p role="alert">{error} <a href="/contact" className="underline">Contact page</a></p>}
      </form>}
  </div>;
}
