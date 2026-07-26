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

        {/* Grass Bar Base */}
        <div className="nes-world-grass-bar" style={{ marginTop: '40px' }}>
          <div className="pixel-grass-blade"></div>
          <div className="pixel-flower"></div>
          <div className="pixel-grass-blade"></div>
          <div className="pixel-grass-blade"></div>
          <div className="pixel-flower"></div>
          <div className="pixel-grass-blade"></div>
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

      {/* Retro NES Footer */}
      <footer
        style={{
          backgroundColor: '#000',
          color: 'var(--nes-tan)',
          padding: '24px 16px',
          textAlign: 'center',
          borderTop: '4px solid var(--nes-gold)',
          fontFamily: 'var(--font-pixel-heading)',
          fontSize: '10px',
          lineHeight: '1.8'
        }}
      >
        <p>UNTUK LIA ❤️ SELAMAT ULANG TAHUN</p>
        <p style={{ color: '#888', marginTop: '6px' }}>
          8-BIT HANDMADE EDITION • 2026
        </p>
      </footer>
    </div>
  );
}
