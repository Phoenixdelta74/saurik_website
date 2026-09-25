const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.resolve(__dirname, '..');

async function main() {
  const math = await import(pathToFileURL(path.join(root, 'src/data/analyticsDemoMath.js')).href);
  const data = await import(pathToFileURL(path.join(root, 'src/data/useCaseAnalytics.js')).href);

  assert.equal(data.ANALYTICS_DOMAINS.length, 3);
  assert.deepEqual(data.ANALYTICS_DOMAINS.map((domain) => domain.id), ['fmcg', 'manufacturing', 'apparel']);

  for (const domain of data.ANALYTICS_DOMAINS) {
    const first = math.runAnalysis(domain);
    const second = math.runAnalysis(domain);
    assert.deepEqual(first, second, `${domain.id} analysis must be deterministic`);
    assert.equal(first.forecast.horizon.length, 3);
    assert.equal(first.decisions.length, domain.items.length);
    for (const decision of first.decisions) {
      assert.equal(['rise', 'fall', 'hold'].includes(decision.stance), true);
      assert.equal(decision.action.includes('Example planning option'), true);
      assert.equal(decision.outcome.includes('not a measured business result'), true);
    }
  }

  const fmcg = math.runAnalysis(data.ANALYTICS_DOMAINS[0]);
  const stance = Object.fromEntries(fmcg.decisions.map((decision) => [decision.id, decision.stance]));
  assert.equal(stance.atta, 'rise');
  assert.equal(stance.dishwash, 'fall');
  assert.equal(stance.juice, 'hold');

  const manufacturing = math.runAnalysis(data.ANALYTICS_DOMAINS[1]);
  const mStance = Object.fromEntries(manufacturing.decisions.map((decision) => [decision.id, decision.stance]));
  assert.equal(mStance.pump, 'rise');
  assert.equal(mStance.panel, 'hold');
  assert.equal(mStance.spare, 'fall');

  const apparel = math.runAnalysis(data.ANALYTICS_DOMAINS[2]);
  const aStance = Object.fromEntries(apparel.decisions.map((decision) => [decision.id, decision.stance]));
  assert.equal(aStance.jacket, 'rise');
  assert.equal(aStance.shirt, 'fall');
  assert.equal(aStance.denim, 'hold');

  const page = fs.readFileSync(path.join(root, 'src/pages/UseCases.jsx'), 'utf8');
  const demo = fs.readFileSync(path.join(root, 'src/components/use-cases/AnalyticsUseCaseDemo.jsx'), 'utf8');
  const copy = fs.readFileSync(path.join(root, 'src/data/useCaseAnalytics.js'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8');
  const software = fs.readFileSync(path.join(root, 'src/pages/Software.jsx'), 'utf8');
  const footer = fs.readFileSync(path.join(root, 'src/components/Footer.jsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
  const combined = `${page}\n${demo}\n${copy}`;

  assert.equal(copy.includes('See what to stock, make, or clear next.'), true);
  assert.equal(page.includes('SAMPLE_NOTE'), true);
  assert.equal(demo.includes('{SAMPLE_DISCLAIMER}'), true);
  assert.equal(demo.includes('initialDomain'), true);
  assert.equal(copy.includes(data.SAMPLE_DISCLAIMER), true);
  assert.equal(combined.includes('guaranteed accuracy'), false);
  assert.equal(combined.includes('99%'), false);
  assert.equal(copy.includes('Will the forecast be guaranteed?'), true);
  assert.equal(app.includes('path="/use-cases"'), true);
  assert.equal(app.includes('path="/use-cases/fmcg-demand-planning"'), true);
  assert.equal(app.includes('path="/use-cases/manufacturing-demand-planning"'), true);
  assert.equal(app.includes('path="/use-cases/apparel-demand-planning"'), true);
  assert.equal(page.includes('topic=data_analytics'), true);
  assert.equal(demo.includes('topic=data_analytics'), true);
  assert.equal(software.includes('Try the sample demand-planning demo'), true);
  assert.equal(software.includes('to="/use-cases"'), true);
  assert.equal(footer.includes('Demand planning demo'), true);
  assert.equal(footer.includes('to="/use-cases"'), true);
  for (const url of [
    'https://www.wwwsaurikit.com/use-cases',
    'https://www.wwwsaurikit.com/use-cases/fmcg-demand-planning',
    'https://www.wwwsaurikit.com/use-cases/manufacturing-demand-planning',
    'https://www.wwwsaurikit.com/use-cases/apparel-demand-planning',
  ]) {
    assert.equal(sitemap.includes(url), true, url);
  }
  assert.equal(Object.keys(data.USE_CASE_PAGES).length, 4);

  console.log('use-case analytics demo checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
