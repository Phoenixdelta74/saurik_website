import { useState, useEffect, useRef, useCallback } from 'react';

export function useVoiceAgent({ onSpeechRecognized, isMuted = false }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [permissionError, setPermissionError] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState('nova');

  const recognitionRef = useRef(null);
  const activeAudioRef = useRef(null);
  const activeBlobUrlRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English / Global English

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
            onSpeechRecognized(final.trim());
          }
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setPermissionError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'no-speech') {
          // Normal timeout, ignore
        } else {
          setPermissionError(`Microphone issue: ${event.error}`);
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
          // ignore cleanup abort errors
        }
      }
    };
  }, [onSpeechRecognized]);

  // Clean up any active audio on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const cancelSpeech = useCallback(() => {
    // Stop HTML5 Audio
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (activeBlobUrlRef.current) {
      URL.revokeObjectURL(activeBlobUrlRef.current);
      activeBlobUrlRef.current = null;
    }
    // Stop Browser Web Speech Synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(() => {
    cancelSpeech(); // Interrupt any active assistant speech immediately
    setPermissionError(null);
    setInterimTranscript('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Recognition might already be running
        console.warn('Recognition start caught:', err);
      }
    }
  }, [cancelSpeech]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Text-To-Speech with Neural OpenAI first and Browser fallback second
  const speak = useCallback(
    async (text) => {
      if (!text || isMuted) return;

      cancelSpeech();
      setIsSpeaking(true);

      // Clean text for speech
      const cleaned = text
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/#+\s+/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();

      if (!cleaned) {
        setIsSpeaking(false);
        return;
      }

      // 1. Attempt OpenAI Neural Voice via /api/tts
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleaned, voice: selectedVoice }),
        });

        if (response.ok && response.headers.get('content-type')?.includes('audio')) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          activeBlobUrlRef.current = url;

          const audio = new Audio(url);
          activeAudioRef.current = audio;

          audio.onended = () => {
            setIsSpeaking(false);
            cancelSpeech();
          };

          audio.onerror = () => {
            console.warn('Audio playback error, falling back to browser speech synthesis');
            fallbackBrowserSpeak(cleaned);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('Neural TTS request failed, switching to browser speech synthesis fallback:', err);
      }

      // 2. Fallback to Browser SpeechSynthesis
      fallbackBrowserSpeak(cleaned);
    },
    [isMuted, selectedVoice, cancelSpeech]
  );

  const fallbackBrowserSpeak = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Rishi')) &&
        v.lang.startsWith('en')
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return {
    isSupported,
    isListening,
    isSpeaking,
    interimTranscript,
    permissionError,
    selectedVoice,
    setSelectedVoice,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
