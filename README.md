# Liziba Mvuluzi — Site officiel (Version finale)

Site vitrine premium — **HTML5 / CSS3 / JavaScript vanilla**, sans framework,
sans WordPress, sans générateur. Code propre, commenté, prêt à publier.

Identité artistique respectée : Guitariste · Auteur · Compositeur · Arrangeur ·
Créateur de **La Mbokalisation** · Signature **« L'Agenceur »**.

---

## 0. Audit qualité — livraison finale

Passage de finalisation effectué avant livraison (design, nettoyage du code,
vérifications techniques). Aucun contenu ni aucune section n'a été modifié à
cette étape — uniquement des retouches de finition.

**Design & interactions**
- Icônes de la galerie (lightbox) uniformisées en SVG, cohérentes avec les
  boutons flottants (même langage graphique, mêmes proportions).
- Micro-interactions harmonisées : survol homogène sur les lignes de la
  Discographie et de l'Agenda, transitions cohérentes sur l'ensemble des
  cartes et boutons.
- Écouteurs de scroll (en-tête, bouton Retour en haut) optimisés via
  `requestAnimationFrame` pour un défilement plus fluide.

**Nettoyage du code**
- Suppression du CSS mort (classe `.contact__socials`, variable `--blanc`
  non utilisées) et d'une déclaration de sélecteur redondante en navigation.
- Suppression d'une variable JavaScript inutilisée dans la lightbox, réemployée
  à bon escient pour fournir un nom accessible dynamique à l'image affichée.

**Vérifications automatisées (voir détail au §11)**
- ✅ HTML : balises équilibrées, aucun identifiant dupliqué, aucune ancre orpheline.
- ✅ CSS : accolades équilibrées, aucune classe ni variable inutilisée restante.
- ✅ JavaScript : syntaxe validée (`node --check`), aucun identifiant orphelin.
- ✅ `manifest.json` : JSON valide, chemins relatifs (compatible GitHub Pages
  en sous-dossier, Netlify, Vercel).
- ✅ `sitemap.xml` : XML valide.
- ✅ Schema.org (`Person`, `MusicGroup`) : JSON-LD valide.
- ✅ Tous les liens externes (`target="_blank"`) sécurisés avec `rel="noopener"`.
- ✅ Contraste des couleurs de texte vérifié (norme WCAG AA, détail au §7).

---

## 1. Structure du projet

```
/
├── index.html                 → page d'accueil, 10 sections (voir §3)
├── 404.html                    → page d'erreur personnalisée
├── manifest.json               → configuration PWA (icône, couleurs, nom)
├── robots.txt                  → indexation moteurs de recherche
├── sitemap.xml                 → plan du site pour Google Search Console
├── README.md                   → ce fichier
├── CHANGELOG.md                → historique des versions du projet
├── /pages                      → pages secondaires (voir §13)
│   ├── mentions-legales.html
│   ├── politique-confidentialite.html
│   ├── fondements.html          → manifeste « Les Fondements » (publiée)
│   └── yoka-source-labs.html    → manifeste « YOKA Source Labs » (publiée)
├── /css
│   └── style.css                → design system complet, commenté par section
├── /js
│   └── main.js                  → interactions (nav, reveal, lightbox, formulaires,
│                                    chargement de la couche de données — voir §12)
├── /data                        → couche de données JSON (voir §12)
│   ├── artist.json               → identité stable de l'artiste
│   ├── socials.json               → profils généraux (réseaux + plateformes)
│   ├── releases.json              → sorties musicales
│   ├── videos.json                → clips et vidéos
│   ├── concerts.json              → agenda
│   └── site.json                  → configuration technique runtime
└── /assets
    ├── /images
    │   ├── /hero                  → portrait(s) plein écran
    │   ├── /gallery                → photos de la Galerie
    │   ├── /covers                 → pochettes de sorties
    │   ├── /press                  → visuels haute définition (kit presse)
    │   └── /social                 → image de partage Open Graph / Twitter Card
    ├── /logos                     → logo(s) officiels, déclinaisons
    ├── /icons                     → favicon.svg, favicon-32.png, icon-192.png,
    │                                 icon-512.png, apple-touch-icon.png
    └── /downloads                 → biographie PDF, kit presse ZIP (public uniquement)
```

Le site est actuellement une **page unique** (`index.html`) organisée en
sections ancrées (`#biographie`, `#musique`, etc.), ce qui est le standard
pour un site d'artiste : navigation rapide, un seul temps de chargement,
excellent pour le référencement d'une page d'accueil forte.

---


## 2. Déploiement

### Option A — GitHub Pages (gratuit)

1. Créer un dépôt GitHub (ex. `liziba-mvuluzi-site`).
2. Placer **tout le contenu de ce dossier** à la racine du dépôt (pas dans
   un sous-dossier `site/`).
3. `Settings → Pages → Source → Deploy from a branch` → branche `main`,
   dossier `/root`.
4. Le site est publié sur `https://<utilisateur>.github.io/liziba-mvuluzi-site/`.
5. Domaine personnalisé : ajouter un fichier `CNAME` à la racine contenant
   le domaine (ex. `lizibamvuluzi.com`), puis configurer chez le registrar :
   - Enregistrement **A** vers les IP de GitHub Pages, ou
   - Enregistrement **CNAME** vers `<utilisateur>.github.io`.

### Option B — Netlify (gratuit)

1. Glisser-déposer le dossier du projet sur [app.netlify.com/drop](https://app.netlify.com/drop),
   **ou** connecter le dépôt GitHub pour un déploiement continu.
2. Aucune configuration de build n'est nécessaire (site statique) : laisser
   `Build command` vide et `Publish directory` sur `/` (racine).
3. Domaine personnalisé : `Site settings → Domain management`.
4. Netlify permet aussi de recevoir directement les formulaires (voir §5).

### Option C — Vercel (gratuit)

1. `vercel.com` → `New Project` → importer le dépôt GitHub.
2. Framework preset : **Other** (site statique) — aucune commande de build.
3. Output directory : `/` (racine).
4. Domaine personnalisé : `Project → Settings → Domains`.

Le projet fonctionne à l'identique sur les trois plateformes : il ne contient
que du HTML/CSS/JS statique.

---

## 3. Les 12 sections du site

| # | Section | Ancre | Contenu |
|---|---|---|---|
| — | Hero Premium | `#accueil` | Portrait, nom, titre « L'Agenceur », accroche, CTA Écouter / Booking |
| 01 | Biographie | `#biographie` | Texte complet, faits marquants, repères de parcours (timeline) |
| 02 | Musique | `#musique` | Dernière sortie mise en avant + grille des 8 plateformes |
| 03 | Vidéos | `#videos` | 3 vidéos YouTube intégrées (`youtube-nocookie.com`) + lien chaîne |
| 04 | Galerie | `#galerie` | Grille photo avec lightbox (clavier + tactile) |
| 05 | Discographie | `#discographie` | Tableau des sorties (année / titre / type / lien d'écoute) |
| 06 | Concerts / Agenda | `#concerts` | Liste de dates (état vide géré + modèle commenté prêt à dupliquer) |
| 07 | Booking | `#booking` | Formulaire professionnel complet + email booking direct |
| 08 | Presse | `#presse` | Kit presse (bio + visuels à télécharger), citation, contact presse |
| 09 | Réseaux sociaux | `#reseaux` | Grille de cartes vers les profils officiels |
| 10 | Contact | `#contact` | Formulaire de contact général + coordonnées directes |
| — | Footer | — | Navigation, réseaux, mentions légales |

Éléments transverses : bouton **WhatsApp flottant**, bouton **Retour en
haut**, **lightbox** galerie, **menu mobile** plein écran, **surbrillance du
lien de navigation actif** au scroll.

---

## 4. ⚠️ À personnaliser avant mise en ligne (checklist)

Tous les emplacements ci-dessous sont marqués `TODO` directement dans le
code source, pour être repérés facilement par recherche de texte (`Ctrl+F`
→ `TODO`).

- [ ] **Nom de domaine définitif** — remplacer `https://www.lizibamvuluzi.com/`
      dans `index.html` (canonical, Open Graph, Schema.org), `sitemap.xml`
      et `robots.txt`.
- [ ] **Photos réelles** — portrait Hero, 6 photos de galerie, image de
      partage Open Graph (voir `/assets/images/README.md`).
- [ ] **Liens des plateformes musicales** (Spotify, Apple Music, YouTube
      Music, Deezer, Amazon Music, Boomplay, Audiomack, Bandcamp) — section
      Musique.
- [ ] **Identifiants YouTube réels** (`VIDEO_ID_1`, `VIDEO_ID_2`, `VIDEO_ID_3`)
      — section Vidéos.
- [ ] **Discographie complète** — ajouter les sorties précédentes/à venir
      dans le tableau (`#discographie`), même structure de ligne.
- [ ] **Dates de concerts** — dès qu'une date est confirmée, dupliquer le
      modèle `.agenda__item` commenté dans `index.html` (section `#concerts`).
- [ ] **Coordonnées** — email général, email booking, email presse,
      téléphone (actuellement des valeurs d'exemple).
- [ ] **Numéro WhatsApp** — dans le bouton flottant, remplacer
      `33000000000` par le numéro réel (indicatif inclus, sans `+` ni espace).
- [ ] **Liens réseaux sociaux** — Instagram, TikTok, Facebook, YouTube,
      Threads, X — section Réseaux sociaux, section Contact et pied de page.
- [ ] **Documents presse** — biographie PDF et pack visuels ZIP à héberger
      puis relier dans la section Presse.
- [ ] **Connexion des formulaires** — voir §5 ci-dessous (Booking et Contact
      n'envoient rien par défaut, ils sont prêts à être branchés).

---

## 5. Formulaires (Booking & Contact) — quasi prêts, une clé à récupérer

Les deux formulaires sont **déjà branchés** sur [Web3Forms](https://web3forms.com)
(service gratuit, sans backend, ~250 soumissions/mois) et redirigent vers
`lizibamvuluzi@gmail.com`. Il ne reste **qu'une seule étape, environ 2
minutes, sans création de compte** :

1. Aller sur [web3forms.com](https://web3forms.com).
2. Saisir `lizibamvuluzi@gmail.com` pour recevoir une clé d'accès gratuite
   par e-mail.
3. Ouvrir `js/main.js`, repérer la constante `WEB3FORMS_ACCESS_KEY` (section
   « 5. Formulaires »), et remplacer `"REMPLACER_PAR_LA_CLE_WEB3FORMS"` par
   la clé reçue.

Tant que cette clé n'est pas renseignée, les formulaires affichent un
message clair invitant à contacter directement par e-mail — aucun échec
silencieux.

**Alternatives** si vous préférez un autre service : Formspree (ajouter
`action="https://formspree.io/f/VOTRE_ID"` sur les balises `<form>`) ou,
si le site est un jour hébergé sur Netlify, l'attribut `data-netlify="true"`
(Netlify Forms, aucun service tiers). Dans ces deux cas, remplacer l'appel
à `submitForm()` dans `initBookingForm()`/`initContactForm()` en conséquence.

---

## 6. SEO — prêt pour Google Search Console

**Sur les 6 pages du site** (accueil, Fondements, YOKA Source Labs,
Mentions légales, Politique de confidentialité, 404) :

- Balises meta complètes (`description` unique et non dupliquée par page,
  `robots`, `canonical` propre à chaque URL).
- Open Graph et Twitter Cards (partage réseaux sociaux avec aperçu),
  utilisant l'image `assets/images/social/og-cover.jpg`.
- Données structurées **Schema.org** : `Person` et `MusicGroup` sur
  l'accueil (avec la dernière sortie en `MusicRecording`) ; `WebPage` sur
  les 4 pages secondaires.
- `robots.txt` et `sitemap.xml` à jour, cohérents entre eux et avec les
  URLs réellement publiées (aucune page brouillon, aucun lien mort).
- Un seul `<h1>` par page ; hiérarchie `h2`/`h3` sémantique.
- URLs d'ancre lisibles (`#biographie`, `#discographie`…) exploitables en
  partage direct vers une section précise.
- Tous les liens internes vérifiés (aucun lien cassé, aucune ancre
  orpheline) — voir CHANGELOG pour le détail de l'audit.

**À faire après connexion du domaine définitif (`lizibamvuluzi.fr`) :**
1. Remplacer `https://lizibamvuluzi.github.io/liziba-mvuluzi-site/` par
   l'URL du domaine définitif dans les 6 pages (`canonical`, `og:url`,
   Schema.org), `robots.txt`, `sitemap.xml` et `data/site.json`
   (`baseUrl`) — même opération que le précédent passage GitHub Pages,
   en sens inverse.
2. Déclarer la propriété dans **Google Search Console**, soumettre
   `sitemap.xml`, vérifier le rendu des Rich Results (outil de test
   Google) pour `Person`/`MusicGroup`/`WebPage`.
3. Activer **Google Analytics 4** — voir ci-dessous.

### Google Analytics 4 — architecture prête, aucun identifiant fictif

La mesure d'audience est pilotée par un seul champ, dans
`data/site.json` :

```json
"analytics": { "provider": "ga4", "id": null }
```

Dès que le Measurement ID est disponible (format `G-XXXXXXXXXX`), le
renseigner dans ce champ `id` — aucune autre modification n'est
nécessaire. `js/main.js` (fonction `initAnalytics`) charge alors
automatiquement le script officiel Google (`gtag.js`) sur chaque page, de
façon asynchrone. Tant que `id` reste `null`, **aucun script, aucun
cookie et aucune requête réseau** liés à Google Analytics ne sont chargés.

Ce choix d'architecture (un champ JSON plutôt qu'un script dupliqué dans
les 6 fichiers HTML) évite d'avoir à modifier chaque page individuellement
le jour de l'activation, et évite tout aussi bien d'avoir à les modifier
de nouveau si l'identifiant change.

**Cookies et RGPD :** l'activation de Google Analytics constitue un dépôt
de cookies de mesure d'audience. Un bandeau de consentement conforme
RGPD devra être mis en place avant l'activation (voir
`pages/politique-confidentialite.html`, qui l'anticipe déjà).

---

## 7. Accessibilité

- Lien d'évitement (« Aller au contenu principal ») pour la navigation clavier.
- Focus clavier visible (`:focus-visible`) sur tous les éléments interactifs.
- Lightbox pilotable au clavier (`Échap`, flèches gauche/droite) et gestion
  du focus à l'ouverture/fermeture.
- `aria-label`, `aria-expanded`, `aria-modal`, `role` posés sur le menu
  mobile, les boutons flottants et la lightbox.
- Respect de `prefers-reduced-motion` : toutes les animations sont
  désactivées automatiquement si l'utilisateur l'a demandé dans son système.
- Contrastes texte/fond conformes au niveau AA sur les couleurs principales
  (blanc cassé / or sur noir profond).

---

## 8. Performances

- Aucune dépendance JavaScript externe (vanilla JS pur, fichier unique
  `main.js`, chargé en `defer`).
- Police via Google Fonts avec `preconnect` + `display=swap` (pas de FOIT).
- Vidéos YouTube en `loading="lazy"` et domaine `youtube-nocookie.com`
  (moins de scripts tiers chargés tant que la vidéo n'est pas visible/jouée).
- Images de galerie prévues avec `loading="lazy"` dès leur intégration
  (voir `/assets/images/README.md`).
- CSS structuré en un seul fichier organisé par sections numérotées (pas de
  multiples requêtes HTTP superflues), custom properties pour cohérence et
  poids réduit.
- Icônes PWA et favicon fournis en plusieurs tailles pour éviter tout
  redimensionnement côté client.

---

## 9. Personnalisation du design

Toutes les valeurs de marque sont centralisées en haut de `css/style.css`,
dans `:root` :

```css
--noir: #0a0a08;      /* fond principal */
--or: #d4af37;        /* or premium — couleur de marque */
--or-clair: #ecd27f;  /* survols, accents clairs */
--blanc-casse: #f6f1e4;
--gris: #8a8778;       /* texte secondaire */
```

Modifier ces variables suffit à ajuster l'identité visuelle sur l'ensemble
du site (aucune couleur n'est codée en dur ailleurs dans les composants).

Typographies : **Fraunces** (titres, empattement élégant), **Work Sans**
(texte courant), **Space Mono** (labels, dates, éléments techniques) —
chargées via Google Fonts dans `index.html`.

---

## 10. Compatibilité

Testé pour un rendu cohérent sur mobile, tablette et desktop (breakpoints à
1080px, 760px, 700px, 680px, 640px, 560px). Compatible tous navigateurs
modernes (Chrome, Safari, Firefox, Edge). Aucune dépendance à Internet
Explorer.

---

## 11. Détail de l'audit technique final

Vérifications exécutées avant livraison, avec résultat :

| Contrôle | Résultat |
|---|---|
| `manifest.json` — JSON valide | ✅ |
| `sitemap.xml` — XML valide | ✅ |
| Schema.org `Person` + `MusicGroup` — JSON-LD valide | ✅ |
| Équilibre des balises HTML (`section`, `div`, `form`, `a`, `button`…) | ✅ |
| Identifiants `id` uniques (aucun doublon) | ✅ |
| Toutes les ancres de navigation (`#biographie`, `#musique`…) pointent vers une section existante | ✅ |
| Tous les chemins locaux (`css/`, `js/`, `assets/`, `manifest.json`) résolus | ✅ |
| Tous les liens `target="_blank"` protégés par `rel="noopener"` | ✅ |
| Tous les appels `getElementById` du JS correspondent à un `id` réel du HTML | ✅ |
| Accolades CSS équilibrées / aucune classe CSS orpheline | ✅ |
| Syntaxe JavaScript validée (`node --check`) | ✅ |
| Contraste texte/fond (WCAG AA) sur les couleurs de marque | ✅ — voir détail ci-dessous |

**Contrastes de couleurs vérifiés (ratio WCAG) :**

| Combinaison | Ratio | Norme AA (texte courant ≥ 4.5:1) |
|---|---|---|
| Gris (`--gris`) sur noir profond | 5.49:1 | ✅ Conforme |
| Blanc cassé sur noir profond | 17.57:1 | ✅ Conforme |
| Or premium sur noir profond | 9.42:1 | ✅ Conforme |
| Or mat sur noir profond | 5.22:1 | ✅ Conforme |
| Noir sur or (texte des boutons dorés) | 9.42:1 | ✅ Conforme |

**Poids des fichiers livrés (hors polices Google Fonts et photos à intégrer) :**

| Fichier | Poids |
|---|---|
| `index.html` | ~36 Ko |
| `css/style.css` | ~32 Ko |
| `js/main.js` | ~12 Ko |
| `manifest.json` | ~4 Ko |
| Icônes (`/assets/icons`) | ~28 Ko |

Base extrêmement légère : une fois les photos réelles compressées (voir
`/assets/images/README.md`), le site reste dans une fourchette de poids très
favorable aux Core Web Vitals (LCP, CLS) et donc au score Lighthouse
Performance.

**Recommandation Lighthouse (à exécuter après mise en ligne avec les vraies
images) :** ouvrir le site publié dans Chrome → onglet *Lighthouse* des
DevTools → lancer un audit *Performance / Accessibilité / Bonnes pratiques /
SEO* en mode Mobile. La structure actuelle (HTML sémantique, CSS/JS sans
dépendance externe hors polices, lazy-loading vidéo, `prefers-reduced-motion`
respecté, contrastes conformes) est conçue pour viser un score élevé sur les
quatre catégories dès l'intégration des visuels définitifs.

---

## 12. Couche de données (`data/`) — rendu dynamique actif (V1.2)

Le site repose sur une architecture de données JSON, pensée pour accueillir
plusieurs années d'évolutions sans jamais avoir à restructurer le code.
Historique complet des versions dans `CHANGELOG.md`.

**Principe : une seule source de vérité par information.** Chaque fait (une
sortie, un lien de plateforme, une date de concert) ne vit qu'à un seul
endroit. Plus aucune information à mettre à jour à deux ou trois endroits
différents du HTML.

| Fichier | Rôle | Sections alimentées |
|---|---|---|
| `data/artist.json` | Identité stable : nom, titre artistique, accroche, genres, pays, contacts, logo. | Bouton WhatsApp flottant ; liens email/téléphone (Booking, Presse, Contact) — mis à jour uniquement si le champ correspondant est renseigné. |
| `data/socials.json` | Profils généraux : réseaux sociaux (`group: "social"`) et pages plateformes de streaming (`group: "streaming"`). | Grille de plateformes (Musique), grille Réseaux sociaux. |
| `data/releases.json` | Sorties musicales — source unique. Lien d'écoute propre à chaque titre (≠ `socials.json`, qui reste général). | Nouveautés, titre à la une (Musique), Discographie. |
| `data/videos.json` | Clips et vidéos, avec référence optionnelle vers la sortie associée (`relatedReleaseId`). | Section Vidéos ; lien « Voir le clip » dans les cartes Nouveautés. |
| `data/concerts.json` | Agenda des dates. Tableau vide → état « Aucune date annoncée » conservé automatiquement. | Section Concerts / Agenda. |
| `data/site.json` | Configuration technique runtime (couleur de thème, analytics, référence de domaine). Ne remplace jamais les balises `<meta>` statiques d'`index.html`. | — (référence documentée uniquement). |

**Le rendu dynamique est actif.** `js/main.js` charge les 6 fichiers au
démarrage (`initSiteData()`) puis peuple automatiquement : Nouveautés,
titre à la une, grille de plateformes, Discographie, Vidéos, Réseaux
sociaux, Agenda, et les liens de contact/WhatsApp quand ils sont renseignés.

**Principe de non-régression : jamais destructif.** Si une donnée est
absente ou vide (ex. `concerts.json` vide, un email non renseigné), le
contenu statique déjà présent dans `index.html` reste affiché tel quel —
aucune section ne peut se retrouver vidée par une donnée manquante.

**Icônes de plateformes.** Les rendus de `socials.json` (grille Musique et
Réseaux sociaux) utilisent des icônes SVG locales stockées dans
`assets/icons/platforms/` (`facebook.svg`, `instagram.svg`, `tiktok.svg`,
`youtube.svg`, `spotify.svg`, `apple-music.svg`, `deezer.svg`, `tidal.svg`,
`amazon-music.svg`, `whatsapp.svg`) — dessinées au style ligne fine du
reste du site (`currentColor`), aucune dépendance CDN. Chargées une seule
fois puis mises en cache par `js/main.js`.

**Comment ajouter ou modifier du contenu, sans jamais toucher au code :**
1. Modifier le fichier JSON concerné (ajouter une sortie, un concert, un lien).
2. Déposer les médias associés dans le sous-dossier `assets/` prévu — voir
   le tableau complet dans `assets/images/README.md`.
3. Committer et pousser via GitHub Desktop.

Le nouveau contenu s'affiche automatiquement au prochain chargement de la
page, sans qu'aucun fichier `.html`, `.css` ou `.js` n'ait besoin d'être
modifié.

---

## 13. V1.3 — Release Candidate (pages légales, multi-pages)

Le site est passé d'une page unique à une petite architecture multi-pages,
**toujours sans framework ni build** :

```
/
├── index.html
├── 404.html                          → page d'erreur personnalisée (racine imposée par GitHub Pages)
└── /pages
    ├── mentions-legales.html
    ├── politique-confidentialite.html
    ├── fondements.html                → manifeste, publiée (V1.4)
    └── yoka-source-labs.html          → manifeste, publiée (V1.4)
```

**Header et footer sont dupliqués** dans chaque fichier HTML (choix
délibéré : simplicité et pérennité plutôt qu'un système de build). Toute
future modification du header/footer (nouveau lien de nav, changement de
logo, etc.) doit être répercutée manuellement dans les 6 fichiers HTML.

**`js/main.js` fonctionne depuis n'importe quelle profondeur** grâce à
l'attribut `data-base-path` sur la balise `<html>` : vide (`""`) à la
racine, `"../"` depuis `/pages/`. À respecter pour toute nouvelle page.

**Les Fondements et YOKA Source Labs** sont les pages manifeste de
l'Édition Fondatrice (V1.4) — textes officiels intégrés fidèlement,
publiées et indexables (`index, follow`), reliées depuis la navigation
(header et footer, sur les 6 pages). Composants CSS réutilisables :
`.pillar` (bloc « pilier » : nom, tagline, vers poétiques), `.doctrine`
(flux vertical en 7 étapes), `.manifesto-quote` (citation de marque) —
voir `css/style.css`, section 16.

**Mentions légales et politique de confidentialité** sont réellement
publiées et indexables. Elles reposent sur les informations suivantes,
à vérifier/compléter si la situation change : éditeur individuel (NDINGA
Rhudy Joseph), hébergeur GitHub Pages, aucun cookie de suivi actif à ce
jour. Ce sont des textes standards couvrant les obligations essentielles —
une relecture par un professionnel du droit est recommandée avant toute
activité commerciale significative (vente de billets, produits dérivés,
etc.).

