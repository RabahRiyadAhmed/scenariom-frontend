# UiImages, figures et cropper

## Responsabilités testées

La page `UiImages` vérifie : image arrondie, avatar circulaire, thumbnail, tailles, `cover`, `contain`, ratios stables, figure avec légende/actions et crop d’image.

Les ratios de référence sont `square`, `4:3`, `16:9` et `21:9`. Une image doit toujours calculer sa taille depuis son conteneur ; sa taille intrinsèque ne doit pas agrandir une card sur Expo.

## État de l’implémentation

Le choix/crop est spécialisé par plateforme :

- Web : zone de crop redimensionnable, déplacement, formats libres ou verrouillés et export PNG ;
- Expo : éditeur natif ouvert par `expo-image-picker`, avec mode libre ou ratio choisi avant l’ouverture.

La page d’exemple contient encore une partie de l’affichage image localement. Avant l’éditeur final, `UiImage`, `UiFigure` et leur contrat commun devront être extraits dans `packages/design-system`. Le cropper restera spécialisé par plateforme derrière une API partagée.

## Valeurs configurables

- source, texte alternatif et légende ;
- ratio, largeur maximale et hauteur ;
- mode `cover` ou `contain` ;
- rayon, cadre thumbnail, fond de transparence et bordure ;
- actions de prévisualisation, sélection, téléchargement et crop ;
- format de sortie, qualité et conservation du canal alpha.

## Personnalisation future

Un composant custom peut ajouter un cadre SVG, une texture, un masque, une forme de découpe ou un overlay. Il ne doit pas modifier silencieusement le fichier original. Le résultat exporté doit préciser son MIME, ses dimensions et, pour les formats animés comme GIF, si l’animation est conservée ou aplatie.

## Tests obligatoires

Tester portrait, paysage, carré, très grande image, PNG transparent, GIF, JPEG, WebP, rotation écran Expo, RTL, erreurs de chargement et images provenant du backend.
