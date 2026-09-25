import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, ShieldCheck, Check, ArrowRight, Eye, HardDrive, Smartphone, Wrench } from 'lucide-react';

const CCTVSelector = () => {
  const [selectedRoute, setSelectedRoute] = useState('business');

  return (
    <div className="bg-surface rounded-panel border border-border-subtle p-6 md:p-8 shadow-card">
      
      {/* Route Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <span className="badge-hardware mb-2">Surveillance Planning</span>
          <h3 className="text-xl md:text-2xl font-bold text-ink-primary font-heading">
            Choose Your CCTV Requirement
          </h3>
          <p className="text-sm text-ink-secondary">
            Select a premises type to see example questions and possible scope. Equipment and terms are confirmed only in a quotation.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="inline-flex p-1 bg-canvas rounded-control border border-border-subtle self-start sm:self-center">
          <button
            type="button"
            onClick={() => setSelectedRoute('business')}
            className={`flex items-center gap-2 px-4 py-2 rounded-control text-xs font-semibold transition-all ${
              selectedRoute === 'business'
                ? 'bg-accent-blue text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>For My Business</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRoute('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-control text-xs font-semibold transition-all ${
              selectedRoute === 'home'
                ? 'bg-accent-blue text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>For My Home</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Body */}
      {selectedRoute === 'business' ? (
        <div className="pt-6 space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Coverage & Camera Options</h4>
              <p className="text-xs text-ink-secondary">
                Discuss entrances, work areas, storage, lighting, image detail, viewing angles, and any existing cameras before models are selected.
              </p>
            </div>

            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <HardDrive className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Recording & Access</h4>
              <p className="text-xs text-ink-secondary">
                Recording duration, recorder capacity, storage options, user permissions, and playback needs influence the proposed setup.
              </p>
            </div>

            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Cabling & Installation Context</h4>
              <p className="text-xs text-ink-secondary">
                Cable routes, distances, mounting surfaces, power, network equipment, weather exposure, and access constraints are reviewed for the site.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-control bg-accent-blue-light/40 border border-accent-blue/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-accent-blue uppercase tracking-wider">
                Commercial Package Scope
              </div>
              <div className="text-sm font-bold text-ink-primary">
                Business premises and shared operational sites
              </div>
              <div className="text-xs text-ink-secondary">
                The accepted quotation identifies any assessment, equipment, cabling, installation, configuration, and handover included.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <Link
                to="/services/cctv-installation"
                className="btn-secondary text-xs py-2.5 px-3 whitespace-nowrap"
              >
                Detailed CCTV Guide
              </Link>
              <Link
                to="/contact?topic=cctv_commercial"
                className="btn-hardware text-xs py-2.5 px-4 whitespace-nowrap"
              >
                <span>Request Commercial Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-6 space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Home Coverage</h4>
              <p className="text-xs text-ink-secondary">
                Identify the entrances, indoor or outdoor areas, lighting conditions, viewing preferences, and privacy considerations relevant to the home.
              </p>
            </div>

            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <HardDrive className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Recording Options</h4>
              <p className="text-xs text-ink-secondary">
                Discuss local or provider-supported recording, retention needs, account ownership, recurring costs, and access before equipment is chosen.
              </p>
            </div>

            <div className="p-4 rounded-control bg-canvas border border-border-subtle space-y-2">
              <div className="p-2 rounded-md bg-accent-blue-light text-accent-blue inline-block">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink-primary font-heading">Installation & Viewing</h4>
              <p className="text-xs text-ink-secondary">
                Cable routing, finishes, mounting, internet access, compatible phones, and the people who need viewing access form part of the discussion.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-control bg-accent-teal-light/40 border border-accent-teal/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-accent-teal uppercase tracking-wider">
                Residential Package Scope
              </div>
              <div className="text-sm font-bold text-ink-primary">
                Houses, apartments, and other residential premises
              </div>
              <div className="text-xs text-ink-secondary">
                Company name is optional. You can begin with the areas to cover and whether this is a new installation or service request.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <Link
                to="/services/cctv-installation"
                className="btn-secondary text-xs py-2.5 px-3 whitespace-nowrap"
              >
                Detailed CCTV Guide
              </Link>
              <Link
                to="/contact?topic=cctv_residential"
                className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap"
              >
                <span>Request Home CCTV Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CCTVSelector;
