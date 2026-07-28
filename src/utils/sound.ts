/**
 * Web Audio API Chiptune Synthesizer & Sound Effects for 8-bit Retro NES
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBGM: boolean = false;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;

  // Happy Birthday Chiptune Melody (NES style frequency & duration)
  // Frequencies for notes (Hz)
  private notes: { [key: string]: number } = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
    'REST': 0
  };

  // Melody: Happy Birthday to Lia (8-Bit NES Chiptune)
  private melody: { note: string; duration: number }[] = [
    { note: 'G4', duration: 0.3 },
    { note: 'G4', duration: 0.3 },
    { note: 'A4', duration: 0.6 },
    { note: 'G4', duration: 0.6 },
    { note: 'C5', duration: 0.6 },
    { note: 'B4', duration: 1.2 },

    { note: 'G4', duration: 0.3 },
    { note: 'G4', duration: 0.3 },
    { note: 'A4', duration: 0.6 },
    { note: 'G4', duration: 0.6 },
    { note: 'D5', duration: 0.6 },
    { note: 'C5', duration: 1.2 },

    { note: 'G4', duration: 0.3 },
    { note: 'G4', duration: 0.3 },
    { note: 'G5', duration: 0.6 },
    { note: 'E5', duration: 0.6 },
    { note: 'C5', duration: 0.6 },
    { note: 'B4', duration: 0.6 },
    { note: 'A4', duration: 0.6 },

    { note: 'F5', duration: 0.3 },
    { note: 'F5', duration: 0.3 },
    { note: 'E5', duration: 0.6 },
    { note: 'C5', duration: 0.6 },
    { note: 'D5', duration: 0.6 },
    { note: 'C5', duration: 1.5 },
    { note: 'REST', duration: 0.6 },
  ];

  private listeners: Set<(playing: boolean) => void> = new Set();

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlayingBGM);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isPlayingBGM);
      } catch (e) {
        console.error(e);
      }
    });
  }

  public initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startBGM(onStateChanged?: (playing: boolean) => void): boolean {
    this.initCtx();
    if (this.isPlayingBGM) return true;

    this.isPlayingBGM = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote(onStateChanged);
    if (onStateChanged) onStateChanged(true);
    this.notifyListeners();
    return true;
  }

  public playNote(freq: number, duration: number, type: OscillatorType = 'square', volume: number = 0.08) {
    if (!this.ctx) return;
    if (freq <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // NES Chiptune volume decay envelope
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public playSfx(type: 'click' | 'open' | 'fanfare' | 'stamp') {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (type === 'click') {
      // Crisp 8-bit button blip
      this.playNote(523.25, 0.06, 'square', 0.06);
      setTimeout(() => this.playNote(659.25, 0.08, 'square', 0.05), 40);
    } else if (type === 'open') {
      // Retro NES Item opening / level up chime
      const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      arpeggio.forEach((freq, i) => {
        setTimeout(() => this.playNote(freq, 0.12, 'triangle', 0.08), i * 60);
      });
    } else if (type === 'stamp') {
      // Quick retro blip
      this.playNote(880, 0.05, 'square', 0.05);
      setTimeout(() => this.playNote(1046.50, 0.08, 'square', 0.05), 50);
    } else if (type === 'fanfare') {
      // Victory / Heart chime
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => this.playNote(freq, 0.18, 'square', 0.07), i * 90);
      });
    }
  }

  public toggleBGM(onStateChanged?: (playing: boolean) => void): boolean {
    this.initCtx();

    if (this.isPlayingBGM) {
      this.stopBGM();
      if (onStateChanged) onStateChanged(false);
      return false;
    } else {
      this.isPlayingBGM = true;
      this.currentNoteIndex = 0;
      this.scheduleNextNote(onStateChanged);
      if (onStateChanged) onStateChanged(true);
      this.notifyListeners();
      return true;
    }
  }

  private scheduleNextNote(onStateChanged?: (playing: boolean) => void) {
    if (!this.isPlayingBGM || !this.ctx) return;

    const item = this.melody[this.currentNoteIndex];
    const freq = this.notes[item.note] || 0;

    if (freq > 0) {
      // Main melody on square wave
      this.playNote(freq, item.duration * 0.9, 'square', 0.07);
      // Subtle octave lower bassline on triangle wave
      this.playNote(freq / 2, item.duration * 0.9, 'triangle', 0.04);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote(onStateChanged);
    }, item.duration * 1000);
  }

  public stopBGM() {
    this.isPlayingBGM = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notifyListeners();
  }

  public getIsPlaying(): boolean {
    return this.isPlayingBGM;
  }
}

export const retroAudio = new RetroAudioEngine();