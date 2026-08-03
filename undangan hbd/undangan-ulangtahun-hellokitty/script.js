/* ======================================================
   UNDANGAN ULANG TAHUN ANAK PEREMPUAN - INTERACTIVE SCRIPT
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const coverScreen = document.getElementById('cover-screen');
  const btnOpen = document.getElementById('btn-open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const guestNameElem = document.getElementById('guest-name');
  
  // Parse Guest Name from URL parameter if available (?to=NamaTamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('n') || 'Tamu Undangan';
  if (guestNameElem) {
    guestNameElem.textContent = guestParam;
  }

  // Audio state
  let isPlaying = false;

  function playAudio() {
    if (bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        if (musicToggleBtn) musicToggleBtn.classList.add('playing');
      }).catch(err => {
        console.log("Audio autoplay restricted:", err);
      });
    }
  }

  function pauseAudio() {
    if (bgMusic) {
      bgMusic.pause();
      isPlaying = false;
      if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // 2. Open Invitation Action
  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      coverScreen.classList.add('cover-hidden');
      document.body.classList.remove('cover-active');
      
      // Start audio
      playAudio();

      // Trigger Confetti
      launchConfetti();
    });
  }

  // 3. Countdown Timer (Target: 15 August 2026 10:00:00 WIB)
  const targetDate = new Date('2026-08-15T10:00:00+07:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysElem = document.getElementById('timer-days');
    const hoursElem = document.getElementById('timer-hours');
    const minutesElem = document.getElementById('timer-minutes');
    const secondsElem = document.getElementById('timer-seconds');

    if (!daysElem) return;

    if (distance < 0) {
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElem.textContent = days < 10 ? '0' + days : days;
    hoursElem.textContent = hours < 10 ? '0' + hours : hours;
    minutesElem.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElem.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Lightbox Gallery Viewer & QRIS Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const memoryCards = document.querySelectorAll('.memory-card');
  const qrisImg = document.getElementById('qris-preview-img');

  memoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (qrisImg && lightboxModal && lightboxImg) {
    qrisImg.addEventListener('click', () => {
      lightboxImg.src = qrisImg.src;
      lightboxModal.classList.add('active');
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 5. RSVP & Wishes List Handler (Gmail Direct Mailto & Local Storage)
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesListContainer = document.getElementById('wishes-list');

  // Initial Sample Wishes
  const defaultWishes = [
    {
      name: "Tante Rina & Om Dimas",
      status: "attending",
      message: "Selamat ulang tahun yang ke-5 buat Aira sayang! Semoga makin pintar, sehat, dan jadi anak yang berbakti ya!"
    },
    {
      name: "Oma & Opa",
      status: "attending",
      message: "Happy Birthday cucu tercinta Aira! Sampai ketemu di pesta ya manis ❤️"
    },
    {
      name: "Tante Maya",
      status: "attending",
      message: "Selamat ulang tahun princess Aira! Dress pink-nya udah siap nih buat dateng!"
    }
  ];

  function getStoredWishes() {
    const stored = localStorage.getItem('aira_bday_wishes');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return defaultWishes; }
    }
    return defaultWishes;
  }

  function saveWishes(wishes) {
    localStorage.setItem('aira_bday_wishes', JSON.stringify(wishes));
  }

  function renderWishes() {
    if (!wishesListContainer) return;
    const wishes = getStoredWishes();
    wishesListContainer.innerHTML = '';

    wishes.forEach(item => {
      const itemElem = document.createElement('div');
      itemElem.className = 'wish-item';
      
      const isAttending = item.status === 'attending';
      const statusText = isAttending ? 'Hadir' : 'Maaf, Tidak Bisa Hadir';
      const statusClass = isAttending ? 'status-attending' : 'status-absent';

      itemElem.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-status ${statusClass}">${statusText}</span>
        </div>
        <div class="wish-text">${escapeHtml(item.message)}</div>
      `;

      wishesListContainer.appendChild(itemElem);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('rsvp-name');
      const statusInput = document.getElementById('rsvp-status');
      const msgInput = document.getElementById('rsvp-message');

      const nameVal = nameInput.value.trim();
      const msgVal = msgInput.value.trim();
      const statusVal = statusInput.value;

      if (!nameVal || !msgVal) {
        showToast('Mohon isi nama dan ucapan Anda!');
        return;
      }

      // Save wish locally
      const newWish = {
        name: nameVal,
        status: statusVal,
        message: msgVal
      };

      const currentWishes = getStoredWishes();
      currentWishes.unshift(newWish);
      saveWishes(currentWishes);
      renderWishes();

      // Send via Gmail
      const recipientEmail = "keluarga.airasyafiqah@gmail.com";
      const statusText = statusVal === 'attending' ? 'Saya Akan Hadir 🎉' : 'Maaf, Tidak Bisa Hadir 🙏';
      const emailSubject = `[RSVP Ulang Tahun Aira Ke-5] - ${nameVal}`;
      const emailBody = `Halo Keluarga Besar Aira Syafiqah,\n\nBerikut konfirmasi RSVP & ucapan ulang tahun saya:\n\n👤 Nama: ${nameVal}\n🎉 Konfirmasi Kehadiran: ${statusText}\n💬 Pesan & Doa:\n"${msgVal}"\n\nTerima kasih!`;

      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Try opening Gmail direct compose tab
      const win = window.open(gmailComposeUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        // Fallback to mailto if popup blocked
        window.location.href = mailtoUrl;
      }

      // Reset form & Toast feedback
      nameInput.value = '';
      msgInput.value = '';
      showToast('Membuka Gmail & menyimpan ucapan Anda! 📧');
    });
  }

  renderWishes();

  // 6. Copy Account Numbers / E-Wallet & Copy Address Action
  const copyAccBtns = document.querySelectorAll('.btn-copy-acc');
  copyAccBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Nomor Rekening';
      
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`No. ${label} (${textToCopy}) berhasil disalin! 📋`);
          
          const origContent = btn.innerHTML;
          btn.innerHTML = '<span>Tersalin!</span> ✔️';
          btn.style.background = 'var(--bright-pink)';
          btn.style.color = '#fff';

          setTimeout(() => {
            btn.innerHTML = origContent;
            btn.style.background = '';
            btn.style.color = '';
          }, 2500);
        }).catch(() => {
          showToast(`Gagal menyalin no. ${label}.`);
        });
      }
    });
  });

  const btnCopyAddress = document.getElementById('btn-copy-address');
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener('click', () => {
      const addressText = "Grand Ballroom Pink Palace, Jl. Mawar Indah No. 12, Jakarta";
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Alamat berhasil disalin!');
      }).catch(() => {
        showToast('Gagal menyalin alamat.');
      });
    });
  }

  // Toast Function
  function showToast(msg) {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 7. Floating Heart Particles
  createFloatingParticles();

  function createFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const symbols = ['💖', '🎀', '🌸', '✨', '🎈'];
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-heart';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.fontSize = (16 + Math.random() * 16) + 'px';
      container.appendChild(particle);
    }
  }

  // 8. Simple Canvas Confetti
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ffb6c1', '#ffffff', '#a855f7'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 6 - 3
      });
    }

    let animationId;
    let frames = 0;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
      });

      frames++;
      if (frames < 300) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }
});
