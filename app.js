/* ═══════════════════════════════════════════════════════════
   DIFERENCIAL SOLUÇÕES × NOVA IA SOLUTIONS
   app.js — Consolidated (no ES modules required)
   v2.1 — Fixed
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── GSAP plugins ─────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────────────────────────────────
  //  LENIS SMOOTH SCROLL
  // ─────────────────────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ─────────────────────────────────────────────────────────
  //  GRAIN CANVAS
  // ─────────────────────────────────────────────────────────
  function initGrain() {
    const canvas = document.getElementById('grainCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function renderGrain() {
      const w = canvas.width, h = canvas.height;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i+1] = d[i+2] = v;
        d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(renderGrain);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    renderGrain();
  }

  // ─────────────────────────────────────────────────────────
  //  PARTICLES
  // ─────────────────────────────────────────────────────────
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const COLORS = [
      'rgba(196,149,106,', 'rgba(160,98,58,',
      'rgba(222,186,150,', 'rgba(217,196,174,', 'rgba(92,46,20,',
    ];
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    function Particle(init) { this.reset(init); }
    Particle.prototype.reset = function(init) {
      this.x      = Math.random() * W;
      this.y      = init ? Math.random() * H : H + 8;
      this.size   = Math.random() * 2.5 + 0.3;
      this.alpha  = Math.random() * 0.5 + 0.06;
      this.speed  = Math.random() * 0.5 + 0.1;
      this.drift  = (Math.random() - 0.5) * 0.32;
      this.wobble = Math.random() * Math.PI * 2;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    };
    Particle.prototype.update = function() {
      this.y -= this.speed;
      this.wobble += 0.016;
      this.x += this.drift + Math.sin(this.wobble) * 0.22;
      this.alpha -= 0.00065;
      if (this.y < -10 || this.alpha <= 0) this.reset(false);
    };
    Particle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const pts = [];
    for (let i = 0; i < 110; i++) pts.push(new Particle(true));
    (function animate() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function(p) { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    })();
  }

  // ─────────────────────────────────────────────────────────
  //  CUSTOM CURSOR
  // ─────────────────────────────────────────────────────────
  function initCursor() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX; my = e.clientY;
      gsap.set(cursor, { x: mx, y: my });
    });
    (function track() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(track);
    })();
    document.querySelectorAll('a, button, .plano-btn, .plano-card, .feature-card, [data-magnetic]').forEach(function(el) {
      el.addEventListener('mouseenter', function() { document.body.classList.add('cursor--hover'); });
      el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor--hover'); });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  NAV
  // ─────────────────────────────────────────────────────────
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: function(self) {
        nav.classList.toggle('scrolled', self.progress > 0);
      },
    });
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  PROGRESS BAR
  // ─────────────────────────────────────────────────────────
  function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    ScrollTrigger.create({
      start: 'top top', end: 'bottom bottom',
      onUpdate: function(self) { gsap.set(bar, { width: (self.progress * 100) + '%' }); },
    });
  }

  // ─────────────────────────────────────────────────────────
  //  HERO ANIMATIONS
  // ─────────────────────────────────────────────────────────
  function initHero() {
    const eyebrow  = document.getElementById('heroEyebrow');
    const logoWrap = document.getElementById('heroLogoWrap');
    const titleEl  = document.getElementById('heroTitle');
    const sub      = document.getElementById('heroSub');
    const cta      = document.getElementById('heroCta');
    const stats    = document.getElementById('heroStats');
    const scroll   = document.getElementById('heroScroll');
    const content  = document.getElementById('heroContent');
    if (!titleEl) return;

    // SplitType on title lines
    const lines = titleEl.querySelectorAll('[data-split]');
    var splits = [];
    lines.forEach(function(line) {
      var s = new SplitType(line, { types: 'chars' });
      splits.push(s);
      s.chars.forEach(function(c) { c.style.display = 'inline-block'; });
    });

    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    if (eyebrow)  tl.to(eyebrow,  { opacity: 1, y: 0, duration: 0.8 }, 0);
    if (logoWrap) tl.to(logoWrap, { opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.15);

    splits.forEach(function(split, i) {
      tl.from(split.chars, {
        y: '110%', opacity: 0,
        duration: 0.95, stagger: 0.025, ease: 'power3.out',
      }, 0.35 + i * 0.14);
    });

    if (sub)    tl.to(sub,    { opacity: 1, y: 0, duration: 0.8 }, 0.75);
    if (cta)    tl.to(cta,    { opacity: 1, y: 0, duration: 0.8 }, 0.9);
    if (stats)  tl.to(stats,  { opacity: 1, y: 0, duration: 0.8 }, 1.05);
    if (scroll) tl.to(scroll, { opacity: 1, duration: 0.6 }, 1.4);

    // Parallax fade on scroll
    if (content) {
      gsap.to(content, {
        y: 80, opacity: 0, ease: 'none',
        scrollTrigger: {
          trigger: '#hero', start: 'center top', end: 'bottom top', scrub: true,
        },
      });
    }

    // Mouse parallax
    var hero = document.getElementById('hero');
    if (hero && window.matchMedia('(hover: hover)').matches) {
      var rings = hero.querySelectorAll('.hero__ring');
      var glows = hero.querySelectorAll('.hero__glow');
      hero.addEventListener('mousemove', function(e) {
        var r = hero.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width  - 0.5;
        var cy = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(rings, { x: cx*25, y: cy*15, duration: 1.8, ease: 'power2.out' });
        gsap.to(glows, { x: cx*40, y: cy*25, duration: 2,   ease: 'power2.out' });
      });
      hero.addEventListener('mouseleave', function() {
        gsap.to([rings, glows], { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  //  SCROLL REVEALS (all using fromTo for safety)
  // ─────────────────────────────────────────────────────────
  function initReveals() {
    // reveal-up
    gsap.utils.toArray('.reveal-up').forEach(function(el) {
      var delay = parseFloat(el.dataset.delay || '0') * 0.12;
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, delay: delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // reveal-left
    gsap.utils.toArray('.reveal-left').forEach(function(el) {
      gsap.fromTo(el, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // reveal-right
    gsap.utils.toArray('.reveal-right').forEach(function(el) {
      gsap.fromTo(el, { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // Section titles
    gsap.utils.toArray('[data-split]').forEach(function(el) {
      if (el.closest('#hero')) return;
      var split = new SplitType(el, { types: 'words' });
      gsap.from(split.words, {
        opacity: 0, y: 35, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      });
    });

    // Plano cards
    gsap.utils.toArray('.plano-card').forEach(function(card, i) {
      gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1,
        duration: 1, delay: i * 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: '.planos-grid', start: 'top 82%' },
      });
    });

    // Feature cards
    gsap.utils.toArray('.feature-card').forEach(function(card, i) {
      var col = i % 3, row = Math.floor(i / 3);
      gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9, delay: col * 0.1 + row * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 82%' },
      });
    });

    // Valor rows
    gsap.utils.toArray('.valor-row:not(.valor-row--header)').forEach(function(row, i) {
      gsap.fromTo(row, { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.valor-table', start: 'top 82%' },
      });
    });

    // Stats
    gsap.utils.toArray('.stat-item').forEach(function(item, i) {
      gsap.fromTo(item, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-strip', start: 'top 88%' },
      });
    });

    // Closing logo
    var closingLogo = document.querySelector('.closing__logo-wrap');
    if (closingLogo) {
      gsap.fromTo(closingLogo, { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.section--closing', start: 'top 78%' },
      });
    }

    // Footer
    var footerLogo = document.querySelector('.footer__logo');
    if (footerLogo) {
      gsap.fromTo(footerLogo, { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 92%' },
      });
    }

    // Economia bar
    var ecoBar = document.querySelector('.economia-bar');
    if (ecoBar) {
      gsap.fromTo(ecoBar, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ecoBar, start: 'top 88%' },
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  //  COUNTERS
  // ─────────────────────────────────────────────────────────
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(function(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      gsap.to({ val: 0 }, {
        val: target, duration: 2.4, ease: 'power2.out',
        onUpdate: function() {
          el.textContent = prefix + Math.round(this.targets()[0].val).toLocaleString('pt-BR') + suffix;
        },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  MAGNETIC BUTTONS
  // ─────────────────────────────────────────────────────────
  function initMagnetic() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(function(el) {
      el.addEventListener('mousemove', function(e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width  / 2);
        var dy = e.clientY - (r.top  + r.height / 2);
        gsap.to(el, { x: dx * 0.38, y: dy * 0.38, duration: 0.5, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', function() {
        gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  CARDS — Spotlight + 3D Tilt
  // ─────────────────────────────────────────────────────────
  function initCards() {
    var isMouse = window.matchMedia('(hover: hover)').matches;

    document.querySelectorAll('.feature-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
      });
    });

    if (!isMouse) return;

    document.querySelectorAll('.plano-card, .feature-card').forEach(function(card) {
      var isPlano  = card.classList.contains('plano-card');
      var strength = isPlano ? 7 : 6;
      var lift     = isPlano ? 10 : 12;
      card.addEventListener('mousemove', function(e) {
        var r  = card.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width  - 0.5;
        var cy = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotateY: cx * strength, rotateX: -cy * (strength - 1), y: -lift,
          duration: 0.4, ease: 'power2.out',
          transformPerspective: 900, transformOrigin: 'center center',
        });
      });
      card.addEventListener('mouseleave', function() {
        gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  EXPLOSION PARTICLES
  // ─────────────────────────────────────────────────────────
  function initExplosion() {
    var COLS = ['#C4956A', '#5C2E14', '#DEBA96', '#9E6E45', '#A0623A', '#EAD8C4'];
    function explode(x, y) {
      for (var i = 0; i < 26; i++) {
        var el    = document.createElement('div');
        el.className = 'explosion-particle';
        var size  = Math.random() * 9 + 3;
        var angle = (Math.PI * 2 / 26) * i + (Math.random() - 0.5) * 0.6;
        var dist  = Math.random() * 140 + 55;
        var color = COLS[Math.floor(Math.random() * COLS.length)];
        el.style.cssText = 'width:' + size + 'px;height:' + size + 'px;background:' + color + ';left:' + x + 'px;top:' + y + 'px;--tx:' + (Math.cos(angle) * dist) + 'px;--ty:' + (Math.sin(angle) * dist) + 'px;animation-duration:' + (0.5 + Math.random() * 0.45) + 's;border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';';
        document.body.appendChild(el);
        el.addEventListener('animationend', function() { this.remove(); });
      }
    }
    document.querySelectorAll('.btn, .plano-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) { explode(e.clientX, e.clientY); });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  VERSUS ANIMATIONS
  // ─────────────────────────────────────────────────────────
  function initVersus() {
    var section = document.querySelector('.section--versus');
    if (!section) return;
    var humanItems = section.querySelectorAll('.versus-col--human .versus-item');
    var aiItems    = section.querySelectorAll('.versus-col--ai .versus-item');
    gsap.from(humanItems, {
      opacity: 0, x: -25, duration: 0.55, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%' },
    });
    gsap.from(aiItems, {
      opacity: 0, x: 25, duration: 0.55, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%' },
    });
    gsap.from('.versus-divider__circle', {
      scale: 0, opacity: 0, duration: 0.7, ease: 'back.out(2)',
      scrollTrigger: { trigger: section, start: 'top 70%' },
    });
    gsap.from('.versus-header', {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    });
  }

  // ─────────────────────────────────────────────────────────
  //  MOBILE MENU
  // ─────────────────────────────────────────────────────────
  function initMobileMenu() {
    var hamburger = document.getElementById('navHamburger');
    var menu      = document.getElementById('mobileMenu');
    if (!hamburger || !menu) return;
    var open = false;
    hamburger.addEventListener('click', function() {
      open = !open;
      hamburger.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('.mobile-menu__link').forEach(function(link) {
      link.addEventListener('click', function() {
        open = false;
        hamburger.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  //  LOADER
  // ─────────────────────────────────────────────────────────
  function initLoader(onComplete) {
    var loader = document.getElementById('loader');
    if (!loader) { onComplete && onComplete(); return; }
    setTimeout(function() {
      loader.classList.add('hide');
      document.body.classList.remove('loading');
      var nav = document.getElementById('nav');
      if (nav) nav.classList.add('visible');
      setTimeout(function() {
        loader.remove();
        onComplete && onComplete();
      }, 1000);
    }, 2800);
  }

  // ─────────────────────────────────────────────────────────
  //  BOOT
  // ─────────────────────────────────────────────────────────
  function boot() {
    initGrain();
    initParticles();
    initCursor();
    initMobileMenu();

    initLoader(function() {
      initNav();
      initProgressBar();
      initHero();
      initReveals();
      initCounters();
      initMagnetic();
      initCards();
      initExplosion();
      initVersus();
    });
  }

  // DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
