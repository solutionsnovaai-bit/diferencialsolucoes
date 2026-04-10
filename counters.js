// ═══════════════════════
//   ANIMATED COUNTERS
// ═══════════════════════
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    gsap.to({ val: 0 }, {
      val: target,
      duration: 2.4,
      ease: 'power2.out',
      onUpdate: function () {
        const v = Math.round(this.targets()[0].val);
        el.textContent = prefix + v.toLocaleString('pt-BR') + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}
