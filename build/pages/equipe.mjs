import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { imgTag, breadcrumb, ctaBand, avatar } from "../components.mjs";

export function renderEquipe({ team }) {
  const content = `
${breadcrumb("equipe.html", [["L'équipe"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Conseillers & correspondants</p>
  <h1 style="max-width:20ch">Des spécialistes qui ont <em class="serif-em">dormi dehors</em></h1>
  <p class="lead" style="max-width:66ch">Chaque conseiller a vécu plusieurs années dans son territoire. Et de Marseille à Kigali, ils ne se contentent pas de répondre au téléphone : ils vont vérifier les camps, tester les pistes, refuser les mauvaises idées.</p>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="container">
    <p class="overline" style="margin-bottom:1.4rem">À Marseille</p>
    <h2 class="visually-hidden">L'équipe marseillaise</h2>
    <div class="grid grid-3">
      ${team.filter((t) => t.home.includes("Marseille")).map((t, i) => `
      <article class="card team-card reveal" style="--d:${i * 60}ms">
        <div class="card-media" aria-hidden="true">${avatar(t.name, i)}</div>
        <div class="card-body">
          <h3 style="font-size:1.3rem">${esc(t.name)}</h3>
          <p class="role">${esc(t.role)} — ${esc(t.years)} ans d'expérience</p>
          <p style="font-size:.95rem">${esc(t.bio)}</p>
          <div class="fauna-chips">${t.specialty.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
          <blockquote style="margin:1rem 0 0;font-family:var(--font-serif);font-style:italic;color:var(--terra)">« ${esc(t.quote)} »</blockquote>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="section night on-dark">
  <div class="container">
    <div class="section-head reveal">
      <p class="overline">Sur le terrain</p>
      <h2>Nos <em class="serif-em">correspondants</em>, là où ça se passe</h2>
      <p class="lead">Quatre relais permanents, qui contrôlent chaque lodge et accompagnent les groupes dès l'atterrissage.</p>
    </div>
    <div class="grid grid-4">
      ${team.filter((t) => !t.home.includes("Marseille")).map((t, i) => `
      <article class="reveal" style="--d:${i * 60}ms">
        <div class="card-media" aria-hidden="true" style="width:110px;height:110px;border-radius:50%;overflow:hidden;border:3px solid var(--gold-bright);margin-bottom:1rem">${avatar(t.name, i + 5)}</div>
        <h3 style="font-size:1.2rem;margin-bottom:.1em">${esc(t.name)}</h3>
        <p style="color:var(--gold-bright);font-size:.88rem;margin-bottom:.5em">${esc(t.role)} — ${esc(t.home)}</p>
        <p style="font-size:.92rem;color:rgba(244,237,221,.75);margin:0">${esc(t.bio)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <div class="split" style="align-items:center">
      <div class="split-media reveal-img">${imgTag("agence-campagne", 820)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Notre méthode</p>
        <h2>Un conseiller, <em class="serif-em">un dossier</em></h2>
        <p>Pas de plateau d'appels : le conseiller qui répond à votre demande vous accompagne jusqu'au retour, et le correspondant local vous reçoit à l'aéroport. Vous saurez leur nom avant de partir — c'est notre contrat.</p>
        <a class="btn btn-terra" href="${hrefFrom("equipe.html", "sur-mesure.html")}">Démarrer avec un conseiller ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>
${ctaBand("equipe.html", {
    title: `Le premier contact, <em>c'est vous</em>`,
    text: "Dix minutes de questionnaire suffisent pour que le bon conseiller vous réponde.",
    ctas: [{ label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "equipe.html",
    title: "L'équipe — conseillers & guides | Horizons Sauvages",
    description: "Rencontrez les conseillers voyage d'Horizons Sauvages à Marseille et nos correspondants permanents en Tanzanie, au Botswana, en Afrique du Sud et au Rwanda.",
    content,
  });
}
