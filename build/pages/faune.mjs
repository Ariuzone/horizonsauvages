import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { MONTHS_SHORT } from "../config.mjs";
import { imgTag, breadcrumb, ctaBand } from "../components.mjs";

export function renderFaune({ faune }) {
  const dot = (on, peak) => `<span class="dot-cell ${on ? (peak ? "dot-peak" : "dot-good") : "dot-off"}" title="${on ? (peak ? "Période optimale" : "Bonne période") : "Hors période"}"></span>`;
  const content = `
${breadcrumb("faune.html", [["Calendrier de la faune"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Quand voir quoi ?</p>
  <h1 style="max-width:20ch">Le calendrier de la <em class="serif-em">faune</em></h1>
  <p class="lead" style="max-width:64ch">Un safari réussi est d'abord une question de date. Ce calendrier croise les cycles animaux et les saisons — tel que nos guides le lisent sur le terrain, mois par mois.</p>
  <div class="legend-dots" style="padding:1.4rem 0 0">
    <span><i class="dot-cell dot-peak"></i> Période optimale</span>
    <span><i class="dot-cell dot-good"></i> Bonne période</span>
    <span><i class="dot-cell dot-off"></i> Hors période</span>
  </div>
</section>

${faune.map((block, bi) => `
<section class="section-tight ${bi % 2 ? "soft" : ""}" id="${block.dest}">
  <div class="container">
    <div class="kicker-row" style="margin-bottom:1.6rem">
      <div class="section-head" style="margin:0">
        <p class="overline">${esc(block.label)}</p>
        <h2 style="font-size:clamp(1.7rem,3vw,2.4rem)">À ${esc(block.label)}, <em class="serif-em">mois par mois</em></h2>
      </div>
      <a class="btn btn-ghost reveal" href="${hrefFrom("faune.html", `destinations/${block.dest}.html`)}">Voir la destination ${ICONS.arrow}</a>
    </div>
    <div class="season-table-wrap reveal">
      <table class="season-table">
        <caption class="visually-hidden">Périodes d'observation de la faune en ${esc(block.label)}</caption>
        <thead>
          <tr><th scope="col">Espèce</th>${MONTHS_SHORT.map((m) => `<th scope="col">${m}</th>`).join("")}<th scope="col">Note du guide</th></tr>
        </thead>
        <tbody>
          ${block.animals.map((a) => `
          <tr>
            <th scope="row">${esc(a.name)}</th>
            ${Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const peak = a.months.includes(m);
    const good = a.months2?.includes(m) || false;
    return `<td>${dot(peak || good, peak)}</td>`;
  }).join("")}
            <td style="text-align:left;font-size:.88rem;color:var(--ink-soft)">${esc(a.note)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
      <div class="legend-dots" style="border-top:1px solid rgba(30,38,32,.08)">
        <span>${ICONS.paw.replace('<svg', '<svg style="width:1.1em;height:1.1em;color:var(--terra)"')} Faune observée sur nos circuits ${esc(block.label)}</span>
        <span><a class="text-link" href="${hrefFrom("faune.html", "circuits.html")}">Choisir mon départ ${ICONS.arrow}</a></span>
      </div>
    </div>
  </div>
</section>`).join("")}

<section class="section">
  <div class="container-narrow">
    <div class="split" style="align-items:center">
      <div class="split-media reveal-img">${imgTag("faune-migration", 820)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">La règle d'or</p>
        <h2>Suivre la <em class="serif-em">saison</em>, pas la mode</h2>
        <p>Il n'existe pas de « meilleure période » universelle : chaque pays a son tempo. La migration des gnous circule toute l'année entre le Serengeti et le Mara ; le delta de l'Okavango est le plus vivant en pleine crue, quand la savane s'assèche partout ailleurs. Nos conseillers construisent l'itinéraire autour de votre date — jamais l'inverse.</p>
        <a class="btn btn-terra" href="${hrefFrom("faune.html", "sur-mesure.html")}">Trouver ma fenêtre idéale ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>
${ctaBand("faune.html", {
    title: `Votre fenêtre, <em>notre expertise</em>`,
    text: "Dites-nous quand vous pouvez partir : nous vous disons où aller.",
    ctas: [
      { label: "Voyage sur mesure", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Circuits datés", href: "circuits.html", cls: "btn-ghost" },
    ],
  })}`;
  return page({
    file: "faune.html",
    title: "Calendrier de la faune — quand voir quoi, où | Horizons Sauvages",
    description: "Le calendrier animalier de nos destinations mois par mois : grande migration, mise bas, prédateurs, gorilles, oiseaux. Choisissez la bonne fenêtre pour votre safari.",
    content,
  });
}
