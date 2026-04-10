// ═══════════════════════
//   HERO PARTICLES
// ═══════════════════════
export function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  const COLORS = [
    'rgba(196,149,106,',
    'rgba(160,98,58,',
    'rgba(222,186,150,',
    'rgba(217,196,174,',
    'rgba(92,46,20,',
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor(init) { this.reset(init); }

    reset(init) {
      this.x      = Math.random() * W;
      this.y      = init ? Math.random() * H : H + 8;
      this.size   = Math.random() * 2.5 + 0.3;
      this.alpha  = Math.random() * 0.52 + 0.06;
      this.speed  = Math.random() * 0.5 + 0.1;
      this.drift  = (Math.random() - 0.5) * 0.32;
      this.wobble = Math.random() * Math.PI * 2;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
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

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = Array.from({ length: 110 }, (_, i) => new Particle(true));

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
}
