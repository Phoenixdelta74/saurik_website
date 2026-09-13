import React, { useState } from 'react';
import { TrendingUp, BarChart3, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

const AnalyticsChart = () => {
  const [metric, setMetric] = useState('demand');

  const dataSets = {
    demand: {
      title: "Inventory Demand Forecasting Model",
      question: "What will component inventory requirements look like across Q3 and Q4?",
      sources: "Example inputs: historical orders and supplier lead-time records",
      historical: [
        { label: "Q1", value: 68, isHistorical: true },
        { label: "Q2", value: 74, isHistorical: true },
        { label: "Q3", value: 82, isHistorical: true },
        { label: "Q4", value: 95, isHistorical: true },
      ],
      forecast: [
        { label: "Q1 Proj", value: 108, lower: 101, upper: 115, isHistorical: false },
        { label: "Q2 Proj", value: 122, lower: 112, upper: 132, isHistorical: false },
      ],
      refreshCadence: "Example option: weekly refresh after data-quality checks",
      confidence: "Illustrative prediction interval—not a measured result",
    },
    revenue: {
      title: "Recurring Revenue & Renewal Projection",
      question: "Which client contract renewals are at risk of volume contraction next quarter?",
      sources: "Example inputs: usage, invoicing, and support records",
      historical: [
        { label: "Q1", value: 52, isHistorical: true },
        { label: "Q2", value: 61, isHistorical: true },
        { label: "Q3", value: 70, isHistorical: true },
        { label: "Q4", value: 79, isHistorical: true },
      ],
      forecast: [
        { label: "Q1 Proj", value: 92, lower: 86, upper: 98, isHistorical: false },
        { label: "Q2 Proj", value: 104, lower: 95, upper: 114, isHistorical: false },
      ],
      refreshCadence: "Example option: monthly refresh and review",
      confidence: "Validation method and acceptable error set during discovery",
    },
  };

  const active = dataSets[metric];

  return (
    <div className="bg-surface rounded-panel border border-border-subtle p-6 lg:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-teal uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Forecasting & Intelligence Output</span>
          </div>
          <h3 className="text-xl font-bold text-ink-primary font-heading">
            {active.title}
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Hypothetical values showing the form an analytical output could take. This is not client work or a forecast-accuracy claim.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="inline-flex p-1 bg-canvas rounded-control border border-border-subtle self-start sm:self-center">
          <button
            type="button"
            onClick={() => setMetric('demand')}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-all ${
              metric === 'demand'
                ? 'bg-accent-teal text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Demand Forecasting
          </button>
          <button
            type="button"
            onClick={() => setMetric('revenue')}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-all ${
              metric === 'revenue'
                ? 'bg-accent-teal text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Revenue Trajectory
          </button>
        </div>
      </div>

      {/* Chart Visual Representation */}
      <div className="pt-6">
        <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 pt-4 pb-2 border-b border-border-subtle relative">
          
          {/* Historical points */}
          {active.historical.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[11px] font-mono font-semibold text-ink-muted group-hover:text-ink-primary transition-colors">
                {d.value}k
              </span>
              <div
                style={{ height: `${d.value * 1.2}px` }}
                className="w-full max-w-[48px] bg-slate-200 hover:bg-slate-300 rounded-t transition-all"
                title={`Historical Actual: ${d.value}k`}
              />
              <span className="text-xs font-medium text-ink-secondary mt-1">
                {d.label}
              </span>
            </div>
          ))}

          {/* Forecasted points with confidence band */}
          {active.forecast.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
              <span className="text-[11px] font-mono font-bold text-accent-teal">
                ~{d.value}k*
              </span>
              <div
                style={{ height: `${d.value * 1.2}px` }}
                className="w-full max-w-[48px] bg-accent-teal/80 hover:bg-accent-teal rounded-t transition-all relative"
                title={`Projected: ${d.value}k (Interval: ${d.lower}k - ${d.upper}k)`}
              >
                {/* Confidence indicator marker */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-teal ring-4 ring-accent-teal-light"
                />
              </div>
              <span className="text-xs font-bold text-accent-teal mt-1">
                {d.label}
              </span>
            </div>
          ))}

        </div>

        <div className="flex items-center justify-between text-[11px] text-ink-muted pt-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-300 inline-block"></span>
              Historical Actuals
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-accent-teal inline-block"></span>
              Predictive Projection
            </span>
          </div>
          <span className="italic">*Illustrative projections only; real results require data-specific validation</span>
        </div>
      </div>

      {/* Model Spec Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-border-subtle bg-canvas p-4 rounded-control">
        <div>
          <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1 mb-1">
            <Database className="w-3.5 h-3.5 text-accent-teal" />
            <span>Data Sources</span>
          </div>
          <p className="text-xs text-ink-secondary">{active.sources}</p>
        </div>

        <div>
          <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
            <span>Validation Metric</span>
          </div>
          <p className="text-xs text-ink-secondary">{active.confidence}</p>
        </div>

        <div>
          <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1 mb-1">
            <RefreshCw className="w-3.5 h-3.5 text-accent-teal" />
            <span>Refresh Cadence</span>
          </div>
          <p className="text-xs text-ink-secondary">{active.refreshCadence}</p>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsChart;
