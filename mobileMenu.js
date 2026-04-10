// ═══════════════════════
//   MOBILE MENU
// ═══════════════════════
export function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const menu      = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  let open = false;

  hamburger.addEventListener('click', () => {
    open = !open;
    hamburger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      hamburger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
