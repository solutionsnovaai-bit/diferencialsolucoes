// ═══════════════════════
//   PROGRESS BAR
// ═══════════════════════
export function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      gsap.set(bar, { width: `${self.progress * 100}%` });
    },
  });
}
