import { useState, useEffect } from 'react';
import '../styles/hero.css';

export default function Hero() {
  const [textStage, setTextStage] = useState<number>(0); // 0: typing line 1, 1: line 1 complete, 2: typing line 2, 3: line 2 complete
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');

  const fullLine1 = 'Selamat Ulang Tahun...';
  const fullLine2 = 'Untuk perempuan yang sebentar lagi akan menjadi pendamping hidupku.';

  useEffect(() => {
    // Typewriter effect for Line 1
    if (textStage === 0) {
      if (displayedLine1.length < fullLine1.length) {
        const timeout = setTimeout(() => {
          setDisplayedLine1(fullLine1.slice(0, displayedLine1.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const stageTimeout = setTimeout(() => {
          setTextStage(1);
        }, 600);
        return () => clearTimeout(stageTimeout);
      }
    }

    // Pause briefly then move to Line 2
    if (textStage === 1) {
      const stageTimeout = setTimeout(() => {
        setTextStage(2);
      }, 400);
      return () => clearTimeout(stageTimeout);
    }

    // Typewriter effect for Line 2
    if (textStage === 2) {
      if (displayedLine2.length < fullLine2.length) {
        const timeout = setTimeout(() => {
          setDisplayedLine2(fullLine2.slice(0, displayedLine2.length + 1));
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        setTextStage(3);
      }
    }
  }, [textStage, displayedLine1, displayedLine2]);

  return (
    <div className="hero-header">
      {/* Background Pixel Clouds */}
      <div className="pixel-cloud-bg cloud-1"></div>
      <div className="pixel-cloud-bg cloud-2"></div>
      <div className="pixel-cloud-bg cloud-3"></div>

      {/* Swinging Pixel Spider-Man in Sky */}
      <div className="pixel-spidey-swing">
        <div className="spidey-sprite-head"></div>
        <div className="spidey-sprite-body"></div>
      </div>

      <h1 className="hero-greeting">Halo Lia</h1>

      <div className="typewriter-box">
        <p className="typewriter-text">
          {displayedLine1}
          {textStage <= 1 && <span className="typewriter-cursor" />}
        </p>

        {textStage >= 2 && (
          <p className="typewriter-subtext">
            {displayedLine2}
            {textStage === 2 && <span className="typewriter-cursor" />}
          </p>
        )}
      </div>
    </div>
  );
}