import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  ChevronRight,
  Code2,
  FileCheck2,
  CheckCircle2,
  Layers3,
  Monitor,
  Network,
  Server,
} from 'lucide-react';
import ProcessTimeline from '../components/ProcessTimeline';
import { COMPANY_INFO } from '../data/companyData';

const servicePaths = [
  {
    title: 'Software & IT',
    label: 'Digital systems',
    description: 'Use data, AI, and purpose-built software to address a defined business question, knowledge task, or workflow.',
    capabilities: [
      'Data analytics, predictive modelling, and forecasting',
      'Generative and agentic AI with human review',
      'Custom web applications, websites, and mobile apps',
    ],
    href: '/software',
    contactHref: '/contact?topic=data_analytics',
    action: 'Explore software services',
    contactAction: 'Discuss a software need',
    icon: Code2,
    accent: 'software',
  },
  {
    title: 'Hardware & IT Support',
    label: 'Physical infrastructure',
    description: 'Define the equipment, installation, or servicing requirement before models and terms are quoted.',
    capabilities: [
      'CCTV sales and services for business or home',
      'Computer sales, upgrades, and servicing',
      'Server installation and service',
    ],
    href: '/hardware',
    contactHref: '/contact?topic=hardware_quote',
    action: 'Explore hardware services',
    contactAction: 'Request a hardware quote',
    icon: Monitor,
    accent: 'hardware',
  },
];

const Home = () => {
  return (
    <div className="space-y-20 pb-4 pt-8 sm:space-y-28 sm:pt-14">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="home-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">
              Software & IT hardware
            </p>
            <div className="space-y-5">
              <h1
                id="home-heading"
                className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-primary sm:text-5xl lg:text-6xl"
              >
                Software and IT infrastructure for your business.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
                Custom software, practical automation, and IT hardware sales and services—shaped around the requirement you bring to us.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary group px-7 py-3.5 text-base">
                <span>Discuss your requirement</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href="#service-paths" className="btn-secondary px-6 py-3.5 text-base">
                Explore our services
              </a>
            </div>

            <p className="max-w-xl border-l-2 border-border-subtle pl-4 text-sm leading-relaxed text-ink-secondary">
              Serving business enquiries across both divisions, with a dedicated residential route for CCTV requirements.
            </p>
          </div>

          <div className="lg:col-span-5" aria-label="Software and hardware service overview">
            <div className="relative overflow-hidden rounded-panel border border-border-subtle bg-surface p-5 shadow-card sm:p-7">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-teal-light/60 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent-blue-light/70 blur-3xl" aria-hidden="true" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">One requirement</p>
                    <p className="mt-1 font-heading text-lg font-bold text-ink-primary">The right delivery path</p>
                  </div>
                  <Network className="h-6 w-6 text-ink-primary" aria-hidden="true" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-control border border-accent-teal/25 bg-accent-teal-light/45 p-4">
                    <Code2 className="h-5 w-5 text-accent-teal" aria-hidden="true" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-teal">Software</p>
                    <p className="mt-1 text-sm font-bold text-ink-primary">Build, analyse, automate</p>
                  </div>
                  <div className="rounded-control border border-accent-blue/20 bg-accent-blue-light/60 p-4">
                    <Server className="h-5 w-5 text-accent-blue" aria-hidden="true" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-blue">Hardware</p>
                    <p className="mt-1 text-sm font-bold text-ink-primary">Supply, install, service</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-control bg-ink-primary px-4 py-3 text-white">
                  <FileCheck2 className="h-5 w-5 shrink-0 text-accent-teal-light" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate-200">
                    The scope, quotation, handover, and support terms are agreed for the specific engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="service-paths" className="scroll-mt-28 bg-white py-16 sm:py-20" aria-labelledby="service-paths-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">Choose a service path</p>
            <h2 id="service-paths-heading" className="mt-3 font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
              Two divisions, each with a clear next step.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Start with the outcome you need. The detailed service pages explain the information that helps shape a useful project discussion or quotation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {servicePaths.map((service) => {
              const Icon = service.icon;
              const isHardware = service.accent === 'hardware';

              return (
                <article
                  key={service.title}
                  className={`flex h-full flex-col rounded-panel border bg-canvas p-6 sm:p-8 ${
                    isHardware ? 'border-t-4 border-accent-blue' : 'border-t-4 border-accent-teal'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${isHardware ? 'text-accent-blue' : 'text-accent-teal'}`}>
                        {service.label}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-bold text-ink-primary">{service.title}</h3>
                    </div>
                    <span className={`rounded-control p-3 ${isHardware ? 'bg-accent-blue-light text-accent-blue' : 'bg-accent-teal-light text-accent-teal'}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-ink-secondary">{service.description}</p>

                  <ul className="mt-6 space-y-3" aria-label={`${service.title} examples`}>
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3 text-sm leading-relaxed text-ink-primary">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isHardware ? 'text-accent-blue' : 'text-accent-teal'}`} aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 border-t border-border-subtle pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <Link to={service.href} className={isHardware ? 'btn-hardware text-sm' : 'btn-primary text-sm'}>
                      <span>{service.action}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to={service.contactHref}
                      className={`inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline ${
                        isHardware ? 'text-accent-blue' : 'text-accent-teal'
                      }`}
                    >
                      {service.contactAction}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Product Showcase: Saurik Track ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="product-showcase-heading">
        <div className="relative overflow-hidden rounded-panel bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-8 sm:p-12 text-white border border-cyan-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3 py-1 text-xs font-mono font-bold text-cyan-400 border border-cyan-800/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FLAGSHIP PRODUCT SPOTLIGHT</span>
              </div>
              
              <h2 id="product-showcase-heading" className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Saurik Track: Next-Gen Field Operations & Mobile ERP
              </h2>
              
              <p className="text-base leading-relaxed text-slate-300 max-w-2xl">
                Eliminate fake GPS visits, automate attendance with server-verified timestamps, and audit mobile van inventory in real-time. Built specifically for field distribution, sales reps, and mobile fleets.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  100% Mock GPS Rejection
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Dual-Location Van Auditing
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Offline Resilient Engine
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 rounded-control bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 hover:from-cyan-300 hover:to-teal-300 transition-all shadow-lg shadow-cyan-950/50"
              >
                <span>Explore Saurik Track</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/track#roi"
                className="inline-flex items-center justify-center gap-2 rounded-control bg-slate-900 border border-slate-700 hover:border-cyan-500/50 px-6 py-3 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Calculate Fleet ROI Savings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="process-heading">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">How work progresses</p>
          <h2 id="process-heading" className="mt-3 font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
            From requirement to an agreed handover.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            The detail varies by engagement, but the conversation follows four practical stages so responsibilities and outputs can be made clear.
          </p>
        </div>
        <div className="mt-10">
          <ProcessTimeline />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="example-heading">
        <div className="overflow-hidden rounded-panel border border-border-subtle bg-surface shadow-card">
          <div className="grid lg:grid-cols-12">
            <div className="p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                Illustrative example—not a client case study
              </span>
              <h2 id="example-heading" className="mt-5 font-heading text-3xl font-extrabold text-ink-primary">
                One operational need can involve software and hardware decisions.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                This hypothetical example shows the kind of scope that could be discussed. It does not describe completed work, measured outcomes, or a customer commitment.
              </p>
            </div>

            <div className="border-t border-border-subtle bg-canvas p-7 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-12">
              <ol className="space-y-7">
                <li className="grid gap-3 sm:grid-cols-[9rem_1fr]">
                  <div className="flex items-center gap-2 text-sm font-bold text-ink-primary">
                    <Camera className="h-5 w-5 text-accent-blue" aria-hidden="true" />
                    Requirement
                  </div>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    A multi-site operator wants to review security incidents and equipment status in one workflow.
                  </p>
                </li>
                <li className="grid gap-3 border-t border-border-subtle pt-7 sm:grid-cols-[9rem_1fr]">
                  <div className="flex items-center gap-2 text-sm font-bold text-ink-primary">
                    <Layers3 className="h-5 w-5 text-accent-teal" aria-hidden="true" />
                    Possible scope
                  </div>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    Review the existing camera and network setup, then define a permission-aware dashboard for event records and follow-up tasks.
                  </p>
                </li>
                <li className="grid gap-3 border-t border-border-subtle pt-7 sm:grid-cols-[9rem_1fr]">
                  <div className="flex items-center gap-2 text-sm font-bold text-ink-primary">
                    <BarChart3 className="h-5 w-5 text-accent-teal" aria-hidden="true" />
                    Agreed output
                  </div>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    The quotation would identify selected equipment, software functions, access roles, delivery stages, and support terms.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="company-heading">
        <div className="grid items-center gap-8 rounded-panel bg-accent-teal-light/45 p-7 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">About SAURIK IT</p>
            <h2 id="company-heading" className="mt-3 font-heading text-3xl font-extrabold text-ink-primary">
              Technology, deliberately explained.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-secondary">
              {COMPANY_INFO.name} works across software services and IT hardware. We begin with the business or site requirement, then define the proposed scope and commercial terms for review.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/about" className="btn-secondary">
              <span>Learn about the company</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="enquiry-heading">
        <div className="relative overflow-hidden rounded-panel bg-ink-primary p-8 text-white shadow-card sm:p-12">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent-teal/20 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal-light">Start with the requirement</p>
            <h2 id="enquiry-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Tell us what you need to build, supply, install, or service.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              The contact page helps prepare an email draft or open a WhatsApp conversation with the relevant service topic included.
            </p>
            <div className="mt-7">
              <Link to="/contact" className="btn-primary group px-7">
                <span>Discuss your requirement</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
