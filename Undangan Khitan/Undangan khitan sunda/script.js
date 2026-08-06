// Global Audio Player
const musik = document.getElementById('backsound');
const musicBtn = document.getElementById('music-btn');

// 1. Inisialisasi Fitur saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true
        });
    }
    
    // Konfigurasi Lightbox agar lancar dan gampang ditutup
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Foto %1 ti %2",
            'alwaysShowNavOnTouchDevices': true,
            'disableScrolling': true
        });
    }

    ambilParameterTamu();
    buatPartikelGugur();
    mulaiCountdown();
});

// 2. Ambil Nama Tamu dari Link (?to=NamaTamu)
function ambilParameterTamu() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to') || urlParams.get('n');
    if (namaTamu) {
        document.getElementById('nama-tamu').textContent = namaTamu;
    }
}

// 3. Buka Undangan & Putar Musik
function bukaUndangan() {
    // Sembunyikan Cover
    const frameCover = document.getElementById('frame-1');
    if (frameCover) frameCover.classList.add('hide');
    
    // Tampilkan Konten Utama
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'block';
    
    // Putar Audio
    putarMusikAwal();

    // Refresh AOS
    setTimeout(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 150);
}

function putarMusikAwal() {
    if (musik) {
        musik.play().then(() => {
            if (musicBtn) musicBtn.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay dicegah browser, klik tombol manual:", err);
        });
    }
}

// 4. Tombol Play / Pause Musik
function toggleMusik() {
    if (!musik) return;

    if (musik.paused) {
        musik.play();
        if (musicBtn) musicBtn.classList.add('playing');
    } else {
        musik.pause();
        if (musicBtn) musicBtn.classList.remove('playing');
    }
}

// 5. Efek Gugur Aset Daun/Bunga Sunda
function buatPartikelGugur() {
    const wadah = document.getElementById('particle-container');
    if (!wadah) return;

    setInterval(() => {
        const kelopak = document.createElement('div');
        kelopak.classList.add('petal');
        
        kelopak.style.left = Math.random() * 100 + '%';
        kelopak.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        const size = Math.random() * 10 + 15;
        kelopak.style.width = size + 'px';
        kelopak.style.height = size + 'px';
        
        wadah.appendChild(kelopak);
        
        setTimeout(() => { 
            kelopak.remove(); 
        }, 7000);
    }, 550);
}

// 6. Countdown Timer
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

// 7. Kirim Ucapan & Tampilkan Pop-Up
let totalHadir = 1;

function prosesKirimUcapan(event) {
    event.preventDefault();

    const nama = document.getElementById('ins-nama').value;
    const pesan = document.getElementById('ins-pesan').value;
    const hadir = document.getElementById('ins-hadir').value;

    if (hadir === "Hadir") {
        totalHadir++;
        const statEl = document.getElementById('stat-hadir');
        if (statEl) statEl.textContent = `${totalHadir} Orang Menyatakan Hadir`;
    }

    const skrg = new Date();
    const waktuStr = skrg.getFullYear() + '-' + 
        String(skrg.getMonth() + 1).padStart(2, '0') + '-' + 
        String(skrg.getDate()).padStart(2, '0') + ' ' + 
        String(skrg.getHours()).padStart(2, '0') + ':' + 
        String(skrg.getMinutes()).padStart(2, '0') + ':' + 
        String(skrg.getSeconds()).padStart(2, '0');

    const container = document.getElementById('container-pesan-tamu');
    if (container) {
        const itemBaru = document.createElement('div');
        itemBaru.classList.add('item-ucapan-sunda');
        itemBaru.innerHTML = `
            <strong>${nama}</strong> <span>${waktuStr}</span>
            <p>${pesan}</p>
        `;
        container.insertBefore(itemBaru, container.firstChild);
    }

    document.getElementById('ins-nama').value = '';
    document.getElementById('ins-pesan').value = '';

    const popup = document.getElementById('frame-8-page');
    if (popup) popup.style.display = 'flex';
}

function tutupPageUcapan() {
    const popup = document.getElementById('frame-8-page');
    if (popup) popup.style.display = 'none';
}