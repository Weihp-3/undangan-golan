const musik = document.getElementById('backsound');
const musicBtn = document.getElementById('music-btn');

document.addEventListener("DOMContentLoaded", function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
    
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Screenshot %1 ti %2",
            'alwaysShowNavOnTouchDevices': true,
            'disableScrolling': true
        });
    }

    ambilParameterTamu();
    buatPartikelPixel();
    mulaiCountdown();
    pasangEfekSuaraTombol();
});

// Sound Effect Beep 8-bit
function playClickSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
        console.log("AudioContext belum aktif");
    }
}

function pasangEfekSuaraTombol() {
    document.querySelectorAll('button, .btn-game, .btn-maps-game').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });
}

function ambilParameterTamu() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to') || urlParams.get('n');
    if (namaTamu) {
        document.getElementById('nama-tamu').textContent = namaTamu;
    }
}

function bukaUndangan() {
    playClickSound();

    const frameCover = document.getElementById('frame-1');
    if (frameCover) frameCover.classList.add('hide');
    
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'block';
    
    putarMusikAwal();

    setTimeout(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 150);
}

function putarMusikAwal() {
    if (musik) {
        musik.play().then(() => {
            if (musicBtn) musicBtn.textContent = '🔊';
        }).catch(err => {
            console.log("Autoplay dicegah browser:", err);
        });
    }
}

function toggleMusik() {
    if (!musik) return;

    if (musik.paused) {
        musik.play();
        if (musicBtn) musicBtn.textContent = '🔊';
    } else {
        musik.pause();
        if (musicBtn) musicBtn.textContent = '🔇';
    }
}

function buatPartikelPixel() {
    const wadah = document.getElementById('particle-container');
    if (!wadah) return;

    const colors = ['#00f0ff', '#ff0055', '#ffe600', '#39ff14'];

    setInterval(() => {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel-particle');
        
        pixel.style.left = Math.random() * 100 + '%';
        pixel.style.animationDuration = (Math.random() * 3 + 3) + 's';
        pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        wadah.appendChild(pixel);
        
        setTimeout(() => { 
            pixel.remove(); 
        }, 6000);
    }, 400);
}

function mulaiCountdown() {
    const targetDate = new Date("Aug 8, 2026 08:30:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const selisih = targetDate - now;

        if (selisih > 0) {
            const days = Math.floor(selisih / (1000 * 60 * 60 * 24));
            const hours = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((selisih % (1000 * 60)) / 1000);

            const dEl = document.getElementById("days");
            const hEl = document.getElementById("hours");
            const mEl = document.getElementById("minutes");
            const sEl = document.getElementById("seconds");

            if (dEl) dEl.innerText = days;
            if (hEl) hEl.innerText = hours;
            if (mEl) mEl.innerText = minutes;
            if (sEl) sEl.innerText = seconds;
        }
    }, 1000);
}

let totalHadir = 1;

function prosesKirimUcapan(event) {
    event.preventDefault();

    const nama = document.getElementById('ins-nama').value;
    const pesan = document.getElementById('ins-pesan').value;
    const hadir = document.getElementById('ins-hadir').value;

    if (hadir === "Hadir") {
        totalHadir++;
        const statEl = document.getElementById('stat-hadir');
        if (statEl) statEl.textContent = `${totalHadir} Players Joined`;
    }

    const skrg = new Date();
    const waktuStr = skrg.getFullYear() + '-' + 
        String(skrg.getMonth() + 1).padStart(2, '0') + '-' + 
        String(skrg.getDate()).padStart(2, '0');

    const container = document.getElementById('container-pesan-tamu');
    if (container) {
        const itemBaru = document.createElement('div');
        itemBaru.style.borderBottom = "1px dashed #444";
        itemBaru.style.padding = "8px 0";
        itemBaru.innerHTML = `
            <strong style="color: var(--neon-yellow);">${nama}</strong> 
            <span style="font-size: 12px; color: #666;">${waktuStr}</span>
            <p style="color: #fff; margin-top: 3px;">${pesan}</p>
        `;
        container.insertBefore(itemBaru, container.firstChild);
    }

    document.getElementById('ins-nama').value = '';
    document.getElementById('ins-pesan').value = '';

    const popup = document.getElementById('frame-8-page');
    if (popup) popup.style.display = 'flex';
}

function tutupPageUcapan() {
    playClickSound();
    const popup = document.getElementById('frame-8-page');
    if (popup) popup.style.display = 'none';
}