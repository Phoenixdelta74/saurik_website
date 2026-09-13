import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import Logo from './Logo';

const links = [
  ['/track', 'Saurik Track', 'LIVE ERP'],
  ['/software', 'Software & IT'],
  ['/hardware', 'Hardware & IT Support'],
  ['/about', 'About'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const toggle = useRef(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);

  useEffect(() => {
    const panel = dialog.current;
    if (!open) { if (panel.open) panel.close(); return; }
    const previous = document.body.style.overflow;
    panel.showModal();
    document.body.style.overflow = 'hidden';
    const media = window.matchMedia('(min-width: 1024px)');
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', resize);
    return () => { panel.close(); document.body.style.overflow = previous; media.removeEventListener('change', resize); };
  }, [open]);

  const close = () => { setOpen(false); toggle.current?.focus(); };

  return <>
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Logo size={44} />
        
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-2">
          {links.map(([to, label, badge]) => (
            <NavLink 
              key={to} 
              to={to} 
              className={({ isActive }) => `
                px-3.5 py-2.5 rounded-control text-sm font-medium flex items-center gap-1.5 transition-colors
                ${isActive ? 'bg-white text-accent-teal shadow-subtle' : 'text-ink-secondary hover:text-ink-primary hover:bg-slate-100/60'}
              `}
            >
              <span>{label}</span>
              {badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{badge}</span>
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary text-sm">Discuss your requirement <ArrowRight size={16} /></Link>
        </div>

        <div className="flex lg:hidden gap-2 items-center">
          <div className="hidden sm:block">
            <Link to="/contact" className="btn-primary px-3 text-sm">Contact</Link>
          </div>
          <button ref={toggle} type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" className="p-3 rounded-control">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>

    <dialog ref={dialog} id="mobile-navigation" aria-labelledby="menu-title" onCancel={close} className="m-0 ml-auto h-dvh max-h-none w-full sm:w-96 max-w-full bg-canvas p-6 backdrop:bg-ink-primary/40">
      <div className="flex items-center justify-between mb-8">
        <h2 id="menu-title" className="text-xl font-semibold">Navigation</h2>
        <button autoFocus type="button" onClick={close} aria-label="Close navigation menu" className="p-3"><X size={24} /></button>
      </div>
      <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
        {links.map(([to, label, badge]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)} className="px-4 py-4 border-b border-border-subtle font-medium flex items-center justify-between">
            <span>{label}</span>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{badge}</span>
              </span>
            )}
          </NavLink>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4">Discuss your requirement <ArrowRight size={16} /></Link>
        <Link to="/privacy" onClick={() => setOpen(false)} className="px-4 py-4 text-sm">Privacy & enquiry information</Link>
      </nav>
    </dialog>
  </>;
}
