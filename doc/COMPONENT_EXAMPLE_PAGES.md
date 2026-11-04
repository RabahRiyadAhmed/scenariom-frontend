# Registre des pages d'exemple de composants

## Règle

Une entrée du catalogue Web/Expo représente une **page d'exemple réellement utile**, pas
simplement un composant exporté par le design-system. Un composant sans démonstration validée
reste disponible dans le code mais n'apparaît ni dans la navigation, ni dans les routes
générées, ni dans le Style Lab.

Une page peut regrouper plusieurs primitives lorsque l'exemple est plus compréhensible ainsi.
Le registre exécutable commun à Next et Expo est
`packages/design-system/src/component-catalog.ts`.

## Pages actuellement validées

### Actions

- `ui-button`
- `ui-loading-button`

### Affichage

- `ui-avatar`
- `ui-badge`
- `ui-card`
- `ui-portlet`
- `ui-list`
- `ui-progress`
- `ui-placeholders`
- `ui-spinner`
- `ui-images`
- `ui-stat-card`
- `ui-ribbons`
- `ui-tooltips-popovers`
- `ui-general`
- `ui-typography`
- `ui-grid`
- `ui-animation`

### Feedback

- `ui-alert`
- `ui-notifications`
- `ui-modal`
- `ui-toast`
- `ui-sweet-alert`

### Formulaires

- `ui-form-basic`
- `ui-form-advanced`
- `ui-form-validation`
- `ui-form-file-upload`
- `specialized-rich-text-editor`
- `ui-form-wizard`
- `ui-range-slider`

### Navigation

- `ui-dropdown-menu`
- `ui-offcanvas`
- `ui-tabs`
- `ui-tour`

### Données

- `ui-chart`
- `ui-table-basic`
- `ui-table-advanced`
- `ui-drag-drop`
- `ui-nestable-list`
- `ui-widgets`

### Médias

- `ui-carousel`
- `ui-video`

Les implémentations internes historiques peuvent encore porter les noms
`SpecializedCarousel` et `SpecializedVideo`. Les pages publiques utilisent désormais les noms
fonctionnels `UiCarousel` et `UiVideo`.

## Primitives regroupées sur une autre page

Ces composants ne doivent pas recevoir automatiquement une route dédiée :

- pagination et contrôles génériques : page `ui-general` ;
- champs texte, textarea, select, checkbox, radio et switch : pages `ui-form-*` ;
- tooltip et popover : page `ui-tooltips-popovers` ;
- accordion : page `ui-tabs` ;
- skeleton : page `ui-placeholders` ;
- primitives de tableaux : pages `ui-table-basic` et `ui-table-advanced`.

Ils pourront obtenir une page dédiée plus tard si une démonstration complète est ajoutée.

## Composants reportés

Les familles suivantes restent hors catalogue jusqu'à la création d'exemples réels :

- navigation avancée : bottom navigation, breadcrumb, command palette, context menu,
  navigation menu, page header, sheet et sidebar ;
- sélecteurs spécialisés : color picker, combobox, dates, heures, téléphone, nombres,
  multi-select et fichiers autonomes ;
- collections avancées : activity feed, calendar, filter bar, infinite scroll, kanban,
  pull-to-refresh, stepper, timeline et tree view ;
- médias : audio, caméra, document, galerie, image picker, lightbox et voice recorder ;
- composants métier : autosave, personnages, commentaires, membres, permissions, rôles,
  scènes, tags, statuts de projet et historique de versions ;
- états techniques isolés : empty state, loading overlay, network status et permission state.

La liste technique exhaustive des noms reportés se trouve dans `deferredComponentNames`. Elle
sert à préserver les types pendant la migration, pas à générer des pages.

## Condition pour ajouter une page

Une nouvelle entrée est ajoutée au catalogue uniquement si :

1. l'exemple démontre réellement le composant ;
2. les états importants sont visibles ;
3. le rendu existe sur Next et Expo, ou la limitation plateforme est documentée ;
4. les textes longs, le responsive et l'accessibilité minimale sont vérifiés ;
5. la page ne duplique pas inutilement une démonstration déjà regroupée.
