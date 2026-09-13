import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, Lock, Server, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const TrackFooter = ({ onOpenPilot }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="Saurik Track" className="h-9 w-9 object-contain" />
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Saurik <span className="text-cyan-400">Track</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Next-generation field operations ERP, hardware-verified attendance tracking, and real-time van inventory accounting for mobile distribution fleets.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Multi-Tenant Architecture</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                <Server className="w-3.5 h-3.5" />
                <span>Google Cloud Verified</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Anchors (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono uppercase font-bold text-white tracking-wider text-[11px]">
              Platform Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Anti-Tamper Mobility</a></li>
              <li><a href="#inventory" className="hover:text-cyan-400 transition-colors">Van Inventory Ledger</a></li>
              <li><a href="#command-center" className="hover:text-cyan-400 transition-colors">60 FPS Command Center</a></li>
              <li><a href="#roi" className="hover:text-cyan-400 transition-colors">Payroll Savings Calculator</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">Security & Multi-Tenancy</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing ($9/user/month)</a></li>
            </ul>
          </div>

          {/* Col 3: Corporate Affiliation & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono uppercase font-bold text-white tracking-wider text-[11px]">
              Corporate Parent
            </div>
            <p className="text-slate-400 leading-relaxed">
              Saurik Track is a proprietary SaaS mobile ERP platform developed and supported by <strong>{COMPANY_INFO.legalName}</strong>.
            </p>
            
            <div className="pt-1 flex flex-col gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to SAURIK IT Corporate Site</span>
              </Link>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
              >
                <span>Direct Fleet WhatsApp Support</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved. Saurik Track™ is a trademark of Saurik IT.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact?topic=saurik_track" className="hover:text-white transition-colors">Enterprise SLA</Link>
            <button type="button" onClick={onOpenPilot} className="text-cyan-400 hover:underline">
              Founding Partner Pilot
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default TrackFooter;
