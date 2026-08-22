// polls.js — Fan Voting System with localStorage persistence

(function() {
  'use strict';

  /* ── Poll Definitions ───────────────────────────────────── */
  const POLLS = [
    {
      id: 'fav-movie',
      question: '🎬 What\'s your favorite Reese Witherspoon movie?',
      options: [
        { id: 'lb',  label: 'Legally Blonde', img: 'reesewitherspoon/reesewitherspoon_1578332631_2215537149606891783_367315644.jpg', votes: 1842 },
        { id: 'wtl', label: 'Walk the Line',   img: 'reesewitherspoon/reesewitherspoon_1579536534_2225636222863195125_367315644.jpg', votes: 1203 },
        { id: 'sha', label: 'Sweet Home Alabama', img: 'reesewitherspoon/primevideo_1738771222_3561393602053836340_1684102154.jpg', votes: 876 },
        { id: 'wld', label: 'Wild',             img: 'reesewitherspoon/reesewitherspoon_1583010420_2254777285947219792_367315644.jpg', votes: 654 },
        { id: 'elc', label: 'Election',         img: 'reesewitherspoon/reesewitherspoon_1577901649_2211921814496504844_367315644.jpg', votes: 487 },
        { id: 'pls', label: 'Pleasantville',    img: 'reesewitherspoon/reesewitherspoon_1570494823_2149788856218626605_367315644.jpg', votes: 321 },
      ]
    },
    {
      id: 'fav-show',
      question: '📺 Which Hello Sunshine project is your favorite?',
      options: [
        { id: 'bll', label: 'Big Little Lies',         img: 'reesewitherspoon/reesewitherspoon_1590170650_2314841648514737315_367315644.jpg', votes: 2140 },
        { id: 'tms', label: 'The Morning Show',        img: 'reesewitherspoon/reesewitherspoon_1640021819_2733023570386325475_367315644.jpg', votes: 1576 },
        { id: 'lfe', label: 'Little Fires Everywhere', img: 'reesewitherspoon/reesewitherspoon_1591975593_2329982613323954854_367315644.jpg', votes: 987 },
        { id: 'djx', label: 'Daisy Jones & The Six',   img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311782487782_2249417883.jpg', votes: 734 },
        { id: 'wtc', label: 'Where the Crawdads Sing', img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311740674109_2249417883.jpg', votes: 510 },
      ]
    },
    {
      id: 'best-look',
      question: '✨ Best Reese red carpet look?',
      options: [
        { id: 'osc', label: '2006 Academy Awards',      img: 'reesewitherspoon/reesewitherspoon_1579478144_2225146406606465542_367315644.jpg', votes: 1654 },
        { id: 'emm', label: '2017 Emmy Awards',         img: 'reesewitherspoon/people_1752166095_3673757936850124429_28759374.jpg', votes: 1102 },
        { id: 'glm', label: 'Glamour 2025',             img: 'reesewitherspoon/glamourmag_1756814591_3712752346641580542_10070230.jpg', votes: 876 },
        { id: 'cos', label: 'Cosmopolitan 2024',        img: 'reesewitherspoon/cosmopolitan_1750240854_3657592786824360179_42725516.jpg', votes: 634 },
      ]
    },
    {
      id: 'what-next',
      question: '🌟 What should Reese do next?',
      options: [
        { id: 'lgb3', label: 'Legally Blonde 3!',    img: 'reesewitherspoon/reesewitherspoon_1578332631_2215537149682550300_367315644.jpg', votes: 3201 },
        { id: 'newm', label: 'A New Movie',           img: 'reesewitherspoon/reesewitherspoon_1631032626_2657616754214583213_367315644.jpg', votes: 987 },
        { id: 'memr', label: 'Write a Memoir',        img: 'reesewitherspoon/reesewitherspoon_1601570758_2410472685298603652_367315644.jpg', votes: 765 },
        { id: 'brwy', label: 'Broadway Debut',        img: 'reesewitherspoon/reesewitherspoon_1624029970_2598874215562248361_367315644.jpg', votes: 543 },
      ]
    },
  ];

  /* ── Storage helpers ────────────────────────────────────── */
  const LS_KEY = 'rw_polls_v2';
  function loadState() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveState(s) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch(e) {}
  }

  /* ── Render a single poll card ──────────────────────────── */
  function renderPoll(poll, container) {
    const state = loadState();
    const myVote  = state[`voted_${poll.id}`];
    const extraVotes = state[`votes_${poll.id}`] || {};

    const card = document.createElement('div');
    card.className = 'poll-card'; card.id = `poll-${poll.id}`;
    card.innerHTML = `<div class="poll-q">${poll.question}</div><div class="poll-options" id="opts-${poll.id}"></div><div class="poll-meta"><span class="poll-vote-count">👥 <span class="vote-num">…</span> votes</span><button class="poll-share-btn" onclick="shareResult('${poll.id}')">Share ↗</button></div>`;
    container.appendChild(card);

    renderOptions(poll, card, myVote, extraVotes);
  }

  function renderOptions(poll, card, myVote, extraVotes) {
    const optsWrap = card.querySelector(`#opts-${poll.id}`);
    optsWrap.innerHTML = '';

    const opts = poll.options.map(o => ({
      ...o,
      votes: o.votes + (extraVotes[o.id] || 0)
    }));
    const total = opts.reduce((s, o) => s + o.votes, 0);
    const maxV  = Math.max(...opts.map(o => o.votes));

    // Update vote count
    card.querySelector('.vote-num').textContent = total.toLocaleString();

    opts.forEach(opt => {
      const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
      const isVoted  = myVote === opt.id;
      const isWinner = opt.votes === maxV;

      const el = document.createElement('div');
      el.className = `poll-option${isVoted ? ' voted' : ''}${isWinner && myVote ? ' winner' : ''}${myVote ? ' revealed' : ''}`;
      el.dataset.optId = opt.id;
      el.innerHTML = `
        <div class="poll-bar-bg" data-pct="${pct}"></div>
        <div class="poll-option-inner">
          <img class="poll-opt-img" src="${opt.img}" alt="${opt.label}" loading="lazy" onerror="this.style.display='none'"/>
          <span class="poll-opt-label">${opt.label}</span>
          <span class="poll-opt-pct">${pct}%</span>
        </div>`;

      if (!myVote) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => castVote(poll, opt.id, card));
      }

      optsWrap.appendChild(el);

      // Animate bar if already voted
      if (myVote) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.querySelector('.poll-bar-bg').style.transform = `scaleX(${pct / 100})`;
          }, 100);
        });
      }
    });
  }

  function castVote(poll, optId, card) {
    const state = loadState();
    if (state[`voted_${poll.id}`]) return; // already voted

    // Record vote
    if (!state[`votes_${poll.id}`]) state[`votes_${poll.id}`] = {};
    state[`votes_${poll.id}`][optId] = (state[`votes_${poll.id}`][optId] || 0) + 1;
    state[`voted_${poll.id}`] = optId;
    saveState(state);

    // Animate card
    card.classList.add('just-voted');
    setTimeout(() => card.classList.remove('just-voted'), 400);

    // Re-render options with results
    renderOptions(poll, card, optId, state[`votes_${poll.id}`]);

    // Animate bars
    setTimeout(() => {
      card.querySelectorAll('.poll-bar-bg').forEach(bar => {
        bar.style.transform = `scaleX(${bar.dataset.pct / 100})`;
      });
    }, 50);

    // Confetti
    confettiBurst(card);

    // Toast
    const opt = poll.options.find(o => o.id === optId);
    showToast(`✦ Voted for "${opt?.label}"!`);
  }

  /* ── Create Your Own Poll ──────────────────────────────── */
  function renderCreatePoll(container) {
    const el = document.createElement('div');
    el.className = 'create-poll-card glass';
    el.innerHTML = `
      <h3>✦ Create Your Own Poll</h3>
      <p>Have a burning question for fellow Reese fans? Create a poll and let the community vote!</p>
      <input class="cp-input" id="cp-question" placeholder="Your question (e.g. Best Reese quote?)" maxlength="120"/>
      <div class="cp-options-grid">
        <input class="cp-input" id="cp-opt1" placeholder="Option 1" maxlength="60" style="margin-bottom:0"/>
        <input class="cp-input" id="cp-opt2" placeholder="Option 2" maxlength="60" style="margin-bottom:0"/>
        <input class="cp-input" id="cp-opt3" placeholder="Option 3 (optional)" maxlength="60" style="margin-bottom:0"/>
        <input class="cp-input" id="cp-opt4" placeholder="Option 4 (optional)" maxlength="60" style="margin-bottom:0"/>
      </div>
      <div class="cp-footer">
        <span class="cp-chars" id="cp-chars">0 / 120</span>
        <button class="btn btn-primary" id="cp-submit-btn" style="padding:11px 24px">Launch Poll ✦</button>
      </div>
      <div id="cp-result" style="margin-top:16px;display:none;padding:14px;border-radius:10px;background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.25);color:var(--pink-2);font-weight:700;font-size:.9rem;"></div>
    `;
    container.appendChild(el);

    const qInput = el.querySelector('#cp-question');
    const chars  = el.querySelector('#cp-chars');
    const submitB= el.querySelector('#cp-submit-btn');
    const result = el.querySelector('#cp-result');

    qInput.addEventListener('input', () => {
      chars.textContent = `${qInput.value.length} / 120`;
    });

    submitB.addEventListener('click', () => {
      const q  = qInput.value.trim();
      const o1 = el.querySelector('#cp-opt1').value.trim();
      const o2 = el.querySelector('#cp-opt2').value.trim();
      if (!q || !o1 || !o2) {
        showToast('❗ Please fill in a question and at least 2 options');
        return;
      }
      result.style.display = 'block';
      result.innerHTML = `✦ Poll created! "${q}" — Share it with Reese fans!<br><span style="color:var(--muted);font-size:.8rem;font-weight:400">(Full poll submission coming soon via Hello Sunshine Community)</span>`;
      submitB.textContent = '✓ Submitted!';
      submitB.disabled = true;
      confettiBurst(el);
      showToast('🎉 Your poll was created!');
    });
  }

  /* ── Confetti burst ─────────────────────────────────────── */
  function confettiBurst(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const colors = ['#ec4899','#a855f7','#f59e0b','#7c3aed','#f472b6'];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.cssText = `left:${cx + (Math.random()-0.5)*80}px;top:${cy}px;background:${colors[i%colors.length]};animation-delay:${Math.random()*0.3}s;animation-duration:${0.7+Math.random()*0.5}s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  /* ── Share ──────────────────────────────────────────────── */
  window.shareResult = function(pollId) {
    const poll = POLLS.find(p => p.id === pollId);
    if (!poll) return;
    if (navigator.share) {
      navigator.share({ title: `Reese Witherspoon Fan Poll`, text: poll.question, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${poll.question} — ${window.location.href}`);
      showToast('📋 Link copied!');
    }
  };

  /* ── Toast ──────────────────────────────────────────────── */
  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* ── Mount polls into containers ────────────────────────── */
  function mountPolls() {
    document.querySelectorAll('[data-polls-mount]').forEach(container => {
      container.innerHTML = '';
      const ids = (container.dataset.pollsMount || 'all').split(',').map(s => s.trim());
      const subset = ids[0] === 'all' ? POLLS : POLLS.filter(p => ids.includes(p.id));

      const grid = document.createElement('div');
      grid.className = 'polls-grid';

      subset.forEach(poll => renderPoll(poll, grid));

      if (container.dataset.createPoll !== 'false') {
        renderCreatePoll(grid);
      }

      container.appendChild(grid);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountPolls);
  else mountPolls();

  // Expose showToast globally for other scripts
  window.showToast = showToast;

})();
