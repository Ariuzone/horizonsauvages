import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { BONS_CADEAUX } from "../data/site.mjs";
import { imgTag, breadcrumb } from "../components.mjs";

export function renderCadeaux() {
  const content = `
${breadcrumb("bons-cadeaux.html", [["Bons cadeaux"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Offrir l'horizon</p>
  <h1 style="max-width:18ch">Un safari s'offre, <em class="serif-em">aussi</em></h1>
  <p class="lead" style="max-width:62ch">Anniversaire, départ à la retraite, mariage, ou juste parce que : le bon cadeau crédite le voyage du bénéficiaire, qui compose son itinéraire avec un conseiller — sans pression, sans date imposée.</p>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="container">
    <div class="split" style="align-items:center;margin-bottom:clamp(3rem,7vh,5rem)">
      <div class="split-media reveal-img">${imgTag("journal-camp", 820)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Comment ça marche ?</p>
        <h2>Trois cartes, <em class="serif-em">zéro stress</em></h2>
        <ol style="list-style:none;padding:0;margin:1.4rem 0 0;display:grid;gap:1rem">
          <li style="display:flex;gap:.9rem"><span style="font-family:var(--font-serif);font-style:italic;color:var(--terra);font-size:1.5rem;flex:none">1.</span><span>Vous choisissez le montant et le message — nous personnalisons la carte (papier texturé ou version numérique).</span></li>
          <li style="display:flex;gap:.9rem"><span style="font-family:var(--font-serif);font-style:italic;color:var(--terra);font-size:1.5rem;flex:none">2.</span><span>Le bénéficiaire nous appelle ou nous écrit quand il veut : un conseiller construit le voyage avec lui, le bon vient en déduction.</span></li>
          <li style="display:flex;gap:.9rem"><span style="font-family:var(--font-serif);font-style:italic;color:var(--terra);font-size:1.5rem;flex:none">3.</span><span>Le solde part à l'agence qui rêvait — ou se reporte sur un autre voyage, sans frais.</span></li>
        </ol>
      </div>
    </div>
    <h2 class="visually-hidden">Nos trois bons cadeaux</h2>
    <div class="grid grid-3">
      ${BONS_CADEAUX.map((g, i) => `
      <article class="gift-card reveal" style="--d:${i * 60}ms">
        <span class="gk">Bon cadeau — ${esc(g.title)}</span>
        <h3>${esc(g.amount)}</h3>
        <p>${esc(g.text)}</p>
        <p style="font-size:.85rem;color:rgba(244,237,221,.6)">${esc(g.detail)}</p>
        <a class="btn btn-gold" style="margin-top:auto;align-self:flex-start" href="mailto:matricestudio@protonmail.com?subject=Bon%20cadeau%20Horizons%20Sauvages%20—%20${encodeURIComponent(g.title)}">Commander ce bon ${ICONS.arrow}</a>
      </article>`).join("")}
    </div>
    <div class="includes-box reveal" style="margin-top:2rem">
      <h3 style="margin-top:0">${ICONS.check}Bon à savoir</h3>
      <ul style="list-style:none;padding:0;margin:0">
        <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.check.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--green);margin-top:.25em"')}<span>Valables 24 mois, prolongeables gratuitement une fois sur simple demande.</span></li>
        <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.check.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--green);margin-top:.25em"')}<span>Transférables à une autre personne si le destinataire change de rêve.</span></li>
        <li style="display:flex;gap:.6em;padding:.35em 0">${ICONS.check.replace('<svg', '<svg style="flex:none;width:1.1em;height:1.1em;color:var(--green);margin-top:.25em"')}<span>Paiement sécurisé par virement ou carte, facture au nom de votre choix.</span></li>
      </ul>
    </div>
  </div>
</section>`;

  return page({
    file: "bons-cadeaux.html",
    title: "Bons cadeaux safari — offrir un voyage | Horizons Sauvages",
    description: "Offrez un safari ou une contribution voyage avec les bons cadeaux Horizons Sauvages : montants libres, valables 24 mois, transférables et personnalisables.",
    content,
  });
}
