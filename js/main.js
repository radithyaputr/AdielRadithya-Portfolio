/* ==========================================================================
   SPACE & TECH PORTFOLIO - MAIN INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLoader();
  initAOS();
  initTyped();
  initParticles();
  initCursorGlow();
  initScrollTop();
  initCounterAnimation();
  init3DTilt();
  initTechStackFilters();
  initProjectFilters();
  initNASA_APOD();
  initNavbarShrink();
});

// Light / Dark Theme Toggle
function initThemeToggle() {
  const savedTheme = localStorage.getItem('nasa-theme') || 'light';
  setTheme(savedTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nasa-theme', theme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = '<i class="fa-solid fa-sun text-warning me-1"></i> <span>Light Mode</span>';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-moon me-1"></i> <span>Dark Mode</span>';
    }
  });

  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    initParticles();
  }
}

// Loader Hide
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 600);
  });
}

// AOS Scroll Animations
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 850,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }
}

// Typed.js Titles
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
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1800,
      loop: true
    });
  }
}

// Particles.js Starfield
function initParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColors = isDark ? ['#67c8ff', '#fc3d21', '#aeb0b5', '#ffffff'] : ['#0b3d91', '#fc3d21', '#323a45', '#aeb0b5'];
    const lineColor = isDark ? '#67c8ff' : '#0b3d91';
    particlesJS('particles-js', {
      particles: {
        number: { value: 130, density: { enable: true, value_area: 900 } },
        color: { value: particleColors },
        shape: { type: 'circle' },
        opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 2.2, random: true },
        line_linked: { enable: true, distance: 135, color: lineColor, opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.7, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 180, line_linked: { opacity: 0.45 } }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }
}

// Mouse Cursor Glow Tracking
function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
}

// Scroll To Top Button
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

// Navbar shrink background
function initNavbarShrink() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Stats Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
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

// 3D Card Tilt Effect
function init3DTilt() {
  const cards = document.querySelectorAll('.profile-card, .tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * 16;
      const rotX = ((y / rect.height) - 0.5) * -16;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

// Tech Stack Category Filter
function initTechStackFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter[data-tech-filter]');
  const techCards = document.querySelectorAll('.tech-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-tech-filter');
      techCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

// Project Category Filter
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter[data-proj-filter]');
  const projCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-proj-filter');
      projCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

// Live NASA Astronomy Picture of the Day (APOD) API Fetcher
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
    if (!res.ok) throw new Error('Failed to fetch NASA API');
    const rawData = await res.json();
    const data = Array.isArray(rawData) ? rawData[0] : rawData;

    titleEl.textContent = data.title;
    dateEl.textContent = `DATE: ${data.date} · NASA APOD LIVE`;
    descEl.textContent = data.explanation.length > 320 ? data.explanation.substring(0, 320) + '...' : data.explanation;
    
    if (data.media_type === 'image') {
      imgEl.src = data.hdurl || data.url;
      imgEl.alt = data.title;
    } else {
      imgEl.src = 'assets/galaxy.png';
    }
    if (copyrightEl) {
      copyrightEl.textContent = data.copyright ? `Image Credit: ${data.copyright}` : 'Public Domain / NASA';
    }
  } catch (err) {
    console.warn('NASA APOD API Fallback:', err);
    if (titleEl) titleEl.textContent = 'Milky Way Galaxy: Cosmic Starfields';
    if (dateEl) dateEl.textContent = 'DEEP SPACE OBSERVATORY · GALAXY';
    if (descEl) descEl.textContent = 'Spectacular view of billions of stars, interstellar dust, and cosmic nebulae spanning across deep space.';
    if (imgEl) imgEl.src = 'assets/galaxy.png';
  }
}

// Random Cosmic Photo Fetcher from NASA Archive
window.fetchRandomAPOD = async function() {
  const btn = document.getElementById('btnRandomApod');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Scanning Cosmos...';
    btn.disabled = true;
  }
  await renderAPOD(`https://api.nasa.gov/planetary/apod?api_key=${getNasaKey()}&count=1`);
  if (btn) {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
};

// Dynamic Project Case Study Modal Launcher
window.openCaseStudy = function(title, category, tech, description, architecture) {
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

// Form Transmission Handler
window.handleSubmit = function(e) {
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

  // EmailJS belum siap (public key kosong / library belum load)
  if (typeof emailjs === 'undefined') {
    setBtn('<i class="fa-solid fa-circle-exclamation me-2"></i> Email service unavailable — mail me directly at radith614@gmail.com', false);
    return;
  }

  const cfg = (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS) ? CONFIG.EMAILJS : null;

  if (!cfg || !cfg.PUBLIC_KEY || !cfg.SERVICE_ID || !cfg.TEMPLATE_ID) {
    setBtn('<i class="fa-solid fa-circle-exclamation me-2"></i> Email not configured — mail me directly at radith614@gmail.com', false);
    return;
  }

  setBtn('<i class="fa-solid fa-satellite-dish me-2"></i> Transmitting Signal...', true);

  // Public key dipanggil sekali di awal (SDK v4)
  emailjs.init({ publicKey: cfg.PUBLIC_KEY });

  emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, {
    from_name: name,
    reply_to: email,
    message: message,
    to_email: cfg.TO_EMAIL
  })
    .then(() => {
      setBtn('<i class="fa-solid fa-check me-2"></i> Telemetry Sent Successfully! 🚀', true);
      form.reset();
      setTimeout(() => setBtn(originalContent, false), 4000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      setBtn('<i class="fa-solid fa-triangle-exclamation me-2"></i> Send failed — mail me directly at radith614@gmail.com', false);
      setTimeout(() => setBtn(originalContent, false), 5000);
    });
};
