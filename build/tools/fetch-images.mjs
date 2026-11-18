// Téléchargement des photos depuis Wikimedia Commons (API publique)
// Usage: node build/tools/fetch-images.mjs
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const IMG_DIR = path.join(ROOT, "assets_src", "img");
const RAW_DIR = path.join(ROOT, "assets_src", "raw");
const API = "https://commons.wikimedia.org/w/api.php";

// key -> dossier de sortie ; query = recherche Commons ; blacklist de mots exclus du titre
const PLAN = [
  // Destinations
  { key: "dest-tanzanie", out: "destinations", query: "Serengeti national park landscape", avoid: ["map", "flag"], require: ["serengeti"] },
  { key: "dest-kenya", out: "destinations", query: "Masai Mara elephants savanna", avoid: ["map", "flag"] },
  { key: "dest-botswana", out: "destinations", query: "Okavango delta aerial", avoid: ["map", "flag"], require: ["okavango", "delta"] },
  { key: "dest-namibie", out: "destinations", query: "Sossusvlei dunes deadvlei namibia", avoid: ["map", "flag"] },
  { key: "dest-afrique-du-sud", out: "destinations", query: "Table Mountain Cape Town landscape", avoid: ["map", "flag"] },
  { key: "dest-rwanda", out: "destinations", query: "mountain gorilla virunga rwanda", avoid: ["map", "flag"] },
  { key: "dest-zambie", out: "destinations", query: "Victoria Falls Zambia waterfall", avoid: ["map", "flag"] },
  // Faune
  { key: "faune-lion", out: "faune", query: "lion male Serengeti portrait", avoid: ["sketch", "drawing"] },
  { key: "faune-leopard", out: "faune", query: "leopard Panthera pardus Africa", avoid: ["sketch", "drawing"], require: ["leopard", "léopard"] },
  { key: "faune-elephant", out: "faune", query: "African elephant herd Amboseli Kilimanjaro", avoid: ["sketch", "drawing"] },
    { key: "faune-rhino", out: "faune", query: "black rhinoceros Diceros bicornis", avoid: ["sketch", "drawing"], require: ["rhinoceros", "nashorn", "rhino"] },
      { key: "faune-guepard", out: "faune", query: "cheetah hunting", avoid: ["sketch", "cub"], require: ["cheetah"] },
  { key: "faune-girafe", out: "faune", query: "giraffe savanna Africa", avoid: ["sketch", "drawing"] },
  { key: "faune-zebre", out: "faune", query: "plains zebra herd migration", avoid: ["sketch", "drawing"] },
  { key: "faune-hippo", out: "faune", query: "hippopotamus river Africa", avoid: ["sketch", "drawing"] },
  { key: "faune-gorille", out: "faune", query: "gorilla gorilla beringei mountain", avoid: ["sketch", "drawing", "zoo"], require: ["gorilla", "gorille"] },
  { key: "faune-migration", out: "faune", query: "wildebeest migration river crossing Mara", avoid: ["sketch", "drawing"] },
  { key: "faune-flamants", out: "faune", query: "flamingos lake Nakuru", avoid: ["sketch", "drawing"] },
      { key: "faune-painted-dog", out: "faune", query: "Lycaon pictus", avoid: ["sketch", "kill", "prey"], minW: 1200, minH: 750 },
  // Circuits (héro + ambiances)
  { key: "circ-migration", out: "circuits", query: "wildebeest Serengeti migration herd", avoid: ["map"], require: ["wildebeest", "gnu", "connochaetes"] },
  { key: "circ-ngorongoro", out: "circuits", query: "Ngorongoro crater view", avoid: ["map"] },
  { key: "circ-tarangire", out: "circuits", query: "Tarangire baobab elephants", avoid: ["map"] },
  { key: "circ-zanzibar", out: "circuits", query: "Zanzibar beach dhow boat", avoid: ["map"] },
  { key: "circ-masai", out: "circuits", query: "Maasai Mara lions", avoid: ["map"] },
  { key: "circ-amboseli", out: "circuits", query: "Kilimanjaro Amboseli elephants", avoid: ["map", "flag"], require: ["kilimanjaro", "amboseli"] },
  { key: "circ-delta", out: "circuits", query: "Okavango delta Botswana safari", avoid: ["map"], require: ["okavango"] },
  { key: "circ-chobe", out: "circuits", query: "Chobe river elephants sunset", avoid: ["map"] },
  { key: "circ-sossusvlei", out: "circuits", query: "Sossusvlei red dune dead tree", avoid: ["map"] },
  { key: "circ-damaraland", out: "circuits", query: "Damaraland Twyfelfontein landscape namibia", avoid: ["map"] },
  { key: "circ-kruger", out: "circuits", query: "Kruger National Park landscape wildlife", avoid: ["map"] },
  { key: "circ-garden-route", out: "circuits", query: "Garden Route South Africa coast", avoid: ["map"] },
  { key: "circ-volcans", out: "circuits", query: "Virunga volcanoes rwanda mountains", avoid: ["map"] },
  { key: "circ-kidepo", out: "circuits", query: "Kidepo valley Uganda savanna", avoid: ["map"] },
  { key: "circ-luangwa", out: "circuits", query: "South Luangwa National Park", avoid: ["map"], require: ["luangwa"] },
  { key: "circ-falls", out: "circuits", query: "Victoria Falls spray rainbow", avoid: ["map"] },
      { key: "circ-ambiance", out: "circuits", query: "sunset acacia", avoid: ["map", "city", "building"], require: ["sunset"] },
  // Journal
      { key: "journal-migration", out: "journal", query: "Mara River crossing", avoid: ["map"], require: ["mara", "crossing"] },
      { key: "journal-photo", out: "journal", query: "wildlife photographer", avoid: ["map"], require: ["photographer"], minW: 1200, minH: 800 },
  { key: "journal-camp", out: "journal", query: "safari tented camp Africa lodge", avoid: ["map"] },
  { key: "journal-communautes", out: "journal", query: "Maasai people village Kenya", avoid: ["map"] },
  { key: "journal-oiseaux", out: "journal", query: "lilac-breasted roller bird Africa", avoid: ["map"] },
  // Agence / sur mesure / divers
  { key: "agence-bureau", out: "ui", query: "old port Marseille Notre-Dame de la Garde", avoid: ["map"] },
      { key: "agence-campagne", out: "ui", query: "safari vehicle", avoid: ["map"], require: ["safari", "jeep", "vehicle", "game"], minW: 1200, minH: 800 },
      { key: "surmesure-main", out: "ui", query: "map compass", avoid: ["flag", "locator"], require: ["compass"], minW: 1100, minH: 700 },
      { key: "surmesure-conseil", out: "ui", query: "campfire Africa", avoid: ["map"], minW: 1100, minH: 700 },
      { key: "cadeau", out: "ui", query: "gift box", avoid: ["drawing"], minW: 900, minH: 600 },
      { key: "groupe", out: "ui", query: "game drive", avoid: ["map"], require: ["game drive", "safari"], minW: 1200, minH: 800 },
  // Galerie (assortiment)
      { key: "gal-1", out: "galerie", query: "lion cubs", avoid: ["drawing"], require: ["cubs"] },
  { key: "gal-2", out: "galerie", query: "elephant dust bath", avoid: ["drawing"] },
    { key: "gal-3", out: "galerie", query: "cheetah mother cubs grass", avoid: ["drawing"], require: ["cheetah"] },
  { key: "gal-4", out: "galerie", query: "zebra stripes close up", avoid: ["drawing"] },
  { key: "gal-5", out: "galerie", query: "giraffe necking fight", avoid: ["drawing"] },
  { key: "gal-6", out: "galerie", query: "hippo yawning", avoid: ["drawing"] },
      { key: "gal-7", out: "galerie", query: "savanna sunset", avoid: ["drawing"] },
  { key: "gal-8", out: "galerie", query: "leopard cub tree", avoid: ["drawing"] },
  { key: "gal-9", out: "galerie", query: "African fish eagle bird", avoid: ["drawing"] },
  { key: "gal-10", out: "galerie", query: "springbok antelope Etosha", avoid: ["drawing"], require: ["springbok", "antidorcas"] },
  { key: "gal-11", out: "galerie", query: "Etosha waterhole elephants", avoid: ["drawing"], require: ["etosha"] },
  { key: "gal-12", out: "galerie", query: "impala herd alert", avoid: ["drawing"] },
  { key: "gal-13", out: "galerie", query: "lappet-faced vulture Africa", avoid: ["drawing"], require: ["vulture", "vautour"] },
  { key: "gal-14", out: "galerie", query: "lioness hunting grass", avoid: ["drawing"] },
    { key: "gal-15", out: "galerie", query: "milky way Namib", avoid: ["drawing"], require: ["milky"], minW: 1200, minH: 800 },
  { key: "gal-16", out: "galerie", query: "chimp forest Uganda Kibale", avoid: ["drawing"] },
  { key: "gal-17", out: "galerie", query: "elephant calf mother walking", avoid: ["drawing"] },
  { key: "gal-18", out: "galerie", query: "topi antelope savanna", avoid: ["drawing"], require: ["topi", "hartebeest"] },
];

const BLACKLIST = ["map", "logo", "diagram", "drawing", "chart", "stamp", "coin", "flag", "icon", "painting", "sketch", "poster", "collage", "panorama of the earth", "locator"];
const MIN_W = 1400, MIN_H = 900;
const minW = (p) => p.minW || MIN_W;
const minH = (p) => p.minH || MIN_H;

async function api(params) {
  const url = API + "?" + new URLSearchParams({ format: "json", origin: "*", ...params });
  const res = await fetch(url, { headers: { "User-Agent": "HorizonsSauvagesDemo/1.0 (site vitrine fictif; contact: matricestudio@protonmail.com)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return res.json();
}

function scoreTitle(title, query) {
  const t = title.toLowerCase();
  if (BLACKLIST.some((b) => t.includes(b))) return -1;
  return 0;
}

async function searchOne(plan) {
  const params = {
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${plan.query}`,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1600",
  };
  const data = await api(params);
  const pages = Object.values(data?.query?.pages || {});
  const candidates = pages
    .map((p) => ({ p, ii: p.imageinfo?.[0] }))
    .filter(({ ii }) => ii && ii.mime === "image/jpeg" && ii.width >= minW(plan) && ii.height >= minH(plan))
    .filter(({ p, ii }) => {
      const t = (p.title + " " + (ii.extmetadata?.ImageDescription?.value || "")).toLowerCase();
      if (plan.avoid.some((a) => t.includes(a))) return false;
      if (plan.require && !plan.require.some((r) => p.title.toLowerCase().includes(r))) return false;
      return scoreTitle(p.title, plan.query) === 0;
    })
    // privilégie ratio paysage raisonnable + bonne résolution
    .sort((a, b) => {
      const ra = a.ii.width / a.ii.height, rb = b.ii.width / b.ii.height;
      const ca = Math.abs(ra - 1.5) + (ra > 2.6 || ra < 0.9 ? 1 : 0);
      const cb = Math.abs(rb - 1.5) + (rb > 2.6 || rb < 0.9 ? 1 : 0);
      return ca - cb || b.ii.width - a.ii.width;
    });
  return candidates[0] || null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": "HorizonsSauvagesDemo/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, "").trim();
}

const manifestPath = path.join(RAW_DIR, "commons-manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : {};

await mkdir(IMG_DIR, { recursive: true });
await mkdir(RAW_DIR, { recursive: true });

for (const plan of PLAN) {
  const outFile = `${plan.key}.jpg`;
  const outPath = path.join(IMG_DIR, outFile);
  if (manifest[plan.key] && existsSync(outPath)) {
    console.log(`= ${plan.key} déjà présent`);
    continue;
  }
  try {
    const found = await searchOne(plan);
    if (!found) {
      console.log(`! ${plan.key} : aucun résultat — ${plan.query}`);
      continue;
    }
    const { p, ii } = found;
    const url = ii.thumburl || ii.url;
    const size = await download(url, outPath);
    const artist = stripHtml(ii.extmetadata?.Artist?.value) || "Inconnu";
    const license = ii.extmetadata?.LicenseShortName?.value || "Inconnue";
    manifest[plan.key] = {
      file: outFile,
      title: p.title.replace("File:", ""),
      sourceUrl: ii.descriptionurl || ii.url,
      imageUrl: ii.url,
      artist,
      license,
      width: ii.width,
      height: ii.height,
      query: plan.query,
      outDir: plan.out,
      bytes: size,
    };
    console.log(`+ ${plan.key} <- ${p.title} (${license})`);
  } catch (e) {
    console.log(`! ${plan.key} : ${e.message}`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
console.log(`\n${Object.keys(manifest).length}/${PLAN.length} images téléchargées. Métadonnées : assets_src/raw/commons-manifest.json`);
