# UiRibbon

## Rôle et contrat

`UiRibbon` ajoute une étiquette visuelle à un conteneur sans modifier son contenu. Son contrat partagé comprend :

- `label` : texte ou contenu court ;
- `tone` : couleur issue du thème ;
- `position` : gauche ou droite ;
- `variant` : `label` latéral ou bande `corner` diagonale ;
- `icon` : icône facultative pour la variante latérale.

La variante latérale est droite contre le bord extérieur et arrondie uniquement vers l’intérieur. La variante de coin possède une zone carrée de découpe et une bande diagonale centrée.

## Personnalisation future

Un ribbon custom peut changer sa hauteur, sa largeur, son angle, son ombre, son bord, sa texture, son icône et ses extrémités. Un thème peut fournir un ruban textile, une plaque métallique, un sceau ou une bande manga.

Pour un SVG, la définition doit indiquer le `viewBox`, les zones fixes, la zone extensible du libellé, le point d’ancrage, le sens gauche/droite et une marge sûre pour le texte. Un simple étirement uniforme est interdit si celui-ci déforme les ornements.

Le custom ne peut pas supprimer le libellé accessible, dépendre d’une couleur codée en dur ni dépasser la card sans règle explicite de débordement. En RTL, la position logique doit pouvoir suivre `start/end` ou rester physique selon la configuration.

## Tests obligatoires

Tester les deux variantes, toutes les couleurs, texte long, police custom, RTL, card carrée ou arrondie, petites largeurs, thèmes clair/sombre et rendu Web/Expo.
