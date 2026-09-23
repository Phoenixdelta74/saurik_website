import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle, Sparkles } from 'lucide-react';
import VoiceVisualizer from './VoiceVisualizer';

const VoiceAgentPanel = ({
  isSupported,
  isListening,
  isSpeaking,
  interimTranscript,
  permissionError,
  status,
  onStartListening,
  onStopListening,
  onCancelSpeech,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white p-5 justify-between relative overflow-hidden border-l border-slate-800">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="text-xs font-bold tracking-wide uppercase text-slate-200 font-heading">
              Voice Agent Studio
            </h3>
            <p className="text-[10px] text-cyan-400 font-mono">Neural Human Voice Engine</p>
          </div>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          onClick={onToggleMute}
          className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
            isMuted
              ? 'bg-rose-950/60 border-rose-800/80 text-rose-300'
              : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/50'
          }`}
          title={isMuted ? 'Unmute voice output' : 'Mute voice output'}
          aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="text-[11px] font-mono">{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>
      </div>

      {/* Center Interactive Visualizer & Transcript */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full px-2">
        <VoiceVisualizer isListening={isListening} isSpeaking={isSpeaking} status={status} />

        {/* Live Interim Transcript or Helpful Guidance */}
        <div className="w-full max-w-sm mt-3 min-h-[60px] flex items-center justify-center text-center">
          {interimTranscript ? (
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-cyan-200 text-xs font-mono animate-pulse">
              "{interimTranscript}"
            </div>
          ) : isSpeaking ? (
            <div className="text-xs text-slate-300 italic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Speaking response out loud…
            </div>
          ) : isListening ? (
            <div className="text-xs text-amber-300 font-medium">
              Listening to you… speak your question now
            </div>
          ) : status === 'sending' ? (
            <div className="text-xs text-cyan-400 font-mono animate-pulse">
              Consulting SAURIK IT knowledge base…
            </div>
          ) : (
            <p className="text-xs text-slate-400 max-w-[280px]">
              Tap the button below and speak naturally. Ask about <strong className="text-slate-200">Saurik Track</strong>, custom software, or pricing.
            </p>
          )}
        </div>

        {/* Mic Permission Error Alert */}
        {permissionError && (
          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs w-full max-w-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{permissionError}</span>
          </div>
        )}

        {!isSupported && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-200 text-xs text-center w-full max-w-sm">
            Voice recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari, or use the chat window on the left.
          </div>
        )}
      </div>

      {/* Bottom Mic Controls */}
      <div className="relative z-10 flex flex-col items-center gap-3 pt-3 border-t border-slate-800/80">
        {isSpeaking ? (
          <button
            type="button"
            onClick={onCancelSpeech}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all hover:border-slate-500 shadow-lg"
          >
            <VolumeX className="w-4 h-4 text-cyan-400" />
            <span>Interrupt / Stop Speaking</span>
          </button>
        ) : isListening ? (
          <button
            type="button"
            onClick={onStopListening}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/40 transition-all active:scale-95 animate-pulse"
          >
            <MicOff className="w-4 h-4" />
            <span>Done Speaking (Send Question)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartListening}
            disabled={!isSupported || status === 'sending'}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Mic className="w-4 h-4" />
            <span>Click to Speak with Agent</span>
          </button>
        )}

        <div className="flex items-center justify-between w-full text-[10px] text-slate-500 font-mono">
          <span>Continuous Speech Sync</span>
          <span>Zero Keyboard Required</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentPanel;
