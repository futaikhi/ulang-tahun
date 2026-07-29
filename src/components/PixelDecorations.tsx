import { useState } from 'react';
import { retroAudio } from '../utils/sound';

export default function PixelDecorations() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSpideyClick = () => {
    retroAudio.playSfx('fanfare');
    const messages = [
      '🕷️ *THWIP!* WEB-SLINGING ALL MY LOVE TO LIA! ❤️',
      '🕸️ LIA IS MY MARY JANE FOREVER! 💖',
      '✨ SPIDER-SENSES TINGLING... LIA IS THE ONE! 💍',
      '🕷️ WITH GREAT LOVE COMES GREAT RESPONSIBILITY! ❤️',
      '🕸️ YOU & ME ACROSS THE SPIDER-VERSE! 🌌'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setToastMessage(randomMsg);

    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <>
      {/* Floating Interactive Spider-Man Mask Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          margin: '30px 0 10px 0',
          alignItems: 'center'
        }}
      >
        <span className="pixel-star"></span>
        <div
          className="pixel-spidey-mask-item"
          onClick={handleSpideyClick}
          title="Sentuh Topeng Spider-Man!"
          role="button"
          tabIndex={0}
        >
          <div className="pixel-spidey-head-shape">
            <div className="pixel-spidey-eye-left"></div>
            <div className="pixel-spidey-eye-right"></div>
          </div>
        </div>
        <span className="pixel-heart pixel-heart-animated"></span>
        <span className="pixel-star"></span>
      </div>

      {/* Toast Popup */}
      {toastMessage && (
        <div className="pixel-toast">
          {toastMessage}
        </div>
      )}
    </>
  );
}