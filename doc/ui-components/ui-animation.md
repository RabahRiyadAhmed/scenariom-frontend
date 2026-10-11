# UiAnimation

## Rôle UI

`UiAnimation` applique un preset de mouvement à un contenu existant. La page d’exemple valide les familles attention, entrées, sorties, fondu, rotation, glissement, zoom et effets spéciaux sur Web et Expo.

Le nom sémantique du preset peut être partagé, mais son moteur reste propre à la plateforme : CSS/`animate.css` sur Web et `Animated` sur React Native. Un composant métier ne doit pas dépendre directement d’un nom de classe CSS.

La preview actuelle permet de sélectionner une animation, de la rejouer et de comparer les familles sur une même cible. Cette liste constitue le registre standard ; les presets custom devront déclarer leur fallback Expo/Web.

## Contrat fonctionnel

Une animation configurable doit pouvoir définir :

- le preset, le déclencheur et la cible ;
- la durée, le délai, l’accélération, la direction et le nombre de répétitions ;
- le comportement à la fin et une éventuelle animation de sortie ;
- un fallback stable lorsque le mouvement est indisponible ou réduit.

Le moteur possède le cycle de vie, évite les déclenchements concurrents et annonce la fin si une action dépend de celle-ci.

## Personnalisation future

Un custom peut fournir ses propres étapes d’opacité, translation, rotation, échelle ou animation d’asset/SVG. Il peut aussi associer une animation différente à `press`, `open`, `close`, `success` ou `error`.

La personnalisation ne doit jamais déplacer durablement la zone pressable, cacher une action obligatoire ou utiliser l’animation comme seule indication d’état. L’éditeur enregistrera un preset déclaratif, pas du CSS ou du code React arbitraire.

## Tests obligatoires

Tester Web/Expo, redéclenchement, démontage pendant l’animation, faible performance, RTL pour les mouvements directionnels et préférence de réduction des animations.
