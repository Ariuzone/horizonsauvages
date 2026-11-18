import { page, esc } from "../template.mjs";
import { SITE } from "../config.mjs";
import { breadcrumb } from "../components.mjs";

const wrap = (file, title, content) => page({
  file,
  title: `${title} | Horizons Sauvages`,
  description: `Mentions légales et informations éditoriales du site Horizons Sauvages (site de démonstration de ${SITE.studio}).`,
  noIndex: true,
  content: breadcrumb(file, [[title]]) + `<section class="container-narrow section-tight" style="padding-top:0">
  <h1 style="font-size:clamp(2rem,4vw,3rem)">${esc(title)}</h1>
  <div class="article-body">${content}</div>
</section>`,
});

export function renderMentions() {
  return wrap("mentions-legales.html", "Mentions légales", `
<p><strong>Éditeur du site :</strong> Matrice Studio, studio de création de sites web — site de démonstration.</p>
<p><strong>Contact :</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></p>
<p><strong>Site présenté :</strong> « Horizons Sauvages », agence de safaris et de voyages sur mesure fictive, 18 quai du Port, 13002 Marseille. L'agence, son équipe, ses circuits, ses partenaires, ses hébergements et les témoignages affichés sont entièrement fictifs et n'exercent aucune activité réelle de vente de voyages. Aucune réservation, aucun paiement ni aucune transmission de données ne sont possibles via ce site.</p>
<p><strong>Responsabilité :</strong> les destinations et parcs cités sont réels, mais les informations pratiques (formalités, santé, tarifs) sont fournies à titre d'illustration et ne sauraient remplacer les sources officielles. Pour tout voyage réel, consultez les sites gouvernementaux et diplomatiques compétents.</p>
<h2>Propriété intellectuelle</h2>
<p>Le logo, la charte graphique et les textes de démonstration sont créés par ${SITE.studio}. Les photographies proviennent de Wikimedia Commons et sont réutilisées selon les licences indiquées dans le fichier SOURCES.md fourni avec le projet.</p>
<h2>Crédits techniques</h2>
<p>Site statique sans traceur ni cookie : aucune donnée personnelle n'est collectée, transmise ou vendue. Le formulaire « sur mesure » est une démonstration d'interface qui n'envoie rien.</p>`);
}

export function renderConfidentialite() {
  return wrap("confidentialite.html", "Politique de confidentialité", `
<p>Ce site est une démonstration : <strong>aucune donnée personnelle n'est collectée, stockée ou transmise</strong>. Il n'embarque aucun traceur, cookie publicitaire, pixel ou outil d'analyse d'audience.</p>
<h2>Formulaire de demande de voyage</h2>
<p>Le parcours « sur mesure » fonctionne entièrement dans votre navigateur, à titre de démonstration d'interface. Les informations que vous y saisissez ne quittent pas votre appareil et ne sont pas enregistrées ; elles disparaissent au rechargement de la page.</p>
<h2>Liens externes</h2>
<p>Le site pointe vers des pages externes (par exemple le portail « Découvrir nos autres projets » ou des cartes en ligne). Ces tiers appliquent leurs propres politiques de confidentialité, indépendantes de ce site.</p>
<h2>Vos droits</h2>
<p>Puisque aucune donnée n'est collectée, aucun traitement ne requiert de consentement. Si vous pensez qu'une donnée vous concernant a été transmise par erreur, écrivez à <a href="mailto:${SITE.email}">${SITE.email}</a> ; elle sera supprimée sans délai. Conformément au RGPD, vous disposez des mêmes droits d'accès, de rectification et d'effacement vis-à-vis de tout site que vous utiliseriez réellement.</p>`);
}
