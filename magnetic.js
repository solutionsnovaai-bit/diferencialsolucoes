// ═══════════════════════
//   MAGNETIC BUTTONS
// ═══════════════════════
export function initMagnetic() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const strength = 0.38;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;

      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}
