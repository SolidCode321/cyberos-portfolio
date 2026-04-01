// ============================================================
// Icons — CyberOS Portfolio
// Centralized SVG icon library — no emojis anywhere
// ============================================================

const Icons = {
  // Size variants for inline usage
  _svg(content, size = 16) {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  },

  // === System / UI Icons ===
  shield(size = 16) {
    return this._svg(`<path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`, size);
  },

  lock(size = 16) {
    return this._svg(`<rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  terminal(size = 16) {
    return this._svg(`<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7 9l3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="13" y1="15" x2="17" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`, size);
  },

  folder(size = 16) {
    return this._svg(`<path d="M3 7c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  file(size = 16) {
    return this._svg(`<path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="8" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="1" opacity="0.5"/>`, size);
  },

  globe(size = 16) {
    return this._svg(`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="1.8"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  user(size = 16) {
    return this._svg(`<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  writeup(size = 16) {
    return this._svg(`<path d="M12 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  refresh(size = 16) {
    return this._svg(`<path d="M3 12a9 9 0 0 1 15-6.7V2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M21 12a9 9 0 0 1-15 6.7V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18 2v4h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 22v-4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`, size);
  },

  network(size = 16) {
    return this._svg(`<path d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>`, size);
  },

  clock(size = 16) {
    return this._svg(`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`, size);
  },

  briefcase(size = 16) {
    return this._svg(`<rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="11" x2="12" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`, size);
  },

  flag(size = 16) {
    return this._svg(`<path d="M4 22V2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 2c3 0 5 2 9 2s7-2 7-2v10c-3 0-5 2-9 2s-7-2-7-2" stroke="currentColor" stroke-width="1.8" fill="currentColor" opacity="0.15"/>`, size);
  },

  award(size = 16) {
    return this._svg(`<circle cx="12" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`, size);
  },

  externalLink(size = 16) {
    return this._svg(`<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="1.8"/><path d="M15 3h6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  monitor(size = 16) {
    return this._svg(`<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="1.8"/>`, size);
  },

  wifi(size = 16) {
    return this._svg(`<path d="M2 8.5c3.6-3.3 8.4-5 13.5-4.5 2.3.2 4.5.9 6.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 13c2.5-2.3 5.8-3.4 9.2-3 1.6.2 3 .7 4.3 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 17.5c1.7-1.3 3.8-1.7 5.8-1.2.9.2 1.7.6 2.4 1.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="21" r="1" fill="currentColor"/>`, size);
  },

  // Kali-style dragon/logo for start button
  kaliLogo(size = 20) {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="13" y1="16" x2="17" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="13" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    </svg>`;
  }
};
