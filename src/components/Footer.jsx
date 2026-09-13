import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '../data/companyData';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border-subtle pt-16 pb-12 mt-20 text-ink-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-border-subtle">
          
          {/* Brand & Purpose Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size={48} />
            <p className="text-sm text-ink-secondary leading-relaxed pt-2">
              Technology, Deliberately. Data analytics, AI, web and mobile applications, website services, and IT hardware sales and services shaped around specific requirements.
            </p>
            
            <div className="pt-2 space-y-2">
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-2.5 text-sm font-medium text-ink-primary hover:text-accent-teal transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <a 
                href={`tel:+91${COMPANY_INFO.phone}`} 
                className="flex items-center gap-2.5 text-sm font-medium text-ink-primary hover:text-accent-teal transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-ink-secondary">
                <MapPin className="w-4 h-4 text-ink-muted flex-shrink-0" />
                <span>{COMPANY_INFO.availability}</span>
              </div>
            </div>
          </div>

          {/* Software & IT Division (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-teal">
              <span className="w-2 h-2 rounded-full bg-accent-teal"></span>
              Software & IT Division
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/track" className="hover:text-ink-primary hover:underline transition-colors flex items-center gap-1.5 text-accent-teal font-semibold">
                  <span>Saurik Track (Field & Fleet ERP)</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">LIVE</span>
                </Link>
              </li>
              <li>
                <Link to="/software#data-analytics" className="hover:text-ink-primary hover:underline transition-colors">
                  Data Analytics as a Service
                </Link>
              </li>
              <li>
                <Link to="/software#generative-ai" className="hover:text-ink-primary hover:underline transition-colors">
                  Generative AI Systems
                </Link>
              </li>
              <li>
                <Link to="/software#agentic-ai" className="hover:text-ink-primary hover:underline transition-colors">
                  Agentic AI Workflows
                </Link>
              </li>
              <li>
                <Link to="/software#custom-apps" className="hover:text-ink-primary hover:underline transition-colors">
                  Custom Web Applications
                </Link>
              </li>
              <li>
                <Link to="/software#web-design" className="hover:text-ink-primary hover:underline transition-colors">
                  Website Design & Support
                </Link>
              </li>
              <li>
                <Link to="/software#mobile-apps" className="hover:text-ink-primary hover:underline transition-colors">
                  Mobile App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Hardware & IT Support Division (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-blue">
              <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
              IT Hardware Division
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/hardware#cctv" className="hover:text-ink-primary hover:underline transition-colors">
                  CCTV Sales & Services (Home & Business)
                </Link>
              </li>
              <li>
                <Link to="/hardware#computers" className="hover:text-ink-primary hover:underline transition-colors">
                  Computer Sales & Workstations
                </Link>
              </li>
              <li>
                <Link to="/hardware#servers" className="hover:text-ink-primary hover:underline transition-colors">
                  Server Installation & Service
                </Link>
              </li>
              <li>
                <Link to="/contact?topic=hardware_quote" className="hover:text-ink-primary hover:underline transition-colors flex items-center gap-1 text-accent-blue font-medium pt-1">
                  <span>Request Hardware Quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-primary">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-ink-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ink-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-ink-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
            
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>{COMPANY_INFO.availability}</span>
            <Link to="/privacy" className="hover:text-ink-primary underline underline-offset-2">Privacy & Enquiries</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
