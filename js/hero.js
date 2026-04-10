// ═══════════════════════
//   HERO ANIMATIONS
// ═══════════════════════
export function initHero() {
  const eyebrow   = document.getElementById('heroEyebrow');
  const logoWrap  = document.getElementById('heroLogoWrap');
  const titleEl   = document.getElementById('heroTitle');
  const sub       = document.getElementById('heroSub');
  const cta       = document.getElementById('heroCta');
  const stats     = document.getElementById('heroStats');
  const scroll    = document.getElementById('heroScroll');
  const heroContent = document.getElementById('heroContent');

  if (!titleEl) return;

  // ── Split title chars ────────────────────────────────────
  const lines = titleEl.querySelectorAll('[data-split]');
  const splits = [];
  lines.forEach(line => {
    const s = new SplitType(line, { types: 'chars' });
    splits.push(s);
    s.chars.forEach(c => { c.style.display = 'inline-block'; });
  });

  // ── Entrance timeline ────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Eyebrow
  tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0);

  // Logo
  tl.to(logoWrap, { opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.15);

  // Title lines chars stagger
  splits.forEach((split, i) => {
    tl.from(split.chars, {
      y: '110%',
      opacity: 0,
      duration: 0.95,
      stagger: 0.025,
      ease: 'power3.out',
    }, 0.35 + i * 0.14);
  });

  // Sub
  tl.to(sub, { opacity: 1, y: 0, duration: 0.8 }, 0.75);

  // CTA
  tl.to(cta, { opacity: 1, y: 0, duration: 0.8 }, 0.9);

  // Stats
  tl.to(stats, { opacity: 1, y: 0, duration: 0.8 }, 1.05);

  // Scroll hint
  tl.to(scroll, { opacity: 1, duration: 0.6 }, 1.4);

  // ── Parallax on scroll ───────────────────────────────────
  gsap.to(heroContent, {
    y: 80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'center top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ── Mouse parallax on rings/glows ───────────────────────
  const hero = document.getElementById('hero');
  if (hero && window.matchMedia('(hover: hover)').matches) {
    const rings = hero.querySelectorAll('.hero__ring');
    const glows = hero.querySelectorAll('.hero__glow');

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;

      gsap.to(rings, { x: cx * 25, y: cy * 15, duration: 1.8, ease: 'power2.out' });
      gsap.to(glows, { x: cx * 40, y: cy * 25, duration: 2,   ease: 'power2.out' });
    });

    hero.addEventListener('mouseleave', () => {
      gsap.to([rings, glows], { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
    });
  }
}
