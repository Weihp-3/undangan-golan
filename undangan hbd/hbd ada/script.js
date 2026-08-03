document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. COUNTDOWN TIMER (Target: 17 Mei 2030, 19:00 WIB)
    // =========================================================
    const targetDate = new Date("May 17, 2030 19:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return; // Mencegah error jika elemen tidak ditemukan

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            daysEl.innerText = String(days).padStart(2, '0');
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');
        } else {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    // =========================================================
    // 2. TOMBOL SIMPAN DI CALENDAR (Otomatis Download File .ics)
    // =========================================================
    const btnCalendar = document.getElementById('btnCalendar');
    if (btnCalendar) {
        btnCalendar.addEventListener('click', (e) => {
            e.preventDefault();

            // Format tanggal untuk iCalendar (.ics)
            const icsData = [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "PRODID:-//Birthday Event//ID",
                "BEGIN:VEVENT",
                "SUMMARY:20th Ada Birthday Party 🎉",
                "DESCRIPTION:Acara Ulang Tahun Ada ke-20!",
                "LOCATION:Jl. Kemasan, Purbayan, Kotagede, Kota Yogyakarta",
                "DTSTART:20300517T120000Z", // 17 Mei 2030 19.00 WIB (12.00 UTC)
                "DTEND:20300517T150000Z",
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\n");

            // Membuat file gunduhan otomatis untuk HP/Desktop
            const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "Birthday_Ada_20th.ics");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('📅 File pengingat kalender berhasil diunduh! Silakan buka file tersebut untuk menyimpannya di Google/Apple Calendar.');
        });
    }


    // =========================================================
    // 3. TOMBOL SIMPAN LOKASI (Google Maps Navigation)
    // =========================================================
    const btnLocation = document.querySelector('.location-section .btn-action');
    if (btnLocation) {
        btnLocation.addEventListener('click', (e) => {
            e.preventDefault();
            // Membuka lokasi Google Maps di tab baru
            const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Kotagede+Yogyakarta";
            window.open(mapsUrl, '_blank');
        });
    }


    // =========================================================
    // 4. SMOOTH SCROLL TOMBOL "Save The Date" DI HERO
    // =========================================================
    const btnSaveDate = document.querySelector('.hero-section .btn-pill');
    if (btnSaveDate) {
        btnSaveDate.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('save-date');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // =========================================================
    // 5. FITUR INTERAKTIF FORM UCAPAN / KOMENTAR
    // =========================================================
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');

    if (commentForm && commentsContainer) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('nameInput');
            const messageInput = document.getElementById('messageInput');

            const name = nameInput.value.trim();
            const message = messageInput.value.trim();

            if (name !== "" && message !== "") {
                // Buat kartu ucapan baru
                const newComment = document.createElement('div');
                newComment.classList.add('comment-card');

                newComment.innerHTML = `
                    <h4>Happy Birthday Ada from ${escapeHTML(name)}</h4>
                    <p>${escapeHTML(message)}</p>
                `;

                // Tampilkan ucapan terbaru di paling atas
                commentsContainer.prepend(newComment);

                // Reset isi form
                commentForm.reset();

                alert('✨ Terima kasih! Ucapan kamu berhasil dikirim.');
            }
        });
    }
    // =========================================================
    // LOGIKA TOMBOL BUKA UNDANGAN (COVER OVERLAY)
    // =========================================================
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const btnOpenInvitation = document.getElementById('btnOpenInvitation');

    if (btnOpenInvitation && welcomeOverlay) {
        btnOpenInvitation.addEventListener('click', () => {
            // Menghilangkan Halaman Pembuka secara mulus
            welcomeOverlay.classList.add('hide');

            // Scroll otomatis ke paling atas halaman utama
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // Helper untuk mencegah serangan XSS / karakter berbahaya
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});