import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  Globe, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Smartphone,
} from 'lucide-react';
import AgenticWorkflow from '../components/AgenticWorkflow';
import AnalyticsChart from '../components/AnalyticsChart';
import FAQAccordion from '../components/FAQAccordion';
import { SOFTWARE_CAPABILITIES, SOFTWARE_FAQS } from '../data/softwareData';
import { COMPANY_INFO } from '../data/companyData';

const Software = () => {
  const capabilityIcons = {
    web_design: Globe,
    custom_apps: Layers,
    data_analytics: TrendingUp,
    generative_ai: Sparkles,
    agentic_ai: Bot,
    mobile_apps: Smartphone,
  };

  return (
    <div className="space-y-20 sm:space-y-24 pt-4 sm:pt-8">
      
      {/* ── 1. Hero Section ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl space-y-5">
          <div className="badge-software">
            <Cpu className="w-3.5 h-3.5" />
            <span>Digital Engineering & Automation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary font-heading tracking-tight">
            Data analytics, AI, and custom applications for web and mobile.
          </h1>

          <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed">
            Start with Data Analytics, then explore Generative AI, Agentic AI, Custom Web Applications, Website Design &amp; Support, and Mobile App Development.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/contact?topic=data_analytics"
              className="btn-primary py-3 px-6 text-sm"
            >
              <span>Discuss a data analytics need</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-3 px-6 text-sm"
            >
              Quick query via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Quick Capability Navigation Strip ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 bg-surface rounded-panel border border-border-subtle shadow-subtle flex flex-wrap items-center justify-start gap-x-5 gap-y-2 text-xs font-semibold">
          <span className="text-ink-muted uppercase tracking-wider text-[11px] px-2">Jump to:</span>
          {SOFTWARE_CAPABILITIES.map((cap) => (
            <a
              key={cap.id}
              href={`#${cap.id}`}
              className="px-3 py-1.5 rounded-control text-ink-secondary hover:text-ink-primary hover:bg-slate-100 transition-colors"
            >
              {cap.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── Flagship Product Spotlight: Saurik Track ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-panel p-6 sm:p-8 bg-[#212F45] text-white border border-[#CDD0C2]/30 shadow-card relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C2620]/80 border border-[#E4AE70]/40 text-[#E4AE70] text-xs font-mono uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#3E7C4C]" />
                Primary Operational Wedge • Mobile ERP
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Saurik Track: GPS Attendance &amp; Van-Stock Tracking
              </h2>
              <p className="text-sm sm:text-base text-[#EEF0E7] leading-relaxed">
                Looking for pre-engineered field operations software? Saurik Track pairs GPS attendance with live inventory for field sales and distribution teams—stopping WhatsApp guesswork with transparent, verified shift manifests.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#EEF0E7]/90 pt-1">
                <span>✓ Hardware-Level Spoofing Detection</span>
                <span>✓ Live Van-Stock Auto-Reconciliation</span>
                <span>✓ Offline Store-and-Forward Sync</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-control bg-[#C57A2E] text-white font-bold text-sm shadow-md hover:bg-[#A9631F] transition-all text-center"
              >
                <span>Explore Saurik Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?topic=saurik_track"
                className="inline-flex items-center justify-center px-4 py-3 rounded-control bg-white/10 text-white border border-white/20 hover:bg-white/20 text-sm font-medium transition-colors text-center"
              >
                Start Free Trial →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Six Detailed Capability Sections ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SOFTWARE_CAPABILITIES.map((cap, index) => {
          const Icon = capabilityIcons[cap.topicKey] || Cpu;
          return (
            <React.Fragment key={cap.id}>
              <div 
                id={cap.id} 
                className="scroll-mt-28 content-card border-t-4 border-t-accent-teal"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Information Column (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-md bg-accent-teal-light text-accent-teal inline-block">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-teal">
                      Capability 0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading">
                    {cap.title}
                  </h2>

                  <p className="text-sm font-semibold text-accent-teal">
                    {cap.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                    {cap.summary}
                  </p>

                  {/* Problem Solved Callout */}
                  <div className="bg-canvas p-4 rounded-control border-l-4 border-l-accent-teal text-xs text-ink-secondary">
                    <strong className="text-ink-primary font-bold block mb-1">Problem this solves:</strong>
                    {cap.problemSolved}
                  </div>

                  {/* Scope Deliverables */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                      Possible Deliverables & Outputs:
                    </h3>
                    <ul className="space-y-2">
                      {cap.deliverables.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={`/contact?topic=${cap.topicKey}`}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      <span>Discuss {cap.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Practical Context Box (5 cols) */}
                <div className="lg:col-span-5 bg-canvas rounded-panel p-6 border border-border-subtle space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-ink-primary pb-2 border-b border-border-subtle">
                    Engagement & Integration Requirements
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-ink-primary mb-1">
                      Information or Integrations Needed:
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {cap.integrationNeeds}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border-subtle">
                    <div className="text-xs font-semibold text-ink-primary mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent-teal" />
                      <span>Delivery Planning:</span>
                    </div>
                    <p className="text-xs text-ink-secondary">
                      {cap.deliveryTimeline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border-subtle">
                    <div className="text-xs font-semibold text-ink-primary mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent-teal" />
                      <span>Commercial Terms:</span>
                    </div>
                    <p className="text-xs text-ink-secondary">
                      Ownership, licences, data responsibilities, repository access, and handover items are confirmed in the accepted proposal or contract.
                    </p>
                  </div>
                </div>

                </div>
              </div>

              {cap.topicKey === 'data_analytics' && (
                <>
                  <AnalyticsChart />
                  <p className="mt-4">
                    <Link to="/use-cases" className="text-sm font-semibold text-accent-teal hover:underline">
                      Try the sample demand-planning demo
                    </Link>
                  </p>
                </>
              )}
              {cap.topicKey === 'agentic_ai' && <AgenticWorkflow />}
            </React.Fragment>
          );
        })}
      </section>

      {/* ── 4. Software FAQs Section ────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="badge-software mb-2">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading">
            Common questions regarding software delivery
          </h2>
          <p className="text-sm text-ink-secondary mt-1">
            Clear, practical answers about ownership, AI security, and support arrangements.
          </p>
        </div>

        <FAQAccordion items={SOFTWARE_FAQS} />
      </section>

      {/* ── 5. Closing CTA ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="content-card text-center max-w-3xl mx-auto space-y-4 py-10">
          <h3 className="text-2xl font-bold text-ink-primary font-heading">
            Have a data, AI, web, or mobile project in mind?
          </h3>
          <p className="text-sm text-ink-secondary">
            Share the outcome, users, existing process, and constraints. The contact page will help prepare an email draft with that context.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/contact?topic=data_analytics" className="btn-primary text-sm py-3 px-6">
              <span>Start project discussion</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Software;
