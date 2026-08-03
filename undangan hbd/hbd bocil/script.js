// --- 1. FUNGSI BUKA AMPLOP ---
function openEnvelope() {
  const wrapper = document.querySelector('.envelope-wrapper');
  const overlay = document.getElementById('envelopeOverlay');

  if (wrapper && overlay) {
    wrapper.classList.add('open');
    setTimeout(() => {
      overlay.classList.add('hide-overlay');
    }, 1200);
  }
}

// --- 2. FUNGSI COUNTDOWN TIMER ---
const targetDate = new Date(2026, 11, 25, 15, 0, 0).getTime(); 

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  }
}
setInterval(updateCountdown, 1000);

// --- 3. FUNGSI SIMPAN & TAMPILKAN KOMENTAR (LOCALSTORAGE) ---

// Fungsi memuat komentar saat web pertama dibuka / di-refresh
function loadComments() {
  const commentsList = document.getElementById('commentsList');
  if (!commentsList) return;

  // Ambil data dari localStorage (jika belum ada, gunakan array kosong)
  const savedComments = JSON.parse(localStorage.getItem('giovaniComments')) || [];

  // Kosongkan area komentar dulu
  commentsList.innerHTML = '';

  // Render ulang setiap komentar yang tersimpan
  savedComments.forEach(comment => {
    const commentItem = createCommentElement(comment.name, comment.status, comment.message);
    commentsList.appendChild(commentItem);
  });
}

// Fungsi membuat elemen HTML komentar
function createCommentElement(name, status, message) {
  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item';
  const statusClass = status === 'Hadir' ? 'status-hadir' : 'status-tidak';

  commentItem.innerHTML = `
    <div class="comment-header">
      <span class="comment-author">${name}</span>
      <span class="comment-status ${statusClass}">${status}</span>
    </div>
    <p class="comment-text">${message}</p>
  `;
  return commentItem;
}

// Fungsi saat tombol "Kirim Ucapan" diklik
function addComment(event) {
  event.preventDefault();

  const name = document.getElementById('guestName').value;
  const status = document.getElementById('guestStatus').value;
  const message = document.getElementById('guestMessage').value;

  const newComment = { name, status, message };

  // 1. Ambil data lama dari localStorage
  const savedComments = JSON.parse(localStorage.getItem('giovaniComments')) || [];

  // 2. Tambahkan komentar baru di awal array
  savedComments.unshift(newComment);

  // 3. Simpan kembali array terbaru ke localStorage
  localStorage.setItem('giovaniComments', JSON.stringify(savedComments));

  // 4. Perbarui tampilan di layar
  const commentsList = document.getElementById('commentsList');
  const commentElement = createCommentElement(name, status, message);
  commentsList.prepend(commentElement);

  // 5. Reset isi form
  document.getElementById('commentForm').reset();
}

// --- 4. FUNGSI PENDUKUNG LAINNYA ---
function addToGoogleCalendar() {
  const title = encodeURIComponent("Giovani 5th Birthday Party 🎉");
  const details = encodeURIComponent("Yuk merayakan acara syukuran ulang tahun Giovani yang ke-5 bersama-sama!");
  const location = encodeURIComponent("Rumah Giovani / Lokasi Acara");
  const startDate = "20261225T080000Z"; 
  const endDate = "20261225T110000Z";   
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  window.open(calendarUrl, '_blank');
}

function openGoogleMaps() {
  const alamat = encodeURIComponent("Jl. Mawar No. 123, Jakarta Selatan");
  window.open(`https://maps.google.com/?q=${alamat}`, '_blank');
}

function copyToClipboard(elementId, buttonElement) {
  const textToCopy = document.getElementById(elementId).innerText.replace(/\s+/g, '');
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = buttonElement.innerText;
    buttonElement.innerText = "✅ Tersalin!";
    buttonElement.classList.add("copied");
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.classList.remove("copied");
    }, 2000);
  });
}

// Jalankan loadComments() saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  loadComments();
  updateCountdown();
});