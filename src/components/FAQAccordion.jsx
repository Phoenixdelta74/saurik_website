import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-border-subtle border-y border-border-subtle">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div key={idx} className="py-4 sm:py-5">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(idx)}
              className="w-full flex items-start justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal rounded"
            >
              <span className="font-heading font-semibold text-lg text-ink-primary group-hover:text-accent-teal transition-colors">
                {item.q}
              </span>
              <span className={`p-1.5 rounded-full bg-slate-100 group-hover:bg-accent-teal-light text-ink-secondary group-hover:text-accent-teal transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-accent-teal-light text-accent-teal' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="mt-3 text-ink-secondary text-sm sm:text-base leading-relaxed animate-in fade-in duration-200"
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
