import React, { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ANALYTICS_DOMAINS, SAMPLE_DISCLAIMER } from '../../data/useCaseAnalytics';
import { formatMonth, formatPct, runAnalysis } from '../../data/analyticsDemoMath';

const STANCE_LABEL = {
  rise: 'Prepare more',
  fall: 'Slow down',
  hold: 'Keep plan',
};

const LEAD_VERB = {
  rise: 'steps up',
  fall: 'eases off',
  hold: 'holds steady',
};

function units(value) {
  return value.toLocaleString('en-IN');
}

export default function AnalyticsUseCaseDemo({ initialDomain = 'fmcg' }) {
  const baseId = useId();
  const startingDomain = ANALYTICS_DOMAINS.some((item) => item.id === initialDomain) ? initialDomain : 'fmcg';
  const [domainId, setDomainId] = useState(startingDomain);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');
  const domain = ANALYTICS_DOMAINS.find((item) => item.id === domainId);

  useEffect(() => {
    setDomainId(startingDomain);
    setResult(null);
    setStatus('');
  }, [startingDomain]);

  const publish = (nextDomain, reason) => {
    const analysis = runAnalysis(nextDomain);
    setResult({ domainId: nextDomain.id, ...analysis });
    setStatus(
      reason === 'switch'
        ? `Sample analysis updated for ${nextDomain.label}. Figures are computed from sample data.`
        : `Sample analysis ready for ${nextDomain.label}. Figures are computed from sample data.`
    );
  };

  const selectDomain = (nextId) => {
    const nextDomain = ANALYTICS_DOMAINS.find((item) => item.id === nextId);
    setDomainId(nextId);
    if (result) publish(nextDomain, 'switch');
  };

  const history = result
    ? result.described.monthlyTotals.slice(-6)
    : [];
  const bars = result
    ? [
        ...history.map((row) => ({ label: row.label, total: row.total, forecast: false })),
        ...result.forecast.horizon.map((row) => ({ label: row.label, total: row.total, forecast: true })),
      ]
    : [];
  const maxBar = bars.reduce((max, bar) => Math.max(max, bar.total), 1);

  return (
    <div>
      <div className="uc-domains" role="group" aria-label="Sample industry">
        {ANALYTICS_DOMAINS.map((item) => {
          const selected = item.id === domainId;
          return (
            <button
              key={item.id}
              id={`${baseId}-${item.id}`}
              type="button"
              aria-pressed={selected}
              className="uc-domain"
              onClick={() => selectDomain(item.id)}
            >
              <span className="uc-domain-index">{item.index}</span>
              <span className="uc-domain-label">{item.label}</span>
              <span className="uc-domain-question">{item.question}</span>
            </button>
          );
        })}
      </div>

      <div className="uc-runrow">
        <button type="button" className="uc-run" onClick={() => publish(domain, 'run')}>
          Run sample analysis
        </button>
        <p className="uc-window">{domain.window}</p>
      </div>
      <p className="uc-status" role="status">{status}</p>

      <div
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${domainId}`}
        className="uc-stage"
      >
        <p className="uc-watermark" aria-hidden="true">{domain.label}</p>
        {result && result.domainId === domainId ? (
          <div className="uc-bento">
            <article className="uc-panel uc-panel-data">
              <p className="uc-step">01 Sample data</p>
              <h2>Monthly units</h2>
              <div className="uc-table-wrap">
                <table className="uc-table">
                  <caption>Sample units by month. These figures are invented for the demo.</caption>
                  <thead>
                    <tr>
                      <th scope="col">Month</th>
                      {domain.items.map((item) => (
                        <th key={item.id} scope="col">{item.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {domain.months.map((month, index) => (
                      <tr key={month}>
                        <th scope="row">{formatMonth(month)}</th>
                        {domain.items.map((item) => (
                          <td key={item.id}>{units(domain.series[item.id][index])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="uc-panel uc-panel-desc">
              <p className="uc-step">02 Descriptive read</p>
              <h2>What the history shows</h2>
              <div className="uc-stats">
                <div>
                  <p className="uc-stat-value">{units(result.described.totalLast12)}</p>
                  <p className="uc-stat-label">Units across the last 12 sample months</p>
                </div>
                <div>
                  <p className="uc-stat-value">{formatPct(result.described.recentVsPriorPct)}</p>
                  <p className="uc-stat-label">Latest 3 months versus the 3 months before them</p>
                </div>
                <div>
                  <p className="uc-stat-value">{result.described.peakMonthLabel}</p>
                  <p className="uc-stat-label">
                    Peak month in this sample, {units(result.described.peakMonthTotal)} units.
                    Highest recent item: {result.described.topItem.name}. Lowest recent item: {result.described.bottomItem.name}.
                  </p>
                </div>
              </div>
            </article>

            <article className="uc-panel uc-panel-forecast">
              <p className="uc-step">03 Baseline forecast</p>
              <h2>Next 3 sample months</h2>
              <div className="uc-signal">
                <strong>
                  {result.lead.name} {LEAD_VERB[result.lead.stance]} ({result.lead.pctLabel})
                </strong>
                <p className="uc-note">Compared with that item’s last 3 sample months. This is the baseline on the sample series, not a validated model score.</p>
              </div>
              <div className="uc-bars" aria-hidden="true">
                {bars.map((bar) => (
                  <div key={bar.label} className={bar.forecast ? 'uc-bar uc-bar-forecast' : 'uc-bar'}>
                    <span className="uc-bar-value">{units(bar.total)}</span>
                    <div className="uc-bar-fill" style={{ height: `${Math.max(8, (bar.total / maxBar) * 150)}px` }} />
                    <span className="uc-bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
              <div className="uc-legend">
                <span><i className="uc-swatch" /> Recent history</span>
                <span><i className="uc-swatch uc-swatch-forecast" /> Baseline projection</span>
              </div>
              <p className="uc-method">
                Each forecast month starts from the same month a year earlier, then shifts by how much the latest 3 months differ from those months last year. The range under each item is the typical month-to-month swing in this sample. It is not a validated prediction interval.
              </p>
              <ul className="uc-forecast-list">
                {result.forecast.byItem.map((item) => (
                  <li key={item.id}>
                    {item.name}: {item.points.map((point) => `${point.label} ${units(point.point)} (${units(point.lower)}–${units(point.upper)})`).join(', ')}
                  </li>
                ))}
              </ul>
            </article>

            <article className="uc-panel uc-panel-decide">
              <p className="uc-step">04 Example decisions</p>
              <h2>What a planner could discuss</h2>
              <div className="uc-decisions">
                {result.decisions.map((decision) => (
                  <article key={decision.id} className="uc-decision">
                    <p className={`uc-stance uc-stance-${decision.stance}`}>{STANCE_LABEL[decision.stance]}</p>
                    <h3>{decision.name}</h3>
                    <p>{decision.action}</p>
                    <p className="uc-outcome">{decision.outcome}</p>
                  </article>
                ))}
              </div>
              <p className="uc-disclaimer">{SAMPLE_DISCLAIMER}</p>
              <Link className="uc-cta" to="/contact?topic=data_analytics">Discuss a data analytics need</Link>
            </article>
          </div>
        ) : (
          <div className="uc-bento">
            <article className="uc-panel uc-panel-empty uc-empty">
              <p className="uc-step">Plug and play</p>
              <h2>Run the sample. Watch the four steps fill in.</h2>
              <p className="uc-note">Data, a descriptive read, a baseline forecast, then example planning options. Nothing here is a client result.</p>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
