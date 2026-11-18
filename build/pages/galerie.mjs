import { page, ICONS, hrefFrom, esc } from "../template.mjs";
import { GALERIE } from "../data/site.mjs";
import { imgTag, breadcrumb, ctaBand } from "../components.mjs";

export function renderGalerie() {
  const content = `
${breadcrumb("galerie.html", [["Galerie"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Galerie</p>
  <h1 style="max-width:18ch">La savane en <em class="serif-em">grand format</em></h1>
  <p class="lead" style="max-width:60ch">Photographies prises lors de nos voyages de repérage et de nos circuits — aucune mise en scène, aucune retouche déplacée. Cliquez pour agrandir.</p>
</section>

<section class="section-tight" style="padding-bottom:clamp(4rem,9vh,6rem)">
  <div class="container">
    <div class="masonry" data-gallery>
      ${GALERIE.map((g, i) => `
      <figure class="masonry-item reveal" data-caption="${esc(g.caption)}" tabindex="0" role="button" aria-label="Agrandir : ${esc(g.caption)}" style="--d:${(i % 3) * 60}ms">
        ${imgTag(g.img, 820)}
        <figcaption>${esc(g.caption)}</figcaption>
      </figure>`).join("")}
    </div>
  </div>
</section>
${ctaBand("galerie.html", {
    title: `Votre photo de la savane, <em>à venir</em>`,
    text: "La prochaine image de cette galerie sera peut-être la vôtre.",
    ctas: [
      { label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" },
      { label: "Voyages photo", href: "types-de-voyages.html#photo", cls: "btn-ghost" },
    ],
  })}`;
  return page({
    file: "galerie.html",
    title: "Galerie photo — la savane en grand format | Horizons Sauvages",
    description: "Lions, léopards, dunes du Namib, voie lactée : la galerie photo des voyages Horizons Sauvages, prises sur le terrain lors de nos safaris.",
    content,
  });
}
