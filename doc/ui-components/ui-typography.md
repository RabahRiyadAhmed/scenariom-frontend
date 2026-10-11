# Typography

## Rôle

La typographie définit les niveaux de texte utilisables par toutes les primitives : displays, titres `h1` à `h6`, corps, petit texte, texte contextuel, listes, citations et listes de définitions.

Une taille visuelle n’impose pas seule la sémantique. Sur le Web, la hiérarchie HTML reste correcte ; sur Expo, les rôles et labels accessibles reproduisent cette hiérarchie lorsque nécessaire.

## Paramètres de thème

- famille par script et fallback ;
- taille, graisse, hauteur de ligne et espacement des lettres ;
- couleur principale, atténuée et tons contextuels ;
- alignement, direction et transformation de casse ;
- décoration : souligné, barré, emphase et surlignage ;
- indentation et marqueurs des listes ;
- bordure, fond et alignement des citations.

## Personnalisation future

Un composant texte custom peut ajouter texture, contour léger, gradient, lettrine, titre SVG ou animation. Il doit conserver un texte réel accessible et sélectionnable quand la plateforme le permet. Une image contenant uniquement du texte n’est pas un remplacement acceptable.

Le preset doit associer les polices aux scripts supportés. Si une fonte ne contient pas les glyphes arabes, chinois, japonais, coréens, cyrilliques ou autres, le moteur utilise le fallback déclaré sans casser les dimensions du composant.

Les effets d’ombre et de contour doivent être limités par des valeurs configurables et désactivables. Ils ne doivent pas produire le double texte flou déjà observé dans les pages d’exemple.

## Tests obligatoires

Tester LTR/RTL, scripts multiples, fallback absent, grande taille système, retour à la ligne, titres très longs, listes imbriquées, contraste sur image et rendu cohérent Web/Expo.
