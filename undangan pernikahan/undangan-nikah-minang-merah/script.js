/* ========================================
   MOTION MINANG — SPLIT SCREEN
   Sequential reveal + full sections
   ======================================== */

const weddingData = {
  date: "2026-12-20T08:00:00+07:00",
  guestName: "Bapak/Ibu/Saudara/i",
};

let isMusicPlaying = false;
let isOpened = false;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to") || weddingData.guestName;
  const guestEl = document.getElementById("guest-name");
  if (guestEl) guestEl.textContent = guest;

  if (typeof lucide !== "undefined") lucide.createIcons();

  loadWishes();
  animateHero();
  animateCover();
  setupEvents();
  setupLightbox();
  startCountdown();
});

function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".hero-side-label", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .to(".hero-side-names", { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
    .to(".hero-side-date", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
    .to(".hero-side-theme", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
}

function animateCover() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });
  tl.to(".rumah-icon", { opacity: 1, scale: 1, duration: 0.7 })
    .to(".cover-label", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .to(".cover-name", { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.25")
    .to(".cover-amp", { opacity: 1, scale: 1, duration: 0.45 }, "-=0.4")
    .to(".cover-date", { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
    .to(".guest-info", { opacity: 1, y: 0, duration: 0.55 }, "-=0.2")
    .to(".btn-open", { opacity: 1, y: 0, duration: 0.65 }, "-=0.15");
}

function openInvitation() {
  if (isOpened) return;
  isOpened = true;

  const coverPage = document.getElementById("cover-page");
  const mainContent = document.getElementById("main-content");
  const musicBtn = document.getElementById("music-btn");

  const tl = gsap.timeline({
    onComplete: () => {
      coverPage.style.display = "none";
      mainContent.style.display = "flex";
      gsap.to(mainContent, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: playSequentialReveal,
      });
      if (musicBtn) musicBtn.classList.add("visible");
      playMusic();
    },
  });

  tl.to(".btn-open", { scale: 0.94, duration: 0.1 })
    .to(".btn-open", { scale: 1, duration: 0.1 })
    .to(".cover-card", {
      scale: 0.96, opacity: 0, y: -28, duration: 0.5, ease: "power2.inOut",
    }, "-=0.05");
}

function playSequentialReveal() {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  // 1. Salam + Ayat
  tl.to("#salam", { opacity: 1, y: 0, duration: 0.7 })

  // 2. Mempelai — section dulu biar parent visible
    .to("#mempelai", { opacity: 1, y: 0, duration: 0.5 }, "+=0.12")
    .to('[data-anim="bride"]', { opacity: 1, y: 0, duration: 0.6 }, "-=0.15")
    .fromTo(
      '[data-anim="bride"] .frame-deco',
      { opacity: 0, scale: 0.6, x: -12 },
      { opacity: 0.95, scale: 1, x: 0, duration: 0.45, ease: "back.out(1.4)" },
      "-=0.3"
    )
    .to('[data-anim="heart"]', { opacity: 1, scale: 1, duration: 0.35 }, "-=0.12")
    .to('[data-anim="groom"]', { opacity: 1, y: 0, duration: 0.6 }, "-=0.08")
    .fromTo(
      '[data-anim="groom"] .frame-deco',
      { opacity: 0, scale: 0.6, x: 12 },
      { opacity: 0.95, scale: 1, x: 0, duration: 0.45, ease: "back.out(1.4)" },
      "-=0.3"
    )

  // 3. Love Story
    .to("#cerita", { opacity: 1, y: 0, duration: 0.5 }, "+=0.15")
    .to(".timeline-item", { opacity: 1, x: 0, duration: 0.45, stagger: 0.12 }, "-=0.15")

  // 4. Countdown
    .to("#countdown", { opacity: 1, y: 0, duration: 0.5 }, "+=0.12")
    .to(".count-card", { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.3)" }, "-=0.2")

  // 5. Acara
    .to("#acara", { opacity: 1, y: 0, duration: 0.45 }, "+=0.1")
    .to('[data-anim="event-1"]', { opacity: 1, y: 0, duration: 0.5 }, "-=0.12")
    .to('[data-anim="event-2"]', { opacity: 1, y: 0, duration: 0.5 }, "-=0.18")

  // 6. Lokasi
    .to("#lokasi", { opacity: 1, y: 0, duration: 0.5 }, "+=0.1")

  // 7. Gallery
    .to("#galeri", { opacity: 1, y: 0, duration: 0.45 }, "+=0.1")
    .to(".gallery-item", { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.2)" }, "-=0.15")

  // 8. Gift
    .to("#gift", { opacity: 1, y: 0, duration: 0.45 }, "+=0.1")
    .to('[data-anim="gift-1"]', { opacity: 1, y: 0, duration: 0.45 }, "-=0.1")
    .to('[data-anim="gift-2"]', { opacity: 1, y: 0, duration: 0.45 }, "-=0.18")
    .to('[data-anim="gift-3"]', { opacity: 1, y: 0, duration: 0.45 }, "-=0.18")

  // 9. RSVP
    .to("#rsvp", { opacity: 1, y: 0, duration: 0.55 }, "+=0.08")

  // 10. Ucapan
    .to("#ucapan", { opacity: 1, y: 0, duration: 0.5 }, "+=0.08")

  // 11. Closing
    .to('[data-anim="closing"]', { opacity: 1, y: 0, duration: 0.65 }, "+=0.1");
}

/* Music */
function playMusic() {
  const audio = document.getElementById("wedding-audio");
  const musicBtn = document.getElementById("music-btn");
  if (!audio) return;
  audio.play().then(() => {
    isMusicPlaying = true;
    if (musicBtn) musicBtn.classList.add("playing");
  }).catch(() => { isMusicPlaying = false; });
}

function toggleMusic() {
  const audio = document.getElementById("wedding-audio");
  const musicBtn = document.getElementById("music-btn");
  if (!audio) return;
  if (isMusicPlaying) {
    audio.pause();
    isMusicPlaying = false;
    if (musicBtn) musicBtn.classList.remove("playing");
  } else {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (musicBtn) musicBtn.classList.add("playing");
    }).catch(() => {});
  }
}

/* Countdown */
function startCountdown() {
  const target = new Date(weddingData.date).getTime();
  function update() {
    const now = Date.now();
    const diff = target - now;
    const ids = ["days", "hours", "minutes", "seconds"];
    const els = ids.map((id) => document.getElementById(id));
    if (!els[0]) return;
    if (diff <= 0) { els.forEach((el) => (el.textContent = "00")); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els[0].textContent = String(d).padStart(2, "0");
    els[1].textContent = String(h).padStart(2, "0");
    els[2].textContent = String(m).padStart(2, "0");
    els[3].textContent = String(s).padStart(2, "0");
  }
  update();
  setInterval(update, 1000);
}

/* Wishes */
function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  renderWishes(wishes);
}

function saveWish(wish) {
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  wishes.unshift(wish);
  localStorage.setItem("weddingWishes", JSON.stringify(wishes));
  renderWishes(wishes);
}

function renderWishes(wishes) {
  const list = document.getElementById("wishes-list");
  if (!list) return;
  if (!wishes.length) {
    list.innerHTML = `<div class="wish-card empty-wish"><p>Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p></div>`;
    return;
  }
  list.innerHTML = wishes.map((w) => {
    let cls = "";
    if (w.status === "Akan Hadir") cls = "hadir";
    else if (w.status === "Tidak Dapat Hadir") cls = "tidak";
    return `
      <div class="wish-card">
        <div class="wish-header">
          <span class="wish-name">${escapeHtml(w.name)}</span>
          <span class="wish-status ${cls}">${escapeHtml(w.status)}</span>
        </div>
        <p class="wish-message">${escapeHtml(w.message || "Semoga bahagia selalu!")}</p>
        <p class="wish-time">${w.time}</p>
      </div>`;
  }).join("");
}

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast("Berhasil disalin")).catch(() => showToast("Gagal menyalin"));
}

function setupEvents() {
  const btnOpen = document.getElementById("btn-open");
  if (btnOpen) btnOpen.addEventListener("click", openInvitation);

  const musicBtn = document.getElementById("music-btn");
  if (musicBtn) musicBtn.addEventListener("click", toggleMusic);

  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.copy || "";
      if (t) copyText(t);
    });
  });

  const form = document.getElementById("rsvp-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rsvp-name").value.trim();
      const guests = document.getElementById("rsvp-guests").value;
      const status = document.querySelector('input[name="status"]:checked');
      const message = document.getElementById("rsvp-message").value.trim();
      if (!name || !status) {
        showToast("Mohon lengkapi form");
        return;
      }
      const now = new Date();
      const timeStr = now.toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
      saveWish({
        name,
        guests: parseInt(guests) || 1,
        status: status.value,
        message,
        time: timeStr,
      });
      form.style.display = "none";
      const success = document.getElementById("rsvp-success");
      if (success) {
        success.style.display = "block";
        if (typeof lucide !== "undefined") lucide.createIcons();
      }
      showToast("Konfirmasi terkirim");
      setTimeout(() => {
        form.reset();
        form.style.display = "block";
        if (success) success.style.display = "none";
        document.getElementById("ucapan")?.scrollIntoView({ behavior: "smooth" });
      }, 2500);
    });
  }
}


/* ========== LIGHTBOX ========== */
let galleryImages = [];
let currentIndex = 0;

function setupLightbox() {
  const items = document.querySelectorAll(".gallery-item");
  galleryImages = Array.from(items).map((el) => el.dataset.full || el.querySelector("img")?.src).filter(Boolean);

  items.forEach((item, idx) => {
    item.addEventListener("click", () => openLightbox(idx));
  });

  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const box = document.getElementById("lightbox");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateLightbox(1));
  if (box) {
    box.addEventListener("click", (e) => {
      if (e.target === box) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (!lb || !lb.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  if (!galleryImages.length) return;
  currentIndex = index;
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lb || !img) return;
  img.src = galleryImages[currentIndex];
  lb.classList.add("active");
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) lb.classList.remove("active");
}

function navigateLightbox(dir) {
  if (!galleryImages.length) return;
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById("lightbox-img");
  if (img) img.src = galleryImages[currentIndex];
}
