// ═══════════════════════
//   VERSUS SECTION
// ═══════════════════════
export function initVersus() {
  const section = document.querySelector('.section--versus');
  if (!section) return;

  const humanItems = section.querySelectorAll('.versus-col--human .versus-item');
  const aiItems    = section.querySelectorAll('.versus-col--ai    .versus-item');

  // Human items slide from left
  gsap.from(humanItems, {
    opacity: 0,
    x: -25,
    duration: 0.55,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  });

  // AI items slide from right
  gsap.from(aiItems, {
    opacity: 0,
    x: 25,
    duration: 0.55,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  });

  // VS circle pop
  gsap.from('.versus-divider__circle', {
    scale: 0,
    opacity: 0,
    duration: 0.7,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    },
  });

  // VS headers
  gsap.from('.versus-header', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  });
}
