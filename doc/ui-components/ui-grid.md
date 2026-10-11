# Grid

## Rôle

La grille organise les composants ; elle ne transporte aucune donnée métier. La référence utilise douze colonnes et des breakpoints proches de Tailwind, puis montre des layouts contenu/panneau et des groupes de cartes.

Sur le Web, les colonnes utilisent CSS Grid. Sur Expo, le même contrat est traduit avec des lignes flexibles et des proportions. Le résultat doit conserver la hiérarchie, pas nécessairement reproduire chaque mécanisme CSS interne.

## Paramètres configurables

- nombre de colonnes ;
- span, début et ordre de chaque zone ;
- gap horizontal et vertical ;
- largeur maximale et padding du conteneur ;
- breakpoints et disposition associée ;
- alignement et étirement ;
- zones nommées : header, navigation, contenu, panneau, footer et actions ;
- comportement mobile : empilement, masquage autorisé ou changement d’ordre.

## Personnalisation future

Un layout custom est une définition de zones et de contraintes, pas une image décorative. Les textures et cadres appartiennent aux composants placés dans la grille ou à un background séparé.

L’éditeur pourra proposer des recettes comme page avec sidebar, dashboard quatre métriques, lecteur avec panneau de notes ou fiche personnage. Chaque slot doit déclarer les composants acceptés, son span par breakpoint, sa taille minimale et son ordre mobile.

Un preset ne doit pas utiliser des coordonnées absolues comme unique disposition. Les positions absolues restent réservées aux décorations ou overlays clairement identifiés.

## Tests obligatoires

Tester tous les breakpoints Web, portrait/paysage Expo, contenus vides, textes longs, RTL, cartes de hauteurs différentes, réorganisation mobile et absence de débordement horizontal.
