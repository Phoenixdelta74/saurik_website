(() => {
  const pages = new Set('/ /software /hardware /about /ai-chatbot /track /arthos /contact /privacy /terms /refund-policy /use-cases /use-cases/fmcg-demand-planning /use-cases/manufacturing-demand-planning /use-cases/apparel-demand-planning /services/cctv-installation /services/custom-software /services/website-development'.split(' '));
  function route(path) {
    const clean = path.replace(/\/$/, '') || '/';
    return pages.has(clean) ? clean : 'other';
  }
  function enabled() {
    try { return !navigator.globalPrivacyControl && navigator.doNotTrack !== '1' && localStorage.getItem('site-metrics') === 'yes'; }
    catch { return false; }
  }
  function identifier(storage, key) {
    let id = storage.getItem(key);
    if (!id) { id = crypto.randomUUID(); storage.setItem(key, id); }
    return id;
  }
  function record(event, details = {}) {
    if (!enabled()) return;
    try {
      const visitor = identifier(localStorage, 'metrics-browser');
      const session = identifier(sessionStorage, 'metrics-tab');
      fetch('/api/metrics', { method: 'POST', keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, visitor, session, page: route(location.pathname), ...details }) }).catch(() => {});
    } catch { /* Storage can be unavailable in private browsing. */ }
  }
  let lastPath;
  function view() {
    if (enabled() && lastPath !== location.pathname) { lastPath = location.pathname; record('page_view'); }
  }
  window.siteMetrics = { record, view, enabled, setConsent(allow) {
    try {
      localStorage.setItem('site-metrics', allow ? 'yes' : 'no');
      if (allow) view();
      else { lastPath = undefined; localStorage.removeItem('metrics-browser'); sessionStorage.removeItem('metrics-tab'); }
    } catch { /* Storage disabled. */ }
  }};
  document.addEventListener('click', e => {
    if (!enabled()) return;
    const link = e.target.closest?.('a[href]');
    if (!link) return;
    const dest = new URL(link.href, location.href);
    let target = link.dataset.conversion;
    if (target !== 'trial-start') {
      if (dest.protocol === 'mailto:') target = 'email';
      else if (dest.protocol === 'tel:') target = 'phone';
      else if (['wa.me','api.whatsapp.com'].includes(dest.hostname)) target = 'whatsapp';
      else if (dest.origin === location.origin) target = route(dest.pathname);
      else return;
    }
    const placement = ['nav','hero','final-cta'].includes(link.dataset.placement) ? link.dataset.placement :
      link.closest('footer') ? 'footer' : link.closest('nav,header') ? 'nav' : link.closest('[role=dialog]') ? 'assistant' : 'content';
    record('cta_clicked', { target, placement });
  }, true);
  view();
})();
