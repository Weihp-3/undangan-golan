// Open cover
const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
document.body.style.overflow = 'hidden';

openBtn.addEventListener('click', () => {
  cover.classList.add('opened');
  document.body.style.overflow = 'auto';
  setTimeout(() => { 
    cover.style.display = 'none'; 
  }, 950);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

reveals.forEach(r => io.observe(r));

// Countdown
const targetDate = new Date('2026-12-20T09:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('timer').innerHTML = '<div style="width:auto;padding:16px 24px;"><span style="font-size:18px;">Acara telah berlangsung</span></div>';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();