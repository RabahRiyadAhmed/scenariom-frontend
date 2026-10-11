# UiListGroup

## Structure de la primitive

`UiListGroup` regroupe des lignes `UiListGroupItem`. Une ligne accepte un contenu principal, un élément `leading`, un élément `trailing` et les états `active`, `disabled` ou `action`.

Le contenu et les actions restent identiques sur Web et Expo. La plateforme adapte uniquement les éléments techniques : `button` sur le Web et `Pressable` sur Expo.

## Variantes validées

- `default` : bordure extérieure, coins arrondis et séparateurs entre les lignes ;
- `flush` : bordure extérieure carrée, sans rayon, avec séparateurs comme un tableau ;
- `horizontal` : cellules de largeur égale et séparateurs verticaux ;
- `active` : fond `primary` du thème et couleur de texte calculée pour rester lisible ;
- `disabled` : interaction bloquée et opacité réduite ;
- `action` : ligne pressable/cliquable avec feedback de plateforme ;
- `tone` : fond contextuel léger et texte basé sur les couleurs du thème ;
- contenu custom : titre, description, métadonnée, badge, case, numéro, icône ou composition métier.

## Valeurs configurables par un futur éditeur

- orientation verticale ou horizontale ;
- variante `default` ou `flush` ;
- rayon, bordure, séparateur, padding et hauteur minimale ;
- couleur active et tons contextuels issus du thème ;
- icône ou contenu `leading` ;
- badge, compteur, statut ou action `trailing` ;
- état actif, désactivé, pressable et sélectionné ;
- alignement, retour à la ligne, comportement RTL et largeur des cellules.

## Règles pour un composant custom

Le custom peut remplacer le cadre, les séparateurs ou le fond par une texture, un SVG, un nine-slice ou une géométrie narrative. Il doit conserver le contrat fonctionnel de `UiListGroupItem` : contenu, leading, trailing, états, action et accessibilité.

Une liste parchemin, terminal, manga ou inventaire peut donc changer l'habillage sans réimplémenter la sélection, le clic, le disabled ou l'ordre des données.

Le custom ne doit pas coder les données métier dans le composant. Les éléments viennent toujours du backend ou de la page consommatrice.

## Tests obligatoires

Tester Web et Expo avec : textes longs, RTL, thèmes clair/sombre, changement de couleur primaire, contenus contextuels, cellules horizontales étroites, badges et composants imbriqués.
