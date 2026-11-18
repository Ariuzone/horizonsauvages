import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { imgTag, breadcrumb } from "../components.mjs";

export function renderContact() {
  addSchema({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Horizons Sauvages",
    url: `${SITE.domain}/contact.html`,
  });
  const content = `
${breadcrumb("contact.html", [["Contact"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Nous écrire, nous voir</p>
  <h1 style="max-width:18ch">Une vraie personne, <em class="serif-em">une vraie réponse</em></h1>
  <p class="lead" style="max-width:62ch">Une question sur une destination, un départ, une formalité ? Écrivez-nous : chaque message est lu par un conseiller, et traité sous 48 h ouvrées.</p>
</section>

<section class="section-tight" style="padding-top:0;padding-bottom:clamp(4rem,9vh,6rem)">
  <div class="container">
    <div class="split" style="align-items:start">
      <div class="reveal">
        <h2 class="visually-hidden">Nous joindre</h2>
      <div class="includes-box">
          <h3 style="margin-top:0">${ICONS.mail}Par e-mail — le plus sûr</h3>
          <p>Pour une demande de voyage détaillée, utilisez de préférence <a class="text-link" href="${hrefFrom("contact.html", "sur-mesure.html")}">le formulaire sur mesure</a> : votre dossier arrive déjà structuré.</p>
          <p style="margin-bottom:0"><a class="btn btn-terra" href="mailto:${SITE.email}">${SITE.email}</a></p>
        </div>
        <div class="includes-box" style="margin-top:1.4rem">
          <h3 style="margin-top:0">${ICONS.pin}Par courrier & sur place</h3>
          <p style="margin-bottom:.4rem">Horizons Sauvages<br>18, quai du Port<br>13002 Marseille — France</p>
          <p style="margin-bottom:0;font-size:.92rem;color:var(--ink-soft)">Sur rendez-vous : appelez-nous ou passez, le café est chaud et les albums photos nombreux.</p>
        </div>
        <div class="includes-box" style="margin-top:1.4rem">
          <h3 style="margin-top:0">${ICONS.clock}Horaires</h3>
          <p style="margin-bottom:0">${SITE.hours.map((h) => `<strong style="min-width:15em;display:inline-block">${esc(h.days)}</strong>${esc(h.time)}`).join("<br>")}</p>
        </div>
      </div>
      <div class="reveal" style="--d:80ms">
        <div class="includes-box" style="padding:0;overflow:hidden">
          <div class="card-media" style="aspect-ratio:16/10">${imgTag("agence-bureau", 820)}</div>
          <div style="padding:1.5rem 1.7rem">
            <h3 style="margin-top:0">${ICONS.compass}Venez au bureau</h3>
            <p style="font-size:.95rem;margin-bottom:.8rem">Métro ligne 1 — Vieux-Port, sortie Musée des Docks. À deux pas de la Chambre de Commerce, face aux bateaux.</p>
            <a class="btn btn-ghost" href="https://www.openstreetmap.org/search?query=quai%20du%20port%20marseille" target="_blank" rel="noopener noreferrer">Voir sur la carte ${ICONS.arrowUpRight}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  return page({
    file: "contact.html",
    title: "Contact — Horizons Sauvages | Agence safari Marseille",
    description: "Contactez Horizons Sauvages : e-mail, adresse au Vieux-Port de Marseille, horaires d'ouverture. Réponse d'un conseiller sous 48 h ouvrées.",
    content,
  });
}
