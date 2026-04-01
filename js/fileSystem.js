// ============================================================
// Virtual Filesystem — CyberOS Portfolio
// Alexander Daniel (DeManzDVR) — Real Resume Data
// ============================================================

const FS_TREE = {
  _type: 'dir',
  home: {
    _type: 'dir',
    guest: {
      _type: 'dir',
      Desktop: {
        _type: 'dir',
        Skills: {
          _type: 'dir',
          'security_networking.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║    SECURITY & NETWORKING SKILLS      ║
╚══════════════════════════════════════╝

Offensive Security:
  • Vulnerability Assessment & Penetration Testing (VAPT)
  • Web Application Security Testing
  • OWASP Top 10 Exploitation
  • Penetration Testing Methodologies

Defensive Security:
  • MITRE ATT&CK Framework Mapping
  • Malware Analysis (Static & Dynamic)
  • Incident Response & Triage
  • SOC Operations & Monitoring

SIEM & EDR:
  • ManageEngine Log360 (SIEM)
  • SentinelOne (EDR)
  • Log Correlation & Threat Detection
  • Alert Classification & Reporting

Networking:
  • LAN Setup & Configuration
  • Router & Switch Configuration
  • Network Security Hardening
  • Firewall Configuration`
          },
          'programming.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║      PROGRAMMING & SCRIPTING         ║
╚══════════════════════════════════════╝

Primary Languages:
  • Python — Security automation, fuzzing
      frameworks, scripting, Django
  • C/C++ — Low-level analysis, DSA
  • Arduino C++ — Hardware prototyping
  • Bash — Shell scripting, automation
  • SQL — Database queries & security

Paradigms:
  • Object-Oriented Programming
  • Scripting & Automation
  • Data Structures & Algorithms

Web Technologies:
  • HTML / CSS
  • JavaScript
  • Bootstrap
  • GraphJS`
          },
          'frameworks_tools.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║       FRAMEWORKS & TOOLS             ║
╚══════════════════════════════════════╝

Development:
  • Django — Web application framework
  • Docker — Containerization & deployment
  • Git — Version control & collaboration
  • Bootstrap — Frontend framework
  • GraphJS — Data visualization

Security Tools:
  • Kali Linux — Penetration testing distro
  • ClamAV — Antivirus testing & fuzzing
  • FuzzingBook — Fuzzing methodology
  • Burp Suite — Web app testing
  • SIEM/EDR — Log360, SentinelOne

Computer Vision:
  • OpenCV — Real-time image processing

Media & Infrastructure:
  • OpenMediaVault — NAS server
  • Jellyfin — Media streaming`
          },
          'systems_platforms.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║       SYSTEMS & PLATFORMS            ║
╚══════════════════════════════════════╝

Operating Systems:
  • Linux CLI — Daily driver, server admin
  • Kali Linux — Security testing
  • Windows — Enterprise environments
  • Raspberry Pi — IoT & prototyping

Virtualization:
  • VMware — Lab environments
  • Docker — Containerized workflows
  • Dockerized security environments

Hardware:
  • Arduino — Embedded systems & prototyping
  • Raspberry Pi — IoT projects

Other Skills:
  • 3D Modeling (Fusion360)
  • 3D Printing & Prototyping
  • AICTE IDEA Lab certified
  • Automated Testing pipelines`
          }
        },
        Projects: {
          _type: 'dir',
          'clamav_fuzzer': {
            _type: 'dir',
            'README.md': {
              _type: 'file',
                _content: `╔══════════════════════════════════════╗
║   VERSATILE FUZZING FRAMEWORK        ║
║            FOR CLAMAV                ║
╚══════════════════════════════════════╝

Role:     Research Assistant @ BIT Mesra
Period:   May 2025 – Dec 2025

Description:
  Engineered a modular Python-based fuzzing
  framework for ClamAV, integrating mutation-
  and grammar-based input generation to
  identify false positives and negatives in
  antivirus detection.

Tech Stack:
  Python, FuzzingBook, Docker, ClamAV Daemon

Key Contributions:
  • Developed mutation-based & grammar-based
    fuzzing strategies for antivirus testing
  • Performed vulnerability assessments and
    static/dynamic malware analysis
  • Automated test execution using Docker
    and ClamAV Daemon
  • Authored detailed research reports and
    methodology documentation
  • Optimized fuzzing workflows to improve
    test coverage and detection reliability
  • Evaluated in controlled Kali Linux
    environments

Impact:
  Enhanced ClamAV detection evaluation with
  automated reporting and analysis of
  detection gaps.

Status: [COMPLETE] Research Complete`
            }
          },
          'railrescue': {
            _type: 'dir',
            'README.md': {
              _type: 'file',
                _content: `╔══════════════════════════════════════╗
║          RAILRESCUE                   ║
║    Railway Safety System             ║
╚══════════════════════════════════════╝

Award:    [*] 2nd Place -- Hatch From Scratch 2023

Description:
  Designed a hybrid hardware-software system
  to prevent railway derailments by detecting
  humans and obstacles on tracks in real-time
  using computer vision.

Tech Stack:
  Python, Arduino, OpenCV

Key Features:
  • Real-time human/obstacle detection using
    OpenCV-based computer vision
  • Arduino-controlled hardware integration
    for track sensor systems
  • Automated alert & braking mechanism
  • Low-latency video processing pipeline
  • Field-tested prototype with live demo

Recognition:
  [*] Won 2nd Place at Hatch From Scratch
     Hackathon 2023

Status: [COMPLETE] Prototype Complete`
            }
          },
          'soho_network': {
            _type: 'dir',
            'README.md': {
              _type: 'file',
                _content: `╔══════════════════════════════════════╗
║      SOHO NETWORK SETUP              ║
║    Home Lab Infrastructure           ║
╚══════════════════════════════════════╝

Description:
  Configured a secure Small Office/Home
  Office (SOHO) network with enterprise-grade
  services running in Docker containers.

Tech Stack:
  Docker, OpenMediaVault, Linux CLI, Jellyfin

Key Features:
  • Secure LAN network with managed routers
    and switches
  • Docker-containerized service deployment
  • OpenMediaVault NAS for centralized
    file storage
  • Jellyfin media streaming server
  • Network segmentation & access controls
  • Linux CLI-based administration

Skills Demonstrated:
  • Network architecture & design
  • Docker container orchestration
  • Linux server administration
  • Service deployment & optimization

Status: [ACTIVE] Active & Running`
            }
          }
        },
        Experience: {
          _type: 'dir',
          'vapt_analyst.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║         VAPT ANALYST                 ║
║      Alessa Group — Kuwait           ║
╚══════════════════════════════════════╝

Period:   January 2026
Type:     Professional Engagement

Responsibilities:
  • Conducted Vulnerability Assessment and
    Penetration Testing (VAPT) for web
    applications
  • Delivered comprehensive VAPT reports
    detailing all vulnerabilities discovered
  • Provided relevant remediation techniques
    and security recommendations
  • Assessed application security posture
    against industry standards

Skills Applied:
  VAPT, Web Application Security,
  Report Writing, Remediation Planning`
          },
          'research_assistant.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║       RESEARCH ASSISTANT             ║
║    BIT Mesra — Ranchi, India         ║
╚══════════════════════════════════════╝

Period:   May 2025 – December 2025
Type:     Academic Research

Responsibilities:
  • Developed a Python-based fuzzing framework
    for ClamAV integrating mutation- and
    grammar-based input generation
  • Identified false positives/negatives in
    antivirus detection systems
  • Performed vulnerability assessments and
    static/dynamic malware analysis
  • Automated test execution using Docker
    and ClamAV Daemon
  • Authored detailed research reports and
    methodology documentation
  • Optimized fuzzing workflows to improve
    test coverage and AV detection reliability
  • Conducted all testing in controlled
    Kali Linux environments

Skills Applied:
  Python, Fuzzing, Docker, ClamAV,
  Malware Analysis, Research Methodology`
          },
          'soc_intern.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║          SOC INTERN                  ║
║  Virtus Innovative Solutions —       ║
║  Thiruvananthapuram, India           ║
╚══════════════════════════════════════╝

Period:   May 2025 – July 2025
Type:     Internship

Responsibilities:
  • Trained on SOC operations, threat
    intelligence, and incident response
    workflows
  • Utilized SIEM (Log360) and EDR
    (SentinelOne) to monitor enterprise
    networks
  • Conducted malware case analysis and
    MITRE ATT&CK mapping
  • Analyzed real-world malware behavior:
    WannaCry, Emotet, TrickBot
  • Prepared structured incident reports
    and classified threats
  • Documented SOC processes to support
    enterprise security operations

Skills Applied:
  SOC, SIEM (Log360), EDR (SentinelOne),
  MITRE ATT&CK, Malware Analysis,
  Incident Response, Threat Intelligence`
          }
        },
        Certifications: {
          _type: 'dir',
          'certifications.txt': {
            _type: 'file',
            _content: `╔══════════════════════════════════════╗
║     CERTIFICATIONS & ACHIEVEMENTS    ║
╚══════════════════════════════════════╝

Professional Certifications:
  [*] CEHv13 -- Certified Ethical Hacker v13
  [*] CSAv2 -- Cybersecurity Analyst v2
  [*] PCEP -- Python Certified Entry-Level
  [*] Meta Programming in Python
  [*] Meta Backend Development
  [*] Meta Version Control
  [*] IELTS -- Band 7.5

Hackathons & CTFs:
  [*] 2nd Place -- Hatch From Scratch 2023
     (RailRescue project)
  [*] Smart India Hackathon 2024
     (Hospital ERP system)
  [>] Google CTF 2024 -- Participant
  [>] Cicada CTF 2024 -- Participant
  [*] Mega Project Hackathon 2023
     (NutriNet project)

Leadership & Activities:
  [+] IEEE Tech Club -- Active member
     Organized workshops, coding contests
     (DSA/C++), and technical events
  [+] AICTE IDEA Lab -- Prototyping, 3D
     modeling and printing certified
  [+] TBMUN Delegate -- Bishop's School Pune

CTF Writeups:
  --> writeups.alexsecurity.online
     Published HackTheBox solutions and
     CTF walkthroughs`
          }
        },
        'README.txt': {
          _type: 'file',
          _content: `╔══════════════════════════════════════╗
║           WELCOME TO CYBEROS         ║
║     Alexander Daniel's Portfolio     ║
╚══════════════════════════════════════╝

Hey there!

I'm Alexander Daniel, also known as DeManzDVR.
B.Tech CSE @ Birla Institute of Technology, Mesra.
Cybersecurity professional focused on VAPT,
SOC operations, and security research.

This desktop environment is fully functional:
  * Open folders to explore my skills & projects
  * Check out my work experience
  * Launch the terminal for a CLI experience
  * Visit the browser for my LinkedIn
  * Read my CTF writeups
  * Try the About Me app for a quick overview

Pro tip: The terminal supports real commands.
Type 'help' to see what's available.

Another tip: Not everything is visible at
first glance...

Happy exploring!`
        }
      },
      '.secret': {
        _type: 'dir',
        _hidden: true,
        '.flag.txt': {
          _type: 'file',
          _hidden: true,
          _content: `╔══════════════════════════════════════╗
║          FLAG CAPTURED!              ║
╚══════════════════════════════════════╝

  FLAG{y0u_f0und_th3_s3cr3t_1337_h4ck3r}

  Congratulations! You found the hidden flag.
  You clearly know your way around a terminal.

  Skills demonstrated:
    [+] Hidden file enumeration
    [+] Directory traversal
    [+] Attention to detail

  Powered by: DeManzDVR
  Read my writeups: writeups.alexsecurity.online

  Share this on Twitter/X:
    "I captured the flag on @DeManzDVR's
     portfolio! #CTF #CyberSecurity"

  Want to find more? There might be other
  secrets hidden in this system...`
        },
        '.encoded_message.txt': {
          _type: 'file',
          _hidden: true,
          _content: `Decode this:
V2VsbCBkb25lISBZb3UncmUgcXVpdGUgdGhlIGhhY2tlci4gUmVhY2ggb3V0IHRvIG1lIGF0IGFsZXg5NTgyOTQ2NTU2QGdtYWlsLmNvbSB3aXRoIHRoZSBjb2Rld29yZCAic2hhZG93Y2F0IiBmb3IgYSBzdXJwcmlzZSE=

Hint: It's base64.`
        }
      },
      'about.txt': {
        _type: 'file',
        _content: `╔══════════════════════════════════════╗
║      ABOUT — ALEXANDER DANIEL        ║
╚══════════════════════════════════════╝

Name:       Alexander Daniel
Handle:     DeManzDVR
Role:       Cybersecurity Professional
Education:  B.Tech CSE — BIT Mesra, Ranchi
Status:     Open to opportunities

I'm a cybersecurity professional and B.Tech
Computer Science student at Birla Institute
of Technology, Mesra. I specialize in VAPT,
SOC operations, malware analysis, and
security research.

I've worked as a VAPT Analyst for Alessa
Group (Kuwait), conducted antivirus fuzzing
research at BIT Mesra, and trained in SOC
operations at Virtus Innovative Solutions.

I'm passionate about breaking systems to
make them stronger, participating in CTFs,
publishing writeups on HackTheBox challenges,
and building security tools.

Certifications:
  CEHv13 | CSAv2 | PCEP | Meta Certified

Writeups:
  writeups.alexsecurity.online

Philosophy:
  "Security is not a product, but a process."
  — Bruce Schneier`
      },
      'contact.txt': {
        _type: 'file',
        _content: `╔══════════════════════════════════════╗
║         CONTACT INFORMATION          ║
╚══════════════════════════════════════╝

Email:     alex9582946556@gmail.com
Phone:     +91 9973606069
LinkedIn:  linkedin.com/in/alexander-daniel-526938278
GitHub:    github.com/DeManzDVR
Writeups:  writeups.alexsecurity.online

Education:
  B.Tech in Computer Science & Engineering
  Birla Institute of Technology, Mesra
  Nov 2022 -- Present

Open to:
  [+] Full-time cybersecurity roles
  [+] VAPT engagements
  [+] SOC Analyst positions
  [+] Security research collaborations
  [+] CTF team collaborations
  [+] Speaking & workshops

Let's connect!`
      }
    }
  }
};

// ============================================================
// VirtualFS Class — Provides path-based access to the tree
// ============================================================

class VirtualFS {
  constructor() {
    this.tree = FS_TREE;
  }

  // Resolve a path string to a node in the tree
  getNode(absolutePath) {
    if (absolutePath === '/') return this.tree;
    const parts = absolutePath.split('/').filter(Boolean);
    let current = this.tree;
    for (const part of parts) {
      if (!current || current._type !== 'dir') return null;
      if (current[part] === undefined) return null;
      current = current[part];
    }
    return current;
  }

  // Resolve a relative or absolute path from a cwd
  resolvePath(cwd, inputPath) {
    let parts;
    if (inputPath.startsWith('/')) {
      parts = inputPath.split('/').filter(Boolean);
    } else {
      parts = [...cwd.split('/').filter(Boolean), ...inputPath.split('/').filter(Boolean)];
    }
    const resolved = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') { resolved.pop(); continue; }
      resolved.push(part);
    }
    return '/' + resolved.join('/');
  }

  // List directory contents
  ls(absolutePath, showHidden = false) {
    const node = this.getNode(absolutePath);
    if (!node || node._type !== 'dir') return null;
    const entries = [];
    for (const key of Object.keys(node)) {
      if (key.startsWith('_')) continue; // skip metadata
      if (!showHidden && key.startsWith('.')) continue;
      entries.push({
        name: key,
        type: node[key]._type,
        hidden: key.startsWith('.')
      });
    }
    // Sort: dirs first, then files, alphabetically within each group
    entries.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return entries;
  }

  // Read file content
  cat(absolutePath) {
    const node = this.getNode(absolutePath);
    if (!node) return { error: `cat: ${absolutePath.split('/').pop()}: No such file or directory` };
    if (node._type === 'dir') return { error: `cat: ${absolutePath.split('/').pop()}: Is a directory` };
    return { content: node._content || '' };
  }

  // Check if path is a directory
  isDir(absolutePath) {
    const node = this.getNode(absolutePath);
    return node && node._type === 'dir';
  }

  // Check if path exists
  exists(absolutePath) {
    return this.getNode(absolutePath) !== null;
  }

  // Get parent path
  parentPath(absolutePath) {
    const parts = absolutePath.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }

  // Get display name from path
  basename(absolutePath) {
    const parts = absolutePath.split('/').filter(Boolean);
    return parts[parts.length - 1] || '/';
  }
}
