// explore.js

// Newsletter form
const nlBtn = document.getElementById('nl-subscribe-btn');
const nlInput = document.getElementById('nl-email-input');
if (nlBtn && nlInput) {
  nlBtn.addEventListener('click', () => {
    const email = nlInput.value.trim();
    if (!email || !email.includes('@')) {
      nlInput.style.borderColor = 'rgba(236,72,153,0.7)';
      nlInput.placeholder = 'Please enter a valid email';
      return;
    }
    nlBtn.textContent = '✓ Subscribed!';
    nlBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    nlInput.value = '';
    nlInput.disabled = true;
    nlBtn.disabled = true;
  });
}

// Animate skill bars
document.querySelectorAll('.skill-bar').forEach(bar => {
  const w = bar.style.width;
  bar.style.width = '0';
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bar.style.transition = 'width 1.2s 0.2s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = w;
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(bar);
});
