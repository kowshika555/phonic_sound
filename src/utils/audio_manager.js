class AudioManager {
    constructor() {
        this.audio = new Audio();
        this.currentUrl = null;
        this.synth = window.speechSynthesis;
    }

    play(url, textFallback = "") {
        // 1. Try to play audio file
        this.stop();

        this.audio.src = url;
        this.currentUrl = url;

        return this.audio.play()
            .catch(e => {
                console.warn("Audio play failed, trying TTS fallback", e);
                if (textFallback) {
                    this.speak(textFallback);
                }
            });
    }

    speak(text) {
        this.stop();
        if (!this.synth) return;

        const utterance = new SpeechSynthesisUtterance(text);
        // Try to find a good voice
        const voices = this.synth.getVoices();
        const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Google US English'));
        if (femaleVoice) utterance.voice = femaleVoice;

        utterance.rate = 0.9; // Slightly slower for kids
        utterance.pitch = 1.1; // Slightly higher

        this.synth.speak(utterance);
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        if (this.synth) {
            this.synth.cancel();
        }
    }
}

export const audioManager = new AudioManager();
