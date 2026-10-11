# UiSpinner et UiLoaderOverlay

## Structure de la primitive

`UiSpinner` représente un chargement court ou indéterminé. `UiLoaderOverlay` place un spinner dans une zone de chargement couvrant un panneau ou une section.

Les variantes partagées Web/Expo sont :

- `border` : arc ouvert tournant ;
- `ring` : anneau complet avec segment actif ;
- `grow` : cercle qui pulse ;
- `dots` : trois points animés ;
- `native` : indicateur fourni par la plateforme mobile.

Les tailles disponibles sont `xs`, `sm`, `md`, `lg` et `xl`. Le ton vient du thème. La valeur `color="current"` permet au spinner de reprendre la couleur du texte d’un bouton.

## Utilisation validée

- indicateur seul ;
- couleurs sémantiques ;
- alignement centré ou dans une ligne ;
- spinner dans un bouton avec ou sans texte ;
- chargement de section avec `UiLoaderOverlay` ;
- délais et rythmes différents pour les points et les indicateurs pulsés.

## Personnalisation future

Un éditeur pourra configurer la variante, la taille, le ton, la vitesse, le délai entre les points, l’épaisseur et le sens de rotation. Une variante custom pourra utiliser une image, un SVG ou une animation thématique, mais devra conserver le rôle de progression, le label accessible et un fallback sans animation.

Le spinner ne déclenche pas lui-même le chargement. Son affichage dépend toujours d’un état `loading` contrôlé par le parent.

## Tests obligatoires

Tester dans un bouton, une card, un portlet, une modal et un écran complet, en clair/sombre, RTL, thème personnalisé et avec les animations système réduites.
