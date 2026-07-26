import { useState } from 'react';
import { retroAudio } from '../utils/sound';
import '../styles/envelope.css';

interface EnvelopeProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Envelope({ isOpen, onToggle }: EnvelopeProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnvelopeClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (!isOpen) {
      retroAudio.playSfx('open');
      setTimeout(() => {
        onToggle();
        setIsAnimating(false);
      }, 500);
    } else {
      retroAudio.playSfx('click');
      onToggle();
      setIsAnimating(false);
    }
  };

  return (
    <div className="envelope-wrapper-container" id="envelope-section">
      <div
        className={`envelope-wrapper ${isOpen ? 'envelope-open' : 'envelope-closed'}`}
        onClick={handleEnvelopeClick}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Sentuh untuk menutup surat" : "Sentuh untuk membuka surat"}
      >
        <div className="pixel-envelope">
          {/* Top Fold Flap */}
          <div className="envelope-flap"></div>

          {/* Envelope Heart Seal */}
          <div className="envelope-seal">
            <span className="pixel-heart pixel-heart-animated"></span>
          </div>

          {/* Internal Peek Letter Paper */}
          <div className="letter-paper-peek">
            <p style={{ fontFamily: 'var(--font-pixel-heading)', fontSize: '10px', color: '#c84c0c' }}>
              UNTUK: LIA ❤️
            </p>
            <p style={{ fontFamily: 'var(--font-pixel-body)', fontSize: '14px', marginTop: '6px', color: '#333' }}>
              {isOpen ? 'Surat terbuka...' : 'Sentuh untuk membaca surat rahasiaku...'}
            </p>
          </div>

          {/* Front Pocket Folds */}
          <div className="envelope-pocket-left"></div>
          <div className="envelope-pocket-right"></div>
          <div className="envelope-pocket-bottom"></div>
        </div>

        <div className="tap-hint">
          {isOpen ? '✉️ Sentuh Amplop Untuk Menutup' : '✉️ Sentuh Amplop Untuk Membuka'}
        </div>
      </div>
    </div>
  );
}
