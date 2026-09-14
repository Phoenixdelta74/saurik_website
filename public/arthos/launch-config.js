/*
 * Arthos launch state is intentionally centralized here.
 * Keep this at "prelaunch" until the complete Desktop and Cloud journeys are
 * verified. The HTML contains the same safe fallback copy for no-JS clients.
 */
(function configureArthosLaunch() {
  const config = {
    state: 'prelaunch',
    prelaunch: {
      ctaLabel: 'Request early access',
      ctaHref: '/contact?topic=arthos_early_access',
      trialLabel: '60-day free trial planned for launch',
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
