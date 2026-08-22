// about.js — About page interactions

// Animate skill bars on scroll
document.querySelectorAll('.skill-bar').forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = '0';
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bar.style.transition = 'width 1.4s 0.2s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = targetWidth;
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(bar.parentElement);
});
