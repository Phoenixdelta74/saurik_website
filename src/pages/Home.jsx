import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  FileCheck2,
  Layers3,
  MapPin,
  Monitor,
  Network,
  PackageCheck,
  Server,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import ProcessTimeline from '../components/ProcessTimeline';
import { COMPANY_INFO } from '../data/companyData';

const servicePaths = [
  {
    title: 'Software & Applied AI',
    label: 'Digital Systems & Automation',
    description: 'Custom operational software, predictive data analytics, and carefully bounded AI workflows with mandatory human review.',
    capabilities: [
      'Data analytics, operational modelling, and forecasting',
      'Agentic AI with scoped permissions and human review',
      'Custom web portals, internal tools, and mobile workflows',
    ],
    href: '/software',
    contactHref: '/contact?topic=custom_apps',
    action: 'Explore software capabilities',
    contactAction: 'Discuss a software need',
    icon: Code2,
    accent: 'software',
  },
  {
    title: 'Hardware & Regional Support',
    label: 'Physical Infrastructure',
    description: 'CCTV surveillance, commercial computers, and dedicated server installation and maintenance across Tripura and Northeast India.',
    capabilities: [
      'CCTV surveillance systems for commercial or residential sites',
      'Business computer sales, upgrades, and scheduled servicing',
      'Server installation, setup, and on-premises maintenance',
    ],
    href: '/hardware',
    contactHref: '/contact?topic=hardware_quote',
    action: 'Explore hardware services',
    contactAction: 'Request a hardware quote',
    icon: Monitor,
    accent: 'hardware',
  },
];

const regionalSectors = [
  {
    name: 'Rubber & Bamboo Processing',
    detail: 'Weighbridge transit tracking, collection depot manifests, and stock movement records.',
    icon: Truck,
  },
  {
    name: 'Tea & Agro-Horticulture',
    detail: 'Estate dispatch verification, temperature-sensitive transit logs, and distributor handoffs.',
    icon: PackageCheck,
  },
  {
    name: 'FMCG & Wholesale Distribution',
    detail: 'Live van-stock balances, mobile order booking, and real-time payment/delivery logs.',
    icon: Building2,
  },
  {
    name: 'Healthcare & Pharma Supply',
    detail: 'Verified clinic and pharmacy visit logs, sample drop-off records, and return inventory audits.',
    icon: ShieldCheck,
  },
];

const Home = () => {
  return (
    <div className="space-y-20 pb-4 pt-8 sm:space-y-28 sm:pt-14">
      {/* ── Hero Section: Operational Technology Partner ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="home-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent-teal" />
              <span>Software &amp; IT Services • Agartala, Tripura &amp; Northeast India</span>
            </div>
            <div className="space-y-5">
              <h1
                id="home-heading"
                className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-primary sm:text-5xl lg:text-6xl"
              >
                Software, Field-Team Tools and IT Services in Tripura
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
                Headquartered in Agartala, SAURIK IT delivers field workforce tracking software (Saurik Track), custom web applications, CCTV surveillance, and dependable IT hardware infrastructure for growing businesses across Tripura and the wider Northeast region.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary group px-7 py-3.5 text-base">
                <span>Discuss your requirement</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link to="/track" className="btn-secondary px-6 py-3.5 text-base">
                Explore Saurik Track
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium text-ink-secondary">
                <CheckCircle2 className="h-4 w-4 text-accent-teal" />
                Agartala on-site support
              </span>
              <span className="flex items-center gap-1.5 font-medium text-ink-secondary">
                <CheckCircle2 className="h-4 w-4 text-accent-teal" />
                Direct founder engineering
              </span>
              <span className="flex items-center gap-1.5 font-medium text-ink-secondary">
                <CheckCircle2 className="h-4 w-4 text-accent-teal" />
                Tripura &amp; Northeast deployment
              </span>
            </div>
          </div>

          <div className="lg:col-span-5" aria-label="Core offerings overview">
            <div className="relative overflow-hidden rounded-panel border border-border-subtle bg-surface p-6 shadow-card sm:p-7">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-teal-light/60 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent-blue-light/70 blur-3xl" aria-hidden="true" />

              <div className="relative space-y-4">
                <div className="border-b border-border-subtle pb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Three Focused Capabilities</p>
                  <p className="mt-1 font-heading text-lg font-bold text-ink-primary">What We Build &amp; Support</p>
                </div>

                <div className="rounded-control border border-[#CDD0C2] bg-[#EEF0E7]/60 p-4 transition-all hover:bg-[#EEF0E7]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E4D14]">Field-Team Software</span>
                    <span className="rounded-full bg-[#8E4D14]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8E4D14]">Live Mobile ERP</span>
                  </div>
                  <h3 className="mt-1 font-heading text-base font-bold text-[#1C2620]">Saurik Track</h3>
                  <p className="mt-1 text-xs text-[#4B5750]">
                    GPS attendance + live van-stock tracking. Replaces WhatsApp guesswork with transparent, verified shift manifests.
                  </p>
                </div>

                <div className="rounded-control border border-border-subtle bg-canvas p-4 transition-all hover:border-accent-teal/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-teal">Software &amp; AI</span>
                    <span className="rounded-full bg-accent-teal-light px-2 py-0.5 text-[10px] font-semibold text-accent-teal">Custom Systems</span>
                  </div>
                  <h3 className="mt-1 font-heading text-base font-bold text-ink-primary">Web Applications &amp; Analytics</h3>
                  <p className="mt-1 text-xs text-ink-secondary">
                    Web portals, website development, data analytics, and scoped AI workflows with human review controls.
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                    <Link to="/services/website-development" className="text-accent-teal hover:underline font-semibold">
                      Website Design (Tripura) →
                    </Link>
                    <Link to="/services/custom-software" className="text-accent-teal hover:underline font-semibold">
                      Custom Software →
                    </Link>
                  </div>
                </div>

                <div className="rounded-control border border-border-subtle bg-canvas p-4 transition-all hover:border-accent-blue/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-blue">Regional IT Hardware</span>
                    <span className="rounded-full bg-accent-blue-light px-2 py-0.5 text-[10px] font-semibold text-accent-blue">Surveillance &amp; IT</span>
                  </div>
                  <h3 className="mt-1 font-heading text-base font-bold text-ink-primary">CCTV, Computers &amp; Servers</h3>
                  <p className="mt-1 text-xs text-ink-secondary">
                    Commercial &amp; residential CCTV, business workstations, and server deployment across Tripura &amp; Northeast India.
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                    <Link to="/services/cctv-installation" className="text-accent-blue hover:underline font-semibold">
                      CCTV Installation Guide →
                    </Link>
                    <Link to="/hardware#computers" className="text-ink-secondary hover:underline">
                      Workstations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flagship Product: Saurik Track ──────────────── */}
      <section id="wedge-track" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="wedge-track-heading">
        <div className="relative overflow-hidden rounded-panel bg-[#212F45] p-8 sm:p-12 text-white border border-[#CDD0C2]/30 shadow-card">
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1C2620]/80 px-3.5 py-1 text-xs font-mono font-semibold text-[#E4AE70] border border-[#E4AE70]/40">
                <span className="h-2 w-2 rounded-full bg-[#3E7C4C]" />
                <span>FLAGSHIP PRODUCT • FIELD WORKFORCE ERP</span>
              </div>
              
              <h2 id="wedge-track-heading" className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Saurik Track: GPS Attendance &amp; Van-Stock Tracking
              </h2>
              
              <p className="text-base leading-relaxed text-[#EEF0E7] max-w-2xl">
                Know who&apos;s on shift, where visits happened, and what&apos;s left in the van. Saurik Track pairs GPS attendance with live inventory for field sales and distribution teams—stopping WhatsApp guesswork with transparent, verified shift manifests.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-mono text-[#EEF0E7]/90">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#E4AE70]" />
                  Hardware-Level Spoofing Detection
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#E4AE70]" />
                  Live Van-Stock Auto-Reconciliation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#E4AE70]" />
                  Offline Store-and-Forward Sync
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#E4AE70]" />
                  Tamper-Resistant Shift Manifests
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 rounded-control bg-[#C57A2E] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#A9631F] transition-all shadow-md text-center"
              >
                <span>Explore Saurik Track</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact?topic=saurik_track"
                className="inline-flex items-center justify-center gap-2 rounded-control bg-white/10 border border-white/20 hover:bg-white/20 px-6 py-3 text-xs font-semibold text-white transition-colors text-center"
              >
                Request Free 30-Day Trial →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supporting Service Paths: Digital & Physical ──────────────── */}
      <section id="service-paths" className="scroll-mt-28 bg-white py-16 sm:py-20" aria-labelledby="service-paths-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">Supporting Service Paths</p>
            <h2 id="service-paths-heading" className="mt-3 font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
              Custom software, applied AI, and dependable IT hardware.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Start with the outcome you need. Our two supporting divisions provide tailored software engineering, predictive analytics, and regional IT infrastructure installations across Tripura.
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

      {/* ── Regional Grounding: Tripura & Northeast Operational Focus ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="regional-heading">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-teal">Regional Operational Focus</p>
          <h2 id="regional-heading" className="mt-3 font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
            Engineered for Tripura and Northeast commercial workflows.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Rather than deploying generic, out-of-touch software, we design and support technology built around the ground realities of regional enterprises, distribution networks, and industrial clusters.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {regionalSectors.map((sector) => {
            const SectorIcon = sector.icon;
            return (
              <div key={sector.name} className="rounded-panel border border-border-subtle bg-surface p-6 shadow-card transition-all hover:border-accent-teal/40">
                <span className="inline-flex rounded-control bg-accent-teal-light p-3 text-accent-teal">
                  <SectorIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">{sector.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{sector.detail}</p>
              </div>
            );
          })}
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
