import { Link, useLocation } from 'react-router-dom';
import AnalyticsUseCaseDemo from '../components/use-cases/AnalyticsUseCaseDemo';
import { SAMPLE_NOTE, USE_CASE_FAQS, USE_CASE_PAGES } from '../data/useCaseAnalytics';
import './UseCases.css';

const INDUSTRY_LINKS = [
  ['/use-cases', 'All three'],
  ['/use-cases/fmcg-demand-planning', 'FMCG'],
  ['/use-cases/manufacturing-demand-planning', 'Manufacturing'],
  ['/use-cases/apparel-demand-planning', 'Apparel'],
];

export default function UseCases() {
  const { pathname } = useLocation();
  const page = USE_CASE_PAGES[pathname] || USE_CASE_PAGES['/use-cases'];

  return (
    <div className="uc-page">
      <div className="uc-wrap">
        <section id="demand-planning" aria-labelledby="demand-planning-title">
          <p className="uc-kicker">{page.kicker}</p>
          <h1 id="demand-planning-title" className="uc-title">{page.headline}</h1>
          <p className="uc-lede">{page.lede}</p>
          <p className="uc-lede">{SAMPLE_NOTE}</p>
          <nav className="uc-industries" aria-label="Demand planning examples">
            {INDUSTRY_LINKS.map(([to, label]) => (
              <Link key={to} className="uc-industry-link" to={to} aria-current={pathname === to ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </nav>
          <AnalyticsUseCaseDemo initialDomain={page.domainId} />
          <div className="uc-faq">
            <h2>Before you bring your own data</h2>
            {USE_CASE_FAQS.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <Link className="uc-cta" to="/contact?topic=data_analytics">Discuss a data analytics need</Link>
        </section>
      </div>
    </div>
  );
}
