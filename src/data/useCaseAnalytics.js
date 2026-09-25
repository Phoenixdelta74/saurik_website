export const SAMPLE_DISCLAIMER = 'Hypothetical sample data. This demo uses a transparent baseline so the steps are visible. A client project may use a statistical, machine-learning, or deep-learning method only after the real data is reviewed. No forecast accuracy is claimed.';

export const SAMPLE_NOTE = 'The figures in this demo are invented sample data.';

export const USE_CASE_FAQS = [
  {
    q: 'What do you need from us for a real project?',
    a: 'The business question, representative history, definitions, and the horizon you want to plan.',
  },
  {
    q: 'Will the forecast be guaranteed?',
    a: 'No. A real project may use a statistical, machine-learning, or deep-learning method only after the data is reviewed, and the limits are reported with the result.',
  },
  {
    q: 'Is this demo our sales history?',
    a: 'No. It is invented sample data so the steps are visible.',
  },
];

export const USE_CASE_PAGES = {
  '/use-cases': {
    domainId: 'fmcg',
    kicker: 'Use case 01',
    title: 'Demand planning demo for FMCG and manufacturers',
    description: 'Try a sample forecast for FMCG, manufacturing, or apparel. See how history becomes a stock, production, or buy decision. Figures are sample data.',
    headline: 'See what to stock, make, or clear next.',
    lede: 'For FMCG, see what to stock before the next peak. For manufacturing, see where production time should go. For apparel, see which styles to reorder and which to clear.',
  },
  '/use-cases/fmcg-demand-planning': {
    domainId: 'fmcg',
    kicker: 'FMCG',
    title: 'FMCG demand planning demo',
    description: 'Try a sample FMCG forecast and see which items to stock up or slow down. Figures are invented sample data.',
    headline: 'See what to stock before the next peak.',
    lede: 'This FMCG sample follows packaged goods through a festive lift, a declining item, and a steady item. Run it to see a stock option for each.',
  },
  '/use-cases/manufacturing-demand-planning': {
    domainId: 'manufacturing',
    kicker: 'Manufacturing',
    title: 'Manufacturing demand planning demo',
    description: 'Try a sample manufacturing forecast and see which items need production slots. Figures are invented sample data.',
    headline: 'See where production time should go next.',
    lede: 'This manufacturing sample compares a seasonal assembly, a steady panel, and a spare kit that is easing off. Run it to see where slots and material could go.',
  },
  '/use-cases/apparel-demand-planning': {
    domainId: 'apparel',
    kicker: 'Apparel',
    title: 'Apparel demand planning demo',
    description: 'Try a sample apparel forecast and see which styles to reorder or clear. Figures are invented sample data.',
    headline: 'See which styles to reorder or clear.',
    lede: 'This apparel sample puts a winter style, a summer shirt, and a steady denim line on the same calendar. Run it to see a buy or clearance option for each.',
  },
};

const MONTHS = [
  '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08',
  '2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02',
  '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08',
];

export const ANALYTICS_DOMAINS = [
  {
    id: 'fmcg',
    index: '01',
    label: 'FMCG',
    question: 'What should we stock before the next peak?',
    window: 'Sample window Mar 2024 – Aug 2025. Forecast months are Sep–Nov 2025.',
    outcome: 'Informs stock cover and replenishment timing. Computed from sample data, not a measured business result.',
    actions: {
      rise: 'Example planning option: raise the forward stock cover for {name} before the higher months in this sample ({pct} versus the last 3 months).',
      fall: 'Example planning option: slow the next replenishment of {name} ({pct} versus the last 3 months).',
      hold: 'Example planning option: keep the current replenishment rhythm for {name} ({pct} versus the last 3 months).',
    },
    items: [
      { id: 'atta', name: 'Atta 5kg' },
      { id: 'dishwash', name: 'Dishwash liquid' },
      { id: 'juice', name: 'Packaged juice' },
    ],
    months: MONTHS,
    series: {
      atta: [90, 92, 94, 96, 98, 100, 130, 160, 150, 110, 100, 95, 98, 100, 102, 104, 106, 108],
      dishwash: [80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46],
      juice: [54, 56, 55, 57, 56, 55, 58, 54, 56, 55, 57, 54, 56, 55, 58, 57, 56, 55],
    },
  },
  {
    id: 'manufacturing',
    index: '02',
    label: 'Manufacturing',
    question: 'Where should production time go next?',
    window: 'Sample window Mar 2024 – Aug 2025. Forecast months are Sep–Nov 2025.',
    outcome: 'Informs production slots and material timing. Computed from sample data, not a measured business result.',
    actions: {
      rise: 'Example planning option: reserve additional production slots and material for {name} ({pct} versus the last 3 months).',
      fall: 'Example planning option: avoid building extra {name} ahead of the softer months in this sample ({pct} versus the last 3 months).',
      hold: 'Example planning option: keep the current production rhythm for {name} ({pct} versus the last 3 months).',
    },
    items: [
      { id: 'pump', name: 'Pump assembly' },
      { id: 'panel', name: 'Control panel' },
      { id: 'spare', name: 'Spare kit' },
    ],
    months: MONTHS,
    series: {
      pump: [120, 122, 124, 126, 128, 130, 150, 170, 160, 140, 130, 125, 128, 130, 132, 134, 136, 138],
      panel: [40, 41, 39, 40, 42, 41, 40, 39, 41, 42, 40, 39, 41, 40, 42, 40, 41, 39],
      spare: [90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56],
    },
  },
  {
    id: 'apparel',
    index: '03',
    label: 'Apparel',
    question: 'Which styles need a reorder, and which need a clearance?',
    window: 'Sample window Mar 2024 – Aug 2025. Forecast months are Sep–Nov 2025.',
    outcome: 'Informs buy quantity and end-of-season stock. Computed from sample data, not a measured business result.',
    actions: {
      rise: 'Example planning option: place a follow-up buy for {name} ahead of the stronger months in this sample ({pct} versus the last 3 months).',
      fall: 'Example planning option: plan a clearance path for {name} before those quieter months ({pct} versus the last 3 months).',
      hold: 'Example planning option: keep the current buy plan for {name} ({pct} versus the last 3 months).',
    },
    items: [
      { id: 'jacket', name: 'Winter jacket' },
      { id: 'shirt', name: 'Cotton shirt' },
      { id: 'denim', name: 'Denim' },
    ],
    months: MONTHS,
    series: {
      jacket: [30, 28, 26, 24, 22, 20, 40, 70, 90, 60, 40, 28, 26, 24, 22, 20, 18, 16],
      shirt: [40, 50, 70, 90, 100, 110, 80, 50, 30, 25, 20, 22, 40, 55, 75, 95, 105, 100],
      denim: [60, 62, 61, 59, 60, 61, 58, 60, 62, 61, 59, 60, 62, 61, 60, 59, 61, 60],
    },
  },
];
