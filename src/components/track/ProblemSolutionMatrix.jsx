import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { TRACK_PROBLEM_SOLUTION } from '../../data/trackData';

const ProblemSolutionMatrix = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase tracking-wider mb-2">
          Operational Contrast
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          The &quot;Pain vs. Gain&quot; Matrix
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          See how Saurik Track replaces manual WhatsApp chaos and spreadsheets with hardware-verified command center truth.
        </p>
      </div>

      <div className="bg-slate-900/80 rounded-panel border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-800 bg-slate-950 text-xs uppercase font-mono font-bold">
          <div className="p-4 sm:p-5 text-rose-400 flex items-center gap-2 border-b md:border-b-0 md:border-r border-slate-800">
            <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>The Legacy Way (Spreadsheets, Calls & WhatsApp)</span>
          </div>
          <div className="p-4 sm:p-5 text-emerald-400 flex items-center gap-2 bg-emerald-950/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>The Saurik Track System (Automated Truth)</span>
          </div>
        </div>

        {/* Matrix Rows */}
        <div className="divide-y divide-slate-800/80">
          {TRACK_PROBLEM_SOLUTION.map((row, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-1 md:grid-cols-2 hover:bg-slate-850/40 transition-colors"
            >
              {/* Legacy Pain Column */}
              <div className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-800/80 space-y-1.5 bg-rose-950/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                  <h4 className="text-sm font-bold text-slate-200 font-heading">
                    {row.problemTitle}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-4">
                  {row.problemDesc}
                </p>
              </div>

              {/* Saurik Track Solution Column */}
              <div className="p-4 sm:p-6 space-y-1.5 bg-emerald-950/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h4 className="text-sm font-bold text-cyan-300 font-heading">
                    {row.solutionTitle}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                  {row.solutionDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProblemSolutionMatrix;
