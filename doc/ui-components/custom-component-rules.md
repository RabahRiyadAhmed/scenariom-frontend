# Index des futurs composants custom

Les SVG de parchemin, sceau, cadre ou bouton décoratif ne sont pas des variantes de primitive. Ils doivent avoir leur propre composant et leur propre fiche.

Fiches spécialisées :

- `custom-button.md` : boutons SVG, bordures, textures et états ;
- `custom-modal.md` : modal/parchemin, zones, actions et animations ;
- `custom-text.md` : texte interchangeable, polices, scripts et effets.

Les primitives validées disposent aussi de leur fiche de contrat :

- `ui-spinner.md` pour les indicateurs et overlays de chargement ;
- `ui-images.md` pour l’affichage, les figures et le crop multi-plateforme ;
- `ui-carousel.md` pour les slides, contrôles et transitions ;
- `ui-video.md` pour l’intégration vidéo responsive ;
- `ui-list-group.md` pour les listes groupées et leurs états.
- `ui-dropdown-menu.md` pour les menus contextuels et leurs items ;
- `ui-ribbon.md` pour les étiquettes latérales ou diagonales ;
- `ui-tooltips-popovers.md` pour les overlays ancrés ;
- `ui-general.md` pour les règles de composition de primitives ;
- `ui-typography.md` pour les textes, scripts et fallbacks ;
- `ui-grid.md` pour les zones responsive et recettes de layout.
- `ui-animation.md` pour les presets de mouvement et leur fallback sans animation ;
- `ui-tour.md` pour l’orchestration des étapes et la personnalisation de leur habillage ;
- `ui-sweet-alert.md` pour les alertes modales, confirmations et séquences ;
- `ui-loading-button.md` pour les actions asynchrones et leurs états visuels ;
- `ui-widgets.md` pour les compositions de données, listes et mini-graphiques.
- `ui-form-basic.md`, `ui-form-advanced.md`, `ui-form-validation.md`, `ui-form-file-upload.md`, `ui-rich-text-editor.md` et `ui-form-wizard.md` pour les contrats de saisie et de workflow ;
- `ui-chart.md` pour les visualisations SVG Web/Expo ;
- `ui-table-basic.md` et `ui-table-advanced.md` pour les données tabulaires, le tri et `UiPagination` ;
- `ui-drag-drop.md` pour la réorganisation et les transferts accessibles ;
- `ui-range-slider.md` pour les valeurs simples/doubles et les réglages rapides.

## Fiche obligatoire

1. format : uniforme, stretch, horizontal-slice, vertical-slice, nine-slice ou centre décoré ;
2. zones : header, body, footer, contenu, icône et actions ;
3. contraintes : ratio, dimensions minimales, padding et débordement ;
4. états : repos, hover/press, focus, disabled, loading, succès et erreur ;
5. actions : clic, fermer, valider, rejeter et callbacks ;
6. animations et fallback sans animation ;
7. contraste, RTL, responsive et accessibilité ;
8. comportement identique attendu Web/Expo.

## Séparation comportement / habillage

Le moteur UI conserve les actions, le focus, les placements, la sélection, les données et l’accessibilité. Le composant custom fournit l’habillage, la géométrie, les slots, les textures et les animations. Un preset ne doit pas réimplémenter la logique de navigation ou stocker les données métier.

La primitive fournit le contrat générique. Le custom fournit la géométrie SVG, les textures, les zones et les animations spécifiques.
