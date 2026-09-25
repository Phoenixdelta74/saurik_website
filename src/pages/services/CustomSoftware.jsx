import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  GitBranch,
  Terminal,
  Workflow
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const CustomSoftware = () => {
  const capabilities = [
    {
      title: 'Operational Workflow Portals',
      desc: 'Replace fragmented spreadsheets and manual paper registers with centralized, role-based web applications tailored to your exact business rules.',
      icon: Workflow,
    },
    {
      title: 'Relational Database Architecture',
      desc: 'Engineered schemas using PostgreSQL and SQLite designed for data integrity, strict referential constraints, indexing for high query speeds, and automated backups.',
      icon: Database,
    },
    {
      title: 'Role-Based Access & Security Auditing',
      desc: 'Granular permissions ensuring employees, accountants, field staff, and directors see only the records and actions appropriate to their specific operational role.',
      icon: ShieldCheck,
    },
    {
      title: 'API & Legacy System Integrations',
      desc: 'Connect your internal tools with tally exports, payment gateways, WhatsApp business notifications, GPS location streams, and third-party vendor APIs.',
      icon: GitBranch,
    },
  ];

  const solutions = [
    {
      name: 'Internal Operations & ERP Modules',
      badge: 'Operational Efficiency',
      suitability: 'Distributors, warehouse operators, tea estates, construction firms, and multi-branch trading businesses.',
      highlights: [
        'Custom stock intake, dispatch manifests, and multi-location warehouse tracking',
        'Sales representative order booking and invoice generation',
        'Staff attendance, daily task logging, and supervisor approval queues',
        'Automated daily reconciliations and scheduled executive PDF reports',
        '100% on-premises or cloud hosting deployment based on data privacy preference',
      ],
      ctaText: 'Discuss an operations portal',
    },
    {
      name: 'B2B Client & Vendor Portals',
      badge: 'Partner Collaboration',
      suitability: 'Wholesale suppliers, manufacturers, logistics providers, and professional service agencies.',
      highlights: [
        'Dedicated client login to check order status, download invoices, and view receipts',
        'Vendor quotation submission and procurement tracking',
        'Secure document exchange and audit logging',
        'Automated email and WhatsApp milestone alerts',
        'Clean, accessible responsive interfaces that work smoothly on phones and tablets',
      ],
      ctaText: 'Discuss a client portal',
    },
    {
      name: 'Data Pipelines & Analytical Systems',
      badge: 'Business Intelligence',
      suitability: 'Enterprises needing clear operational visibility across sales, costs, and inventory trends.',
      highlights: [
        'Automated extraction and consolidation of sales records from multiple outlets',
        'Interactive executive dashboards showing real-time gross margins and collections',
        'Predictive demand planning and seasonal forecasting models',
        'Export capabilities into Excel, CSV, and standard accounting formats',
        'Transparent statistical and machine-learning models without unverified claims',
      ],
      ctaText: 'Discuss an analytics pipeline',
    },
  ];

  const faqs = [
    {
      q: 'How does SAURIK IT approach custom software projects?',
      a: 'We follow a strict 4-stage delivery process: (1) Understand — discovery and workflow mapping; (2) Plan — formal specification, database schema, and fixed commercial terms; (3) Deliver — phased milestone builds with weekly demo reviews; (4) Support — structured deployment, staff training, and handover.',
    },
    {
      q: 'Do we own the source code and database of our custom application?',
      a: 'Yes. Unlike off-the-shelf SaaS products that lock you in, custom software built for your business belongs to your organization. Upon final project completion, we hand over full source code, database schemas, and administrative documentation.',
    },
    {
      q: 'Can custom software work offline if our factory or depot has unstable internet?',
      a: 'Yes. We specialize in hybrid and offline-first architectures (similar to our Saurik Track and Arthos Desktop platforms). We can build local desktop software or mobile tools with local SQLite storage that store records offline and synchronize automatically when connectivity is restored.',
    },
    {
      q: 'Can you integrate with our existing Tally or accounting software?',
      a: 'Yes. We build structured export and import utilities (XML, CSV, JSON, or ODBC) to exchange ledger data, invoices, and payment receipts with Tally and other standard accounting tools.',
    },
    {
      q: 'Where will our data be hosted?',
      a: 'You retain full control over your hosting infrastructure. Depending on your regulatory or security preferences, we can deploy your application to dedicated on-premises servers in your office/data center, or to high-security private cloud instances.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 pt-8 sm:space-y-24 sm:pt-12">
      {/* Breadcrumb Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/software" className="hover:text-ink-primary transition-colors">Software</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-primary font-semibold">Custom Software</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="custom-software-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent-teal" />
              <span>Software Engineering • Agartala, Tripura &amp; Northeast India</span>
            </div>
            
            <h1
              id="custom-software-heading"
              className="font-heading text-4xl font-extrabold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Custom Software Development &amp; Automation in Tripura
            </h1>
            
            <p className="max-w-2xl text-lg text-ink-secondary leading-relaxed sm:text-xl">
              Replace rigid commercial tools and manual paperwork with custom-engineered web applications, operational portals, and automated workflows built specifically around your organization&apos;s rules.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/contact?topic=custom_apps" className="btn-primary px-7 py-3.5 text-base">
                <span>Discuss your software requirement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3.5 text-base"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-ink-muted font-medium">
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                Agartala discovery &amp; sprint demos
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                Complete source code ownership
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                Offline-capable architectures
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="border-b border-border-subtle pb-4 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Engineering Principles</p>
                <h3 className="font-heading text-xl font-bold text-ink-primary mt-1">Software Built to Last</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Scope Before Code:</strong> Clear technical specifications, wireframes, and database models before writing a line of code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Data Sovereignty:</strong> You choose where data resides—on your local office servers or private cloud.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Bloat:</strong> Clean React, Node, Python, and SQL stacks that execute quickly without licensing overhead.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Direct Founder Oversight:</strong> Work directly with experienced software engineers who understand operational workflows.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="bg-canvas border-y border-border-subtle py-16 sm:py-20" aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <h2 id="capabilities-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
              Engineered for real-world enterprise operations
            </h2>
            <p className="text-lg text-ink-secondary">
              We design software around your staff, your constraints, and your existing accounting or logistics systems.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-control border border-border-subtle bg-surface p-6 shadow-xs hover:border-accent-teal/40 transition-colors">
                  <div className="w-10 h-10 rounded-control bg-accent-teal-light flex items-center justify-center text-accent-teal mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-primary mb-2">{item.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions / Engagement Tiers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="solutions-heading">
        <div className="max-w-3xl space-y-3 mb-12">
          <h2 id="solutions-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
            Custom software solutions by requirement
          </h2>
          <p className="text-lg text-ink-secondary">
            Whether you need a focused single-purpose tool or a complete multi-branch operational portal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {solutions.map((pkg) => (
            <div key={pkg.name} className="flex flex-col justify-between rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-accent-teal-light px-3 py-1 text-xs font-semibold text-accent-teal">
                  {pkg.badge}
                </span>
                <h3 className="font-heading text-xl font-bold text-ink-primary">{pkg.name}</h3>
                <p className="text-xs text-ink-muted italic">{pkg.suitability}</p>
                
                <ul className="space-y-2.5 pt-3 border-t border-border-subtle text-xs text-ink-secondary">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <Link
                  to="/contact?topic=custom_apps"
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  {pkg.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-canvas border-t border-border-subtle py-16 sm:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 id="faq-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-ink-secondary">
              Common questions about scoping, software development stages, intellectual property, and support.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-control border border-border-subtle bg-surface p-5 transition-colors open:bg-surface open:shadow-xs"
              >
                <summary className="flex cursor-pointer items-center justify-between font-heading text-base font-bold text-ink-primary list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 flex-shrink-0 text-accent-teal group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary border-t border-border-subtle/60 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center bg-surface p-8 rounded-panel border border-border-subtle shadow-card">
            <h3 className="font-heading text-xl font-bold text-ink-primary mb-2">Have a custom software idea or workflow challenge?</h3>
            <p className="text-sm text-ink-secondary mb-6 max-w-xl mx-auto">
              Schedule a discovery session with our engineering team in Agartala. We will analyze your workflow, estimate timeline milestones, and provide a detailed quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact?topic=custom_apps" className="btn-primary px-6 py-3">
                Request a software discovery meeting
              </Link>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3"
              >
                Direct WhatsApp enquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomSoftware;
