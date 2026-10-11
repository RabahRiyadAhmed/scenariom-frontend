# UiTableAdvanced

## Rôle UI

`UiTableAdvanced` combine tri, recherche globale, taille de page, `UiPagination`, sélection multiple et lignes extensibles. Les quatre laboratoires gardent leurs états séparés.

## Contrat standard

Le moteur conserve ordre de tri, filtre, page, taille, sélection, expansion, clés stables et labels accessibles. La pagination utilise la primitive partagée `UiPagination` sur Web et Expo. Les données réelles viennent du backend ; tri et pagination pourront devenir serveur sans modifier le contrat visuel.

## Personnalisation future

Le custom peut modifier header, indicateur de tri, checkbox, ligne active, pagination, panneau étendu, densité et responsive. Il ne peut pas trier seulement ce qui est affiché si le backend annonce un tri global, perdre la sélection au changement de page ou remplacer les contrôles par des éléments non accessibles.

## Tests obligatoires

Tester tri ascendant/descendant, filtre sans résultat, changement de taille, première/dernière page, sélection multi-page, expansion, scroll horizontal, RTL et chargement/erreur serveur.
