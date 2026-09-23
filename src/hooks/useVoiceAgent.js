import { useState, useEffect, useRef, useCallback } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en-IN', label: 'English (India)', nativeLabel: 'English', recognitionLang: 'en-IN' },
  { code: 'hi-IN', label: 'Hindi (हिंदी)', nativeLabel: 'हिन्दी', recognitionLang: 'hi-IN' },
  { code: 'bn-IN', label: 'Bengali (বাংলা)', nativeLabel: 'বাংলা', recognitionLang: 'bn-IN' },
];

export function useVoiceAgent({ onSpeechRecognized, isMuted = false }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [permissionError, setPermissionError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [isContinuousMode, setIsContinuousMode] = useState(false); // Hands-free back-and-forth mode

  const recognitionRef = useRef(null);
  const isContinuousRef = useRef(isContinuousMode);
  const selectedLangRef = useRef(selectedLanguage);
  const restartTimerRef = useRef(null);

  // Keep refs in sync for event listeners
  useEffect(() => {
    isContinuousRef.current = isContinuousMode;
  }, [isContinuousMode]);

  useEffect(() => {
    selectedLangRef.current = selectedLanguage;
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguage;
    }
  }, [selectedLanguage]);

  // Clean text helper to strip markdown artifacts
  const cleanTextForSpeech = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s+/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .trim();
  };

  const cancelSpeech = useCallback(() => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(() => {
    cancelSpeech();
    setPermissionError(null);
    setInterimTranscript('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = selectedLangRef.current;
        recognitionRef.current.start();
      } catch (err) {
        // Recognition might already be active
        console.warn('Recognition start caught:', err);
      }
    }
  }, [cancelSpeech]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLangRef.current;

      recognition.onstart = () => {
        setIsListening(true);
        setPermissionError(null);
        setInterimTranscript('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final && final.trim()) {
          setInterimTranscript('');
          setIsListening(false);
          if (onSpeechRecognized) {
            onSpeechRecognized(final.trim(), selectedLangRef.current);
          }
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setPermissionError('Microphone permission was denied. Please allow microphone access in your browser settings.');
        } else if (event.error !== 'no-speech') {
          setPermissionError(`Microphone notice: ${event.error}`);
        }
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [onSpeechRecognized]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, [cancelSpeech]);

  // Find the optimal natural browser voice for the selected language
  const getOptimalVoice = (langCode) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const baseLang = langCode.split('-')[0].toLowerCase();

    // 1. Exact match with Natural / High quality
    const naturalExact = voices.find(
      (v) =>
        v.lang.toLowerCase() === langCode.toLowerCase() &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
    );
    if (naturalExact) return naturalExact;

    // 2. Exact language match
    const exactLang = voices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase());
    if (exactLang) return exactLang;

    // 3. Base language match (e.g. 'hi' for 'hi-IN', 'bn' for 'bn-IN')
    const baseMatch = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(baseLang) ||
        v.name.toLowerCase().includes(baseLang)
    );
    if (baseMatch) return baseMatch;

    // 4. Fallback to any English or default voice
    return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
  };

  // Zero-Cost Native Engine: Primary Speech Synthesis
  const speak = useCallback(
    (text, forcedLang) => {
      if (!text || isMuted) return;

      cancelSpeech();

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;

      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return;
      }

      const lang = forcedLang || selectedLangRef.current;
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voice = getOptimalVoice(lang);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        // Hands-Free Continuous Mode: auto-listen after AI finishes speaking
        if (isContinuousRef.current) {
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 450); // 450ms safety cushion to prevent hearing speaker echo
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice:', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isMuted, cancelSpeech, startListening]
  );

  return {
    isSupported,
    isListening,
    isSpeaking,
    interimTranscript,
    permissionError,
    selectedLanguage,
    setSelectedLanguage,
    isContinuousMode,
    setIsContinuousMode,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
