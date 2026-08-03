// 1. Ambil URL Parameter untuk Nama Tamu
const params = new URLSearchParams(window.location.search);
const tamu = params.get('tamu');
if (tamu) {
  document.getElementById('guestName').textContent = decodeURIComponent(tamu);
}

// 2. Kontrol Gate Cover (Buka Sampul)
document.body.style.overflow = 'hidden';
document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('gate').classList.add('opened');
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 300);
});

// 3. Countdown Timer Acara Pernikahan
const weddingDate = new Date('2026-11-14T09:00:00+07:00').getTime();

function tick() {
  const now = Date.now();
  const diff = Math.max(0, weddingDate - now);
  
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  
  document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}

tick();
setInterval(tick, 1000);

// 4. Animasi Element Saat Scroll (Fade-up)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// 5. Fitur Modal Lightbox Foto (Buka Foto Saat Diklik)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// 6. Form RSVP & Submit Ucapan
document.getElementById('rsvpSubmit').addEventListener('click', function () {
  const nama = document.getElementById('rsvpNama').value.trim();
  const hadir = document.getElementById('rsvpHadir').value;
  const pesan = document.getElementById('rsvpPesan').value.trim();
  const errorEl = document.getElementById('rsvpError');
  const toastEl = document.getElementById('rsvpToast');

  toastEl.classList.remove('show');
  if (errorEl) errorEl.classList.remove('show');

  if (!nama || !hadir) {
    if (errorEl) errorEl.classList.add('show');
    return;
  }
  
  toastEl.classList.add('show');

  if (pesan) {
    const list = document.getElementById('wishesList');
    const item = document.createElement('div');
    item.className = 'wish fade-up in';
    item.innerHTML = '<b>' + nama.replace(/</g, '&lt;') + '</b><p>' + pesan.replace(/</g, '&lt;') + '</p>';
    list.prepend(item);
  }

  document.getElementById('rsvpForm').reset();
});

// 7. Salin Nomor Rekening
function copyAcc(num, btn) {
  const original = btn.textContent;

  function showCopied() {
    btn.textContent = 'Tersalin!';
    setTimeout(() => btn.textContent = original, 1500);
  }

  function fallbackCopy() {
    try {
      const ta = document.createElement('textarea');
      ta.value = num;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopied();
    } catch (err) {
      btn.textContent = 'Salin manual: ' + num;
      setTimeout(() => btn.textContent = original, 2500);
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(showCopied).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}