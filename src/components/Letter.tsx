import '../styles/letter.css';

interface LetterProps {
  isVisible: boolean;
}

export default function Letter({ isVisible }: LetterProps) {
  return (
    <div className={`letter-full-container ${isVisible ? 'visible' : ''}`} id="letter-content">
      <div className="letter-paper-scroll">
        <h2 className="letter-header-title">
          Selamat ulang tahun, Lia. ❤️
        </h2>

        <p className="letter-body-paragraph">
          Hari ini adalah hari spesial, karena seseorang yang sangat berarti dalam hidupku kembali bertambah usia.
        </p>

        <p className="letter-body-paragraph">
          Aku bersyukur Tuhan mempertemukan kita hingga bisa berada di titik ini.
        </p>

        <p className="letter-body-paragraph">
          Terima kasih sudah menjadi tempat pulang, tempat bercerita, tempat mengeluh, sekaligus orang yang selalu berhasil membuat hari-hariku terasa lebih tenang.
        </p>

        <p className="letter-body-paragraph highlight">
          Sebentar lagi kita akan memasuki babak baru dalam hidup. InsyaAllah kita akan melangsungkan lamaran, lalu menikah tahun depan.
        </p>

        <p className="letter-body-paragraph">
          Aku tahu perjalanan kita nanti tidak akan selalu mudah. Akan ada hari-hari melelahkan, akan ada perbedaan pendapat, akan ada masalah yang harus kita hadapi bersama.
        </p>

        <p className="letter-body-paragraph">
          Tapi aku percaya, selama kita tetap saling menggenggam, saling mendengarkan, dan saling menguatkan, kita akan bisa melewati semuanya.
        </p>

        <p className="letter-body-paragraph">
          Semoga di usia yang baru ini, Lia selalu diberi kesehatan, kebahagiaan, ketenangan hati, rezeki yang berlimpah, serta langkah yang selalu dimudahkan dalam setiap impian yang ingin diraih.
        </p>

        <p className="letter-body-paragraph">
          Semoga senyummu selalu menjadi hal yang paling sering aku lihat setiap hari.
        </p>

        <p className="letter-body-paragraph">
          Dan semoga nanti, ketika kita sudah benar-benar hidup bersama, aku masih bisa menjadi alasan di balik senyum itu.
        </p>

        <p className="letter-body-paragraph">
          Terima kasih sudah memilih tetap berjalan bersamaku sampai sejauh ini. Aku akan terus belajar menjadi laki-laki yang pantas mendampingimu.
        </p>

        <p className="letter-body-paragraph" style={{ fontWeight: 'bold', color: 'var(--nes-red)', marginTop: '20px' }}>
          Terima kasih sudah menjadi 'Player 2' terbaik dalam petualanganku. <br />
          Tahun depan kita akan memulai babak baru. <br />
          Aku tidak sabar untuk terus 'co-op' bersamamu untuk selamanya. <br />
          I love you!
        </p>

        <p className="letter-body-paragraph" style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '16px' }}>
          Selamat ulang tahun, calon 'Player 2'ku. ❤️
        </p>

        <div className="letter-signature-box">
          - Dari 'Player 1'mu.
        </div>

        <div className="letter-heart-footer">
          <span className="pixel-heart"></span>
          <span className="pixel-heart"></span>
          <span className="pixel-heart"></span>
        </div>
      </div>
    </div>
  );
}
