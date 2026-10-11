# UiOffcanvas

## Rôle UI

Panneau temporaire qui entre depuis un bord de l'écran : menu, filtres, détails ou actions secondaires.

## Options UI

- position : début, fin, haut ou bas ;
- largeur ou hauteur adaptée au contenu et à l'écran ;
- titre, contenu scrollable, footer et bouton fermer ;
- backdrop, fermeture par clic extérieur et Retour Android ;
- direction RTL : début et fin s'inversent.

## Personnalisation custom autorisée

Le conteneur peut recevoir un cadre SVG, une texture, une forme de coin, une animation de glissement et une barre de titre décorée. Les zones `header`, `body`, `footer` et l'action fermer doivent rester identifiables.

Exemple : un panneau Steampunk peut avoir un cadre métallique en nine-slice ; le contenu, la zone scrollable et le bouton fermer restent fournis par UiOffcanvas.

## À tester

Web/Expo, écrans étroits, contenu long, RTL, fermeture, focus Web, Retour Android, contraste et zone sûre.
