# Horizons Sauvages — site vitrine (démonstration)

Site vitrine complet d'une agence fictive de safaris et de voyages sur mesure à Marseille.
Réalisation de démonstration : **Matrice Studio**.

## Le dossier `site/` est le livrable

C'est un site **100 % statique** (HTML/CSS/JS, aucune dépendance, aucun backend, aucun traceur) :

- **Prévisualisation locale** : ouvrir `site/index.html` directement dans un navigateur,
  ou mieux, servir le dossier :
  ```bash
  cd site
  python -m http.server 8080
  # → http://localhost:8080
  ```
- **Déploiement** : copier le contenu de `site/` sur n'importe quel hébergement statique
  (Netlify, Vercel, GitHub Pages, OVH, Apache/Nginx…). Aucune variable d'environnement.

## Structure du projet

```
site/          ← le site généré (livrable)
build/         ← le générateur (Node sans dépendance) : `node build/build.mjs`
build/data/    ← contenus éditoriaux (modules ESM) + SCHEMA.md
build/pages/   ← rendus des pages
build/css|js/  ← design system & interactions (copiés dans site/assets/)
build/tools/   ← outils : téléchargement Commons, polices, favicons, WebP, SOURCES.md
assets_src/    ← ressources sources (photos Commons, polices, favicons, WebP)
SOURCES.md     ← provenance et licences de toutes les ressources tierces
```

## Régénérer le site

```bash
node build/build.mjs
```

(Prérequis pour tout régénérer depuis zéro : Pillow pour `build/tools/process-images.py`
et `make-brand.py`.)

## Contenu

Agence, circuits, hébergements, personnes et témoignages : **fictions rédigées pour
cette démonstration**. Destinations et parcs : réels. Aucun prestataire réel n'est
cité comme partenaire. Le formulaire sur mesure ne transmet aucune donnée.

Contact affiché (unique) : matricestudio@protonmail.com
