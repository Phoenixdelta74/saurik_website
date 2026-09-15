import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, ChevronDown, Compass, Receipt, Sparkles } from 'lucide-react';
import Logo from './Logo';

const corporateLinks = [
  ['/software', 'Software & IT'],
  ['/hardware', 'Hardware & IT Support'],
  ['/about', 'About'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dialog = useRef(null);
  const toggle = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close menus on route or query change
  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.search]);

  // Click outside listener for desktop dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setProductsOpen(false);
    };
    if (productsOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [productsOpen]);

  // Mobile modal dialog lifecycle
  useEffect(() => {
    const panel = dialog.current;
    if (!open) { if (panel?.open) panel.close(); return; }
    const previous = document.body.style.overflow;
    panel.showModal();
    document.body.style.overflow = 'hidden';
    const media = window.matchMedia('(min-width: 1024px)');
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', resize);
    return () => { panel.close(); document.body.style.overflow = previous; media.removeEventListener('change', resize); };
  }, [open]);

  const close = () => { setOpen(false); toggle.current?.focus(); };

  const isProductActive = location.pathname.startsWith('/track') || location.pathname.startsWith('/arthos');

  return <>
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Logo size={44} />
        
        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1.5">
          {/* Products Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              className={`
                px-3.5 py-2.5 rounded-control text-sm font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap
                ${isProductActive || productsOpen ? 'bg-white text-accent-teal shadow-subtle' : 'text-ink-secondary hover:text-ink-primary hover:bg-slate-100/60'}
              `}
            >
              <span>Products</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-accent-teal' : 'text-ink-muted'}`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu Popover */}
            {productsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-84 bg-white rounded-2xl shadow-xl border border-border-subtle p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label="Products submenu"
              >
                <Link
                  to="/track"
                  onClick={() => setProductsOpen(false)}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  role="menuitem"
                >
                  <div className="p-2.5 rounded-lg bg-teal-50 text-accent-teal group-hover:bg-accent-teal group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                    <Compass size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink-primary group-hover:text-accent-teal transition-colors whitespace-nowrap">
                        Saurik Track
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        LIVE ERP
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                      GPS attendance, field visits &amp; live van-stock.
                    </p>
                  </div>
                </Link>

                <div className="h-px bg-border-subtle/60 my-1 mx-2"></div>

                <Link
                  to="/arthos"
                  onClick={() => setProductsOpen(false)}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  role="menuitem"
                >
                  <div className="p-2.5 rounded-lg bg-blue-50 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                    <Receipt size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink-primary group-hover:text-accent-blue transition-colors whitespace-nowrap">
                        Arthos Invoice Studio
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-blue-100 text-blue-800 border border-blue-300">
                        INVOICING
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                      GST-aware billing, collections &amp; Business Health.
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Corporate Links */}
          {corporateLinks.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                px-3.5 py-2.5 rounded-control text-sm font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap
                ${isActive ? 'bg-white text-accent-teal shadow-subtle' : 'text-ink-secondary hover:text-ink-primary hover:bg-slate-100/60'}
              `}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary text-sm whitespace-nowrap">
            Discuss your requirement <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden gap-2 items-center">
          <div className="hidden sm:block">
            <Link to="/contact" className="btn-primary px-3 text-sm whitespace-nowrap">Contact</Link>
          </div>
          <button ref={toggle} type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" className="p-3 rounded-control">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Navigation Drawer */}
    <dialog ref={dialog} id="mobile-navigation" aria-labelledby="menu-title" onCancel={close} className="m-0 ml-auto h-dvh max-h-none w-full sm:w-96 max-w-full bg-canvas p-6 backdrop:bg-ink-primary/40">
      <div className="flex items-center justify-between mb-6">
        <h2 id="menu-title" className="text-xl font-semibold text-ink-primary">Navigation</h2>
        <button autoFocus type="button" onClick={close} aria-label="Close navigation menu" className="p-3"><X size={24} /></button>
      </div>

      <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
        {/* Products Group */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider px-2">
            Software Products
          </span>
          <div className="bg-white rounded-xl border border-border-subtle p-2 space-y-1">
            <NavLink
              to="/track"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Compass size={18} className="text-accent-teal" />
                <span className="font-semibold text-sm text-ink-primary">Saurik Track</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                LIVE ERP
              </span>
            </NavLink>

            <NavLink
              to="/arthos"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Receipt size={18} className="text-accent-blue" />
                <span className="font-semibold text-sm text-ink-primary">Arthos Invoice Studio</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-100 text-blue-800 border border-blue-300">
                INVOICING
              </span>
            </NavLink>
          </div>
        </div>

        {/* Corporate Services Group */}
        <div className="space-y-1 pt-2">
          <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider px-2">
            Corporate Services
          </span>
          {corporateLinks.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="px-4 py-3.5 border-b border-border-subtle font-medium text-sm text-ink-secondary hover:text-ink-primary flex items-center justify-between"
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full justify-center">
          Discuss your requirement <ArrowRight size={16} />
        </Link>
        <Link to="/privacy" onClick={() => setOpen(false)} className="px-2 py-2 text-xs text-ink-muted text-center">
          Privacy &amp; enquiry information
        </Link>
      </nav>
    </dialog>
  </>;
}
