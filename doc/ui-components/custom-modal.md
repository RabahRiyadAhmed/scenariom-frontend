# Fiche outil — modal custom / parchemin

## Zones à définir

- overlay/backdrop ;
- cadre ou SVG principal ;
- zone header ;
- zone titre et texte custom ;
- zone body dynamique ;
- zone footer ;
- zone actions ;
- bouton de fermeture ;
- décorations et textures.

Le créateur doit définir les limites de chaque zone dans le SVG ou dans les métadonnées du composant : origine, largeur, hauteur, padding et comportement quand le contenu grandit.

## Mise en page

Choisir un cadre uniforme, stretch, horizontal-slice, vertical-slice, nine-slice ou décoré. Définir largeur/hauteur minimale, taille maximale, scroll du body, position (`top`, `center`, `bottom`, `right`), responsive mobile et RTL.

## Actions

Ouvrir, fermer, fermer par overlay, Escape/Retour, valider, annuler, rejeter, passer à l’étape suivante, revenir à l’étape précédente et soumettre un formulaire.

## États et animations

Entrée du parchemin, sortie à la fermeture, ouverture du sceau, écriture progressive, validation, rejet, erreur, loading et contenu scrollable. Chaque animation doit avoir une durée, un easing, une cible et un fallback sans animation.

## Contraste et contenu

Le cadre, le texte, les icônes et les champs doivent rester lisibles selon la surface réelle. Le texte et les actions sont des slots remplaçables et doivent accepter les traductions, les polices et les scripts RTL.

