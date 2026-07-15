/* ==========================================================================
   NUESTRA HISTORIA — Juan ❤ María José
   script.js — partículas de fondo, cursor, transición cinematográfica,
   libro 3D con paso de páginas y efecto máquina de escribir, extras.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     0. TEXTOS DE LA HISTORIA
     ------------------------------------------------------------------ */
  const STORY = {
    PAGE1: `Todo comenzó en un aula cualquiera, en una clase de fotografía que parecía un día más. Pero desde el instante en que te vi, supe que no lo era. Había algo en ti, en la forma en que mirabas el mundo a través de un lente, que detuvo el tiempo por un segundo. Tus ojos hablaban antes de que abrieras la boca, y tu mirada tenía una calma que yo nunca había sentido junto a nadie. Cuando por fin hablaste, tu voz terminó de convencerme: quería seguir escuchándote toda la vida.`,

    PAGE2: `Desde ese primer instante solo tuve un deseo, pequeño y enorme a la vez: conocerte de verdad. Descubrir quién eras detrás de esa sonrisa. Soñaba, casi en secreto, con que compartiéramos el mismo sentido del humor, con que nuestras conversaciones no tuvieran final, con que fueras esa persona que tantas veces imaginé sin saber que ya existía. No lo sabía todavía, pero estaba a punto de encontrar a mi otra mitad. Y el destino, con su paciencia de siempre, ya había empezado a acomodar las piezas.`,

    PAGE3: `Ser tu amigo fue una de las etapas más felices que recuerdo. Cada conversación se sentía como un regalo, cada risa tuya se volvía mi razón favorita del día. Y sin embargo, debajo de esa amistad tan bonita, había algo más: una tensión dulce, silenciosa, que los dos sentíamos pero que ninguno se atrevía a nombrar. Era ese tipo de silencio que dice más que cualquier palabra, ese que se queda flotando entre dos personas que ya se eligieron sin decirlo en voz alta.`,

    PAGE4: `Yo no me atrevía a dar el paso. Mi vida en ese momento no era la más sencilla, y tenía miedo, un miedo muy real, de arriesgar lo que ya teníamos. Prefería mil veces tenerte como amiga que arriesgarme a perderte por completo. Así que guardé silencio. Escondí lo que sentía en algún lugar seguro, convencido de que era mejor así. No sabía que la vida ya estaba escribiendo, en secreto, un capítulo completamente distinto para nosotros.`,

    PAGE5: `Y entonces llegó el día. El día en que fuiste tú quien decidió romper la distancia entre los dos. Fue tan rápido, tan tuyo, tan inesperado, que hasta hoy me da risa recordarlo. Estabas ahí, molestándome como siempre, llena de esa energía que solo tú tienes, cuando de repente, sin aviso, montaste tu pierna sobre la mía. Mi cerebro simplemente dejó de funcionar. No sabía dónde poner la mirada, no podía verte a la cara, y mi corazón latía como nunca antes lo había sentido latir. Desde ese segundo, todo cambió para siempre.`,

    PAGE6: `Todavía guardo, intacto, el recuerdo de la primera vez que te quedaste dormida sobre mis piernas. Para cualquiera podría parecer un instante pequeño, casi sin importancia. Para mí lo fue todo. Fue la primera vez que sentí, sin ninguna duda, que confiabas en mí por completo. Esa noche llegué a casa con una felicidad que no sabía cómo explicar. No podía dejar de sonreír, no podía dejar de pensar en ti. Nunca antes me había sentido tan amado por alguien. Fue un instante mágico, de esos que se quedan a vivir para siempre en la memoria.`,

    PAGE7: `Desde entonces, cada día contigo se ha sentido como un regalo distinto. Me enamoro, una y otra vez, de tu forma de ser: de cómo me cuidas sin que te lo pida, de cómo me abrazas como si el mundo se detuviera un momento, de tu sonrisa, de tus ojitos, de esa manera tuya tan especial de convertir un día cualquiera en uno que jamás voy a olvidar. Contigo aprendí que el amor de verdad no hace ruido: simplemente se queda, se sostiene, y crece un poco más cada día.`,

    PAGE8: `Hoy puedo decirlo con toda seguridad: me tienes completamente loco por ti. Por tu amor, por tu ternura, por tu forma tan tuya de hacerme feliz sin siquiera intentarlo. Gracias por llegar a mi vida. Gracias por elegirme, hoy y todos los días. Gracias por hacerme sentir amado como nunca antes. Y si pudiera volver a empezar esta historia mil veces, te elegiría a ti en cada una de ellas, sin dudarlo ni un segundo. Porque eres mi lugar favorito, mi paz, mi felicidad. Mi princesa Tiana.`
  };

  /* ------------------------------------------------------------------
     1. CURSOR PERSONALIZADO + CORAZONES AL CLIC
     ------------------------------------------------------------------ */
  const cursorHeart = document.getElementById('cursorHeart');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch){
    window.addEventListener('mousemove', (e) => {
      cursorHeart.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  }

  document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '❤';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.color = Math.random() > .5 ? 'var(--crimson)' : 'var(--gold)';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 950);
  });

  /* ------------------------------------------------------------------
     2. PÉTALOS CAYENDO (DOM)
     ------------------------------------------------------------------ */
  const petalsLayer = document.getElementById('petalsLayer');
  const PETAL_COUNT = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < PETAL_COUNT; i++){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = Math.random() > .5 ? '🌸' : '💮';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    petal.style.fontSize = (12 + Math.random() * 14) + 'px';
    petal.style.animationDuration = (9 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 12) + 's';
    petalsLayer.appendChild(petal);
  }

  /* ------------------------------------------------------------------
     3. FONDO ANIMADO EN CANVAS: corazones, destellos, estrellas, cupidos
     ------------------------------------------------------------------ */
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLES = [];
  const TYPES = ['heart','spark','star','cupid'];
  const COUNT = window.innerWidth < 600 ? 26 : 44;

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function makeParticle(){
    const type = TYPES[Math.floor(Math.random() * (Math.random() < 0.55 ? 2 : TYPES.length))]; // más corazones/destellos que cupidos
    return {
      type,
      x: rand(0, W),
      y: rand(0, H),
      size: type === 'cupid' ? rand(14,22) : rand(6, 16),
      speedY: rand(0.15, 0.5) * (type === 'star' ? 0.4 : 1),
      speedX: rand(-0.25, 0.25),
      drift: rand(0, Math.PI * 2),
      driftSpeed: rand(0.004, 0.012),
      alpha: rand(0.35, 0.9),
      twinkle: rand(0.01, 0.04),
      depth: rand(0.4, 1) // para efecto parallax
    };
  }
  for (let i = 0; i < COUNT; i++) PARTICLES.push(makeParticle());

  // Parallax con el mouse
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / W - 0.5) * 22;
    targetY = (e.clientY / H - 0.5) * 22;
  });

  function drawHeart(x, y, size, alpha, color){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(size / 16, size / 16);
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.bezierCurveTo(0, 0, -8, 0, -8, -4);
    ctx.bezierCurveTo(-8, -9, 0, -9, 0, -3);
    ctx.bezierCurveTo(0, -9, 8, -9, 8, -4);
    ctx.bezierCurveTo(8, 0, 0, 0, 0, 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawStar(x, y, size, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 4; i++){
      ctx.rotate(Math.PI / 2);
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.15, size * 0.5);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.15, size * 0.5);
    }
    ctx.closePath();
    ctx.fillStyle = '#F3D98B';
    ctx.fill();
    ctx.restore();
  }

  function drawSpark(x, y, size, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    grad.addColorStop(0, 'rgba(255,255,255,.95)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCupid(x, y, size, alpha){
    // pequeño cupido estilizado: cuerpo + alitas
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    // alas
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.beginPath();
    ctx.ellipse(-size * 0.6, 0, size * 0.5, size * 0.28, Math.PI / 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(size * 0.6, 0, size * 0.5, size * 0.28, -Math.PI / 5, 0, Math.PI * 2);
    ctx.fill();
    // cuerpito (corazón pequeño)
    drawHeartLocal(0, 0, size * 0.5);
    ctx.restore();

    function drawHeartLocal(hx, hy, hs){
      ctx.save();
      ctx.translate(hx, hy);
      ctx.scale(hs / 16, hs / 16);
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(0, 0, -8, 0, -8, -4);
      ctx.bezierCurveTo(-8, -9, 0, -9, 0, -3);
      ctx.bezierCurveTo(0, -9, 8, -9, 8, -4);
      ctx.bezierCurveTo(8, 0, 0, 0, 0, 4);
      ctx.closePath();
      ctx.fillStyle = '#C8265A';
      ctx.fill();
      ctx.restore();
    }
  }

  function animate(){
    ctx.clearRect(0, 0, W, H);

    // suavizado del parallax
    mouseX += (targetX - mouseX) * 0.04;
    mouseY += (targetY - mouseY) * 0.04;

    for (const p of PARTICLES){
      p.y -= p.speedY;
      p.drift += p.driftSpeed;
      p.x += p.speedX + Math.sin(p.drift) * 0.15;

      if (p.y < -20){ p.y = H + 20; p.x = rand(0, W); }
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;

      const flick = 0.75 + Math.sin(Date.now() * p.twinkle) * 0.25;
      const px = p.x + mouseX * p.depth;
      const py = p.y + mouseY * p.depth;

      if (p.type === 'heart') drawHeart(px, py, p.size, p.alpha * flick, Math.random() > 0.5 ? '#C8265A' : '#F0A6C4');
      else if (p.type === 'star') drawStar(px, py, p.size, p.alpha * flick);
      else if (p.type === 'spark') drawSpark(px, py, p.size, p.alpha * flick);
      else drawCupid(px, py, p.size, p.alpha * flick);
    }
    requestAnimationFrame(animate);
  }
  animate();

  /* ------------------------------------------------------------------
     4. MÚSICA ROMÁNTICA
     ------------------------------------------------------------------ */
  const musicBtn = document.getElementById('musicToggle');
  const music = document.getElementById('bgMusic');
  let musicOn = false;

  function startMusic(){
    if (musicOn) return;
    music.play().then(() => {
      musicOn = true;
      musicBtn.classList.add('playing');
    }).catch(() => {
      // El navegador todavía no lo permite (aún no hubo interacción real); se reintentará.
    });
  }

  function stopMusic(){
    music.pause();
    musicOn = false;
    musicBtn.classList.remove('playing');
  }

  // Los navegadores bloquean el audio con sonido hasta que haya una interacción
  // real del usuario. Por eso intentamos reproducir en el primer clic/toque/tecla
  // en cualquier parte de la página, para que se sienta automático desde que entra.
  const firstInteractionEvents = ['click', 'touchstart', 'keydown'];
  function onFirstInteraction(){
    startMusic();
    firstInteractionEvents.forEach(ev => document.removeEventListener(ev, onFirstInteraction));
  }
  firstInteractionEvents.forEach(ev => document.addEventListener(ev, onFirstInteraction, { once: true }));

  // Por si el navegador sí permite autoplay (algunos lo hacen si el sitio
  // tiene "engagement" previo, o si el video/audio está silenciado al inicio).
  startMusic();

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (musicOn) stopMusic(); else startMusic();
  });

  /* ------------------------------------------------------------------
     5. TRANSICIÓN CINEMATOGRÁFICA HERO -> LIBRO
     ------------------------------------------------------------------ */
  const heroScene = document.getElementById('heroScene');
  const bookScene  = document.getElementById('bookScene');
  const cineOverlay = document.getElementById('cineOverlay');
  const cineFlash = document.getElementById('cineFlash');
  const btnRead = document.getElementById('btnRead');

  // Pequeños corazones flotando dentro del botón al pasar el mouse
  btnRead.addEventListener('mouseenter', () => {
    const layer = btnRead.querySelector('.btn-hearts');
    for (let i = 0; i < 5; i++){
      const h = document.createElement('span');
      h.textContent = '❤';
      h.style.left = rand(10, 90) + '%';
      h.style.animationDelay = (i * 0.08) + 's';
      layer.appendChild(h);
      setTimeout(() => h.remove(), 1300);
    }
  });

  btnRead.addEventListener('click', openBook);

  function openBook(){
    heroScene.classList.add('hidden');
    cineOverlay.classList.add('active');

    setTimeout(() => {
      cineFlash.classList.add('flash');
    }, 500);

    setTimeout(() => {
      bookScene.classList.add('visible');
      spawnConfettiHearts();
    }, 900);

    setTimeout(() => {
      cineOverlay.classList.remove('active');
      cineFlash.classList.remove('flash');
    }, 1900);
  }

  function spawnConfettiHearts(){
    const n = 26;
    for (let i = 0; i < n; i++){
      const h = document.createElement('div');
      h.className = 'confetti-heart';
      h.textContent = Math.random() > 0.5 ? '❤' : '✨';
      h.style.left = rand(0, 100) + 'vw';
      h.style.color = Math.random() > 0.5 ? 'var(--crimson)' : 'var(--gold)';
      h.style.fontSize = rand(12, 24) + 'px';
      h.style.animationDuration = rand(2.2, 4) + 's';
      h.style.animationDelay = rand(0, 0.8) + 's';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5000);
    }
  }

  /* ------------------------------------------------------------------
     6. LIBRO: apertura, paso de páginas, máquina de escribir
     ------------------------------------------------------------------ */
  const book = document.getElementById('book');
  const pages = Array.from(book.querySelectorAll('.page'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.getElementById('closeBtn');

  let current = 0; // índice de la página actualmente "arriba" sin voltear
  const total = pages.length - 1; // última posición navegable

  // z-index inicial en orden inverso para que se vea como una pila de hojas
  pages.forEach((p, i) => { p.style.zIndex = pages.length - i; });

  prevBtn.style.display = 'none';

  function goNext(){
    if (current >= total) return;
    pages[current].classList.add('flipped');

    const nextPage = pages[current + 1];
    // Si la siguiente página tiene texto animado, lo escribimos al llegar
    triggerPageContent(nextPage);

    current++;
    updateNav();
  }

  function goPrev(){
    if (current <= 0) return;
    current--;
    pages[current].classList.remove('flipped');
    updateNav();
  }

  function updateNav(){
    prevBtn.style.display = current === 0 ? 'none' : 'flex';
    nextBtn.style.display = current >= total ? 'none' : 'flex';
  }

  pages[0].addEventListener('click', () => { if (current === 0) goNext(); });
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  closeBtn.addEventListener('click', () => {
    bookScene.classList.remove('visible');
    heroScene.classList.remove('hidden');
  });

  // Máquina de escribir para el texto de cada página
  const typedPages = new Set();

  function triggerPageContent(pageEl){
    const textEl = pageEl.querySelector('.page-text');
    if (textEl && !typedPages.has(pageEl)){
      typedPages.add(pageEl);
      const key = textEl.getAttribute('data-text');
      const full = STORY[key];
      if (full) typeWriter(textEl, full);
    }

    // Página final: TE AMO + foto
    if (pageEl.classList.contains('final-page') && !pageEl.dataset.played){
      pageEl.dataset.played = 'true';
      playFinalPage(pageEl);
    }
  }

  function typeWriter(el, text, speed = 22){
    el.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'cursor-caret';
    let i = 0;

    function step(){
      if (i <= text.length){
        el.textContent = text.slice(0, i);
        el.appendChild(caret);
        i++;
        setTimeout(step, speed);
      } else {
        caret.remove();
      }
    }
    step();

    // Permitir saltar la animación con un clic sobre el texto
    el.addEventListener('click', function skip(){
      i = text.length + 1;
      el.textContent = text;
      caret.remove();
      el.removeEventListener('click', skip);
    }, { once: true });
  }

  function playFinalPage(pageEl){
    const teAmo = pageEl.querySelector('#teAmo');
    const finalPhoto = pageEl.querySelector('#finalPhoto');
    const heartsWrap = pageEl.querySelector('.final-hearts');

    setTimeout(() => teAmo.classList.add('reveal'), 300);

    // corazoncitos pequeños alrededor del TE AMO
    setTimeout(() => {
      for (let i = 0; i < 8; i++){
        const s = document.createElement('span');
        s.textContent = '❤';
        s.style.left = rand(30, 70) + '%';
        s.style.animationDelay = (i * 0.12) + 's';
        heartsWrap.appendChild(s);
      }
    }, 900);

    setTimeout(() => finalPhoto.classList.add('show'), 2200);
  }

  // Activar primera página al abrir el libro si el usuario navega directo
  updateNav();
});