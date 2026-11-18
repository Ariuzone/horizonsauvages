// Carte stylisée de l'Afrique — silhouette vectorielle originale calée sur une
// pseudo-projection linéaire : x = (lon + 19) * 13.2, y = (37.5 - lat) * 12.6
// viewBox 0 0 940 940
export const MAP = {
  viewBox: "0 0 940 940",
  path: [
    "M178 20 L260 18 L330 10 L383 6 L400 40 L474 88 L515 69 L647 82 L680 94 L705 123 L739 170 L765 246 L818 315 L844 341 L928 324 L925 341 L848 447 L790 498 L774 523 L768 558 L784 669 L732 699 L711 722 L719 776 L680 798 L659 849 L620 889 L515 910 L493 898 L481 856 L450 807 L441 760 L418 705 L412 665 L424 582 L414 548 L368 491 L374 467 L378 422 L329 419 L323 416 L296 392 L250 403 L197 406 L108 393 L76 365 L45 323 L21 287 L30 271 L40 245 L79 170 L124 89 L150 49 Z",
  ].join(" "),
  madagascar: "M901 624 L917 671 L905 722 L846 795 L825 751 L852 678 Z",
  seaHint: [
    "M40 520 C110 560 170 620 220 700",
    "M860 120 C890 200 905 280 898 360",
  ],
};

export const PINS = [
  { key: "serengeti", label: "Serengeti", lon: 34.8, lat: -2.3, dest: "tanzanie", blurb: "Les plaines de la Grande Migration, à perte d'horizon.", link: "circuits/grande-migration-tanzanie.html", side: "w", dy: -8 },
  { key: "ngorongoro", label: "Ngorongoro", lon: 35.5, lat: -3.2, dest: "tanzanie", blurb: "Le cratère-jardin, Eden miniature de 19 km de diamètre.", link: "circuits/joyaux-du-nord-tanzanie.html", side: "s", dy: 2 },
  { key: "tarangire", label: "Tarangire", lon: 36.0, lat: -4.1, dest: "tanzanie", blurb: "Baobabs et grandes troupes d'éléphants.", link: "circuits/tanzanie-familles.html", side: "e", dy: 22 },
  { key: "zanzibar", label: "Zanzibar", lon: 39.2, lat: -6.2, dest: "tanzanie", blurb: "Épices, dhows et lagons — l'extension océan.", link: "circuits/grande-migration-tanzanie.html", side: "e", dy: 10 },
  { key: "masai-mara", label: "Masai Mara", lon: 35.1, lat: -1.5, dest: "kenya", blurb: "Royaume du lion et théâtre des traversées.", link: "circuits/royaume-du-leopard.html", side: "n", dy: -14 },
  { key: "amboseli", label: "Amboseli", lon: 37.3, lat: -2.6, dest: "kenya", blurb: "Grands troupeaux d'éléphants sous le Kilimandjaro.", link: "circuits/kenya-classique-amboseli.html", side: "e", dy: 2 },
  { key: "okavango", label: "Okavango", lon: 22.9, lat: -19.3, dest: "botswana", blurb: "Le delta intérieur : canaux, mokoros et îles.", link: "circuits/delta-eau-et-savane.html", side: "w", dy: -6 },
  { key: "chobe", label: "Chobe", lon: 25.0, lat: -17.8, dest: "botswana", blurb: "La plus grande concentration d'éléphants d'Afrique.", link: "circuits/botswana-grande-traversee.html", side: "e", dy: -4 },
  { key: "sossusvlei", label: "Sossusvlei", lon: 15.3, lat: -24.7, dest: "namibie", blurb: "Dunes rouge sang et arbres vieillis de mille ans.", link: "circuits/dunes-et-etoiles.html", side: "w", dy: 6 },
  { key: "swakopmund", label: "Swakopmund", lon: 14.5, lat: -22.7, dest: "namibie", blurb: "Ville balnéaire sur l'Atlantique brumeux.", link: "circuits/namibie-tout-horizon.html", side: "w", dy: 0 },
  { key: "damaraland", label: "Damaraland", lon: 13.9, lat: -20.5, dest: "namibie", blurb: "Montagnes déchiquetées et rhinos du désert.", link: "circuits/namibie-tout-horizon.html", side: "e", dy: 8 },
  { key: "etosha", label: "Etosha", lon: 16.2, lat: -19.0, dest: "namibie", blurb: "La grande panne saline et ses points d'eau.", link: "circuits/namibie-tout-horizon.html", side: "e", dy: -14 },
  { key: "lecap", label: "Le Cap", lon: 18.4, lat: -33.9, dest: "afrique-du-sud", blurb: "La Montagne de la Table, le cap, les vignes.", link: "circuits/le-cap-et-le-kruger.html", side: "w", dy: 2 },
  { key: "garden-route", label: "Route des Jardins", lon: 23.0, lat: -34.0, dest: "afrique-du-sud", blurb: "Forêts, falaises et lagunes entre Cap et Tsitsikamma.", link: "circuits/route-des-jardins-et-baleines.html", side: "e", dy: 4 },
  { key: "hermanus", label: "Hermanus", lon: 19.2, lat: -34.4, dest: "afrique-du-sud", blurb: "Observation des baleines depuis les falaises.", link: "circuits/route-des-jardins-et-baleines.html", side: "w", dy: 16 },
  { key: "kruger", label: "Kruger", lon: 31.5, lat: -24.0, dest: "afrique-du-sud", blurb: "Le grand classique : Big Five et pistes sans fin.", link: "circuits/le-cap-et-le-kruger.html", side: "e", dy: 0 },
  { key: "kigali", label: "Kigali", lon: 30.1, lat: -1.9, dest: "rwanda", blurb: "La colline capitale, départ des treks gorilles.", link: "circuits/gorilles-des-virunga.html", side: "w", dy: 18 },
  { key: "virunga", label: "Virunga", lon: 29.5, lat: -1.4, dest: "rwanda", blurb: "Volcans brumeux, derniers gorilles de montagne.", link: "circuits/gorilles-des-virunga.html", side: "w", dy: -24 },
  { key: "luangwa", label: "Vallée du Luangwa", lon: 31.0, lat: -13.1, dest: "zambie", blurb: "Berceau du walking safari, léopards au crépuscule.", link: "circuits/luangwa-et-chutes.html", side: "e", dy: 0 },
  { key: "victoria-falls", label: "Chutes Victoria", lon: 25.9, lat: -17.9, dest: "zambie", blurb: "« La fumée qui gronde », 1 700 m de rideau d'eau.", link: "circuits/luangwa-et-chutes.html", side: "s", dy: 16 },
];

// Position du point
export function pinXY(pin) {
  const x = (pin.lon + 19) * 13.2;
  const y = (37.5 - pin.lat) * 12.6;
  return [Math.round(x), Math.round(y)];
}

// Position et ancrage de l'étiquette
export function labelFor(pin) {
  const [x, y] = pinXY(pin);
  const side = pin.side || "e";
  const dy = pin.dy || 0;
  const off = 9;
  if (side === "w") return { x: x - off, y: y + dy, anchor: "end" };
  if (side === "n") return { x, y: y + dy, anchor: "middle" };
  if (side === "s") return { x, y: y + dy + 14, anchor: "middle" };
  return { x: x + off, y: y + dy, anchor: "start" };
}
