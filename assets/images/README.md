# Médias — emplacements et noms de fichiers définitifs

Cette arborescence est verrouillée : le code (HTML, CSS, JSON) référence déjà
chacun de ces chemins exacts. **Aucune modification de structure n'est
nécessaire** — il suffit de déposer chaque fichier au bon endroit, avec
exactement le nom indiqué, puis de committer/pousser via GitHub Desktop.

Tant qu'un fichier n'est pas déposé, la section correspondante affiche un
repli visuel neutre (dégradé de la charte noir/or) — rien n'est cassé dans
l'intervalle.

## Tableau récapitulatif

| Élément | Dossier | Nom de fichier exact | Format conseillé |
|---|---|---|---|
| Logo officiel | `assets/logos/` | `logo.svg` | SVG de préférence (sinon `.png` fond transparent) |
| Portrait Hero | `assets/images/hero/` | `hero-portrait.jpg` | Portrait, min. 1800×2400px, poids < 400 Ko |
| Photo galerie 1 | `assets/images/gallery/` | `gallery-01.jpg` | Ratio libre (recadrée automatiquement en 4:5) |
| Photo galerie 2 | `assets/images/gallery/` | `gallery-02.jpg` | idem |
| Photo galerie 3 | `assets/images/gallery/` | `gallery-03.jpg` | idem |
| Photo galerie 4 | `assets/images/gallery/` | `gallery-04.jpg` | idem |
| Pochette — Le Généreux Remix | `assets/images/covers/` | `le-genereux-remix.jpg` | Carré (1:1), min. 1000×1000px |
| Pochette — Je l'aime de tout mon cœur | `assets/images/covers/` | `je-laime-de-tout-mon-coeur.jpg` | idem |
| Pochette — Envie des choses | `assets/images/covers/` | `envie-des-choses.jpg` | idem |
| Image de partage (Open Graph) | `assets/images/social/` | `og-cover.jpg` | 1200×630px exactement |
| Visuels presse (kit) | `assets/images/press/` | noms libres | Haute résolution |
| Vidéos courtes (réserve) | `assets/videos/` | noms libres | Voir note ci-dessous |

## Où chaque fichier est déjà branché

- **Logo** → `data/artist.json` (`brand.logo`). Pas encore affiché sur le
  site à ce stade (aucun emplacement de logo dans le design actuel) ; prêt
  pour un futur usage (ex. filigrane, en-tête).
- **Portrait Hero** → `css/style.css`, calque de fond de `.hero__portrait-frame`.
- **Photos galerie** → balises `<img>` déjà présentes dans `index.html`
  (section `#galerie`), avec lightbox fonctionnelle.
- **Pochettes** → `data/releases.json` (`cover` de chaque sortie). Utilisées
  automatiquement par le rendu dynamique : titre à la une (Musique) et
  cartes Nouveautés. Une fois déposées, elles apparaissent sans toucher au
  code.
- **Image de partage** → balises `og:image` / `twitter:image` d'`index.html`
  et `data/site.json` (`socialPreviewImage`).

## Note sur `assets/videos/`

Ce dossier est **réservé**, pas connecté à une section du site : la section
Vidéos reste alimentée par YouTube (`data/videos.json`), pour ne pas
héberger de fichiers vidéo lourds sur GitHub Pages (limite de taille du
dépôt, absence de lecture adaptative). Il peut servir à archiver des
extraits courts (teasers, réseaux sociaux) sans qu'ils soient utilisés
directement par le site — à clarifier ensemble si un usage précis est
souhaité (ex. arrière-plan vidéo du Hero).

## Ajuster les légendes une fois les photos connues

Les légendes de la galerie (attribut `data-caption`, visible dans la
lightbox) et les textes alternatifs (`alt`) sont pour l'instant des
suppositions raisonnables (« Scène », « Studio », « Vibration YOKA », «
Portrait officiel »). Une fois le sujet réel de chaque photo connu, ces deux
attributs peuvent être ajustés directement dans `index.html` — une simple
modification de texte, pas une modification de structure.

## Poids et performance

Compresser toutes les images avant dépôt (TinyPNG, Squoosh, ou équivalent).
Le format `.jpg` convient très bien pour les photos ; réserver le `.svg` au
logo (vectoriel, poids minimal).
