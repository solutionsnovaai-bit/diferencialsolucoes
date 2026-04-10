// ═══════════════════════
//   SCROLL REVEALS
// ═══════════════════════
export function initReveals() {

  // ── Generic reveal-up / reveal-left / reveal-right ──────
  gsap.utils.toArray('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    const delay = parseFloat(el.dataset.delay || '0') * 0.12;

    gsap.fromTo(el,
      {
        opacity: 0,
        y: el.classList.contains('reveal-up')   ? 40  : 0,
        x: el.classList.contains('reveal-left') ? -30 :
           el.classList.contains('reveal-right') ? 30  : 0,
      },
      {
        opacity: 1,
        y: 0, x: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });

  // ── [data-split] section titles ─────────────────────────
  gsap.utils.toArray('[data-split]').forEach(el => {
    // Skip hero (handled in hero.js)
    if (el.closest('#hero')) return;

    const split = new SplitType(el, { types: 'words' });

    gsap.from(split.words, {
      opacity: 0,
      y: 35,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      },
    });
  });

  // ── Plano cards stagger ──────────────────────────────────
  const planoCards = gsap.utils.toArray('.plano-card');
  planoCards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      scale: 0.96,
      duration: 1,
      delay: i * 0.13,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.planos-grid',
        start: 'top 80%',
      },
    });
  });

  // ── Feature cards stagger ────────────────────────────────
  const featureCards = gsap.utils.toArray('.feature-card');
  featureCards.forEach((card, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    gsap.from(card, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.9,
      delay: col * 0.1 + row * 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%',
      },
    });
  });

  // ── Valor table rows ─────────────────────────────────────
  const valorRows = gsap.utils.toArray('.valor-row:not(.valor-row--header)');
  valorRows.forEach((row, i) => {
    gsap.from(row, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.valor-table',
        start: 'top 80%',
      },
    });
  });

  // ── Stats strip ──────────────────────────────────────────
  const statItems = gsap.utils.toArray('.stat-item');
  statItems.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-strip',
        start: 'top 85%',
      },
    });
  });

  // ── Versus items ─────────────────────────────────────────
  // (handled in versus.js)

  // ── Closing logo ─────────────────────────────────────────
  gsap.from('.closing__logo', {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.section--closing',
      start: 'top 75%',
    },
  });

  // ── Footer logo ──────────────────────────────────────────
  gsap.from('.footer__logo', {
    opacity: 0,
    scale: 0.85,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
    },
  });

  // ── Economia bar ─────────────────────────────────────────
  gsap.from('.economia-bar', {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.economia-bar',
      start: 'top 85%',
    },
  });
}
