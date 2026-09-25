const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const THRESHOLD = 0.08;

export function formatMonth(ym) {
  const [year, month] = ym.split('-').map(Number);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function formatPct(pct) {
  const rounded = Math.round(pct * 1000) / 10;
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded.toFixed(1)}%`;
}

function addMonths(ym, count) {
  const [year, month] = ym.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1 + count, 1));
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${date.getUTCFullYear()}-${nextMonth}`;
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function assertDomain(domain) {
  if (!domain?.months || domain.months.length < 15) {
    throw new Error('Sample series must include at least 15 months.');
  }
  for (const item of domain.items) {
    const series = domain.series[item.id];
    if (!series || series.length !== domain.months.length) {
      throw new Error(`Sample series length does not match months for ${item.id}.`);
    }
  }
}

function itemSum(domain, itemId, start, end) {
  return domain.series[itemId].slice(start, end).reduce((sum, value) => sum + value, 0);
}

export function describeDomain(domain) {
  assertDomain(domain);
  const count = domain.months.length;
  const recentStart = count - 3;
  const priorStart = count - 6;
  const yearStart = count - 12;

  const monthlyTotals = domain.months.map((month, index) => ({
    month,
    label: formatMonth(month),
    total: domain.items.reduce((sum, item) => sum + domain.series[item.id][index], 0),
  }));

  const recent = monthlyTotals.slice(recentStart).reduce((sum, row) => sum + row.total, 0);
  const prior = monthlyTotals.slice(priorStart, recentStart).reduce((sum, row) => sum + row.total, 0);
  const last12 = monthlyTotals.slice(yearStart).reduce((sum, row) => sum + row.total, 0);
  const peak = monthlyTotals.reduce((best, row) => (row.total > best.total ? row : best), monthlyTotals[0]);

  const ranked = domain.items.map((item) => ({
    id: item.id,
    name: item.name,
    recent: itemSum(domain, item.id, recentStart, count),
  })).sort((a, b) => b.recent - a.recent || a.name.localeCompare(b.name));

  return {
    totalLast12: last12,
    recentVsPriorPct: prior === 0 ? 0 : (recent - prior) / prior,
    peakMonthLabel: peak.label,
    peakMonthTotal: peak.total,
    topItem: ranked[0],
    bottomItem: ranked[ranked.length - 1],
    monthlyTotals,
  };
}

export function forecastDomain(domain) {
  assertDomain(domain);
  const count = domain.months.length;
  const lastMonth = domain.months[count - 1];
  const horizonMonths = [1, 2, 3].map((step) => addMonths(lastMonth, step));

  const byItem = domain.items.map((item) => {
    const values = domain.series[item.id];
    const last3 = values.slice(count - 3);
    const yearAgo3 = values.slice(count - 15, count - 12);
    const drift = mean(last3) - mean(yearAgo3);
    const changes = values.slice(1).map((value, index) => Math.abs(value - values[index]));
    const band = Math.round(mean(changes.slice(-12)));
    const points = horizonMonths.map((month, index) => {
      const point = Math.max(0, Math.round(values[count - 12 + index] + drift));
      return {
        month,
        label: formatMonth(month),
        point,
        lower: Math.max(0, point - band),
        upper: point + band,
      };
    });
    const forecastSum = points.reduce((sum, point) => sum + point.point, 0);
    const recentSum = last3.reduce((sum, value) => sum + value, 0);
    return {
      id: item.id,
      name: item.name,
      points,
      band,
      forecastSum,
      recentSum,
      pct: recentSum === 0 ? 0 : (forecastSum - recentSum) / recentSum,
    };
  });

  const horizon = horizonMonths.map((month, index) => ({
    month,
    label: formatMonth(month),
    total: byItem.reduce((sum, item) => sum + item.points[index].point, 0),
  }));

  return { byItem, horizon };
}

export function prescribeDomain(domain, forecast) {
  return forecast.byItem.map((item) => {
    const stance = item.pct >= THRESHOLD ? 'rise' : item.pct <= -THRESHOLD ? 'fall' : 'hold';
    const pctLabel = formatPct(item.pct);
    const action = domain.actions[stance]
      .split('{name}').join(item.name)
      .split('{pct}').join(pctLabel);
    return {
      id: item.id,
      name: item.name,
      stance,
      pct: item.pct,
      pctLabel,
      action,
      outcome: domain.outcome,
    };
  });
}

export function runAnalysis(domain) {
  const described = describeDomain(domain);
  const forecast = forecastDomain(domain);
  const decisions = prescribeDomain(domain, forecast);
  const lead = decisions.reduce((best, decision) => (
    Math.abs(decision.pct) > Math.abs(best.pct) ? decision : best
  ), decisions[0]);
  return { described, forecast, decisions, lead };
}
