// Composants réutilisables (rendu HTML)
import { ICONS, esc, hrefFrom } from "./template.mjs";
import { IMG, imgSrc, imgAlt } from "./data/images.mjs";

const AVATAR_COLORS = [
  ["#24442f", "#d9a855"], ["#8f3d15", "#f4eddd"], ["#1e2620", "#e08a54"],
  ["#3d5a45", "#f4eddd"], ["#7a5c1e", "#fdf2ea"], ["#264d3b", "#d9a855"],
  ["#5a3418", "#f0d9a8"], ["#2f4a5a", "#d9a855"], ["#4a2442", "#e0b48a"],
];

export function avatar(name, i = 0) {
  const [bg, fg] = AVATAR_COLORS[i % AVATAR_COLORS.length];
  const initials = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return `<span class="review-avatar" style="background:${bg};color:${fg}" aria-hidden="true">${initials}</span>`;
}

export function imgTag(key, w, cls = "", attrs = "") {
  const meta = IMG[key];
  if (!meta) throw new Error(`Image inconnue : ${key}`);
  const src = imgSrc(key, w);
  return `<img class="${cls}" src="${src}" alt="${esc(imgAlt(key))}" loading="lazy" decoding="async" ${attrs}>`;
}

export function circuitCard(c, page) {
  const href = hrefFrom(page, `circuits/${c.slug}.html`);
  const comfortLabels = { 1: "Confort safari", 2: "Confort premium", 3: "Exceptionnel" };
  return `<article class="card reveal" data-circuit data-slug="${c.slug}" data-dest="${c.dests.join(",")}" data-type="${c.types.join(",")}" data-duration="${c.duration}" data-price="${c.price}" data-seasons="${c.seasons.join(",")}" data-popular="${c.popular || 5}">
  <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true">
    ${imgTag(c.image, 820)}
    <span class="badge">${comfortLabels[c.comfort]}</span>
  </a>
  <div class="card-body">
    <p class="card-kicker">${esc(c.subtitle)}</p>
    <h3><a href="${href}" class="card-link">${esc(c.title)}</a></h3>
    <p>${esc(c.intro.slice(0, 130))}…</p>
    <div class="card-meta">
      <span>${ICONS.calendar}${c.duration} jours</span>
      <span>${ICONS.users}${esc(c.groupSize)}</span>
    </div>
    <div class="price-line"><strong>${c.price.toLocaleString("fr-FR")} €</strong><span>à partir de / pers.</span></div>
    <a class="text-link card-cta" href="${href}">Voir le circuit ${ICONS.arrow}</a>
  </div>
</article>`;
}

export function destCard(d, page, size = 820) {
  const href = hrefFrom(page, `destinations/${d.slug}.html`);
  return `<a class="dest-card reveal" href="${href}">
  <img src="${hrefFrom(page, imgSrc(d.hero, size).replace(/^(\.\.\/)*/, ""))}" alt="${esc(imgAlt(d.hero))}" loading="lazy" decoding="async">
  <div class="dest-body">
    <h3>${esc(d.name)}</h3>
    <p>${esc(d.short)} ${ICONS.arrow}</p>
  </div>
</a>`;
}

export function reviewCard(r, page, i = 0) {
  const stars = Array.from({ length: r.rating }, () => `<span>${ICONS.star}</span>`).join("");
  return `<article class="review-card reveal" style="--d:${(i % 3) * 60}ms">
  <div class="review-stars" role="img" aria-label="${r.rating} étoiles sur 5">${stars}</div>
  <blockquote>« ${esc(r.text)} »</blockquote>
  <div class="review-meta">
    ${avatar(r.name, i)}
    <div><b>${esc(r.name)}</b><span>${esc(r.trip)} · ${esc(r.date)}</span></div>
  </div>
</article>`;
}

export function articleCard(a, page) {
  const href = hrefFrom(page, `journal/${a.slug}.html`);
  return `<article class="card article-card reveal">
  <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true">${imgTag(a.image, 820)}</a>
  <div class="card-body">
    <p class="card-kicker">${esc(a.category)}</p>
    <h3><a href="${href}" class="card-link">${esc(a.title)}</a></h3>
    <p>${esc(a.excerpt)}</p>
    <div class="article-meta">
      <span>${ICONS.users}${esc(a.author)}</span>
      <span>${ICONS.calendar}${esc(a.date)}</span>
      <span>${ICONS.clock}${a.readingTime} min</span>
    </div>
    <a class="text-link card-cta" href="${href}">Lire l'article ${ICONS.arrow}</a>
  </div>
</article>`;
}

export function ctaBand(page, { title, text, ctas }) {
  return `<section class="cta-band night">
  <div class="cta-media"><img src="${hrefFrom(page, imgSrc("circ-ambiance", 1600).replace(/^(\.\.\/)*/, ""))}" alt="" loading="lazy" decoding="async"></div>
  <div class="cta-inner on-dark">
    <p class="overline">Horizons Sauvages</p>
    <h2>${title}</h2>
    <p class="lead">${text}</p>
    <div class="hero-ctas" style="justify-content:center">
      ${ctas.map((c) => `<a class="btn ${c.cls || "btn-terra"}" href="${hrefFrom(page, c.href)}">${esc(c.label)} ${ICONS.arrow}</a>`).join("")}
    </div>
  </div>
</section>`;
}

export function breadcrumb(page, items) {
  return `<nav class="container" aria-label="Fil d'Ariane"><ol class="breadcrumb">
  <li><a href="${hrefFrom(page, "index.html")}">Accueil</a></li>
  ${items.map(([label, href]) => href
    ? `<li><a href="${hrefFrom(page, href)}">${esc(label)}</a></li>`
    : `<li><span aria-current="page">${esc(label)}</span></li>`).join("")}
</ol></nav>`;
}

export function icons() { return ICONS; }
