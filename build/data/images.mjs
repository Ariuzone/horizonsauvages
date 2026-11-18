// Manifeste des images : clé -> { file (base sans extension), alt }
// Les fichiers existent en deux largeurs : `key-820w.webp` et `key-1600w.webp`
// sous site/assets/img/<outDir>/. Crédits : voir SOURCES.md
export const IMG = {
  // Destinations
  "dest-tanzanie": { dir: "destinations", alt: "Plaines immenses du Serengeti sous une lumière dorée" },
  "dest-kenya": { dir: "destinations", alt: "Troupeau d'éléphants traversant la savane du Masai Mara" },
  "dest-botswana": { dir: "destinations", alt: "Vue aérienne des canaux verts du delta de l'Okavango" },
  "dest-namibie": { dir: "destinations", alt: "Dunes rouges et arbres pétrifiés de Dead Vlei, Sossusvlei" },
  "dest-afrique-du-sud": { dir: "destinations", alt: "La montagne de la Table surplombant Le Cap" },
  "dest-rwanda": { dir: "destinations", alt: "Gorille des montagnes dans la brume des Virunga" },
  "dest-zambie": { dir: "destinations", alt: "Les chutes Victoria vues du côté zambien" },
  // Faune
  "faune-lion": { dir: "faune", alt: "Lion mâle en posture dominante sur un rocher" },
  "faune-leopard": { dir: "faune", alt: "Léopard allongé sur une branche au couchant" },
  "faune-elephant": { dir: "faune", alt: "Troupeau d'éléphants devant le Kilimandjaro, Amboseli" },
  "faune-rhino": { dir: "faune", alt: "Rhinocéros noir de profil dans la savane" },
  "faune-guepard": { dir: "faune", alt: "Guépard en pleine course dans la savane" },
  "faune-girafe": { dir: "faune", alt: "Girafe masai parmi les acacias du Mikumi" },
  "faune-zebre": { dir: "faune", alt: "Zèbres de plaine au bord d'un lac, Manyara" },
  "faune-hippo": { dir: "faune", alt: "Groupe d'hippopotames dans une rivière" },
  "faune-gorille": { dir: "faune", alt: "Gorille des montagnes femelle se nourrissant" },
  "faune-migration": { dir: "faune", alt: "Traversée de la Mara par un immense troupeau de gnous" },
  "faune-flamants": { dir: "faune", alt: "Des milliers de flamants roses sur le lac Nakuru" },
  "faune-painted-dog": { dir: "faune", alt: "Lycaon, chien sauvage d'Afrique, au pelage tacheté" },
  // Circuits
  "circ-migration": { dir: "circuits", alt: "Troupeau de gnous se repliant sur la plaine" },
  "circ-ngorongoro": { dir: "circuits", alt: "Rhinocéros noir au fond du cratère du Ngorongoro" },
  "circ-tarangire": { dir: "circuits", alt: "Ligne d'éléphants face aux baobabs de Tarangire" },
  "circ-zanzibar": { dir: "circuits", alt: "Dhow à voile latine sur l'eau turquoise de Zanzibar" },
  "circ-masai": { dir: "circuits", alt: "Famille de lions posant dans le Masai Mara" },
  "circ-amboseli": { dir: "circuits", alt: "Paysage d'Amboseli, marais et éléphants" },
  "circ-delta": { dir: "circuits", alt: "Lodge sous tente au cœur du delta de l'Okavango" },
  "circ-chobe": { dir: "circuits", alt: "Éléphants à contre-jour au bord de la Chobe" },
  "circ-sossusvlei": { dir: "circuits", alt: "Cirque de dunes et sol d'argile blanc de Sossusvlei" },
  "circ-damaraland": { dir: "circuits", alt: "Collines ocre et plaines arides du Damaraland" },
  "circ-kruger": { dir: "circuits", alt: "Savane vallonnée du parc national Kruger" },
  "circ-garden-route": { dir: "circuits", alt: "Côte découpée et forêts du parc Tsitsikamma" },
  "circ-volcans": { dir: "circuits", alt: "Sommets volcaniques de la chaîne des Virunga" },
  "circ-kidepo": { dir: "circuits", alt: "Plaines isolées de la vallée de Kidepo, Ouganda" },
  "circ-luangwa": { dir: "circuits", alt: "Coucher de soleil sur la rivière Luangwa" },
  "circ-falls": { dir: "circuits", alt: "Arc-en-ciel lunaire sur les chutes Victoria" },
  "circ-ambiance": { dir: "circuits", alt: "Silhouette d'acacia au couchant dans la savane" },
  // Journal
  "journal-migration": { dir: "journal", alt: "Gnous et zèbres entassés au bord de la Mara" },
  "journal-photo": { dir: "journal", alt: "Photographe animalier en tenue de camouflage" },
  "journal-camp": { dir: "journal", alt: "Tente safari dressée dans un camp intime" },
  "journal-communautes": { dir: "journal", alt: "Villages et collines autour d'Amboseli" },
  "journal-oiseaux": { dir: "journal", alt: "Rollier à longs brins aux couleurs éclatantes" },
  // Agence / UI
  "agence-bureau": { dir: "ui", alt: "Notre-Dame de la Garde dominant le Vieux-Port de Marseille" },
  "agence-campagne": { dir: "ui", alt: "Véhicule safari stationné dans une réserve communautaire au Kenya" },
  "surmesure-conseil": { dir: "ui", alt: "Feu de camp au cœur d'un village culturel d'Afrique australe" },
  "groupe": { dir: "ui", alt: "Véhicule de game drive avec voyageurs en Namibie" },
  // Galerie
  "gal-1": { dir: "galerie", alt: "Deux lionceaux marchant de conserve" },
  "gal-2": { dir: "galerie", alt: "Jeune éléphant protégé par sa mère" },
  "gal-3": { dir: "galerie", alt: "Guépard roux observant la plaine" },
  "gal-4": { dir: "galerie", alt: "Œil de zèbre en gros plan, Etosha" },
  "gal-5": { dir: "galerie", alt: "Girafe dans la réserve d'Ithala" },
  "gal-6": { dir: "galerie", alt: "Hippopotame bâillant largement" },
  "gal-7": { dir: "galerie", alt: "Coucher de soleil sur la savane namibienne" },
  "gal-8": { dir: "galerie", alt: "Léoparde et son petit dans un arbre" },
  "gal-9": { dir: "galerie", alt: "Aigle pêcheur d'Afrique sur son nid" },
  "gal-10": { dir: "galerie", alt: "Springbok allaitant son petit" },
  "gal-11": { dir: "galerie", alt: "Éléphants au point d'eau d'Okaukuejo la nuit" },
  "gal-12": { dir: "galerie", alt: "Impala attentif, oreilles dressées" },
  "gal-13": { dir: "galerie", alt: "Vautour oricoupe en vol au-dessus du Kruger" },
  "gal-14": { dir: "galerie", alt: "Lionne allongée dans les hautes herbes" },
  "gal-15": { dir: "galerie", alt: "Voie lactée au-dessus du désert du Namib" },
  "gal-16": { dir: "galerie", alt: "Chimpanzé dans la forêt de Kibale" },
  "gal-17": { dir: "galerie", alt: "Éléphanteau suivant sa mère dans les hautes herbes" },
  "gal-18": { dir: "galerie", alt: "Topi au Masai Mara" },
};

export function imgSrc(key, w = 820, page = "") {
  const meta = IMG[key];
  if (!meta) throw new Error(`Image inconnue : ${key}`);
  const rel = page.match(/\//) ? "../" : "";
  return `${rel}assets/img/${meta.dir}/${key}-${w}w.webp`;
}
export function imgAlt(key) {
  return IMG[key]?.alt || "";
}
