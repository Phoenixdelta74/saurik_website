import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  HardDrive, 
  Smartphone, 
  Wrench, 
  ChevronRight,
  Building2,
  Home,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const CctvInstallation = () => {
  const capabilities = [
    {
      title: 'Site Survey & Strategic Camera Mapping',
      desc: 'On-site walk-through across your facility or residence in Agartala and Tripura to identify blind spots, entry/exit choke points, lighting conditions, and optimal lens angles.',
      icon: Camera,
    },
    {
      title: 'High-Definition IP & Analog Surveillance',
      desc: 'Supply and installation of branded 2MP, 4MP, and 4K Ultra-HD bullet, dome, and PTZ cameras with crisp night vision (IR / ColorVu) for round-the-clock clarity.',
      icon: ShieldCheck,
    },
    {
      title: 'Reliable NVR / DVR & Long-Retention Storage',
      desc: 'Sizing and configuration of surveillance-grade hard drives (Western Digital Purple / Seagate SkyHawk) ensuring 15, 30, or 60+ days of continuous or motion-triggered video recording.',
      icon: HardDrive,
    },
    {
      title: 'Remote Mobile Live Viewing & Playback',
      desc: 'Secure smartphone and desktop client configuration allowing authorized owners and managers to monitor live video feeds and review incident footage from anywhere.',
      icon: Smartphone,
    },
  ];

  const premiseTypes = [
    {
      name: 'Commercial & Industrial Facilities',
      badge: 'Enterprise Security',
      suitability: 'Warehouses, factories, tea estates, wholesale distribution depots, hospitals, and educational campuses.',
      highlights: [
        'Comprehensive multi-channel IP network camera architectures (16 to 64+ channels)',
        'PoE (Power over Ethernet) structured cabling with industrial network switches',
        'Centralized monitoring station / security desk display setup',
        'Motion detection alerts, perimeter line-crossing, and vehicle entry monitoring',
        'Scheduled Annual Maintenance Contracts (AMC) with emergency on-site technician visits',
      ],
      topic: 'cctv_commercial',
      ctaText: 'Request a commercial CCTV quote',
    },
    {
      name: 'Retail Stores & Small Businesses',
      badge: 'Shops & Offices',
      suitability: 'Supermarkets, pharmacies, retail outlets, showrooms, hotels, and professional offices in Agartala.',
      highlights: [
        'Compact 4 to 8 camera surveillance bundles with discrete indoor dome cameras',
        'Point-of-Sale (POS) cash counter monitoring with clear bill/note inspection resolution',
        'High-definition audio recording options for customer service desks',
        'Neat surface conduit casing ensuring professional store aesthetics',
        'Mobile app setup on owner smartphone with quick playback search',
      ],
      topic: 'cctv_commercial',
      ctaText: 'Request a retail CCTV survey',
    },
    {
      name: 'Residential Homes & Apartment Buildings',
      badge: 'Home Security',
      suitability: 'Private houses, housing societies, boundary walls, and apartment parking areas.',
      highlights: [
        'Weatherproof outdoor bullet cameras covering main gates, driveways, and boundaries',
        'Color night vision capturing vehicle license plates and visitor faces in low light',
        'Family smartphone access with multi-user permissions',
        'Optional battery backup / mini-UPS for uninterrupted recording during power cuts',
        'Privacy-focused setup keeping all video strictly stored locally on your own premises',
      ],
      topic: 'cctv_residential',
      ctaText: 'Request a home CCTV quote',
    },
  ];

  const faqs = [
    {
      q: 'Do you provide CCTV installation services outside Agartala in other Tripura districts?',
      a: 'Yes. In addition to Agartala, we provide installation, cabling, and scheduled maintenance across West Tripura, Sepahijala, Gomati (Udaipur), South Tripura (Belonia), Khowai, and North Tripura by prior arrangement.',
    },
    {
      q: 'Can I view the CCTV camera footage on my mobile phone when I am away?',
      a: 'Yes. When your NVR or DVR is connected to an active broadband or Wi-Fi internet connection, we configure secure mobile apps on your iOS or Android device so you can view live video and search playback footage from anywhere in the world.',
    },
    {
      q: 'How many days of video recording can be saved before it overwrites?',
      a: 'Retention depends on the hard drive capacity, number of cameras, resolution, and frame rate. A typical 4-camera setup with a 2TB surveillance hard drive stores approximately 20 to 30 days of continuous recording before auto-overwriting. We calculate the exact storage requirement based on your policy needs.',
    },
    {
      q: 'Do cameras keep recording if there is a power outage?',
      a: 'Standard CCTV systems require electrical power to operate. To protect against frequent power fluctuations or outages, we recommend installing an uninterrupted power supply (UPS) or inverter connection to keep the cameras and NVR/DVR running continuously.',
    },
    {
      q: 'Do you provide Annual Maintenance Contracts (AMC) for existing CCTV systems?',
      a: 'Yes. We provide AMC packages for commercial facilities, offices, and institutions. Our maintenance covers camera lens cleaning, cable integrity checks, hard drive health monitoring, firmware updates, and rapid on-site troubleshooting when a camera goes offline.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 pt-8 sm:space-y-24 sm:pt-12">
      {/* Breadcrumb Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/hardware" className="hover:text-ink-primary transition-colors">Hardware</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-primary font-semibold">CCTV Installation</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="cctv-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              <span>Surveillance Engineering • Agartala, Tripura &amp; Northeast India</span>
            </div>
            
            <h1
              id="cctv-heading"
              className="font-heading text-4xl font-extrabold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Reliable CCTV Installation &amp; Maintenance in Tripura
            </h1>
            
            <p className="max-w-2xl text-lg text-ink-secondary leading-relaxed sm:text-xl">
              Protect your business facility, warehouse, retail shop, or residence with high-definition IP camera networks, surveillance-grade continuous storage, and remote mobile viewing—professionally installed with local Agartala warranty support.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/contact?topic=cctv_commercial" className="btn-primary bg-accent-blue hover:bg-accent-blue-hover px-7 py-3.5 text-base text-white">
                <span>Book a CCTV site survey</span>
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
                <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                Agartala on-site installation
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                Surveillance-grade hard drives
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                Prompt technician service
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="border-b border-border-subtle pb-4 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Installation Standards</p>
                <h3 className="font-heading text-xl font-bold text-ink-primary mt-1">Why Quality Installation Matters</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Neat Conduit &amp; Cable Concealment:</strong> Heavy-duty PVC piping protects signal cables from rodents, water ingress, and tampering.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Genuine Original Hardware:</strong> We install authentic, warranty-backed cameras (CP Plus, Hikvision, Dahua) with manufacturer serials.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Dedicated Surveillance Storage:</strong> Avoid cheap desktop hard drives that fail under 24/7 video writes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Local Agartala Technicians:</strong> When a camera feed drops, local technicians resolve issues on-site without lengthy delays.</span>
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
              End-to-end security camera solutions
            </h2>
            <p className="text-lg text-ink-secondary">
              From small 4-camera retail setups to multi-building commercial industrial surveillance networks.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-control border border-border-subtle bg-surface p-6 shadow-xs hover:border-accent-blue/40 transition-colors">
                  <div className="w-10 h-10 rounded-control bg-accent-blue-light flex items-center justify-center text-accent-blue mb-4">
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

      {/* Premise Types */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="premises-heading">
        <div className="max-w-3xl space-y-3 mb-12">
          <h2 id="premises-heading" className="font-heading text-3xl font-extrabold text-ink-primary sm:text-4xl">
            Surveillance packages by premise type
          </h2>
          <p className="text-lg text-ink-secondary">
            Structured proposals based on your site layout, retention requirement, and user access.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {premiseTypes.map((pkg) => (
            <div key={pkg.name} className="flex flex-col justify-between rounded-panel border border-border-subtle bg-surface p-7 shadow-card">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-accent-blue-light px-3 py-1 text-xs font-semibold text-accent-blue">
                  {pkg.badge}
                </span>
                <h3 className="font-heading text-xl font-bold text-ink-primary">{pkg.name}</h3>
                <p className="text-xs text-ink-muted italic">{pkg.suitability}</p>
                
                <ul className="space-y-2.5 pt-3 border-t border-border-subtle text-xs text-ink-secondary">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <Link
                  to={`/contact?topic=${pkg.topic}`}
                  className="btn-primary bg-accent-blue hover:bg-accent-blue-hover text-white w-full justify-center text-sm py-2.5"
                >
                  {pkg.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Boundaries Notice */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-panel border border-border-subtle bg-surface p-6 sm:p-8 flex items-start gap-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-accent-blue flex-shrink-0 mt-1" />
          <div className="space-y-1.5 text-sm text-ink-secondary">
            <h4 className="font-heading text-base font-bold text-ink-primary">Operational Requirements for Remote Viewing</h4>
            <p>
              To view CCTV feeds on smartphones when off-site, an active internet broadband connection (minimum 4–10 Mbps upstream) is required at the installation location. Continuous recording operates independently of internet connectivity onto the local NVR/DVR hard drive. Uninterrupted power supplies (UPS) are strongly recommended for high-reliability premises.
            </p>
          </div>
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
              Everything you need to know about our CCTV equipment, installation process, and local maintenance.
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
                  <span className="ml-4 flex-shrink-0 text-accent-blue group-open:rotate-180 transition-transform">
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
            <h3 className="font-heading text-xl font-bold text-ink-primary mb-2">Book a site survey for your premise</h3>
            <p className="text-sm text-ink-secondary mb-6 max-w-xl mx-auto">
              Our technicians will inspect your location, recommend optimal camera positions, calculate storage capacity, and provide an itemized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact?topic=cctv_commercial" className="btn-primary bg-accent-blue hover:bg-accent-blue-hover text-white px-6 py-3">
                Request a CCTV survey
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

export default CctvInstallation;
