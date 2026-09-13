import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { TRACK_ROI_DEFAULTS, TRACK_CURRENCIES, calculateROI } from '../../data/trackData';

const ROICalculator = ({ onOpenPilot, currency: controlledCurrency, onCurrencyChange }) => {
  const [internalCurrency, setInternalCurrency] = useState('USD');
  const activeCurrency = controlledCurrency || internalCurrency;
  const setCurrency = onCurrencyChange || setInternalCurrency;

  const currencyConfig = TRACK_CURRENCIES[activeCurrency] || TRACK_CURRENCIES.USD;

  const [reps, setReps] = useState(TRACK_ROI_DEFAULTS.reps);
  const [wage, setWage] = useState(currencyConfig.defaultWage);
  const [wastedMins, setWastedMins] = useState(TRACK_ROI_DEFAULTS.wastedMins);

  const handleCurrencySelect = (newCurr) => {
    if (newCurr === activeCurrency) return;
    setCurrency(newCurr);
    const targetConfig = TRACK_CURRENCIES[newCurr] || TRACK_CURRENCIES.USD;
    setWage(targetConfig.defaultWage);
  };

  const { monthlyWastedPayroll, trackCost, netMonthlySavings, annualSavings, symbol } = calculateROI(
    reps,
    wage,
    wastedMins,
    activeCurrency
  );

  return (
    <div className="bg-slate-900/90 rounded-panel border border-cyan-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Interactive Payroll Recovery Engine</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Calculate Your Monthly Payroll Leakage
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Adjust the sliders below to see how much idle time, false visits, and unmonitored van inventory are costing your bottom line.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
            {/* Dollar / Rupee Toggle Pill */}
            <div className="inline-flex items-center p-1 bg-slate-950 rounded-control border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => handleCurrencySelect('USD')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                  activeCurrency === 'USD'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Switch to USD Dollar currency"
              >
                <span>USD ($)</span>
              </button>
              <button
                type="button"
                onClick={() => handleCurrencySelect('INR')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                  activeCurrency === 'INR'
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Switch to INR Rupee currency"
              >
                <span>INR (₹)</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-control border border-slate-800 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <div className="text-xs">
                <span className="text-slate-400 block font-mono">Saurik Track Cost:</span>
                <span className="text-sm font-bold text-cyan-400 font-mono">
                  {symbol}{currencyConfig.costPerUser}/user/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Field Reps */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="reps-range" className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Number of Field Reps / Vans</span>
                </label>
                <span className="font-mono text-base font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {reps} reps
                </span>
              </div>
              <input
                id="reps-range"
                type="range"
                min={TRACK_ROI_DEFAULTS.minReps}
                max={TRACK_ROI_DEFAULTS.maxReps}
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 rep</span>
                <span>50 reps</span>
                <span>100 reps</span>
              </div>
            </div>

            {/* Slider 2: Hourly Wage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="wage-range" className="flex items-center gap-2 text-slate-300 font-semibold">
                  <span className="w-4 h-4 font-bold text-emerald-400 flex items-center justify-center text-sm">
                    {symbol}
                  </span>
                  <span>Average Hourly Wage / Cost</span>
                </label>
                <span className="font-mono text-base font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {symbol}{wage}/hr
                </span>
              </div>
              <input
                id="wage-range"
                type="range"
                min={currencyConfig.minWage}
                max={currencyConfig.maxWage}
                step={currencyConfig.wageStep}
                value={wage}
                onChange={(e) => setWage(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>{currencyConfig.sliderMarks[0]}</span>
                <span>{currencyConfig.sliderMarks[1]}</span>
                <span>{currencyConfig.sliderMarks[2]}</span>
              </div>
            </div>

            {/* Slider 3: Wasted Minutes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="mins-range" className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Estimated Unverified / Idled Mins per Day</span>
                </label>
                <span className="font-mono text-base font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {wastedMins} mins/day
                </span>
              </div>
              <input
                id="mins-range"
                type="range"
                min={TRACK_ROI_DEFAULTS.minWastedMins}
                max={TRACK_ROI_DEFAULTS.maxWastedMins}
                step={5}
                value={wastedMins}
                onChange={(e) => setWastedMins(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>15 mins</span>
                <span>60 mins</span>
                <span>120 mins</span>
              </div>
            </div>

          </div>

          {/* Results Scorecard Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-panel border border-cyan-500/40 p-6 space-y-6 flex flex-col justify-between shadow-lg">
            
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Calculated Recovery</span>
                <span className="text-emerald-400 font-bold">22 Work Days/Mo</span>
              </div>

              {/* Monthly Wasted Payroll */}
              <div>
                <span className="text-xs text-slate-400 block">Monthly Payroll Lost to Unverified Time:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono mt-0.5">
                  -{symbol}{monthlyWastedPayroll.toLocaleString()}
                </div>
              </div>

              {/* Saurik Track Investment */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Saurik Track Fleet Cost ({reps} x {symbol}{currencyConfig.costPerUser}):</span>
                <span className="font-mono font-bold text-slate-200">{symbol}{trackCost.toLocaleString()}/mo</span>
              </div>

              {/* Net Monthly Savings Highlight */}
              <div className="p-4 rounded-control bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Net Monthly Capital Saved:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  +{symbol}{netMonthlySavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-300 pt-1">
                  You could recover up to <strong className="text-white">{symbol}{monthlyWastedPayroll.toLocaleString()}</strong> every month with Saurik Track.
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Annualized Net Recovery: <strong>+{symbol}{annualSavings.toLocaleString()}/year</strong></span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={onOpenPilot}
              className="w-full py-3 px-4 rounded-control text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Claim These Savings in 14-Day Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ROICalculator;
