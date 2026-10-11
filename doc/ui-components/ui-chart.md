# UiChart

## Rôle UI

`UiChart` fournit six visualisations de référence : ligne, barres groupées, doughnut, radar, aire polaire et bulles. Les données sont identiques sur les deux plateformes ; Web utilise SVG React et Expo `react-native-svg`.

## Contrat standard

Le moteur reçoit séries, labels, axes, légende, domaine, formatters et texte accessible. Les couleurs proviennent des rôles du thème. Toute visualisation possède un résumé compréhensible sans le dessin et ne dépend pas uniquement de la couleur pour distinguer des séries.

## Personnalisation future

Le custom peut changer palette, trait, remplissage, points, épaisseur, grille, légende, animation et forme des marqueurs. Il peut fournir un cadre décoratif sans modifier les données. Les échelles, valeurs et interactions de sélection restent gérées par le moteur.

## Tests obligatoires

Tester thème clair/sombre, valeurs nulles/négatives/extrêmes, série vide, labels longs, RTL, rotation Expo, redimensionnement Web, contraste et résumé lecteur d'écran.
