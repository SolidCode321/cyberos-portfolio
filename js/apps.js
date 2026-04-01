// ============================================================
// Apps — CyberOS Portfolio
// File Explorer, Browser, About, and Text Viewer apps
// ============================================================

const Apps = {

  // ========== TERMINAL ==========
  openTerminal(wm, fs) {
    wm.createWindow({
      title: 'Terminal',
      icon: Icons.terminal(14),
      width: 750,
      height: 480,
      className: 'terminal-window',
      appId: 'terminal',
      singleton: false,
      content: '<div class="terminal-container"></div>',
      onInit: (body, winId) => {
        const container = body.querySelector('.terminal-container');
        new Terminal(container, fs, wm);
      }
    });
  },

  // ========== FILE EXPLORER ==========
  openFileExplorer(wm, fs, path, title) {
    const content = `
      <div class="file-explorer">
        <div class="explorer-toolbar">
          <button class="explorer-btn explorer-back" title="Back">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          </button>
          <button class="explorer-btn explorer-up" title="Up">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 10L8 5L13 10" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          </button>
          <div class="explorer-breadcrumb">${path}</div>
        </div>
        <div class="explorer-content"></div>
      </div>
    `;

    wm.createWindow({
      title: title || 'File Explorer',
      icon: Icons.folder(14),
      width: 650,
      height: 450,
      className: 'explorer-window',
      content,
      onInit: (body) => {
        const explorer = body.querySelector('.file-explorer');
        const contentEl = explorer.querySelector('.explorer-content');
        const breadcrumb = explorer.querySelector('.explorer-breadcrumb');
        const backBtn = explorer.querySelector('.explorer-back');
        const upBtn = explorer.querySelector('.explorer-up');

        let currentPath = path;
        let pathHistory = [path];
        let historyIndex = 0;

        function renderDir(dirPath) {
          currentPath = dirPath;
          breadcrumb.textContent = dirPath.replace('/home/guest/Desktop/', '~/Desktop/');
          const entries = fs.ls(dirPath, false);
          
          if (!entries) {
            contentEl.innerHTML = '<div class="explorer-empty">Directory not found</div>';
            return;
          }

          if (entries.length === 0) {
            contentEl.innerHTML = '<div class="explorer-empty">Empty folder</div>';
            return;
          }

          contentEl.innerHTML = entries.map(entry => {
            const icon = entry.type === 'dir' ? 
              `<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M6 12C6 10.9 6.9 10 8 10H18L22 14H40C41.1 14 42 14.9 42 16V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V12Z" fill="#00ff88" opacity="0.3" stroke="#00ff88" stroke-width="1.5"/></svg>` :
              `<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M12 6H30L38 14V42H12C10.9 42 10 41.1 10 40V8C10 6.9 10.9 6 12 6Z" fill="#1a1f2e" stroke="#e0e0e0" stroke-width="1.5"/><path d="M30 6V14H38" stroke="#e0e0e0" stroke-width="1.5"/></svg>`;
            
            return `<div class="explorer-item" data-path="${dirPath}/${entry.name}" data-type="${entry.type}">
              <div class="explorer-item-icon">${icon}</div>
              <div class="explorer-item-name">${entry.name}</div>
            </div>`;
          }).join('');

          // Add click handlers
          contentEl.querySelectorAll('.explorer-item').forEach(item => {
            item.addEventListener('dblclick', () => {
              const itemPath = item.dataset.path;
              const itemType = item.dataset.type;
              if (itemType === 'dir') {
                pathHistory = pathHistory.slice(0, historyIndex + 1);
                pathHistory.push(itemPath);
                historyIndex = pathHistory.length - 1;
                renderDir(itemPath);
              } else {
                const result = fs.cat(itemPath);
                if (result.content) {
                  const name = fs.basename(itemPath);
                  Apps.openTextViewer(wm, name, result.content);
                }
              }
            });
          });
        }

        backBtn.addEventListener('click', () => {
          if (historyIndex > 0) {
            historyIndex--;
            renderDir(pathHistory[historyIndex]);
          }
        });

        upBtn.addEventListener('click', () => {
          const parent = fs.parentPath(currentPath);
          if (parent && parent !== currentPath) {
            pathHistory = pathHistory.slice(0, historyIndex + 1);
            pathHistory.push(parent);
            historyIndex = pathHistory.length - 1;
            renderDir(parent);
          }
        });

        renderDir(path);
      }
    });
  },

  // ========== TEXT VIEWER ==========
  openTextViewer(wm, filename, content) {
    const escapedContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    wm.createWindow({
      title: filename,
      icon: Icons.file(14),
      width: 600,
      height: 450,
      className: 'textviewer-window',
      content: `<div class="text-viewer"><pre>${escapedContent}</pre></div>`
    });
  },

  // ========== BROWSER ==========
  openBrowser(wm) {
    const linkedinUrl = 'https://www.linkedin.com/in/alexander-daniel-526938278/';
    const content = `
      <div class="browser-app">
        <div class="browser-toolbar">
          <div class="browser-nav-buttons">
            <button class="browser-nav-btn" title="Back">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
            <button class="browser-nav-btn" title="Forward">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
            <button class="browser-nav-btn" title="Refresh" onclick="document.getElementById('browser-iframe')?.contentWindow?.location.reload()">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8a5 5 0 0 1 9-3M13 8a5 5 0 0 1-9 3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 2v3h-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
          </div>
          <div class="browser-url-bar">
            <svg class="browser-lock-icon" viewBox="0 0 16 16" width="12" height="12"><rect x="3" y="7" width="10" height="7" rx="1" fill="none" stroke="#00ff88" stroke-width="1.2"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="#00ff88" stroke-width="1.2"/></svg>
            <span class="browser-url-text">${linkedinUrl}</span>
          </div>
        </div>
        <div class="browser-content">
          <div class="browser-fallback">
            <div class="browser-fallback-icon">
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="#00b4d8" stroke-width="2"/>
                <ellipse cx="32" cy="32" rx="12" ry="28" stroke="#00b4d8" stroke-width="2"/>
                <line x1="4" y1="32" x2="60" y2="32" stroke="#00b4d8" stroke-width="2"/>
                <line x1="32" y1="4" x2="32" y2="60" stroke="#00b4d8" stroke-width="2"/>
              </svg>
            </div>
            <h3>LinkedIn Profile</h3>
            <p>LinkedIn doesn't allow embedding in iframes for security reasons.</p>
            <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="browser-link-btn">
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M6 3H3v10h10v-3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 8L14 2M14 2H10M14 2v4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
              Open in New Tab
            </a>
            <div class="browser-linkedin-preview">
              <div class="linkedin-card">
                <div class="linkedin-banner"></div>
                <div class="linkedin-avatar">AD</div>
                <h4>Alexander Daniel</h4>
                <p class="linkedin-title">Cybersecurity Professional | B.Tech CSE @ BIT Mesra</p>
                <p class="linkedin-handle">DeManzDVR</p>
                <div class="linkedin-stats">
                  <span>VAPT</span>
                  <span>•</span>
                  <span>SOC Operations</span>
                  <span>•</span>
                  <span>Security Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: 'CyberBrowser — LinkedIn',
      icon: Icons.globe(14),
      width: 800,
      height: 550,
      className: 'browser-window',
      appId: 'browser',
      singleton: true,
      content
    });
  },

  // ========== ABOUT ME ==========
  openAbout(wm) {
    const content = `
      <div class="about-app">
        <div class="about-header">
          <div class="about-avatar-ring">
            <div class="about-avatar">AD</div>
          </div>
          <h2 class="about-name">Alexander Daniel</h2>
          <p class="about-handle">@DeManzDVR</p>
          <p class="about-role">Cybersecurity Professional</p>
          <p class="about-edu">B.Tech CSE — BIT Mesra, Ranchi</p>
          <div class="about-status">
            <span class="status-dot"></span>
            Open to opportunities
          </div>
        </div>

        <div class="about-bio">
          <p>Cybersecurity professional specializing in VAPT, SOC operations, and security research. Experienced as a VAPT Analyst (Alessa Group, Kuwait), Research Assistant building fuzzing frameworks for ClamAV at BIT Mesra, and SOC Intern at Virtus Innovative Solutions. I break systems to build them stronger.</p>
        </div>

        <div class="about-section">
          <h3><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:4px;"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" stroke-linejoin="round"/></svg>Certifications</h3>
          <div class="about-tags">
            <span class="tag tag-red">CEHv13</span>
            <span class="tag tag-blue">CSAv2</span>
            <span class="tag tag-green">PCEP (Python)</span>
            <span class="tag tag-yellow">Meta Backend Dev</span>
            <span class="tag tag-purple">Meta Python</span>
            <span class="tag tag-cyan">IELTS 7.5</span>
          </div>
        </div>

        <div class="about-section">
          <h3><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:4px;"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>Specializations</h3>
          <div class="about-tags">
            <span class="tag tag-red">VAPT</span>
            <span class="tag tag-blue">SOC Operations</span>
            <span class="tag tag-green">Malware Analysis</span>
            <span class="tag tag-yellow">MITRE ATT&CK</span>
            <span class="tag tag-purple">Fuzzing</span>
            <span class="tag tag-cyan">Incident Response</span>
          </div>
        </div>

        <div class="about-section">
          <h3><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:4px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Connect</h3>
          <div class="about-links">
            <a href="https://www.linkedin.com/in/alexander-daniel-526938278/" target="_blank" rel="noopener" class="about-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/DeManzDVR" target="_blank" rel="noopener" class="about-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://writeups.alexsecurity.online/" target="_blank" rel="noopener" class="about-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              CTF Writeups
            </a>
            <a href="mailto:alex9582946556@gmail.com" class="about-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              Email
            </a>
          </div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: 'About — Alexander Daniel',
      icon: Icons.user(14),
      width: 500,
      height: 650,
      className: 'about-window',
      appId: 'about',
      singleton: true,
      content
    });
  },

  // ========== WRITEUPS ==========
  openWriteups(wm) {
    const writeupsUrl = 'https://writeups.alexsecurity.online/';
    const content = `
      <div class="browser-app">
        <div class="browser-toolbar">
          <div class="browser-nav-buttons">
            <button class="browser-nav-btn" title="Back">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
            <button class="browser-nav-btn" title="Forward">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
            <button class="browser-nav-btn" title="Refresh">
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8a5 5 0 0 1 9-3M13 8a5 5 0 0 1-9 3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 2v3h-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </button>
          </div>
          <div class="browser-url-bar">
            <svg class="browser-lock-icon" viewBox="0 0 16 16" width="12" height="12"><rect x="3" y="7" width="10" height="7" rx="1" fill="none" stroke="#00ff88" stroke-width="1.2"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="#00ff88" stroke-width="1.2"/></svg>
            <span class="browser-url-text">${writeupsUrl}</span>
          </div>
        </div>
        <div class="browser-content">
          <iframe src="${writeupsUrl}" style="width:100%;height:100%;border:none;background:#111827;"></iframe>
        </div>
      </div>
    `;

    wm.createWindow({
      title: 'CyberBrowser — Writeups',
      icon: Icons.writeup(14),
      width: 850,
      height: 600,
      className: 'browser-window',
      appId: 'writeups',
      singleton: true,
      content
    });
  }
};
