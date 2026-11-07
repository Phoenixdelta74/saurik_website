/*
 * Arthos launch state is intentionally centralized here.
 * Keep this at "prelaunch" until sign-up, the trial, and buying a licence are
 * verified end to end on the production app at https://arthos.saurikit.in.
 * Then set state to 'live' to point every CTA at the app.
 * The HTML contains the same safe fallback copy for no-JS clients.
 */
(function configureArthosLaunch() {
  const config = {
    state: 'prelaunch',
    prelaunch: {
      ctaLabel: 'Request early access',
      ctaHref: '/contact?topic=arthos_early_access',
      trialLabel: '30-day free trial planned for launch',
    },
    live: {
      ctaLabel: 'Start your free 30-day trial',
      ctaHref: 'https://arthos.saurikit.in/',
      trialLabel: '30-day free trial · every feature included',
    },
  };

  const state = config[config.state] || config.prelaunch;
  document.querySelectorAll('[data-launch-cta]').forEach((cta) => {
    cta.textContent = state.ctaLabel;
    cta.setAttribute('href', state.ctaHref);
  });
  document.querySelectorAll('[data-launch-trial]').forEach((label) => {
    label.textContent = state.trialLabel;
  });
})();
