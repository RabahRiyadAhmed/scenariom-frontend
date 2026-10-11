# Carousel

## Variantes validées dans la page d’exemple

- `Slides only` : défilement automatique sans contrôles ni indicateurs ;
- `With controls` : navigation manuelle précédent/suivant ;
- `With indicators` : position courante et accès direct à une slide ;
- `With captions` : titre et description superposés avec fond lisible ;
- `Crossfade` : changement automatique avec transition d’opacité ;
- `Individual interval` : chaque slide peut rester visible pendant une durée différente.

Les contrôles utilisent les icônes partagées du design-system. Sur mobile, la zone pressable des indicateurs doit rester plus grande que le point visible.

## Contrat fonctionnel

Une slide possède une clé stable, un contenu, un label accessible et éventuellement une durée, une image et une légende. Le carousel contrôle l’index actif, la navigation circulaire, l’autoplay, la pause et la transition.

Le type `SpecializedCarouselProps` partagé couvre actuellement les éléments et les labels précédent/suivant. Les options avancées de la page d’exemple devront être ajoutées à ce contrat avant utilisation métier ; elles ne doivent pas rester uniquement dans la preview.

## Personnalisation future

Un custom pourra changer les contrôles, indicateurs, cadres, textures, transition et placement des légendes. Les actions obligatoires restent : précédent, suivant, aller à une slide, pause/reprise et annonce accessible de la position.

Les animations doivent être désactivables. Un carousel custom ne doit pas masquer un contrôle essentiel uniquement parce qu’un asset thématique est absent.

## Tests obligatoires

Tester swipe/press, clavier Web, RTL, rotation Expo, images de ratios différents, une seule slide, liste vide, autoplay, intervalles individuels et réduction des animations.
