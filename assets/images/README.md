# Images — arborescence par usage

Architecture définitive validée (fondations V1.2). Chaque sous-dossier
correspond à un usage précis ; déposer les fichiers réels directement dedans.

```
assets/images/
├── hero/      → portrait(s) plein écran de la section Hero
├── gallery/   → photos de la section Galerie
├── covers/    → pochettes de sorties (référencées depuis data/releases.json)
├── press/     → visuels haute définition destinés au kit presse
└── social/    → image de partage Open Graph / Twitter Card (aperçu de lien)
```

Un fichier `.gitkeep` est présent dans chaque dossier vide pour que Git le
suive avant l'ajout du premier média — il peut être supprimé sans risque dès
qu'un vrai fichier est déposé au même endroit.

## Fichiers attendus

| Dossier | Fichier | Format conseillé |
|---|---|---|
| `hero/` | `hero-portrait.jpg` (nom libre) | Portrait, min. 1800×2400px, poids < 400 Ko compressé |
| `social/` | `og-cover.jpg` (nom libre) | 1200×630px |
| `gallery/` | `gallery-01.jpg` … `gallery-06.jpg` (ou noms libres) | Haute résolution, ratio libre |
| `covers/` | une image par sortie, nommée selon l'`id` de la sortie dans `data/releases.json` | Carré conseillé (1:1) |
| `press/` | visuels destinés à la section Presse | Haute résolution |

## Où ces images sont branchées

Tant que la couche de données (`data/*.json`) n'est pas encore consommée
pour l'affichage (voir `CHANGELOG.md`, section « Non publié »), les chemins
d'image restent à relier manuellement dans le code, comme documenté dans le
README principal :

- **Portrait du Hero** → `css/style.css`, règle `.hero__portrait-frame`.
- **Galerie** → balises `<img>` à ajouter dans chaque `<button class="gallery__item">`
  d'`index.html`, avec un `alt` descriptif et `loading="lazy"`.
- **Image de partage (Open Graph)** → une fois déposée, mettre à jour les
  balises `<meta property="og:image">` et `<meta name="twitter:image">`
  d'`index.html` avec le nouveau chemin `assets/images/social/...`.

Une fois les fonctions de rendu basées sur `data/releases.json` mises en
place (V1.2), les pochettes de `covers/` et l'image de `social/` (via
`data/site.json` → `socialPreviewImage`) seront reliées automatiquement.

## Poids et performance

Compresser toutes les images avant intégration (TinyPNG, Squoosh, ou
équivalent) et privilégier le format `.webp` avec fallback `.jpg` si
possible, pour préserver les temps de chargement du site.
