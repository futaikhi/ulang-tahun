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
      retroAudio.startBGM();
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
        aria-label={isOpen ? "Klik untuk menutup surat" : "Klik untuk membuka surat"}
      >
        <div className="pixel-envelope">
          {/* Air Mail Pixel Border Stripes */}
          <div className="airmail-stripes-top"></div>

          {/* NYC Postage Stamp */}
          <div className="envelope-stamp">
            <span className="stamp-icon">🕷️💖</span>
            <div className="stamp-details">
              <span className="stamp-text">AIR MAIL</span>
              <span className="stamp-date">NYC 2026</span>
            </div>
          </div>

          {/* Letter Paper Peek Inside */}
          <div className="letter-paper-peek">
            <div className="peek-header">
              <span className="peek-tag">CONFIDENTIAL LOVE LETTER</span>
              <span className="peek-heart">💖</span>
            </div>
            <p className="peek-to">UTUK: LIA</p>
            <p className="peek-msg">
              {isOpen ? '✉️ Surat Terbuka di Bawah...' : '✨ Sentuh untuk membaca pesan ulang tahun...'}
            </p>
          </div>

          {/* Top Triangle Flap */}
          <div className="envelope-flap">
            <div className="flap-web-line">🕸️</div>
          </div>

          {/* Front Envelope Pocket Folds */}
          <div className="envelope-front-fold"></div>

          <div className="airmail-stripes-bottom"></div>
        </div>

        <div className="tap-hint">
          {isOpen ? '💌 SENTUH AMPLOP UNTUK MENUTUP' : '💌 SENTUH AMPLOP UNTUK MEMBUKA'}
        </div>
      </div>
    </div>
  );
}