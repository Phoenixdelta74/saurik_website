import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BatteryCharging, 
  AlertOctagon, 
  PackageCheck, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  MapPin, 
  Smartphone, 
  Layers, 
  Zap, 
  Server, 
  Lock, 
  FileCheck, 
  ShieldAlert, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import TrackRibbon from '../components/track/TrackRibbon';
import TrackHeader from '../components/track/TrackHeader';
import ROICalculator from '../components/track/ROICalculator';
import ProblemSolutionMatrix from '../components/track/ProblemSolutionMatrix';
import PilotModal from '../components/track/PilotModal';
import DemoModal from '../components/track/DemoModal';
import TrackFooter from '../components/track/TrackFooter';
import FAQAccordion from '../components/FAQAccordion';
import { 
  TRACK_HERO, 
  TRACK_PILLARS, 
  TRACK_SECURITY, 
  TRACK_FAQS, 
  TRACK_PRICING 
} from '../data/trackData';

const Track = () => {
  const [pilotOpen, setPilotOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const trustIcons = {
    ShieldCheck: ShieldCheck,
    BatteryCharging: BatteryCharging,
    AlertOctagon: AlertOctagon,
    PackageCheck: PackageCheck,
  };

  const securityIcons = {
    ShieldAlert: ShieldAlert,
    Lock: Lock,
    FileCheck: FileCheck,
    Server: Server,
  };

  const activePricing = TRACK_PRICING[currency] || TRACK_PRICING.USD;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* ── 1. Top Announcement Ribbon ───────────────────────── */}
      <TrackRibbon onOpenPilot={() => setPilotOpen(true)} />

      {/* ── 2. Global Navigation Header ─────────────────────── */}
      <TrackHeader 
        onOpenPilot={() => setPilotOpen(true)} 
        onOpenDemo={() => setDemoOpen(true)} 
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main className="space-y-24 sm:space-y-32">
        
        {/* ── 3. Hero Section (Above the Fold) ────────────────── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-10 overflow-hidden">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{TRACK_HERO.eyebrow}</span>
            </div>

            {/* Main Headline H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.12] text-white">
              <span>{TRACK_HERO.headlineStart}</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent block sm:inline">
                {TRACK_HERO.headlineEnd}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
              {TRACK_HERO.subheadline}
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPilotOpen(true)}
                  className="w-full sm:w-auto py-4 px-8 rounded-control text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-xl shadow-cyan-950/60 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>{TRACK_HERO.primaryCTA}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-400 mt-1.5 font-mono text-center">
                  {TRACK_HERO.primaryCTASubtext}
                </div>
              </div>

              <div className="w-full sm:w-auto self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="w-full sm:w-auto py-4 px-7 rounded-control text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 text-cyan-400" />
                  <span>{TRACK_HERO.secondaryCTA}</span>
                </button>
              </div>
            </div>

            {/* Micro-Trust Proof Ribbon */}
            <div className="pt-8 border-t border-slate-800/80">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TRACK_HERO.microTrust.map((item, idx) => {
                  const Icon = trustIcons[item.icon] || ShieldCheck;
                  return (
                    <div 
                      key={idx} 
                      className="p-3 rounded-control bg-slate-900/60 border border-slate-800/80 flex items-center justify-center gap-2 text-xs font-mono text-slate-300"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Telemetry Mockup Preview Card */}
          <div className="max-w-5xl mx-auto mt-14 p-2 sm:p-3 rounded-panel bg-gradient-to-b from-cyan-500/20 via-slate-800/40 to-slate-900/60 border border-cyan-500/30 shadow-2xl">
            <div className="bg-slate-950 rounded-control p-4 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">saurik-track-command-center // v2.4</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>100% HARDWARE VERIFIED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 bg-slate-900/70 rounded border border-slate-800">
                  <div className="text-slate-400 mb-1">REAL-TIME GPS TELEMETRY</div>
                  <div className="text-sm font-bold text-cyan-300">24 Active Vans En-Route</div>
                  <div className="text-[11px] text-slate-400 mt-1">Average Visit Proximity: 12 meters</div>
                </div>

                <div className="p-3 bg-slate-900/70 rounded border border-slate-800">
                  <div className="text-slate-400 mb-1">MOCK LOCATION FILTER</div>
                  <div className="text-sm font-bold text-emerald-400">0 Spoofed Check-ins</div>
                  <div className="text-[11px] text-slate-400 mt-1">All hardware root checks passing</div>
                </div>

                <div className="p-3 bg-slate-900/70 rounded border border-slate-800">
                  <div className="text-slate-400 mb-1">VAN INVENTORY SYNC</div>
                  <div className="text-sm font-bold text-cyan-300">1,420 SKUs In Transit</div>
                  <div className="text-[11px] text-slate-400 mt-1">Zero transfer discrepancies</div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ── 4. Problem vs. Solution Matrix ──────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProblemSolutionMatrix />
        </section>

        {/* ── 5. Four Core Pillars (Feature Deep Dives) ────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16" id="features">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase tracking-wider mb-2">
              Architecture & Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Four Unbreakable Pillars of Field Control
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Engineered from the operating system level up to ensure bulletproof field attendance, mobile inventory accuracy, and instant dispatching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRACK_PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.id}
                id={pillar.id}
                className="bg-slate-900/80 rounded-panel border border-slate-800 p-6 sm:p-8 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl backdrop-blur-sm group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.summary}
                  </p>

                  <div className="space-y-3 pt-2">
                    {pillar.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">{b.head}: </strong>
                          <span>{b.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setPilotOpen(true)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Deploy in 14-Day Pilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">Pillar 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Interactive ROI Savings Calculator ───────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="roi">
          <ROICalculator 
            onOpenPilot={() => setPilotOpen(true)} 
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        </section>

        {/* ── 7. Security & Enterprise Badges ─────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="security">
          <div className="bg-slate-900/60 rounded-panel border border-slate-800 p-8 sm:p-12 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Enterprise Hardened
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Bank-Grade Multi-Tenancy & Data Privacy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Your client routes, inventory valuations, and personnel logs remain isolated and cryptographically shielded.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRACK_SECURITY.map((item, idx) => {
                const Icon = securityIcons[item.icon] || ShieldCheck;
                return (
                  <div key={idx} className="p-5 rounded-control bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="p-2 rounded bg-cyan-950 text-cyan-400 inline-block border border-cyan-800/40">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold font-heading text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 8. Transparent Pricing Section ──────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="pricing">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-panel border border-cyan-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flat, Predictable Enterprise Pricing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              One Plan. Unlimited Field Visibility.
            </h2>

            {/* Currency Switcher in Pricing Section */}
            <div className="flex justify-center pt-1 pb-1">
              <div className="inline-flex items-center p-1 bg-slate-950 rounded-control border border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                    currency === 'USD'
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                    currency === 'INR'
                      ? 'bg-emerald-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            <div className="py-2">
              <span className="text-5xl sm:text-6xl font-extrabold text-cyan-400 font-mono">
                {activePricing.symbol}{activePricing.perUserMonth}
              </span>
              <span className="text-slate-400 text-sm font-mono ml-2">/ user / month</span>
            </div>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Includes full Android & iOS rep tracking, dual-location van inventory, unlimited client check-ins, and 60 FPS desktop command center.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPilotOpen(true)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-control text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2"
              >
                <span>Start 14-Day Free Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="w-full sm:w-auto py-3.5 px-6 rounded-control text-sm font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700"
              >
                Watch 2-Min Interactive Demo
              </button>
            </div>

            <div className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-4 font-mono">
              <span>✓ No credit card required</span>
              <span>✓ Free Excel inventory import</span>
              <span>✓ 15-min team setup</span>
            </div>

          </div>
        </section>

        {/* ── 9. High-Conversion FAQ Accordion ───────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase tracking-wider mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Overcoming Key Fleet Friction Points
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Honest technical facts about battery usage, fake GPS rejection, and offline sync.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-panel border border-slate-800 p-6">
            <FAQAccordion items={TRACK_FAQS} />
          </div>
        </section>

        {/* ── 10. Final Call-to-Action Section ───────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 rounded-panel border border-cyan-500/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                Ready to Eliminate Guesswork from Your Field Operations?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Join growing distribution, sales, and service teams who run tighter, more profitable routes every single day.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPilotOpen(true)}
                  className="w-full sm:w-auto py-4 px-10 rounded-control text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2"
                >
                  <span>Start Your 14-Day Free Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 pt-2 font-mono">
                No credit card required • Free onboarding support • Instant team setup
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ── 11. Dedicated Saurik Track Footer ────────────────── */}
      <TrackFooter onOpenPilot={() => setPilotOpen(true)} />

      {/* ── 12. Interactive Modals ───────────────────────────── */}
      <PilotModal 
        isOpen={pilotOpen} 
        onClose={() => setPilotOpen(false)} 
      />

      <DemoModal 
        isOpen={demoOpen} 
        onClose={() => setDemoOpen(false)} 
        onOpenPilot={() => setPilotOpen(true)} 
      />

    </div>
  );
};

export default Track;
