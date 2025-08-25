// --- Datos base ---
const TEMAS = [
   {
  area: "Neurología",
  titulo: "Generalidades",
  resumen: "Introducción a los fundamentos de la medicina y conceptos básicos.",
  link: "#/neurologia/generalidades",   // <— AQUÍ el hash
  emoji: "📚"
},
  {
    area: "Neurología",
    titulo: "Memoria y Conciencia",
    resumen: "Estudio de procesos cognitivos superiores y niveles de conciencia.",
    link: "#",
    emoji: "🧩"
  },
  {
    area: "Salud Mental",
    titulo: "Entrevista clínica",
    resumen: "Estructura, rapport, evaluación del estado mental y riesgo.",
    link: "#",
    emoji: "🗣️"
  },
  {
    area: "Salud Mental",
    titulo: "Trastornos del ánimo",
    resumen: "Depresión, manía, criterios y escalas útiles para el estudio.",
    link: "#",
    emoji: "🌗"
  },
  {
    area: "Fármaco",
    titulo: "Anticonvulsivantes",
    resumen: "Mecanismos, indicaciones, efectos adversos y perlas de examen.",
    link: "#",
    emoji: "💊"
  },
  {
    area: "Fármaco",
    titulo: "Antibióticos 101",
    resumen: "Coberturas básicas, familias y reglas mnemotécnicas.",
    link: "#",
    emoji: "🧫"
  }
];

const TIPS = [
  "Alterna bloques de 25–30 min de estudio y 5 min de descanso (Pomodoro).",
  "Convierte tus apuntes en preguntas: practica evocación activa.",
  "Explica en voz alta como si enseñaras a otra persona (técnica Feynman).",
  "Intercala materias (neurología, fármaco, salud mental) para mejorar retención.",
  "Usa pruebas cortas (quizz) al final de cada sesión y revisa errores al día siguiente."
];

const NEWS = [
  "Nuevo módulo de flashcards de SNC/SNP disponible.",
  "Sección de Fármaco: añadido resumen rápido de antibióticos.",
  "Landing optimizada para móviles y accesibilidad mejorada."
];

// --- Elementos ---
const topicGrid = document.getElementById("topicGrid");
const tabs = document.querySelectorAll(".tab");
const search = document.getElementById("q");
const tipsList = document.getElementById("tipsList");
const trendList = document.getElementById("trendList");
const newsList = document.getElementById("newsList");
const btnExplorar = document.getElementById("btnExplorar");

// Año footer
document.getElementById("yr").textContent = new Date().getFullYear();

// --- Render helpers ---
function renderTips() {
  tipsList.innerHTML = "";
  TIPS.slice(0,3).forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    tipsList.appendChild(li);
  });
}
function shuffleTips() {
  TIPS.sort(() => Math.random() - 0.5);
  renderTips();
}

function renderNews() {
  newsList.innerHTML = "";
  NEWS.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    newsList.appendChild(li);
  });
}

function renderTrends() {
  // Simula “más visto” eligiendo aleatoriamente 3 temas
  trendList.innerHTML = "";
  const picks = [...TEMAS].sort(() => Math.random() - 0.5).slice(0,3);
  picks.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.titulo}</strong> · <span class="mini">${p.area}</span>`;
    trendList.appendChild(li);
  });
}

function topicCard(t) {
  return `
    <article class="topic" data-area="${t.area}">
      <span class="tag">${t.area}</span>
      <span class="emoji" aria-hidden="true">${t.emoji}</span>
      <h4>${t.titulo}</h4>
      <p>${t.resumen}</p>
      <a class="cta link" href="${t.link}" target="_blank" rel="noopener">Abrir</a>
    </article>
  `;
}

function renderTopics(filter = "all", term = "") {
  const items = TEMAS.filter(t => 
    (filter === "all" || t.area === filter) &&
    (`${t.titulo} ${t.resumen} ${t.area}`.toLowerCase().includes(term.toLowerCase()))
  );
  topicGrid.innerHTML = items.map(topicCard).join("");
}

// --- Eventos ---
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTopics(btn.dataset.filter, search.value || "");
  });
});

search.addEventListener("input", () => {
  const active = document.querySelector(".tab.active")?.dataset.filter || "all";
  renderTopics(active, search.value);
});

document.querySelectorAll("[data-action='shuffleTips']").forEach(el =>
  el.addEventListener("click", shuffleTips)
);
document.querySelectorAll("[data-action='refreshTrends']").forEach(el =>
  el.addEventListener("click", renderTrends)
);

btnExplorar.addEventListener("click", () => {
  document.getElementById("temas").scrollIntoView({behavior:"smooth"});
});

// --- Contenido de páginas de temas (por slug) ---
const TOPIC_CONTENT = {
  "neurologia/generalidades": {
    title: "Generalidades de Neuro",
    intro: "Fundamentos esenciales para ubicarse: organización macroscópica, tipos celulares y principios de transmisión.",
    sections: [
      {
        h: "Mapa rápido del sistema nervioso",
        html: `
          <ul>
            <li><strong>SNC:</strong> encéfalo (corteza, núcleos, cerebelo, tronco) y médula espinal.</li>
            <li><strong>SNP:</strong> pares craneales y nervios espinales (raíces, plexos, ganglios).</li>
            <li><strong>Blanca vs. gris:</strong> axones mielínicos vs. somas neuronales.</li>
          </ul>
        `
      },
      {
        h: "Tipos celulares",
        html: `
          <ul>
            <li><strong>Neuronas:</strong> conducción y sinapsis.</li>
            <li><strong>Glía:</strong> astrocitos (soporte/BBB), oligodendrocitos (mielina SNC), células de Schwann (mielina SNP), microglía (inmunidad).</li>
          </ul>
        `
      },
      {
        h: "Transmisión y sinapsis",
        html: `
          <ul>
            <li>Potencial de acción (Na⁺/K⁺) y conducción saltatoria por mielina.</li>
            <li>Sinapsis química (neurotransmisores: glutamato, GABA, ACh, etc.).</li>
            <li>Plasticidad: potenciación/depresión a largo plazo.</li>
          </ul>
        `
      },
      {
        h: "Orientación clínica",
        html: `
          <p>Exploración neurológica básica, pares craneales y signos motores/sensitivos como guía topográfica.</p>
        `
      }
    ]
  }
};
// --- Inicialización ---
// --- Router por hash (versión robusta) ---
const homeEl  = document.getElementById("page-home");
const topicEl = document.getElementById("page-topic");

function showHome(){
  homeEl.classList.remove("hidden");
  topicEl.classList.add("hidden");
}

function renderTopic(slug){
  const data = TOPIC_CONTENT[slug];
  if(!data){ showHome(); return; }

  document.getElementById("crumbTopic").textContent = data.title;
  document.getElementById("topicTitle").textContent = data.title;
  document.getElementById("topicIntro").textContent = data.intro;

  const body = document.getElementById("topicBody");
  body.innerHTML = data.sections.map(sec => `
    <article class="section">
      <h3>${sec.h}</h3>
      ${sec.html}
    </article>
  `).join("");

  homeEl.classList.add("hidden");
  topicEl.classList.remove("hidden");
}

function navigate(){
  const raw = location.hash.replace(/^#\/?/, "").toLowerCase(); // '#/algo' -> 'algo'
  // si no hay hash, siempre mostramos home (no ocultamos nada)
  if(!raw){ showHome(); return; }
  // si el slug existe, lo mostramos; si no, volvemos a home
  if(TOPIC_CONTENT[raw]) renderTopic(raw);
  else showHome();
}

window.addEventListener("hashchange", navigate);

// --- IMPORTANTE: renderiza primero, navega después ---
renderTips();
renderTrends();
renderNews();
renderTopics("all", "");
navigate();       // <- decide qué mostrar según el hash actual