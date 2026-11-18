// Télécharge les polices Google Fonts en local (woff2)
// Usage: node build/tools/fetch-fonts.mjs
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const OUT = path.join(ROOT, "assets_src", "fonts");
await mkdir(OUT, { recursive: true });

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// familles -> [nom fichier sortie]
const FAMILIES = [
  { css: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap", name: "fraunces" },
  { css: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap", name: "inter" },
];

for (const fam of FAMILIES) {
  const res = await fetch(fam.css, { headers: { "User-Agent": UA } });
  const css = await res.text();
  // blocs @font-face : extraire style, subset (comment précédent) et url
  const blocks = css.split("/*").slice(1);
  let count = 0;
  for (const block of blocks) {
    const subset = block.slice(0, block.indexOf("*/")).trim();
    if (!["latin", "latin-ext"].includes(subset)) continue;
    const style = /font-style:\s*(\w+)/.exec(block)?.[1] || "normal";
    const url = /url\((https:[^)]+\.woff2)\)/.exec(block)?.[1];
    if (!url) continue;
    const file = `${fam.name}-${subset.replace("-", "-")}-${style === "italic" ? "italic" : "var"}.woff2`;
    const bin = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
    await writeFile(path.join(OUT, file), bin);
    console.log(`+ ${file} (${(bin.length / 1024).toFixed(0)} Ko) [${subset}]`);
    count++;
  }
  console.log(`${fam.name}: ${count} fichiers`);
}
