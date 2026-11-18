import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { TYPES_VOYAGE } from "../data/site.mjs";
import { imgTag, circuitCard, breadcrumb, ctaBand } from "../components.mjs";

const COVERS = { famille: "circ-tarangire", couple: "circ-chobe", photo: "faune-guepard", noces: "circ-delta", groupe: "groupe", entreprise: "circ-garden-route" };

export function renderTypes({ circuits }) {
  const content = `
${breadcrumb("types-de-voyages.html", [["Types de voyages"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Pour qui, pour quoi</p>
  <h1 style="max-width:20ch">Le même soin, six <em class="serif-em">tempéraments</em></h1>
  <p class="lead" style="max-width:64ch">Une lune de miel et une cousinade de douze ne partagent ni le rythme, ni les camps, ni les dîners. Voici comment nous adaptons le voyage à ceux qui le vivent.</p>
</section>

${TYPES_VOYAGE.map((t, i) => `
<section class="section-tight ${i % 2 ? "soft" : ""}" id="${t.id}" style="padding:clamp(3.5rem,8vh,6rem) 0;scroll-margin-top:80px">
  <div class="container">
    <div class="split ${i % 2 ? "rev" : ""}" style="align-items:center">
      <div class="split-media reveal-img">${imgTag(COVERS[t.id], 820)}
        <div class="float-card"><span style="display:inline-flex;width:1.6rem;height:1.6rem;color:var(--terra)">${ICONS[t.icon]}</span><span>${esc(t.accroche)}</span></div>
      </div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">${String(i + 1).padStart(2, "0")} — ${esc(t.title)}</p>
        <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">${esc(t.title.split(" ").slice(-1)[0]) === t.title ? esc(t.title) : esc(t.title)}</h2>
        <p class="lead" style="font-size:1.05rem">${esc(t.text)}</p>
        <div class="chip-row" style="margin:1.2rem 0 1.6rem">
          ${t.circuits.map((slug) => {
    const c = circuits.find((x) => x.slug === slug);
    return c ? `<a class="chip" href="${hrefFrom("types-de-voyages.html", `circuits/${c.slug}.html`)}" style="text-decoration:none">${esc(c.title)}</a>` : "";
  }).join("")}
        </div>
        <a class="btn btn-terra" href="${hrefFrom("types-de-voyages.html", "sur-mesure.html")}">Composer mon voyage ${ICONS.arrow}</a>
      </div>
    </div>
  </div>
</section>`).join("")}

${ctaBand("types-de-voyages.html", {
    title: `Votre profil est <em>unique</em>`,
    text: "Ces familles de voyages sont des repères, pas des cases. Racontez-nous votre version.",
    ctas: [{ label: "Voyage sur mesure", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "types-de-voyages.html",
    title: "Types de voyages — famille, couple, photo, noces… | Horizons Sauvages",
    description: "Safaris en famille, voyages de noces, circuits photo, groupes et entreprises : comment Horizons Sauvages adapte chaque itinéraire à son voyageur.",
    content,
  });
}
