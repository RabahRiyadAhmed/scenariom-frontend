# Fiche outil — bouton custom

Cette fiche décrit les possibilités que l’éditeur devra proposer plus tard. Elle ne décrit pas un bouton particulier.

## Contenu configurable

- texte ou composant `CustomText` ;
- icône, image ou SVG central ;
- contenu avant/après le texte ;
- contenu entièrement personnalisé via slots ;
- libellé traduit et label d’accessibilité.

## Géométrie et asset

- bouton CSS simple avec rayon et bordure ;
- SVG uniforme qui conserve son ratio ;
- SVG étiré pour une texture continue ;
- découpe horizontale avec cap gauche, centre et cap droit ;
- découpe verticale ;
- nine-slice pour coins fixes et bords extensibles ;
- cadre décoré avec ornement central non étiré ;
- texture ou image de fond avec `cover`, `contain` ou répétition.

Chaque SVG doit déclarer sa taille native, son mode de redimensionnement, sa zone de contenu, ses paddings et les zones qui peuvent s’étirer. Un bouton rond décoratif ne doit pas être étiré automatiquement en rectangle.

## Style configurable

Couleur de fond, couleur de texte, couleur d’icône, opacité, bordure, largeur de bordure, rayon, ombre, glow, texture, gradient, padding, gap, alignement et dimensions minimales. Les classes structurelles doivent rester Tailwind/NativeWind ; les valeurs calculées venant de l’éditeur peuvent être inline.

## Actions et états

- click/press ;
- hover Web et press Expo ;
- focus clavier ;
- disabled ;
- loading avec spinner ;
- succès avec animation ;
- erreur/rejet avec animation ;
- toggle actif/inactif ;
- confirmation avant action ;
- navigation ou ouverture d’un autre composant.

Pour chaque état, définir le visuel, l’icône, le texte, la durée et le retour à l’état normal. Prévoir un fallback sans animation et une alternative accessible au hover.

## Animations possibles

Opacity, scale, translation, rotation, glow, changement de texture, remplissage progressif, vibration/feedback press Expo et animation de l’icône. Les animations narratives (écriture, sceau, encre) appartiennent au custom, pas à `UiButton`.

