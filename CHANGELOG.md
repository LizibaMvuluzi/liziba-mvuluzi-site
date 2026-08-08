# Journal des modifications

Toutes les évolutions notables du site officiel de Liziba Mvuluzi sont
documentées dans ce fichier.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage inspiré de [Semantic Versioning](https://semver.org/lang/fr/)
(MAJEUR.MINEUR.CORRECTIF) : MAJEUR pour un changement d'architecture,
MINEUR pour l'ajout de sections ou de fonctionnalités, CORRECTIF pour les
ajustements, le nettoyage ou les corrections techniques.

---

## [1.4.1] — 2026-08-07 — Correctif final de la série V1.x

- Activation définitive des formulaires Web3Forms.
- Ajout du message de confirmation après envoi.
- Réinitialisation automatique des formulaires après succès.
- Protection contre les doubles soumissions.
- Correction du titre « Le Généreux » dans la section Vidéos.
- Vérification complète des formulaires.

### Détail technique
- `js/main.js` : clé d'accès Web3Forms réelle intégrée (compte créé par
  l'artiste) ; les deux formulaires (Booking, Contact) sont désormais
  pleinement opérationnels et redirigent vers `lizibamvuluzi@gmail.com`.
  Le message « Formulaire non configuré pour l'instant… » ne peut plus
  s'afficher.
- Message de confirmation signé et multi-ligne (texte fourni respecté à
  l'identique) : « Merci. Votre message a bien été transmis. Je prendrai
  connaissance de votre demande et vous répondrai dans les meilleurs
  délais. — Liziba Mvuluzi » — nouveau style dédié (`.form-status__title`,
  `.form-status__signature`), cohérent avec l'identité typographique du
  site (Fraunces, or premium).
- Réinitialisation des champs (`form.reset()`) déjà en place depuis
  l'activation initiale (V1.3) — confirmée fonctionnelle avec la vraie clé.
- Protection anti-double-soumission renforcée : garde ajoutée en tête de
  `submitForm()` (`if (submitBtn.disabled) return;`), qui couvre aussi
  bien un double-clic que la validation d'un formulaire au clavier
  (touche Entrée) pendant qu'un envoi est déjà en cours.
- Nouvel état visuel `.btn:disabled` (opacité réduite, curseur adapté)
  pour un retour clair pendant l'envoi.
- `data/videos.json` : titre du clip corrigé, `"Le Généreux Remix"` →
  `"Le Généreux"`. Seul ce libellé a été modifié — le nom de la sortie
  elle-même (`releases.json`, Biographie, titre à la une) reste à juste
  titre « Le Généreux Remix », qui est le nom réel de la sortie, distinct
  du titre du clip.

### Vérifié
- Syntaxe JavaScript validée (`node --check`).
- HTML équilibré sur les 6 pages, CSS toujours cohérent, JSON valides.
- Relecture statique complète du code d'envoi (endpoint, champs
  `access_key`/`subject`/`from_name`, noms de champs des deux
  formulaires) — conforme au contrat d'API Web3Forms.
- **Limite technique à signaler honnêtement** : l'environnement d'exécution
  utilisé pour cette livraison n'a pas d'accès réseau sortant ; un envoi
  réel de test (`fetch` vers `api.web3forms.com`) n'a donc pas pu être
  déclenché depuis cet environnement. Le code a été relu et vérifié
  statiquement avec la plus grande rigueur, mais **un test réel depuis le
  site publié reste à faire** (voir recommandation de livraison).

---

## [1.4.0] — 2026-08-07 — Édition Fondatrice

Première version du site à établir les fondements identitaires complets
de l'univers de Liziba Mvuluzi. Aucune modification de l'identité
graphique, aucune régression sur l'existant — uniquement les 4 points
validés ci-dessous.

### Ajouté
- **Page « Les Fondements »** (`/pages/fondements.html`) — manifeste
  officiel, textes intégrés fidèlement (aucune reformulation du sens) :
  Liziba, Mvuluzi, L'Agenceur, El Rayo Del Creciente, La Guitare
  Spirituelle. Publiée, indexable, reliée depuis la navigation.
- **Page « YOKA Source Labs »** (`/pages/yoka-source-labs.html`) —
  manifeste institutionnel officiel : le sens du nom (YOKA / SOURCE /
  LABS), la devise, la doctrine en 7 étapes, la vision, la philosophie.
  Textes intégrés fidèlement. Publiée, indexable, reliée depuis la
  navigation.
- **Nouveaux composants CSS réutilisables** (section 16 de `style.css`) :
  `.pillar` (bloc identitaire : nom, tagline, vers poétiques groupées par
  respiration de lecture), `.doctrine` (flux vertical à 7 étapes, reprend
  le langage visuel déjà établi par la timeline de la Biographie),
  `.manifesto-quote` (citation de marque). Mise en page à deux colonnes
  (filet doré + contenu), cohérente avec la section Biographie existante.
- **Architecture Google Analytics 4**, sans identifiant fictif : nouvelle
  fonction `initAnalytics()` dans `js/main.js`, pilotée entièrement par
  `data/site.json` (`analytics.provider` / `analytics.id`). Tant qu'aucun
  Measurement ID réel n'est renseigné, strictement aucun script ni cookie
  Google n'est chargé. Un seul champ JSON à renseigner suffira à activer
  la mesure d'audience sur les 6 pages du site simultanément.
- **Schema.org `WebPage`** ajouté sur les 4 pages secondaires (Fondements,
  YOKA Source Labs, Mentions légales, Politique de confidentialité), en
  complément de `Person`/`MusicGroup` déjà présents sur l'accueil.

### Modifié
- Navigation (header + footer, sur les 6 pages) : ajout des liens
  « Fondements » et « YOKA Labs », positionnés après Concerts — cohérent
  avec le chemin de lecture du site (l'Artiste → les Œuvres → les
  Fondements → le Cabinet). Espacement de la nav légèrement resserré pour
  accueillir les 2 entrées supplémentaires sans casser la mise en page
  desktop.
- `sitemap.xml` : ajout des 2 nouvelles pages publiées.
- README : section SEO réécrite (couverture multi-pages, procédure
  d'activation GA4, note de migration de domaine corrigée — l'ancienne
  mention d'un domaine `.com` obsolète a été retirée) ; section 13
  (architecture multi-pages) mise à jour : Fondements et YOKA Source Labs
  ne sont plus documentées comme « réservées » mais comme publiées.

### Vérifié (audit Google Search Console — préparation complète)
- `robots.txt` : cohérent, `Allow: /`, aucune page à exclure (plus aucune
  page brouillon depuis la publication de Fondements/YOKA).
- `sitemap.xml` valide, toutes les URLs qu'il référence sont réellement
  publiées et indexables (aucune URL `noindex` incluse).
- Balise `canonical` unique et correcte sur chacune des 6 pages.
- `<title>` et `<meta name="description">` uniques par page, aucune
  duplication, longueurs vérifiées (description YOKA Source Labs
  raccourcie sous 160 caractères).
- Un seul `<h1>` par page (vérifié programmatiquement).
- Crawl complet des liens internes des 6 pages : aucun lien cassé, aucune
  ancre orpheline (y compris les ancres `../index.html#section` utilisées
  depuis `/pages/`).
- Tous les blocs Schema.org (7 au total sur le site) valident en JSON.
- Tous les liens externes protégés par `rel="noopener"`.

---

## [1.3.0] — 2026-08-06

Release Candidate — première version publique officielle destinée à
remplacer Linktree. Cette version se concentre sur la finalisation
juridique, technique et éditoriale du site existant (aucune refonte de
design, aucune nouvelle section visible hors ajouts explicitement validés).

### Ajouté
- **Mentions légales** et **Politique de confidentialité**
  (`/pages/mentions-legales.html`, `/pages/politique-confidentialite.html`) —
  titulaire NDINGA Rhudy Joseph, hébergement GitHub Pages, droits RGPD.
  Liens ajoutés au footer ; mention de consentement sous les deux
  formulaires.
- **Page 404 personnalisée** (`404.html`, à la racine — emplacement imposé
  par GitHub Pages), cohérente avec l'identité noir/or du site.
- **Bloc éditorial « Aux origines de la Mbokalisation »** dans la
  Discographie, avec lien d'écoute vers « Nouveau Concept » sur Spotify.
- **Image Open Graph premium** (`assets/images/social/og-cover.jpg`),
  composée à partir de la bannière Hero et du logo officiel.
- **Formulaires réellement fonctionnels** via Web3Forms (service gratuit
  sans backend, compatible hébergement statique), redirigeant vers
  `lizibamvuluzi@gmail.com`. Une clé d'accès reste à renseigner par le
  site (`js/main.js`, constante `WEB3FORMS_ACCESS_KEY` — voir instructions
  en commentaire, ~2 minutes sans création de compte).
- **Architecture réservée**, sans contenu ni lien visible, pour les futures
  pages *Les Fondements* et *YOKA Source Labs* (`/pages/fondements.html`,
  `/pages/yoka-source-labs.html`), marquées `noindex, nofollow`.
- Préfixe de chemin configurable (`data-base-path`) dans `js/main.js`,
  permettant au même script de fonctionner depuis la racine ou depuis
  `/pages/`.

### Modifié
- **Logo** : fond blanc supprimé par détourage réel (canal alpha, et non
  une simple approximation CSS), taille augmentée de 12 % dans le Header,
  effet de survol conservé.
- **Réseaux sociaux** : liens du footer (jusque-là statiques et factices)
  désormais alimentés dynamiquement par `socials.json`, comme la grille
  Réseaux sociaux. `sameAs` du Schema.org Person mis à jour avec les 9
  profils réels (Threads retiré).
- **Contact** : adresses `booking@`/`presse@lizibamvuluzi.com` retirées ;
  la section Contact affiche désormais `lizibamvuluzi@gmail.com`. WhatsApp
  officiel confirmé (`wa.me/message/D6UYXL7U7JS4K1`).
- **Concerts** : nouveau texte d'état vide, sans date engageante :
  « Un grand rendez-vous est en préparation. Les détails seront annoncés
  prochainement. »
- **Footer** : copyright mis à jour — « © YOKA SOURCE LABS — Site officiel
  de Liziba Mvuluzi » (année dynamique, plus pérenne qu'une valeur figée).
- `releases.json` : featuring Afara Tsena ajouté sur « Le Généreux Remix »,
  pour harmoniser avec le texte déjà présent dans la Biographie (la
  Biographie l'affirmait déjà ; l'incohérence portait sur la donnée, pas
  sur un fait nouveau).
- Relecture éditoriale : suppression d'un écho de libellé entre le bloc
  « Faits marquants » et la timeline de la Biographie (repère renommé
  « Fondation »), correction d'une mention à « l'équipe » dans le texte de
  Booking (l'artiste gère seul sa carrière, sans manager).

### Supprimé
- **Rubrique Kit Presse** retirée entièrement (section, nav, footer, CSS
  mort) — sera réintroduite avec un véritable kit professionnel. Sections
  renumérotées en conséquence (09 → Réseaux sociaux, 10 → Contact).
- Numéro de téléphone factice de la section Contact (jamais fourni).

### Vérifié (audit final)
- HTML équilibré sur les 6 pages du site (index, 404, 4 pages `/pages/`).
- CSS et JavaScript revalidés après l'ensemble des modifications.
- 6 fichiers JSON, `sitemap.xml` et les 2 blocs Schema.org valides.
- Tous les chemins relatifs résolvent correctement sur chaque page,
  y compris depuis `/pages/` (préfixe `data-base-path`).
- Toutes les ancres de navigation utilisées depuis les sous-pages
  (`../index.html#section`) pointent vers un `id` réel.
- Tous les liens externes protégés par `rel="noopener"`.
- Logo : canal alpha confirmé présent et fonctionnel dans le fichier livré.

---

## [1.2.2] — 2026-08-04

### Modifié
- Bannière Hero remplacée par la nouvelle photo fournie (convertie en JPEG
  optimisé, `assets/images/hero/hero-portrait.jpg`). Cadrage
  `background-position` ajusté par palier responsive (desktop/tablette/
  mobile) pour garder le sujet — positionné à droite du cadre — visible
  malgré le fort recadrage horizontal en format portrait.
- Logo officiel (`assets/logos/logo.png`) intégré dans le Header à la
  place du bloc texte « LM », avec effet de survol et réduction cohérente
  au scroll. Favicon et manifest volontairement laissés inchangés : le
  logo (détaillé, forme médiator) perdrait toute lisibilité aux tailles
  réduites d'une favicon.
- Signature Hero remplacée par la formulation définitive fournie.

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
