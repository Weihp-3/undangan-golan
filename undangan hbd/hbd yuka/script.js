document.addEventListener('DOMContentLoaded', function () {
  const btnOpen = document.getElementById('btn-open');
  const coverPage = document.getElementById('cover-page');
  const mainContent = document.getElementById('main-content');
  const rsvpForm = document.getElementById('rsvp-form');

  // Event listener tombol Buka Undangan
  btnOpen.addEventListener('click', function () {
    coverPage.style.display = 'none';
    mainContent.style.display = 'flex';
  });

  // Event listener Submit Form RSVP & Ucapan
  rsvpForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset isi form setelah tombol dikirim
    rsvpForm.reset();
    alert('Terima kasih, ucapan dan konfirmasi kehadiran Anda berhasil terkirim!');
  });

  // LOGIKA COUNTDOWN TIMER
  const targetDate = new Date('March 14, 2026 09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('cd-days').innerText = days < 10 ? '0' + days : days;
      document.getElementById('cd-hours').innerText = hours < 10 ? '0' + hours : hours;
      document.getElementById('cd-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('cd-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    } else {
      document.getElementById('cd-days').innerText = '00';
      document.getElementById('cd-hours').innerText = '00';
      document.getElementById('cd-minutes').innerText = '00';
      document.getElementById('cd-seconds').innerText = '00';
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});

// Fungsi untuk menyalin nomor rekening ke clipboard
function copyNorek(text) {
  navigator.clipboard.writeText(text).then(function() {
    alert('Nomor berhasil disalin: ' + text);
  }).catch(function(err) {
    alert('Gagal menyalin nomor');
  });
}