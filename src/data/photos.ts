import photo1 from '../assets/images/1.webp';
import photo2 from '../assets/images/2.webp';
import photo3 from '../assets/images/3.webp';
import photo4 from '../assets/images/4.webp';
import photo5 from '../assets/images/5.webp';
import photo6 from '../assets/images/6.webp';

export interface StampPhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  date: string;
}

export const STAMP_PHOTOS: StampPhoto[] = [
  {
    id: 1,
    src: photo1,
    title: '🕹️ Stage 1 — Awal Cerita',
    caption: 'Ini pertama kalinya kita jalan bareng. Cuma muter-muter di IKEA, ngobrol, dan kenalan lebih jauh. Waktu itu belum kepikiran kalau ternyata dari hari ini, kita bakal sampai sejauh sekarang.',
    date: 'KENANGAN #01'
  },
  {
    id: 2,
    src: photo2,
    title: '☕ Stage 2 — WFC Date',
    caption: 'WFC bareng ternyata seru juga. Kerja masing-masing, sesekali ngobrol, saling ganggu dikit, terus lanjut kerja lagi. Hal sesimpel ini ternyata jadi salah satu momen favoritku.',
    date: 'KENANGAN #02'
  },
  {
    id: 3,
    src: photo3,
    title: '🎮 Stage 3 — Coffee & Games',
    caption: 'Ngopi, ngobrol, terus lanjut main PS bareng. Nggak perlu pergi jauh atau bikin rencana yang ribet, yang penting ada kamu aja udah bikin hariku lebih seru.',
    date: 'KENANGAN #03'
  },
  {
    id: 4,
    src: photo4,
    title: '💍 Stage 4 — Sebuah Janji',
    caption: 'Malam ini mungkin kelihatan seperti dinner biasa. Tapi buatku, ini jadi salah satu momen yang paling berkesan. Karena di hari itu aku mulai membayangkan kalau suatu saat nanti kita benar-benar bakal menjalani hidup bersama.',
    date: 'KENANGAN #04'
  },
  {
    id: 5,
    src: photo5,
    title: '📸 Stage 5 — Malam di Kota',
    caption: 'Jalan santai di Tunjungan, foto-foto di photobox, terus pulang bawa banyak kenangan. Sampai sekarang tiap lihat fotonya, aku masih senyum sendiri.',
    date: 'KENANGAN #05'
  },
  {
    id: 6,
    src: photo6,
    title: '🧸 Stage 6 — Tawa Sederhana',
    caption: 'Muter-muter di mall, nyobain mesin capit, ketawa karena gagal terus, dapat cuman 2 doang, dan akhirnya tetap pulang dengan hati yang senang. Ternyata seseru itu kalau jalannya sama kamu.',
    date: 'KENANGAN #06'
  }
];
