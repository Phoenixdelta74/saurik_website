export const TRACK_RIBBON = {
  badge: "FOUNDING PARTNER PROGRAM",
  text: "Get 30 Days Free Unlimited Access + Free 1-on-1 Onboarding for your Field Fleet.",
  linkText: "Claim Your Invite →",
};

export const TRACK_HERO = {
  eyebrow: "NEXT-GEN FIELD OPERATIONS & MOBILE ERP",
  headlineStart: "Stop Paying for Unverified Field Hours.",
  headlineEnd: "Know Exactly Where Your Reps, Clients, and Van Inventory Are.",
  subheadline: "Eliminate fake GPS visits, automate field attendance with anti-tampering hardware verification, and audit mobile van stock in real-time. Built specifically for field distribution, sales reps, and service fleets.",
  primaryCTA: "Start 14-Day Free Pilot",
  primaryCTASubtext: "No credit card required",
  secondaryCTA: "Watch 2-Minute Interactive Demo",
  microTrust: [
    { icon: "ShieldCheck", label: "Google Cloud Server Timestamps" },
    { icon: "BatteryCharging", label: "< 3% Daily Battery Impact" },
    { icon: "AlertOctagon", label: "Hardware Spoofing Detection" },
    { icon: "PackageCheck", label: "Instant Dual-Location Van Auditing" },
  ],
};

export const TRACK_PROBLEM_SOLUTION = [
  {
    problemTitle: "Fake GPS Spoofing",
    problemDesc: "Reps use fake location apps to pretend they visited remote clients while staying home.",
    solutionTitle: "Hardware-Level Rejection",
    solutionDesc: "Native Android/iOS checks flag fake GPS providers and mock location drivers instantly.",
  },
  {
    problemTitle: "Clock Manipulation",
    problemDesc: "Employees roll back phone clocks to hide late check-ins and forge attendance logs.",
    solutionTitle: "Server-Authoritative Clock",
    solutionDesc: "Every timestamp is verified by Google Cloud servers, completely bypassing device clocks.",
  },
  {
    problemTitle: "Van Inventory Bleed",
    problemDesc: "Products go missing during vehicle-to-vehicle field transfers without paper trails.",
    solutionTitle: "Immutable Van Audit Logs",
    solutionDesc: "Reps scan barcodes and transfer stock with cryptographic digital handshakes.",
  },
  {
    problemTitle: "App Dies in Background",
    problemDesc: "Xiaomi, Samsung, and OnePlus OS battery savers kill background tracking mid-route.",
    solutionTitle: "OEM-Resilient Engine",
    solutionDesc: "Native foreground service with auto-whitelisting keeps tracking alive 24/7.",
  },
  {
    problemTitle: "Nightly Reporting Fatigue",
    problemDesc: "Managers waste 2+ hours daily tracking down visit notes, WhatsApp photos, and receipts.",
    solutionTitle: "Live Cyber Command Center",
    solutionDesc: "Real-time route playback, visit logs, and automated client summaries in 60 FPS.",
  },
];

export const TRACK_PILLARS = [
  {
    id: "anti-tamper",
    tag: "TAMPER-RESISTANT MOBILITY",
    title: "Real Visits. Real Timestamps. Verified Accountability.",
    summary: "Built-in hardware verification stops mock location spoofing and device clock tampering at the root.",
    bullets: [
      {
        head: "Server-Verified Geofencing",
        text: "Client check-in only activates when physical proximity and cellular tower signals are simultaneously validated.",
      },
      {
        head: "Continuous Route Replay",
        text: "View chronological breadcrumbs with speed telemetry, transit stops, and idle duration across the entire shift.",
      },
      {
        head: "Transparent Employee Disclosure",
        text: "Clear, app-store-compliant privacy dialogs protect employee trust and respect regulatory guidelines.",
      },
    ],
    metric: "Mock GPS Detection",
  },
  {
    id: "van-inventory",
    tag: "MOBILE SUPPLY CHAIN",
    title: "Turn Every Delivery Van into a Tracked Mobile Warehouse.",
    summary: "Live dual-location inventory accounting between central distribution hubs and roving mobile fleets.",
    bullets: [
      {
        head: "Multi-Location Stock Splits",
        text: "Manage primary warehouse inventory and roaming van bins simultaneously with atomic consistency.",
      },
      {
        head: "Instant Stock Transfers",
        text: "Transfer products from Van A to Van B in seconds with real-time barcode scans and mutual confirmation.",
      },
      {
        head: "Price History & Rate Tiers",
        text: "Restrict rep discounting on client visits with locked price books and customer-tier permissions.",
      },
    ],
    metric: "0 Duplicate SKUs",
  },
  {
    id: "command-center",
    tag: "HIGH-SPEED DESKTOP SUITE",
    title: "Built for Dispatchers Who Don't Have Time to Wait.",
    summary: "High-density desktop command center architected with 60 FPS DOM virtualization for thousands of field assets.",
    bullets: [
      {
        head: "60 FPS DOM Virtualization",
        text: "Effortlessly scrolls through 10,000+ SKUs and thousands of active field visits with zero lag.",
      },
      {
        head: "Keyboard-First Hotkeys",
        text: "Arrow-key navigation, instant barcode lookup, and Excel paste compatibility for rapid dispatch.",
      },
      {
        head: "Multi-Tenant Administration",
        text: "Strict organizational boundaries isolate each department, branch, or franchise securely.",
      },
    ],
    metric: "60 FPS Virtualized Table",
  },
  {
    id: "offline-resilience",
    tag: "OFFLINE RELIABILITY",
    title: "Works in Basements, Rural Routes, and Industrial Parks.",
    summary: "Store-and-forward encrypted local SQLite queue prevents data loss during network dead zones.",
    bullets: [
      {
        head: "Encrypted On-Device Buffer",
        text: "Captures coordinates, visit logs, and stock counts without mobile signal in an encrypted sandbox.",
      },
      {
        head: "Automatic Flush Engine",
        text: "Intelligently pushes pending data without dropping in-flight points once cellular service is restored.",
      },
      {
        head: "Zero Duplicate SKU Protection",
        text: "Atomic local state updates prevent transfer collisions and phantom inventory counts.",
      },
    ],
    metric: "Store-and-Forward Sync",
  },
];

export const TRACK_CURRENCIES = {
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    name: "US Dollar",
    costPerUser: 9,
    minWage: 8,
    maxWage: 60,
    defaultWage: 18,
    wageStep: 1,
    sliderMarks: ["$8/hr", "$25/hr", "$60/hr"],
    pricing: {
      standard: 9,
      professional: 15,
      enterprise: "Custom",
    },
  },
  INR: {
    code: "INR",
    symbol: "₹",
    label: "INR (₹)",
    name: "Indian Rupee",
    costPerUser: 699,
    minWage: 60,
    maxWage: 600,
    defaultWage: 180,
    wageStep: 10,
    sliderMarks: ["₹60/hr", "₹250/hr", "₹600/hr"],
    pricing: {
      standard: 699,
      professional: 1199,
      enterprise: "Custom",
    },
  },
};

export const TRACK_ROI_DEFAULTS = {
  reps: 10,
  minReps: 1,
  maxReps: 100,
  wage: 18,
  minWage: 8,
  maxWage: 50,
  wastedMins: 45,
  minWastedMins: 15,
  maxWastedMins: 120,
  workingDays: 22,
  costPerUser: 9,
};

export const calculateROI = (reps, wage, wastedMins, currency = 'USD') => {
  const workingDays = TRACK_ROI_DEFAULTS.workingDays;
  const currencyConfig = TRACK_CURRENCIES[currency] || TRACK_CURRENCIES.USD;
  const costPerUser = currencyConfig.costPerUser;

  const monthlyWastedPayroll = Math.round(reps * ((wastedMins / 60) * wage) * workingDays);
  const trackCost = Math.round(reps * costPerUser);
  const netMonthlySavings = Math.max(0, monthlyWastedPayroll - trackCost);
  const annualSavings = netMonthlySavings * 12;

  return {
    monthlyWastedPayroll,
    trackCost,
    netMonthlySavings,
    annualSavings,
    symbol: currencyConfig.symbol,
    currencyCode: currencyConfig.code,
  };
};

export const TRACK_SECURITY = [
  {
    title: "Multi-Tenant Data Isolation",
    description: "Cryptographically separated tenant data using verified company token scopes and strict row-level security.",
    icon: "ShieldAlert",
  },
  {
    title: "Code Obfuscation & Hardening",
    description: "Reverse-engineering protected with enterprise R8 and ProGuard minification against runtime tampering.",
    icon: "Lock",
  },
  {
    title: "Privacy & Data Protection Principles",
    description: "Built with transparent employee data export, retention policies, and account deletion flows.",
    icon: "FileCheck",
  },
  {
    title: "Monitored Cloud Infrastructure",
    description: "Hosted on resilient cloud infrastructure with automated scaling, health checks, and secure backups.",
    icon: "Server",
  },
];

export const TRACK_FAQS = [
  {
    q: "Will this drain my employees' phone batteries?",
    a: "No. Saurik Track runs an optimized foreground service that utilizes intelligent adaptive location sampling. Typical daily battery consumption is less than 3–4% over an 8-hour shift.",
  },
  {
    q: "Can employees fake their GPS coordinates with mock location apps?",
    a: "No. Our native Android and iOS modules check OS hardware flags (isMock) and validate all timestamps with Google Cloud servers. Fake GPS apps are flagged and rejected immediately.",
  },
  {
    q: "What happens when our reps drive into remote areas with no cellular network?",
    a: "The app works seamlessly offline. Check-ins, client visit forms, and van transfers are safely queued in an encrypted local database and sync automatically once cell service is restored.",
  },
  {
    q: "How long does onboarding take?",
    a: "Less than 15 minutes. You can invite your team via email/SMS, set up your products or import an existing Excel inventory sheet, and have your field team live on the same day.",
  },
  {
    q: "Is our company data isolated from other businesses?",
    a: "Yes. Every single read and write is enforced through strict multi-tenant access control rules. Your routes, client details, pricing, and stock remain strictly confidential.",
  },
];

export const TRACK_PRICING = {
  USD: {
    perUserMonth: 9,
    symbol: "$",
    code: "USD",
  },
  INR: {
    perUserMonth: 699,
    symbol: "₹",
    code: "INR",
  },
  perUserMonth: 9,
  currency: "$",
  pilotDays: 14,
  foundingPartnerDays: 30,
};
