import { retroAudio } from '../utils/sound';
import { STAMP_PHOTOS, StampPhoto } from '../data/photos';
import '../styles/gallery.css';

interface GalleryProps {
  onSelectPhoto: (index: number) => void;
}

export default function Gallery({ onSelectPhoto }: GalleryProps) {
  const handlePhotoClick = (index: number) => {
    retroAudio.playSfx('stamp');
    onSelectPhoto(index);
  };

  return (
    <section className="gallery-section bugle-section" id="gallery-section">
      <div className="bugle-newspaper-container">
        {/* Newspaper Top Issue Bar */}
        <div className="bugle-issue-bar">
          <span>VOL. 2026 NO. 01</span>
          <span className="bugle-issue-center">SPECIAL EDITION • LIA'S BIRTHDAY ARCHIVE</span>
          <span>PRICE 25¢</span>
        </div>

        {/* Daily Bugle Masthead Header */}
        <header className="bugle-masthead">
          <div className="bugle-tagline-top">NEW YORK'S FINEST & MOST TRUSTED NEWSPAPER</div>
          <h2 className="bugle-logo-title">THE DAILY BUGLE</h2>
          <div className="bugle-tagline-bottom">
            <span>PHOTOGRAPHED BY PETER PARKER</span>
            <span className="bugle-approved-badge">APPROVED BY J. JONAH JAMESON</span>
          </div>
        </header>

        {/* Newspaper Breaking News Banner */}
        <div className="bugle-headline-banner">
          <span className="bugle-extra-tag">EXTRA! EXTRA!</span>
          <h3 className="bugle-main-headline">
            POTONGAN KENANGAN: LIA & SPIDEY'S SECRET MEMORIES EXPOSED!
          </h3>
        </div>

        {/* Daily Bugle Article Photo Grid */}
        <div className="bugle-photo-grid">
          {STAMP_PHOTOS.map((photo: StampPhoto, index: number) => (
            <article
              key={photo.id}
              className="bugle-photo-card"
              onClick={() => handlePhotoClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Buka berita foto ${photo.title}`}
            >
              <div className="bugle-card-header">
                <span className="bugle-credit">PHOTO BY P. PARKER</span>
                <span className="bugle-card-date">{photo.date}</span>
              </div>

              <div className="bugle-img-wrapper">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="bugle-img"
                  referrerPolicy="no-referrer"
                />
                <span className="bugle-exclusive-stamp">BUGLE EXCLUSIVE</span>
              </div>

              <div className="bugle-card-body">
                <h4 className="bugle-article-title">{photo.title}</h4>
                <p className="bugle-article-preview">{photo.caption}</p>
                <div className="bugle-read-more">
                  <span>KLIK UNTUK MEMBACA ➔</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}