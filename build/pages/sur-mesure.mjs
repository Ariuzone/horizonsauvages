import { page, ICONS, hrefFrom, esc, addSchema } from "../template.mjs";
import { SITE } from "../config.mjs";
import { imgTag, breadcrumb } from "../components.mjs";

const CHOICES_ENVIES = [
  ["binoculars", "Grands prédateurs", "Lions, léopards, guépards : la traque du Big Cat"],
  ["elephant", "Éléphants & mégafaune", "Troupeaux, rivières, points d'eau"],
  ["camera", "Photo", "Lumière, approche, véhicules aménagés"],
  ["bird", "Ornithologie", "Espèces endémiques, ragots et flamants"],
  ["users", "Rencontres & cultures", "Villages, écoles, projets communautaires"],
  ["tent", "Brousse profonde", "Fly-camps, nuits sous les étoiles"],
  ["moon", "Ciel étoilé & désert", "Dunes, silence, voie lactée"],
  ["leaf", "Forêts & gorilles", "Trek en forêt de nuage, Virunga, Nyungwe"],
  ["wave", "Océan & extensions", "Zanzibar, lagons, plongée"],
];

export function renderSurMesure() {
  addSchema({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Voyage sur mesure",
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.domain },
    areaServed: "France",
  });
  const choiceEnvies = CHOICES_ENVIES.map(([icon, label, hint]) => `
    <label class="choice">
      <input type="checkbox" name="envies" value="${esc(label)}">
      ${ICONS[icon] ? `<span style="display:inline-flex;width:1.5rem;height:1.5rem">${ICONS[icon]}</span>` : ""}
      <b>${esc(label)}</b><small>${esc(hint)}</small>
    </label>`).join("");
  const choiceTypes = [
    ["users", "En famille", "avec enfants ou en tribu"],
    ["heart", "En couple", "les deux, ou plus si affinités"],
    ["camera", "Photo", "objectif avant tout"],
    ["gift", "Voyage de noces", "lune de miel, anniversaire"],
    ["route", "Groupe / entreprise", "8 voyageurs et +"],
    ["compass", "Aventure solo ou duo", "intimiste"],
  ].map(([icon, label, hint]) => `
    <label class="choice">
      <input type="radio" name="type-voyage" value="${esc(label)}">
      <span style="display:inline-flex;width:1.5rem;height:1.5rem">${ICONS[icon]}</span>
      <b>${esc(label)}</b><small>${esc(hint)}</small>
    </label>`).join("");
  const choiceConfort = [
    ["Confort safari", "Camps simples & mobiles, l'essentiel bien fait"],
    ["Confort premium", "Lodges de charme, douches chaudes garanties"],
    ["Exceptionnel", "Camps privatisés, service au chevet de la brousse"],
  ].map(([label, hint]) => `
    <label class="choice">
      <input type="radio" name="confort" value="${esc(label)}">
      <b>${esc(label)}</b><small>${esc(hint)}</small>
    </label>`).join("");

  const content = `
${breadcrumb("sur-mesure.html", [["Voyage sur mesure"]])}
<section class="container section-tight" style="padding-top:0">
  <p class="overline">Sur mesure — en 5 étapes</p>
  <h1 style="max-width:20ch">Racontez-nous votre voyage <em class="serif-em">idéal</em></h1>
  <p class="lead" style="max-width:66ch">Cinq étapes, dix minutes, aucune obligation. Un conseiller vous répond sous 48 h ouvrées avec une première proposition — gratuite, sans engagement, et déjà taillée pour vous.</p>
</section>

<section class="section-tight" style="padding-bottom:clamp(4rem,10vh,7rem)">
  <div class="container wizard" data-wizard>
    <div class="wizard-progress" id="wizard-progress" aria-hidden="true">
      ${Array.from({ length: 5 }, () => '<span class="bar"><i></i></span>').join("")}
    </div>
    <form id="demande-form" novalidate>
      <fieldset class="wizard-step current" id="step-1" style="border:0;padding:0;margin:0">
        <h2 id="step-1-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Où posons-nous <em class="serif-em">les valises</em> ?</h2>
        <p class="step-count">Étape 1 / 5 — destination & dates</p>
        <div class="field">
          <label for="destination">Destination souhaitée</label>
          <select id="destination" name="destination" required>
            <option value="">— Choisir —</option>
            <option>Tanzanie</option><option>Kenya</option><option>Botswana</option>
            <option>Namibie</option><option>Afrique du Sud</option><option>Rwanda</option>
            <option>Zambie</option><option>Plusieurs pays / je ne sais pas encore</option>
          </select>
          <p class="error-msg" role="alert"></p>
        </div>
        <div class="field">
          <label for="destination-libre">Une envie précise ? <span style="font-weight:400;color:var(--ink-soft)">(parc, région, lodge… — facultatif)</span></label>
          <input type="text" id="destination-libre" name="destination-libre" placeholder="Ex. le Serengeti au moment du calving">
        </div>
        <div class="field">
          <label for="periode">Dates ou période envisagée</label>
          <input type="text" id="periode" name="periode" required placeholder="Ex. deuxième quinzaine de septembre 2026">
          <p class="hint">Une fourchette suffit — nous vérifions la faisabilité et la saison.</p>
          <p class="error-msg" role="alert"></p>
        </div>
        <div class="wizard-nav">
          <span></span>
          <button type="button" class="btn btn-terra" data-next>Continuer ${ICONS.arrow}</button>
        </div>
      </fieldset>

      <fieldset class="wizard-step" id="step-2" style="border:0;padding:0;margin:0">
        <h2 id="step-2-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Qui part à <em class="serif-em">l'aventure</em> ?</h2>
        <p class="step-count">Étape 2 / 5 — la caravane</p>
        <div class="field-row">
          <div class="field">
            <label for="adultes">Adultes</label>
            <input type="number" id="adultes" name="adultes" min="1" max="24" value="2" required>
            <p class="error-msg" role="alert"></p>
          </div>
          <div class="field">
            <label for="enfants">Enfants (- 18 ans)</label>
            <input type="number" id="enfants" name="enfants" min="0" max="12" value="0">
          </div>
        </div>
        <div class="field">
          <label for="ages-enfants">Âges des enfants <span style="font-weight:400;color:var(--ink-soft)">(si concerné — important pour les activités)</span></label>
          <input type="text" id="ages-enfants" name="ages-enfants" placeholder="Ex. 8 et 12 ans">
        </div>
        <div class="field">
          <span class="filter-label" style="margin-bottom:.6rem">Type de voyage</span>
          <div class="choice-grid" data-required-group>
            ${choiceTypes}
          </div>
          <p class="error-msg" role="alert">Choisissez un type de voyage.</p>
        </div>
        <div class="wizard-nav">
          <button type="button" class="btn btn-ghost" data-prev>Retour</button>
          <button type="button" class="btn btn-terra" data-next>Continuer ${ICONS.arrow}</button>
        </div>
      </fieldset>

      <fieldset class="wizard-step" id="step-3" style="border:0;padding:0;margin:0">
        <h2 id="step-3-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Quel budget, <em class="serif-em">en toute franchise</em> ?</h2>
        <p class="step-count">Étape 3 / 5 — budget & confort</p>
        <div class="field">
          <label for="budget">Budget par personne (hors vols internationaux)</label>
          <select id="budget" name="budget" required>
            <option value="">— Choisir —</option>
            <option value="2500-3500">2 500 – 3 500 €</option>
            <option value="3500-6000">3 500 – 6 000 €</option>
            <option value="6000-10000">6 000 – 10 000 €</option>
            <option value="10000-20000">Plus de 10 000 €</option>
          </select>
          <p class="hint">Une vraie fourchette nous permet de proposer le bon niveau de camps dès la première ébauche.</p>
          <p class="error-msg" role="alert"></p>
        </div>
        <div class="field">
          <span class="filter-label" style="margin-bottom:.6rem">Confort souhaité</span>
          <div class="choice-grid" style="grid-template-columns:repeat(3,1fr)" data-required-group>
            ${choiceConfort}
          </div>
          <p class="error-msg" role="alert">Choisissez un niveau de confort.</p>
        </div>
        <div class="wizard-nav">
          <button type="button" class="btn btn-ghost" data-prev>Retour</button>
          <button type="button" class="btn btn-terra" data-next>Continuer ${ICONS.arrow}</button>
        </div>
      </fieldset>

      <fieldset class="wizard-step" id="step-4" style="border:0;padding:0;margin:0">
        <h2 id="step-4-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Vos envies, <em class="serif-em">y compris folles</em></h2>
        <p class="step-count">Étape 4 / 5 — les musts</p>
        <div class="field">
          <span class="filter-label" style="margin-bottom:.6rem">Ce qui vous fait vibrer (plusieurs choix possibles)</span>
          <div class="choice-grid">
            ${choiceEnvies}
          </div>
        </div>
        <div class="field">
          <label for="message">Dites-nous tout <span style="font-weight:400;color:var(--ink-soft)">(facultatif)</span></label>
          <textarea id="message" name="message" placeholder="Occasion particulière, allergies, rêve d'enfance, phobies des araignées… tout est bon à savoir."></textarea>
        </div>
        <div class="wizard-nav">
          <button type="button" class="btn btn-ghost" data-prev>Retour</button>
          <button type="button" class="btn btn-terra" data-next>Vérifier ma demande ${ICONS.arrow}</button>
        </div>
      </fieldset>

      <fieldset class="wizard-step" id="step-5" style="border:0;padding:0;margin:0">
        <h2 id="step-5-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Vérifiez, <em class="serif-em">puis envoyez</em></h2>
        <p class="step-count">Étape 5 / 5 — récapitulatif & coordonnées</p>
        <div class="recap-box">
          <h3 style="font-size:1.3rem;margin-top:0">Votre voyage en un coup d'œil</h3>
          <ul class="recap-list" data-recap></ul>
        </div>
        <div class="field-row" style="margin-top:1.6rem">
          <div class="field">
            <label for="nom">Votre nom</label>
            <input type="text" id="nom" name="nom" required autocomplete="name">
            <p class="error-msg" role="alert"></p>
          </div>
          <div class="field">
            <label for="email">Votre e-mail</label>
            <input type="email" id="email" name="email" required autocomplete="email">
            <p class="error-msg" role="alert"></p>
          </div>
        </div>
        <div class="field">
          <label class="field-check" for="consent">
            <input type="checkbox" id="consent" required>
            <span>J'accepte que mes données soient utilisées uniquement pour traiter cette demande, conformément à la <a class="text-link" href="${hrefFrom("sur-mesure.html", "confidentialite.html")}">politique de confidentialité</a>. Aucune newsletter sauvage, promis.</span>
          </label>
          <p class="error-msg" role="alert"></p>
        </div>
        <div class="wizard-nav">
          <button type="button" class="btn btn-ghost" data-prev>Retour</button>
          <button type="submit" class="btn btn-terra btn-lg">Envoyer ma demande ${ICONS.arrow}</button>
        </div>
      </fieldset>
    </form>

    <div id="wizard-confirm" class="confirm-hero" hidden>
      <div class="confirm-icon" role="img" aria-label="Demande envoyée">${ICONS.check}</div>
      <h2>Merci — votre demande est <em class="serif-em">partie</em></h2>
      <p class="lead" style="max-width:52ch;margin-inline:auto">Un conseiller l'étudie dès maintenant et vous répond sous 48 h ouvrées à l'adresse indiquée. En attendant, le journal vous attend : <a class="text-link" href="${hrefFrom("sur-mesure.html", "journal.html")}">lire les carnets de terrain</a>.</p>
      <p style="color:var(--ink-soft);font-size:.9rem">(Démonstration : aucun message n'est réellement transmis — écrivez-nous plutôt à <a class="text-link" href="mailto:${SITE.email}">${SITE.email}</a>.)</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.6rem">
        <a class="btn btn-ghost" href="${hrefFrom("sur-mesure.html", "circuits.html")}">Explorer les circuits</a>
        <a class="btn btn-terra" href="${hrefFrom("sur-mesure.html", "index.html")}">Retour à l'accueil</a>
      </div>
    </div>
  </div>
</section>

<section class="section soft">
  <div class="container">
    <div class="split" style="align-items:center">
      <div class="split-media reveal-img">${imgTag("agence-campagne", 820)}</div>
      <div class="reveal" style="--d:80ms">
        <p class="overline">Et après ?</p>
        <h2>De la demande au <em class="serif-em">départ</em></h2>
        <ol class="timeline" style="margin-top:1.6rem">
          ${[
    ["48 h", "Première ébauche", "Un itinéraire écrit à la main, avec deux variantes de camps et un prix honnête."],
    ["1 semaine", "Les allers-retours", "Vous ajustez, nous recommandons. Autant de rounds que nécessaire."],
    ["Validation", "Le dossier verrouillé", "Devis ferme, carnet de voyage complet, assistance visa et santé."],
    ["Le départ", "Et pendant le voyage", "Un numéro d'astreinte, un conseiller joignable, des correspondants sur place."],
  ].map(([k, t, d]) => `
          <li class="timeline-day">
            <span class="day-badge" aria-hidden="true"><small>${esc(k)}</small><strong>&nbsp;</strong></span>
            <h3 style="font-size:1.2rem">${esc(t)}</h3>
            <p style="margin:0">${esc(d)}</p>
          </li>`).join("")}
        </ol>
      </div>
    </div>
  </div>
</section>`;

  return page({
    file: "sur-mesure.html",
    title: "Voyage sur mesure — demande en 5 étapes | Horizons Sauvages",
    description: "Composez votre safari sur mesure en 5 étapes : destination, voyageurs, budget, envies. Réponse d'un conseiller sous 48 h, proposition gratuite et sans engagement.",
    content,
  });
}
