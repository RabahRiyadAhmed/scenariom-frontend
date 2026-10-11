# UiWidgets

## Rôle UI

`UiWidgets` désigne une famille de compositions, pas une primitive unique. La page d’exemple couvre statistiques avec icône et tendance, statistiques groupées, tendances, progression, profils, messages, chat, tâches et mini-graphiques ligne/barres/aire.

Les widgets actuellement remplis sont des compositions de primitives partagées ; ils ne doivent pas devenir une seconde bibliothèque parallèle de cartes, badges ou boutons.

## Contrat de composition

Un widget reçoit des données par propriétés : titre, valeur, description, ton, icône, tendance, progression, média, items et actions selon son type. Il doit également prévoir `loading`, `empty`, `error` et une date de fraîcheur lorsque la donnée peut devenir obsolète.

Les données d’exemple restent uniquement dans la preview. En production, les valeurs et assets définitifs viennent du backend ; le preset visuel ne doit contenir aucune donnée métier.

Le moteur conserve le formatage des nombres/dates, la navigation, les actions, les limites de liste et l’accessibilité des graphiques. Un mini-graphe possède toujours un résumé textuel compréhensible sans le dessin.

## Personnalisation future

Un custom peut modifier grille, cadre, texture, densité, tons, icônes, représentation de tendance et type de mini-graphe. Les slots possibles sont `header`, `title`, `value`, `description`, `icon`, `trend`, `chart`, `items`, `actions` et `footer`.

L’éditeur pourra assembler un widget à partir de primitives validées (`UiCard`, `UiBadge`, `UiProgress`, `UiAvatar`, `UiButton`) ou appliquer une géométrie spécialisée. Il ne doit pas intégrer une requête API dans le composant visuel : une source de données déclarative est reliée par l’application.

## Tests obligatoires

Tester valeurs longues/négatives/nulles, listes vides, chargement et erreur, RTL, scripts non latins, petits écrans, rotation Expo, contraste, actions clavier/pression et résumé accessible des graphiques.
