# Valeurs visuelles actuellement fixes

Ce document inventorie les décisions codées en dur qui devront pouvoir être déplacées vers les thèmes, les préférences de page ou les outils de personnalisation. Il ne décrit pas les couleurs métier venant déjà du backend.

## Card — design-system partagé

Fichiers : `packages/design-system/src/ui/index.web.tsx` et `index.native.tsx`.

| Élément | Valeur actuelle | À rendre configurable plus tard |
|---|---|---|
| Card | `rounded-lg`, bordure 1 px, `shadow-sm`, surface opaque | rayon, largeur/couleur de bordure, intensité d’ombre, opacité |
| Card interactive | translation Web `-1` et `shadow-lg`; opacité active Expo | élévation, déplacement, animation |
| Header | `px-5 py-4`, bordure basse | padding, séparation, typographie |
| Body | `p-5`, espacement interne `4` | padding horizontal/vertical, gap |
| Footer | `px-5 py-3`, bordure haute, texte `sm` | padding, séparation, taille et couleur |
| Titre | `text-lg`, semi-bold | taille, graisse, famille, interligne |
| Description | `text-sm`, ligne `6`, opacité `90%` | taille, contraste et opacité par variante |
| Image wide | ratio `16/9` | ratio par Card/page |
| Image portrait | ratio `3/4` | ratio par Card/page |
| Overlay | noir à `55%`, padding `5` | couleur, opacité, gradient, alignement |
| Card Group | trois colonnes Web | nombre de colonnes et règles responsive |

## Page d’exemple Card

Fichiers : `front/web/components/card-template-preview.tsx` et `front/mobile/src/components/card-template-preview.tsx`.

- Grilles Web : 2, 3 ou 4 colonnes selon les sections.
- Largeur image des Cards horizontales Web : `220px`.
- Largeur image des Cards horizontales Expo : `40%`.
- Espacement entre Cards : `gap-5`; espacement entre sections : `8`.
- Les tons de démonstration sont une liste fixe : primary, secondary, success, info, warning, danger, purple, pink et neutral.
- Le template Inertia possède aussi ses propres tons `postBlue` et `dark`; ils ne sont pas encore des tons génériques pilotés par le backend.
- Les textes, titres et dates de la page restent des données de démonstration fixes.

## Effet de lisibilité sur background

Fichiers : `front/web/app/globals.css` et `front/mobile/src/components/themed-text.tsx`.

- Web : ombre `0 1px 3px`, couleur composée à 92% depuis `--sc-background`.
- Expo : offset vertical `1`, rayon `3`, couleur `theme.background`.
- L’effet est volontairement explicite via `readable-on-background` / `readableOnBackground`.
- Il est neutralisé dans les surfaces opaques et ne doit jamais être hérité globalement.

## Layout du laboratoire de composants

- Navigation Web : colonne fixe `260px`.
- Contenu Web : largeur maximale `1500px`.
- Zone de preview : `rounded-xl`, padding `6`, hauteur minimale `18rem`.
- Menu Expo : largeur `80%`, maximum `20rem`.

## Boutons et contrôles

- Boutons Web : hauteurs minimales 32, 40 et 48 px selon la taille.
- Boutons Expo : hauteurs minimales 32, 44 et 48 px.
- Rayon standard actuel : `rounded-md`, sauf option pill.
- Animations actives, ombres et déplacements restent codés dans le composant.

## Icônes

- Web utilise `lucide-react` derrière `UiIcon`.
- Expo utilise `expo-symbols` derrière le même contrat `UiIconName`.
- Tailles fixes actuelles : 14, 16 et 18 px.
- Les couleurs d’icônes de la page Card Expo sont encore des valeurs de démonstration fixes et devront utiliser directement les tokens runtime du thème.
- Expo transmet maintenant la palette runtime au design-system via `UiThemeProvider`; le contraste noir/blanc des surfaces `solid` est calculé depuis la couleur réellement affichée et n'est plus lié au mode système.

## Portlet

- Actions du header : `28 × 28px`.
- Icônes : taille `md` (`16px`).
- Opacité inactive : `75%`.
- Durée simulée du reload : `700ms`.
- Loader : cercle de `48px`, bordure et `shadow-sm`.
- Overlay de reload : surface du thème à `90%` dans Scenariom (`78%` dans le template Inertia).
- Hover Web : fond noir à `10%` en mode clair, blanc à `10%` en mode sombre.
- Ces valeurs devront rejoindre la configuration du composant/thème si les utilisateurs peuvent personnaliser le comportement des Portlets.
