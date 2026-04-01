// ============================================================
// Desktop Manager — CyberOS Portfolio
// Handles desktop icons, context menu, and icon interactions
// ============================================================

class Desktop {
  constructor(windowManager, fs) {
    this.wm = windowManager;
    this.fs = fs;
    this.selectedIcon = null;
    this.iconsEl = document.getElementById('desktop-icons');
    this.contextMenu = document.getElementById('context-menu');

    this.desktopItems = [
      { id: 'folder-skills', label: 'Skills', icon: this.folderSvg('#00ff88'), type: 'folder', path: '/home/guest/Desktop/Skills' },
      { id: 'folder-projects', label: 'Projects', icon: this.folderSvg('#00b4d8'), type: 'folder', path: '/home/guest/Desktop/Projects' },
      { id: 'folder-experience', label: 'Experience', icon: this.folderSvg('#a855f7'), type: 'folder', path: '/home/guest/Desktop/Experience' },
      { id: 'folder-certs', label: 'Certifications', icon: this.folderSvg('#ff6b35'), type: 'folder', path: '/home/guest/Desktop/Certifications' },
      { id: 'app-terminal', label: 'Terminal', icon: this.terminalSvg(), type: 'app', appId: 'terminal' },
      { id: 'app-browser', label: 'Browser', icon: this.browserSvg(), type: 'app', appId: 'browser' },
      { id: 'app-writeups', label: 'Writeups', icon: this.writeupsSvg(), type: 'app', appId: 'writeups' },
      { id: 'file-readme', label: 'README.txt', icon: this.fileSvg(), type: 'file', path: '/home/guest/Desktop/README.txt' },
      { id: 'app-about', label: 'About Me', icon: this.aboutSvg(), type: 'app', appId: 'about' },
    ];

    this.init();
  }

  init() {
    this.renderIcons();
    this.setupContextMenu();
    this.setupDesktopClick();
  }

  renderIcons() {
    this.iconsEl.innerHTML = '';
    this.desktopItems.forEach(item => {
      const iconEl = document.createElement('div');
      iconEl.className = 'desktop-icon';
      iconEl.id = item.id;
      iconEl.dataset.type = item.type;
      iconEl.innerHTML = `
        <div class="desktop-icon-img">${item.icon}</div>
        <span class="desktop-icon-label">${item.label}</span>
      `;

      // Single click to select
      iconEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectIcon(iconEl);
      });

      // Double click to open
      iconEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        this.openItem(item);
      });

      this.iconsEl.appendChild(iconEl);
    });
  }

  selectIcon(iconEl) {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    iconEl.classList.add('selected');
    this.selectedIcon = iconEl;
  }

  setupDesktopClick() {
    document.getElementById('desktop').addEventListener('click', (e) => {
      if (e.target.id === 'desktop' || e.target.closest('.desktop-icons')) {
        if (!e.target.closest('.desktop-icon')) {
          document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
          this.selectedIcon = null;
        }
      }
    });
  }

  openItem(item) {
    switch (item.type) {
      case 'folder':
        Apps.openFileExplorer(this.wm, this.fs, item.path, item.label);
        break;
      case 'file':
        const result = this.fs.cat(item.path);
        if (result.content) {
          Apps.openTextViewer(this.wm, item.label, result.content);
        }
        break;
      case 'app':
        if (item.appId === 'terminal') Apps.openTerminal(this.wm, this.fs);
        else if (item.appId === 'browser') Apps.openBrowser(this.wm);
        else if (item.appId === 'writeups') Apps.openWriteups(this.wm);
        else if (item.appId === 'about') Apps.openAbout(this.wm);
        break;
    }
  }

  setupContextMenu() {
    document.getElementById('desktop').addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY);
    });

    document.addEventListener('click', () => {
      this.contextMenu.classList.remove('visible');
    });

    // Context menu actions
    this.contextMenu.addEventListener('click', (e) => {
      const action = e.target.closest('.context-item')?.dataset.action;
      if (!action) return;

      switch (action) {
        case 'terminal':
          Apps.openTerminal(this.wm, this.fs);
          break;
        case 'browser':
          Apps.openBrowser(this.wm);
          break;
        case 'writeups':
          Apps.openWriteups(this.wm);
          break;
        case 'about':
          Apps.openAbout(this.wm);
          break;
        case 'refresh':
          location.reload();
          break;
      }
      this.contextMenu.classList.remove('visible');
    });
  }

  showContextMenu(x, y) {
    this.contextMenu.classList.add('visible');
    // Adjust position to keep in viewport
    const menuWidth = this.contextMenu.offsetWidth;
    const menuHeight = this.contextMenu.offsetHeight;

    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 5;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 5;

    this.contextMenu.style.left = x + 'px';
    this.contextMenu.style.top = y + 'px';
  }

  // === SVG Icon Generators ===

  folderSvg(color = '#00ff88') {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12C6 10.8954 6.89543 10 8 10H18L22 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z" fill="${color}" opacity="0.25"/>
      <path d="M6 12C6 10.8954 6.89543 10 8 10H18L22 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z" stroke="${color}" stroke-width="1.5"/>
    </svg>`;
  }

  terminalSvg() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="40" height="32" rx="3" fill="#0a0e17" stroke="#00ff88" stroke-width="1.5"/>
      <path d="M12 18L18 24L12 30" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="22" y1="30" x2="32" y2="30" stroke="#00ff88" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  browserSvg() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="40" height="32" rx="3" fill="#1a1f2e" stroke="#00b4d8" stroke-width="1.5"/>
      <line x1="4" y1="16" x2="44" y2="16" stroke="#00b4d8" stroke-width="1"/>
      <circle cx="10" cy="12" r="1.5" fill="#ff5f57"/>
      <circle cx="16" cy="12" r="1.5" fill="#febc2e"/>
      <circle cx="22" cy="12" r="1.5" fill="#28c840"/>
      <rect x="8" y="20" width="32" height="4" rx="1" fill="#00b4d8" opacity="0.3"/>
      <rect x="8" y="28" width="20" height="2" rx="1" fill="#00b4d8" opacity="0.2"/>
      <rect x="8" y="33" width="28" height="2" rx="1" fill="#00b4d8" opacity="0.15"/>
    </svg>`;
  }

  fileSvg() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6H30L38 14V42H12C10.8954 42 10 41.1046 10 40V8C10 6.89543 10.8954 6 12 6Z" fill="#1a1f2e" stroke="#e0e0e0" stroke-width="1.5"/>
      <path d="M30 6V14H38" stroke="#e0e0e0" stroke-width="1.5"/>
      <line x1="16" y1="22" x2="32" y2="22" stroke="#e0e0e0" stroke-width="1" opacity="0.5"/>
      <line x1="16" y1="28" x2="28" y2="28" stroke="#e0e0e0" stroke-width="1" opacity="0.5"/>
      <line x1="16" y1="34" x2="30" y2="34" stroke="#e0e0e0" stroke-width="1" opacity="0.5"/>
    </svg>`;
  }

  aboutSvg() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" fill="#1a1f2e" stroke="#00ff88" stroke-width="1.5"/>
      <circle cx="24" cy="16" r="5" fill="#00ff88" opacity="0.6"/>
      <path d="M14 36C14 30.4772 18.4772 26 24 26C29.5228 26 34 30.4772 34 36" fill="#00ff88" opacity="0.4"/>
    </svg>`;
  }

  writeupsSvg() {
    return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#1a1f2e" stroke="#22d3ee" stroke-width="1.5"/>
      <path d="M14 16h20M14 22h16M14 28h12" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M30 26l6-6 4 4-6 6H30v-4z" fill="#22d3ee" opacity="0.5" stroke="#22d3ee" stroke-width="1"/>
    </svg>`;
  }
}
