/* ==========================================
   CYBERKID APP SCRIPT ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ----------------------------------------------------
  // 1. GUEST NAME & INITIAL PARAMS
  // ----------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('name') || 'SPECIAL AGENT';
  const guestNameDisplay = document.getElementById('guestNameDisplay');
  const guestNameInput = document.getElementById('guestNameInput');
  
  if (guestNameDisplay) {
    guestNameDisplay.textContent = guestName.toUpperCase();
  }
  if (guestNameInput && guestName !== 'SPECIAL AGENT') {
    guestNameInput.value = guestName;
  }

  // ----------------------------------------------------
  // 2. CANVAS MATRIX & PARTICLE ANIMATION
  // ----------------------------------------------------
  const canvas = document.getElementById('cyberCanvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00f3ff' : '#ff007f',
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();

  // ----------------------------------------------------
  // 3. WEB AUDIO API SYNTHESIZER & SOUND FX
  // ----------------------------------------------------
  let audioCtx = null;
  let isMuted = false;
  let isPlayingSong = false;
  let currentSongTimer = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  // Play Sound FX (Beep / Laser click)
  function playSfx(freq = 440, type = 'sine', duration = 0.1) {
    if (isMuted) return;
    try {
      initAudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  }

  // Cyber Portal Unlock Sound
  function playPortalSound() {
    if (isMuted) return;
    try {
      initAudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}
  }

  // Happy Birthday Melody Note Frequencies (8-bit synth notes)
  const notesMap = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
  };

  // Melody Sequence: [Note, Duration (secs), LyricLineIndex]
  const birthdayMelody = [
    ['G4', 0.4, 1], ['G4', 0.4, 1], ['A4', 0.8, 1], ['G4', 0.8, 1], ['C5', 0.8, 1], ['B4', 1.2, 1],
    ['G4', 0.4, 2], ['G4', 0.4, 2], ['A4', 0.8, 2], ['G4', 0.8, 2], ['D5', 0.8, 2], ['C5', 1.2, 2],
    ['G4', 0.4, 3], ['G4', 0.4, 3], ['G5', 0.8, 3], ['E5', 0.8, 3], ['C5', 0.8, 3], ['B4', 0.8, 3], ['A4', 1.2, 3],
    ['F5', 0.4, 4], ['F5', 0.4, 4], ['E5', 0.8, 4], ['C5', 0.8, 4], ['D5', 0.8, 4], ['C5', 1.4, 5]
  ];

  function playSynthNote(freq, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square'; // 8-Bit chiptune sound
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration - 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playBirthdaySong() {
    initAudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    stopBirthdaySong();
    isPlayingSong = true;
    updateAudioUI(true);

    let noteIdx = 0;
    
    function stepMelody() {
      if (!isPlayingSong || noteIdx >= birthdayMelody.length) {
        if (noteIdx >= birthdayMelody.length) {
          // Loop song
          noteIdx = 0;
          currentSongTimer = setTimeout(stepMelody, 1000);
          return;
        }
        stopBirthdaySong();
        return;
      }

      const [noteName, duration, lineIdx] = birthdayMelody[noteIdx];
      const freq = notesMap[noteName] || 440;
      
      playSynthNote(freq, duration);
      highlightLyricLine(lineIdx);

      noteIdx++;
      currentSongTimer = setTimeout(stepMelody, duration * 1000);
    }

    stepMelody();
  }

  function stopBirthdaySong() {
    isPlayingSong = false;
    if (currentSongTimer) clearTimeout(currentSongTimer);
    updateAudioUI(false);
    clearLyricHighlight();
  }

  function highlightLyricLine(lineIdx) {
    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach((line, idx) => {
      if (idx + 1 === lineIdx) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });
  }

  function clearLyricHighlight() {
    document.querySelectorAll('.lyric-line').forEach(l => l.classList.remove('active'));
  }

  function updateAudioUI(playing) {
    const eq = document.getElementById('eqVisualizer');
    const statusText = document.getElementById('soundStatusText');
    const audioIcon = document.getElementById('audioPlayIcon');
    const mainIcon = document.getElementById('mainPlayIcon');
    const mainText = document.getElementById('mainPlayText');
    const visualizerScreen = document.querySelector('.visualizer-screen');

    if (playing) {
      if (eq) eq.classList.add('playing');
      if (statusText) statusText.textContent = 'AUDIO: PLAYING 8-BIT';
      if (audioIcon) audioIcon.className = 'fa-solid fa-pause';
      if (mainIcon) mainIcon.className = 'fa-solid fa-pause';
      if (mainText) mainText.textContent = 'PAUSE LAGU ULTAH';
      if (visualizerScreen) visualizerScreen.classList.add('active');
    } else {
      if (eq) eq.classList.remove('playing');
      if (statusText) statusText.textContent = 'AUDIO: READY';
      if (audioIcon) audioIcon.className = 'fa-solid fa-play';
      if (mainIcon) mainIcon.className = 'fa-solid fa-play';
      if (mainText) mainText.textContent = 'PUTAR LAGU ULTAH';
      if (visualizerScreen) visualizerScreen.classList.remove('active');
    }
  }

  // Floating Audio Widget Triggers
  const btnAudioPlay = document.getElementById('btnAudioPlay');
  const btnAudioSfx = document.getElementById('btnAudioSfx');
  const btnMainPlayMusic = document.getElementById('btnMainPlayMusic');
  const btnRestartMusic = document.getElementById('btnRestartMusic');

  if (btnAudioPlay) {
    btnAudioPlay.addEventListener('click', () => {
      playSfx(600, 'sine', 0.1);
      if (isPlayingSong) stopBirthdaySong();
      else playBirthdaySong();
    });
  }

  if (btnMainPlayMusic) {
    btnMainPlayMusic.addEventListener('click', () => {
      playSfx(600, 'sine', 0.1);
      if (isPlayingSong) stopBirthdaySong();
      else playBirthdaySong();
    });
  }

  if (btnRestartMusic) {
    btnRestartMusic.addEventListener('click', () => {
      playSfx(800, 'sine', 0.15);
      playBirthdaySong();
    });
  }

  if (btnAudioSfx) {
    btnAudioSfx.addEventListener('click', () => {
      isMuted = !isMuted;
      const sfxIcon = document.getElementById('sfxIcon');
      if (isMuted) {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        stopBirthdaySong();
      } else {
        sfxIcon.className = 'fa-solid fa-volume-high';
        playSfx(523, 'sine', 0.1);
      }
    });
  }

  // Attach button click SFX to all buttons
  document.querySelectorAll('button, .cyber-btn, .nav-link').forEach(btn => {
    btn.addEventListener('click', () => playSfx(500, 'sine', 0.08));
  });

  // ----------------------------------------------------
  // 4. UNLOCK COVER / PORTAL ENTRANCE
  // ----------------------------------------------------
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const coverSection = document.getElementById('coverSection');
  const mainContent = document.getElementById('mainContent');

  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', () => {
      playPortalSound();
      coverSection.classList.add('unlocked');
      setTimeout(() => {
        coverSection.style.display = 'none';
        mainContent.classList.add('visible');
        playBirthdaySong(); // Auto play birthday song on unlock
      }, 700);
    });
  }

  // ----------------------------------------------------
  // 5. COUNTDOWN TIMER
  // ----------------------------------------------------
  const targetDate = new Date('August 15, 2026 15:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.getElementById('cdDays').textContent = '00';
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMins').textContent = '00';
      document.getElementById('cdSecs').textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ----------------------------------------------------
  // 6. MEMORY BANK LIGHTBOX MODAL
  // ----------------------------------------------------
  const memoryCards = document.querySelectorAll('.memory-card');
  const memoryModal = document.getElementById('memoryModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  memoryCards.forEach(card => {
    card.addEventListener('click', () => {
      playSfx(700, 'square', 0.1);
      const level = card.getAttribute('data-level');
      const year = card.getAttribute('data-year');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const iconHTML = card.querySelector('.cyber-avatar').innerHTML;

      document.getElementById('modalLevelTag').textContent = `LEVEL ${level}`;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalYear').textContent = year;
      document.getElementById('modalIcon').innerHTML = iconHTML;

      memoryModal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      playSfx(300, 'sine', 0.08);
      memoryModal.classList.remove('active');
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      memoryModal.classList.remove('active');
    });
  }

  // ----------------------------------------------------
  // 7. RSVP FORM SUBMISSION & EMAIL TARGETING
  // ----------------------------------------------------
  const rsvpForm = document.getElementById('rsvpForm');
  const btnSaveEmail = document.getElementById('btnSaveEmail');
  const recipientEmailInput = document.getElementById('recipientEmailInput');
  const terminalLogBody = document.getElementById('terminalLogBody');

  // Load saved email if exists
  const savedEmail = localStorage.getItem('alden_rsvp_target_email');
  if (savedEmail && recipientEmailInput) {
    recipientEmailInput.value = savedEmail;
    rsvpForm.action = `https://formsubmit.co/${savedEmail}`;
  }

  if (btnSaveEmail) {
    btnSaveEmail.addEventListener('click', () => {
      const emailVal = recipientEmailInput.value.trim();
      if (emailVal && emailVal.includes('@')) {
        localStorage.setItem('alden_rsvp_target_email', emailVal);
        rsvpForm.action = `https://formsubmit.co/${emailVal}`;
        playSfx(880, 'sine', 0.15);
        addTerminalLog(`[SYSTEM CONFIG]: Email penerima RSVP diperbarui ke ${emailVal}`, 'system');
        alert(`Alamat email penerima RSVP berhasil diset ke: ${emailVal}`);
      } else {
        alert('Mohon masukkan format alamat email yang valid.');
      }
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('guestNameInput').value.trim();
      const statusVal = document.querySelector('input[name="Status_Kehadiran"]:checked').value;
      const countVal = document.getElementById('guestCountSelect').value;
      const messageVal = document.getElementById('messageInput').value.trim();

      if (!nameVal || !messageVal) {
        alert('Mohon lengkapi nama dan pesan ucapan terlebih dahulu.');
        return;
      }

      const submitBtn = document.getElementById('btnSubmitRsvp');
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...`;

      addTerminalLog(`[DATA PACKET]: Generating payload for Agent: ${nameVal}...`, 'user');

      // Submit via Fetch API to FormSubmit.co without page reload
      const formData = new FormData(rsvpForm);

      fetch(rsvpForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        playSfx(1046, 'sawtooth', 0.3); // Victory high synth
        addTerminalLog(`[SUCCESS 200]: Transmission delivered to email (${recipientEmailInput.value})!`, 'system');
        addTerminalLog(`[GUESTBOOK LOG]: ${nameVal} ("${statusVal}"): "${messageVal}"`, 'user');

        // Save entry locally
        saveGuestbookEntry(nameVal, statusVal, countVal, messageVal);
        
        alert(`Terima kasih Agent ${nameVal}! Data RSVP & pesan ucapanmu telah sukses terkirim ke email (${recipientEmailInput.value}).`);
        rsvpForm.reset();
      }).catch(err => {
        console.warn('Fetch submission error, executing fallback log:', err);
        // Fallback local save & log even if offline
        playSfx(900, 'sine', 0.2);
        addTerminalLog(`[OFFLINE LOG]: Data RSVP berhasil dicatat di Local Database!`, 'system');
        addTerminalLog(`[GUESTBOOK LOG]: ${nameVal} ("${statusVal}"): "${messageVal}"`, 'user');
        saveGuestbookEntry(nameVal, statusVal, countVal, messageVal);
        alert(`Terima kasih Agent ${nameVal}! Konfirmasi RSVP dan pesan ucapan telah berhasil disimpan.`);
        rsvpForm.reset();
      }).finally(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').innerHTML = `<i class="fa-solid fa-paper-plane"></i> TRANSMIT RSVP KE EMAIL`;
      });
    });
  }

  function addTerminalLog(msg, type = 'system') {
    if (!terminalLogBody) return;
    const logDiv = document.createElement('div');
    logDiv.className = `log-entry ${type}`;
    logDiv.textContent = msg;
    terminalLogBody.appendChild(logDiv);
    terminalLogBody.scrollTop = terminalLogBody.scrollHeight;
  }

  // ----------------------------------------------------
  // 8. GUESTBOOK LOCAL STORAGE ENGINE
  // ----------------------------------------------------
  function saveGuestbookEntry(name, status, count, msg) {
    const entries = JSON.parse(localStorage.getItem('alden_cyber_guestbook') || '[]');
    entries.push({ name, status, count, msg, time: new Date().toLocaleTimeString() });
    localStorage.setItem('alden_cyber_guestbook', JSON.stringify(entries));
  }

  function loadGuestbookEntries() {
    // Add default initial guestbook logs
    const defaults = [
      { name: 'Om Rian & Tante Siska', status: 'SIAP HADIR', msg: 'Selamat ulang tahun ke-5 Alden jagoan! Semoga makin pintar dan sehat selalu!' },
      { name: 'Keluarga Budi', status: 'SIAP HADIR', msg: 'Happy birthday Cyber Hero Alden! Gak sabar ketemu di pesta.' }
    ];

    defaults.forEach(d => {
      addTerminalLog(`[GUESTBOOK]: ${d.name} (${d.status}): "${d.msg}"`, 'user');
    });

    const entries = JSON.parse(localStorage.getItem('alden_cyber_guestbook') || '[]');
    entries.forEach(e => {
      addTerminalLog(`[GUESTBOOK]: ${e.name} (${e.status}): "${e.msg}"`, 'user');
    });
  }

  loadGuestbookEntries();

});
