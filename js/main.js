/* ==========================================================================
   MISSION DOSSIER - MAIN INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemePolicy();
  initLoader();
  initMotionSensitivities();
  initEmailService();
  initScrollTop();
  initScrollSpy();
  initCounterAnimation();
  initTechStackFilters();
  initProjectFilters();
  initNASA_APOD();
  initNavbarShrink();
});

// Theme Policy: dark default, OS light on first visit without storage
function initThemePolicy() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('nasa-theme');
  } catch (e) { }

  const initialTheme = (savedTheme === 'light' || savedTheme === 'dark')
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  setTheme(initialTheme, false);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme, true);
    });
  });
}

function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) {
    try {
      localStorage.setItem('nasa-theme', theme);
    } catch (e) { }
  }

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#0a0e1a' : '#f4f6f9');
  }

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
      btn.setAttribute('aria-label', 'Switch to light theme');
      btn.setAttribute('title', 'Switch to light theme');
    } else {
      btn.innerHTML = '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
      btn.setAttribute('aria-label', 'Switch to dark theme');
      btn.setAttribute('title', 'Switch to dark theme');
    }
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    initParticles();
  }
}

// Loader Hide: <=300ms after window load, plus 4s failsafe timeout
function initLoader() {
  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  };

  window.addEventListener('load', () => {
    setTimeout(hide, 250);
  });

  setTimeout(hide, 4000);
}

// prefers-reduced-motion gate
function initMotionSensitivities() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initTyped();

  if (!prefersReduced) {
    initParticles();
    initCursorGlow();
    init3DTilt();
    initAOS();
  }
}

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      once: true,
      offset: 70,
      easing: 'ease-out-cubic'
    });
  }
}

function initTyped() {
  const typedEl = document.getElementById('typed');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed', {
      strings: [
        'Network Engineer & Cybersecurity Enthusiast',
        'AI Developer & Systems Administrator',
        'Computer Network & Telecommunications (TJKT) Student',
        'Aspiring Deep-Space Communications Engineer'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1900,
      loop: true
    });
  }
}

function initParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColors = isDark
      ? ['#67c8ff', '#fc3d21', '#aeb0b5', '#ffffff']
      : ['#0b3d91', '#fc3d21', '#323a45', '#aeb0b5'];
    const lineColor = isDark ? '#67c8ff' : '#0b3d91';

    particlesJS('particles-js', {
      particles: {
        number: { value: 110, density: { enable: true, value_area: 900 } },
        color: { value: particleColors },
        shape: { type: 'circle' },
        opacity: { value: 0.75, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1 } },
        size: { value: 2.2, random: true },
        line_linked: { enable: true, distance: 135, color: lineColor, opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.65, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 170, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }
}

function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
}

function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
  }
}

function initNavbarShrink() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Scrollspy with aria-current="true"
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => observer.observe(sec));
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = count;
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

function init3DTilt() {
  const cards = document.querySelectorAll('.profile-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * 14;
      const rotX = ((y / rect.height) - 0.5) * -14;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

function initTechStackFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter[data-tech-filter]');
  const techCards = document.querySelectorAll('.tech-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const cat = btn.getAttribute('data-tech-filter');
      techCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; }, 40);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter[data-proj-filter]');
  const projCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const cat = btn.getAttribute('data-proj-filter');
      projCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; }, 40);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

async function initNASA_APOD() {
  await renderAPOD(`https://api.nasa.gov/planetary/apod?api_key=${getNasaKey()}`);
}

function getNasaKey() {
  return (typeof CONFIG !== 'undefined' && CONFIG.NASA_API_KEY) ? CONFIG.NASA_API_KEY : 'DEMO_KEY';
}

async function renderAPOD(url) {
  const titleEl = document.getElementById('apodTitle');
  const dateEl = document.getElementById('apodDate');
  const descEl = document.getElementById('apodDesc');
  const imgEl = document.getElementById('apodImg');
  const copyrightEl = document.getElementById('apodCopyright');

  if (!titleEl || !imgEl) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('NASA APOD API response not ok');
    const rawData = await res.json();
    const data = Array.isArray(rawData) ? rawData[0] : rawData;

    titleEl.textContent = data.title || 'Cosmic Capture';
    dateEl.textContent = `DATE: ${data.date || 'TODAY'} · NASA APOD LIVE`;
    descEl.textContent = data.explanation && data.explanation.length > 320
      ? data.explanation.substring(0, 320) + '...'
      : (data.explanation || 'Direct capture via NASA open telemetry.');

    if (data.media_type === 'image') {
      imgEl.src = data.hdurl || data.url;
      imgEl.alt = data.title || 'Astronomy Picture of the Day';
    } else {
      imgEl.src = 'assets/galaxy.png';
      imgEl.alt = 'Deep-space galaxy field used as fallback for NASA APOD non-image media';
    }
    if (copyrightEl) {
      copyrightEl.textContent = data.copyright ? `Credit: ${data.copyright}` : 'Public Domain / NASA';
    }
  } catch (err) {
    if (titleEl) titleEl.textContent = 'Milky Way Galaxy: Cosmic Starfields';
    if (dateEl) dateEl.textContent = 'DEEP SPACE OBSERVATORY · GALAXY';
    if (descEl) descEl.textContent = 'Spectacular view of billions of stars, interstellar dust, and cosmic nebulae spanning across deep space.';
    if (imgEl) {
      imgEl.src = 'assets/galaxy.png';
      imgEl.alt = 'Milky Way Galaxy starfield fallback';
    }
  }
}

window.fetchRandomAPOD = async function () {
  const btn = document.getElementById('btnRandomApod');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2" aria-hidden="true"></i> Scanning Cosmos...';
    btn.disabled = true;
  }
  await renderAPOD(`https://api.nasa.gov/planetary/apod?api_key=${getNasaKey()}&count=1`);
  if (btn) {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
};

window.openCaseStudy = function (title, category, tech, description, architecture) {
  const modalTitle = document.getElementById('caseStudyTitle');
  const modalCategory = document.getElementById('caseStudyCategory');
  const modalTech = document.getElementById('caseStudyTech');
  const modalDesc = document.getElementById('caseStudyDesc');
  const modalArch = document.getElementById('caseStudyArch');

  if (modalTitle) modalTitle.textContent = title;
  if (modalCategory) modalCategory.textContent = category;
  if (modalTech) modalTech.textContent = tech;
  if (modalDesc) modalDesc.textContent = description;
  if (modalArch) modalArch.textContent = architecture;

  const bsModal = new bootstrap.Modal(document.getElementById('caseStudyModal'));
  bsModal.show();
};

// EmailJS init once at load
function initEmailService() {
  if (typeof emailjs !== 'undefined' && typeof CONFIG !== 'undefined' && CONFIG.EMAILJS && CONFIG.EMAILJS.PUBLIC_KEY) {
    emailjs.init({ publicKey: CONFIG.EMAILJS.PUBLIC_KEY });
  }
}

window.handleSubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalContent = btn.innerHTML;

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  const setBtn = (html, disabled) => {
    btn.innerHTML = html;
    btn.disabled = disabled;
  };

  if (typeof emailjs === 'undefined') {
    setBtn('<i class="fa-solid fa-circle-exclamation me-2" aria-hidden="true"></i> Email service unavailable — mail me at radith614@gmail.com', false);
    return;
  }

  const cfg = (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS) ? CONFIG.EMAILJS : null;

  if (!cfg || !cfg.PUBLIC_KEY || !cfg.SERVICE_ID || !cfg.TEMPLATE_ID) {
    setBtn('<i class="fa-solid fa-circle-exclamation me-2" aria-hidden="true"></i> Email not configured — mail me at radith614@gmail.com', false);
    return;
  }

  setBtn('<i class="fa-solid fa-satellite-dish me-2" aria-hidden="true"></i> Transmitting Signal...', true);

  emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, {
    from_name: name,
    reply_to: email,
    message: message,
    to_email: cfg.TO_EMAIL
  })
    .then(() => {
      setBtn('<i class="fa-solid fa-check me-2" aria-hidden="true"></i> Telemetry Sent Successfully!', true);
      form.reset();
      setTimeout(() => setBtn(originalContent, false), 4000);
    })
    .catch((err) => {
      console.warn('EmailJS delivery notification:', err);
      setBtn('<i class="fa-solid fa-triangle-exclamation me-2" aria-hidden="true"></i> Send failed — mail me at radith614@gmail.com', false);
      setTimeout(() => setBtn(originalContent, false), 5000);
    });
};
