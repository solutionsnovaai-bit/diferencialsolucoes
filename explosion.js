// ═══════════════════════
//   EXPLOSION PARTICLES
// ═══════════════════════
const COLORS = ['#C4956A', '#5C2E14', '#DEBA96', '#9E6E45', '#A0623A', '#EAD8C4'];

function explode(x, y, count = 26) {
  for (let i = 0; i < count; i++) {
    const el    = document.createElement('div');
    el.className = 'explosion-particle';

    const size  = Math.random() * 9 + 3;
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.6;
    const dist  = Math.random() * 140 + 55;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${Math.sin(angle) * dist}px;
      animation-duration: ${0.5 + Math.random() * 0.45}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;

    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

export function initExplosion() {
  document.querySelectorAll('.btn, .plano-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      explode(e.clientX, e.clientY);
    });
  });
}
