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
              ? 'bg-gradient-to-tr from-accent-teal/25 via-cyan-400/30 to-emerald-400/25 scale-125 animate-pulse'
              : isListening
              ? 'bg-gradient-to-tr from-amber-400/30 via-orange-400/25 to-accent-teal/20 scale-125 animate-ping duration-1000'
              : 'bg-accent-teal/10 scale-90'
          }`}
        />

        {/* Concentric Animated Soundwave Rings */}
        <div
          className={`absolute inset-2 rounded-full border-2 transition-all duration-500 ${
            isSpeaking
              ? 'border-accent-teal/50 animate-spin duration-3000'
              : isListening
              ? 'border-amber-400/70 scale-110 animate-pulse'
              : 'border-slate-200/80'
          }`}
        />

        <div
          className={`absolute inset-6 rounded-full border border-dashed transition-all duration-500 ${
            isSpeaking
              ? 'border-cyan-400/60 animate-spin-reverse duration-2000'
              : isListening
              ? 'border-amber-500/80 animate-ping duration-700'
              : 'border-slate-300/60'
          }`}
        />

        {/* Central Core Orb: Deep Navy Glass Core */}
        <div
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
            isSpeaking
              ? 'bg-[#102A43] border-2 border-accent-teal shadow-accent-teal/30 scale-105'
              : isListening
              ? 'bg-[#102A43] border-2 border-amber-400 shadow-amber-500/30 scale-110'
              : 'bg-[#102A43] border border-teal-500/30 shadow-slate-900/20'
          }`}
        >
          {/* Internal Waveform Bars */}
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-8 bg-teal-400 animate-bounce'
                  : isListening
                  ? 'h-7 bg-amber-400 animate-pulse'
                  : 'h-2 bg-teal-400/60'
              }`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-11 bg-cyan-300 animate-bounce'
                  : isListening
                  ? 'h-10 bg-amber-300 animate-pulse'
                  : 'h-3.5 bg-teal-300'
              }`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-300 ${
                isSpeaking
                  ? 'h-7 bg-teal-400 animate-bounce'
                  : isListening
                  ? 'h-8 bg-amber-400 animate-pulse'
                  : 'h-2 bg-teal-400/60'
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
              ? 'bg-accent-teal animate-ping'
              : isListening
              ? 'bg-amber-500 animate-pulse'
              : 'bg-slate-400'
          }`}
        />
        <span className="text-xs font-mono tracking-wider font-semibold uppercase text-ink-primary">
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
