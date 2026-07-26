import { useState } from 'react';
import { retroAudio } from '../utils/sound';

export default function PixelDecorations() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleMushroomClick = () => {
    retroAudio.playSfx('fanfare');
    const messages = [
      '🍄 POWER UP! +100 LOVE FOR LIA! ❤️',
      '⭐ LIA GETS SUPER STAR POWER! ✨',
      '❤️ CINTAKU SELALU UNTUK LIA! 💖',
      '🍄 LIA & ME: LEVEL UP TO MARRIAGE! 💍'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setToastMessage(randomMsg);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <>
      {/* Flying Bird in Sky */}
      <div className="pixel-bird" style={{ top: '65px' }}></div>

      {/* Floating Interactive Mushroom Section */}
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
          className="pixel-mushroom"
          onClick={handleMushroomClick}
          title="Sentuh Jamur Ajaib!"
          role="button"
          tabIndex={0}
        >
          <div className="pixel-mushroom-cap"></div>
          <div className="pixel-mushroom-stem"></div>
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
