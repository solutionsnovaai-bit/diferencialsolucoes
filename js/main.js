// ═══════════════════════════════════════════
//   MAIN.JS — Diferencial Soluções × Nova IA
// ═══════════════════════════════════════════
import { initLoader }       from './loader.js';
import { initLenis }        from './lenis.js';
import { initCursor }       from './cursor.js';
import { initGrain }        from './grain.js';
import { initNav }          from './nav.js';
import { initProgressBar }  from './progressBar.js';
import { initHero }         from './hero.js';
import { initParticles }    from './particles.js';
import { initReveals }      from './reveals.js';
import { initCounters }     from './counters.js';
import { initMagnetic }     from './magnetic.js';
import { initCards }        from './cards.js';
import { initExplosion }    from './explosion.js';
import { initVersus }       from './versus.js';
import { initMobileMenu }   from './mobileMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Boot sequence
  const lenis = initLenis();
  initGrain();
  initCursor();
  initMobileMenu();
  initParticles();

  // Loader → then init everything else
  initLoader(() => {
    initNav();
    initProgressBar();
    initHero();
    initReveals();
    initCounters();
    initMagnetic();
    initCards();
    initExplosion();
    initVersus();
  });

  // Lenis ↔ GSAP ticker
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
});
