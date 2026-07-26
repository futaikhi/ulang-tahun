import { useEffect, useRef, TouchEvent } from 'react';
import { retroAudio } from '../utils/sound';
import { STAMP_PHOTOS } from '../data/photos';
import '../styles/gallery.css';

interface ModalProps {
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function Modal({ selectedIndex, onClose, onNavigate }: ModalProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  if (selectedIndex === null) return null;

  const currentPhoto = STAMP_PHOTOS[selectedIndex];

  const handlePrev = () => {
    retroAudio.playSfx('click');
    const newIdx = selectedIndex === 0 ? STAMP_PHOTOS.length - 1 : selectedIndex - 1;
    onNavigate(newIdx);
  };

  const handleNext = () => {
    retroAudio.playSfx('click');
    const newIdx = selectedIndex === STAMP_PHOTOS.length - 1 ? 0 : selectedIndex + 1;
    onNavigate(newIdx);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      // Swiped left -> Go Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Go Prev
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="modal-close-btn"
          onClick={() => {
            retroAudio.playSfx('click');
            onClose();
          }}
          aria-label="Tutup"
        >
          ✕
        </button>

        <span className="pixel-badge" style={{ marginBottom: '12px' }}>
          {currentPhoto.date} ({selectedIndex + 1}/{STAMP_PHOTOS.length})
        </span>

        <div className="modal-img-frame">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="modal-img"
            referrerPolicy="no-referrer"
          />
        </div>

        <h3 className="modal-title">{currentPhoto.title}</h3>
        <p className="modal-desc">{currentPhoto.caption}</p>

        <div className="modal-nav">
          <button className="pixel-btn pixel-btn-secondary modal-nav-btn" onClick={handlePrev}>
            ◀
          </button>
          <button className="pixel-btn modal-nav-btn" onClick={handleNext}>
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
