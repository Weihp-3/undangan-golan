// 1. COUNTDOWN TIMER LOGIC
const targetDate = new Date("Oct 12, 2026 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    document.getElementById("countdown").innerText = "Acara Telah Dimulai";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 2. COPY REKENING FUNCTION
function copyRekening(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  }).catch(err => {
    console.error("Gagal menyalin: ", err);
  });
}

// 3. SUBMIT RSVP FORM LOGIC
function submitMessage() {
  const nama = document.getElementById("nama").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const ucapan = document.getElementById("ucapan").value.trim();

  if (!nama || !ucapan) {
    alert("Silakan isi nama dan ucapan Anda terlebih dahulu.");
    return;
  }

  const listContainer = document.getElementById("messages-list");
  const newItem = document.createElement("div");
  newItem.className = "message-item";

  const authorTitle = alamat ? `${nama}, ${alamat}` : nama;
  const now = new Date();
  const timeStr = now.toLocaleDateString("id-ID", {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  }) + " " + now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB";

  newItem.innerHTML = `
    <div class="message-author">${authorTitle}</div>
    <div class="message-text">${ucapan}</div>
    <div class="message-date"><i class="fa-regular fa-calendar"></i> ${timeStr}</div>
  `;

  listContainer.prepend(newItem);

  // Reset Form
  document.getElementById("nama").value = "";
  document.getElementById("alamat").value = "";
  document.getElementById("ucapan").value = "";

  alert("Terima kasih, doa dan ucapan Anda telah terkirim!");
}