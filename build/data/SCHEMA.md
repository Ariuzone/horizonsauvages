# Schéma des données — Horizons Sauvages

Les agents rédacteurs produisent des modules ESM (`export default [...]`) en **français soigné**.
Toutes les données sont fictives mais réalistes. Interdits : lorem ipsum, noms de lodges/
prestataires réels, témoignages attribués à des personnes réelles.

## Clés d'images disponibles (utilisez uniquement celles-ci)

dest-tanzanie, dest-kenya, dest-botswana, dest-namibie, dest-afrique-du-sud, dest-rwanda,
dest-zambie, faune-lion, faune-leopard, faune-elephant, faune-rhino, faune-guepard,
faune-girafe, faune-zebre, faune-hippo, faune-gorille, faune-migration, faune-flamants,
faune-painted-dog, circ-migration, circ-ngorongoro, circ-tarangire, circ-zanzibar,
circ-masai, circ-amboseli, circ-delta, circ-chobe, circ-sossusvlei, circ-damaraland,
circ-kruger, circ-garden-route, circ-volcans, circ-kidepo, circ-luangwa, circ-falls,
circ-ambiance, journal-migration, journal-photo, journal-camp, journal-communautes,
journal-oiseaux, agence-bureau, agence-campagne, surmesure-conseil, groupe,
gal-1 … gal-18 (voir build/data/images.mjs pour les descriptions).

## Circuits — `export default [{…}]`

- `slug` (kebab-case, unique), `title`, `subtitle` (« Pays — Régions phares »)
- `dests`: tableau de slugs destinations parmi: tanzanie, kenya, botswana, namibie,
  afrique-du-sud, rwanda, zambie
- `types`: parmi: faune, photo, famille, couple, noces, groupe, entreprise, trek, nature
- `duration` (jours, int), `price` (€/pers, int, réaliste 3500–14000)
- `comfort`: 1 (safaris tentés / camps mobiles), 2 (lodges de charme), 3 (luxiole / privatisé)
  + `comfortLabel` (ex. "Lodges de charme & camps sous tente permanents")
- `groupSize` (ex. "6 à 12 voyageurs"), `seasons` (mois optimaux, 1–12), `departures`
  (3–5 dates string "14 juin 2026"), `popular` (1–10), `mapPoint` (voir map.mjs)
- `image` (clé), `gallery` (3–4 clés)
- `intro` (2–3 phrases), `highlights` (4–6 puces)
- `itinerary`: jour par jour `{ day, title, text (2–4 phrases concrètes : paysages,
  activités, temps forts), lodging (nom fictif + type), meals }` — meals parmi
  "Petit-déjeuner", "Déjeuner & dîner", "Pension complète", "Tout compris", "Dîner"
- `included` (6–8), `notIncluded` (4–6)

## Destinations — `export default [{…}]`

- `slug` (tanzanie, kenya, botswana, namibie, afrique-du-sud, rwanda, zambie)
- `name`, `short` (accroche 6–10 mots), `hero` (clé image)
- `intro` (2 paragraphes ~70 mots), `bestPeriods` ([{ period, why }] ×2–3)
- `fauna` (8–12 noms), `landscapes` (4–5 libellés), `tips` (3–4 conseils concrets)
- `seasonsNote` (1 phrase résumé météo), `mapPoint`

## Faune — `export default [{ dest, animals: [{ name, months: [1..12], note }] }]`

5 destinations (tanzanie, kenya, botswana, namibie, rwanda) × 8 animaux.
`note` (≤12 mots) précise où/comment (ex. "Mises bas dans le sud du Serengeti").

## Journal — `export default [{…}]` (5 articles)

- `slug`, `title`, `date` ("12 mars 2026"), `author` (membre équipe), `category`,
  `readingTime` (min), `excerpt` (2 phrases), `image`, `tags` (3)
- `body`: blocs `{ t: "p"|"h2"|"quote"|"img", c: "texte", by: "auteur citation",
  img: clé, caption: "…" }` — 600 à 900 mots/article, style carnet de voyage vivant.

## Avis — `export default [{ name, trip, date, rating, dest, text }]` (14)

Noms français/étrangers crédibles, `trip` = intitulé du circuit suivi, `text` 45–80 mots,
ton sincère, détails concrets. `dest` = slug destination.

## Équipe — `export default [{ name, role, quote, bio, specialty, years, home }]`

9 personnes : 5 à Marseille (fondatrice, conseillers), 4 correspondants locaux
(Arusha, Maun, Le Cap, Kigali). `specialty`: tableau 2–3 tags. `quote` (1 phrase).

## Infos pratiques — `export default { formalites, sante, bagages, securite, meteo, faq }`

- `formalites` / `sante` / `bagages` / `securite` : objets `{ title, blocks: [{ t:"p"|"h3", c }] }`
  contenus concrets par grande zone (Afrique de l'Est / australe), rappel "consulter le site
  du gouvernement" sans lien mort.
- `meteo`: tableau par destination `{ dest, label, dry: "…", wet: "…", best: "…" }`
- `faq`: `[{ q, a }]` ×12 (a: 40–90 mots).
