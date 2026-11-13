import { useState, useEffect, useRef, useCallback } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en-IN', label: 'English (India)', nativeLabel: 'English', recognitionLang: 'en-IN' },
  { code: 'bn-IN', label: 'Bengali (বাংলা)', nativeLabel: 'বাংলা', recognitionLang: 'bn-IN' },
  { code: 'as-IN', label: 'Assamese (অসমীয়া)', nativeLabel: 'অসমীয়া', recognitionLang: 'as-IN' },
  { code: 'hi-IN', label: 'Hindi (हिंदी)', nativeLabel: 'हिन्दी', recognitionLang: 'hi-IN' },
  { code: 'gu-IN', label: 'Gujarati (ગુજરાતી)', nativeLabel: 'ગુજરાતી', recognitionLang: 'gu-IN' },
  { code: 'ta-IN', label: 'Tamil (தமிழ்)', nativeLabel: 'தமிழ்', recognitionLang: 'ta-IN' },
  { code: 'te-IN', label: 'Telugu (తెలుగు)', nativeLabel: 'తెలుగు', recognitionLang: 'te-IN' },
];

// Browser-native speech stays primary (zero-cost rule). The server TTS route is only used
// when the device has no installed voice for the reply's language (common for Bengali).
const ENABLE_CLOUD_TTS_FALLBACK = true;

// Delay before re-opening the mic after the assistant finishes, to avoid hearing speaker echo
const RELISTEN_DELAY_MS = 450;
// How many silent listening rounds hands-free mode tolerates before pausing the call
const MAX_SILENT_RETRIES = 2;
// Pause length that ends a spoken question in continuous recognition
// Tuned to 1400ms: prevents premature cut-off during natural breathing/thinking pauses while staying conversational
const END_OF_SPEECH_SILENCE_MS = 1400;

// Desktop browsers keep listening through short pauses so long questions are not cut off.
// Mobile engines repeat or drop results in continuous mode, so they keep single-phrase mode.
const supportsContinuousRecognition = () =>
  typeof navigator !== 'undefined' && !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const LANGUAGE_NAMES = {
  'en-IN': 'English',
  'bn-IN': 'Bengali',
  'as-IN': 'Assamese',
  'hi-IN': 'Hindi',
  'gu-IN': 'Gujarati',
  'ta-IN': 'Tamil',
  'te-IN': 'Telugu',
};

const RECOGNITION_ERROR_MESSAGES = {
  'not-allowed': 'Microphone permission was denied. Please allow microphone access in your browser settings.',
  'service-not-allowed': 'Voice input is blocked in this browser. Please type your question instead.',
  'audio-capture': 'No microphone was found. Please check that a microphone is connected.',
  network: 'Voice recognition needs an internet connection and is not available in this browser. Please type your question instead.',
  'language-not-supported': 'This browser cannot recognise speech in the selected language. Please try English or type your question.',
};

// Strip markdown, links, list markers, and emoji so the speech engine reads only the words
export const cleanTextForSpeech = (text) => {
  if (!text) return '';
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*#+\s+/gm, '')
    .replace(/^\s*(?:[-*•]|\d+[.)])\s+/gm, '')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '')
    .replace(/[*_#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Pick the speech language from the script actually used in the reply
const detectSpeechLang = (text, fallbackLang) => {
  if (/[஀-௿]/.test(text)) return 'ta-IN'; // Tamil
  if (/[ఀ-౿]/.test(text)) return 'te-IN'; // Telugu
  if (/[઀-૿]/.test(text)) return 'gu-IN'; // Gujarati
  if (/[ঀ-৿]/.test(text)) {
    // Distinguish Assamese by characteristic characters (ৰ / ৱ) or active user selection
    if (fallbackLang === 'as-IN' || /[ৰৱ]/.test(text)) return 'as-IN';
    return 'bn-IN'; // Bengali
  }
  if (/[ऀ-ॿ]/.test(text)) return 'hi-IN'; // Hindi / Devanagari
  if (/[A-Za-z]/.test(text)) return 'en-IN';
  return fallbackLang || 'en-IN';
};

// Chrome stops long utterances after ~15s, so speak sentence-sized chunks
const splitIntoChunks = (text, maxLength = 180) => {
  const sentences = text.match(/[^.!?।]+[.!?।]*\s*/g) || [text];
  const chunks = [];
  let current = '';

  sentences.forEach((sentence) => {
    if ((current + sentence).length > maxLength && current) {
      chunks.push(current.trim());
      current = '';
    }
    current += sentence;
  });
  if (current.trim()) chunks.push(current.trim());
  return chunks;
};

// Split multi-sentence replies into fast-path chunks (Sentence 1 synthesized immediately for <=1.2s TTFA)
export const splitSentencesForSpeech = (text) => {
  if (!text) return [];
  const matches = text.match(/[^.!?।\n]+[.!?।\n]*/g) || [text];
  const chunks = [];
  let buffer = '';

  for (const part of matches) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Group very short phrases (e.g. <= 3 words) with following sentence to avoid choppy audio
    if (buffer && (buffer + ' ' + trimmed).split(/\s+/).length <= 4) {
      buffer = `${buffer} ${trimmed}`;
    } else {
      if (buffer) chunks.push(buffer);
      buffer = trimmed;
    }
  }
  if (buffer) chunks.push(buffer);
  return chunks.length > 0 ? chunks : [text];
};

// Find an installed voice that genuinely matches the language (never a different-language voice)
const findVoice = (voices, langCode) => {
  if (!voices.length) return null;
  const target = langCode.toLowerCase();
  const base = target.split('-')[0];
  const normalise = (v) => v.lang.toLowerCase().replace('_', '-');
  const isPreferred = (v) => /natural|google|premium|enhanced/i.test(v.name);

  const exact = voices.filter((v) => normalise(v) === target);
  const sameBase = voices.filter((v) => normalise(v).split('-')[0] === base);

  return (
    exact.find(isPreferred) ||
    exact[0] ||
    sameBase.find(isPreferred) ||
    sameBase[0] ||
    null
  );
};

export function useVoiceAgent({ onSpeechRecognized, isMuted = false }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [permissionError, setPermissionError] = useState(null);
  const [speechNotice, setSpeechNotice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [isContinuousMode, setIsContinuousMode] = useState(false); // Hands-free back-and-forth mode

  const recognitionRef = useRef(null);
  const onSpeechRecognizedRef = useRef(onSpeechRecognized);
  const isContinuousRef = useRef(isContinuousMode);
  const isMutedRef = useRef(isMuted);
  const selectedLangRef = useRef(selectedLanguage);
  const restartTimerRef = useRef(null);
  const voicesRef = useRef([]);
  // Incremented on every cancel so callbacks from a cancelled reply are ignored
  const speechSessionRef = useRef(0);
  // Holds live utterances so Chrome does not garbage-collect them before onend fires
  const activeUtterancesRef = useRef([]);
  const audioRef = useRef(null);
  const cloudAbortRef = useRef(null);
  // Final transcript collected during the current listening round; submitted when it ends
  const transcriptBufferRef = useRef('');
  // Set when listening is cancelled (close, end call) so the collected words are not submitted
  const discardTranscriptRef = useRef(false);
  const silenceTimerRef = useRef(null);
  const silentRetriesRef = useRef(0);
  const retryAfterSilenceRef = useRef(false);
  const speechPrimedRef = useRef(false);
  const startListeningRef = useRef(() => {});

  // Keep refs in sync for event listeners
  useEffect(() => {
    onSpeechRecognizedRef.current = onSpeechRecognized;
  }, [onSpeechRecognized]);

  useEffect(() => {
    isContinuousRef.current = isContinuousMode;
    silentRetriesRef.current = 0;
  }, [isContinuousMode]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    selectedLangRef.current = selectedLanguage;
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguage;
    }
  }, [selectedLanguage]);

  // Voices load asynchronously in Chrome; keep the list current
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return undefined;
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      voicesRef.current = synth.getVoices() || [];
    };
    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);
    return () => synth.removeEventListener?.('voiceschanged', loadVoices);
  }, []);

  const clearRestartTimer = () => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  };

  const scheduleRelisten = () => {
    clearRestartTimer();
    if (!isContinuousRef.current) return;
    restartTimerRef.current = setTimeout(() => {
      restartTimerRef.current = null;
      if (isContinuousRef.current) startListeningRef.current();
    }, RELISTEN_DELAY_MS);
  };

  const cancelSpeech = useCallback(() => {
    speechSessionRef.current += 1;
    clearRestartTimer();
    if (cloudAbortRef.current) {
      try {
        cloudAbortRef.current.abort();
      } catch (e) {
        // ignore
      }
      cloudAbortRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.src) URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    activeUtterancesRef.current = [];
    setIsSpeaking(false);
  }, []);

  // Proactive background keepalive to pre-warm the Modal container while user is speaking
  const triggerContainerWarmup = () => {
    if (typeof window !== 'undefined' && typeof fetch === 'function') {
      fetch('/api/tts', { method: 'GET', keepalive: true }).catch(() => {});
    }
  };

  // iOS Safari only allows speech that starts inside a user gesture; unlock it on the first tap
  const primeSpeech = () => {
    if (speechPrimedRef.current || typeof window === 'undefined' || !window.speechSynthesis) return;
    speechPrimedRef.current = true;
    const unlock = new SpeechSynthesisUtterance(' ');
    unlock.volume = 0;
    window.speechSynthesis.speak(unlock);
  };

  const startListening = useCallback(() => {
    cancelSpeech();
    primeSpeech();
    triggerContainerWarmup();
    setPermissionError(null);
    setSpeechNotice(null);
    setInterimTranscript('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = selectedLangRef.current;
        recognitionRef.current.start();
      } catch (err) {
        // start() throws if recognition is already active; that is safe to ignore
      }
    }
  }, [cancelSpeech]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  // Finishes the current round; whatever was heard is submitted from onend
  const stopListening = useCallback(() => {
    clearRestartTimer();
    clearSilenceTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Ends a hands-free call completely (used on close and when the user pauses the call)
  const endCall = useCallback(() => {
    setIsContinuousMode(false);
    isContinuousRef.current = false;
    cancelSpeech();
    clearSilenceTimer();
    discardTranscriptRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
    setInterimTranscript('');
  }, [cancelSpeech]);

  // Initialize Web Speech Recognition once; callbacks read the latest values through refs
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return undefined;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    const isContinuousRecognition = supportsContinuousRecognition();
    recognition.continuous = isContinuousRecognition;
    recognition.interimResults = true;
    recognition.lang = selectedLangRef.current;

    recognition.onstart = () => {
      transcriptBufferRef.current = '';
      discardTranscriptRef.current = false;
      retryAfterSilenceRef.current = false;
      setIsListening(true);
      setPermissionError(null);
      setInterimTranscript('');
    };

    recognition.onresult = (event) => {
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          transcriptBufferRef.current = `${transcriptBufferRef.current} ${transcript}`.trim();
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(`${transcriptBufferRef.current} ${interim}`.trim());

      // In continuous mode the browser never ends the round itself; a pause does
      if (isContinuousRecognition) {
        clearSilenceTimer();
        silenceTimerRef.current = setTimeout(() => {
          silenceTimerRef.current = null;
          try {
            recognition.stop();
          } catch (e) {
            // ignore
          }
        }, END_OF_SPEECH_SILENCE_MS);
      }
    };

    recognition.onerror = (event) => {
      clearSilenceTimer();
      setIsListening(false);

      // 'aborted' is our own stop/abort; it is not a user-facing problem
      if (event.error === 'aborted') {
        discardTranscriptRef.current = true;
        return;
      }

      if (event.error === 'no-speech') {
        if (isContinuousRef.current && silentRetriesRef.current < MAX_SILENT_RETRIES) {
          silentRetriesRef.current += 1;
          retryAfterSilenceRef.current = true;
        } else if (isContinuousRef.current) {
          setIsContinuousMode(false);
          isContinuousRef.current = false;
          setSpeechNotice('Hands-free call paused because no speech was heard. Tap the microphone to continue.');
        }
        return;
      }

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture') {
        setIsContinuousMode(false);
        isContinuousRef.current = false;
      }
      setPermissionError(
        RECOGNITION_ERROR_MESSAGES[event.error] ||
          'Voice input stopped unexpectedly. Please try again or type your question.'
      );
    };

    recognition.onend = () => {
      clearSilenceTimer();
      setIsListening(false);
      setInterimTranscript('');

      const heard = transcriptBufferRef.current.trim();
      transcriptBufferRef.current = '';
      if (heard && !discardTranscriptRef.current) {
        silentRetriesRef.current = 0;
        retryAfterSilenceRef.current = false;
        onSpeechRecognizedRef.current?.(heard, selectedLangRef.current);
        return;
      }

      if (retryAfterSilenceRef.current) {
        retryAfterSilenceRef.current = false;
        scheduleRelisten();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.abort();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, [cancelSpeech]);

  // Fast-Path Sentence-Pipelined TTS for regional voices lacking native OS voices
  const speakWithCloud = async (text, lang, session) => {
    const abortController = new AbortController();
    cloudAbortRef.current = abortController;

    const sentences = splitSentencesForSpeech(text);
    if (!sentences.length) return false;

    // Helper to fetch a single sentence chunk from /api/tts
    const fetchChunk = async (sentence) => {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentence, lang }),
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error(`TTS ${response.status}`);
      return await response.blob();
    };

    try {
      // 1. Fetch Sentence 1 immediately (Fast-Path TTFA <= 1.2s)
      const firstBlob = await fetchChunk(sentences[0]);
      if (session !== speechSessionRef.current) return false;

      // Start prefetching Sentence 2 while Sentence 1 prepares to play
      let nextBlobPromise = sentences.length > 1 ? fetchChunk(sentences[1]) : null;

      const playChunkAudio = (blob) => {
        if (session !== speechSessionRef.current) return Promise.resolve(false);
        const audio = new Audio(URL.createObjectURL(blob));
        audioRef.current = audio;

        return new Promise((resolve) => {
          const cleanup = () => {
            if (audio.src) URL.revokeObjectURL(audio.src);
            if (audioRef.current === audio) audioRef.current = null;
          };
          audio.onended = () => {
            cleanup();
            resolve(true);
          };
          audio.onerror = () => {
            cleanup();
            resolve(false);
          };
          setIsSpeaking(true);
          audio.play().catch(() => {
            cleanup();
            resolve(false);
          });
        });
      };

      // Play Sentence 1
      const playedFirst = await playChunkAudio(firstBlob);
      if (!playedFirst || session !== speechSessionRef.current) {
        if (session === speechSessionRef.current) {
          setIsSpeaking(false);
          scheduleRelisten();
        }
        return playedFirst;
      }

      // 2. Seamlessly play subsequent pre-fetched sentences
      for (let i = 1; i < sentences.length; i++) {
        if (session !== speechSessionRef.current) return false;

        // Queue prefetch for sentence i + 1
        const futurePromise = i + 1 < sentences.length ? fetchChunk(sentences[i + 1]) : null;

        try {
          const chunkBlob = await nextBlobPromise;
          nextBlobPromise = futurePromise;
          if (session !== speechSessionRef.current) return false;

          // Natural prosodic rest (100ms) between sentences to prevent popping
          await new Promise((r) => setTimeout(r, 100));
          if (session !== speechSessionRef.current) return false;

          const played = await playChunkAudio(chunkBlob);
          if (!played) break;
        } catch (chunkErr) {
          console.warn(`Subsequent speech chunk ${i} failed or aborted:`, chunkErr.message || chunkErr);
          break;
        }
      }

      if (session === speechSessionRef.current) {
        setIsSpeaking(false);
        scheduleRelisten();
      }
      return true;
    } catch (err) {
      if (err.name === 'AbortError' || session !== speechSessionRef.current) {
        return false;
      }
      if (session === speechSessionRef.current) {
        setIsSpeaking(false);
        setSpeechNotice(
          `This device has no ${LANGUAGE_NAMES[lang] || 'matching'} voice installed, so the reply is shown as text only.`
        );
      }
      return false;
    } finally {
      if (cloudAbortRef.current === abortController) {
        cloudAbortRef.current = null;
      }
    }
  };

  // Zero-Cost Native Engine: Primary Speech Synthesis
  const speak = useCallback(
    (text, forcedLang) => {
      cancelSpeech();
      const session = speechSessionRef.current;

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned || isMutedRef.current || typeof window === 'undefined') {
        // Nothing to say aloud, but keep a hands-free call going
        scheduleRelisten();
        return;
      }

      const lang = detectSpeechLang(cleaned, forcedLang || selectedLangRef.current);
      const synth = window.speechSynthesis;
      const voice = synth ? findVoice(voicesRef.current.length ? voicesRef.current : synth.getVoices(), lang) : null;

      if (!voice && lang !== 'en-IN') {
        if (ENABLE_CLOUD_TTS_FALLBACK) {
          speakWithCloud(cleaned, lang, session).then((played) => {
            if (!played && session === speechSessionRef.current) scheduleRelisten();
          });
        } else {
          setSpeechNotice(
            `This device has no ${LANGUAGE_NAMES[lang]} voice installed, so the reply is shown as text only.`
          );
          scheduleRelisten();
        }
        return;
      }

      if (!synth) {
        scheduleRelisten();
        return;
      }

      const chunks = splitIntoChunks(cleaned);
      const utterances = chunks.map((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = lang;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        if (voice) utterance.voice = voice;

        if (index === 0) {
          utterance.onstart = () => {
            if (session === speechSessionRef.current) setIsSpeaking(true);
          };
        }
        if (index === chunks.length - 1) {
          utterance.onend = () => {
            if (session !== speechSessionRef.current) return;
            activeUtterancesRef.current = [];
            setIsSpeaking(false);
            // Hands-Free Continuous Mode: auto-listen after AI finishes speaking
            scheduleRelisten();
          };
        }
        utterance.onerror = (e) => {
          if (session !== speechSessionRef.current || e.error === 'interrupted' || e.error === 'canceled') return;
          speechSessionRef.current += 1;
          synth.cancel();
          activeUtterancesRef.current = [];
          setIsSpeaking(false);
          scheduleRelisten();
        };
        return utterance;
      });

      activeUtterancesRef.current = utterances;
      if (synth.paused) synth.resume();
      utterances.forEach((utterance) => synth.speak(utterance));
    },
    [cancelSpeech]
  );

  return {
    isSupported,
    isListening,
    isSpeaking,
    interimTranscript,
    permissionError,
    speechNotice,
    selectedLanguage,
    setSelectedLanguage,
    isContinuousMode,
    setIsContinuousMode,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
    endCall,
  };
}
