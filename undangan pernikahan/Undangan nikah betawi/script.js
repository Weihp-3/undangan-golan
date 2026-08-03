// Function eksekusi langsung tanpa nunggu DOM (Anti-Gagal)
function paksaBukaUndangan() {
  const heroSection = document.getElementById("heroSection");
  const mainContent = document.getElementById("mainContent");
  const bgMusic = document.getElementById("bgMusic");

  // 1. Hilangkan Hero Cover secara mutlak
  if (heroSection) {
    heroSection.style.display = "none";
  }

  // 2. Munculkan Konten Utama secara mutlak
  if (mainContent) {
    mainContent.style.display = "block";
    mainContent.classList.add("active");
  }

  // 3. Lepas kuncian scroll pada body
  document.body.classList.remove("lock-scroll");
  document.body.style.overflow = "auto";

  // 4. Jalankan Musik
  if (bgMusic) {
    bgMusic.play().catch(function (e) {
      console.log("Audio ditahan browser:", e);
    });
  }

  // 5. Trigger animasi elemen
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function (el) {
    el.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = musicToggle ? musicToggle.querySelector("i") : null;
  let isPlaying = false;

  // Toggle Musik Manual
  if (musicToggle) {
    musicToggle.addEventListener("click", function () {
      if (isPlaying) {
        bgMusic.pause();
        if (musicIcon) musicIcon.className = "fa-solid fa-compact-disc";
      } else {
        bgMusic.play().then(function () {
          if (musicIcon) musicIcon.className = "fa-solid fa-compact-disc fa-spin";
        });
      }
      isPlaying = !isPlaying;
    });
  }

  // Countdown Timer
  const targetDate = new Date("October 12, 2026 08:00:00").getTime();
  const timerElement = document.getElementById("countdown-timer");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (timerElement) timerElement.innerText = "Acara Telah Dilangsungkan";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (timerElement) {
      timerElement.innerText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Scroll Reveal
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(function (element) {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
});

// Helper Functions
function copyRekening(nomor, element) {
  navigator.clipboard.writeText(nomor).then(function () {
    const originalText = element.innerHTML;
    element.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
    element.style.backgroundColor = "#27ae60";

    setTimeout(function () {
      element.innerHTML = originalText;
      element.style.backgroundColor = "";
    }, 2000);
  });
}

function addToCalendar(title, location, startDate, endDate) {
  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(title) + "&dates=" + startDate + "/" + endDate + "&location=" + encodeURIComponent(location) + "&details=Undangan+Pernikahan+Andi+%26+Bunga";
  window.open(googleCalendarUrl, '_blank');
}

function submitUcapan() {
  const nama = document.getElementById('inputNama').value.trim();
  const alamat = document.getElementById('inputAlamat').value.trim();
  const ucapan = document.getElementById('inputUcapan').value.trim();
  const container = document.getElementById('ucapanList');

  if (!nama || !ucapan) {
    alert("Silakan isi Nama dan Ucapan Anda terlebih dahulu.");
    return;
  }

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('id-ID', options) + " " + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const newItem = document.createElement('div');
  newItem.className = 'ucapan-item';
  
  const titleText = alamat ? nama + ", " + alamat : nama;
  
  newItem.innerHTML = '<strong>' + titleText + '</strong><p>' + ucapan + '</p><span><i class="fa-regular fa-calendar"></i> ' + dateStr + '</span>';

  container.insertBefore(newItem, container.firstChild);

  document.getElementById('inputNama').value = '';
  document.getElementById('inputAlamat').value = '';
  document.getElementById('inputUcapan').value = '';
}

function openLightbox(src) {
  const modal = document.getElementById("mediaModal");
  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");

  modalVideo.style.display = "none";
  modalVideo.src = "";
  
  modalImg.style.display = "block";
  modalImg.src = src;

  modal.style.display = "flex";
}

function playVideoModal(videoUrl) {
  const modal = document.getElementById("mediaModal");
  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");

  modalImg.style.display = "none";
  
  modalVideo.style.display = "block";
  modalVideo.src = videoUrl;

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("mediaModal");
  const modalVideo = document.getElementById("modalVideo");
  
  modal.style.display = "none";
  modalVideo.src = "";
}