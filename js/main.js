/* ═══════════════════════════════════════
   DIFERENCIAL SOLUÇÕES × NOVA AI  v4
   main.js
═══════════════════════════════════════ */

/* ─ LOADER ─ */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
    document.body.classList.remove('loading');
    setTimeout(() => loader.remove(), 950);
    initHeroTitle();
  }, 2500);
});

/* ─ NAV SCROLL ─ */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─ PARTICLE CANVAS ─ */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resizeCanvas() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); }, { passive: true });

const PCOLORS = [
  'rgba(196,149,106,','rgba(160,98,58,',
  'rgba(222,186,150,','rgba(217,196,174,'
];

class Particle {
  constructor(init) { this.reset(init); }
  reset(init) {
    this.x      = Math.random() * W;
    this.y      = init ? Math.random() * H : H + 8;
    this.size   = Math.random() * 2.4 + 0.3;
    this.alpha  = Math.random() * 0.55 + 0.07;
    this.speed  = Math.random() * 0.48 + 0.1;
    this.drift  = (Math.random() - 0.5) * 0.32;
    this.wobble = Math.random() * Math.PI * 2;
    this.color  = PCOLORS[Math.floor(Math.random() * PCOLORS.length)];
  }
  update() {
    this.y      -= this.speed;
    this.wobble += 0.016;
    this.x      += this.drift + Math.sin(this.wobble) * 0.22;
    this.alpha  -= 0.00065;
    if (this.y < -10 || this.alpha <= 0) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  }
}

const particles = Array.from({ length: 110 }, (_, i) => new Particle(true));

(function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
})();

/* ─ HERO TITLE CHAR SPLIT ─ */
function initHeroTitle() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  title.querySelectorAll('.line').forEach((line, li) => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach((ch, ci) => {
      const span = document.createElement('span');
      span.className = 'char' + (ch === ' ' ? ' sp' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.transitionDelay = (0.04 + li * 0.18 + ci * 0.026) + 's';
      line.appendChild(span);
    });
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    title.querySelectorAll('.char').forEach(c => c.classList.add('vis'));
  }));
}

/* ─ CARD SPOTLIGHT ─ */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
  });
});

/* ─ 3D TILT ALL CARDS ─ */
document.querySelectorAll('.plano-card, .feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    const isPlano = card.classList.contains('plano-card');
    const strength = isPlano ? 7 : 6;
    card.style.transform = `translateY(-${isPlano?10:12}px) rotateY(${cx * strength}deg) rotateX(${-cy * (strength-1)}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ─ EXPLOSION ON CLICK ─ */
function explode(x, y, count = 24) {
  for (let i = 0; i < count; i++) {
    const el    = document.createElement('div');
    el.className = 'explosion-particle';
    const size  = Math.random() * 9 + 3;
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
    const dist  = Math.random() * 130 + 50;
    const colors = ['#C4956A','#5C2E14','#DEBA96','#9E6E45','#A0623A'];
    el.style.cssText = `
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${x}px;top:${y}px;
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
      animation-duration:${0.5+Math.random()*0.45}s;
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}
document.querySelectorAll('.btn-primary,.btn-ghost,.plano-btn').forEach(btn => {
  btn.addEventListener('click', e => explode(e.clientX, e.clientY));
});

/* ─ VERSUS STAGGER ─ */
const versusObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.versus-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('animated'), i * 110);
      });
      versusObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
const versusSection = document.querySelector('.versus-section');
if (versusSection) versusObs.observe(versusSection);

/* ─ NUMBER COUNTERS ─ */
function animateCount(el, target, prefix, suffix, duration) {
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    el.textContent = prefix + v.toLocaleString('pt-BR') + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, +el.dataset.target, el.dataset.prefix||'', el.dataset.suffix||'', 1800);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ─ SCROLL REVEAL ─ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─ PARALLAX HERO ─ */
const heroContent = document.querySelector('.hero-content');
const heroGlow    = document.querySelector('.hero-glow');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroContent) heroContent.style.transform = `translateY(${y * 0.15}px)`;
  if (heroGlow)    heroGlow.style.transform    = `translateY(${y * 0.06}px)`;
}, { passive: true });

/* ─ SMOOTH ANCHOR ─ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
