// index.js — Homepage-specific interactions

// ── Hero video background (if video available) ────────────
// Using cinematic still with parallax scroll effect
const heroImg = document.getElementById('hero-main-img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrolled = window.scrollY;
  heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
}, { passive: true });

// ── Works grid stagger ────────────────────────────────────
document.querySelectorAll('.work-card').forEach((card, i) => {
  card.setAttribute('data-reveal', '');
  card.setAttribute('data-reveal-delay', i + 1);
});
