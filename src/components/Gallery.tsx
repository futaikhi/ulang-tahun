import { retroAudio } from '../utils/sound';
import { STAMP_PHOTOS, StampPhoto } from '../data/photos';
import '../styles/gallery.css';

interface GalleryProps {
  onSelectPhoto: (index: number) => void;
}

export default function Gallery({ onSelectPhoto }: GalleryProps) {
  const handleStampClick = (index: number) => {
    retroAudio.playSfx('stamp');
    onSelectPhoto(index);
  };

  return (
    <section className="gallery-section" id="gallery-section">
      <div className="gallery-title-box">
        <h2 className="gallery-title-text">
          📮 Potongan Kenangan
        </h2>
      </div>

      <div className="stamp-grid">
        {STAMP_PHOTOS.map((photo: StampPhoto, index: number) => (
          <div
            key={photo.id}
            className="pixel-stamp"
            onClick={() => handleStampClick(index)}
            role="button"
            tabIndex={0}
            aria-label={`Buka perangko kenangan ${photo.title}`}
          >
            <div className="stamp-img-container">
              <img
                src={photo.src}
                alt={photo.title}
                className="stamp-img"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="stamp-caption">{photo.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
