import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { imgTag, reviewCard, breadcrumb, ctaBand } from "../components.mjs";

export function renderAvis({ avis }) {
  const avg = (avis.reduce((s, a) => s + a.rating, 0) / avis.length).toFixed(1);
  const content = `
${breadcrumb("avis.html", [["Avis voyageurs"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Ils sont partis avec nous</p>
  <h1 style="max-width:20ch">Le carnet d'or des <em class="serif-em">voyageurs</em></h1>
  <p class="lead" style="max-width:62ch">Des retours sincères, collectés après chaque voyage. Note moyenne : <strong>${avg} / 5</strong> sur les ${avis.length} derniers voyages.</p>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="container">
    <div class="grid grid-3">
      ${avis.map((r, i) => reviewCard(r, "avis.html", i)).join("")}
    </div>
  </div>
</section>

<section class="section soft">
  <div class="container-narrow">
    <div class="split" style="align-items:center">
      <div class="split-media reveal-img">${imgTag("groupe", 820)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Transparence</p>
        <h2>Ce que ces avis <em class="serif-em">garantissent</em></h2>
        <p>Tous ces retours proviennent de voyageurs ayant réellement voyagé avec nous (démonstration : avis fictifs). Nous les publions sans tri, qu'ils pointent un hic ou un triomphe — c'est ainsi que nous progressons. Chaque fin de voyage, un questionnaire et un appel : votre mot compte plus que notre plaquette.</p>
        <a class="btn btn-terra" href="${hrefFrom("avis.html", "sur-mesure.html")}">Écrire mon propre avis ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>
${ctaBand("avis.html", {
    title: `Le prochain avis, <em>le vôtre</em> ?`,
    text: "Nous ne promettons pas la lune — seulement des levers de soleil qu'on n'oublie pas.",
    ctas: [
      { label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Voir les circuits", href: "circuits.html", cls: "btn-ghost" },
    ],
  })}`;
  return page({
    file: "avis.html",
    title: "Avis voyageurs — retours de safari | Horizons Sauvages",
    description: "Les retours de nos voyageurs : safaris en Tanzanie, Kenya, Botswana, Namibie… des avis sincères, détaillés et vérifiés, avec notes et commentaires.",
    content,
  });
}
