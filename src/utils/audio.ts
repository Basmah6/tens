export function playEnglishAudio(text: string, rate: number = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this environment');
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any currently playing audio

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate; // slightly slower for educational clarity
      utterance.pitch = 1.0;

      // Try to pick a natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => (v.lang === 'en-US' || v.lang.startsWith('en')) && !v.name.includes('Google') === false) 
        || voices.find(v => v.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Audio playback error:', err);
      resolve();
    }
  });
}
