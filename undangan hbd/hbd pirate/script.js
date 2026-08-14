let isPlaying = false;

function bukaUndangan() {
  const envelope = document.querySelector('.envelope');
  const coverPage = document.getElementById('cover-page');
  const mainContent = document.getElementById('main-content');

  // 1. Amplop Terbuka
  if (envelope) envelope.classList.add('open');

  // 2. Musik LANGSUNG Berputar Saat Ini Juga! 🎵
  putarMusikAman();

  // 3. Efek Kembang Api / Confetti 🎉
  if (typeof confetti === 'function') {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  // 4. Pindah ke Halaman Utama
  setTimeout(() => {
    if (coverPage) coverPage.classList.add('fade-out');
  }, 800);

  setTimeout(() => {
    if (coverPage) coverPage.style.display = 'none';
    if (mainContent) mainContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1200);
}

function putarMusikAman() {
  const bgMusic = document.getElementById('bg-music');
  const musicControl = document.getElementById('music-control');
  const musicIcon = document.getElementById('music-icon');

  if (bgMusic) {
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicControl) musicControl.classList.add('playing');
      if (musicIcon) musicIcon.innerText = '🎶';
    }).catch(err => {
      console.log("Autoplay dibatasi browser, tekan ikon musik untuk memutar:", err);
    });
  }
}

function toggleMusik() {
  const bgMusic = document.getElementById('bg-music');
  const musicControl = document.getElementById('music-control');
  const musicIcon = document.getElementById('music-icon');

  if (!bgMusic) return;

  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    if (musicControl) musicControl.classList.remove('playing');
    if (musicIcon) musicIcon.innerText = '🔇';
  } else {
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicControl) musicControl.classList.add('playing');
      if (musicIcon) musicIcon.innerText = '🎶';
    });
  }
}

// Countdown
const tanggalAcara = new Date("2026-08-20T15:00:00").getTime();

function updateCountdown() {
  const sekarang = new Date().getTime();
  const selisih = tanggalAcara - sekarang;

  if (selisih > 0) {
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) d.innerText = hari < 10 ? "0" + hari : hari;
    if (h) h.innerText = jam < 10 ? "0" + jam : jam;
    if (m) m.innerText = menit < 10 ? "0" + menit : menit;
    if (s) s.innerText = detik < 10 ? "0" + detik : detik;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

function tambahKeKalender() {
  const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Pesta Ulang Tahun - Treasure Hunt 🏴‍☠️\nDESCRIPTION:Mari bergabung!\nLOCATION:Jl. Petualangan No. 12, Jakarta\nDTSTART:20260820T150000\nDTEND:20260820T180000\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Undangan_Treasure_Hunt.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function bukaPeta() {
  window.open(`https://maps.google.com/?q=$${encodeURIComponent("Jakarta")}`, '_blank');
}

function kirimUcapan(event) {
  event.preventDefault();
  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;
  const kehadiran = document.getElementById('kehadiran').value;
  const wishList = document.getElementById('wishList');

  const item = document.createElement('div');
  item.className = 'wish-item';
  item.innerHTML = `<strong>${nama} (${kehadiran})</strong><p>${pesan}</p>`;

  if (wishList) wishList.prepend(item);
  document.getElementById('wishForm').reset();
  alert('Terima kasih atas ucapannya! 🎉');
}

// ====================================
// UPDATE BUKA UNDANGAN (DENGAN CONFETTI)
// ====================================
function bukaUndangan() {
  const envelope = document.querySelector('.envelope');
  const coverPage = document.getElementById('cover-page');
  const mainContent = document.getElementById('main-content');

  if (envelope) envelope.classList.add('open');

  // Letusan Confetti Warna-Warni
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  setTimeout(() => {
    if (coverPage) coverPage.classList.add('fade-out');
  }, 800);

  setTimeout(() => {
    if (coverPage) coverPage.style.display = 'none';
    if (mainContent) mainContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1200);
}

// ====================================
// MINI GAME: BUKA HARTA KARUN
// ====================================
let chestOpened = false;

function bukaHartaKarun(element) {
  const chestIcon = element.querySelector('.chest-icon');
  const chestHint = element.querySelector('.chest-hint');

  if (!chestOpened) {
    chestIcon.innerText = '💎👑💰';
    chestHint.innerText = 'Harta Karun Ditemukan!';
    chestHint.style.background = '#e09838';
    chestOpened = true;

    // Confetti Melimpah!
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.7 }
      });
    }

    alert(' Selamat! Kamu menemukan Harta Karun Bajak Laut! 🪙✨');
  } else {
    alert('Harta karun sudah kamu buka! Sampai jumpa di pesta ya! 🎉');
  }
}

// ====================================
// UPDATE KIRIM UCAPAN (DENGAN CONFETTI)
// ====================================
function kirimUcapan(event) {
  event.preventDefault();
  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;
  const kehadiran = document.getElementById('kehadiran').value;
  const wishList = document.getElementById('wishList');

  const item = document.createElement('div');
  item.className = 'wish-item';
  item.innerHTML = `<strong>${nama} (${kehadiran})</strong><p>${pesan}</p>`;

  if (wishList) wishList.prepend(item);
  document.getElementById('wishForm').reset();

  // Confetti Kecil Saat Kirim Ucapan
  if (typeof confetti === 'function') {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  }

  alert('Terima kasih atas ucapannya! 🎉');
}