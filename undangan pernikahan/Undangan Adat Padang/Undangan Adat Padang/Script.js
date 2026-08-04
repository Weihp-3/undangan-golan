// ===================================================================
// UNDANGAN ADAT PADANG — SCRIPT.JS (Total Overhaul)
// ===================================================================

// ── Open Invitation ──
function openInvitation() {
    const hero = document.getElementById('hero');
    const main = document.getElementById('main-wrapper');
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');

    hero.classList.add('dismissed');

    // Try autoplay music
    if (music) {
        music.play().then(() => {
            if (btn) btn.classList.add('playing');
        }).catch(() => {});
    }

    setTimeout(() => {
        hero.style.display = 'none';
        main.classList.remove('hidden');
    }, 850);
}

// ── Toggle Audio ──
function toggleAudio() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (!music) return;

    if (music.paused) {
        music.play();
        btn?.classList.add('playing');
        toast('Musik diputar ♫');
    } else {
        music.pause();
        btn?.classList.remove('playing');
        toast('Musik dihentikan');
    }
}

// ── Copy Text ──
function copyText(text, msg) {
    navigator.clipboard.writeText(text)
        .then(() => toast(msg))
        .catch(() => toast('Gagal menyalin!'));
}

// ── Toast ──
function toast(message) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

// ── Countdown ──
const TARGET = new Date('December 30, 2026 08:00:00').getTime();

function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
        ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '00';
        });
        return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent  = pad(d);
    document.getElementById('cd-hours').textContent = pad(h);
    document.getElementById('cd-mins').textContent  = pad(m);
    document.getElementById('cd-secs').textContent  = pad(s);
}
tick();
setInterval(tick, 1000);

// ── Google Calendar ──
function addToCalendar() {
    const t = encodeURIComponent('Baralek Gadang Tika & Tiko');
    const det = encodeURIComponent('Pernikahan Adat Minangkabau — Tika Azkiya & Tiko Permana. Tarimo kasih atas kehadiran & doa restu.');
    const loc = encodeURIComponent('Gedung Balai Gadang Minangkabau, Jl. Khatib Sulaiman No. 88, Kota Padang, Sumatera Barat');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=20261230T010000Z/20261230T060000Z&details=${det}&location=${loc}`;
    window.open(url, '_blank');
    toast('Membuka Google Calendar…');
}

// ── RSVP ──
function submitRSVP(e) {
    e.preventDefault();
    const name = document.getElementById('f-name').value;
    toast(`Tarimo kasih ${name}, ucapan berhasil terkirim!`);
    e.target.reset();
}