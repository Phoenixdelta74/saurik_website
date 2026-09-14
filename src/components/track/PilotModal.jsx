import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Building, Mail, Phone, Users } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const PilotModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [fleetSize, setFleetSize] = useState('10-25');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Saurik Track 14-Day Free Pilot Request - ${company || name}`);
    const body = encodeURIComponent(
      `Hello Saurik Track Team,\n\n` +
      `I would like to activate the 14-Day Free Pilot for our field fleet.\n\n` +
      `Contact Name: ${name}\n` +
      `Work Email: ${email}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Company Name: ${company}\n` +
      `Estimated Fleet Size: ${fleetSize} reps/vans\n\n` +
      `Sent via Saurik Track Pilot Modal.`
    );
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-panel shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-control hover:bg-slate-800 transition-colors"
          aria-label="Close pilot modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Your Pilot Request is Ready!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Your default email app was opened with pre-filled pilot specifications to <strong className="text-cyan-400">{COMPANY_INFO.email}</strong>. Once sent, our field operations team will provision your tenant sandbox.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-control text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
              >
                Return to Saurik Track
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero-Risk 14-Day Pilot</span>
              </div>
              <h3 id="pilot-modal-title" className="text-2xl font-bold font-heading text-white">
                Start Your 14-Day Free Pilot
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                No credit card required. Includes 1-on-1 team onboarding and Excel inventory import.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full px-3.5 py-2.5 rounded-control bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@distributors.com"
                    className="w-full px-3.5 py-2.5 rounded-control bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-control bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Apex Logistics Ltd"
                    className="w-full px-3.5 py-2.5 rounded-control bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Fleet Size (Reps/Vans)
                  </label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-control bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="1-5">1 - 5 Reps</option>
                    <option value="6-15">6 - 15 Reps</option>
                    <option value="16-50">16 - 50 Reps</option>
                    <option value="50+">50+ Enterprise Fleet</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-control text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
                >
                  <span>Activate 14-Day Free Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2 pt-1">
                <span>Direct dispatch to engineering lead</span>
                <span>•</span>
                <span>No unsolicited marketing emails</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default PilotModal;
