import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, ArrowRight, Shield, Layers, DollarSign, Lock, LogIn, ExternalLink } from 'lucide-react';

const TrackHeader = ({ onOpenPilot, onOpenDemo, currency = 'USD', onCurrencyChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#inventory', label: 'Van Inventory' },
    { href: '#roi', label: 'ROI Calculator' },
    { href: '#security', label: 'Security & Privacy' },
    { href: '#pricing', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-[37px] z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Lockup & Corporate Back Link */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors pr-3 border-r border-slate-800"
            title="Return to SAURIK IT Corporate Website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>SAURIK IT</span>
          </Link>

          <Link to="/track" className="flex items-center gap-3 group focus:outline-none">
            {/* S-Constellation Mark */}
            <img
              src="/logo-mark.png"
              alt="Saurik Track Logo"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="flex items-baseline gap-1.5 font-heading font-extrabold text-xl tracking-tight text-white">
                <span>Saurik</span>
                <span className="text-cyan-400">Track</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  ERP
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans tracking-wide">
                Field Force & Van Inventory
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Anchors */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Saurik Track Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-control transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Currency Toggle */}
          {onCurrencyChange && (
            <div className="inline-flex items-center p-0.5 bg-slate-900 rounded-control border border-slate-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded transition-colors font-bold ${
                  currency === 'USD'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to USD Dollar"
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`px-2.5 py-1 rounded transition-colors font-bold ${
                  currency === 'INR'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to INR Rupee"
              >
                INR (₹)
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 rounded-control border border-slate-800 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Sign In</span>
          </button>

          <button
            type="button"
            onClick={onOpenPilot}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-control text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-md shadow-cyan-950/40 transition-all active:scale-[0.98]"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenPilot}
            className="px-3 py-1.5 text-xs font-bold rounded-control bg-cyan-400 text-slate-950 md:hidden"
          >
            Try Free
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-control text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-expanded={mobileOpen}
            aria-label="Toggle Saurik Track menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[117px] z-50 bg-slate-950 flex flex-col lg:hidden border-t border-slate-800 animate-in fade-in duration-200">
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-slate-900 p-3 rounded-control"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to SAURIK IT Corporate Home</span>
              </Link>

              <nav className="flex flex-col gap-2 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-control transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Currency Selector in Mobile Menu */}
              {onCurrencyChange && (
                <div className="pt-3 border-t border-slate-900">
                  <span className="text-xs text-slate-400 font-mono block mb-2 px-1">Display Currency:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('USD')}
                      className={`py-2 px-3 rounded text-xs font-mono font-bold border transition-colors ${
                        currency === 'USD'
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('INR')}
                      className={`py-2 px-3 rounded text-xs font-mono font-bold border transition-colors ${
                        currency === 'INR'
                          ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      INR (₹)
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { setMobileOpen(false); onOpenDemo(); }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-control text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>Admin Command Center Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { setMobileOpen(false); onOpenPilot(); }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-control text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md"
              >
                <span>Start 14-Day Free Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TrackHeader;
