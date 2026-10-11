# UiTableBasic

## Rôle UI

`UiTableBasic` présente les mêmes données sous huit variantes : simple, inverse, header sombre, lignes alternées, bordures de cellules, compact, sans bordure et responsive.

## Contrat standard

Le moteur conserve lignes, colonnes, clés, header, footer, direction des valeurs et scroll horizontal. Une ligne reste une unité de données ; la variante ne duplique ni ne transforme la source.

## Personnalisation future

Le custom peut modifier densité, séparateurs, alternance, header, footer, cadre et état hover/press. Il ne doit pas rendre les colonnes ambiguës, casser l'association header-cellule ou imposer une largeur illisible.

## Tests obligatoires

Tester tableau vide, nombreuses colonnes/lignes, petites largeurs, scroll Expo/Web, RTL avec identifiants LTR, textes longs, thème sombre et contraste des lignes alternées.
