# Journal des modifications

Toutes les évolutions notables du site officiel de Liziba Mvuluzi sont
documentées dans ce fichier.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage inspiré de [Semantic Versioning](https://semver.org/lang/fr/)
(MAJEUR.MINEUR.CORRECTIF) : MAJEUR pour un changement d'architecture,
MINEUR pour l'ajout de sections ou de fonctionnalités, CORRECTIF pour les
ajustements, le nettoyage ou les corrections techniques.

---

## [Non publié] — Fondations techniques V1.2

En préparation. Aucune nouvelle section, aucun nouveau contenu, aucun média
intégré à ce stade — uniquement la base technique destinée à accueillir les
futures évolutions sans restructuration.

### Ajouté
- Couche de données `data/` : `artist.json`, `socials.json`, `releases.json`,
  `videos.json`, `concerts.json`, `site.json` — squelettes vides avec
  `schemaVersion: 1`, prêts à être renseignés progressivement.
- Arborescence `assets/` restructurée : `images/{hero,gallery,covers,press,social}`,
  `logos/`, `downloads/` (en plus de `icons/` déjà existant).
- Utilitaires JavaScript de chargement (`js/main.js`) : lecture asynchrone des
  6 fichiers JSON au démarrage, avec gestion d'erreur individuelle par
  fichier. Les données chargées sont mises à disposition pour les futurs
  développements, sans encore modifier l'affichage des sections existantes.
- Présent fichier `CHANGELOG.md`.

### Principes actés pour la suite (architecture figée)
- Séparation stricte : `socials.json` = profils généraux de l'artiste
  (réseaux sociaux + pages plateformes) ; `releases.json` = lien d'écoute
  propre à chaque sortie. Aucune duplication entre les deux.
- `site.json` reste une configuration technique consommée au runtime
  (analytics, référence de domaine) — il n'alimente jamais les balises
  `<meta>` statiques critiques pour le SEO et le partage (`canonical`,
  `og:*`, `twitter:*`), qui restent en dur dans `index.html` pour rester
  lisibles par les robots qui n'exécutent pas JavaScript.
- La biographie complète reste en HTML statique (texte unique, mise en
  forme riche) — elle n'entre pas dans `artist.json`.
- Tous les chemins (JSON, assets, manifest) restent relatifs, pour une
  compatibilité totale entre GitHub Pages (racine ou sous-dossier), Netlify,
  Vercel et un futur domaine personnalisé.
- Aucun dossier `audio/`, aucun média lourd hébergé sur GitHub Pages, aucun
  document confidentiel (contrat, rider) dans le dépôt public.

---

## [1.1.3] — 2026-08-03

### Corrigé
- Suppression de la dernière occurrence littérale de l'ancien domaine
  (`https://www.lizibamvuluzi.com/`) dans un commentaire développeur
  d'`index.html`. Plus aucune référence à ce domaine dans le projet, hors
  adresses e-mail de contact.

---

## [1.1.2] — 2026-08-03

### Corrigé
- Correctif SEO temporaire pour la publication sur GitHub Pages :
  `canonical`, `og:url`, `og:image`, `twitter:image` et les URLs `url` des
  blocs Schema.org (`Person`, `MusicGroup`) mis à jour vers
  `https://lizibamvuluzi.github.io/liziba-mvuluzi-site/`.
- `robots.txt` et `sitemap.xml` alignés sur la même URL temporaire.
- Commentaires `TODO` relatifs au domaine mis à jour pour documenter la
  bascule à effectuer lors du branchement du domaine personnalisé définitif.
- Vérifié en conditions réelles sur le site publié (contrôle du code source).

---

## [1.1.1] — 2026-08-02

### Modifié — finalisation / audit qualité (aucun changement de contenu)
- Icônes de la lightbox (galerie) uniformisées en SVG, cohérentes avec les
  boutons flottants.
- Micro-interactions harmonisées : survol homogène sur les lignes de la
  Discographie et de l'Agenda.
- Écouteurs de scroll (en-tête, bouton Retour en haut) optimisés via
  `requestAnimationFrame`.
- Nettoyage du CSS mort (classe et variable inutilisées, sélecteur
  redondant) et d'une variable JavaScript inutilisée dans la lightbox
  (réemployée pour l'accessibilité).
- `manifest.json` : `start_url` et `scope` rendus relatifs (compatibilité
  GitHub Pages en sous-dossier).
- Ajout des balises `og:image:alt` / `twitter:image:alt`.
- Audit automatisé complet (validité JSON/XML/JSON-LD, équilibre HTML,
  contrastes WCAG AA, syntaxe JavaScript).

---

## [1.1.0] — 2026-08-02

### Ajouté — extension majeure des sections (V2)
- Section Biographie complète (texte étendu, faits marquants, repères de
  parcours).
- Section Musique enrichie : titre à la une + grille des 8 plateformes de
  streaming.
- Section Discographie (tableau structuré : année, titre, type, lien
  d'écoute).
- Section Concerts / Agenda (état vide géré + modèle prêt à dupliquer).
- Section Presse (kit presse, citation, contact presse dédié).
- Section Réseaux sociaux (grille de cartes dédiée).
- Section Contact distincte du Booking (formulaire général séparé).
- Galerie photo avec lightbox (navigation clavier, gestion du focus).
- Bouton WhatsApp flottant, bouton Retour en haut.
- Manifest PWA (`manifest.json`) et icônes associées (SVG + PNG multi-tailles).
- Accessibilité renforcée (lien d'évitement, focus visible,
  `prefers-reduced-motion`).
- SEO étendu (Schema.org enrichi avec `MusicRecording`, sitemap complet).

---

## [1.0.0] — 2026-08-02

### Ajouté — version initiale (V1)
- Structure du site en page unique, HTML5 / CSS3 / JavaScript vanilla, sans
  framework ni dépendance externe (hors polices Google Fonts).
- Sections initiales : Hero, À propos, Musique (plateformes), Vidéos,
  Galerie, Actualités, Booking, Contact, Footer.
- Identité visuelle : noir profond, or premium, blanc cassé, gris discret ;
  typographies Fraunces / Work Sans / Space Mono.
- Élément signature : « cordes » animées en arrière-plan du Hero, écho
  visuel de la guitare et du geste de « L'Agenceur ».
- SEO de base : meta tags, Open Graph, Twitter Cards, Schema.org
  (`Person`, `MusicGroup`), `robots.txt`, `sitemap.xml`, favicon.
- Prêt pour un déploiement statique (GitHub Pages / Netlify / Vercel).
