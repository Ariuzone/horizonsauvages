import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { circuitCard, ctaBand, breadcrumb, imgTag } from "../components.mjs";
import { MONTHS_SHORT } from "../config.mjs";

const DEST_LABELS = {
  tanzanie: "Tanzanie", kenya: "Kenya", botswana: "Botswana", namibie: "Namibie",
  "afrique-du-sud": "Afrique du Sud", rwanda: "Rwanda", zambie: "Zambie",
};
const TYPE_LABELS = {
  faune: "Faune & safari", photo: "Photo", famille: "Famille", couple: "En couple",
  noces: "Voyage de noces", groupe: "Groupe", entreprise: "Entreprise", trek: "Randonnée", nature: "Nature",
};

export function renderCircuits({ circuits }) {
  addSchema({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Circuits Horizons Sauvages",
    itemListElement: circuits.map((c, i) => ({
      "@type": "ListItem", position: i + 1,
      url: `${SITE.domain}/circuits/${c.slug}.html`,
      name: c.title,
    })),
  });

  const content = `
${breadcrumb("circuits.html", [["Tous nos circuits"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">14 itinéraires dessinés à la main</p>
  <h1 style="max-width:16ch">Choisissez un point de départ</h1>
  <p class="lead" style="max-width:60ch">Chaque circuit est une base de travail solide — la bonne saison, les bons camps, les bonnes distances. Tout s'ajuste ensuite : durée, confort, budget… dites-nous simplement.</p>

  <div class="filters-bar" role="search" aria-label="Filtres des circuits">
    <div>
      <span class="filter-label">Destination</span>
      <div class="chip-row">
        ${Object.entries(DEST_LABELS).map(([slug, label]) => `<button type="button" class="chip" data-filter="dest" data-value="${slug}" aria-pressed="false">${label}</button>`).join("")}
      </div>
    </div>
    <div>
      <span class="filter-label">Type de voyage</span>
      <div class="chip-row">
        ${Object.entries(TYPE_LABELS).map(([slug, label]) => `<button type="button" class="chip" data-filter="type" data-value="${slug}" aria-pressed="false">${label}</button>`).join("")}
      </div>
    </div>
    <div class="field-row" style="margin-top:1rem">
      <div>
        <span class="filter-label">Durée</span>
        <div class="chip-row">
          <button type="button" class="chip" data-filter="duration" data-value="court" aria-pressed="false">≤ 7 jours</button>
          <button type="button" class="chip" data-filter="duration" data-value="moyen" aria-pressed="false">8 – 11 jours</button>
          <button type="button" class="chip" data-filter="duration" data-value="long" aria-pressed="false">12 jours et +</button>
        </div>
      </div>
      <div>
        <span class="filter-label">Budget / pers.</span>
        <div class="chip-row">
          <button type="button" class="chip" data-filter="budget" data-value="eco" aria-pressed="false">– 3 500 €</button>
          <button type="button" class="chip" data-filter="budget" data-value="moyen" aria-pressed="false">3 500 – 6 000 €</button>
          <button type="button" class="chip" data-filter="budget" data-value="haut" aria-pressed="false">+ 6 000 €</button>
        </div>
      </div>
      <div>
        <span class="filter-label">Meilleure saison</span>
        <div class="chip-row">
          ${MONTHS_SHORT.map((m, i) => `<button type="button" class="chip" data-filter="season" data-value="${i + 1}" aria-pressed="false">${m}</button>`).join("")}
        </div>
      </div>
    </div>
    <div class="filters-footer">
      <p class="result-count"><strong data-count>14</strong> circuit(s) correspondent à votre recherche</p>
      <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <label class="visually-hidden" for="tri">Trier les circuits</label>
        <select id="tri" class="sort-select" data-sort>
          <option value="popular">Trier : popularité</option>
          <option value="priceAsc">Trier : prix croissant</option>
          <option value="priceDesc">Trier : prix décroissant</option>
          <option value="durationAsc">Trier : durée croissante</option>
          <option value="durationDesc">Trier : durée décroissante</option>
        </select>
        <button type="button" class="text-link" data-filters-reset style="background:none;border:none;cursor:pointer;padding:0">Réinitialiser les filtres</button>
      </div>
    </div>
  </div>

  <h2 class="visually-hidden">Les circuits correspondant à vos filtres</h2>
  <div class="grid grid-3" data-circuit-list>
    ${circuits.map((c) => circuitCard(c, "circuits.html")).join("")}
  </div>
  <p class="lead" data-empty hidden style="text-align:center;padding:3rem 0">Aucun circuit ne correspond à cette combinaison — élargissez un filtre, ou <a class="text-link" href="${hrefFrom("circuits.html", "sur-mesure.html")}">demandez un sur mesure</a>.</p>
</section>
${ctaBand("circuits.html", {
    title: `Rien ne vous <em>convient</em> ?`,
    text: "Ces itinéraires sont des départs, pas des cases. Décrivez-nous votre voyage idéal.",
    ctas: [{ label: "Voyage sur mesure", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;

  return page({
    file: "circuits.html",
    title: "Nos circuits safari & voyages sur mesure — Horizons Sauvages",
    description: "14 itinéraires safari dessinés à la main : Tanzanie, Kenya, Botswana, Namibie, Afrique du Sud, Rwanda, Zambie. Filtrez par destination, durée, budget et saison.",
    content,
  });
}

export function renderCircuitDetail({ c, all }) {
  const related = all.filter((x) => x.slug !== c.slug && x.dests.some((d) => c.dests.includes(d))).slice(0, 3);
  const comfortLabels = { 1: "Confort safari", 2: "Confort premium", 3: "Exceptionnel" };
  const meals = [...new Set(c.itinerary.map((d) => d.meals))];
  const destLabels = c.dests.map((d) => DEST_LABELS[d]).join(" · ");
  addSchema({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: c.title,
    description: c.intro,
    url: `${SITE.domain}/circuits/${c.slug}.html`,
    touristType: c.types,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: c.duration,
      itemListElement: c.itinerary.map((d) => ({
        "@type": "ListItem", position: d.day, name: `Jour ${d.day} — ${d.title}`,
      })),
    },
    offers: { "@type": "Offer", price: c.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.domain },
  });

  const content = `
${breadcrumb("circuits/" + c.slug + ".html", [["Circuits", "circuits.html"], [c.title]])}
<article>
  <header class="container section-tight" style="padding-top:0">
    <p class="overline">${esc(c.subtitle)}</p>
    <h1 style="max-width:18ch">${esc(c.title)}</h1>
    <p class="lead" style="max-width:64ch">${esc(c.intro)}</p>
    <div class="dest-hero-info">
      <h2 class="visually-hidden">Le circuit en bref</h2>
    <div class="dest-info-cell"><h3>Durée</h3><p>${c.duration} jours / ${c.duration - 1} nuits</p></div>
      <div class="dest-info-cell"><h3>Confort</h3><p>${comfortLabels[c.comfort]} — ${esc(c.comfortLabel)}</p></div>
      <div class="dest-info-cell"><h3>Tarif</h3><p><strong style="font-family:var(--font-serif);font-size:1.3rem;color:var(--terra)">${c.price.toLocaleString("fr-FR")} €</strong> à partir de, par personne</p></div>
      <div class="dest-info-cell"><h3>Groupe</h3><p>${esc(c.groupSize)}</p></div>
      <div class="dest-info-cell"><h3>Meilleure période</h3><p>${c.seasons.map((m) => MONTHS_SHORT[m - 1]).join(", ")}</p></div>
      <div class="dest-info-cell"><h3>Prochains départs</h3><p>${c.departures.map(esc).join(" · ")}</p></div>
    </div>
  </header>

  <figure class="container" style="margin:0 0 clamp(3rem,7vh,5rem)">${imgTag(c.image, 1600, "", 'style="border-radius:26px;aspect-ratio:21/9;object-fit:cover;width:100%" fetchpriority="high"')}</figure>

  <section class="section-tight" style="padding-top:0">
    <div class="container">
      <div class="split" style="align-items:start">
        <div>
          <h2 style="font-size:clamp(1.6rem,3vw,2.2rem)">Ce que vous allez <em class="serif-em">vivre</em></h2>
          <ul style="list-style:none;padding:0;margin:1.4rem 0 0;display:grid;gap:.9rem">
            ${c.highlights.map((h) => `<li style="display:flex;gap:.8rem;align-items:flex-start">${ICONS.check.replace('<svg', '<svg style="flex:none;width:1.2rem;height:1.2rem;color:var(--green);margin-top:.25em"')}<span>${esc(h)}</span></li>`).join("")}
          </ul>
        </div>
        <div class="includes-box" style="background:var(--bg-soft);border:0">
          <h3 style="margin-top:0">${ICONS.route}Le fil du voyage</h3>
          <ol style="list-style:none;padding:0;margin:0;display:grid;gap:.5rem;font-size:.95rem">
            ${c.itinerary.filter((_, i) => i % 2 === 0).map((d) => `<li style="display:flex;gap:.7rem"><strong style="color:var(--terra);font-family:var(--font-serif);font-style:italic;flex:none;min-width:2.2em">J${d.day}</strong><span>${esc(d.title)}</span></li>`).join("")}
          </ol>
          <a class="btn btn-terra btn-sm" style="margin-top:1.4rem" href="${hrefFrom("circuits/" + c.slug + ".html", "sur-mesure.html")}">Personnaliser ce circuit ${ICONS.arrow}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section night on-dark" id="itineraire">
    <div class="container">
      <div class="section-head reveal">
        <p class="overline">Jour par jour</p>
        <h2>L'itinéraire <em class="serif-em">en détail</em></h2>
        <p class="lead">Un rythme pensé pour la lumière du matin et du soir — les heures où la savane s'anime.</p>
      </div>
      <ol class="timeline">
        ${c.itinerary.map((d) => `
        <li class="timeline-day reveal">
          <span class="day-badge" aria-hidden="true"><small>Jour</small><strong>${d.day}</strong></span>
          <h3>${esc(d.title)}</h3>
          <p>${esc(d.text)}</p>
          <span class="lodging-tag">${ICONS.bed}${esc(d.lodging)}</span>
          <span class="lodging-tag">${ICONS.fork}${esc(d.meals)}</span>
        </li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="overline">Galerie</p>
        <h2>En images, <em class="serif-em">sans retouche</em></h2>
      </div>
      <div class="grid grid-2">
        ${c.gallery.map((k, i) => `<figure class="reveal-img" style="margin:0">${imgTag(k, 820, "", 'style="border-radius:18px;aspect-ratio:16/10;object-fit:cover;width:100%"')}</figure>`).join("")}
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="container">
      <h2 style="margin-bottom:1.6rem">Ce qui est <em class="serif-em">inclus</em></h2>
      <div class="includes-grid">
        <div class="includes-box yes">
          <h3>${ICONS.check}Inclus dans le tarif</h3>
          <ul>${c.included.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>
        </div>
        <div class="includes-box no">
          <h3>${ICONS.cross}Non inclus</h3>
          <ul>${c.notIncluded.map((x) => `<li>${ICONS.cross}<span>${esc(x)}</span></li>`).join("")}</ul>
        </div>
      </div>
      <div class="includes-box" style="margin-top:1.4rem">
        <h3>${ICONS.calendar}Départs 2026</h3>
        <p style="margin:0">${c.departures.map((d) => `<span class="lodging-tag" style="margin:.2rem .3rem .2rem 0">${esc(d)}</span>`).join("")} — autres dates possibles en privé : <a class="text-link" href="${hrefFrom("circuits/" + c.slug + ".html", "sur-mesure.html")}">demandez un départ sur mesure</a>.</p>
      </div>
    </div>
  </section>

  ${related.length ? `
  <section class="section">
    <div class="container">
      <div class="kicker-row">
        <div class="section-head reveal"><p class="overline">Dans la même région</p><h2>Continuez <em class="serif-em">l'exploration</em></h2></div>
        <a class="btn btn-ghost reveal" href="${hrefFrom("circuits/" + c.slug + ".html", "circuits.html")}">Tous les circuits ${ICONS.arrow}</a>
      </div>
      <div class="grid grid-3">${related.map((r) => circuitCard(r, "circuits/" + c.slug + ".html")).join("")}</div>
    </div>
  </section>` : ""}
  ${ctaBand("circuits/" + c.slug + ".html", {
    title: `Ce circuit, <em>votre version</em>`,
    text: "Allongez une étape, changez un camp, ajoutez une extension balnéaire : tout se discute.",
    ctas: [
      { label: "Personnaliser ce voyage", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Parler à un conseiller", href: "contact.html", cls: "btn-ghost" },
    ],
  })}
</article>`;

  return page({
    file: `circuits/${c.slug}.html`,
    title: `${c.title} — ${destLabels} | ${SITE.name}`,
    description: `${c.title} : ${c.duration} jours en ${destLabels}. ${c.intro.slice(0, 110)}…`,
    ogType: "article",
    content,
  });
}
