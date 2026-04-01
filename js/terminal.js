// ============================================================
// Terminal Emulator — CyberOS Portfolio
// Interactive CLI with virtual filesystem navigation
// ============================================================

class Terminal {
  constructor(container, fs, windowManager) {
    this.container = container;
    this.fs = fs;
    this.wm = windowManager;
    this.cwd = '/home/guest';
    this.history = ['cd .secret && cat .flag.txt'];  // Pre-seeded hint
    this.historyIndex = -1;
    this.user = 'guest';
    this.hostname = 'cyberos';

    this.outputEl = null;
    this.inputEl = null;
    this.promptEl = null;

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="terminal-scanline"></div>
      <div class="terminal-output" id="term-output"></div>
      <div class="terminal-input-line">
        <span class="terminal-prompt"></span>
        <input type="text" class="terminal-input" spellcheck="false" autocomplete="off" autocapitalize="off" />
      </div>
    `;

    this.outputEl = this.container.querySelector('.terminal-output');
    this.inputEl = this.container.querySelector('.terminal-input');
    this.promptEl = this.container.querySelector('.terminal-prompt');

    this.updatePrompt();
    this.printWelcome();

    // Focus input on click anywhere in terminal
    this.container.addEventListener('click', () => {
      this.inputEl.focus();
    });

    // Handle input
    this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Auto-focus
    setTimeout(() => this.inputEl.focus(), 100);
  }

  updatePrompt() {
    const shortCwd = this.cwd.replace('/home/guest', '~') || '~';
    this.promptEl.innerHTML = `<span class="prompt-user">${this.user}@${this.hostname}</span><span class="prompt-sep">:</span><span class="prompt-path">${shortCwd}</span><span class="prompt-char">$ </span>`;
  }

  printWelcome() {
    this.printOutput(`
<span class="term-green">  ██████╗██╗   ██╗██████╗ ███████╗██████╗  ██████╗ ███████╗</span>
<span class="term-green"> ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝</span>
<span class="term-green"> ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██║   ██║███████╗</span>
<span class="term-green"> ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║╚════██║</span>
<span class="term-green"> ╚██████╗   ██║   ██████╔╝███████╗██║  ██║╚██████╔╝███████║</span>
<span class="term-green">  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝</span>

<span class="term-cyan">Welcome to CyberOS Terminal v2.4.1</span>
<span class="term-dim">Type '<span class="term-yellow">help</span>' for available commands.</span>
`, true);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const input = this.inputEl.value.trim();
      this.printCommand(input);
      if (input) {
        this.history.push(input);
        this.historyIndex = this.history.length;
        this.executeCommand(input);
      }
      this.inputEl.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputEl.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputEl.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.inputEl.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.tabComplete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.cmdClear();
    }
  }

  tabComplete() {
    const input = this.inputEl.value;
    const parts = input.split(/\s+/);
    const last = parts[parts.length - 1] || '';

    // Resolve the directory to search in
    let searchDir = this.cwd;
    let prefix = last;

    if (last.includes('/')) {
      const lastSlash = last.lastIndexOf('/');
      const dirPart = last.substring(0, lastSlash + 1);
      prefix = last.substring(lastSlash + 1);
      searchDir = this.fs.resolvePath(this.cwd, dirPart);
    }

    const entries = this.fs.ls(searchDir, true);
    if (!entries) return;

    const matches = entries.filter(e => e.name.startsWith(prefix));
    if (matches.length === 1) {
      const completion = matches[0].name;
      const suffix = matches[0].type === 'dir' ? '/' : '';
      if (last.includes('/')) {
        const lastSlash = last.lastIndexOf('/');
        parts[parts.length - 1] = last.substring(0, lastSlash + 1) + completion + suffix;
      } else {
        parts[parts.length - 1] = completion + suffix;
      }
      this.inputEl.value = parts.join(' ');
    } else if (matches.length > 1) {
      this.printOutput(matches.map(m => m.name).join('  '));
    }
  }

  printCommand(text) {
    const shortCwd = this.cwd.replace('/home/guest', '~') || '~';
    this.printOutput(`<span class="prompt-user">${this.user}@${this.hostname}</span><span class="prompt-sep">:</span><span class="prompt-path">${shortCwd}</span><span class="prompt-char">$ </span>${this.escapeHtml(text)}`, true);
  }

  printOutput(text, isHtml = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isHtml) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }
    this.outputEl.appendChild(line);
    this.scrollToBottom();
  }

  printError(text) {
    this.printOutput(`<span class="term-red">${this.escapeHtml(text)}</span>`, true);
  }

  scrollToBottom() {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  executeCommand(input) {
    // Handle chained commands with &&
    if (input.includes('&&')) {
      const commands = input.split('&&').map(c => c.trim()).filter(Boolean);
      commands.forEach(cmd => this.executeSingleCommand(cmd));
      return;
    }
    this.executeSingleCommand(input);
  }

  executeSingleCommand(input) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help': this.cmdHelp(); break;
      case 'whoami': this.cmdWhoami(); break;
      case 'ls': this.cmdLs(args); break;
      case 'cd': this.cmdCd(args); break;
      case 'cat': this.cmdCat(args); break;
      case 'pwd': this.cmdPwd(); break;
      case 'clear': this.cmdClear(); break;
      case 'history': this.cmdHistory(); break;
      case 'echo': this.cmdEcho(args); break;
      case 'uname': this.cmdUname(args); break;
      case 'date': this.cmdDate(); break;
      case 'ping': this.cmdPing(args); break;
      case 'nmap': this.cmdNmap(args); break;
      case 'sudo': this.cmdSudo(args); break;
      case 'id': this.cmdId(); break;
      case 'hostname': this.cmdHostname(); break;
      case 'uptime': this.cmdUptime(); break;
      case 'neofetch': this.cmdNeofetch(); break;
      case 'exit': this.cmdExit(); break;
      case 'rm':
        this.printError('rm: Permission denied. Nice try though.');
        break;
      case 'wget': case 'curl':
        this.printError(`${cmd}: Network access restricted in sandbox mode`);
        break;
      case 'vim': case 'nano': case 'vi':
        this.printOutput(`<span class="term-yellow">${cmd}: Editor not available. This is a read-only filesystem.</span>`, true);
        break;
      case 'man':
        this.printOutput(`<span class="term-cyan">No manual entry for '${args[0] || cmd}'. Try 'help' instead.</span>`, true);
        break;
      case '':
        break;
      default:
        this.printError(`${cmd}: command not found. Type 'help' for available commands.`);
    }
  }

  cmdHelp() {
    this.printOutput(`
<span class="term-cyan">╔══════════════════════════════════════════════╗
║           AVAILABLE COMMANDS                 ║
╚══════════════════════════════════════════════╝</span>

  <span class="term-green">whoami</span>      — Display current user info
  <span class="term-green">ls</span> <span class="term-dim">[-la]</span>   — List directory contents
  <span class="term-green">cd</span> <span class="term-dim">[dir]</span>   — Change directory
  <span class="term-green">cat</span> <span class="term-dim">[file]</span>  — Display file contents
  <span class="term-green">pwd</span>         — Print working directory
  <span class="term-green">clear</span>       — Clear terminal screen
  <span class="term-green">history</span>     — Show command history
  <span class="term-green">echo</span> <span class="term-dim">[text]</span> — Print text to terminal
  <span class="term-green">uname</span> <span class="term-dim">[-a]</span>  — System information
  <span class="term-green">date</span>        — Display date and time
  <span class="term-green">id</span>          — Display user identity
  <span class="term-green">hostname</span>    — Display hostname
  <span class="term-green">uptime</span>      — System uptime
  <span class="term-green">neofetch</span>    — System info with ASCII art
  <span class="term-green">ping</span> <span class="term-dim">[host]</span> — Ping a host
  <span class="term-green">nmap</span> <span class="term-dim">[host]</span> — Port scan (simulated)
  <span class="term-green">exit</span>        — Close terminal

<span class="term-dim">  Tip: Use Tab for autocompletion, ↑↓ for history</span>
`, true);
  }

  cmdWhoami() {
    this.printOutput(`
<span class="term-cyan">╔══════════════════════════════════════╗
║         IDENTITY INFORMATION         ║
╚══════════════════════════════════════╝</span>

  <span class="term-green">Name:</span>     Alexander Daniel
  <span class="term-green">Handle:</span>   DeManzDVR
  <span class="term-green">Role:</span>     Cybersecurity Professional
  <span class="term-green">Edu:</span>      B.Tech CSE — BIT Mesra, Ranchi
  <span class="term-green">Certs:</span>    CEHv13 | CSAv2 | PCEP
  <span class="term-green">Exp:</span>      VAPT Analyst | Research Asst | SOC Intern
  <span class="term-green">Writeups:</span> <span class="term-cyan">writeups.alexsecurity.online</span>
  <span class="term-green">Status:</span>   <span class="term-green">● Open to opportunities</span>

  <span class="term-dim">"Breaking systems to build them stronger."</span>
`, true);
  }

  cmdLs(args) {
    const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al') || args.includes('-l');
    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    
    // Get the target path (non-flag argument)
    const targetArg = args.find(a => !a.startsWith('-'));
    const targetPath = targetArg ? this.fs.resolvePath(this.cwd, targetArg) : this.cwd;

    const entries = this.fs.ls(targetPath, showHidden);
    if (!entries) {
      this.printError(`ls: cannot access '${targetArg || this.cwd}': No such file or directory`);
      return;
    }

    if (entries.length === 0) {
      return;
    }

    if (longFormat) {
      let output = `<span class="term-dim">total ${entries.length}</span>\n`;
      entries.forEach(e => {
        const perms = e.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
        const color = e.type === 'dir' ? 'term-blue' : (e.hidden ? 'term-dim' : 'term-white');
        const size = e.type === 'dir' ? '4096' : ' 512';
        output += `${perms}  1 guest guest  ${size}  Mar 31 14:22  <span class="${color}">${e.name}${e.type === 'dir' ? '/' : ''}</span>\n`;
      });
      this.printOutput(output.trim(), true);
    } else {
      const output = entries.map(e => {
        const color = e.type === 'dir' ? 'term-blue' : (e.hidden ? 'term-dim' : 'term-white');
        return `<span class="${color}">${e.name}${e.type === 'dir' ? '/' : ''}</span>`;
      }).join('  ');
      this.printOutput(output, true);
    }
  }

  cmdCd(args) {
    if (args.length === 0 || args[0] === '~') {
      this.cwd = '/home/guest';
      this.updatePrompt();
      return;
    }

    const target = args[0];
    const newPath = this.fs.resolvePath(this.cwd, target);

    if (!this.fs.exists(newPath)) {
      this.printError(`cd: no such file or directory: ${target}`);
      return;
    }

    if (!this.fs.isDir(newPath)) {
      this.printError(`cd: not a directory: ${target}`);
      return;
    }

    this.cwd = newPath;
    this.updatePrompt();
  }

  cmdCat(args) {
    if (args.length === 0) {
      this.printError('cat: missing file operand');
      return;
    }

    const filePath = this.fs.resolvePath(this.cwd, args[0]);
    const result = this.fs.cat(filePath);

    if (result.error) {
      this.printError(result.error);
    } else {
      this.printOutput(result.content);
    }
  }

  cmdPwd() {
    this.printOutput(this.cwd);
  }

  cmdClear() {
    this.outputEl.innerHTML = '';
  }

  cmdHistory() {
    const output = this.history.map((cmd, i) => {
      return `  <span class="term-dim">${String(i + 1).padStart(4)}</span>  ${this.escapeHtml(cmd)}`;
    }).join('\n');
    this.printOutput(output, true);
  }

  cmdEcho(args) {
    this.printOutput(args.join(' '));
  }

  cmdUname(args) {
    if (args.includes('-a')) {
      this.printOutput('CyberOS 5.15.0-sec #1 SMP x86_64 GNU/Linux');
    } else {
      this.printOutput('CyberOS');
    }
  }

  cmdDate() {
    this.printOutput(new Date().toString());
  }

  cmdId() {
    this.printOutput('uid=1000(guest) gid=1000(guest) groups=1000(guest),27(sudo),1001(security)');
  }

  cmdHostname() {
    this.printOutput('cyberos.local');
  }

  cmdUptime() {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    this.printOutput(` ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}  up 1337 days,  4:20,  1 user,  load average: 0.42, 0.69, 0.13`);
  }

  cmdNeofetch() {
    this.printOutput(`
<span class="term-green">        ████████████████        </span>  <span class="term-green">guest</span>@<span class="term-green">cyberos</span>
<span class="term-green">     ████</span><span class="term-dim">░░░░░░░░░░░░</span><span class="term-green">████     </span>  ──────────────────
<span class="term-green">   ██</span><span class="term-dim">░░░░░░░░░░░░░░░░░░</span><span class="term-green">██   </span>  <span class="term-green">OS:</span>     CyberOS 5.15 x86_64
<span class="term-green">  ██</span><span class="term-dim">░░░░░░░░░░░░░░░░░░░░</span><span class="term-green">██  </span>  <span class="term-green">Host:</span>   Portfolio v2.4
<span class="term-green"> ██</span><span class="term-dim">░░░░</span><span class="term-green">████</span><span class="term-dim">░░░░</span><span class="term-green">████</span><span class="term-dim">░░░░</span><span class="term-green">██ </span>  <span class="term-green">Kernel:</span> 5.15.0-security
<span class="term-green"> ██</span><span class="term-dim">░░░░</span><span class="term-green">████</span><span class="term-dim">░░░░</span><span class="term-green">████</span><span class="term-dim">░░░░</span><span class="term-green">██ </span>  <span class="term-green">Shell:</span>  cybershell 2.4
<span class="term-green"> ██</span><span class="term-dim">░░░░░░░░░░░░░░░░░░░░</span><span class="term-green">██ </span>  <span class="term-green">CPU:</span>    Neural Engine v4
<span class="term-green"> ██</span><span class="term-dim">░░░░</span><span class="term-green">██████████</span><span class="term-dim">░░░░</span><span class="term-green">██ </span>  <span class="term-green">Memory:</span> 1337MB / ∞MB
<span class="term-green">  ██</span><span class="term-dim">░░░░</span><span class="term-green">██████</span><span class="term-dim">░░░░░░</span><span class="term-green">██  </span>  <span class="term-green">Uptime:</span> 1337 days
<span class="term-green">   ██</span><span class="term-dim">░░░░░░░░░░░░░░░░</span><span class="term-green">██   </span>  <span class="term-green">Theme:</span>  Hacker Green [Dark]
<span class="term-green">     ████</span><span class="term-dim">░░░░░░░░░░</span><span class="term-green">████     </span>
<span class="term-green">        ████████████████        </span>  <span class="term-red">███</span><span class="term-green">███</span><span class="term-blue">███</span><span class="term-yellow">███</span><span class="term-cyan">███</span><span class="term-magenta">███</span>
`, true);
  }

  cmdPing(args) {
    const host = args[0] || 'localhost';
    this.printOutput(`PING ${host} (127.0.0.1) 56(84) bytes of data.`);
    
    let count = 0;
    const interval = setInterval(() => {
      const time = (Math.random() * 10 + 0.5).toFixed(3);
      this.printOutput(`64 bytes from ${host} (127.0.0.1): icmp_seq=${count + 1} ttl=64 time=${time} ms`);
      count++;
      if (count >= 4) {
        clearInterval(interval);
        this.printOutput(`\n--- ${host} ping statistics ---`);
        this.printOutput(`4 packets transmitted, 4 received, 0% packet loss`);
      }
    }, 500);
  }

  cmdNmap(args) {
    const host = args[0] || 'localhost';
    this.printOutput(`<span class="term-cyan">Starting Nmap 7.94 ( https://nmap.org )</span>`, true);
    
    setTimeout(() => {
      this.printOutput(`<span class="term-dim">Nmap scan report for ${host}</span>`, true);
      this.printOutput(`Host is up (0.00042s latency).`);
      this.printOutput(`Not shown: 995 closed tcp ports\n`);
      this.printOutput(`PORT      STATE    SERVICE`);
      this.printOutput(`22/tcp    open     ssh`);
      this.printOutput(`80/tcp    open     http`);
      this.printOutput(`443/tcp   open     https`);
      this.printOutput(`<span class="term-yellow">1337/tcp  open     secret-stash</span>`, true);
      this.printOutput(`8080/tcp  open     http-proxy\n`);
      this.printOutput(`<span class="term-dim">Nmap done: 1 IP address (1 host up) scanned in 2.35 seconds</span>`, true);
      this.printOutput(`<span class="term-dim">Hint: Something is running on port 1337... try looking for hidden files.</span>`, true);
    }, 1500);
  }

  cmdSudo(args) {
    const messages = [
      "Nice try, but you don't have root access.",
      "Access denied. This incident will be reported.",
      "[!] ALERT: Unauthorized privilege escalation attempt detected!",
      "Did you really think that would work?",
      "sudo: I appreciate the effort, but no.",
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    this.printOutput(`<span class="term-red">[sudo] password for guest: ********\n${msg}</span>`, true);
  }

  cmdExit() {
    // Find and close our terminal window
    if (this.wm && this.wm.activeWindowId) {
      this.wm.closeWindow(this.wm.activeWindowId);
    }
  }
}
