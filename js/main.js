/* ===================================================================
   Interface — menu mobile, header ao rolar, reveal e ano do rodapé.
   =================================================================== */
(function () {
  // Ano automático no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header ganha fundo ao rolar
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Menu mobile
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  // Reveal ao rolar
  const revealEls = document.querySelectorAll(
    '.section-title, .about-photo, .about-text, .about-skills, .contato-text, .contato-links'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
  // ----- Toggle "Ver todos os projetos" -----
  const toggleBtn  = document.getElementById('toggleGrid');
  const grid       = document.getElementById('projectsGrid');
  const carousel   = document.querySelector('.carousel');
  const dotsWrap   = document.getElementById('carouselDots');

  if (toggleBtn && grid && carousel) {
    // popula o grid com cópias dos cards (sem os clones do loop infinito)
    const originals = document.querySelectorAll('#carouselTrack .carousel-card:not(.is-clone)');
    originals.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.remove('carousel-card', 'in');
      clone.style.animationDelay = '';
      grid.appendChild(clone);
    });

    let open = false;
    toggleBtn.addEventListener('click', () => {
      open = !open;
      toggleBtn.classList.toggle('active', open);
      toggleBtn.querySelector('.toggle-label').textContent = open
        ? 'Fechar'
        : 'Ver todos os projetos';

      if (open) {
        carousel.style.display = 'none';
        dotsWrap.style.display = 'none';
        grid.classList.add('open');
        requestAnimationFrame(() => grid.classList.add('visible'));
        grid.setAttribute('aria-hidden', 'false');
      } else {
        grid.classList.remove('visible');
        grid.addEventListener('transitionend', () => {
          grid.classList.remove('open');
        }, { once: true });
        carousel.style.display = '';
        dotsWrap.style.display = '';
        grid.setAttribute('aria-hidden', 'true');
      }
    });
  }
})();
