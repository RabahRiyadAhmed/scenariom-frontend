# UiDragDrop

## Rôle UI

`UiDragDrop` couvre réorganisation simple, transfert bidirectionnel entre deux conteneurs et déplacement avec poignée explicite. Expo fournit aussi des actions accessibles lorsque le geste précis est moins fiable.

## Contrat standard

Le moteur possède identifiants, ordre, conteneur source/cible, zones autorisées, annulation et callback final. Le déplacement par boutons/clavier est une alternative au geste, pas une seconde source d'état.

## Personnalisation future

Le custom peut modifier carte, poignée, aperçu flottant, zone de dépôt, indicateur de position et animation. Il ne peut pas autoriser un transfert interdit, perdre un item, exiger uniquement le drag ou placer les contrôles au-dessus du contenu.

## Tests obligatoires

Tester deux directions, premier/dernier item, conteneur vide, annulation, clavier Web, tactile Expo, scroll pendant geste, RTL, thème sombre et synchronisation backend échouée.
