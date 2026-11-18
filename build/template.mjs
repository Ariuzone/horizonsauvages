import { SITE, NAV, FOOTER_COLUMNS } from "./config.mjs";

// Icônes SVG inline (traits, style uniforme) — aucune dépendance externe.
export const ICONS = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>`,
  arrowUpRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  binoculars: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 13a4 4 0 1 0 4 4v-4a2 2 0 0 0-2-2H7"/><path d="M18 13a4 4 0 1 1-4 4v-4a2 2 0 0 1 2-2h1"/><path d="M9 13h6M9.5 11L8 4.5A1.5 1.5 0 0 0 6.5 3h-1A1.5 1.5 0 0 0 4 4.5V11m16 0V4.5A1.5 1.5 0 0 0 18.5 3h-1A1.5 1.5 0 0 0 16 4.5L14.5 11"/></svg>`,
  paw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="5.5" cy="9" rx="1.7" ry="2.3"/><ellipse cx="9.5" cy="5.8" rx="1.8" ry="2.5"/><ellipse cx="14.5" cy="5.8" rx="1.8" ry="2.5"/><ellipse cx="18.5" cy="9" rx="1.7" ry="2.3"/><path d="M12 11c2.5 0 5 2.2 5 5a2.6 2.6 0 0 1-2.6 2.6c-1 0-1.6-.4-2.4-.4s-1.4.4-2.4.4A2.6 2.6 0 0 1 7 16c0-2.8 2.5-5 5-5z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20C5 12 10 5 20 4c1 10-5 15-13 15"/><path d="M4 20c2-5 6-9 11-11"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16.5 15.5c2.5.3 4.4 1.8 5 4.5"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.9 4.9 5 7.3 5c1.8 0 3.4 1 4.7 2.7C13.3 6 14.9 5 16.7 5 19.1 5 21 6.9 21 9.3c0 4-4 7.2-9 11.2z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>`,
  gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8z"/><path d="M3 8h18v4H3zM12 8v13"/><path d="M12 8s-1-4-3.5-4S6 8 9.5 8M12 8s1-4 3.5-4S18 8 14.5 8"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 13.5L3 11l1.5-1.5 6 .5 4-6 2.5.5-2 6 5.5 2.5-1 2-6-1.5-2.5 5h-2l1-4.5-1-1z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>`,
  cross: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.5 5C7 6.5 5 9.5 5 13.5c0 3 1.8 5.5 4.5 5.5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.4-2 1.8-3.6 3.8-4.7L10.5 5zm9 0C16 6.5 14 9.5 14 13.5c0 3 1.8 5.5 4.5 5.5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.4-2 1.8-3.6 3.8-4.7L19.5 5z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8L12 2.8z"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4"/></svg>`,
  route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  bed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18V7m0 6h18v5m0 0v-8a3 3 0 0 0-3-3h-9v6"/><circle cx="7" cy="10.5" r="1.5"/></svg>`,
  elephant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a5.5 5.5 0 0 1 11 0v3.5a5.5 5.5 0 0 1-5.5 5.5H9"/><path d="M9 17v3.5a1.5 1.5 0 0 1-3 0V16"/><path d="M17 9.5c1.8.6 3 1.8 3.5 3.5M6 8H4.5A1.5 1.5 0 0 0 3 9.5v3"/><circle cx="8.5" cy="8.5" r=".6" fill="currentColor"/></svg>`,
  bird: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 7a1 1 0 1 0 0-.01M17 4.5c2.6 1 3.8 3.6 3.2 6.4-.6 2.9-3 5.6-6.2 6.1L10 17.5 5.5 21l1-4.5C4.4 15 3 12.6 3.5 10 4.2 6.4 7.6 4 11 4c1.2 0 2.2.2 3 .5z"/><path d="M10.5 17.5c2 1 5 1.5 8 .5"/></svg>`,
  tent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 3 20h18L12 4z"/><path d="M12 4v3M9.5 20 12 11l2.5 9M12 14.5 9.5 20M12 14.5l2.5 5.5"/></svg>`,
  wave: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M2 14c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M2 19c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/></svg>`,
  fork: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v7a2 2 0 0 0 4 0V3m-2 11v7M15 3c-1 2-1.5 4-1.5 6 0 2 1.5 3 3.5 3v9"/></svg>`,
};

// Logo Horizons Sauvages — création originale : soleil couchant sur horizon,
// traversé par la silhouette d'un acacia.
export function logoSVG(variant = "light", cls = "logo-mark") {
  const ink = variant === "light" ? "#F4EDDD" : "#1E2620";
  const gold = variant === "light" ? "#D9A855" : "#B4762A";
  const terra = variant === "light" ? "#E08A54" : "#B4501F";
  return `<svg class="${cls}" viewBox="0 0 64 64" fill="none" role="img" aria-label="Horizons Sauvages">
  <circle cx="32" cy="32" r="30" stroke="${ink}" stroke-width="2.5"/>
  <circle cx="32" cy="34" r="12.5" fill="${terra}"/>
  <path d="M10 44.5c7-4.5 14.5-6.8 22-6.8s15 2.3 22 6.8" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M10 50c7-4.5 14.5-6.8 22-6.8s15 2.3 22 6.8" stroke="${gold}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M32 20v-5m0 5c-2.8-1.6-5.4-4.6-6.4-7.4m6.4 7.4c2.8-1.6 5.4-4.6 6.4-7.4M32 15c-1.8-.8-3.2-2.6-3.6-4.4m3.6 4.4c1.8-.8 3.2-2.6 3.6-4.4" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;
}

export function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

const BASE_PATHS = {
  "index.html": "",
};

// Retourne le préfixe relatif pour les assets depuis une page donnée
export function relPath(page) {
  const depth = (page.match(/\//g) || []).length + (page === "index.html" ? 0 : 0);
  return depth === 0 ? "" : "../";
}
export function asset(page, path) {
  return relPath(page) + path;
}
export function hrefFrom(page, target) {
  if (/^https?:|^mailto:|^#/.test(target)) return target;
  return relPath(page) + target;
}

let schemaExtra = [];
export function addSchema(json) { schemaExtra.push(json); }
export function resetSchema() { schemaExtra = []; }
export function getSchema() { return schemaExtra; }

export function page({ file, title, description, bodyClass = "", content, hero = null, schema = [], ogType = "website", noIndex = false }) {
  const rel = relPath(file);
  const canonical = SITE.domain + (file === "index.html" ? "/" : "/" + file.replace(/\\/g, "/"));
  const ogImage = SITE.domain + "/" + SITE.ogImage;
  const isHome = file === "index.html";

  const navHTML = NAV.map((item) => {
    if (item.children) {
      const subs = item.children.map((c) =>
        `<li><a href="${hrefFrom(file, c.href)}">${esc(c.label)}</a></li>`).join("");
      return `<li class="nav-item has-sub">
        <a href="${hrefFrom(file, item.href)}" aria-haspopup="true" aria-expanded="false">${esc(item.label)}${ICONS.chevron.replace('<svg', '<svg class="chev"')}</a>
        <ul class="subnav">${subs}</ul>
      </li>`;
    }
    return `<li class="nav-item"><a href="${hrefFrom(file, item.href)}">${esc(item.label)}</a></li>`;
  }).join("");

  const footerCols = FOOTER_COLUMNS.map((col) => `
      <nav class="f-col" aria-label="${esc(col.title)}">
        <p class="f-title">${esc(col.title)}</p>
        <ul>${col.links.map((l) => `<li><a href="${hrefFrom(file, l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>
      </nav>`).join("");

  const schemas = schema.concat(getSchema());

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noIndex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">'}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#101B12">
<link rel="icon" href="${rel}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${rel}favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="${rel}apple-touch-icon.png">
<link rel="manifest" href="${rel}manifest.webmanifest">
<link rel="stylesheet" href="${rel}assets/css/main.css?v=20261102f">
<script>document.documentElement.classList.add("js");</script>
${schema.length || schemaExtra.length ? `<script type="application/ld+json">${JSON.stringify(schemas)}</script>` : ""}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#contenu">Aller au contenu principal</a>
<header class="site-header ${isHome ? "is-home" : ""}" data-header>
  <div class="header-inner">
    <a class="brand" href="${hrefFrom(file, "index.html")}" aria-label="${esc(SITE.name)} — retour à l'accueil">
      ${logoSVG("light")}
      <span class="brand-name">Horizons <em>Sauvages</em></span>
    </a>
    <nav class="main-nav" aria-label="Navigation principale">
      <ul>${navHTML}</ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn-terra btn-sm" href="${hrefFrom(file, "sur-mesure.html")}">Créer mon voyage</a>
      <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu">
        ${ICONS.menu}
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="menu-mobile" hidden>
    <ul class="mobile-list">
      ${NAV.map((item) => {
        if (!item.children) return `<li><a href="${hrefFrom(file, item.href)}">${esc(item.label)}</a></li>`;
        return `<li class="mobile-group">
          <a class="mobile-parent" href="${hrefFrom(file, item.href)}">${esc(item.label)}</a>
          <ul>${item.children.map((c) => `<li><a href="${hrefFrom(file, c.href)}">${esc(c.label)}</a></li>`).join("")}</ul>
        </li>`;
      }).join("")}
    </ul>
    <a class="btn btn-terra btn-block" href="${hrefFrom(file, "sur-mesure.html")}">Créer mon voyage sur mesure</a>
    <a class="mobile-mail" href="mailto:${SITE.email}">${SITE.email}</a>
  </div>
</header>
${hero ? heroHTML(file, hero) : ""}
<main id="contenu">
${content}
</main>
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <a class="brand" href="${hrefFrom(file, "index.html")}" aria-label="${esc(SITE.name)} — accueil">
        ${logoSVG("light")}
        <span class="brand-name">Horizons <em>Sauvages</em></span>
      </a>
      <p class="footer-baseline">${esc(SITE.tagline)}<br>Agence de voyages basée à ${esc(SITE.city)}.</p>
      <a class="footer-mail" href="mailto:${SITE.email}">${SITE.email}</a>
      <p class="footer-addr">${esc(SITE.address)}</p>
    </div>
    ${footerCols}
  </div>
  <div class="footer-mid">
    <div class="footer-projects">
      <a class="btn btn-gold btn-projects" href="https://www.example.com" target="_blank" rel="noopener noreferrer">
        Découvrir nos autres projets ${ICONS.arrowUpRight}
      </a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 ${esc(SITE.studio)}. Tous droits réservés.</p>
    <p class="footer-note">Site de démonstration réalisé par ${esc(SITE.studio)} — agence, circuits, personnes et témoignages fictifs. Destinations réelles, prestataires imaginaires.</p>
    <a class="back-top" href="#contenu" data-top>Haut de page ${ICONS.arrow.replace('<svg', '<svg style="transform:rotate(-90deg)"')}</a>
  </div>
</footer>
<script src="${rel}assets/js/main.js?v=20261102f" defer></script>
</body>
</html>`;
}

function heroHTML(file, h) {
  const rel = relPath(file);
  if (h.kind === "image") {
    return `<section class="hero ${h.size || ""}" ${h.id ? `id="${h.id}"` : ""}>
  <div class="hero-media"><img src="${rel}${h.image}" alt="${esc(h.imageAlt || "")}" ${h.priority ? "" : 'loading="eager"'} fetchpriority="high"></div>
  <div class="hero-overlay"></div>
  ${h.grain === false ? "" : '<div class="grain" aria-hidden="true"></div>'}
  <div class="hero-content ${h.align || ""}">
    ${h.overline ? `<p class="overline">${esc(h.overline)}</p>` : ""}
    <h1 class="hero-title">${h.title}</h1>
    ${h.text ? `<p class="hero-text">${h.text}</p>` : ""}
    ${h.ctas ? `<div class="hero-ctas">${h.ctas.map((c) => `<a class="btn ${c.cls || "btn-terra"}" href="${hrefFrom(file, c.href)}">${esc(c.label)} ${ICONS.arrow}</a>`).join("")}</div>` : ""}
  </div>
  ${h.scrollCue === false ? "" : '<a class="scroll-cue" href="#contenu" aria-label="Défiler vers le contenu"><span></span></a>'}
</section>`;
  }
  if (h.kind === "compact") {
    return `<section class="page-head ${h.tone || ""}">
  ${h.grain === false ? "" : '<div class="grain" aria-hidden="true"></div>'}
  <div class="container">
    <p class="overline">${esc(h.overline || "")}</p>
    <h1 class="page-title">${h.title}</h1>
    ${h.text ? `<p class="page-lead">${h.text}</p>` : ""}
  </div>
</section>`;
  }
  return "";
}
