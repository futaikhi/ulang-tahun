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
          className="modal-close-btn bugle-modal-close"
          onClick={() => {
            retroAudio.playSfx('click');
            onClose();
          }}
          aria-label="Tutup"
        >
          ✕
        </button>

        <div className="bugle-modal-header">
          <div className="bugle-modal-paper-badge">
            📰 DAILY BUGLE • FRONT PAGE EXTRA!
          </div>
          <span className="bugle-modal-date">
            {currentPhoto.date} ({selectedIndex + 1}/{STAMP_PHOTOS.length})
          </span>
        </div>

        <h3 className="bugle-modal-headline">{currentPhoto.title}</h3>

        <div className="bugle-modal-img-frame">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="bugle-modal-img"
            referrerPolicy="no-referrer"
          />
          <div className="bugle-img-caption-strip">
            <span>📷 ARCHIVE PRESS PHOTO #0{selectedIndex + 1} • BY PETER PARKER</span>
          </div>
        </div>

        <div className="bugle-modal-article-body">
          <p className="bugle-modal-text">{currentPhoto.caption}</p>
        </div>

        <div className="modal-nav bugle-modal-nav">
          <button className="pixel-btn bugle-nav-btn" onClick={handlePrev}>
            ◀
          </button>
          <button className="pixel-btn bugle-nav-btn bugle-nav-btn-main" onClick={handleNext}>
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}