AOS.init({
    duration: 800,
    once: false,
    mirror: true
});

let timerInterval = null;

function openInvitation() {
    document.getElementById('main-content').classList.remove('content-hidden');

    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });

    setTimeout(() => {
        AOS.refresh();
    }, 300);

    startOneMinuteTimer();
}

function openLightbox(imageSrc) {
    document.getElementById('lightbox-img').src = imageSrc;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// LOGIK MENGIRIM KOMENTAR RSVP
function handleFormSubmit(event) {
    event.preventDefault();
    
    const nama = document.getElementById('rsvp-nama').value;
    const status = document.getElementById('rsvp-status').value;
    const pesan = document.getElementById('rsvp-pesan').value;
    const container = document.getElementById('comments-container');

    const badgeClass = status === 'Hadir' ? 'badge-hadir' : 'badge-tidak';

    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.innerHTML = `
        <div class="comment-header">
            <strong>${nama}</strong>
            <span class="${badgeClass}">${status}</span>
        </div>
        <p class="comment-text">${pesan}</p>
    `;

    container.prepend(newComment);
    document.getElementById('rsvp-form').reset();
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert('Nomor Rekening tersalin: ' + text);
}

function startOneMinuteTimer() {
    if (timerInterval) clearInterval(timerInterval);

    const targetTime = new Date().getTime() + (60 * 1000);

    timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance >= 0) {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        } else {
            clearInterval(timerInterval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }, 1000);
}