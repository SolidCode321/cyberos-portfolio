// ============================================================
// Window Manager — CyberOS Portfolio
// Handles window creation, dragging, stacking, min/max/close
// ============================================================

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.zIndex = 100;
    this.activeWindowId = null;
    this.cascadeOffset = 0;
    this.desktopEl = document.getElementById('desktop');
    this.taskbarAppsEl = document.getElementById('taskbar-apps');
    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // Clicking on desktop deselects all icons and deactivates windows
    this.desktopEl.addEventListener('mousedown', (e) => {
      if (e.target === this.desktopEl || e.target.classList.contains('desktop-icons')) {
        this.deactivateAllWindows();
      }
    });
  }

  generateId() {
    return 'win-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  }

  createWindow({ title, icon, width, height, content, onInit, className, appId, singleton }) {
    // If singleton, check if already open
    if (singleton && appId) {
      for (const [id, win] of this.windows) {
        if (win.appId === appId) {
          this.restoreWindow(id);
          this.focusWindow(id);
          return id;
        }
      }
    }

    const id = this.generateId();
    width = width || 700;
    height = height || 500;

    // Calculate position (cascading)
    const maxX = window.innerWidth - width - 20;
    const maxY = window.innerHeight - height - 70;
    const x = Math.min(80 + this.cascadeOffset * 30, maxX);
    const y = Math.min(60 + this.cascadeOffset * 30, maxY);
    this.cascadeOffset = (this.cascadeOffset + 1) % 8;

    // Create window element
    const winEl = document.createElement('div');
    winEl.className = `window ${className || ''} window-opening`;
    winEl.id = id;
    winEl.style.width = width + 'px';
    winEl.style.height = height + 'px';
    winEl.style.left = x + 'px';
    winEl.style.top = y + 'px';
    winEl.style.zIndex = ++this.zIndex;

    winEl.innerHTML = `
      <div class="window-titlebar" data-win-id="${id}">
        <div class="window-title">
          <span class="window-icon">${icon || Icons.monitor(14)}</span>
          <span class="window-title-text">${title}</span>
        </div>
        <div class="window-controls">
          <button class="win-ctrl win-minimize" data-action="minimize" title="Minimize">
            <svg viewBox="0 0 12 12"><rect x="2" y="5.5" width="8" height="1" fill="currentColor"/></svg>
          </button>
          <button class="win-ctrl win-maximize" data-action="maximize" title="Maximize">
            <svg viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1"/></svg>
          </button>
          <button class="win-ctrl win-close" data-action="close" title="Close">
            <svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" stroke-width="1.5"/></svg>
          </button>
        </div>
      </div>
      <div class="window-body">${content || ''}</div>
    `;

    // Add to desktop
    this.desktopEl.appendChild(winEl);

    // Remove opening animation class
    setTimeout(() => winEl.classList.remove('window-opening'), 300);

    // Store window data
    this.windows.set(id, {
      element: winEl,
      title,
      icon,
      appId: appId || id,
      isMinimized: false,
      isMaximized: false,
      restoreRect: null
    });

    // Setup events
    this.setupWindowEvents(id);
    this.addTaskbarButton(id, icon, title);
    this.focusWindow(id);

    // Call onInit if provided
    if (onInit) {
      onInit(winEl.querySelector('.window-body'), id);
    }

    return id;
  }

  setupWindowEvents(id) {
    const win = this.windows.get(id);
    const el = win.element;
    const titlebar = el.querySelector('.window-titlebar');

    // Focus on click
    el.addEventListener('mousedown', () => this.focusWindow(id));

    // Window controls
    el.querySelectorAll('.win-ctrl').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'minimize') this.minimizeWindow(id);
        else if (action === 'maximize') this.toggleMaximize(id);
        else if (action === 'close') this.closeWindow(id);
      });
    });

    // Double click titlebar to maximize
    titlebar.addEventListener('dblclick', () => this.toggleMaximize(id));

    // Dragging
    this.setupDrag(id, titlebar);
  }

  setupDrag(id, titlebar) {
    let isDragging = false;
    let startX, startY, origX, origY;

    const onMouseDown = (e) => {
      if (e.target.closest('.window-controls')) return;
      const win = this.windows.get(id);
      if (win.isMaximized) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = win.element.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;

      win.element.classList.add('window-dragging');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const win = this.windows.get(id);
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let newX = origX + dx;
      let newY = origY + dy;

      // Constrain to viewport
      newX = Math.max(-100, Math.min(newX, window.innerWidth - 100));
      newY = Math.max(0, Math.min(newY, window.innerHeight - 60));

      win.element.style.left = newX + 'px';
      win.element.style.top = newY + 'px';
    };

    const onMouseUp = () => {
      isDragging = false;
      const win = this.windows.get(id);
      if (win) win.element.classList.remove('window-dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    titlebar.addEventListener('mousedown', onMouseDown);
  }

  focusWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    // Deactivate previous
    this.windows.forEach((w, wid) => {
      w.element.classList.remove('window-active');
      const btn = document.querySelector(`.taskbar-btn[data-win-id="${wid}"]`);
      if (btn) btn.classList.remove('active');
    });

    // Activate this one
    win.element.style.zIndex = ++this.zIndex;
    win.element.classList.add('window-active');
    this.activeWindowId = id;

    const btn = document.querySelector(`.taskbar-btn[data-win-id="${id}"]`);
    if (btn) btn.classList.add('active');
  }

  deactivateAllWindows() {
    this.windows.forEach((w, wid) => {
      w.element.classList.remove('window-active');
      const btn = document.querySelector(`.taskbar-btn[data-win-id="${wid}"]`);
      if (btn) btn.classList.remove('active');
    });
    this.activeWindowId = null;
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.isMinimized = true;
    win.element.classList.add('window-minimized');
    
    const btn = document.querySelector(`.taskbar-btn[data-win-id="${id}"]`);
    if (btn) btn.classList.remove('active');
    
    this.activeWindowId = null;
  }

  restoreWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.isMinimized = false;
    win.element.classList.remove('window-minimized');
    this.focusWindow(id);
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (win.isMaximized) {
      // Restore
      win.element.classList.remove('window-maximized');
      if (win.restoreRect) {
        win.element.style.left = win.restoreRect.left;
        win.element.style.top = win.restoreRect.top;
        win.element.style.width = win.restoreRect.width;
        win.element.style.height = win.restoreRect.height;
      }
      win.isMaximized = false;
    } else {
      // Save current position
      win.restoreRect = {
        left: win.element.style.left,
        top: win.element.style.top,
        width: win.element.style.width,
        height: win.element.style.height
      };
      win.element.classList.add('window-maximized');
      win.isMaximized = true;
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.element.classList.add('window-closing');
    setTimeout(() => {
      win.element.remove();
      this.windows.delete(id);
      this.removeTaskbarButton(id);
      if (this.activeWindowId === id) {
        this.activeWindowId = null;
      }
    }, 200);
  }

  addTaskbarButton(id, icon, title) {
    const btn = document.createElement('button');
    btn.className = 'taskbar-btn active';
    btn.dataset.winId = id;
    btn.innerHTML = `<span class="taskbar-btn-icon">${icon || Icons.monitor(14)}</span><span class="taskbar-btn-text">${title}</span>`;
    btn.addEventListener('click', () => {
      const win = this.windows.get(id);
      if (!win) return;
      if (win.isMinimized) {
        this.restoreWindow(id);
      } else if (this.activeWindowId === id) {
        this.minimizeWindow(id);
      } else {
        this.focusWindow(id);
      }
    });
    this.taskbarAppsEl.appendChild(btn);
  }

  removeTaskbarButton(id) {
    const btn = document.querySelector(`.taskbar-btn[data-win-id="${id}"]`);
    if (btn) btn.remove();
  }
}
