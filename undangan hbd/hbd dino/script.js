document.addEventListener('DOMContentLoaded', () => {

  const coverEnvelope = document.getElementById('cover-envelope');
  const mainContent = document.getElementById('mainContent');
  const btnBuka = document.getElementById('btnBukaUndangan');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  let isPlaying = false;

  // FUNGSI MEMUTAR / MENGHENTIKAN MUSIK
  function playAudio() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.innerText = '🎵';
    }).catch(err => {
      console.log("Autoplay ditolak oleh browser:", err);
    });
  }

  function pauseAudio() {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.classList.remove('playing');
    musicToggle.innerText = '🔇';
  }

  // 1. FUNGSI BUKA AMPLOP + MULAI PEMUTARAN MUSIK
  btnBuka.addEventListener('click', () => {
    coverEnvelope.classList.add('open');
    mainContent.classList.remove('hidden-content');
    mainContent.classList.add('visible-content');

    // Tampilkan tombol pemutar musik
    musicToggle.classList.remove('hidden-btn');

    // Putar lagu saat amplop dibuka
    playAudio();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Toggle Musik lewat tombol floating
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  });

  // 2. DUMMY COUNTDOWN TIMER BERGERAK REAL-TIME
  let dummyTotalSeconds = (148 * 86400) + (8 * 3600) + (17 * 60) + 20;

  function updateDummyCountdown() {
    if (dummyTotalSeconds > 0) {
      dummyTotalSeconds--;

      const days = Math.floor(dummyTotalSeconds / 86400);
      const hours = Math.floor((dummyTotalSeconds % 86400) / 3600);
      const minutes = Math.floor((dummyTotalSeconds % 3600) / 60);
      const seconds = dummyTotalSeconds % 60;

      document.getElementById('days').innerText = days;
      document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
      document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
  }

  setInterval(updateDummyCountdown, 1000);

  // 3. FITUR "SIMPAN KALENDER"
  const btnSimpanKalender = document.getElementById('btnSimpanKalender');
  btnSimpanKalender.addEventListener('click', () => {
    const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Ulang Tahun William Zaedi
DESCRIPTION:Acara Ulang Tahun William Zaedi ke-4
LOCATION:Jl. Rawa Seribu Nomor 12, Indonesia
DTSTART:20260501T100000Z
DTEND:20260501T130000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'UlangTahun_William.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("File Acara Kalender berhasil di-download!");
  });

  // 4. FITUR "SIMPAN LOKASI"
  const btnSimpanLokasi = document.getElementById('btnSimpanLokasi');
  btnSimpanLokasi.addEventListener('click', () => {
    const googleMapsUrl = "https://maps.google.com/?q=-6.175392,106.824964";
    window.open(googleMapsUrl, '_blank');
  });

  // 5. FORM RSVP / UCAPAN
  const rsvpForm = document.getElementById('rsvpForm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const kehadiran = document.getElementById('kehadiran').value;

    if (nama) {
      alert(`Terima kasih ${nama}!\nUcapan dan konfirmasi kehadiran (${kehadiran}) Anda telah terkirim.`);
      rsvpForm.reset();
    }
  });

});

// FITUR SALIN NO REKENING
  const btnCopyRek = document.getElementById('btnCopyRek');
  if (btnCopyRek) {
    btnCopyRek.addEventListener('click', () => {
      const nomorRekening = "1234567890";
      
      navigator.clipboard.writeText(nomorRekening).then(() => {
        alert("Nomor rekening berhasil disalin: " + nomorRekening);
      }).catch(err => {
        console.error("Gagal menyalin: ", err);
      });
    });
  }