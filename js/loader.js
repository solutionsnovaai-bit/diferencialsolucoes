// ═══════════════════════
//   LOADER
// ═══════════════════════
export function initLoader(onComplete) {
  const loader = document.getElementById('loader');
  if (!loader) { onComplete?.(); return; }

  const DELAY = 2800;

  setTimeout(() => {
    loader.classList.add('hide');
    document.body.classList.remove('loading');

    // Nav visible
    const nav = document.getElementById('nav');
    if (nav) nav.classList.add('visible');

    setTimeout(() => {
      loader.remove();
      onComplete?.();
    }, 1000);
  }, DELAY);
}
