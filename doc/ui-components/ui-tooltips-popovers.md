# UiTooltip et UiPopover

## Différence fonctionnelle

`UiTooltip` fournit une aide courte. Il s’ouvre au survol ou au focus sur le Web et au press/long press sur mobile. Il n’héberge pas d’action complexe.

`UiPopover` affiche une information secondaire ou de petites actions. Il possède un état contrôlé `open`, un callback `onOpenChange`, un déclencheur, un contenu, un libellé de fermeture et un placement.

Les deux primitives acceptent `top`, `right`, `bottom` et `left`. L’overlay est rendu hors du conteneur de la page : portail Web ou `Modal` Expo. Il est positionné depuis les coordonnées réelles du déclencheur et limité aux bords de l’écran.

## Règles structurelles

- ne jamais imbriquer un bouton dans un bouton ;
- le déclencheur garde son rôle et son action ;
- un parent avec `overflow: hidden` ne doit pas couper l’overlay ;
- le contraste du texte est calculé depuis le fond ;
- le backdrop d’un popover ferme le panneau sans bloquer son contenu ;
- le placement demandé peut être ajusté pour rester visible dans le viewport.

## Personnalisation future

Le custom peut changer la bulle, la flèche, la bordure, la texture, l’ombre, la largeur, le padding et l’animation. Les placements, le calcul d’écran, le focus, la fermeture et l’accessibilité restent gérés par la primitive.

Une bulle de dialogue manga, un panneau holographique ou un parchemin miniature doit fournir une zone de contenu extensible et éventuellement une flèche orientable. La géométrie décorative ne doit jamais remplacer le moteur de positionnement.

Un tooltip ne doit pas devenir une modal. Un popover contenant un formulaire important ou une longue navigation doit devenir une sheet, une modal ou un écran.

## Tests obligatoires

Tester chaque placement près des quatre bords, scroll, rotation Expo, RTL, thème clair/sombre, polices larges, focus clavier, fermeture extérieure et card avec débordement masqué.
