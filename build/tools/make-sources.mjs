// Génère SOURCES.md depuis le manifeste Commons + polices
// Usage: node build/tools/make-sources.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const m = JSON.parse(await readFile(path.join(ROOT, "assets_src", "raw", "commons-manifest.json"), "utf8"));

const rows = Object.entries(m).sort(([a], [b]) => a.localeCompare(b)).map(([key, v]) =>
  `| \`${key}\` | \`assets_src/img/${v.file}\` → \`site/assets/img/${v.outDir}/${key}-*.webp\` | [${v.title}](${v.sourceUrl}) | ${v.artist} | ${v.license} |`
).join("\n");

const md = `# SOURCES.md — ressources tierces utilisées par le site Horizons Sauvages

Site de démonstration réalisé par Matrice Studio. Toutes les photographies proviennent
de **Wikimedia Commons** et sont réutilisées selon les licences listées ci-dessous
(Converties en WebP, redimensionnées en deux largeurs : \`-820w\` (cartes) et \`-1600w\` (héros)).
Les fichiers sources originaux sont conservés dans \`assets_src/img/\`, les métadonnées
complètes dans \`assets_src/raw/commons-manifest.json\`.

## Photographies (Wikimedia Commons)

| Clé | Fichiers locaux | Source (page de description) | Auteur | Licence |
|-----|-----------------|------------------------------|--------|---------|
${rows}

## Polices

| Fichier | Source | Auteur | Licence | Utilisation |
|---------|--------|--------|---------|-------------|
| \`site/assets/fonts/fraunces-*.woff2\` | [Fraunces — Google Fonts](https://fonts.google.com/specimen/Fraunces) | Undercase Type (Phaedra Charles, Flavia Zimbardi) | SIL Open Font License 1.1 | Titres, styles serif |
| \`site/assets/fonts/inter-*.woff2\` | [Inter — Google Fonts](https://fonts.google.com/specimen/Inter) | Rasmus Andersson | SIL Open Font License 1.1 | Textes courants, interface |

## Créations originales (aucune source externe)

- **Logo Horizons Sauvages** (SVG \`site/favicon.svg\`, marque en header/footer, favicons \`favicon.ico\`, \`favicon-*.png\`, \`apple-touch-icon.png\`) : création originale Matrice Studio — soleil couchant sur horizon sous acacia stylisé.
- **Carte stylisée d'Afrique** (\`build/data/map.mjs\`) : silhouette vectorielle originale, dessinée pour le site — ce n'est pas un fond de carte géoréférencé.
- **Ensemble des textes, itinéraires, hébergements, personnes et témoignages** : fictions rédigées pour cette démonstration.
`;

await writeFile(path.join(ROOT, "SOURCES.md"), md, "utf8");
console.log("SOURCES.md généré :", Object.keys(m).length, "photos listées");
