# Journal des modifications

Toutes les évolutions notables du site officiel de Liziba Mvuluzi sont
documentées dans ce fichier.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage inspiré de [Semantic Versioning](https://semver.org/lang/fr/)
(MAJEUR.MINEUR.CORRECTIF) : MAJEUR pour un changement d'architecture,
MINEUR pour l'ajout de sections ou de fonctionnalités, CORRECTIF pour les
ajustements, le nettoyage ou les corrections techniques.

---

## [1.2.1] — 2026-08-04

### Corrigé — affichage des médias déposés
Après dépôt des premiers médias réels, plusieurs images ne s'affichaient
pas. Cause : incohérence entre les extensions attendues par le code
(figées en `.jpg` lors de l'architecture) et les extensions réelles des
fichiers déposés.

- `assets/images/covers/envie-des-choses.jpeg` → renommé `.jpg`.
- `assets/images/covers/le-genereux-remix.jpeg` → renommé `.jpg`.
- `assets/images/gallery/gallery-01.jpeg`, `gallery-02.jpeg`,
  `gallery-04.jpeg` → renommés `.jpg` (format déjà correct, seule
  l'extension était en cause).
- `assets/images/gallery/gallery-03.png` → **converti** en JPEG réel et
  renommé `gallery-03.jpg` (contrairement aux fichiers ci-dessus, celui-ci
  était un vrai PNG : un simple renommage aurait laissé un fichier
  corrompu pour le navigateur).
- `assets/logos/logo.png` : le fichier déposé est une image raster, pas un
  vectoriel. Plutôt que d'exiger un `.svg`, `data/artist.json`
  (`brand.logo`) a été mis à jour pour référencer directement
  `assets/logos/logo.png`.
- `assets/videos/video-01.mp4.mp4`, `video-02.mp4.mp4` → double extension
  corrigée (`video-01.mp4`, `video-02.mp4`). Cosmétique : ce dossier n'est
  pas connecté à l'affichage (voir `assets/images/README.md`).
- Portrait Hero (`.hero__portrait-frame`, `css/style.css`) : aucune erreur
  trouvée (fichier et chemin déjà corrects), mais la règle a été simplifiée
  par précaution — l'empilement à 3 calques `background-image` en une
  seule déclaration (fragile : un décalage entre les listes
  `background-image`/`-position`/`-size`/`-repeat` casse silencieusement
  le rendu) a été remplacé par le même pattern éprouvé que
  `.featured-release__art` : un calque photo simple sur l'élément, le
  dégradé déplacé sur `::before`. Aucun changement visuel attendu.

### Vérifié
- Les 9 chemins médias (Hero, 3 pochettes, 4 photos galerie, logo)
  référencés par le code résolvent désormais vers un fichier réellement
  présent, au format annoncé par son extension.
- JSON (6 fichiers), CSS et JavaScript revalidés après correction.
- `assets/images/social/og-cover.jpg` toujours absent — non fourni dans ce
  dépôt de médias, hors périmètre de ce correctif.

---

## [1.2.0] — 2026-08-03

Version majeure : le site passe d'un contenu entièrement statique à un
rendu piloté par la couche de données `data/*.json`. Trois phases de travail
consolidées ci-dessous.

### Phase 1 — Fondations techniques
- Couche de données `data/` créée : `artist.json`, `socials.json`,
  `releases.json`, `videos.json`, `concerts.json`, `site.json` —
  squelettes avec `schemaVersion: 1`.
- Arborescence `assets/` restructurée par usage :
  `images/{hero,gallery,covers,press,social}`, `logos/`, `downloads/`.
- Utilitaires JavaScript de chargement asynchrone des 6 fichiers JSON.

### Phase 2 — Remplissage des données réelles
- `artist.json` : nom, nom civil, titre, slogan, genres, WhatsApp (lien
  « click to chat »).
- `socials.json` : 9 profils (Facebook, Instagram, TikTok, YouTube —
  `social` ; Spotify, Apple Music, Deezer, TIDAL, Amazon Music — `streaming`).
- `releases.json` : 3 sorties (« Le Généreux Remix », « Je l'aime de tout
  mon cœur », « Envie des choses »), chacune avec son lien Spotify et sa
  pochette référencée.
- `videos.json` : 2 clips, reliés à leurs sorties via `relatedReleaseId`.

### Phase 3 — Rendu dynamique, section Nouveautés, architecture médias finale

#### Ajouté
- **Section Nouveautés** (nouvelle, ancrée `#nouveautes`) : affiche
  automatiquement les 2 sorties les plus récentes de `releases.json`,
  avec lien d'écoute et lien vers le clip associé le cas échéant.
  Navigation et numérotation des sections (`01` à `11`) mises à jour en
  conséquence.
- **Moteur de rendu complet** (`js/main.js`) : `renderFeaturedRelease`,
  `renderNouveautes`, `renderPlatforms`, `renderSocialCards`,
  `renderDiscography`, `renderVideos`, `renderConcerts`,
  `applyArtistContact`, chargeur/cache d'icônes SVG (`loadIcon`) — toutes
  branchées dans `initSiteData()`. Principe de non-régression respecté :
  une donnée absente laisse le contenu statique existant intact.
- **10 icônes SVG locales de plateformes** (`assets/icons/platforms/`) :
  Facebook, Instagram, TikTok, YouTube, Spotify, Apple Music, Deezer,
  TIDAL, Amazon Music, WhatsApp — style ligne fine `currentColor`, aucune
  dépendance CDN, cohérentes avec le design noir/or existant.
- Dossier `assets/videos/` réservé (non connecté à une section — la
  section Vidéos reste alimentée par YouTube via `videos.json`).
- Galerie simplifiée à 4 emplacements définitifs (`gallery-01.jpg` à
  `gallery-04.jpg`), avec vraies balises `<img>` et grille responsive
  uniforme (remplace l'ancien système de tailles `--tall`/`--wide`).

#### Modifié
- Portrait Hero et pochette de la sortie à la une câblés en CSS avec repli
  gradient gracieux tant que le fichier média n'est pas déposé.
- Lightbox de la galerie : affiche désormais la vraie image cliquée
  (correction du TODO laissé en phase 2).
- Bouton WhatsApp flottant, liens email (Booking, Presse, Contact) et
  téléphone : mis à jour dynamiquement depuis `artist.json` quand le champ
  correspondant est renseigné, sinon le contenu statique est conservé.
- Chemins d'image de partage (`og:image`, `twitter:image`, Schema.org
  `image`) et commentaire du portrait Hero corrigés vers l'arborescence
  définitive (`assets/images/social/`, `assets/images/hero/`).
- `README.md` (section 12) et `assets/images/README.md` réécrits pour
  documenter l'arborescence médias définitive et le rendu dynamique actif.

#### Vérifié (audit final)
- HTML : balises équilibrées, aucun ID dupliqué, aucune ancre orpheline.
- CSS : accolades équilibrées.
- JavaScript : syntaxe validée (`node --check`), tous les
  `getElementById` correspondent à un `id` réel du HTML.
- JSON : 6 fichiers valides, aucune référence croisée orpheline entre
  `releases.json` et `videos.json`.
- Icônes SVG : 10 fichiers valides.
- Tous les chemins de médias référencés dans le code correspondent
  exactement à l'arborescence définitive (voir tableau de dépôt dans la
  réponse de livraison).
- Tous les liens externes protégés par `rel="noopener"`.
- `manifest.json`, `robots.txt`, `sitemap.xml` inchangés et toujours
  cohérents avec l'URL GitHub Pages en vigueur.

**Médias non inclus dans cette livraison**, par décision explicite : les
dossiers et noms de fichiers exacts sont prêts à recevoir logo, photos,
pochettes et vidéos sans aucune modification de code (voir tableau dans
`assets/images/README.md`).

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
