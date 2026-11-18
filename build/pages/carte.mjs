import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { imgTag, breadcrumb, ctaBand } from "../components.mjs";
import { MAP, PINS, pinXY, labelFor } from "../data/map.mjs";
import { imgSrc } from "../data/images.mjs";

export function renderCarte({ dests }) {
  const content = `
${breadcrumb("carte.html", [["Carte des destinations"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Carte interactive</p>
  <h1 style="max-width:18ch">Le terrain de <em class="serif-em">jeu</em></h1>
  <p class="lead" style="max-width:62ch">Survolez ou touchez une épingle : chaque point raconte un lieu que nos itinéraires traversent. Cliquez pour rejoindre la fiche du circuit associé. Carte stylisée, à notre façon.</p>
</section>

<section class="section-tight night on-dark">
  <div class="container">
    <div class="map-wrap" data-map>
      <svg class="africa-map" viewBox="${MAP.viewBox}" role="group" aria-label="Carte stylisée d'Afrique avec nos 22 lieux de safari">
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="rgba(217,168,85,0.10)"/>
            <stop offset="100%" stop-color="rgba(217,168,85,0)"/>
          </radialGradient>
        </defs>
        <rect width="900" height="980" fill="url(#glow)"/>
        ${MAP.seaHint.map((d) => `<path d="${d}" fill="none" stroke="rgba(217,168,85,0.18)" stroke-width="1.5" stroke-dasharray="2 7" stroke-linecap="round"/>`).join("")}
        <path class="country" d="${MAP.path}" />
        <path class="country" d="${MAP.madagascar}" />
        <g fill="none" stroke="rgba(244,237,221,0.08)" stroke-width="1">
          ${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${115 * i + 70} H940" stroke-dasharray="1 9"/>`).join("")}
        </g>
        <g>
          ${PINS.map((p) => {
    const [x, y] = pinXY(p);
    const lb = labelFor(p);
    return `<g class="map-pin" data-slug="${p.key}" data-name="${esc(p.label)}" data-blurb="${esc(p.blurb)}" data-link="${hrefFrom("carte.html", p.link)}" data-link-label="Voir le circuit" role="button" tabindex="0" aria-label="${esc(p.label)} — ${esc(p.blurb)}">
            <circle class="ring" cx="${x}" cy="${y}" r="7"/>
            <circle class="dot" cx="${x}" cy="${y}" r="4.5"/>
            <text class="map-label" x="${lb.x}" y="${lb.y}" text-anchor="${lb.anchor}">${esc(p.label)}</text>
          </g>`;
  }).join("")}
        </g>
      </svg>
      <div class="map-tooltip" role="status">
        <h3></h3>
        <p></p>
        <a href="#">Découvrir</a>
      </div>
    </div>
    <div class="map-legend">
      <span><i></i> Lieux traversés par nos circuits</span>
      <span>Carte stylisée — orientation indiciale, pas de navigation sur le terrain !</span>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Par territoire</p>
        <h2>Les grandes <em class="serif-em">régions</em></h2>
      </div>
    </div>
    <div class="grid grid-3">
      ${dests.map((d, i) => `
      <a class="card reveal" href="${hrefFrom("carte.html", `destinations/${d.slug}.html`)}" data-map-highlight="${d.mapPoint}" style="--d:${i * 60}ms">
        <div class="card-body">
          <p class="card-kicker">${esc(d.name)}</p>
          <h3 style="font-size:1.35rem">${esc(d.short)}</h3>
          <p>${esc(d.landscapes.join(" · "))}</p>
          <span class="text-link card-cta">Découvrir la destination ${ICONS.arrow}</span>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>
${ctaBand("carte.html", {
    title: `Tracez <em>votre</em> itinéraire`,
    text: "Ces points sont nos lieux de prédilection — à vous de les relier. Nous dessinons la route.",
    ctas: [{ label: "Créer mon voyage sur mesure", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "carte.html",
    title: "Carte des destinations & circuits safari — Horizons Sauvages",
    description: "Explorez la carte interactive des destinations Horizons Sauvages : Serengeti, Ngorongoro, Masai Mara, Okavango, Sossusvlei, Kruger, Virunga, chutes Victoria…",
    content,
  });
}
