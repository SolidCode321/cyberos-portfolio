// ============================================================
// Boot Sequence — CyberOS Portfolio
// BIOS-style boot animation with ASCII art and auto-login
// ============================================================

class BootSequence {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.bootScreen = document.getElementById('boot-screen');
    this.bootScreen.innerHTML = `
      <div id="boot-log"></div>
      <div class="boot-skip-hint">Press any key or <b>click</b> to skip boot sequence</div>
    `;
    this.bootLog = document.getElementById('boot-log');
    this.loginScreen = document.getElementById('login-screen');
    this.desktop = document.getElementById('desktop');
    this.taskbar = document.getElementById('taskbar');

    this.bootMessages = [
      { text: 'CyberOS BIOS v4.2.0 — Initializing...', delay: 0 },
      { text: 'CPU: Neural Engine v4 @ 4.20GHz', delay: 80 },
      { text: 'Memory: 32768MB DDR5 ECC ... OK', delay: 60 },
      { text: 'Storage: 2TB NVMe SSD (encrypted) ... OK', delay: 60 },
      { text: '', delay: 40 },
      { text: 'Loading security modules...', delay: 100 },
      { text: '  ├── Firewall ................. [  OK  ]', delay: 60 },
      { text: '  ├── IDS/IPS .................. [  OK  ]', delay: 50 },
      { text: '  ├── Encryption Engine ........ [  OK  ]', delay: 50 },
      { text: '  ├── Integrity Monitor ........ [  OK  ]', delay: 50 },
      { text: '  └── Threat Intelligence ...... [  OK  ]', delay: 50 },
      { text: '', delay: 40 },
      { text: 'Mounting encrypted filesystem ... OK', delay: 80 },
      { text: 'Starting network services ... OK', delay: 70 },
      { text: 'Initializing desktop environment ...', delay: 100 },
      { text: '', delay: 60 },
      { text: '██████████████████████████████ 100%', delay: 150 },
      { text: '', delay: 80 },
      { text: 'System ready. Starting login...', delay: 200 },
    ];

    this.start();
  }

  async start() {
    // Skip animation on click/keypress
    let skipped = false;
    const skipHandler = () => {
      skipped = true;
      this.skip();
    };
    document.addEventListener('click', skipHandler, { once: true });
    document.addEventListener('keydown', skipHandler, { once: true });

    // Play boot log
    for (const msg of this.bootMessages) {
      if (skipped) return;
      await this.delay(msg.delay);
      if (skipped) return;
      this.addBootLine(msg.text);
    }

    if (skipped) return;

    // Transition to login screen
    await this.delay(400);
    if (skipped) return;
    this.showLogin();

    // Auto-type username
    await this.delay(500);
    if (skipped) return;
    await this.typeText('login-username', 'guest');

    await this.delay(300);
    if (skipped) return;
    await this.typeText('login-password', '••••••••');

    await this.delay(400);
    if (skipped) return;

    // Show "Authenticated" message
    const authMsg = document.getElementById('login-status');
    if (authMsg) {
      authMsg.textContent = '[+] Authenticated';
      authMsg.classList.add('visible');
    }

    await this.delay(800);
    if (skipped) return;

    this.complete();

    document.removeEventListener('click', skipHandler);
    document.removeEventListener('keydown', skipHandler);
  }

  addBootLine(text) {
    const line = document.createElement('div');
    line.className = 'boot-line';

    if (text.includes('[  OK  ]')) {
      line.innerHTML = text.replace('[  OK  ]', '<span class="boot-ok">[  OK  ]</span>');
    } else if (text.includes('100%')) {
      line.innerHTML = `<span class="boot-progress">${text}</span>`;
    } else {
      line.textContent = text;
    }

    this.bootLog.appendChild(line);
    this.bootLog.scrollTop = this.bootLog.scrollHeight;
  }

  showLogin() {
    this.bootScreen.classList.add('fade-out');
    setTimeout(() => {
      this.bootScreen.style.display = 'none';
      this.loginScreen.style.display = 'flex';
      this.loginScreen.classList.add('fade-in');
    }, 400);
  }

  async typeText(elementId, text) {
    const el = document.getElementById(elementId);
    if (!el) return;
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await this.delay(60 + Math.random() * 40);
    }
  }

  skip() {
    this.complete();
  }

  complete() {
    // Hide boot and login screens
    this.bootScreen.style.display = 'none';
    this.loginScreen.style.display = 'none';

    // Show desktop
    this.desktop.classList.add('visible');
    this.taskbar.classList.add('visible');

    // Show welcome hint after a short delay
    setTimeout(() => {
      const hint = document.getElementById('welcome-hint');
      const hintBody = hint?.querySelector('.welcome-hint-body');
      
      if (hint && hintBody) {
        // Dynamic hint for mobile
        if (window.innerWidth <= 768) {
          hintBody.innerHTML = 'Welcome to CyberOS! <b>Tap</b> icons to explore my work, or use the <b>Home</b> button for more. Try the terminal for a full experience.';
        }

        hint.classList.add('visible');
        // Auto-hide after 10 seconds or on first click
        const dismiss = () => {
          hint.classList.remove('visible');
          document.removeEventListener('click', dismiss);
        };
        document.addEventListener('click', dismiss);
        setTimeout(dismiss, 10000);
      }
    }, 1500);

    if (this.onComplete) this.onComplete();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================
// Main Entry — Initialize everything after boot
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Start boot sequence
  new BootSequence(() => {
    // Initialize core systems
    const fs = new VirtualFS();
    const wm = new WindowManager();
    const desktop = new Desktop(wm, fs);

    // Start clock
    updateClock();
    setInterval(updateClock, 30000);

    // Setup start menu
    setupStartMenu(wm, fs);
  });
});

function updateClock() {
  const clockEl = document.getElementById('taskbar-clock');
  const statusClockEl = document.getElementById('status-clock');
  
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  
  if (clockEl) {
    const month = now.toLocaleString('default', { month: 'short' });
    const day = now.getDate();
    clockEl.textContent = `${hours}:${mins}  ${month} ${day}`;
  }
  
  if (statusClockEl) {
    statusClockEl.textContent = `${hours}:${mins}`;
  }
}

function setupStartMenu(wm, fs) {
  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');

  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('visible');
  });

  document.addEventListener('click', () => {
    startMenu.classList.remove('visible');
  });

  // Start menu items
  startMenu.addEventListener('click', (e) => {
    const action = e.target.closest('.start-item')?.dataset.action;
    if (!action) return;

    switch (action) {
      case 'terminal': Apps.openTerminal(wm, fs); break;
      case 'browser': Apps.openBrowser(wm); break;
      case 'writeups': Apps.openWriteups(wm); break;
      case 'files': Apps.openFileExplorer(wm, fs, '/home/guest/Desktop', 'Desktop'); break;
      case 'about': Apps.openAbout(wm); break;
    }
    startMenu.classList.remove('visible');
  });
}
