/* ==========================================================================
   MISSION DOSSIER - INTERACTIVE CLI TERMINAL
   ========================================================================== */

let commandHistory = [];
let historyIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
});

function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  if (!terminalInput || !terminalOutput) return;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        if (historyIndex === -1) {
          historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        terminalInput.value = commandHistory[historyIndex] || '';
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = -1;
          terminalInput.value = '';
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      const rawCommand = terminalInput.value.trim();
      const command = rawCommand.toLowerCase();
      terminalInput.value = '';

      if (!command) return;

      commandHistory.push(rawCommand);
      historyIndex = -1;

      printToTerminal(`<div class="mb-1"><span class="text-info">radithya@smkn1-bks:~$</span> <span class="text-white">${escapeHTML(rawCommand)}</span></div>`);
      processCommand(command, rawCommand);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  printWelcomeBanner();
}

function openTerminal() {
  const modalEl = document.getElementById('terminalModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    setTimeout(() => {
      const input = document.getElementById('terminalInput');
      if (input) input.focus();
    }, 300);
  }
}

function closeTerminal() {
  const modalEl = document.getElementById('terminalModal');
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
}

function printToTerminal(htmlContent) {
  const terminalOutput = document.getElementById('terminalOutput');
  if (terminalOutput) {
    terminalOutput.innerHTML += htmlContent;
  }
}

function printWelcomeBanner() {
  const banner = `
<div class="text-cyan mb-2" style="font-family: monospace;">
  ____    _    ____ ___ _____   ____ _____  _  _____ ___ ___  _   _ 
 |  _ \\  / \\  |  _ \\_ _|_   _| / ___|_   _|/ \\|_   _|_ _/ _ \\| \\ | |
 | |_) |/ _ \\ | | | | |  | |   \\___ \\ | | / _ \\ | |  | | | | |  \\| |
 |  _ < / ___ \\| |_| | |  | |    ___) || |/ ___ \\| |  | | |_| | |\\  |
 |_| \\_/_/   \\_\\____/___| |_|   |____/ |_/_/   \\_\\_| |___\\___/|_| \\_|
</div>
<div class="text-warning mb-1">ADIEL RADITHYA - MISSION DOSSIER CLI [SMKN 1 KOTA BENGKULU]</div>
<div class="text-muted mb-3">Type <span class="text-info">'help'</span> for dossier commands. Try <span class="text-info">'coords'</span>, <span class="text-info">'vdp'</span>, <span class="text-info">'jernih'</span>, <span class="text-info">'whoami'</span>.</div>
`;
  printToTerminal(banner);
}

function processCommand(cmd, rawCmd) {
  const args = cmd.split(' ');
  const primaryCmd = args[0];

  switch (primaryCmd) {
    case 'help':
      printToTerminal(`
<div class="mb-2 text-info">=== AVAILABLE DOSSIER COMMANDS ===</div>
<div class="ms-3">
  <div><span class="text-warning">coords</span>        : Print real coordinate telemetry and dossier identifier.</div>
  <div><span class="text-warning">whoami</span>        : Display engineer identity summary.</div>
  <div><span class="text-warning">bio</span>           : Read engineer profile and track background.</div>
  <div><span class="text-warning">vdp / security</span> : Inspect NASA Vulnerability Disclosure Program research.</div>
  <div><span class="text-warning">jernih</span>        : Display JERNIH team roster and competition record.</div>
  <div><span class="text-warning">lks</span>           : Inspect LKS Dikmen 2026 AI Exhibition standings.</div>
  <div><span class="text-warning">skills / matrix</span>: Display technical systems and protocol matrix.</div>
  <div><span class="text-warning">projects</span>      : List documented project dossiers.</div>
  <div><span class="text-warning">certs</span>         : Inspect verified credentials and certs.</div>
  <div><span class="text-warning">cv</span>            : Launch Curriculum Vitae (CV) in browser.</div>
  <div><span class="text-warning">theme &lt;dark|light&gt;</span>: Switch interface theme via CLI.</div>
  <div><span class="text-warning">nasa</span>          : Check NASA APOD daily telemetry status.</div>
  <div><span class="text-warning">github / repo</span> : Open official GitHub profile.</div>
  <div><span class="text-warning">contact</span>       : Display transmission channels and email.</div>
  <div><span class="text-warning">history</span>       : Show command execution history.</div>
  <div><span class="text-warning">clear</span>         : Clear terminal buffer.</div>
  <div><span class="text-warning">exit</span>          : Close CLI session window.</div>
</div>
`);
      break;

    case 'coords':
      printToTerminal(`
<div class="mb-1 text-cyan">=== MISSION COORDINATES ===</div>
<div class="text-white">DOSSIER AR-TJKT-2026 &middot; SMKN 1 KOTA BENGKULU &middot; 3.805&deg;S 102.273&deg;E</div>
<div class="text-muted">LOCATION: Kota Bengkulu, Bengkulu, Indonesia (UTC+7)</div>
`);
      break;

    case 'whoami':
      printToTerminal(`
<div class="mb-1 text-cyan">=== OPERATOR IDENTITY ===</div>
<div class="text-white">Adiel Radithya Putra Irwana</div>
<div class="text-muted">Role: TJKT Student at SMKN 1 Kota Bengkulu &middot; Network, Cybersecurity &amp; Applied AI</div>
`);
      break;

    case 'bio':
    case 'about':
      printToTerminal(`
<div class="mb-2 text-cyan">=== ENGINEER DOSSIER ===</div>
<div><strong class="text-white">Operator:</strong> Adiel Radithya Putra Irwana</div>
<div><strong class="text-white">Education:</strong> SMKN 1 Kota Bengkulu (TJKT — Computer Network &amp; Telecommunications)</div>
<div><strong class="text-white">Recognition:</strong> LKS Dikmen 2026 AI Exhibition — 1st Place Bengkulu Province / National Rank #15 (Score: 87.13)</div>
<div><strong class="text-white">Focus:</strong> Enterprise Network Architecture, Security Research, and Applied AI</div>
<div><strong class="text-white">Objective:</strong> Architecting resilient network infrastructure and protocol reliability for mission-critical operations.</div>
`);
      break;

    case 'vdp':
    case 'security':
    case 'research':
      printToTerminal(`
<div class="mb-2 text-danger">=== NASA VULNERABILITY DISCLOSURE PROGRAM (VDP) ===</div>
<div class="text-white mb-2">Independently discovered and responsibly disclosed two Remote Code Execution vulnerabilities (rated P1 and P2) through NASA's official Vulnerability Disclosure Program.</div>
<div class="p-2 border border-danger rounded bg-dark mb-2">
  <div><span class="text-muted">CLASS   :</span> <strong class="text-white">RCE (Remote Code Execution)</strong></div>
  <div><span class="text-muted">PROGRAM :</span> <strong class="text-white">NASA-VDP</strong></div>
  <div><span class="text-muted">SEVERITY:</span> <strong class="text-danger">P1 &middot; P2</strong></div>
  <div><span class="text-muted">OUTCOME :</span> <strong class="text-success">ACK (Acknowledged)</strong></div>
  <div class="mt-1"><span class="text-muted">REFS    :</span> <span class="text-white">AVAILABLE ON REQUEST</span></div>
</div>
`);
      break;

    case 'jernih':
      printToTerminal(`
<div class="mb-2 text-warning">=== TEAM JERNIH — NATIONAL LKS 2026 ===</div>
<div class="text-white mb-1"><strong class="text-warning">Team Roster (5 Members):</strong></div>
<div class="ms-2 text-muted">1. Muhammad Fikri Haikal (Ketua)</div>
<div class="ms-2 text-muted">2. Adiel Radithya Putra Irwana</div>
<div class="ms-2 text-muted">3. Muhammad Aditya Anugerah</div>
<div class="ms-2 text-muted">4. Fachri Majidan Afandi</div>
<div class="ms-2 text-muted">5. Muhammad Irsyad Sholih</div>
<div class="mt-2 text-white"><strong class="text-warning">Competition Record:</strong></div>
<div class="ms-2 text-white">Event: LKS Dikmen 2026 — Artificial Intelligence Exhibition</div>
<div class="ms-2 text-white">Standing: 1st Place Bengkulu Province &middot; National Rank #15</div>
<div class="ms-2 text-white">Official Score: 87.13</div>
<div class="ms-2 text-muted">Verification: SK Puspresnas No. 1365/B/H3/PN.00/2026</div>
`);
      break;

    case 'lks':
    case 'award':
    case 'honors':
      printToTerminal(`
<div class="mb-2 text-warning">=== LKS DIKMEN 2026 AI EXHIBITION RECORD ===</div>
<div><strong class="text-white">Competition:</strong> LKS Dikmen 2026 — Artificial Intelligence (KA/AI Exhibition)</div>
<div><strong class="text-white">Authority:</strong> Kemendikdasmen (Pusat Prestasi Nasional / Puspresnas)</div>
<div><strong class="text-white">Team:</strong> JERNIH TEAM (SMKN 1 Kota Bengkulu)</div>
<div><strong class="text-warning">Provincial Standing:</strong> 1st Place (Juara 1) — Bengkulu Province</div>
<div><strong class="text-cyan">National Standing:</strong> National Rank #15 (Score: 87.13)</div>
<div><strong class="text-muted">Reference:</strong> Surat Keputusan Puspresnas No. 1365/B/H3/PN.00/2026</div>
`);
      break;

    case 'nasa':
      printToTerminal(`
<div class="mb-2 text-info">=== NASA APOD TELEMETRY ===</div>
<div>Status: <span class="text-success">ONLINE</span></div>
<div>Telemetry: Live daily imagery fetched directly from NASA's official open API (planetary/apod).</div>
<div>For security research details, run command: <span class="text-warning">vdp</span></div>
`);
      break;

    case 'skills':
    case 'matrix':
      printToTerminal(`
<div class="mb-2 text-cyan">=== TECHNICAL MATRIX ===</div>
<div class="text-warning">[Networking &amp; Protocols]</div>
<div class="ms-2 text-white">Cisco IOS, Routing &amp; Switching, VLAN, OSPF, DHCP Relay, ACL, TCP/IP, Wireshark</div>
<div class="text-warning mt-1">[Systems &amp; Operations]</div>
<div class="ms-2 text-white">Linux (Debian, Ubuntu), Bash Scripting, RAID 1 Storage, Server Hardening, Local DNS/Web</div>
<div class="text-warning mt-1">[Programming &amp; Web]</div>
<div class="ms-2 text-white">Python, HTML5, CSS3 Modern, JavaScript (ES6+), Streamlit, Git/GitHub</div>
<div class="text-warning mt-1">[Applied AI]</div>
<div class="ms-2 text-white">LangChain, Multi-Tier Fallback Orchestration (Groq, Gemini, OpenRouter), ChromaDB, PyDeck 3D</div>
`);
      break;

    case 'projects':
      printToTerminal(`
<div class="mb-2 text-cyan">=== DOCUMENTED DOSSIERS ===</div>
<div>1. <span class="text-info">Enterprise Network Topology</span> (Cisco Packet Tracer / Multi-VLAN / OSPF)</div>
<div>2. <span class="text-info">JERNIH. — AI Civic Platform</span> (Flagship / Python Streamlit / 4-Tier Fallback / LKS 2026)</div>
<div>3. <span class="text-info">12 TJKT 1 Dedicated Server</span> (Hardware Rack / RAID 1 / Linux OS / Local DNS)</div>
<div class="mt-2 text-muted">Open any card on the site for full architecture diagrams.</div>
`);
      break;

    case 'certs':
      printToTerminal(`
<div class="mb-2 text-cyan">=== VERIFIED CREDENTIALS ===</div>
<div>[2026] <span class="text-warning">LKS Dikmen AI Exhibition — 1st Prov. Bengkulu / Nat'l #15 (Score 87.13)</span> [VERIFIED SK 1365/B/H3/PN.00/2026]</div>
<div>[NET]  <span class="text-success">Networking Essentials</span> &middot; Cisco Networking Academy [VERIFIED]</div>
<div>[SEC]  <span class="text-success">Cybersecurity Fundamentals</span> &middot; Network Security Pathway [VERIFIED]</div>
<div>[SYS]  <span class="text-muted">Google IT Support</span> &middot; Professional Certificate Track [IN PROGRESS]</div>
`);
      break;

    case 'cv':
    case 'resume':
      printToTerminal(`<div class="text-success">Launching Curriculum Vitae (assets/cv.html) in a new tab...</div>`);
      window.open('assets/cv.html', '_blank');
      break;

    case 'theme':
      const targetTheme = args[1];
      if (targetTheme === 'dark' || targetTheme === 'light') {
        if (typeof setTheme === 'function') {
          setTheme(targetTheme, true);
          printToTerminal(`<div class="text-success">Interface theme switched to: <strong>${targetTheme.toUpperCase()}</strong></div>`);
        } else {
          document.documentElement.setAttribute('data-theme', targetTheme);
          localStorage.setItem('nasa-theme', targetTheme);
          printToTerminal(`<div class="text-success">Theme set to ${targetTheme}.</div>`);
        }
      } else {
        printToTerminal(`<div class="text-warning">Usage: theme &lt;dark|light&gt; (e.g. <code>theme dark</code>)</div>`);
      }
      break;

    case 'github':
    case 'repo':
      printToTerminal(`<div class="text-info">Opening GitHub profile: https://github.com/radithyaputr</div>`);
      window.open('https://github.com/radithyaputr', '_blank');
      break;

    case 'contact':
      printToTerminal(`
<div class="mb-2 text-cyan">=== TRANSMISSION CHANNELS ===</div>
<div>Email   : <a href="mailto:radith614@gmail.com" class="text-warning">radith614@gmail.com</a></div>
<div>Location: Bengkulu, Indonesia (3.805&deg;S 102.273&deg;E)</div>
<div>School  : SMKN 1 Kota Bengkulu</div>
<div>GitHub  : <a href="https://github.com/radithyaputr" target="_blank" class="text-info">github.com/radithyaputr</a></div>
<div>LinkedIn: <a href="https://www.linkedin.com/in/radithya-putra-9baa99333" target="_blank" class="text-info">linkedin.com/in/radithya-putra-9baa99333</a></div>
`);
      break;

    case 'history':
      if (commandHistory.length === 0) {
        printToTerminal(`<div class="text-muted">No commands in history yet.</div>`);
      } else {
        let historyHtml = '<div class="text-info mb-1">=== COMMAND HISTORY ===</div>';
        commandHistory.forEach((item, index) => {
          historyHtml += `<div><span class="text-muted">${index + 1}</span>  ${escapeHTML(item)}</div>`;
        });
        printToTerminal(historyHtml);
      }
      break;

    case 'sudo':
      printToTerminal(`
<div class="text-danger">Permission Denied: User 'guest' is not authorized in sudoers.</div>
<div class="text-warning">Access attempt logged to security telemetry.</div>
`);
      break;

    case 'clear':
      const terminalOutput = document.getElementById('terminalOutput');
      if (terminalOutput) terminalOutput.innerHTML = '';
      printWelcomeBanner();
      break;

    case 'exit':
      closeTerminal();
      break;

    default:
      printToTerminal(`<div class="text-danger">Command not recognized: '${escapeHTML(cmd)}'. Type <span class="text-info">'help'</span> for available commands.</div>`);
      break;
  }
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
