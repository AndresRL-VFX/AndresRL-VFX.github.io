/* =========================================================
   PROJECT DATA
   -> Edit this array to add / remove / change projects.
   -> category must match the buttons' data-filter values:
      "vfx-shader" | "technical-artist" | "3d-modeling" | "videogames" | "programming"
   -> thumb: path to the card's cover image (e.g. "img/flamethrower.jpg").
      Leave it as "" to show a text placeholder instead.
   -> desc: overall project description (shown once, below the viewer).
      Supports HTML — wrap paragraphs in <p> tags for multi-paragraph
      descriptions, and use <strong>, <ul>/<li>, etc. as needed.
      Example: "<p>First paragraph.</p><p>Second paragraph with <strong>bold</strong>.</p>"
   -> media: ORDERED list of everything shown when the project opens —
      mix videos and photos freely, in any order, and give EACH ONE
      its own caption explaining what you did in that specific clip/shot.
      Two item types:
        { type: "video", src: "https://www.youtube.com/embed/VIDEO_ID", caption: "..." }
        { type: "image", src: "img/yourphoto.jpg",                      caption: "..." }
      The first item in the array is what opens by default.
      Leave media: [] if you don't have anything uploaded yet — the
      project will still open showing just the title and description.
========================================================= */
const PROJECTS = [
  {
  title: "Werewolf Triple Combo VFX",
  subtitle: "Niagara · Unreal Engine 5",
  category: "vfx-shader",
  thumb: "img/Werewolf.png",
 desc: `
  <p>This VFX was developed in <strong>Unreal Engine 5</strong>, integrating the
  Niagara particle system with static meshes modeled in Maya and dynamic materials.</p>

  <p>The visual foundation is built upon a <strong>Shader Manipulation</strong> workflow,
  implementing UV Distortion techniques and Panner Nodes over procedural noise textures
  to generate an organic and erratic aesthetic.</p>

  <p>For environmental response, the <strong>Chaos Physics Engine</strong> was utilized,
  applying a Fracture Mode and Geometry Collections workflow.</p>

  <p>Animation Asset:
  <a href="https://fab.com/s/6ec499f283bf" target="_blank" rel="noopener">Fab.com</a><br>
  Audio: Sound effects sourced from
  <a href="https://splice.com/sounds" target="_blank" rel="noopener">Splice Sounds</a>.</p>
`,
  media: [
    { type: "video",  src: "https://www.youtube.com/embed/VIDEO_ID_1",  caption: "Full attack sequence — idle → wind-up → slash → impact → cooldown." },
    { type: "image",  src: "img/lava-claw-breakdown.jpg",               caption: "Niagara module stack: Spawn Burst, Curl Noise Force, Scale Color over life." },
    { type: "image",  src: "img/lava-claw-material.jpg",                caption: "Dynamic material instance: panning lava texture with UV distortion and Fresnel rim." },
    { type: "video",  src: "https://www.youtube.com/embed/VIDEO_ID_2",  caption: "Side-by-side comparison: early prototype vs final polished version." },
    { type: "image",  src: "img/lava-claw-mesh.jpg",                    caption: "Slash mesh modeled in Maya — low-poly ribbon with custom UVs for the flow map." }
  ]
},
  {
    title: "Holographic Card Shader",
    subtitle: "Shader Graph · Fighting Krazy Chickens",
    category: "vfx-shader",
    thumb: "",
    desc: "Holographic rainbow card shader driven by emission and a LUT, using the Modulo node to build the pattern.",
    media: []
  },
  {
    title: "Warning Decal Shader",
    subtitle: "Shader Graph · Fighting Krazy Chickens",
    category: "vfx-shader",
    thumb: "",
    desc: "Ground warning decal using BlendOp Max and ZTest LEqual, driven by a singleton manager for overlap handling.",
    media: []
  },
  {
    title: "Grass Shader",
    subtitle: "GPU Instancing · Fighting Krazy Chickens",
    category: "vfx-shader",
    thumb: "",
    desc: "GPU-instanced grass with player interaction bending and cylindrical billboarding.",
    media: []
  },
  {
    title: "Rim Light Edge Detection",
    subtitle: "Renderer Feature · Fighting Krazy Chickens",
    category: "technical-artist",
    thumb: "",
    desc: "Screen-space rim light Renderer Feature using Roberts Cross edge detection and stencil buffer layer filtering.",
    media: []
  },
  {
    title: "Master Particle Uber-Shader",
    subtitle: "URP · Fighting Krazy Chickens",
    category: "vfx-shader",
    thumb: "",
    desc: "Master particle shader for URP, built as a reusable base for every effect in the game.",
    media: []
  },
  {
    title: "Stylized Water & Waterfall",
    subtitle: "Unity 6 URP · Personal Project",
    category: "vfx-shader",
    thumb: "",
    desc: "Water and waterfall shader with world-space depth, HSV color lerp, screen-space refraction, intersection foam and Voronoi flow glare.",
    media: []
  },
  {
    title: "Lava Claw Attack VFX",
    subtitle: "Niagara · Unreal Engine 5",
    category: "vfx-shader",
    thumb: "",
    desc: "Lava/fire claw attack VFX built in Niagara, submitted to The Rookies.",
    media: []
  },
  {
    title: "Chaos Destruction Sequence",
    subtitle: "Unreal Engine 5",
    category: "technical-artist",
    thumb: "",
    desc: "Destruction sequence using Chaos physics, a Level Sequence camera and Field System actors.",
    media: []
  },
  {
    title: "PCG Egg / Corruption System",
    subtitle: "Unreal Engine 5",
    category: "technical-artist",
    thumb: "",
    desc: "Procedural egg/corruption system using Mesh Sampler, Copy Points and spline-based organic veins.",
    media: []
  },
  {
    title: "PCG Roller Coaster",
    subtitle: "Unreal Engine 5",
    category: "technical-artist",
    thumb: "",
    desc: "Procedural roller coaster with Blueprint-exposed parameters.",
    media: []
  },
  {
    title: "AI Boss Fight System",
    subtitle: "Unity · GPT-4o-mini · Whisper",
    category: "programming",
    thumb: "",
    desc: "AI-driven boss fight system in Unity, using GPT-4o-mini, Whisper and a Python TCP server.",
    media: []
  },
  {
    title: "Gokui",
    subtitle: "Internship · Arscade Studios",
    category: "vfx-shader",
    thumb: "",
    desc: "VFX and technical shader work developed during the Technical VFX Artist internship.",
    media: []
  },
];

/* ========== RENDER GRID ========== */
const grid = document.getElementById('portfolioGrid');

function renderGrid(filter = 'all'){
  grid.innerHTML = '';
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  if (items.length === 0){
    grid.innerHTML = `<p class="grid-empty">No projects in this category yet — coming soon.</p>`;
    return;
  }

  items.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-thumb">
        ${p.thumb
          ? `<img src="${p.thumb}" alt="${p.title}">`
          : `<span class="card-thumb-placeholder">Thumbnail<br>${p.title}</span>`}
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
const lbViewer = document.getElementById('lightboxViewer');
const lbCaption = document.getElementById('lightboxCaption');
const lbThumbs = document.getElementById('lightboxThumbs');
const lbTag = document.getElementById('lightboxTag');
const lbTitle = document.getElementById('lightboxTitle');
const lbDesc = document.getElementById('lightboxDesc');

let currentMedia = [];

function renderMediaItem(item, title){
  if (!item) { lbViewer.innerHTML = ''; lbCaption.textContent = ''; return; }
  const isVideo = item.type === 'video';
  lbViewer.classList.toggle('has-video', isVideo);
  lbViewer.innerHTML = isVideo
    ? `<iframe src="${item.src}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : `<img src="${item.src}" alt="${title}">`;
  lbCaption.textContent = item.caption || '';
}

function setActiveThumb(index){
  lbThumbs.querySelectorAll('.lightbox-thumb').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

function openLightbox(p){
  lbTag.textContent = p.subtitle;
  lbTitle.textContent = p.title;
  lbDesc.innerHTML = p.desc;
  currentMedia = p.media || [];

  renderMediaItem(currentMedia[0], p.title);

  if (currentMedia.length > 1){
    lbThumbs.style.display = 'flex';
    lbThumbs.innerHTML = currentMedia.map((item, i) => `
      <div class="lightbox-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
        ${item.type === 'video'
          ? `<span class="thumb-play">▶</span>`
          : `<img src="${item.src}" alt="">`}
      </div>
    `).join('');
    lbThumbs.querySelectorAll('.lightbox-thumb').forEach(el => {
      el.addEventListener('click', () => {
        const i = Number(el.dataset.index);
        renderMediaItem(currentMedia[i], p.title);
        setActiveThumb(i);
      });
    });
  } else {
    lbThumbs.style.display = 'none';
    lbThumbs.innerHTML = '';
  }

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbViewer.innerHTML = '';
  lbCaption.textContent = '';
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
