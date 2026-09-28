/* ==========================================================================
   SPACE & TECH PORTFOLIO - INTERACTIVE CLI TERMINAL
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
    // Command History Navigation: ArrowUp & ArrowDown
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

      // Add to command history
      commandHistory.push(rawCommand);
      historyIndex = -1;

      // Print user command line
      printToTerminal(`<div class="mb-1"><span class="text-info">radithya@dev:~$</span> <span class="text-white">${escapeHTML(rawCommand)}</span></div>`);

      // Process command
      processCommand(command, rawCommand);

      // Scroll to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  // Welcome banner on start
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
    }, 400);
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
<div class="text-warning mb-2">ADIEL RADITHYA — INTERACTIVE TERMINAL CLI v2.7.0</div>
<div class="text-muted mb-3">Type <span class="text-info">'help'</span> to display all available commands. (ArrowUp/Down for history)</div>
`;
  printToTerminal(banner);
}

function processCommand(cmd, rawCmd) {
  const args = cmd.split(' ');
  const primaryCmd = args[0];

  switch (primaryCmd) {
    case 'help':
      printToTerminal(`
<div class="mb-2 text-info">=== AVAILABLE COMMANDS ===</div>
<div class="ms-3">
  <div><span class="text-warning">bio</span>          : Read engineer profile & career objective.</div>
  <div><span class="text-warning">lks</span>          : Inspect LKS 2026 AI National & Provincial competition results.</div>
  <div><span class="text-warning">skills</span>       : Display categorized tech stack & protocol matrix.</div>
  <div><span class="text-warning">projects</span>     : List active hardware, networking & web projects.</div>
  <div><span class="text-warning">certs</span>        : Inspect verified certifications & honors.</div>
  <div><span class="text-warning">cv</span>           : Open & preview Curriculum Vitae (CV) in a new tab.</div>
  <div><span class="text-warning">theme &lt;dark|light&gt;</span>: Switch interface theme directly via CLI.</div>
  <div><span class="text-warning">github / repo</span>: Open official GitHub profile.</div>
  <div><span class="text-warning">nasa</span>         : Fetch NASA APOD status.</div>
  <div><span class="text-warning">contact</span>      : Retrieve contact information & email.</div>
  <div><span class="text-warning">history</span>      : Show command execution history.</div>
  <div><span class="text-warning">sudo</span>         : Request root authorization.</div>
  <div><span class="text-warning">clear</span>        : Clear terminal screen output.</div>
  <div><span class="text-warning">exit</span>         : Close CLI session window.</div>
</div>
<div class="mt-2 text-muted">Navigation Tip: You can also use the website navigation bar above.</div>
`);
      break;

    case 'bio':
    case 'about':
      printToTerminal(`
<div class="mb-2 text-cyan">=== ENGINEER PROFILE ===</div>
<div><strong class="text-white">Name:</strong> Adiel Radithya Putra Irwana</div>
<div><strong class="text-white">Education:</strong> SMKN 1 Kota Bengkulu (XI TJKT 1)</div>
<div><strong class="text-white">Honors:</strong> 🥇 1st Winner Bengkulu Province & 🏆 Rank #15 National LKS 2026 AI Exhibition (Score: 87.13)</div>
<div><strong class="text-white">Focus:</strong> Computer Network Engineering, Cybersecurity & Applied AI</div>
<div><strong class="text-white">Vision:</strong> Aspiring deep-space communications engineer — architecting resilient network infrastructure for future mission-critical missions.</div>
`);
      break;

    case 'cv':
    case 'resume':
      printToTerminal(`<div class="text-success"><i class="fa-solid fa-file-pdf me-2"></i>Launching Curriculum Vitae (assets/cv.html) in a new tab...</div>`);
      window.open('assets/cv.html', '_blank');
      break;

    case 'theme':
      const targetTheme = args[1];
      if (targetTheme === 'dark' || targetTheme === 'light') {
        if (typeof setTheme === 'function') {
          setTheme(targetTheme);
          printToTerminal(`<div class="text-success">Theme updated successfully to: <strong>${targetTheme.toUpperCase()}</strong></div>`);
        } else {
          document.documentElement.setAttribute('data-theme', targetTheme);
          localStorage.setItem('nasa-theme', targetTheme);
          printToTerminal(`<div class="text-success">Theme set to ${targetTheme}.</div>`);
        }
      } else {
        printToTerminal(`<div class="text-warning">Usage: theme &lt;dark|light&gt; (example: <code>theme dark</code>)</div>`);
      }
      break;

    case 'github':
    case 'repo':
      printToTerminal(`<div class="text-info"><i class="fa-brands fa-github me-2"></i>Opening GitHub repository profile: https://github.com/radithyaputr</div>`);
      window.open('https://github.com/radithyaputr', '_blank');
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

    case 'lks':
    case 'award':
    case 'honors':
      printToTerminal(`
<div class="mb-2 text-warning">=== LKS DIKMEN 2026 AI EXHIBITION RESULT ===</div>
<div><strong class="text-white">Event:</strong> LKS Dikmen 2026 — Artificial Intelligence (KA/AI Exhibition)</div>
<div><strong class="text-white">Organizer:</strong> Kemendikdasmen (Pusat Prestasi Nasional / Puspresnas)</div>
<div><strong class="text-white">Team Name:</strong> JERNIH TEAM (SMKN 1 Kota Bengkulu)</div>
<div><strong class="text-white">Team Members:</strong> Muhammad Fikri Haikal (Ketua), Adiel Radithya Putra Irwana, Muhammad Aditya Anugerah, Fachri Majidan Afandi, Muhammad Irsyad Sholih</div>
<div><strong class="text-warning">Provincial Standing:</strong> 🥇 JUARA 1 (1st Winner) - Kota Bengkulu / Prov. Bengkulu</div>
<div><strong class="text-cyan">National Standing:</strong> 🏆 RANK #15 NATIONALLY (Score: 87.13) — Surat SK Puspresnas No. 1365/B/H3/PN.00/2026</div>
`);
      break;

    case 'skills':
    case 'matrix':
      printToTerminal(`
<div class="mb-2 text-cyan">=== TECH STACK MATRIX ===</div>
<div class="text-warning">[Networking]</div>
<div class="ms-2 text-white">• Cisco IOS, Routing & Switching, VLAN, OSPF, DHCP, ACL, IPv4/IPv6 Subnetting, Basic Cybersecurity</div>
<div class="text-warning mt-1">[Operating Systems]</div>
<div class="ms-2 text-white">• Windows 10/11, Linux (Kali, Debian, Ubuntu)</div>
<div class="text-warning mt-1">[Systems & Security]</div>
<div class="ms-2 text-white">• Bash Scripting, RAID Arrays, Server Hardening, Local DNS & Web Services</div>
<div class="text-warning mt-1">[Programming & Web]</div>
<div class="ms-2 text-white">• Python, HTML5, CSS3, JavaScript (ES6+), Streamlit, Bootstrap 5, Git/GitHub</div>
<div class="text-warning mt-1">[AI & Data]</div>
<div class="ms-2 text-white">• LangChain, RAG Pipelines, LLM Orchestration (Groq, Gemini, OpenRouter), ChromaDB, PyDeck, NetworkX</div>
`);
      break;

    case 'projects':
      printToTerminal(`
<div class="mb-2 text-cyan">=== PROJECTS ===</div>
<div>1. <span class="text-info">Enterprise Network Topology Simulation</span> (Cisco Packet Tracer / VLAN Routing)</div>
<div>2. <span class="text-info">JERNIH. — AI Civic Platform</span> (Python Streamlit / LKS 2026 — Multi-AI Fallback Engine)</div>
<div>3. <span class="text-info">12 TJKT 1 Dedicated Server</span> (Server Assembly / RAID 1 / Linux OS / Local DNS)</div>
<div class="mt-2 text-muted">Type 'cv' or explore live demo cards on the portfolio.</div>
`);
      break;

    case 'certs':
      printToTerminal(`
<div class="mb-2 text-cyan">=== VERIFIED CREDENTIALS & HONORS ===</div>
<div>• <span class="text-warning font-weight-bold">🥇 1st Winner Provincial & Rank #15 National LKS 2026 AI Exhibition</span> (Puspresnas Kemendikdasmen - JERNIH TEAM)</div>
<div>• <span class="text-success">Cisco Networking Essentials</span> (NetAcad Credential)</div>
<div>• <span class="text-success">Cybersecurity Fundamentals</span> (Network Security Pathway)</div>
<div>• <span class="text-success">Google IT Support Professional</span> (Active Track)</div>
`);
      break;

    case 'nasa':
      printToTerminal(`
<div class="mb-2 text-danger">=== NASA APOD & VULNERABILITY RESEARCH ===</div>
<div>Status: <span class="text-success">ACTIVE & CONNECTED</span></div>
<div>• NASA APOD: Live Astronomy Picture of the Day loaded via NASA Open API.</div>
<div>• Security Research: Documented P1 & P2 Remote Code Execution (RCE) disclosures reported through NASA VDP program.</div>
`);
      break;

    case 'contact':
      printToTerminal(`
<div class="mb-2 text-cyan">=== CONTACT INFORMATION ===</div>
<div>Email: <a href="mailto:radith614@gmail.com" class="text-warning">radith614@gmail.com</a></div>
<div>Location: Bengkulu, Indonesia 🇮🇩</div>
<div>School: SMKN 1 Kota Bengkulu (XI TJKT 1)</div>
<div>GitHub: <a href="https://github.com/radithyaputr" target="_blank" class="text-info">github.com/radithyaputr</a></div>
<div>LinkedIn: <a href="https://www.linkedin.com/in/radithya-putra-9baa99333" target="_blank" class="text-info">linkedin.com/in/radithya-putra-9baa99333</a></div>
`);
      break;

    case 'sudo':
      printToTerminal(`
<div class="text-danger">Permission Denied: User 'guest' is not in the sudoers file.</div>
<div class="text-warning">This unauthorized access attempt has been logged.</div>
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
      printToTerminal(`<div class="text-danger">Command not recognized: '${escapeHTML(cmd)}'. Type <span class="text-info">'help'</span> for list of commands.</div>`);
      break;
  }
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
