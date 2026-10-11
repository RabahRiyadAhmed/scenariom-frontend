# UiDropdownMenu

## Rôle de la primitive

`UiDropdownMenu` ouvre une liste compacte d’actions depuis un déclencheur. Le déclencheur reste un vrai `UiButton` ou un autre élément interactif partagé ; le composant ne doit jamais créer un bouton HTML autour d’un autre bouton.

Le contrat actuel contient `trigger`, `items`, `onSelect`, `accessibilityLabel` et `closeLabel`. Chaque item possède une valeur stable, un libellé, une description, une icône, un ton et un état désactivé facultatifs.

## Cas de la page d’exemple

- bouton simple et déclencheur visuellement léger ;
- palette complète de tons ;
- ouverture en haut, bas, début ou fin ;
- item actif ou désactivé ;
- bouton séparé entre action principale et ouverture du menu ;
- tailles de déclencheur ;
- entêtes et séparateurs ;
- formulaire compact ;
- texte libre contraint.

Le contrat partagé ne couvre pas encore toutes ces variantes. Un comportement démontré dans la page ne devient pas une API métier tant que son type n’a pas été ajouté au design-system Web et Expo.

## Personnalisation future

Un dropdown custom peut modifier le cadre, la flèche, la texture, le rayon, l’ombre, les séparateurs, les icônes, la typographie et les animations d’entrée/sortie. Il peut utiliser un SVG ou un nine-slice pour le panneau, à condition de définir une zone extensible pour les items.

Les propriétés fonctionnelles à conserver sont : déclencheur, placement, ouverture/fermeture, sélection, item actif, item désactivé, navigation clavier Web, fermeture extérieure, focus et ordre RTL.

Les formulaires ne doivent pas être enregistrés comme du HTML arbitraire : ils utilisent des slots et des primitives de formulaire connues par l’éditeur.

## Tests obligatoires

Tester Web et Expo, clavier, lecteur d’écran, RTL, bord d’écran, longue liste, libellés longs, item désactivé, changement de thème et déclencheur situé dans une card avec `overflow`.
