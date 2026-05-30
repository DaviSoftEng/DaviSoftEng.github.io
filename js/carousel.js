/* ===================================================================
   Carrossel de projetos — roda sozinho em loop, pausa no hover,
   setas, bolinhas, arrastar e encaixe. Sem dependências.
   =================================================================== */
(function () {
  const viewport = document.getElementById('carouselViewport');
  const track    = document.getElementById('carouselTrack');
  const prevBtn  = document.getElementById('carouselPrev');
  const nextBtn  = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');
  if (!viewport || !track) return;

  const originals = Array.from(track.children);
  const N = originals.length;
  if (!N) return;

  const carouselEl   = track.closest('.carousel');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- clones p/ loop infinito ----------
  originals.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.classList.add('in', 'is-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;
    track.appendChild(clone);
  });

  // ---------- medidas ----------
  let cardStep = 0, loopWidth = 0;
  function measure() {
    const w = originals[0].getBoundingClientRect().width;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;
    cardStep = w + gap;
    loopWidth = cardStep * N;
  }
  function index() { return cardStep ? Math.round(viewport.scrollLeft / cardStep) : 0; }

  // ---------- bolinhas ----------
  const dots = originals.map((_, i) => {
    const b = document.createElement('button');
    b.className = 'carousel-dot';
    b.setAttribute('aria-label', 'Ir para o projeto ' + (i + 1));
    b.addEventListener('click', () =>
      viewport.scrollTo({ left: i * cardStep, behavior: reduceMotion ? 'auto' : 'smooth' })
    );
    dotsWrap.appendChild(b);
    return b;
  });
  function syncDots() {
    const idx = ((index() % N) + N) % N;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  let ticking = false;
  viewport.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { syncDots(); ticking = false; });
  });

  // ---------- setas (sempre ativas no loop) ----------
  const nudge = (dir) => viewport.scrollBy({ left: dir * cardStep, behavior: 'smooth' });
  prevBtn.addEventListener('click', () => nudge(-1));
  nextBtn.addEventListener('click', () => nudge(1));

  // ---------- teclado ----------
  viewport.tabIndex = 0;
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); nudge(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
  });

  // ---------- roda sozinho ----------
  const SPEED = 0.6;          // px por frame (~36px/s)
  let paused = false;
  let dragging = false;

  if (carouselEl) {
    carouselEl.addEventListener('pointerenter', () => { paused = true; });
    carouselEl.addEventListener('pointerleave', () => { if (!dragging) paused = false; });
  }

  function tick() {
    if (!paused && !dragging && cardStep) {
      let x = viewport.scrollLeft + SPEED;
      if (x >= loopWidth) x -= loopWidth;     // volta ao início sem emenda
      viewport.scrollLeft = x;
    }
    requestAnimationFrame(tick);
  }

  // ---------- arrastar (mouse + toque) ----------
  let startX = 0, startLeft = 0, moved = false;
  viewport.addEventListener('pointerdown', (e) => {
    dragging = true; moved = false; paused = true;
    startX = e.clientX; startLeft = viewport.scrollLeft;
    viewport.classList.add('dragging');
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    let x = startLeft - dx;
    if (x >= loopWidth) x -= loopWidth;
    else if (x < 0) x += loopWidth;
    viewport.scrollLeft = x;
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('dragging');
    viewport.scrollTo({
      left: Math.round(viewport.scrollLeft / cardStep) * cardStep,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
    if (e && e.pointerType === 'touch') paused = false;   // toque não tem "hover"
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  // não dispara o link se estava arrastando
  track.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  // ---------- entrada em cascata (só nos originais) ----------
  if (reduceMotion || !('IntersectionObserver' in window)) {
    originals.forEach((c) => c.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        originals.forEach((c, i) => { c.style.animationDelay = (i * 0.09) + 's'; c.classList.add('in'); });
        obs.disconnect();
      });
    }, { threshold: 0.15 });
    io.observe(viewport);
  }

  // ---------- init ----------
  window.addEventListener('resize', measure);
  requestAnimationFrame(() => {
    measure();
    syncDots();
    if (!reduceMotion) requestAnimationFrame(tick);
  });
})();
