// community.js — Community page interactions

// Subscribe button
const subBtn = document.getElementById('comm-subscribe');
const subInput = document.getElementById('comm-email');
if (subBtn && subInput) {
  subBtn.addEventListener('click', () => {
    const email = subInput.value.trim();
    if (!email || !email.includes('@')) {
      window.showToast?.('❗ Enter a valid email to subscribe');
      subInput.style.borderColor = 'rgba(236,72,153,.6)';
      return;
    }
    subInput.style.borderColor = '';
    subBtn.textContent = '✓ You\'re In!';
    subBtn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
    subInput.disabled = true;
    subBtn.disabled = true;
    window.showToast?.('🎉 Welcome to the community! You\'re subscribed.');
  });
}
