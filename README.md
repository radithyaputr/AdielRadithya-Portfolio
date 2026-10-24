# Adiel Radithya — Mission Dossier Portfolio

> **Operator:** Adiel Radithya Putra Irwana  
> **Specialization:** Network Engineering · Cybersecurity Research · Applied AI  
> **Institution:** SMKN 1 Kota Bengkulu (TJKT — Computer Network & Telecommunications)  
> **Coordinates:** 3.805°S 102.273°E (Bengkulu, Indonesia · UTC+7)  
> **Live Production:** [https://radithyaputr.github.io/AdielRadithya-Portfolio/](https://radithyaputr.github.io/AdielRadithya-Portfolio/)

---

## 1. Overview & Architecture

An international-standard, production-ready static portfolio built with the **"Mission Dossier"** visual design language: telemetry chrome, monospace data seals, real coordinates, verified competition ledgers, and responsible vulnerability disclosure strips.

- **Zero Frameworks / Zero Build Steps:** Pure semantic HTML5, Vanilla CSS3, modern ES6+ JavaScript.
- **Dark-First Telemetry Theme:** Deep space telemetry palette default with responsive OS light preference detection on first visit and persistent toggle.
- **Accessibility & Performance:** WCAG AA contrast, reduced-motion sensitivity gates, skip link, polite ARIA live regions for CLI terminal output, and full responsive support down to 360px.

---

## 2. Technical Stack

| Layer | Technologies / CDN Libraries |
| :--- | :--- |
| **Markup & Semantics** | Semantic HTML5, Schema.org JSON-LD (`Person`), OpenGraph & Twitter Cards |
| **Styling** | Vanilla CSS (CSS custom properties, CSS Grid, Flexbox, custom media queries) |
| **Typography** | Orbitron (Logotype/Display), Space Grotesk (Body/UI), JetBrains Mono (Data/CLI) |
| **Icons & Media** | Font Awesome 6.5.2, Devicon 2.15.1, custom SVG mockups |
| **Interactive Logic** | Vanilla ES6+ (`main.js`, `terminal.js`), Bootstrap 5.3.3 (modals/navbar) |
| **Telemetry & Services** | NASA Open API (APOD daily telemetry feed), EmailJS browser v4 |

---

## 3. Local Development

Run locally with any standard zero-dependency HTTP server:

```bash
# Using Python 3 (built-in HTTP server)
python -m http.server 8000

# Open in browser:
# http://localhost:8000
```

Alternatively, open the repository folder in VS Code or any editor and click **"Go Live"** with the Live Server extension.

---

## 4. How-To Operational Guides

### A. How to Drop Real Project Screenshots
The project cards feature an **automatic fallback swap convention**:
```html
<img src="assets/projects/project-N.jpg"
     onerror="this.onerror=null;this.src='assets/projects/<matching-mockup>.svg'">
```
To replace the SVG mockups with real production screenshots:
1. Prepare your screenshot images sized at **800×500 px** (or 16:10 ratio, maximum file size ≤ 200 KB).
2. Save them into `assets/projects/` using exact filenames:
   - `assets/projects/project-1.jpg` (Enterprise Network Topology)
   - `assets/projects/project-2.jpg` (JERNIH. AI Civic Platform)
   - `assets/projects/project-3.jpg` (12 TJKT 1 Dedicated Server)
3. Once dropped, the browser automatically loads the JPG files without requiring any code edits.

### B. How to Configure a Personal NASA API Key
By default, the portfolio uses `'DEMO_KEY'` (rate-limited to 30 requests/hour/IP). To upgrade to 1,000 requests/hour:
1. Register for a free API key at [https://api.nasa.gov](https://api.nasa.gov) (takes 1 minute).
2. Open `js/config.js` and set your key:
   ```javascript
   const CONFIG = {
     NASA_API_KEY: 'YOUR_PERSONAL_NASA_KEY_HERE',
     // ...
   };
   ```
3. Commit and push to GitHub.

### C. How to Swap the OpenGraph Social Banner (`og-image.png`)
1. Create a banner sized at **1200×630 px** (aspect ratio 1.91:1, file weight ≤ 300 KB).
2. Save and overwrite `assets/og-image.png`.
3. Clear social platform caches using the Facebook Sharing Debugger, Twitter Card Validator, or LinkedIn Post Inspector.

### D. How to Add NASA VDP Acknowledgment References
When official public acknowledgment links or ticket numbers are confirmed by the NASA Vulnerability Disclosure Program:
1. Open `index.html` and locate the `SECTION-05` security research block (`id="security"`).
2. In the right rail `<aside class="vdp-ledger">`, update `<div class="vdp-ref">` with your verified reference URL or tracker.
3. In `js/terminal.js`, update the `vdp` command's `REFS` row accordingly.

---

## 5. Security & Disclosure Notice

- The security research highlighted in this dossier reflects two independently discovered and responsibly disclosed Remote Code Execution (RCE) vulnerabilities (rated P1 and P2) reported through NASA's official Vulnerability Disclosure Program.
- No exploit code, attack payloads, sensitive endpoints, or non-public telemetry are published on this repository.

---

## 6. License & Credits

- Designed and engineered by **Adiel Radithya Putra Irwana**.
- Astronomy imagery provided by the **NASA Open Innovation APOD API**.
- Open source under the MIT License.
