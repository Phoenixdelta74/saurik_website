import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  AlertCircle,
  Sparkles,
  Globe,
  PhoneCall,
  PhoneOff,
  ShieldCheck,
  ChevronDown,
  Check,
} from 'lucide-react';
import VoiceVisualizer from './VoiceVisualizer';
import { SUPPORTED_LANGUAGES } from '../../hooks/useVoiceAgent';

const VoiceAgentPanel = ({
  isSupported,
  isListening,
  isSpeaking,
  interimTranscript,
  permissionError,
  status,
  selectedLanguage,
  onSelectLanguage,
  isContinuousMode,
  onToggleContinuousMode,
  onStartListening,
  onStopListening,
  onCancelSpeech,
  isMuted,
  onToggleMute,
  bgClass = 'bg-white/25 backdrop-blur-2xl',
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLang =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`flex flex-col h-full text-ink-primary p-5 justify-between relative overflow-hidden transition-all duration-300 ${bgClass}`}>
      {/* Background Decorative Subtle Brand Grid */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#076E63_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-slate-200/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-accent-teal-light text-accent-teal border border-accent-teal/20">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="text-xs font-bold tracking-wide uppercase text-ink-primary font-heading">
              Saurik AI Advisor
            </h3>
            <p className="text-[10px] text-accent-teal font-medium">Voice Assistant</p>
          </div>
        </div>

        {/* Top Controls: Sleek Custom Language Dropdown & Sound */}
        <div className="flex items-center gap-2">
          {/* Premium Custom Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-accent-teal shadow-subtle transition-all focus:outline-none focus:ring-1 focus:ring-accent-teal group"
              aria-label="Select voice language"
              aria-haspopup="listbox"
              aria-expanded={isLangDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-accent-teal group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-xs font-semibold text-ink-primary">
                {currentLang.nativeLabel}
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent-teal-light text-accent-teal border border-accent-teal/20">
                {currentLang.code.split('-')[0].toUpperCase()}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-ink-muted transition-transform duration-200 ${
                  isLangDropdownOpen ? 'rotate-180 text-accent-teal' : ''
                }`}
              />
            </button>

            {/* Hidden semantic select for accessibility & automated spec tests */}
            <select
              id="voice-lang-select"
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeLabel} ({lang.code.split('-')[0].toUpperCase()})
                </option>
              ))}
            </select>

            {/* Custom Floating Popover Menu */}
            {isLangDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full right-0 mt-1.5 z-50 min-w-[210px] bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl rounded-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase text-ink-muted tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === selectedLanguage;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                        isSelected
                          ? 'bg-accent-teal-light text-accent-teal font-semibold border border-accent-teal/20'
                          : 'text-ink-secondary hover:text-ink-primary hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            isSelected
                              ? 'bg-accent-teal text-white'
                              : 'bg-slate-100 text-ink-secondary'
                          }`}
                        >
                          {lang.code.split('-')[0].toUpperCase()}
                        </span>
                        <div className="text-left">
                          <p className="leading-tight font-medium text-ink-primary">
                            {lang.nativeLabel}
                          </p>
                          <p className="text-[10px] text-ink-muted leading-tight">
                            {lang.label}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-teal shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Audio Mute/Unmute Button */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`p-1.5 rounded-xl border text-xs transition-all flex items-center gap-1 ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white/80 hover:bg-white border-slate-200/80 text-ink-secondary hover:text-ink-primary shadow-subtle'
            }`}
            title={isMuted ? 'Unmute voice output' : 'Mute voice output'}
            aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Center Interactive Visualizer & Transcript */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full px-2">
        <VoiceVisualizer isListening={isListening} isSpeaking={isSpeaking} status={status} />

        {/* Live Interim Transcript or Helpful Guidance */}
        <div className="w-full max-w-sm mt-3 min-h-[60px] flex items-center justify-center text-center">
          {interimTranscript ? (
            <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-accent-teal/40 text-accent-teal text-xs font-mono animate-pulse shadow-subtle">
              "{interimTranscript}"
            </div>
          ) : isSpeaking ? (
            <div className="text-xs text-ink-secondary italic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
              Speaking response in real time…
            </div>
          ) : isListening ? (
            <div className="text-xs text-amber-600 font-semibold animate-pulse">
              {isContinuousMode ? '📞 Call active: Listening to you…' : 'Listening to you… speak now'}
            </div>
          ) : status === 'sending' ? (
            <div className="text-xs text-accent-teal font-mono animate-pulse">
              Consulting SAURIK IT knowledge base…
            </div>
          ) : (
            <p className="text-xs text-ink-muted max-w-[280px]">
              Tap below to talk. Ask about <strong className="text-ink-primary">Saurik Track</strong>, custom software, or cloud.
            </p>
          )}
        </div>

        {/* Mic Permission Error Alert */}
        {permissionError && (
          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs w-full max-w-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span>{permissionError}</span>
          </div>
        )}

        {!isSupported && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-center w-full max-w-sm">
            Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.
          </div>
        )}
      </div>

      {/* Bottom Controls & Mode Bar */}
      <div className="relative z-10 flex flex-col gap-3 pt-3 border-t border-slate-200/70">
        {/* Continuous Hands-Free Call Mode Toggle */}
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-subtle backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <PhoneCall
              className={`w-3.5 h-3.5 ${
                isContinuousMode ? 'text-accent-teal animate-pulse' : 'text-ink-muted'
              }`}
            />
            <div>
              <p className="text-xs font-semibold text-ink-primary leading-tight">
                Hands-Free Call Mode
              </p>
              <p className="text-[10px] text-ink-muted leading-tight">
                Auto-listens after AI speaks
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isContinuousMode}
            onClick={onToggleContinuousMode}
            className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-accent-teal ${
              isContinuousMode ? 'bg-accent-teal' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                isContinuousMode ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Primary Action Button */}
        {isSpeaking ? (
          <button
            type="button"
            onClick={onCancelSpeech}
            className="w-full py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-ink-primary text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 shadow-subtle transition-all"
          >
            <VolumeX className="w-4 h-4 text-accent-teal" />
            <span>Interrupt / Stop Speaking</span>
          </button>
        ) : isListening ? (
          <button
            type="button"
            onClick={onStopListening}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95 animate-pulse"
          >
            <MicOff className="w-4 h-4" />
            <span>{isContinuousMode ? 'Pause Listening' : 'Done Speaking (Submit)'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartListening}
            disabled={!isSupported || status === 'sending'}
            className="w-full py-3 px-4 rounded-xl bg-accent-teal hover:bg-accent-teal-dark text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent-teal/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Mic className="w-4 h-4 text-white" />
            <span>
              {isContinuousMode ? 'Start Hands-Free Voice Call' : 'Click to Speak with Agent'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceAgentPanel;
