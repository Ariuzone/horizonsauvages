// Contenus éditoriaux "maison" — Horizons Sauvages
export const STORY = {
  chapter1: {
    title: "Tout est parti d'un billet aller, sans retour",
    paras: [
      "En 2011, Camille Aubertin débarque à Arusha avec un sac à dos de dix-huit kilos et un carnet de croquis. Prévue pour trois semaines, la virée en devient une année : des plaines du Serengeti aux dunes du Namib, elle apprend la savane à l'africaine — à l'oreille, à l'odeur de la poussière après la pluie, au rythme des guides qui savent attendre.",
      "De retour à Marseille, elle ne retrouve pas l'agence qu'elle aurait voulu avoir avant de partir. Alors elle la crée : une petite structure, des conseillers qui ont tous vécu plusieurs années en Afrique, et une obsession — construire chaque voyage comme si c'était le sien.",
    ],
  },
  chapter2: {
    title: "Quinze ans plus tard, la même exigence",
    paras: [
      "Horizons Sauvages conçoit des safaris et des voyages de nature sur mesure, en Afrique de l'Est et australe, pour des voyageurs qui veulent comprendre ce qu'ils regardent. Nous ne vendons pas de destinations : nous dessinons des itinéraires, à la main, avec des correspondants qui vivent sur place toute l'année.",
      "Nous restons volontairement petits. Chaque conseiller suit un nombre limité de dossiers par saison, répond personnellement avant, pendant et après le voyage, et retourne régulièrement sur le terrain. C'est la seule façon que nous connaissons pour garantir un itinéraire qui tient ses promesses.",
    ],
  },
  quote: {
    text: "Un bon safari n'est pas celui où l'on voit tout, mais celui où l'on comprend ce que l'on voit.",
    author: "Camille Aubertin, fondatrice",
  },
  stats: [
    { value: "15", sup: "ans", label: "d'itinérance dessinée à la main" },
    { value: "2 400", sup: "+", label: "voyageurs partis avec nous" },
    { value: "7", sup: "", label: "pays, des Virunga au Kalahari" },
    { value: "98", sup: "%", label: "de voyageurs qui repartiraient avec nous" },
  ],
  engagements: [
    {
      icon: "leaf",
      title: "Un tourisme qui paie sa place",
      text: "Nous choisissons des camps et lodges indépendants qui reversent une part de leurs revenus à la conservation, et nous mesurons la retombée locale de chaque itinéraire. Nos circuits intègrent des concessions communautaires, où les droits de safari financent directement les villages voisins.",
    },
    {
      icon: "paw",
      title: "La faune d'abord, le spectacle ensuite",
      text: "Distance réglementaire, moteurs coupés, pas de hors-piste, aucun contact avec les animaux : nos guides suivent une charte stricte, rappelée avant chaque départ. Nous ne programmons aucune activité qui manipule ou nourrit la faune, et nous refusons les parcs à keeping d'animaux.",
    },
    {
      icon: "users",
      title: "Des équipes locales au cœur du voyage",
      text: "Guides, pisteurs, cuisiniers, chauffeurs : plus de 90 % de nos équipes sur place sont recrutées et formées localement, en CDI local ou via des coopératives partenaires. Le pourboire est expliqué, jamais imposé, et un fonds d'équipement soutient les équipes entre deux saisons.",
    },
    {
      icon: "compass",
      title: "Des petits groupes, des empreintes légères",
      text: "Six voyageurs en moyenne, jamais plus de douze. Des véhicules optimisés, des hébergements rationnés en eau et en énergie, des itinéraires qui essaiment plutôt que d'écraser les mêmes points d'eau. Le carbone des vols internes est compensé via un reboisement dans le Kilwa, en Tanzanie.",
    },
  ],
};

export const TYPES_VOYAGE = [
  {
    id: "famille",
    icon: "users",
    title: "En famille",
    accroche: "La savane expliquée aux enfants — et aux parents.",
    text: "Des itinéraires au rythme adapté : étapes courtes, lodges familiaux, activités dédiées aux plus jeunes (club nature, pistage d'empreintes, ateliers culturels) et rooms communicantes. Âge conseillé : à partir de 6 ans.",
    circuits: ["tanzanie-familles", "namibie-tout-horizon"],
  },
  {
    id: "couple",
    icon: "heart",
    title: "En couple",
    accroche: "Le crépuscule, le feu de camp, personne d'autre.",
    text: "Camps intimes, dîners face à un point d'eau, étapes balancées entre émotion animale et pauses bien-être. Nous réservons les meilleures tables de brousse et les douches extérieures sous les étoiles.",
    circuits: ["kenya-classique-amboseli", "delta-eau-et-savane"],
  },
  {
    id: "photo",
    icon: "camera",
    title: "Voyage photo",
    accroche: "La lumière d'abord, le reste suivra.",
    text: "Véhicules aménagés (socles pivotants, toits ouvrants XL), horaires décalés aux heures dorées, accompagnement par des photographes animaliers professionnels et séances de débriefing le soir.",
    circuits: ["royaume-du-leopard", "dunes-et-etoiles"],
  },
  {
    id: "noces",
    icon: "gift",
    title: "Voyage de noces",
    accroche: "La plus belle des premières nuits de brousse.",
    text: "Itinéraires privatisés, surclassements, fleurs et attentions signées par nos correspondants, nuit sous les étoiles en brousse ou dîner sur la dune. Nos conseillers coordonnent tout avec le lodge, à distance de vos invités.",
    circuits: ["noces-au-delta", "gorilles-des-virunga"],
  },
  {
    id: "groupe",
    icon: "route",
    title: "Groupe & tribu",
    accroche: "Anniversaire, cousinade, pot de départ : la brousse rassemble.",
    text: "À partir de 8 voyageurs, nous privatisons des camps entiers, adaptons le rythme au groupe et organisons les grandes tablées. Les familles dispersées et les anniversaires ronds sont notre spécialité.",
    circuits: ["botswana-grande-traversee", "tanzanie-familles"],
  },
  {
    id: "entreprise",
    icon: "compass",
    title: "Voyage d'entreprise",
    accroche: "Des séminaires où le réseau se tisse autour du feu.",
    text: "Incentive, séminaire de direction ou voyage d'équipe : nous montons des formats sur mesure avec hébergement privatisé, activités collectives (conservation, pisteurs, navigation) et temps de travail possibles en pleine nature.",
    circuits: ["botswana-grande-traversee", "le-cap-et-le-kruger"],
  },
];

export const BONS_CADEAUX = [
  {
    amount: "250 €",
    title: "La Contribution",
    text: "La carte qui complète : elle s'ajoute à un voyage en préparation, pour un vol intérieur, une nuit d'exception ou un dîner de brousse.",
    detail: "Valable 24 mois, utilisable en une ou plusieurs fois, sur tous nos voyages.",
  },
  {
    amount: "1 000 €",
    title: "La Première Étape",
    text: "De quoi engager un premier circuit et faire le pont vers le départ : elle crédite le dossier du bénéficiaire, conseil compris.",
    detail: "Valable 24 mois, transférable une fois, personalisable avec un message manuscrit.",
  },
  {
    amount: "Montant libre",
    title: "Le Bon sur mesure",
    text: "Vous choisissez le montant et la destination rêvée ; le bénéficiaire compose son voyage avec un conseiller, le bon vient réduire la note.",
    detail: "Valable 24 mois, envoi numérique ou par courrier, échéance prolongeable sur demande.",
  },
];

export const GALERIE = [
  { img: "gal-1", caption: "Deux lionceaux à l'aube — Masai Mara" },
  { img: "gal-2", caption: "À l'ombre de la mère — Amboseli" },
  { img: "gal-3", caption: "L'œil du guépard — Serengeti" },
  { img: "gal-4", caption: "Regard rayé — Etosha" },
  { img: "gal-5", caption: "Longue promenade — Ithala" },
  { img: "gal-6", caption: "Bâillement territorial — Chobe" },
  { img: "gal-7", caption: "Le soleil se couche — savane namibienne" },
  { img: "gal-8", caption: "Leçon d'arbre — réserve privée" },
  { img: "gal-9", caption: "Aigle pêcheur sur son nid — lac Naivasha" },
  { img: "gal-10", caption: "Tendresse springbok — Kalahari" },
  { img: "gal-11", caption: "Passage de nuit au point d'eau — Okaukuejo" },
  { img: "gal-12", caption: "L'impala aux écoutes — Kruger" },
  { img: "gal-13", caption: "Vautour oricoupe en vol — Kruger" },
  { img: "gal-14", caption: "La lionne et les hautes herbes — Serengeti" },
  { img: "gal-15", caption: "Sous la Voie lactée — NamibRand" },
  { img: "gal-16", caption: "Regard de chimpanzé — Kibale" },
  { img: "gal-17", caption: "Sur les pas de maman — Tarangire" },
  { img: "gal-18", caption: "Topi aux aguets — Masai Mara" },
];

export const CHIFFRES_CLE = [
  { icon: "compass", k: "7", v: "pays explorés de long en large" },
  { icon: "route", k: "14", v: "itinéraires dessinés à la main" },
  { icon: "users", k: "6", v: "voyageurs en moyenne par groupe" },
  { icon: "heart", k: "98 %", v: "de départ confirmés chaque année" },
];
