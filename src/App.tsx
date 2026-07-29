import { useState } from 'react';
import Hero from './components/Hero';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import MusicButton from './components/MusicButton';
import PixelDecorations from './components/PixelDecorations';

import './styles/global.css';
import './styles/pixel.css';
import './styles/hero.css';
import './styles/envelope.css';
import './styles/letter.css';
import './styles/gallery.css';

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleToggleEnvelope = () => {
    setIsLetterOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          const letterElement = document.getElementById('letter-content');
          if (letterElement) {
            letterElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
      return nextState;
    });
  };

  return (
    <div className="app-viewport">
      {/* Floating Retro BGM Button */}
      <MusicButton />

      {/* SECTION 1: HALAMAN PERTAMA (Ucapan Typewriter, Amplop & Surat) */}
      <section className="hero-container" id="section-1-surat">
        <Hero />

        {/* Amplop Pixel Langsung di Halaman Pertama */}
        <div style={{ marginTop: '20px', width: '100%' }}>
          <Envelope isOpen={isLetterOpen} onToggle={handleToggleEnvelope} />
        </div>

        {/* Surat Terbuka */}
        <Letter isVisible={isLetterOpen} />

        {isLetterOpen && <PixelDecorations />}

        {/* Spider-Man Pixel City Skyline Base - Dense NYC Buildings */}
        <div className="pixel-city-bar" style={{ marginTop: '40px' }}>
          {/* Swinging City Spider-Gwen Animation */}
          <div className="city-spidey-swinger" title="Spider-Gwen swinging across NYC!">
            <div className="city-web-string"></div>
            <div className="gwen-sprite">
              <div className="gwen-sprite-head">
                <div className="gwen-hood-pink"></div>
                <div className="gwen-eye-left"></div>
                <div className="gwen-eye-right"></div>
              </div>
              <div className="gwen-sprite-body">
                <div className="gwen-chest-pink"></div>
              </div>
            </div>
          </div>

          <div className="pixel-building building-1">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-5">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-2">
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
          </div>
          <div className="pixel-building building-6">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-3">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-7">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-4">
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-8">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
          </div>
          <div className="pixel-building building-9">
            <div className="pixel-window"></div>
            <div className="pixel-window"></div>
            <div className="pixel-window pixel-window-off"></div>
            <div className="pixel-window"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: POTONGAN KENANGAN (Perangko & Galeri Foto) */}
      <Gallery onSelectPhoto={(index) => setSelectedPhotoIndex(index)} />

      {/* Lightbox Modal for Photo Stamp Zoom */}
      <Modal
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />

      {/* Retro Spider-Man NES Footer */}
      <footer
        style={{
          backgroundColor: 'var(--spidey-red)',
          color: '#ffffff',
          padding: '24px 16px',
          textAlign: 'center',
          borderTop: '4px solid #000000',
          fontFamily: 'var(--font-pixel-heading)',
          fontSize: '10px',
          lineHeight: '1.8'
        }}
      >
        <p style={{ color: 'var(--spidey-yellow)' }}>🕷️ UNTUK LIA ❤️ SELAMAT ULANG TAHUN 🕸️</p>
        <p style={{ color: '#ffffff', marginTop: '6px' }}>
          8-BIT DAYTIME SPIDER-MAN EDITION • 2026
        </p>
      </footer>
    </div>
  );
}