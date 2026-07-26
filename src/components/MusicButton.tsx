import { useState } from 'react';
import { retroAudio } from '../utils/sound';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleToggle = () => {
    const newState = retroAudio.toggleBGM((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(newState);
  };

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 900 }}>
      <button
        onClick={handleToggle}
        className="pixel-btn"
        style={{
          fontSize: '11px',
          padding: '8px 12px',
          backgroundColor: isPlaying ? 'var(--nes-gold)' : '#212529',
          color: isPlaying ? '#000' : 'var(--nes-tan)',
          border: '3px solid #000',
          boxShadow: '3px 3px 0px #000',
          gap: '6px'
        }}
        aria-label="Toggle Musik"
      >
        <span>♫</span>

        {isPlaying && (
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '12px' }}>
            <span
              style={{
                width: '3px',
                height: '100%',
                backgroundColor: '#000',
                animation: 'eqBar 0.5s infinite alternate'
              }}
            />
            <span
              style={{
                width: '3px',
                height: '70%',
                backgroundColor: '#000',
                animation: 'eqBar 0.7s infinite alternate'
              }}
            />
            <span
              style={{
                width: '3px',
                height: '90%',
                backgroundColor: '#000',
                animation: 'eqBar 0.4s infinite alternate'
              }}
            />
          </div>
        )}
      </button>

      <style>{`
        @keyframes eqBar {
          0% { height: 30%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
