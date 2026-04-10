// ═══════════════════════
//   CARDS — Spotlight + 3D Tilt
// ═══════════════════════
export function initCards() {
  const isMouse = window.matchMedia('(hover: hover)').matches;

  // ── Spotlight on feature cards ───────────────────────────
  document.querySelectorAll('.feature-card').forEach(card => {
    const spotlight = card.querySelector('.feature-card__spotlight');
    if (!spotlight) return;

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', x);
      card.style.setProperty('--my', y);
    });
  });

  if (!isMouse) return;

  // ── 3D Tilt on plano + feature cards ────────────────────
  document.querySelectorAll('.plano-card, .feature-card').forEach(card => {
    const isPlano = card.classList.contains('plano-card');
    const strength = isPlano ? 7 : 6;
    const lift     = isPlano ? 10 : 12;

    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;

      gsap.to(card, {
        rotateY: cx * strength,
        rotateX: -cy * (strength - 1),
        y: -lift,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 900,
        transformOrigin: 'center center',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0, y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}
