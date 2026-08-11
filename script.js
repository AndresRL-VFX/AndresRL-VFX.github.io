/* =========================================================
   DATOS DE PROYECTOS
   -> Edita este array para añadir/quitar/cambiar proyectos.
   -> category debe coincidir con data-filter de los botones:
      "sunblind" | "shaders" | "unreal" | "academic"
   -> thumb: ruta a una imagen (ej: "img/fkc-flamethrower.jpg").
      Si la dejas vacía "", se muestra un placeholder de texto.
   -> video: "" si no tienes vídeo todavía, o un embed de
      YouTube/Vimeo, ej: "https://www.youtube.com/embed/VIDEO_ID"
   -> gallery: array de rutas de imágenes para el lightbox.
========================================================= */
const PROJECTS = [
  {
    title: "Flamethrower VFX",
    subtitle: "VFX Graph · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Efecto de lanzallamas en VFX Graph, con espacio de simulación local/mundial y anclaje mediante Position Constraint.",
    gallery: []
  },
  {
    title: "Holographic Card Shader",
    subtitle: "Shader Graph · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Shader holográfico para cartas con arcoíris basado en emisión y LUT, usando el nodo Modulo para el patrón.",
    gallery: []
  },
  {
    title: "Warning Decal Shader",
    subtitle: "Shader Graph · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Decal de aviso en el suelo con BlendOp Max y ZTest LEqual, gestionado por un manager singleton para el solapamiento.",
    gallery: []
  },
  {
    title: "Grass Shader",
    subtitle: "GPU Instancing · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Hierba con instanciado por GPU, interacción con el jugador (bending) y billboarding cilíndrico.",
    gallery: []
  },
  {
    title: "Rim Light Edge Detection",
    subtitle: "Renderer Feature · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Renderer Feature de rim light en espacio de pantalla con detección de bordes Roberts Cross y filtrado por stencil.",
    gallery: []
  },
  {
    title: "Master Particle Uber-Shader",
    subtitle: "URP · Fighting Krazy Chickens",
    category: "sunblind",
    thumb: "",
    video: "",
    desc: "Shader maestro para partículas en URP, pensado como base reutilizable para todos los efectos del juego.",
    gallery: []
  },
  {
    title: "Stylized Water & Waterfall",
    subtitle: "Unity 6 URP · Proyecto personal",
    category: "shaders",
    thumb: "",
    video: "",
    desc: "Shader de agua y cascada con profundidad en espacio del mundo, lerp de color HSV, refracción en espacio de pantalla, espuma de intersección y flow glare con Voronoi.",
    gallery: []
  },
  {
    title: "Lava Claw Attack VFX",
    subtitle: "Niagara · Unreal Engine 5",
    category: "unreal",
    thumb: "",
    video: "",
    desc: "VFX de ataque de garra de lava/fuego en Niagara, presentado a The Rookies.",
    gallery: []
  },
  {
    title: "Chaos Destruction Sequence",
    subtitle: "Unreal Engine 5",
    category: "unreal",
    thumb: "",
    video: "",
    desc: "Secuencia de destrucción con física Chaos, cámara con Level Sequence y Field System actors.",
    gallery: []
  },
  {
    title: "PCG Egg / Corruption System",
    subtitle: "Unreal Engine 5",
    category: "unreal",
    thumb: "",
    video: "",
    desc: "Sistema procedural de huevo/corrupción con Mesh Sampler, Copy Points y venas orgánicas basadas en splines.",
    gallery: []
  },
  {
    title: "PCG Roller Coaster",
    subtitle: "Unreal Engine 5",
    category: "unreal",
    thumb: "",
    video: "",
    desc: "Montaña rusa procedural con parámetros expuestos por Blueprint.",
    gallery: []
  },
  {
    title: "AI Boss Fight System (TFG)",
    subtitle: "Unity · GPT-4o-mini · Whisper",
    category: "academic",
    thumb: "",
    video: "",
    desc: "Sistema de combate contra jefe dirigido por IA en Unity, con GPT-4o-mini, Whisper y un servidor Python por TCP.",
    gallery: []
  },
  {
    title: "Gokui",
    subtitle: "Prácticas · Arscade Studios",
    category: "academic",
    thumb: "",
    video: "",
    desc: "Desarrollo de VFX y shaders técnicos durante las prácticas como Technical VFX Artist.",
    gallery: []
  },
];

/* ========== RENDER GRID ========== */
const grid = document.getElementById('portfolioGrid');

function renderGrid(filter = 'all'){
  grid.innerHTML = '';
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  items.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-thumb">
        ${p.thumb
          ? `<img src="${p.thumb}" alt="${p.title}">`
          : `<span class="card-thumb-placeholder">Miniatura<br>${p.title}</span>`}
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.subtitle}</p>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(p));
    grid.appendChild(card);
  });
}
renderGrid();

/* ========== FILTERS ========== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});

/* ========== EXPERIENCE TABS ========== */
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('timeline-professional').classList.toggle('hidden', tab.dataset.tab !== 'professional');
    document.getElementById('timeline-education').classList.toggle('hidden', tab.dataset.tab !== 'education');
  });
});

/* ========== LIGHTBOX ========== */
const lightbox = document.getElementById('lightbox');
const lbVideo = document.getElementById('lightboxVideo');
const lbTag = document.getElementById('lightboxTag');
const lbTitle = document.getElementById('lightboxTitle');
const lbDesc = document.getElementById('lightboxDesc');
const lbGallery = document.getElementById('lightboxGallery');

function openLightbox(p){
  lbTag.textContent = p.subtitle;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;

  lbVideo.innerHTML = p.video
    ? `<iframe src="${p.video}" title="${p.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : '';
  lbVideo.style.display = p.video ? 'block' : 'none';

  lbGallery.innerHTML = p.gallery.map(src => `<img src="${src}" alt="${p.title}">`).join('');

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbVideo.innerHTML = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ========== HERO PARTICLES (naranja, glow, ascendiendo) ========== */
(function initHeroParticles(){
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('intro');

  let particles = [];
  let w, h, dpr;

  const COLORS = ['#ff7a3d', '#ff9a5c', '#ffb27a', '#ff5e1a'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticle(startAtBottom){
    const size = Math.random() * 2.2 + 0.8;
    return {
      x: Math.random() * w,
      y: startAtBottom ? h + Math.random() * 60 : Math.random() * h,
      size,
      baseSize: size,
      speed: Math.random() * 0.5 + 0.15,
      drift: (Math.random() - 0.5) * 0.35,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.015 + 0.005,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.35,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2
    };
  }

  function initParticles(){
    const density = Math.max(35, Math.min(90, Math.floor((w * h) / 16000)));
    particles = Array.from({ length: density }, () => makeParticle(false));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    particles.forEach(p => {
      p.y -= p.speed;
      p.driftPhase += p.driftSpeed;
      p.x += Math.sin(p.driftPhase) * p.drift;
      p.twinklePhase += p.twinkleSpeed;

      const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
      const alpha = p.alpha * (0.6 + twinkle * 0.4);
      const size = p.baseSize * (0.85 + twinkle * 0.3);

      if (p.y < -20 || p.x < -20 || p.x > w + 20){
        Object.assign(p, makeParticle(true));
        return;
      }

      const glowSize = size * 6;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
      gradient.addColorStop(0, hexToRgba(p.color, alpha * 0.9));
      gradient.addColorStop(0.4, hexToRgba(p.color, alpha * 0.25));
      gradient.addColorStop(1, hexToRgba(p.color, 0));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = hexToRgba(p.color, alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    if (!reduceMotion) requestAnimationFrame(step);
  }

  function hexToRgba(hex, alpha){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  resize();
  initParticles();

  if (reduceMotion){
    step(); // dibuja un frame estático, sin animar
  } else {
    requestAnimationFrame(step);
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { resize(); initParticles(); }, 150);
  });
})();

/* ========== MOBILE NAV ========== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
});
