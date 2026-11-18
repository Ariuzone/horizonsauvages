// Générateur du site statique Horizons Sauvages
// Usage: node build/build.mjs
import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const imp = (p) => import(pathToFileURL(p).href);

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = path.join(ROOT, "site");
const B = path.join(ROOT, "build");

const { SITE: SITECFG } = await imp(path.join(B, "config.mjs"));

// ---------- Données ----------
const circuits = [
  ...(await imp(path.join(B, "data/circuits-1.mjs"))).default,
  ...(await imp(path.join(B, "data/circuits-2.mjs"))).default,
];
const dests = (await imp(path.join(B, "data/destinations.mjs"))).default;
const faune = (await imp(path.join(B, "data/faune.mjs"))).default;
const journal = (await imp(path.join(B, "data/journal.mjs"))).default;
const avis = (await imp(path.join(B, "data/avis.mjs"))).default;
const team = (await imp(path.join(B, "data/equipe.mjs"))).default;
const infos = (await imp(path.join(B, "data/infos.mjs"))).default;

// Normalisation : intro peut être un tableau de phrases
for (const c of circuits) {
  if (Array.isArray(c.intro)) c.intro = c.intro.join(" ");
  if (Array.isArray(c.text)) c.text = c.text.join(" ");
}

const pages = {
  home: await imp(path.join(B, "pages/home.mjs")),
  circuits: await imp(path.join(B, "pages/circuits.mjs")),
  destinations: await imp(path.join(B, "pages/destinations.mjs")),
  carte: await imp(path.join(B, "pages/carte.mjs")),
  faune: await imp(path.join(B, "pages/faune.mjs")),
  surMesure: await imp(path.join(B, "pages/sur-mesure.mjs")),
  types: await imp(path.join(B, "pages/types.mjs")),
  infos: await imp(path.join(B, "pages/infos.mjs")),
  agence: await imp(path.join(B, "pages/agence.mjs")),
  equipe: await imp(path.join(B, "pages/equipe.mjs")),
  journal: await imp(path.join(B, "pages/journal.mjs")),
  galerie: await imp(path.join(B, "pages/galerie.mjs")),
  avis: await imp(path.join(B, "pages/avis.mjs")),
  cadeaux: await imp(path.join(B, "pages/cadeaux.mjs")),
  contact: await imp(path.join(B, "pages/contact.mjs")),
  legal: await imp(path.join(B, "pages/legal.mjs")),
};

const errors = [];
const linkQueue = [];
async function emit(relFile, html) {
  if (relFile.includes("/")) {
    // Les composants génèrent des src "assets/img/..." ; corrige pour les sous-dossiers
    html = html.replace(/src="assets\/img\//g, 'src="../assets/img/');
  }
  const out = path.join(SITE, relFile);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html, "utf8");
  const urls = [...html.matchAll(/(?:href|src)="([^"#]*)"/g)].map((m) => m[1]);
  for (const u of urls) {
    if (/^(https?:|mailto:|data:|#)/.test(u)) continue;
    linkQueue.push({ file: relFile, out, u });
  }
  console.log(`+ ${relFile}`);
}

// ---------- Nettoyage / assets ----------
await rm(SITE, { recursive: true, force: true });
await mkdir(SITE, { recursive: true });
await cp(path.join(B, "css"), path.join(SITE, "assets/css"), { recursive: true });
await cp(path.join(B, "js"), path.join(SITE, "assets/js"), { recursive: true });
await cp(path.join(ROOT, "assets_src/fonts"), path.join(SITE, "assets/fonts"), { recursive: true });
await cp(path.join(ROOT, "assets_src/webp"), path.join(SITE, "assets/img"), { recursive: true });
await cp(path.join(ROOT, "assets_src/brand"), SITE, { recursive: true });

// ---------- Pages ----------
await emit("index.html", pages.home.renderHome({ dests, circuits, avis, journal }));
await emit("circuits.html", pages.circuits.renderCircuits({ circuits }));
for (const c of circuits) {
  await emit(`circuits/${c.slug}.html`, pages.circuits.renderCircuitDetail({ c, all: circuits }));
}
await emit("destinations.html", pages.destinations.renderDestinations({ dests, circuits }));
for (const d of dests) {
  await emit(`destinations/${d.slug}.html`, pages.destinations.renderDestinationDetail({ d, circuits }));
}
await emit("carte.html", pages.carte.renderCarte({ dests }));

const fauneWithLabels = faune.map((f) => ({ ...f, label: dests.find((d) => d.slug === f.dest)?.name || f.dest }));
await emit("faune.html", pages.faune.renderFaune({ faune: fauneWithLabels }));

await emit("sur-mesure.html", pages.surMesure.renderSurMesure());
await emit("types-de-voyages.html", pages.types.renderTypes({ circuits }));
await emit("infos-pratiques.html", pages.infos.renderInfos({ infos }));
await emit("agence.html", pages.agence.renderAgence({ team }));
await emit("equipe.html", pages.equipe.renderEquipe({ team }));
await emit("journal.html", pages.journal.renderJournal({ journal }));
for (const [i, a] of journal.entries()) {
  const others = journal.filter((x) => x.slug !== a.slug).slice(0, 3);
  await emit(`journal/${a.slug}.html`, pages.journal.renderArticle({ a, others }));
}
await emit("galerie.html", pages.galerie.renderGalerie());
await emit("avis.html", pages.avis.renderAvis({ avis }));
await emit("bons-cadeaux.html", pages.cadeaux.renderCadeaux());
await emit("contact.html", pages.contact.renderContact());
await emit("mentions-legales.html", pages.legal.renderMentions());
await emit("confidentialite.html", pages.legal.renderConfidentialite());

// ---------- Plan du site ----------
const planLinks = [
  ["Principal", [
    ["Accueil", "index.html"], ["Nos circuits", "circuits.html"], ["Destinations", "destinations.html"],
    ["Carte interactive", "carte.html"], ["Voyage sur mesure", "sur-mesure.html"],
  ]],
  ["Préparer", [
    ["Calendrier de la faune", "faune.html"], ["Informations pratiques", "infos-pratiques.html"],
    ["Types de voyages", "types-de-voyages.html"], ["Bons cadeaux", "bons-cadeaux.html"],
  ]],
  ["L'agence", [
    ["Notre histoire", "agence.html"], ["L'équipe", "equipe.html"], ["Le journal", "journal.html"],
    ["Galerie", "galerie.html"], ["Avis voyageurs", "avis.html"], ["Contact", "contact.html"],
  ]],
];
const planContent = `
${[
  ["Circuits détaillés", circuits.map((c) => [c.title, `circuits/${c.slug}.html`])],
  ["Destinations", dests.map((d) => [d.name, `destinations/${d.slug}.html`])],
  ["Articles du journal", journal.map((a) => [a.title, `journal/${a.slug}.html`])],
].map(([title, items]) => `
<section class="section-tight" style="padding-top:0">
  <div class="container">
    <h2 style="font-size:1.6rem">${title}</h2>
    <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.5rem">
      ${items.map(([label, href]) => `<li><a class="text-link" href="${href}">${label}</a></li>`).join("")}
    </ul>
  </div>
</section>`).join("")}`;

const { page } = await imp(path.join(B, "template.mjs"));
const { breadcrumb } = await imp(path.join(B, "components.mjs"));
await emit("plan-du-site.html", page({
  file: "plan-du-site.html",
  title: "Plan du site | Horizons Sauvages",
  description: "Plan complet du site Horizons Sauvages : destinations, circuits, journal, informations pratiques et pages de l'agence.",
  content: breadcrumb("plan-du-site.html", [["Plan du site"]]) + `
<section class="container section-tight" style="padding-top:0">
  <h1>Tout le site, <em class="serif-em">d'un coup d'œil</em></h1>
</section>
${planLinks.map(([title, items]) => `
<section class="section-tight" style="padding-top:0">
  <div class="container">
    <h2 style="font-size:1.6rem">${title}</h2>
    <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.5rem">
      ${items.map(([label, href]) => `<li><a class="text-link" href="${href}">${label}</a></li>`).join("")}
    </ul>
  </div>
</section>`).join("")}
${planContent}`.replace(/class="text-link" href="(circuits|destinations|journal)\//g, 'class="text-link" href="$1/'),
}));

// ---------- 404 ----------
const { logoSVG, ICONS } = await imp(path.join(B, "template.mjs"));
await emit("404.html", page({
  file: "404.html",
  title: "Page introuvable (404) | Horizons Sauvages",
  description: "Cette page n'existe pas ou plus. Reprenez la piste vers nos destinations et circuits.",
  noIndex: true,
  content: `<div class="error-page">
  <div class="grain" aria-hidden="true"></div>
  <div class="on-dark" style="padding:2rem;position:relative">
    <p class="error-code" aria-hidden="true">404</p>
    <h1 style="font-size:clamp(1.8rem,4vw,3rem);max-width:none">Cette piste s'est <em class="serif-em">perdue</em> dans la brousse</h1>
    <p class="lead" style="margin-inline:auto">La page que vous cherchez n'existe pas ou a suivi la migration. Voici de quoi retrouver votre route :</p>
    <div class="hero-ctas" style="justify-content:center;margin-top:2rem">
      <a class="btn btn-terra" href="index.html">Retour à l'accueil ${ICONS.arrow}</a>
      <a class="btn btn-ghost" href="circuits.html">Voir les circuits</a>
      <a class="btn btn-ghost" href="destinations.html">Explorer les destinations</a>
    </div>
  </div>
</div>`,
}));

// ---------- Favicons / manifest / robots / sitemap ----------
const manifest = {
  name: "Horizons Sauvages — Safaris & voyages sur mesure",
  short_name: "Horizons",
  description: SITECFG.description,
  start_url: "./index.html",
  display: "standalone",
  lang: "fr",
  background_color: "#101B12",
  theme_color: "#101B12",
  icons: [
    { src: "favicon-192.png", sizes: "192x192", type: "image/png" },
    { src: "favicon-512.png", sizes: "512x512", type: "image/png" },
  ],
};
await writeFile(path.join(SITE, "manifest.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");

const robots = `User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${SITECFG.domain}/sitemap.xml
`;
await writeFile(path.join(SITE, "robots.txt"), robots, "utf8");

const staticPages = [
  "", "circuits.html", "destinations.html", "carte.html", "faune.html", "sur-mesure.html",
  "types-de-voyages.html", "infos-pratiques.html", "agence.html", "equipe.html", "journal.html",
  "galerie.html", "avis.html", "bons-cadeaux.html", "contact.html", "plan-du-site.html",
];
const sitemapUrls = [
  ...staticPages.map((p) => ({ loc: `${SITECFG.domain}/${p}`, pri: p === "" ? "1.0" : "0.8" })),
  ...circuits.map((c) => ({ loc: `${SITECFG.domain}/circuits/${c.slug}.html`, pri: "0.7" })),
  ...dests.map((d) => ({ loc: `${SITECFG.domain}/destinations/${d.slug}.html`, pri: "0.7" })),
  ...journal.map((a) => ({ loc: `${SITECFG.domain}/journal/${a.slug}.html`, pri: "0.6" })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.pri}</priority></url>`).join("\n")}
</urlset>`;
await writeFile(path.join(SITE, "sitemap.xml"), sitemap, "utf8");

// ---------- Vérification des liens (après écriture de toutes les pages) ----------
for (const { file, out, u } of linkQueue) {
  const target = path.resolve(path.dirname(out), u.split("?")[0]);
  if (!existsSync(target)) errors.push(`${file} -> lien cassé : ${u}`);
}

console.log(`\n${errors.length ? "ERREURS :\n" + errors.join("\n") : "Aucun lien cassé."}`);
console.log("Build terminé.");
