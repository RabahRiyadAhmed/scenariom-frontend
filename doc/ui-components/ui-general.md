# General UI

## Nature de la page

`General UI` est une page de composition, pas une primitive unique. Elle vérifie que `UiBadge`, `UiButton`, `UiAlert`, `UiPagination` et `UiBreadcrumb` fonctionnent ensemble avec les mêmes tokens et sur les deux plateformes.

Les exemples couvrent badges intégrés aux titres, variantes contextuelles, pills, compteurs positionnés, alertes, paginations et fils d’Ariane.

## Contrats à conserver

- le badge reste un libellé ou compteur court ;
- l’alerte reste un message contextuel dans le flux ;
- la pagination expose la page courante, le nombre de pages et `onPageChange` ;
- le breadcrumb expose des items ordonnés avec un item courant ;
- les actions utilisent les icônes partagées et des libellés accessibles.

## Personnalisation future

L’éditeur configure chaque primitive séparément, puis peut enregistrer une recette de composition. Une recette peut définir espacements, alignement, densité et ordre des slots, mais elle ne fusionne pas les contrats.

Un compteur custom peut utiliser un sceau ou une gemme ; une alerte peut utiliser un cadre narratif ; une pagination peut remplacer ses boutons par des médaillons. Les actions, états actifs/désactivés, ordre des pages et données restent fournis par les primitives.

Les données métier, le nombre de notifications, les routes et les messages ne sont jamais enregistrés dans le preset visuel.

## Tests obligatoires

Tester chaque composition avec textes longs, RTL, tons complets, changement de thème, zoom Web, petit écran Expo, état désactivé et contraste des éléments superposés.
