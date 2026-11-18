import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { MONTHS_SHORT } from "../config.mjs";
import { imgTag, destCard, circuitCard, ctaBand, breadcrumb } from "../components.mjs";

export function renderDestinations({ dests, circuits }) {
  addSchema({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destinations Horizons Sauvages",
    itemListElement: dests.map((d, i) => ({
      "@type": "ListItem", position: i + 1,
      url: `${SITE.domain}/destinations/${d.slug}.html`, name: d.name,
    })),
  });
  const content = `
${breadcrumb("destinations.html", [["Destinations"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Afrique de l'Est & australe</p>
  <h1 style="max-width:18ch">Sept territoires, sept <em class="serif-em">personnalités</em></h1>
  <p class="lead" style="max-width:64ch">Nous ne travaillons que des pays que nous parcourons nous-mêmes, chaque année. Voici comment nous les racontons — et quand y aller.</p>
  <h2 class="visually-hidden">Les sept destinations</h2>
  <div class="grid grid-3" style="margin-top:3rem">
    ${dests.map((d) => destCard(d, "destinations.html", 820)).join("")}
    <a class="dest-card reveal" href="${hrefFrom("destinations.html", "carte.html")}" style="background:var(--night);color:var(--ivory);min-height:430px;align-items:center;justify-content:center;text-align:center">
      <div class="dest-body" style="padding:2rem">
        <span style="display:inline-flex;width:2.6rem;height:2.6rem;color:var(--gold-bright);margin-bottom:1rem">${ICONS.compass}</span>
        <h3 style="font-size:1.6rem">Explorer sur la carte</h3>
        <p style="justify-content:center">Parcs, deltas, chutes et dunes — suivez le fil ${ICONS.arrow}</p>
      </div>
    </a>
  </div>
</section>
${ctaBand("destinations.html", {
    title: `Une envie précise, <em>une autre idée</em> ?`,
    text: "Combinons les territoires : le cratère et la côte, les dunes et le delta. C'est tout l'intérêt du sur mesure.",
    ctas: [{ label: "Composer mon voyage", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "destinations.html",
    title: "Destinations safari — Tanzanie, Kenya, Botswana… | Horizons Sauvages",
    description: "7 destinations de safari et de nature choisies sur le terrain : Tanzanie, Kenya, Botswana, Namibie, Afrique du Sud, Rwanda, Zambie. Périodes idéales, faune, conseils.",
    content,
  });
}

export function renderDestinationDetail({ d, circuits }) {
  const related = circuits.filter((c) => c.dests.includes(d.slug));
  addSchema({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.intro.join(" "),
    url: `${SITE.domain}/destinations/${d.slug}.html`,
    touristType: d.fauna,
  });
  const content = `
${breadcrumb(`destinations/${d.slug}.html`, [["Destinations", "destinations.html"], [d.name]])}
<article>
  <header class="container section-tight" style="padding-top:0">
    <p class="overline">Destination</p>
    <h1 style="max-width:16ch">${esc(d.name)}</h1>
    <p class="lead" style="max-width:60ch">${esc(d.short)}.</p>
  </header>
  <figure class="container" style="margin:0 0 clamp(3rem,7vh,5rem)">${imgTag(d.hero, 1600, "", 'style="border-radius:26px;aspect-ratio:21/9;object-fit:cover;width:100%" fetchpriority="high"')}</figure>

  <section class="container section-tight" style="padding-top:0">
    <div class="split" style="align-items:start">
      <div class="reveal">
        <h2>Le pays, <em class="serif-em">comme on le connaît</em></h2>
        ${d.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
        <div class="fauna-chips" style="margin-top:1.4rem">
          ${d.fauna.map((f) => `<span class="chip">${esc(f)}</span>`).join("")}
        </div>
      </div>
      <div class="reveal" style="--d:80ms;display:grid;gap:1.2rem">
        <h2 class="visually-hidden">La destination en bref</h2>
      <div class="includes-box">
          <h3 style="margin-top:0">${ICONS.sun}Quand partir ?</h3>
          ${d.bestPeriods.map((p) => `<p style="margin-bottom:.8rem"><strong>${esc(p.period)}</strong><br><span style="color:var(--ink-soft);font-size:.95rem">${esc(p.why)}</span></p>`).join("")}
          <p style="margin:0;font-size:.9rem;color:var(--ink-soft)">${esc(d.seasonsNote)}</p>
        </div>
        <div class="includes-box">
          <h3 style="margin-top:0">${ICONS.leaf}Paysages</h3>
          <div class="fauna-chips">${d.landscapes.map((l) => `<span class="chip">${esc(l)}</span>`).join("")}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section soft">
    <div class="container">
      <div class="kicker-row">
        <div class="section-head reveal">
          <p class="overline">Nos circuits</p>
          <h2>${esc(d.name)}, <em class="serif-em">concrètement</em></h2>
        </div>
        <a class="btn btn-ghost reveal" href="${hrefFrom(`destinations/${d.slug}.html`, "circuits.html")}">Tous les circuits ${ICONS.arrow}</a>
      </div>
      <div class="grid grid-3">${related.map((c) => circuitCard(c, `destinations/${d.slug}.html`)).join("")}</div>
      ${related.length === 0 ? `<p class="lead">Aucun circuit daté pour cette destination pour le moment — mais nous y allons en sur mesure.</p>` : ""}
    </div>
  </section>

  <section class="section">
    <div class="container-narrow">
      <div class="section-head reveal">
        <p class="overline">Conseils de terrain</p>
        <h2>Ce que nous <em class="serif-em">recommandons</em></h2>
      </div>
      <ol class="timeline" style="--bg:var(--bg)">
        ${d.tips.map((t, i) => `
        <li class="timeline-day reveal">
          <span class="day-badge" aria-hidden="true"><strong>${i + 1}</strong></span>
          <p style="margin:0;font-size:1.05rem">${esc(t)}</p>
        </li>`).join("")}
      </ol>
    </div>
  </section>
  ${ctaBand(`destinations/${d.slug}.html`, {
    title: `${esc(d.name)} vous <em>appelle</em> ?`,
    text: "Dites-nous la saison, le rythme, le confort rêvé — nous dessinons l'itinéraire.",
    ctas: [
      { label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Voir la carte", href: "carte.html", cls: "btn-ghost" },
    ],
  })}
</article>`;
  return page({
    file: `destinations/${d.slug}.html`,
    title: `Safari ${d.name} — périodes, faune, circuits | Horizons Sauvages`,
    description: `${d.name} avec Horizons Sauvages : ${d.short}. Meilleures périodes, faune à observer, paysages et nos circuits datés.`,
    content,
  });
}
