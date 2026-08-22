/* script.js — Landing page interactions */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Scroll reveal ─────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.film-card, .book-pick, .gallery-item, .stat-item, .tag, .achievement-item, .about-img-card, .float-card'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

// Stagger children within containers
document.querySelectorAll('.films-grid .film-card').forEach((el, i) => { el.dataset.delay = i; });
document.querySelectorAll('.book-picks-grid .book-pick').forEach((el, i) => { el.dataset.delay = i; });
document.querySelectorAll('.gallery-grid .gallery-item').forEach((el, i) => { el.dataset.delay = i; });

revealElements.forEach(el => revealObserver.observe(el));

// ── Section headings reveal ───────────────────────────────
document.querySelectorAll('.section-title, .section-tag, .body-text, .hero-eyebrow').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Parallax orbs ─────────────────────────────────────────
const orbs = document.querySelectorAll('.hero-orb');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ── Hero photo parallax ───────────────────────────────────
const heroPhoto = document.querySelector('.hero-photo-wrap');
if (heroPhoto) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroPhoto.style.transform = `translateY(${scrollY * 0.15}px)`;
  });
}

// ── Smooth active nav link ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// ── Cursor glow effect ─────────────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  pointer-events: none;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── Counter animation for stats ────────────────────────────
function animateCounter(el, target, suffix = '') {
  const isDecimal = target % 1 !== 0;
  const duration  = 1800;
  const start     = performance.now();
  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal ? (target * ease).toFixed(1) : Math.round(target * ease);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent.trim();
        const val  = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        if (!isNaN(val)) animateCounter(num, val, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const ribbon = document.getElementById('stats-ribbon');
if (ribbon) statsObserver.observe(ribbon);

// ── Nav active link style ─────────────────────────────────
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: #f472b6; }`;
document.head.appendChild(style);

console.log('✦ Reese Witherspoon Fan Site — Loaded');
