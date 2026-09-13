import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Monitor, 
  Camera, 
  Server, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  Wrench,
  AlertCircle
} from 'lucide-react';
import CCTVSelector from '../components/CCTVSelector';
import FAQAccordion from '../components/FAQAccordion';
import { HARDWARE_CATEGORIES, BUYING_PROCESS, HARDWARE_FAQS } from '../data/hardwareData';
import { COMPANY_INFO } from '../data/companyData';

const Hardware = () => {
  return (
    <div className="space-y-20 sm:space-y-24 pt-4 sm:pt-8">
      
      {/* ── 1. Hero Section ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl space-y-5">
          <div className="badge-hardware">
            <Monitor className="w-3.5 h-3.5" />
            <span>Hardware Sales & On-Premise Services</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary font-heading tracking-tight">
            Computer and CCTV sales. Server installation and service.
          </h1>

          <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed">
            Discuss computer purchasing or service, residential and business CCTV, or installation and servicing for your owned on-premise server equipment.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/contact?topic=hardware_quote"
              className="btn-hardware py-3 px-6 text-sm"
            >
              <span>Request a quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-3 px-6 text-sm"
            >
              WhatsApp Equipment Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive CCTV Home vs Business Selector ──── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="cctv">
        <CCTVSelector />
      </section>

      {/* ── 3. Computer Sales & Upgrades ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="computers">
        <div className="content-card border-t-4 border-t-accent-blue">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                  <Monitor className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                  Hardware Division • 02
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading">
                Computer Sales & Upgrades
              </h2>

              <p className="text-sm font-semibold text-accent-blue">
                Computer requirements for individual users, teams, and specialist workloads
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                Start with intended use, quantity, software needs, existing equipment, and budget. Brand, model, condition, configuration, availability, invoice, and warranty terms are then identified in the quotation.
              </p>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                  Possible Computer Service Scope:
                </h3>
                <ul className="space-y-2">
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Laptop or desktop purchasing based on intended use, quantity, and preferred specifications.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Custom workstations configured for CAD rendering, 3D modelling, and machine learning.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Component upgrades: high-speed NVMe SSD replacements, DDR4/DDR5 RAM, and GPU installations.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>OS deployment, corporate domain joining, antivirus endpoint setup, and driver optimization.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact?topic=hardware_computers"
                  className="btn-hardware text-xs py-2.5 px-5"
                >
                  <span>Request Computer Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-canvas rounded-panel p-6 border border-border-subtle space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-primary pb-2 border-b border-border-subtle">
                Terms to Confirm Before Purchase
              </div>

              <div className="space-y-3 text-xs text-ink-secondary">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-primary block">Warranty & Invoice:</strong>
                    The applicable manufacturer or seller warranty and invoice details are stated in the quotation.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-primary block">Configuration & Handover:</strong>
                    Operating-system, application, account, and handover tasks are included only when listed in the accepted scope.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-primary block">Diagnostics & Chip-Level Repairs:</strong>
                    Available diagnostic and repair options are identified after the device and fault have been assessed.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Server Installation & Service ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="servers">
        <div className="content-card border-t-4 border-t-accent-blue">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                  <Server className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                  Hardware Division • 03
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading">
                Server Installation & Service
              </h2>

              <p className="text-sm font-semibold text-accent-blue">
                On-premise rack and tower server setup, RAID storage configuration, and preventive maintenance
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                The service can cover physical placement, local storage and operating-system configuration, or preventive maintenance for equipment you own.
              </p>

              {/* Explicit Clarification Alert */}
              <div className="bg-canvas p-4 rounded-control border-l-4 border-l-accent-blue text-xs text-ink-secondary flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-primary block mb-0.5">Service Clarification:</strong>
                  We provide on-premise installation, physical deployment, and preventive servicing for your owned server equipment. We do not provide public cloud hosting or third-party web server rental.
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                  Server Deployment Scope:
                </h3>
                <ul className="space-y-2">
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Physical server rack mounting, cable dressing, PDU power management, and cooling review.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Hardware RAID configuration selected for the agreed storage and redundancy requirement; RAID does not replace a backup.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Operating system installation: Windows Server (Active Directory, DNS, File Share) or Linux.</span>
                  </li>
                  <li className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span>Preventive servicing: thermal paste renewal, dust extraction, fan diagnostics, and firmware upgrades.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact?topic=hardware_servers"
                  className="btn-hardware text-xs py-2.5 px-5"
                >
                  <span>Request Server Installation Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-canvas rounded-panel p-6 border border-border-subtle space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-primary pb-2 border-b border-border-subtle">
                Possible Maintenance Checks
              </div>

              <div className="space-y-3 text-xs text-ink-secondary">
                <div className="p-3 bg-surface rounded border border-border-subtle">
                  <strong className="text-ink-primary block mb-1">RAID Health & SMART Monitoring:</strong>
                  Review of available controller status, disk health indicators, and rebuild state where supported by the equipment.
                </div>
                <div className="p-3 bg-surface rounded border border-border-subtle">
                  <strong className="text-ink-primary block mb-1">Thermal & Power Redundancy:</strong>
                  Inspection of cooling and power status using the checks supported by the equipment and accepted service scope.
                </div>
                <div className="p-3 bg-surface rounded border border-border-subtle">
                  <strong className="text-ink-primary block mb-1">Backup Requirement Review:</strong>
                  Existing backup targets, schedules, restoration needs, and responsibilities can be reviewed as part of the scope.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Procurement & Setup Process ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-hardware mb-2">Hardware Procurement Flow</span>
          <h2 className="text-3xl font-extrabold text-ink-primary font-heading">
            How our equipment quotation and deployment works
          </h2>
          <p className="text-sm text-ink-secondary mt-2">
            Exact availability, model selection, itemized pricing, warranties, and deployment arrangements are confirmed in writing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUYING_PROCESS.map((step) => (
            <div key={step.step} className="content-card border-t-4 border-t-accent-blue flex flex-col justify-between">
              <div>
                <span className="text-3xl font-heading font-extrabold text-slate-300 mb-2 block">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-ink-primary font-heading mb-2">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Hardware FAQs ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="badge-hardware mb-2">Surveillance & Hardware FAQs</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading">
            Common questions regarding hardware and installations
          </h2>
        </div>

        <FAQAccordion items={HARDWARE_FAQS} />
      </section>

      {/* ── 7. Closing Quotation Banner ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="content-card text-center max-w-3xl mx-auto space-y-4 py-10">
          <h3 className="text-2xl font-bold text-ink-primary font-heading">
            Need an itemized quotation for your facility or home?
          </h3>
          <p className="text-sm text-ink-secondary">
            Share your equipment list, site context, or service request so the email or WhatsApp conversation can begin with useful details.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/contact?topic=hardware_quote" className="btn-hardware text-sm py-3 px-6">
              <span>Request itemized quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hardware;
