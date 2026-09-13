import React, { useState, useEffect } from 'react';
import { X, Play, MapPin, Package, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

const DemoModal = ({ isOpen, onClose, onOpenPilot }) => {
  const [activeTab, setActiveTab] = useState('dispatch');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-panel shadow-2xl p-6 sm:p-8 text-white overflow-hidden space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-control hover:bg-slate-800 transition-colors"
          aria-label="Close demo modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 inline-block">
            Interactive Product Preview
          </span>
          <h3 id="demo-modal-title" className="text-2xl font-bold font-heading text-white">
            Saurik Track Command Center Simulation
          </h3>
          <p className="text-xs text-slate-400">
            See how dispatchers monitor live field fleets and van inventory with sub-second latency.
          </p>
        </div>

        {/* Feature Preview Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('dispatch')}
            className={`px-3 py-1.5 rounded-control text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'dispatch' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Fleet GPS Replay</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-control text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'inventory' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Van Stock Ledger</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tamper')}
            className={`px-3 py-1.5 rounded-control text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'tamper' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Spoof Telemetry</span>
          </button>
        </div>

        {/* Simulated Display Screen */}
        <div className="bg-slate-950 rounded-control p-4 border border-slate-800 font-mono text-xs space-y-3">
          {activeTab === 'dispatch' && (
            <div className="space-y-2">
              <div className="flex justify-between text-slate-400 border-b border-slate-900 pb-1.5">
                <span className="text-cyan-400 font-bold">ROUTE_ID #TK-8492</span>
                <span className="text-emerald-400">● LIVE SIGNAL (3s ago)</span>
              </div>
              <div className="text-slate-300">Driver: Rajesh K. • Van #04 (Tata Ace)</div>
              <div className="text-slate-400 text-[11px]">
                Stop 03: Prime Electronics Ltd • Check-in Verified: 14:32:04 IST
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                ✓ Hardware Geofence Validated (18m from premises). Zero mock location flags detected.
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-2">
              <div className="flex justify-between text-slate-400 border-b border-slate-900 pb-1.5">
                <span className="text-cyan-400 font-bold">VAN_STOCK #V04</span>
                <span className="text-slate-300">Warehouse Link: Central Hub B</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-slate-300 text-[11px]">
                <div>SKU: 4K-CAM-01</div>
                <div>Loaded: 12 units</div>
                <div className="text-emerald-400">On-Van: 8 units (4 sold)</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                Stock transfer handshake confirmed with Van #02. Digital bill-of-materials committed atomically.
              </div>
            </div>
          )}

          {activeTab === 'tamper' && (
            <div className="space-y-2">
              <div className="flex justify-between text-slate-400 border-b border-slate-900 pb-1.5">
                <span className="text-amber-400 font-bold">INTEGRITY_AUDIT</span>
                <span className="text-emerald-400">100% REJECTION RATE</span>
              </div>
              <div className="text-slate-300">Device Clock Delta: 0.12s (Server Synchronized)</div>
              <div className="text-slate-400 text-[11px]">
                isMockLocationProvider: false • OEM Battery Saver Whitelisted: true
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                Mock GPS attempt from package &apos;fake.gps.location&apos; blocked and flagged on dispatch dashboard.
              </div>
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400">
            Ready to test this with your actual fleet?
          </span>
          <button
            type="button"
            onClick={() => { onClose(); onOpenPilot(); }}
            className="w-full sm:w-auto py-2.5 px-5 rounded-control text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center justify-center gap-1.5"
          >
            <span>Activate 14-Day Free Pilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
