import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { imgTag, articleCard, breadcrumb, ctaBand, avatar } from "../components.mjs";

export function renderJournal({ journal }) {
  addSchema({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Le journal — ${SITE.name}`,
    url: `${SITE.domain}/journal.html`,
    inLanguage: "fr-FR",
  });
  const [hero, ...rest] = journal;
  const content = `
${breadcrumb("journal.html", [["Journal"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Carnets de terrain</p>
  <h1 style="max-width:18ch">Le journal des <em class="serif-em">horizons</em></h1>
  <p class="lead" style="max-width:62ch">Récits vécus, coulisses de l'agence, conseils de nos guides : ce que la brousse nous a appris depuis le dernier départ.</p>
</section>

<section class="section-tight" style="padding-top:0">
  <div class="container">
    <h2 class="visually-hidden">L'article à la une</h2>
    <a class="card-row reveal" href="${hrefFrom("journal.html", `journal/${hero.slug}.html`)}">
      <div class="card-media">${imgTag(hero.image, 820)}</div>
      <div class="card-body">
        <p class="card-kicker">${esc(hero.category)} — à la une</p>
        <h3 style="font-size:clamp(1.6rem,2.6vw,2.2rem)">${esc(hero.title)}</h3>
        <p class="card-text">${esc(hero.excerpt)}</p>
        <div class="article-meta">
          <span>${avatar(hero.author, 1)}${esc(hero.author)}</span>
          <span>${ICONS.calendar}${esc(hero.date)}</span>
          <span>${ICONS.clock}${hero.readingTime} min</span>
        </div>
        <span class="text-link card-cta">Lire l'article ${ICONS.arrow}</span>
      </div>
    </a>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <h2 class="visually-hidden">Tous les articles</h2>
  <div class="grid grid-3">${rest.map((a) => articleCard(a, "journal.html")).join("")}</div>
  </div>
</section>
${ctaBand("journal.html", {
    title: `Envie d'écrire <em>votre</em> chapitre ?`,
    text: "Le meilleur récit reste celui que vous rapporterez.",
    ctas: [{ label: "Créer mon voyage", href: "sur-mesure.html", cls: "btn-terra" }],
  })}`;
  return page({
    file: "journal.html",
    title: "Journal & carnets de voyage safari | Horizons Sauvages",
    description: "Carnets de terrain, coulisses et conseils : la traversée de la Mara, la photo animalière, les nuits au camp, le tourisme communautaire et les oiseaux oubliés.",
    content,
  });
}

export function renderArticle({ a, others }) {
  addSchema({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    author: { "@type": "Person", name: a.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.domain}/journal/${a.slug}.html`,
    inLanguage: "fr-FR",
  });
  const body = a.body.map((b) => {
    if (b.t === "p") return `<p>${esc(b.c)}</p>`;
    if (b.t === "h2") return `<h2>${esc(b.c)}</h2>`;
    if (b.t === "quote") return `<blockquote>« ${esc(b.c)} »<footer style="margin-top:.6em;font-style:normal;font-size:.9rem;color:var(--ink-soft)">— ${esc(b.by)}</footer></blockquote>`;
    if (b.t === "img") return `<figure>${imgTag(b.img, 1600)}<figcaption>${esc(b.caption)}</figcaption></figure>`;
    return "";
  }).join("\n");
  const content = `
${breadcrumb(`journal/${a.slug}.html`, [["Journal", "journal.html"], [a.title]])}
<article>
  <header class="container section-tight" style="padding-top:0">
    <p class="overline">${esc(a.category)}</p>
    <h1 style="max-width:20ch">${esc(a.title)}</h1>
    <div class="article-meta">
      <span>${avatar(a.author, 1)}${esc(a.author)}</span>
      <span>${ICONS.calendar}${esc(a.date)}</span>
      <span>${ICONS.clock}${a.readingTime} min de lecture</span>
    </div>
    <div class="fauna-chips" style="margin-top:1rem">${a.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
  </header>
  <div class="container"><figure class="article-hero" style="margin-inline:0">${imgTag(a.image, 1600)}</figure></div>
  <div class="container-narrow section-tight">
    <p class="lead">${esc(a.excerpt)}</p>
    <div class="article-body">${body}</div>
    <hr style="border:0;border-top:1px solid var(--line);margin:3rem 0 2rem">
    <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;justify-content:space-between">
      <a class="text-link" href="${hrefFrom(`journal/${a.slug}.html`, "journal.html")}">${ICONS.arrow.replace('<svg', '<svg style="transform:rotate(180deg)"')} Tous les carnets</a>
      <a class="btn btn-terra" href="${hrefFrom(`journal/${a.slug}.html`, "sur-mesure.html")}">Vivre ce voyage ${ICONS.arrow}</a>
    </div>
  </div>
  ${others.length ? `
  <section class="section soft">
    <div class="container">
      <div class="kicker-row">
        <div class="section-head reveal"><p class="overline">À lire ensuite</p><h2 style="font-size:clamp(1.6rem,3vw,2.2rem)">D'autres <em class="serif-em">carnets</em></h2></div>
      </div>
      <div class="grid grid-3">${others.map((o) => articleCard(o, `journal/${a.slug}.html`)).join("")}</div>
    </div>
  </section>` : ""}
</article>`;
  return page({
    file: `journal/${a.slug}.html`,
    title: `${a.title} — Journal | Horizons Sauvages`,
    description: a.excerpt.slice(0, 155),
    ogType: "article",
    content,
  });
}
