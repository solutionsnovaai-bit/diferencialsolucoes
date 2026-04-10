// ═══════════════════════
//   CUSTOM CURSOR
// ═══════════════════════
export function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Ring with lerp
  (function trackRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(trackRing);
  })();

  // Hover targets
  const targets = document.querySelectorAll(
    'a, button, .plano-btn, .plano-card, .feature-card, [data-magnetic]'
  );
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor--hover'));
  });
}
