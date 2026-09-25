import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Gauge, 
  ShieldCheck, 
  Search, 
  FileText, 
  Layers, 
  ChevronRight,
  HelpCircle,
  Building2,
  Store
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const WebsiteDevelopment = () => {
  const deliverables = [
    {
      title: 'Responsive, Mobile-First Design',
      desc: 'Clean, modern layouts engineered to look sharp and load instantly on smartphones, tablets, laptops, and wide desktop displays without layout jitter.',
      icon: Smartphone,
    },
    {
      title: 'High-Speed Performance & SEO Foundation',
      desc: 'Built with modern frontend architecture (clean HTML5, optimized CSS/JS, semantic metadata, OpenGraph cards) targeting sub-2 second load times on regional cellular networks.',
      icon: Gauge,
    },
    {
      title: 'Domain, Hosting & DNS Management',
      desc: 'Full assistance with domain registration, SSL certificates (HTTPS), fast edge CDN hosting, and business email setup (.in, .com, or custom TLDs).',
      icon: Globe,
    },
    {
      title: 'Enquiry & WhatsApp Funnel Integration',
      desc: 'Direct integration with structured enquiry forms, click-to-WhatsApp links, click-to-call buttons, and Google Maps location routing to turn visitors into business leads.',
      icon: Search,
    },
  ];

  const packages = [
    {
      name: 'Business & Corporate Web Presence',
      badge: 'Most Popular',
      audience: 'Manufacturers, distributors, professional firms, tea estates, schools, and regional enterprises.',
      features: [
        '5 to 10 structured pages (Home, About, Services, Products, Contact, Privacy)',
        'Full brand alignment, typography, and company asset presentation',
        'Mobile-friendly contact forms and instant WhatsApp enquiry integration',
        'Google Business Profile & Google Search Console indexing setup',
        'SSL encryption, fast edge hosting setup, and automated backups',
      ],
      ctaText: 'Discuss a business website',
    },
    {
      name: 'Catalog & Product Showcase',
      badge: 'High Conversion',
      audience: 'Retailers, wholesalers, agro-dealers, and equipment suppliers showcasing inventory.',
      features: [
        'Organized product catalog with categories, specifications, and PDF downloads',
        'Quick enquiry buttons on every product linking directly to WhatsApp',
        'High-resolution optimized image galleries with lazy-loading',
        'Local search engine optimization for Agartala and Northeast buyers',
        'Optional client portal or administrative update dashboard',
      ],
      ctaText: 'Discuss a catalog website',
    },
    {
      name: 'Custom Web Portal / Application',
      badge: 'Custom Architecture',
      audience: 'Organizations needing client logins, staff dashboards, or bespoke internal workflows.',
      features: [
        'Role-based authentication (Staff, Managers, Clients, Admins)',
        'Database architecture (PostgreSQL / SQLite) with relational data models',
        'Custom reporting, automated PDF generation, and export capabilities',
        'API integrations with existing billing, ERP, or communication tools',
        'Dedicated training and structured handover documentation',
      ],
      ctaText: 'Discuss a web portal',
    },
  ];

  const faqs = [
    {
      q: 'How long does it take to design and launch a business website?',
      a: 'A standard 5–8 page business website typically takes 2 to 3 weeks from requirement confirmation and content collection to public launch. Custom portals or complex catalogs with hundreds of products take 4 to 6 weeks based on agreed project milestones.',
    },
    {
      q: 'Do you provide local on-site support in Agartala and Tripura?',
      a: 'Yes. SAURIK IT is headquartered in Agartala. We conduct in-person discovery meetings, review drafts directly with your team, photograph your facility or products if needed, and provide ongoing direct technical support.',
    },
    {
      q: 'Will my website work well on slow mobile internet connections?',
      a: 'Yes. We specifically optimize websites for regional Northeast connectivity. By leveraging modern bundling, vector graphics, compressed WebP images, and static pre-rendering, pages load smoothly even on 3G and fluctuating 4G networks.',
    },
    {
      q: 'What do you need from us to get started?',
      a: 'To begin, we need a brief overview of your business goals, your logo or brand assets (if available), descriptions of your products or services, and your preferred contact details. We assist in structuring the content if you do not have ready text.',
    },
    {
      q: 'Do you guarantee top rankings on Google?',
      a: 'No ethical development agency can guarantee a #1 rank on Google. What we do guarantee is 100% search-engine-ready technical SEO: semantic HTML headings, XML sitemaps, robots.txt, fast page speed, mobile friendliness, structured data, and registration with Google Search Console.',
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
          <span className="text-ink-primary font-semibold">Website Development</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="webdev-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent-teal" />
              <span>Web Engineering • Agartala, Tripura &amp; Northeast India</span>
            </div>
            
            <h1
              id="webdev-heading"
              className="font-heading text-4xl font-extrabold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Professional Website Development &amp; Design in Tripura
            </h1>
            
            <p className="max-w-2xl text-lg text-ink-secondary leading-relaxed sm:text-xl">
              From high-converting corporate websites to product catalogs and custom web portals—we design, build, and support fast, mobile-first websites tailored for businesses across Agartala, Tripura, and the wider Northeast region.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/contact?topic=web_design" className="btn-primary px-7 py-3.5 text-base">
                <span>Discuss your website requirement</span>
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
                Agartala on-site meetings
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                Sub-2s mobile loading
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                Transparent milestone pricing
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="border-b border-border-subtle pb-4 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Regional Focus</p>
                <h3 className="font-heading text-xl font-bold text-ink-primary mt-1">Built for Northeast Businesses</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Local Discovery &amp; Support:</strong> Meet with engineers in Agartala who understand regional trade and local customers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Bilingual / Multilingual Ready:</strong> Seamless support for English, Bengali, and Hindi language options.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Complete Ownership:</strong> Full handover of domain, code, design assets, and administrative credentials upon completion.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Lock-in:</strong> Clean, standard code you can host anywhere or maintain with any developer.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="bg-canvas border-y border-border-subtle py-16 sm:py-20" aria-labelledby="deliverables-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <h2 id="deliverables-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
              What every website project includes
            </h2>
            <p className="text-lg text-ink-secondary">
              We do not use bloated templates or fragile visual page builders that slow down over time. We deliver purpose-built, accessible web platforms.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => {
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

      {/* Scope Tiers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="scopes-heading">
        <div className="max-w-3xl space-y-3 mb-12">
          <h2 id="scopes-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
            Engagement options tailored to your stage
          </h2>
          <p className="text-lg text-ink-secondary">
            Clear delivery boundaries and confirmed scopes with zero surprise charges.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="flex flex-col justify-between rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-accent-teal-light px-3 py-1 text-xs font-semibold text-accent-teal">
                  {pkg.badge}
                </span>
                <h3 className="font-heading text-xl font-bold text-ink-primary">{pkg.name}</h3>
                <p className="text-xs text-ink-muted italic">{pkg.audience}</p>
                
                <ul className="space-y-2.5 pt-3 border-t border-border-subtle text-xs text-ink-secondary">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <Link
                  to="/contact?topic=web_design"
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
              Everything you need to know about our web design process, timelines, and local support.
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
            <h3 className="font-heading text-xl font-bold text-ink-primary mb-2">Ready to build or upgrade your website?</h3>
            <p className="text-sm text-ink-secondary mb-6 max-w-xl mx-auto">
              Tell us about your organization and requirements. We will prepare an exact scope, wireframe outline, and commercial proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact?topic=web_design" className="btn-primary px-6 py-3">
                Request a website proposal
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

export default WebsiteDevelopment;
