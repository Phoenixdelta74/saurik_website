import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DELIVERY_PROCESS } from '../data/companyData';

const ProcessTimeline = () => {
  return (
    <ol className="overflow-hidden rounded-panel border border-border-subtle bg-surface shadow-card lg:grid lg:grid-cols-4">
      {DELIVERY_PROCESS.map((step, index) => (
        <li
          key={step.step}
          className={`relative p-6 sm:p-7 ${index > 0 ? 'border-t border-border-subtle lg:border-l lg:border-t-0' : ''}`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-teal-light font-heading text-sm font-extrabold text-accent-teal">
              {step.step}
            </span>
            <h3 className="font-heading text-lg font-bold text-ink-primary">{step.name}</h3>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-secondary">{step.description}</p>
          <div className="mt-5 flex items-start gap-2 border-t border-border-subtle pt-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" aria-hidden="true" />
            <p className="text-xs font-medium leading-relaxed text-ink-primary">{step.output}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default ProcessTimeline;
