/* ===================================================================
   Linha elástica — curva na direção do cursor e volta com "molejo".
   Física de mola simples, sem dependências.
   =================================================================== */
(function () {
  const wrap = document.getElementById('elasticLine');
  const path = document.getElementById('elasticPath');
  if (!wrap || !path) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0, h = 0, rest = 0;
  let cur = { x: 0, y: 0 };
  let vel = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let started = false;

  function draw() {
    path.setAttribute('d', `M0 ${rest} Q ${cur.x} ${cur.y} ${w} ${rest}`);
  }

  function measure() {
    const r = wrap.getBoundingClientRect();
    w = r.width; h = r.height; rest = h / 2;
    if (!started) { cur = { x: w / 2, y: rest }; started = true; }
    target = { x: w / 2, y: rest };
    draw();
  }

  // o pico da curva (t=0.5) precisa alcançar o cursor → control = 2*cursor - rest
  wrap.addEventListener('pointermove', (e) => {
    const r = wrap.getBoundingClientRect();
    target = { x: e.clientX - r.left, y: 2 * (e.clientY - r.top) - rest };
  });
  wrap.addEventListener('pointerleave', () => { target = { x: w / 2, y: rest }; });

  const STIFFNESS = 0.08;   // o quanto puxa em direção ao alvo
  const DAMPING   = 0.86;   // o quanto "freia" (quanto menor, mais elástico)

  function frame() {
    vel.x = (vel.x + (target.x - cur.x) * STIFFNESS) * DAMPING;
    vel.y = (vel.y + (target.y - cur.y) * STIFFNESS) * DAMPING;
    cur.x += vel.x;
    cur.y += vel.y;
    draw();
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', measure);
  measure();

  if (reduce) draw();              // mantém a linha reta, sem animação
  else requestAnimationFrame(frame);
})();
