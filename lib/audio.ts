'use client';

// Pick the best available SpeechSynthesis voice for a locale.
// Prefers: exact locale match > same language > any voice.
// Within matches, prefers voices whose name includes quality keywords.
let voiceCache: SpeechSynthesisVoice[] | null = null;

function getVoices(): SpeechSynthesisVoice[] {
  if (voiceCache) return voiceCache;
  const voices = window.speechSynthesis.getVoices();
  voiceCache = voices;
  return voices;
}

// Keywords that indicate higher-quality neural/enhanced voices (macOS/iOS/Windows)
const QUALITY_KEYWORDS = ['neural', 'enhanced', 'premium', 'natural', 'studio',
  'wavenet', 'polyglot', 'siri', 'aria', 'jenny', 'guy', 'nova'];

function scoreVoice(voice: SpeechSynthesisVoice, locale: string): number {
  const lang = locale.split('-')[0].toLowerCase();
  const voiceLang = voice.lang.split('-')[0].toLowerCase();
  const name = voice.name.toLowerCase();

  let score = 0;
  if (voice.lang.toLowerCase() === locale.toLowerCase()) score += 100; // exact match
  else if (voiceLang === lang) score += 50;                             // same language
  else return -1;                                                        // wrong language

  if (QUALITY_KEYWORDS.some(k => name.includes(k))) score += 30;
  if (!voice.localService) score += 10; // cloud voices tend to be better

  return score;
}

function pickBestVoice(locale: string): SpeechSynthesisVoice | null {
  const voices = getVoices();
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -1;
  for (const v of voices) {
    const s = scoreVoice(v, locale);
    if (s > bestScore) { bestScore = s; best = v; }
  }
  return best;
}

export function speak(text: string, locale: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // Voices may not be loaded yet on first call — retry once they are
  const doSpeak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickBestVoice(locale);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = locale;
    }
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    // Voices load asynchronously — wait for them
    window.speechSynthesis.onvoiceschanged = () => {
      voiceCache = null; // refresh cache
      doSpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}

// No-op prefetch kept for API compatibility
export function prefetch(_texts: string[]): void {}

