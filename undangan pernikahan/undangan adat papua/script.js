// Function Buka Undangan (Slide Up animation)
function bukaUndangan() {
    const cover = document.getElementById('cover-page');
    const container = document.querySelector('.app-container');
    
    cover.classList.add('slide-up');
    
    setTimeout(() => {
        cover.style.display = 'none';
        container.style.overflowY = 'auto';
    }, 1200);
}

// Function Salin Teks (Rekening / Alamat)
function copyText(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
    }).catch(err => {
        showToast("Gagal menyalin!");
    });
}

// Function Show Toast Notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "toast show";
    
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 2500);
}

// COUNTDOWN TIMER LOGIC (Target: 30 Desember 2026 08:00 WIT)
const targetDate = new Date("December 30, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// FUNCTION TAMBAH KE GOOGLE CALENDAR
function tambahKeKalender() {
    const title = encodeURIComponent("Pernikahan Adat Papua Tika & Tiko");
    const details = encodeURIComponent("Acara Pernikahan Adat Tika Azkiya & Tiko Permana. Wa wa wa... Terima kasih atas kehadiran dan doa restunya.");
    const location = encodeURIComponent("Swiss-Belhotel Papua, Jl. Pasifik Permai, Ruko Dok II, Kota Jayapura, Papua");
    
    // Waktu UTC (30 Desember 2026 jam 08.00 WIT = 29 Desember 23.00 UTC)
    const startDate = "20261229T230000Z";
    const endDate = "20261230T040000Z";
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    
    window.open(calendarUrl, '_blank');
    showToast("Membuka Google Calendar...");
}

// Function Form RSVP Handler
function kirimRSVP(event) {
    event.preventDefault();
    const nama = document.getElementById("rsvp-nama").value;
    showToast("Terima kasih " + nama + ", ucapan & konfirmasi telah terkirim!");
    document.querySelector(".rsvp-form").reset();
}