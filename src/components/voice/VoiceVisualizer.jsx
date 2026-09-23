import React from 'react';

const VoiceVisualizer = ({ isListening, isSpeaking, status }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6 w-full">
      {/* Outer Pulse Rings */}
      <div className="relative flex items-center justify-center w-36 h-36">
        {/* Active Ambient Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
            isSpeaking
              ? 'bg-gradient-to-tr from-cyan-500/40 via-teal-400/50 to-emerald-400/40 scale-125 animate-pulse'
              : isListening
              ? 'bg-gradient-to-tr from-amber-400/40 via-orange-500/40 to-cyan-500/40 scale-125 animate-ping duration-1000'
              : 'bg-cyan-500/10 scale-90'
          }`}
        />

        {/* Concentric Animated Soundwave Rings */}
        <div
          className={`absolute inset-2 rounded-full border-2 transition-all duration-500 ${
            isSpeaking
              ? 'border-cyan-400/60 animate-spin duration-3000'
              : isListening
              ? 'border-amber-400/80 scale-110 animate-pulse'
              : 'border-slate-800'
          }`}
        />

        <div
          className={`absolute inset-6 rounded-full border border-dashed transition-all duration-500 ${
            isSpeaking
              ? 'border-teal-300/80 animate-spin-reverse duration-2000'
              : isListening
              ? 'border-cyan-400 animate-ping duration-700'
              : 'border-slate-800/80'
          }`}
        />

        {/* Central Core Orb */}
        <div
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isSpeaking
              ? 'bg-gradient-to-br from-cyan-400 to-teal-600 text-slate-950 shadow-cyan-500/50 scale-105'
              : isListening
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-amber-500/50 scale-110'
              : 'bg-slate-900 border border-slate-700/80 text-cyan-400 shadow-slate-950'
          }`}
        >
          {/* Internal Waveform Bars */}
          <div className="flex items-center gap-1">
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-8 bg-slate-950 animate-bounce'
                  : isListening
                  ? 'h-7 bg-slate-950 animate-pulse'
                  : 'h-2 bg-cyan-400/50'
              }`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-11 bg-slate-950 animate-bounce'
                  : isListening
                  ? 'h-10 bg-slate-950 animate-pulse'
                  : 'h-3 bg-cyan-400/70'
              }`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-7 bg-slate-950 animate-bounce'
                  : isListening
                  ? 'h-8 bg-slate-950 animate-pulse'
                  : 'h-2 bg-cyan-400/50'
              }`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>

      {/* Spoken Frequency Indicator / Status Caption */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isSpeaking
              ? 'bg-cyan-400 animate-ping'
              : isListening
              ? 'bg-amber-400 animate-pulse'
              : 'bg-slate-600'
          }`}
        />
        <span className="text-xs font-mono tracking-wider font-semibold uppercase text-slate-300">
          {isSpeaking
            ? 'Speaking with Client'
            : isListening
            ? 'Listening to Client…'
            : status === 'sending'
            ? 'Thinking…'
            : 'Voice Agent Ready'}
        </span>
      </div>
    </div>
  );
};

export default VoiceVisualizer;
