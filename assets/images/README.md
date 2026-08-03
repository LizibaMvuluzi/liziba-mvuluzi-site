# Images à intégrer

Déposer ici les fichiers réels, puis relier chaque emplacement dans le code
comme indiqué ci-dessous.

## Fichiers attendus

| Fichier | Usage | Format conseillé |
|---|---|---|
| `hero-portrait.jpg` | Portrait plein cadre de la section Hero | Portrait, min. 1800×2400px, poids < 400 Ko (compressé) |
| `og-cover.jpg` | Image de partage réseaux sociaux (Open Graph / Twitter Card) | 1200×630px |
| `gallery-01.jpg` … `gallery-06.jpg` | Photos de la section Galerie | Haute résolution, ratio libre |

## Où brancher chaque image

**Portrait du Hero** — dans `css/style.css`, règle `.hero__portrait-frame` :
ajouter `background-image: url("../assets/images/hero-portrait.jpg");`
ou insérer directement une balise `<img>` dans le conteneur
`.hero__portrait-frame` de `index.html`.

**Galerie** — chaque vignette est un `<button class="gallery__item">` dans
`index.html` (section `#galerie`). Ajouter une balise `<img>` avec un `alt`
descriptif à l'intérieur de chaque bouton, avec `loading="lazy"`. Le script
`js/main.js` (fonction `initLightbox`) contient un commentaire `TODO`
indiquant où relier l'image agrandie dans la lightbox.

**Image de partage (Open Graph)** — une fois `og-cover.jpg` déposé, aucune
autre modification n'est nécessaire : les balises `<meta property="og:image">`
et `<meta name="twitter:image">` de `index.html` pointent déjà vers ce fichier.

## Poids et performance

Compresser toutes les images avant intégration (TinyPNG, Squoosh, ou
équivalent) et privilégier le format `.webp` avec fallback `.jpg` si possible,
pour préserver les temps de chargement du site.
