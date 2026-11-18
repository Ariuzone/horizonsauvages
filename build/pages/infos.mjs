import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { imgTag, breadcrumb, ctaBand } from "../components.mjs";

export function renderInfos({ infos }) {
  const block = (b) => b.blocks.map((x) => x.t === "h3" ? `<h3>${esc(x.c)}</h3>` : `<p>${esc(x.c)}</p>`).join("");
  const sections = [
    ["formalites", "formalites", "plane", "Formalités & visas", "Passeport, visas, autorisations : la checklist avant l'enregistrement."],
    ["sante", "sante", "heart", "Santé & vaccins", "Fièvre jaune, paludisme, altitude : prévenez, ne subissez pas."],
    ["bagages", "bagages", "gift", "Bagages & équipement", "Le sac souple, les jumelles et les couches qu'on ne regrette pas."],
    ["securite", "securite", "shield", "Sécurité & bons réflexes", "La brousse est encadrée, les villes demandent la prudence ordinaire."],
  ];
  const content = `
${breadcrumb("infos-pratiques.html", [["Informations pratiques"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Le guide pratique</p>
  <h1 style="max-width:20ch">Partir <em class="serif-em">préparé</em>, voyager léger</h1>
  <p class="lead" style="max-width:64ch">Tout ce que nos voyageurs nous demandent avant de réserver — formalités, santé, bagages, sécurité, météo. Et si une question subsiste : <a class="text-link" href="${hrefFrom("infos-pratiques.html", "contact.html")}">écrivez-nous</a>.</p>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="container">
    <nav class="chip-row" aria-label="Sommaire">
      ${sections.map(([id, , icon, label]) => `<a class="chip" href="#${id}" style="text-decoration:none">${esc(label)}</a>`).join("")}
      <a class="chip" href="#meteo" style="text-decoration:none">Météo</a>
      <a class="chip" href="#faq" style="text-decoration:none">FAQ</a>
    </nav>
  </div>
</section>

${sections.map(([id, key, icon, title, intro], i) => `
<section class="section-tight ${i % 2 ? "soft" : ""}" id="${id}" style="scroll-margin-top:90px">
  <div class="container">
    <div class="split" style="align-items:start">
      <div class="reveal">
        <p class="overline">${esc(title)}</p>
        <h2 style="font-size:clamp(1.7rem,3.2vw,2.4rem)">${esc(intro)}</h2>
      </div>
      <div class="includes-box reveal" style="--d:80ms">
        ${block(infos[key])}
      </div>
    </div>
  </div>
</section>`).join("")}

<section class="section" id="meteo" style="scroll-margin-top:90px">
  <div class="container">
    <div class="section-head reveal">
      <p class="overline">Climat</p>
      <h2>La météo, <em class="serif-em">pays par pays</em></h2>
      <p class="lead">Saison sèche ne veut pas dire « froide », saison des pluies ne veut pas dire « définitivement mouillé ». Voici l'essentiel.</p>
    </div>
    <div class="season-table-wrap reveal">
      <table class="season-table">
        <caption class="visually-hidden">Climat par destination</caption>
        <thead><tr><th scope="col">Destination</th><th scope="col">Saison sèche</th><th scope="col">Saison des pluies</th><th scope="col">Meilleure fenêtre</th></tr></thead>
        <tbody>
          ${infos.meteo.map((m) => `<tr><th scope="row">${esc(m.label)}</th><td style="text-align:left">${esc(m.dry)}</td><td style="text-align:left">${esc(m.wet)}</td><td style="text-align:left"><strong>${esc(m.best)}</strong></td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section night on-dark" id="faq" style="scroll-margin-top:90px">
  <div class="container-narrow">
    <div class="section-head reveal">
      <p class="overline">FAQ</p>
      <h2>Les questions qu'on nous pose <em class="serif-em">toujours</em></h2>
    </div>
    ${infos.faq.map((f, i) => `
    <div class="faq-item">
      <h3 style="margin:0"><button class="faq-q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-panel-${i}">${esc(f.q)}<span class="faq-icon" aria-hidden="true">${ICONS.plus}</span></button></h3>
      <div class="faq-a" id="faq-panel-${i}" role="region" aria-labelledby="faq-q-${i}" inert><div><p>${esc(f.a)}</p></div></div>
    </div>`).join("")}
    <p style="margin-top:2rem">Une autre question ? <a class="text-link" href="${hrefFrom("infos-pratiques.html", "contact.html")}">Écrivez-nous directement</a> — une vraie personne répond.</p>
  </div>
</section>
${ctaBand("infos-pratiques.html", {
    title: `Prêt à <em>franchir le pas</em> ?`,
    text: "Formalités comprises, saison choisie : il ne manque que votre itinéraire.",
    ctas: [{ label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "infos-pratiques.html",
    title: "Informations pratiques — visas, santé, bagages, FAQ | Horizons Sauvages",
    description: "Formalités et visas, santé et vaccins, bagages conseillés, sécurité, météo par pays et questions fréquentes : le guide pratique de votre safari.",
    content,
  });
}
