/* ============================================================
   CYPHER PORTFOLIO — script.js
   ============================================================ */

// ── Hex Canvas Background ──────────────────────────────────
(function initHexCanvas() {
  const canvas = document.getElementById('hexCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, hexes = [];
  const HEX_SIZE = 38;
  const HEX_GAP = 4;
  const GOLD = 'rgba(200,169,85,';
  const RED = 'rgba(255,70,85,';

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buildGrid();
  }

  function hexPath(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const ang = Math.PI / 3 * i - Math.PI / 6;
      const x = cx + r * Math.cos(ang);
      const y = cy + r * Math.sin(ang);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function buildGrid() {
    hexes = [];
    const s = HEX_SIZE + HEX_GAP;
    const cols = Math.ceil(w / (s * 1.5)) + 2;
    const rows = Math.ceil(h / (s * Math.sqrt(3))) + 2;

    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const cx = c * s * 1.5;
        const cy = r * s * Math.sqrt(3) + (c % 2 === 0 ? 0 : s * Math.sqrt(3) / 2);
        hexes.push({
          cx, cy,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.006,
          baseAlpha: 0.03 + Math.random() * 0.06,
          color: Math.random() > 0.93 ? RED : GOLD
        });
      }
    }
  }

  let raf;
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    hexes.forEach(hex => {
      const alpha = hex.baseAlpha + Math.sin(t * hex.speed + hex.phase) * 0.04;
      ctx.strokeStyle = hex.color + Math.min(1, Math.max(0, alpha)) + ')';
      ctx.lineWidth = 0.8;
      hexPath(hex.cx, hex.cy, HEX_SIZE);
      ctx.stroke();
    });
    raf = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(draw);
})();

// ── Typed Text Effect ─────────────────────────────────────
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Competitive Programmer',
    'Open-Source Enthusiast',
    'ML Explorer'
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false, wait = 0;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        wait = 48;
        return setTimeout(tick, 1800);
      }
    } else {
      if (wait-- > 0) return setTimeout(tick, 20);
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }
  setTimeout(tick, 600);
})();

// ── Navigation scroll state & active link ────────────────
(function initNav() {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled style
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Hamburger Mobile Menu ─────────────────────────────────
(function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });

  // Close on link click
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
})();

// ── Scroll Reveal ─────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

// ── Animated Skill Bars ───────────────────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target;
        const w = target.dataset.width;
        setTimeout(() => { target.style.width = w + '%'; }, 200);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();

// ── Project card stagger ──────────────────────────────────
(function initProjectStagger() {
  const cards = document.querySelectorAll('.project-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 120);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(30px)';
    c.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s';
    obs.observe(c);
  });
})();

// ── Contact Form ──────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitFormBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.innerHTML = '<span class="btn-bracket">[</span> TRANSMISSION SENT ✓ <span class="btn-bracket">]</span>';
    btn.style.background = 'rgba(0,255,200,0.15)';
    btn.style.color = 'var(--green)';
    btn.style.border = '1px solid var(--green)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span class="btn-bracket">[</span> TRANSMIT MESSAGE <span class="btn-bracket">]</span>';
      btn.style.background = '';
      btn.style.color = '';
      btn.style.border = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
})();

// ── Cypher quote rotation on section tag hover ────────────
(function initQuoteHover() {
  const quotes = [
    '"Information is the greatest weapon."',
    '"I see everything. I miss nothing."',
    '"You think I don\'t know your next move?"',
    '"Every secret has a price."'
  ];
  const heroQuote = document.querySelector('.hero-quote em');
  if (!heroQuote) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    heroQuote.style.opacity = '0';
    setTimeout(() => {
      heroQuote.textContent = quotes[idx];
      heroQuote.style.opacity = '1';
    }, 400);
    heroQuote.style.transition = 'opacity 0.4s';
  }, 5000);
})();

// ── Smooth nav link highlight on click ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Tactical Audio & V23 Master Cinematic Controller ───────
(function initAudioAndV23Intro() {
  // ── Global Volume Settings ──
  const HOVER_VOLUME = 0.06; // Soft, delicate, non-intrusive HUD hover
  const CLICK_VOLUME = 0.40; // Crisp button click
  let sfxMuted = false;

  // Dedicated Audio Pool for Hover
  const HOVER_POOL_SIZE = 6;
  const hoverPool = Array.from({ length: HOVER_POOL_SIZE }, () => {
    const a = new Audio('hover.mp3');
    a.preload = 'auto';
    a.volume = HOVER_VOLUME;
    return a;
  });
  let hoverPoolIdx = 0;

  const clickAudio = new Audio('click button.mp3');
  clickAudio.preload = 'auto';
  clickAudio.volume = CLICK_VOLUME;

  // Unlock browser audio restrictions on initial interaction
  let audioUnlocked = false;
  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    hoverPool[0].play().then(() => {
      hoverPool[0].pause();
      hoverPool[0].currentTime = 0;
    }).catch(() => {});

    clickAudio.play().then(() => {
      clickAudio.pause();
      clickAudio.currentTime = 0;
    }).catch(() => {});

    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  }
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });

  function playHover() {
    if (sfxMuted) return;
    try {
      const sound = hoverPool[hoverPoolIdx];
      hoverPoolIdx = (hoverPoolIdx + 1) % HOVER_POOL_SIZE;
      sound.volume = HOVER_VOLUME;
      sound.currentTime = 0;
      const p = sound.play();
      if (p !== undefined) p.catch(() => {});
    } catch (_) {}
  }

  function playClick() {
    if (sfxMuted) return;
    try {
      const sound = clickAudio.cloneNode();
      sound.volume = CLICK_VOLUME;
      const p = sound.play();
      if (p !== undefined) p.catch(() => {});
    } catch (_) {
      try {
        clickAudio.currentTime = 0;
        clickAudio.volume = CLICK_VOLUME;
        clickAudio.play().catch(() => {});
      } catch (__) {}
    }
  }

  // Throttle hover sounds (140ms)
  let lastHoverTime = 0;
  function triggerHover() {
    const now = Date.now();
    if (now - lastHoverTime < 140) return;
    lastHoverTime = now;
    playHover();
  }

  const BUTTON_SELECTOR = 'button, .btn, .nav-link, .mob-link, .contact-link, .hamburger, [role="button"], input[type="submit"], .ptag-live, .sfx-toggle-btn, .btn-replay-footer';
  const CARD_SELECTOR   = '.hud-card, .interest-card, .stat-item, .cypher-frame';
  const HOVER_SELECTOR  = `${BUTTON_SELECTOR}, ${CARD_SELECTOR}`;

  function bindHoverListeners() {
    const targets = document.querySelectorAll(HOVER_SELECTOR);
    targets.forEach(el => {
      if (el.dataset.sfxHoverBound) return;
      el.dataset.sfxHoverBound = 'true';
      el.addEventListener('mouseenter', triggerHover);
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest(BUTTON_SELECTOR);
    if (btn) {
      playClick();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHoverListeners);
  } else {
    bindHoverListeners();
  }

  // ── V23 Cinematic Master Sequence Controller ─────────────
  const introContainer = document.getElementById('v23-intro-container');
  const splash = document.getElementById('splash');
  const skipBtn = document.getElementById('v23-skip-btn');
  const media = document.getElementById('reveal-media');
  const navLogo = document.querySelector('.nav-logo');
  const targetLogoText = document.querySelector('.nav-logo .logo-text');
  const replayFooterBtn = document.getElementById('replayIntroFooterBtn');
  const sfxToggleBtn = document.getElementById('sfxToggleBtn');
  const sfxIcon = document.getElementById('sfxIcon');
  const sfxLabel = document.getElementById('sfxLabel');

  if (!introContainer) return;

  // Scene elements
  const sc4 = document.getElementById('scene-v4');
  const v4p1 = document.getElementById('v4-phase-1');
  const v4p2 = document.getElementById('v4-phase-2');
  const fSlab = document.getElementById('f-slab');
  const rightVoid = document.getElementById('right-void');
  const sc9 = document.getElementById('scene-v9');
  const sc10 = document.getElementById('scene-v10');
  const sc12 = document.getElementById('scene-v12');
  const sc13 = document.getElementById('scene-v13');
  const sc20 = document.getElementById('scene-v20');
  const scG5 = document.getElementById('stage-g5');
  const scG6 = document.getElementById('stage-g6');
  const scG7 = document.getElementById('stage-g7');
  const g7Name = document.getElementById('g7-floating-name');

  const wait = ms => new Promise(res => setTimeout(res, ms));

  function resetElementAnimations(container) {
    if (!container) return;
    const els = container.querySelectorAll('*');
    els.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
  }

  function hideAllScenes() {
    [sc4, v4p1, v4p2, sc9, sc10, sc12, sc13, sc20, scG5, scG6, scG7].forEach(s => {
      if (s) s.style.display = 'none';
    });
  }

  let audioFadeTimer = null;

  function startMedia(time = 0) {
    if (!media || sfxMuted) return;
    if (audioFadeTimer) {
      clearInterval(audioFadeTimer);
      audioFadeTimer = null;
    }
    try {
      media.volume = 1.0;
      media.currentTime = time;
      media.muted = false;
      const p = media.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}
  }

  function fadeOutMedia(durationMs = 2800) {
    if (!media) return;
    if (audioFadeTimer) {
      clearInterval(audioFadeTimer);
      audioFadeTimer = null;
    }
    const startVolume = media.volume || 1.0;
    const intervalMs = 40;
    const steps = Math.max(1, Math.floor(durationMs / intervalMs));
    const stepDec = startVolume / steps;

    audioFadeTimer = setInterval(() => {
      if (!media) {
        clearInterval(audioFadeTimer);
        audioFadeTimer = null;
        return;
      }
      if (media.volume > stepDec) {
        media.volume = Math.max(0, media.volume - stepDec);
      } else {
        media.volume = 0;
        clearInterval(audioFadeTimer);
        audioFadeTimer = null;
        media.pause();
        media.currentTime = 0;
        media.volume = 1.0;
      }
    }, intervalMs);
  }

  function stopMedia() {
    if (!media) return;
    if (audioFadeTimer) {
      clearInterval(audioFadeTimer);
      audioFadeTimer = null;
    }
    try {
      media.pause();
      media.currentTime = 0;
      media.volume = 1.0;
    } catch (e) {}
  }

  let introRunning = false;
  let introCompleted = false;

  async function playFullSequence() {
    if (introRunning) return;
    introRunning = true;
    introCompleted = false;

    // Reset container & visual state
    introContainer.classList.remove('intro-hidden');
    introContainer.style.display = 'block';
    introContainer.style.opacity = '1';
    introContainer.style.background = '#07070F';
    introContainer.style.pointerEvents = 'all';
    if (g7Name) {
      g7Name.style.opacity = '1';
      g7Name.classList.remove('dock-to-navbar');
      g7Name.style.transform = '';
    }

    hideAllScenes();
    startMedia(0);

    // STEP 1: SCENE V4 (F-BUILD) — (~1.0s)
    if (sc4) sc4.style.display = 'block';
    if (v4p1) {
      resetElementAnimations(v4p1);
      v4p1.style.display = 'block';
    }
    if (v4p2) v4p2.style.display = 'none';
    await wait(420);
    if (!introRunning) return;

    if (v4p1) v4p1.style.display = 'none';
    if (v4p2) {
      resetElementAnimations(v4p2);
      v4p2.style.display = 'block';
    }
    if (fSlab) fSlab.style.animation = 'slabElevateUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    if (rightVoid) rightVoid.style.animation = 'rightSideOpen 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
    await wait(580);
    if (!introRunning) return;

    // STEP 2: SCENE V9 (TRUE MM ARCHITECTURE) — (~950ms)
    if (sc4) sc4.style.display = 'none';
    if (sc9) {
      resetElementAnimations(sc9);
      sc9.style.display = 'block';
    }
    await wait(950);
    if (!introRunning) return;

    // STEP 3: SCENE V10 (NVIR RED BUILD) — (~900ms)
    if (sc9) sc9.style.display = 'none';
    if (sc10) {
      resetElementAnimations(sc10);
      sc10.style.display = 'block';
    }
    await wait(900);
    if (!introRunning) return;

    // STEP 4: SCENE V12 ("T V R" RED SNAP & SPREAD) — (~680ms)
    if (sc10) sc10.style.display = 'none';
    if (sc12) {
      resetElementAnimations(sc12);
      sc12.style.display = 'block';
    }
    await wait(680);
    if (!introRunning) return;

    // STEP 5: SCENE V13 ("AHAMMAD" OPPOSING TRACKS) — (~480ms)
    if (sc12) sc12.style.display = 'none';
    if (sc13) {
      resetElementAnimations(sc13);
      sc13.style.display = 'block';
    }
    await wait(480);
    if (!introRunning) return;

    // STEP 6: SCENE V20 ("FAHIM" HIGHWAY CROSS-OVER) — (~1.1s)
    if (sc13) sc13.style.display = 'none';
    if (sc20) {
      resetElementAnimations(sc20);
      sc20.style.display = 'block';
    }
    await wait(1100);
    if (!introRunning) return;

    // STEP 7: STAGE G5 (CYBER-GLITCH ASSEMBLE) — (~750ms)
    if (sc20) sc20.style.display = 'none';
    if (scG5) {
      resetElementAnimations(scG5);
      scG5.style.display = 'block';
    }
    await wait(750);
    if (!introRunning) return;

    // STEP 8: STAGE G6 (CRIMSON SHOCK & 3-PIECE T DROP) — (~1.1s)
    if (scG5) scG5.style.display = 'none';
    if (scG6) {
      resetElementAnimations(scG6);
      scG6.style.display = 'block';
    }
    await wait(1100);
    if (!introRunning) return;

    // STEP 9: STAGE G7 (VOID MONOLITHIC LOCKUP) — Stretched hold 2.6s so outro music resonates
    if (scG6) scG6.style.display = 'none';
    if (scG7) {
      resetElementAnimations(scG7);
      scG7.style.display = 'block';
    }
    await wait(2600);
    if (!introRunning) return;

    // AUTOMATIC SIGNATURE DOCKING TRANSITION
    transitionIntroToNavbar();
  }

  // ── Automatic Docking of FAHIM AHAMMAD TANVIR into Navbar Logo ──
  function transitionIntroToNavbar() {
    if (introCompleted) return;
    introCompleted = true;
    introRunning = false;

    if (!g7Name || !targetLogoText) {
      finishIntroInstant();
      return;
    }

    try {
      const startRect = g7Name.getBoundingClientRect();
      const targetRect = targetLogoText.getBoundingClientRect();

      if (!startRect.width || !startRect.height) {
        finishIntroInstant();
        return;
      }

      // Smoothly stretch and fade out audio as transition begins
      fadeOutMedia(2600);

      // Temporarily hide target logo text in navbar while traveler flies
      targetLogoText.style.opacity = '0';

      // Create floating clone
      const flyer = g7Name.cloneNode(true);
      flyer.id = 'v23-flying-logo';
      flyer.style.position = 'fixed';
      flyer.style.left = startRect.left + 'px';
      flyer.style.top = startRect.top + 'px';
      flyer.style.width = startRect.width + 'px';
      flyer.style.height = startRect.height + 'px';
      flyer.style.zIndex = '10050';
      flyer.style.fontFamily = "'Valorant', sans-serif";
      flyer.style.fontSize = '42px';
      flyer.style.letterSpacing = '0.14em';
      flyer.style.color = 'var(--val-red)';
      flyer.style.filter = 'drop-shadow(0 0 16px rgba(255, 70, 85, 0.8))';
      flyer.style.transformOrigin = 'top left';
      flyer.style.pointerEvents = 'none';
      flyer.style.margin = '0';
      flyer.style.display = 'flex';
      flyer.style.alignItems = 'baseline';
      flyer.style.justifyContent = 'center';
      document.body.appendChild(flyer);

      // Hide original monolith name in intro
      g7Name.style.opacity = '0';

      // Fade out the intro overlay background smoothly
      introContainer.style.transition = 'opacity 0.85s ease';
      introContainer.style.opacity = '0';

      // Calculate translation and scale
      const scaleX = targetRect.width / (startRect.width || 1);
      const scaleY = targetRect.height / (startRect.height || 1);
      const scale = Math.min(scaleX, scaleY) || 0.36;
      const dx = targetRect.left - startRect.left;
      const dy = targetRect.top - startRect.top;

      // Force layout & animate
      flyer.offsetHeight;
      flyer.style.transition = 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s ease, filter 0.8s ease';
      flyer.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      flyer.style.color = '#ffffff';
      flyer.style.filter = 'drop-shadow(0 0 10px rgba(200, 169, 85, 0.6))';

      setTimeout(() => {
        targetLogoText.style.opacity = '1';
        if (navLogo) navLogo.classList.add('logo-docked-glow');
        if (flyer.parentNode) flyer.parentNode.removeChild(flyer);
        introContainer.style.display = 'none';
        introContainer.classList.add('intro-hidden');
      }, 980);

    } catch (err) {
      finishIntroInstant();
    }
  }

  function finishIntroInstant() {
    introRunning = false;
    introCompleted = true;
    fadeOutMedia(600);
    if (g7Name) g7Name.style.opacity = '1';
    if (targetLogoText) targetLogoText.style.opacity = '1';
    if (navLogo) navLogo.classList.add('logo-docked-glow');
    introContainer.style.transition = 'opacity 0.4s ease';
    introContainer.style.opacity = '0';
    setTimeout(() => {
      introContainer.style.display = 'none';
      introContainer.classList.add('intro-hidden');
    }, 420);
  }

  // Splash click (starts sequence with user gesture)
  if (splash) {
    const handleSplashClick = (e) => {
      if (e) e.stopPropagation();
      splash.classList.add('hide');
      splash.style.display = 'none';
      playFullSequence();
    };
    splash.addEventListener('click', handleSplashClick);
  }

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      transitionIntroToNavbar();
    });
  }

  // Footer Replay Intro Button
  if (replayFooterBtn) {
    replayFooterBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      introContainer.classList.remove('intro-hidden');
      introContainer.style.display = 'block';
      introContainer.offsetHeight;
      introContainer.style.opacity = '1';
      if (splash) {
        splash.classList.add('hide');
        splash.style.display = 'none';
      }
      playFullSequence();
    });
  }

  // Mini Discreet SFX Toggle Button
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfxMuted = !sfxMuted;
      if (sfxMuted) {
        sfxToggleBtn.classList.add('muted');
        if (sfxIcon) sfxIcon.textContent = '🔇';
        if (sfxLabel) sfxLabel.textContent = 'SFX: OFF';
        if (media) media.muted = true;
      } else {
        sfxToggleBtn.classList.remove('muted');
        if (sfxIcon) sfxIcon.textContent = '🔊';
        if (sfxLabel) sfxLabel.textContent = 'SFX: ON';
        if (media) media.muted = false;
      }
    });
  }
})();
