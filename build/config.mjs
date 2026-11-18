// Configuration globale du site Horizons Sauvages
export const SITE = {
  name: "Horizons Sauvages",
  tagline: "Agence de safaris & voyages sur mesure",
  domain: "https://www.horizons-sauvages.fr",
  email: "matricestudio@protonmail.com",
  studio: "Matrice Studio",
  city: "Marseille",
  address: "18, quai du Port — 13002 Marseille, France",
  hours: [
    { days: "Lundi – Vendredi", time: "9h00 – 18h30" },
    { days: "Samedi", time: "10h00 – 17h00" },
    { days: "Dimanche & jours fériés", time: "Sur rendez-vous" },
  ],
  description:
    "Horizons Sauvages, agence de safaris et de voyages sur mesure basée à Marseille. Tanzanie, Kenya, Botswana, Namibie, Afrique du Sud, Rwanda : des itinéraires conçus à la main, un tourisme responsable et des conseillers spécialistes qui ont tout vu de leurs propres yeux.",
  ogImage: "partage-og.jpg",
};

export const NAV = [
  {
    label: "Destinations",
    href: "destinations.html",
    children: [
      { label: "Toutes les destinations", href: "destinations.html" },
      { label: "Tanzanie", href: "destinations/tanzanie.html" },
      { label: "Kenya", href: "destinations/kenya.html" },
      { label: "Botswana", href: "destinations/botswana.html" },
      { label: "Namibie", href: "destinations/namibie.html" },
      { label: "Afrique du Sud", href: "destinations/afrique-du-sud.html" },
      { label: "Rwanda & Ouganda", href: "destinations/rwanda.html" },
      { label: "Zambie", href: "destinations/zambie.html" },
      { label: "Carte interactive", href: "carte.html" },
    ],
  },
  {
    label: "Voyages",
    href: "circuits.html",
    children: [
      { label: "Tous nos circuits", href: "circuits.html" },
      { label: "En famille", href: "types-de-voyages.html#famille" },
      { label: "En couple", href: "types-de-voyages.html#couple" },
      { label: "Voyage photo", href: "types-de-voyages.html#photo" },
      { label: "Voyage de noces", href: "types-de-voyages.html#noces" },
      { label: "Groupe & tribu", href: "types-de-voyages.html#groupe" },
      { label: "Voyage d'entreprise", href: "types-de-voyages.html#entreprise" },
      { label: "Bons cadeaux", href: "bons-cadeaux.html" },
    ],
  },
  { label: "Sur mesure", href: "sur-mesure.html" },
  {
    label: "Le guide",
    href: "faune.html",
    children: [
      { label: "Calendrier de la faune", href: "faune.html" },
      { label: "Informations pratiques", href: "infos-pratiques.html" },
      { label: "Questions fréquentes", href: "infos-pratiques.html#faq" },
    ],
  },
  {
    label: "L'agence",
    href: "agence.html",
    children: [
      { label: "Notre histoire", href: "agence.html" },
      { label: "L'équipe", href: "equipe.html" },
      { label: "Journal", href: "journal.html" },
      { label: "Galerie", href: "galerie.html" },
      { label: "Avis voyageurs", href: "avis.html" },
      { label: "Contact", href: "contact.html" },
    ],
  },
];

// Annexes affichées dans le footer
export const FOOTER_COLUMNS = [
  {
    title: "Destinations",
    links: [
      { label: "Tanzanie", href: "destinations/tanzanie.html" },
      { label: "Kenya", href: "destinations/kenya.html" },
      { label: "Botswana", href: "destinations/botswana.html" },
      { label: "Namibie", href: "destinations/namibie.html" },
      { label: "Afrique du Sud", href: "destinations/afrique-du-sud.html" },
      { label: "Rwanda & Ouganda", href: "destinations/rwanda.html" },
      { label: "Zambie", href: "destinations/zambie.html" },
    ],
  },
  {
    title: "Voyages",
    links: [
      { label: "Tous nos circuits", href: "circuits.html" },
      { label: "Voyage sur mesure", href: "sur-mesure.html" },
      { label: "Types de voyages", href: "types-de-voyages.html" },
      { label: "Bons cadeaux", href: "bons-cadeaux.html" },
      { label: "Calendrier de la faune", href: "faune.html" },
      { label: "Carte interactive", href: "carte.html" },
    ],
  },
  {
    title: "L'agence",
    links: [
      { label: "Notre histoire", href: "agence.html" },
      { label: "L'équipe", href: "equipe.html" },
      { label: "Journal", href: "journal.html" },
      { label: "Galerie", href: "galerie.html" },
      { label: "Avis voyageurs", href: "avis.html" },
      { label: "Informations pratiques", href: "infos-pratiques.html" },
      { label: "Contact", href: "contact.html" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Mentions légales", href: "mentions-legales.html" },
      { label: "Politique de confidentialité", href: "confidentialite.html" },
      { label: "Plan du site", href: "plan-du-site.html" },
    ],
  },
];

export const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
export const MONTHS_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
