import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { STORY, CHIFFRES_CLE } from "../data/site.mjs";
import { imgTag, breadcrumb, ctaBand, avatar } from "../components.mjs";

export function renderAgence({ team }) {
  addSchema({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    description: SITE.description,
    url: SITE.domain,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "18, quai du Port",
      postalCode: "13002",
      addressLocality: "Marseille",
      addressCountry: "FR",
    },
    openingHours: "Mo-Fr 09:00-18:30, Sa 10:00-17:00",
    foundingDate: "2011",
    founder: { "@type": "Person", name: "Camille Aubertin" },
  });
  const marseilleTeam = team.filter((t) => t.home.includes("Marseille")).slice(0, 4);
  const content = `
${breadcrumb("agence.html", [["L'agence"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Depuis 2011, quai du Port</p>
  <h1 style="max-width:18ch">Une agence née d'un <em class="serif-em">aller simple</em></h1>
  <p class="lead" style="max-width:64ch">Horizons Sauvages, c'est une équipe marseillaise de spécialistes de l'Afrique et quatre correspondants qui vivent sur place. Petite par choix, exigeante par nature.</p>
</section>

<section class="container" style="padding-bottom:clamp(3rem,7vh,5rem)">
  <figure class="reveal-img" style="margin:0">${imgTag("agence-bureau", 1600, "", 'style="border-radius:26px;aspect-ratio:21/8;object-fit:cover;width:100%" fetchpriority="high"')}
  <figcaption style="font-size:.85rem;color:var(--ink-soft);margin-top:.7rem;text-align:center">Nos bureaux donnent sur le Vieux-Port — entre deux ferries, un safari s'écrit.</figcaption></figure>
</section>

${[STORY.chapter1, STORY.chapter2].map((ch, i) => `
<section class="section-tight ${i % 2 ? "soft" : ""}" style="padding:clamp(3.5rem,8vh,6rem) 0">
  <div class="container-narrow">
    <span class="chapter-num reveal" aria-hidden="true">Chapitre ${i + 1}</span>
    <h2 class="reveal" style="font-size:clamp(1.8rem,3.6vw,2.8rem)">${esc(ch.title)}</h2>
    ${ch.paras.map((p) => `<p class="reveal" style="font-size:1.08rem">${esc(p)}</p>`).join("")}
  </div>
</section>`).join("")}

<section class="section night on-dark">
  <div class="container">
    <div class="section-head center reveal">
      <p class="overline">Nos engagements</p>
      <h2>Ce en quoi nous <em class="serif-em">croyons</em></h2>
    </div>
    <div class="grid grid-2">
      ${STORY.engagements.map((e, i) => `
      <article class="includes-box reveal" style="--d:${i * 60}ms;background:var(--night-2);border-color:var(--line-dark)">
        <h3 style="color:var(--gold-bright)"><span style="display:inline-flex;width:1.4rem;height:1.4rem">${ICONS[e.icon]}</span>${esc(e.title)}</h3>
        <p style="margin:0;color:rgba(244,237,221,.75)">${esc(e.text)}</p>
      </article>`).join("")}
    </div>
    <div class="stats-row reveal" style="margin-top:3rem">
      ${STORY.stats.map((s) => `<div class="stat"><b>${s.value}<sup>${s.sup}</sup></b><span>${esc(s.label)}</span></div>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="kicker-row">
      <div class="section-head reveal">
        <p class="overline">L'équipe</p>
        <h2>Des visages, pas un <em class="serif-em">formulaire</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("agence.html", "equipe.html")}">Toute l'équipe ${ICONS.arrow}</a>
    </div>
    <div class="grid grid-4">
      ${marseilleTeam.map((t, i) => `
      <article class="team-card reveal" style="--d:${i * 60}ms">
        <div class="card-media" aria-hidden="true">${avatar(t.name, i + 1)}</div>
        <h3 style="font-size:1.25rem;margin-bottom:.15em">${esc(t.name)}</h3>
        <p class="role" style="margin-bottom:.6em">${esc(t.role)}</p>
        <p style="font-size:.92rem;color:var(--ink-soft)">${esc(t.quote)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="section soft" id="infos-agence">
  <div class="container">
    <div class="split" style="align-items:start">
      <div class="reveal">
        <p class="overline">Nous trouver</p>
        <h2>Le Vieux-Port, <em class="serif-em">face à l'horizon</em></h2>
        <p style="display:flex;gap:.7rem;align-items:flex-start">${ICONS.pin.replace('<svg', '<svg style="flex:none;width:1.2rem;height:1.2rem;color:var(--terra);margin-top:.2em"')}18, quai du Port — 13002 Marseille, France<br><span style="color:var(--ink-soft)">Métro Vieux-Port, parking Fortin.</span></p>
        <p style="display:flex;gap:.7rem;align-items:flex-start">${ICONS.mail.replace('<svg', '<svg style="flex:none;width:1.2rem;height:1.2rem;color:var(--terra);margin-top:.2em"')}<a class="text-link" href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p style="display:flex;gap:.7rem;align-items:flex-start;margin-bottom:0">${ICONS.clock.replace('<svg', '<svg style="flex:none;width:1.2rem;height:1.2rem;color:var(--terra);margin-top:.2em"')}<span>${SITE.hours.map((h) => `<strong style="min-width:15em;display:inline-block">${esc(h.days)}</strong>${esc(h.time)}`).join("<br>")}</span></p>
        <div style="margin-top:1.6rem;display:flex;gap:1rem;flex-wrap:wrap">
          <a class="btn btn-terra" href="${hrefFrom("agence.html", "contact.html")}">Nous contacter ${ICONS.arrow}</a>
          <a class="btn btn-ghost" href="${hrefFrom("agence.html", "equipe.html")}">Rencontrer l'équipe</a>
        </div>
      </div>
      <div class="split-media reveal" style="--d:80ms">
        <div class="includes-box">
          <h3 style="margin-top:0">${ICONS.compass}Accès</h3>
          <ul style="list-style:none;padding:0;margin:0">
            <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.plane.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--gold);margin-top:.25em"')}<span>Aéroport Marseille-Provence : 30 min en navette.</span></li>
            <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.route.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--gold);margin-top:.25em"')}<span>Gare Saint-Charles : TGV Paris en 3 h, puis métro ligne 1.</span></li>
            <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.pin.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--gold);margin-top:.25em"')}<span>Arrêt métro / tram : Vieux-Port, sortie Musée des Docks.</span></li>
            <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.clock.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--gold);margin-top:.25em"')}<span>Sur rendez-vous en dehors des heures d'ouverture.</span></li>
          </ul>
          <p style="margin:1rem 0 0;font-size:.9rem;color:var(--ink-soft)">Nous pouvons aussi venir à vous : visioconférence sur demande, partout en France.</p>
        </div>
      </div>
    </div>
  </div>
</section>
${ctaBand("agence.html", {
    title: `Venez écrire <em>le prochain chapitre</em>`,
    text: "Le vôtre, cette fois. Une première ébauche sous 48 h.",
    ctas: [{ label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "agence.html",
    title: "L'agence — histoire, philosophie & engagements | Horizons Sauvages",
    description: "Depuis 2011 à Marseille, Horizons Sauvages dessine des safaris sur mesure. Notre histoire, notre philosophie du voyage et nos engagements tourisme responsable.",
    content,
  });
}
