# UiLoadingButton

## Rôle UI

`UiLoadingButton` représente une action temporairement occupée. La page d’exemple valide `expand-left/right/up/down`, `contract`, `contract-overlay`, `zoom-in/out`, `slide-left/right/up/down` ainsi que la progression déterminée.

Chaque démonstration possède son propre état afin qu'un chargement ne démarre pas les autres boutons. Les couleurs et indicateurs utilisent les rôles du thème.

## Contrat fonctionnel

Le composant reçoit le contenu normal, l’état `loading`, le style de transition, un texte de chargement facultatif et éventuellement une progression. Pendant l’opération, l’action est désactivée afin d’empêcher les doubles soumissions.

Le moteur conserve la sémantique du bouton, l’état pressé/désactivé, la progression, la stabilité de ses dimensions et l’annonce accessible de l’attente. Le résultat `success` ou `error` appartient au workflow appelant.

## Personnalisation future

Un custom peut modifier spinner, icône, direction, texture, bordure, contraction, position de la barre et transitions de texte. Il peut définir des apparences pour `idle`, `loading`, `progress`, `success`, `error` et `disabled`.

L’animation ne doit pas déplacer la mise en page, supprimer le label accessible ou autoriser un second clic. En mode réduction des animations, le bouton affiche directement un indicateur statique ou un changement de texte.

## Tests obligatoires

Tester toutes les directions, progression 0–100, opération très courte/longue, erreur, double pression, RTL, largeur de traductions, Web/Expo et réduction des animations.
