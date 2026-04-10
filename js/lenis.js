// ═══════════════════════
//   LENIS SMOOTH SCROLL
// ═══════════════════════
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.6,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}
