import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { STORY, TYPES_VOYAGE, CHIFFRES_CLE, GALERIE } from "../data/site.mjs";
import { imgTag, circuitCard, destCard, reviewCard, articleCard, ctaBand, avatar } from "../components.mjs";

export function renderHome({ dests, circuits, avis, journal }) {
  const featured = [...circuits].sort((a, b) => (b.popular || 5) - (a.popular || 5)).slice(0, 3);
  const topAvis = avis.filter((a) => a.rating >= 5).slice(0, 3);
  const topJournal = journal.slice(0, 3);
  addSchema({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    inLanguage: "fr-FR",
    description: SITE.description,
  });

  const content = `
${/* 1. Hero */ ""}
<section class="hero">
  <div class="hero-media"><img src="assets/img/circuits/circ-ambiance-1600w.webp" alt="Silhouette d'acacia au couchant sur la savane" fetchpriority="high"></div>
  <div class="hero-overlay"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="hero-content">
    <p class="overline">Agence de safaris & voyages sur mesure — Marseille</p>
    <h1 class="hero-title">L'Afrique, <em>dessinée</em> pour vous</h1>
    <p class="hero-text">Quinze ans de brousse, sept pays, un seul métier : composer des safaris et des voyages de nature sur mesure, avec des équipes qui vivent sur place toute l'année.</p>
    <div class="hero-ctas">
      <a class="btn btn-terra" href="${hrefFrom("index.html", "sur-mesure.html")}">Créer mon voyage ${ICONS.arrow}</a>
      <a class="btn btn-ghost" href="${hrefFrom("index.html", "circuits.html")}">Découvrir nos circuits</a>
    </div>
  </div>
  <a class="scroll-cue" href="#contenu" aria-label="Défiler vers le contenu"><span></span></a>
</section>

${/* 2. Manifeste + chiffres */ ""}
<section class="section night on-dark">
  <div class="container">
    <div class="split" style="align-items:start">
      <div class="reveal">
        <p class="overline">Notre métier</p>
        <h2>Ni catalogue,<br>ni <em class="serif-em">promesse creuse</em></h2>
        <p class="lead" style="margin-top:1.4rem">Nous dessinons chaque itinéraire à la main, à partir de ce que nous avons vu de nos propres yeux. Chaque voyage est repéré, testé et réajusté année après année : la savane change, les saisons bougent, et personne ne rêve pareil.</p>
      </div>
      <div class="reveal" style="--d:80ms">
        <blockquote style="margin:0">
          <p class="pull-quote">${esc(STORY.quote.text)}</p>
          <p class="quote-author">${esc(STORY.quote.author)}</p>
        </blockquote>
      </div>
    </div>
    <div class="stats-row reveal" style="margin-top:clamp(3rem,7vh,5rem)">
      ${STORY.stats.map((s) => `<div class="stat"><b>${s.value}<sup>${s.sup}</sup></b><span>${esc(s.label)}</span></div>`).join("")}
    </div>
  </div>
</section>

${/* 3. Destinations */ ""}
<section class="section">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Destinations</p>
        <h2>Sept territoires,<br>sept <em class="serif-em">personnalités</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("index.html", "destinations.html")}">Toutes les destinations ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-3">
      ${dests.slice(0, 3).map((d, i) => destCard(d, "index.html", 820)).join("")}
      ${dests.slice(3, 5).map((d) => destCard(d, "index.html", 820)).join("")}
      ${dests.slice(5, 7).map((d) => destCard(d, "index.html", 820)).join("")}
    </div>
  </div>
</section>

${/* 4. Circuits vedettes */ ""}
<section class="section soft">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Circuits signature</p>
        <h2>Les voyages qui font <em class="serif-em">notre réputation</em></h2>
        <p class="lead">Quatorze itinéraires dessinés à la main, jour par jour — celui-ci n'est que le point de départ : tout s'ajuste.</p>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("index.html", "circuits.html")}">Tous les circuits ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-3">${featured.map((c) => circuitCard(c, "index.html")).join("")}</div>
  </div>
</section>

${/* 5. Histoire */ ""}
<section class="section">
  <div class="container">
    <div class="split">
      <div class="split-media reveal-img">${imgTag("journal-camp", 1600)}
        <div class="float-card">${ICONS.binoculars}<span>Chaque conseiller retourne sur le terrain au moins une fois par an.</span></div>
      </div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Notre histoire</p>
        <h2>${esc(STORY.chapter1.title)}</h2>
        ${STORY.chapter1.paras.map((p) => `<p>${esc(p)}</p>`).join("")}
        <a class="text-link" href="${hrefFrom("index.html", "agence.html")}">Lire notre histoire complète ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>

${/* 6. Engagements */ ""}
<section class="section night-2 on-dark">
  <div class="container">
    <div class="section-head center reveal">
      <p class="overline">Nos engagements</p>
      <h2>Voyager sans <em class="serif-em">abîmer</em></h2>
      <p class="lead">Quatre règles non négociables, appliquées à chaque itinéraire, chaque camp, chaque départ.</p>
    </div>
    <div class="grid grid-2">
      ${STORY.engagements.map((e, i) => `
      <article class="reveal" style="--d:${i * 60}ms;display:flex;gap:1.3rem;align-items:flex-start">
        <span style="flex:none;width:3.2rem;height:3.2rem;border-radius:50%;border:1.5px solid var(--line-dark);display:flex;align-items:center;justify-content:center;color:var(--gold-bright)"><span style="width:1.6rem;height:1.6rem;display:inline-flex">${ICONS[e.icon]}</span></span>
        <div><h3 style="font-size:1.4rem">${esc(e.title)}</h3><p style="color:rgba(244,237,221,.75);margin:0">${esc(e.text)}</p></div>
      </article>`).join("")}
    </div>
  </div>
</section>

${/* 7. Types de voyages */ ""}
<section class="section">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Pour qui ?</p>
        <h2>Chaque voyage a <em class="serif-em">son rythme</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("index.html", "types-de-voyages.html")}">Types de voyages ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-3">
      ${TYPES_VOYAGE.map((t, i) => `
      <a class="card reveal" href="${hrefFrom("index.html", "types-de-voyages.html")}#${t.id}" style="--d:${i * 60}ms">
        <div class="card-body">
          <span style="width:2.4rem;height:2.4rem;color:var(--terra);display:inline-flex;margin-bottom:.6rem">${ICONS[t.icon]}</span>
          <h3 style="font-size:1.45rem">${esc(t.title)}</h3>
          <p>${esc(t.accroche)}</p>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>

${/* 8. Sur mesure */ ""}
<section class="section night on-dark">
  <div class="container">
    <div class="split rev">
      <div class="split-media reveal-img">${imgTag("surmesure-conseil", 1600)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Sur mesure</p>
        <h2>Racontez-nous votre voyage <em class="serif-em">idéal</em></h2>
        <p class="lead">Cinq étapes, dix minutes : destination, saison, voyageurs, budget, envies. Un conseiller vous répond sous 48 h avec une première proposition, gratuite et sans engagement.</p>
        <ol style="list-style:none;padding:0;margin:1.6rem 0 2rem;display:grid;gap:.9rem">
          ${["Votre horizon — pays et saison rêvés", "Votre caravane — avec qui partez-vous ?", "Votre budget — la vraie fourchette, sans tabou", "Vos envies — les musts et les caprices", "Le récap — vérifiez, ajustez, envoyez"].map((s, i) => `
          <li style="display:flex;gap:1rem;align-items:center"><span style="font-family:var(--font-serif);font-style:italic;color:var(--gold-bright);font-size:1.4rem;flex:none;width:1.6rem">${i + 1}.</span><span>${esc(s.split("—")[0].trim())}<span style="color:rgba(244,237,221,.6)"> — ${esc(s.split("—")[1]?.trim() || "")}</span></span></li>`).join("")}
        </ol>
        <a class="btn btn-terra" href="${hrefFrom("index.html", "sur-mesure.html")}">Commencer ma demande ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>

${/* 9. Avis */ ""}
<section class="section">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Avis voyageurs</p>
        <h2>Ils sont partis <em class="serif-em">avant vous</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("index.html", "avis.html")}">Tous les avis ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-3">${topAvis.map((r, i) => reviewCard(r, "index.html", i)).join("")}</div>
  </div>
</section>

${/* 10. Journal */ ""}
<section class="section soft">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">Le journal</p>
        <h2>Carnets de <em class="serif-em">terrain</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("index.html", "journal.html")}">Tous les articles ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-3">${topJournal.map((a) => articleCard(a, "index.html")).join("")}</div>
  </div>
</section>

${ctaBand("index.html", {
    title: `Votre horizon commence <em>ici</em>`,
    text: "Parlez-nous de votre voyage rêvé — nous le dessinons, vous vivez.",
    ctas: [
      { label: "Créer mon voyage sur mesure", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Nous écrire", href: "contact.html", cls: "btn-ghost" },
    ],
  })}`;

  return page({
    file: "index.html",
    title: "Horizons Sauvages — Safaris & voyages sur mesure en Afrique",
    description: SITE.description,
    bodyClass: "home",
    content,
  });
}
