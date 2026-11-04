# Audit de dynamisation des composants

## Statut et objectif

Ce document fixe le travail préalable à toute évolution de la BDD des thèmes ou des projets.
Il part du catalogue et du code actuels. L'objectif est de sortir progressivement les valeurs
visuelles codées en dur, de les classer, puis de prouver que le même contrat produit un rendu
cohérent sur Next et Expo.

La BDD ne doit pas être conçue avant ce travail : elle ne peut stocker correctement que des
capacités que les renderers savent valider et appliquer.

Prototype Web disponible : `/style-lab`. Il teste uniquement les fondations globales sur une
page simple et sauvegarde une définition partagée portant le slug système `custom` via la
gateway. Cette ressource de validation est visible par Next et Expo après rechargement de
`/themes`. Elle ne représente pas encore un thème possédé par un utilisateur ou affecté à un
projet. L'édition de composants et de pages custom reste volontairement reportée.

## État réel du catalogue

L'inventaire initial contenait **109 entrées** mélangées. Après nettoyage, le catalogue public
contient **42 pages d'exemple validées** ; les autres noms restent reportés ou regroupés dans
`COMPONENT_EXAMPLE_PAGES.md`. Les 109 entrées initiales se répartissaient ainsi :

| Groupe | Nombre | Nature principale |
|---|---:|---|
| Actions | 2 | boutons et actions asynchrones |
| Affichage | 20 | contenu, surfaces, médias simples et typographie |
| Feedback | 9 | alertes, overlays, modales et notifications |
| Formulaires | 25 | champs, sélecteurs et workflows de saisie |
| Navigation | 14 | menus, pagination, panneaux et onglets |
| Données | 19 | tableaux, graphiques, arbres et collections |
| Médias spécialisés | 9 | audio, vidéo, caméra, documents et galerie |
| Métier | 11 | compositions propres à Scenariom |

Une entrée de catalogue n'est pas automatiquement une primitive personnalisable. Certaines
entrées (`UiFormBasic`, `UiGeneral`, `UiWidgets`, par exemple) sont des démonstrations ou des
compositions. Elles héritent des variables de leurs primitives au lieu de recevoir un schéma
indépendant dès la première version.

## Les quatre catégories de valeurs

### 1. Tokens globaux dynamiques

Ils influencent plusieurs composants et appartiennent au style résolu :

- palette sémantique light/dark ;
- couleurs de texte sur chaque ton ;
- états hover, pressed, focus, selected et disabled ;
- familles, tailles, poids, interlignes et espacements typographiques ;
- échelle d'espacement et densité ;
- rayons et épaisseurs de bordure ;
- ombres et élévations ;
- opacités ;
- durées, easings et politique de mouvement ;
- tailles d'icônes ;
- tailles minimales tactiles ;
- breakpoints et catégories phone/tablet/desktop ;
- fond de page, image, position, ajustement, filtre et opacité.

Le code ne possède aujourd'hui qu'une partie de cette liste. `tokens.ts` couvre surtout les
couleurs, espacements, rayons et trois durées. Les foregrounds et hover sont des palettes
séparées et fixes. La typographie, les ombres, les bordures, les opacités, les tailles tactiles
et la plupart des états ne possèdent pas encore de contrat global.

### 2. Recettes visuelles par composant

Elles personnalisent une primitive sans modifier son comportement :

- dimensions et padding par taille ;
- gap entre icône, label et contenu ;
- rayon ou forme ;
- largeur et style de bordure ;
- fond, texte, icône et bordure par variante et par état ;
- ombre, élévation, translation et scale ;
- slots visibles et placement visuel ;
- géométrie et asset optionnel ;
- animation visuelle et fallback reduced-motion ;
- adaptations phone/tablet/desktop.

Exemples : `button`, `card`, `modal`, `field`, `pagination`, `tabs` et `toast` auront chacun une
recette validée. Une recette peut référencer les tokens globaux ou fournir un override borné.

### 3. Paramètres d'instance

Ils sont choisis par la page ou par les données, pas par le thème global :

- ton, variante et taille d'un bouton précis ;
- nombre de colonnes d'une grille dans un layout ;
- position d'une modal ou d'un popover ;
- orientation d'onglets ;
- ratio d'une image ;
- densité d'un tableau ;
- nombre de pages, page active et nombre de voisins d'une pagination.

Un futur `PageDefinition` peut fournir certains de ces paramètres. Ils ne doivent pas être
confondus avec les tokens du style.

### 4. Invariants fonctionnels non personnalisables

Ils restent dans les primitives auditées :

- algorithme de pagination et bornes de page ;
- focus clavier, focus trap et ordre de tabulation ;
- rôles, labels et états d'accessibilité ;
- validation et normalisation des champs ;
- permissions et autorisations ;
- gestion du clavier, safe areas et geste retour natif ;
- protection contre le double submit ;
- limites de taille, profondeur et complexité ;
- nettoyage des SVG et validation des URLs ;
- cycle de vie loading/success/error ;
- calculs de contraste minimum et fallback de sécurité.

La règle est : **le créateur personnalise la présentation et les options autorisées, jamais la
sécurité ni la logique interne de la primitive**.

## Registre des familles à auditer

### Fondations transverses

| Famille | Variables à extraire en priorité |
|---|---|
| Couleurs | tons, foregrounds, surfaces et tous les états interactifs |
| Typographie | familles, échelle, poids, interligne, scripts et fallbacks |
| Espacement | échelle, densité, padding de page et gaps |
| Formes | rayons, bordures, séparateurs et géométries |
| Profondeur | ombres, élévations, overlays et opacités |
| Mouvement | durée, easing, distance, scale et reduced-motion |
| Responsive | catégories d'écran, contraintes et adaptations |
| Assets | URL contrôlée, MIME, fit, répétition, découpe et zones sûres |

### Primitives par ordre de dépendance

| Lot | Composants | Influence principale |
|---|---|---|
| A | Button, IconButton, Badge, Spinner, Divider, Kbd | actions, tailles, tons, icônes, focus |
| B | Card, List, ListGroup, StatCard, Portlet, Skeleton, Progress | surfaces, espaces, bordures, densité |
| C | TextField, Textarea, Select, Checkbox, Radio, Switch, Search et champs spécialisés | formulaires, labels, erreurs, contrôles |
| D | Alert, Toast, Modal, Sheet, Popover, Tooltip, LoadingOverlay | overlays, focus, placement, élévation |
| E | Tabs, Accordion, Breadcrumb, Pagination, menus, Sidebar, BottomNavigation | navigation, sélection et responsive |
| F | Table, Calendar, Timeline, TreeView, Kanban, Chart et collections | densité, grandes données et performance |
| G | médias spécialisés | contrôles natifs, permissions et capacités plateforme |
| H | composants métier Scenariom | composition des lots précédents et données API |

Les pages de démonstration et compositions (`UiFormBasic`, `UiTableBasic`, `UiWidgets`, etc.)
sont vérifiées après leurs primitives. Elles ne doivent pas créer une seconde source de style.

## Cas pilote obligatoire : Button

Le bouton est le premier composant à rendre entièrement pilotable avant de toucher à la BDD.

### Valeurs actuellement fixes observées

| Domaine | Web actuel | Native actuel / contrat actuel | Cible |
|---|---|---|---|
| Hauteur | 32, 40, 48 px | 32, 40, 48 px selon le composant | recette `sizes.*.minHeight` |
| Padding horizontal | 12, 16, 20 px | valeurs de classes | recette `sizes.*.paddingInline` |
| Typographie | xs/sm/base, semi-bold | classes natives correspondantes | tokens typographiques |
| Gap | 8 px | classes `gap-2` | recette `contentGap` |
| Rayon | `md` ou `full` | `md` ou `full` | forme et rayon résolus |
| Bordure | 1 px | 1 px | largeur/style par variante/état |
| Hover Web | couleur dédiée, translation -1 px, ombre | sans hover natif | état conditionnel par capacité |
| Pressed | translation 0 et scale 0.98 | opacité active | même intention, adaptation plateforme |
| Focus Web | ring 2 px primaire à 30 % | focus natif adapté | recette focus non désactivable |
| Disabled | opacité 50 % | opacité 50 % | état résolu avec contraste vérifié |
| Loading | spinner 16 px | indicateur natif | slot/asset et dimensions |
| Icône | tailles sm/md/lg fixes | mapping plateforme | tokens d'icône |
| Foreground | tables fixes | calcul/runtime partiel | dérivé ou override validé |
| Variantes | solid, soft, outline, ghost | mêmes noms | recette partagée |

### Contrat pilote attendu

Le contrat du bouton doit séparer :

```text
ButtonBehavior
  action, disabled, loading, accessibilité

ButtonRecipe
  tailles, espaces, variantes, états, typographie, forme, motion

ButtonAssetSkin (optionnel)
  asset, découpe, contentArea, slots et contraintes
```

`ButtonBehavior` reste du code Scenariom. `ButtonRecipe` et `ButtonAssetSkin` sont des données
validées. Le bouton standard doit fonctionner sans asset.

## Procédure identique pour chaque composant

Pour chaque primitive :

1. recenser les props publiques Web et Native ;
2. relever toutes les valeurs visuelles littérales et classes fixes ;
3. relever les différences de capacités entre plateformes ;
4. classer chaque valeur en global, recette, instance ou invariant ;
5. définir le schéma minimal et ses bornes ;
6. résoudre une fixture standard sans BDD ;
7. rendre la même fixture sur Next et Expo ;
8. tester états, RTL, texte long, accessibilité et tailles d'écran ;
9. supprimer la valeur dupliquée uniquement après réussite ;
10. inscrire la primitive dans la matrice de couverture.

## Ordre d'implémentation corrigé

```text
Audit des composants connus et classification
                ↓
Fondations globales dynamiques
                ↓
Button : contrat → resolver → Web/Expo → tests
                ↓
Lots de primitives A à G
                ↓
Compositions et composants métier H
                ↓
Contrat de style stabilisé
                ↓
BDD des styles, versions et assets
                ↓
Affectation du style à un projet puis à une scène/page
                ↓
Éditeur Qt alimentant les mêmes contrats
```

## Conséquence pour les projets

La création d'un projet continuera d'abord à ne stocker que ses données métier. En l'absence
d'affectation de style, la résolution retourne `scenariomTheme`. Quand le contrat aura été
validé sur les composants, le backend pourra ajouter une affectation nullable vers une
révision publiée. Il est inutile d'enregistrer une copie JSON vide du style dans chaque nouveau
projet : l'absence d'affectation exprime proprement l'héritage du fallback Scenariom.

Cette décision évite de figer prématurément en BDD un JSON incomplet et évite de devoir migrer
tous les projets à chaque nouvelle variable découverte pendant l'audit.
