import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  Monitor, 
  Phone, 
  Mail, 
  Compass,
} from 'lucide-react';
import { COMPANY_INFO, WORKING_PRINCIPLES } from '../data/companyData';

const About = () => {
  return (
    <div className="space-y-20 sm:space-y-24 pt-4 sm:pt-8">
      
      {/* ── 1. Hero & Company Introduction ──────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-border-subtle">
          <div className="md:col-span-8 space-y-4">
            <div className="badge-software">
              <Compass className="w-3.5 h-3.5" />
              <span>Company Background & Engineering Ethos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary font-heading tracking-tight leading-tight">
              Technology, Deliberately.
            </h1>

            <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed font-normal">
              SAURIK IT Private Limited offers software services alongside IT hardware sales, installation, and service.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 bg-surface rounded-panel border border-border-subtle shadow-card flex flex-col items-center justify-center text-center">
              <img 
                src="/logo.png" 
                alt="SAURIK IT Brand Emblem" 
                className="h-28 sm:h-36 w-auto object-contain drop-shadow-sm mb-3"
              />
              <div className="text-xs font-bold text-ink-primary font-heading">
                SAURIK IT Pvt Ltd
              </div>
              <div className="text-[10px] text-ink-muted font-mono">
                Company logo
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-ink-secondary space-y-4 text-base leading-relaxed pt-8">
          <p>
            The confirmed service scope includes data analytics, Generative AI, Agentic AI, custom web applications, website design and support, mobile app development, CCTV, computers, and server installation and service.
          </p>
          <p>
            Each enquiry starts with the software outcome or physical requirement. The proposed work, responsibilities, commercial terms, delivery stages, and handover items can then be recorded for review.
          </p>
        </div>
      </section>

      {/* ── 2. Working Principles ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-software mb-2">Our Standards</span>
          <h2 className="text-3xl font-extrabold text-ink-primary font-heading">
            Principles that govern our delivery
          </h2>
          <p className="text-sm text-ink-secondary mt-2">
            Topics that should be made explicit while an engagement is being scoped.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKING_PRINCIPLES.map((item, idx) => (
            <div key={item.id} className="content-card hover:shadow-card-hover border-l-4 border-l-accent-teal">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-accent-teal">0{idx + 1}</span>
                <h3 className="text-lg font-bold text-ink-primary font-heading">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Operational Divisions & Accountability ───────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-panel border border-border-subtle p-8 sm:p-12 shadow-card">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary font-heading mb-3">
              Two service areas, one scoped engagement
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Software and hardware can be discussed separately or as connected parts of one requirement. The proposal identifies the responsible contacts, review points, and included work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border-subtle">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-accent-teal-light text-accent-teal">
                  <Cpu className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-ink-primary font-heading">
                  Software Engineering Division
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Data analytics and forecasting, Generative AI, Agentic AI with explicit permissions and human review, custom web applications, website services, and mobile app development.
              </p>
              <div className="pt-2">
                <Link to="/software" className="text-xs font-semibold text-accent-teal hover:underline flex items-center gap-1">
                  <span>View software capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-accent-blue-light text-accent-blue">
                  <Monitor className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-ink-primary font-heading">
                  IT Hardware Division
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                CCTV and computer sales and services, plus installation and service for customer-owned on-premise server equipment.
              </p>
              <div className="pt-2">
                <Link to="/hardware" className="text-xs font-semibold text-accent-blue hover:underline flex items-center gap-1">
                  <span>View hardware services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Verified Reach & Service Area ────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="content-card border-t-4 border-t-accent-teal space-y-4">
          <div className="badge-software">Availability</div>
          <h2 className="text-2xl font-bold text-ink-primary font-heading">
            Confirm service availability for your requirement
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Remote or on-site availability, service location, scheduling, and any related charges depend on the requirement and are confirmed during the enquiry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent-teal flex-shrink-0" />
              <div>
                <div className="text-xs text-ink-muted">General & Project Inquiries:</div>
                <div className="text-sm font-semibold text-ink-primary">{COMPANY_INFO.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent-teal flex-shrink-0" />
              <div>
                <div className="text-xs text-ink-muted">Phone / WhatsApp:</div>
                <div className="text-sm font-semibold text-ink-primary">{COMPANY_INFO.phoneDisplay}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-start">
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-5">
              <span>Contact our team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
