import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TRACK_RIBBON } from '../../data/trackData';

const TrackRibbon = ({ onOpenPilot }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 text-cyan-200 border-b border-cyan-800/40 text-xs py-2 px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-wider text-[10px] border border-cyan-500/30">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{TRACK_RIBBON.badge}</span>
        </span>
        <span className="text-slate-300 font-medium">
          {TRACK_RIBBON.text}
        </span>
        <button
          type="button"
          onClick={onOpenPilot}
          className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer ml-1"
        >
          <span>{TRACK_RIBBON.linkText}</span>
        </button>
      </div>
    </div>
  );
};

export default TrackRibbon;
