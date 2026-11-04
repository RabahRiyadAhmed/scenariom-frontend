/** Pages de démonstration réellement validées sur Web et Expo. */
export const componentCatalog = [
  ['actions', 'UiButton'], ['actions', 'UiLoadingButton'],
  ['display', 'UiAvatar'], ['display', 'UiBadge'], ['display', 'UiCard'],
  ['display', 'UiPortlet'], ['display', 'UiList'], ['display', 'UiProgress'],
  ['display', 'UiPlaceholders'], ['display', 'UiSpinner'], ['display', 'UiImages'],
  ['display', 'UiStatCard'], ['display', 'UiRibbons'], ['display', 'UiTooltipsPopovers'],
  ['display', 'UiGeneral'], ['display', 'UiTypography'], ['display', 'UiGrid'],
  ['display', 'UiAnimation'],
  ['feedback', 'UiAlert'], ['feedback', 'UiNotifications'], ['feedback', 'UiModal'],
  ['feedback', 'UiToast'], ['feedback', 'UiSweetAlert'],
  ['forms', 'UiFormBasic'], ['forms', 'UiFormAdvanced'], ['forms', 'UiFormValidation'],
  ['forms', 'UiFormFileUpload'], ['forms', 'SpecializedRichTextEditor'],
  ['forms', 'UiFormWizard'], ['forms', 'UiRangeSlider'],
  ['navigation', 'UiDropdownMenu'], ['navigation', 'UiOffcanvas'],
  ['navigation', 'UiTabs'], ['navigation', 'UiTour'],
  ['data', 'UiChart'], ['data', 'UiTableBasic'], ['data', 'UiTableAdvanced'],
  ['data', 'UiDragDrop'], ['data', 'UiNestableList'], ['data', 'UiWidgets'],
  ['media', 'UiCarousel'], ['media', 'UiVideo'],
] as const;

/**
 * Noms connus mais sans page de démonstration validée. Ils restent typés pour que les
 * composants existants puissent être migrés progressivement sans réapparaître dans le menu.
 */
export const deferredComponentNames = [
  'UiDivider', 'UiKbd', 'UiSkeleton', 'UiTooltip', 'UiEmptyState',
  'UiLoadingOverlay', 'UiNetworkStatus', 'UiPermissionState', 'UiCheckbox',
  'UiColorPicker', 'UiCombobox', 'UiDatePicker', 'UiDateRangePicker', 'UiFileUpload',
  'UiFormField', 'UiMultiSelect', 'UiNumberField', 'UiPasswordField', 'UiPhoneField',
  'UiRadioGroup', 'UiSearchField', 'UiSelect', 'UiSwitch', 'UiTextarea', 'UiTextField',
  'UiTimePicker', 'UiBottomNavigation', 'UiBreadcrumb', 'UiCommandPalette',
  'UiContextMenu', 'UiNavigationMenu', 'UiPageHeader', 'UiPagination', 'UiPopover',
  'UiSheet', 'UiSidebar', 'SpecializedAdvancedDataView', 'SpecializedChart',
  'SpecializedDataView', 'SpecializedSortableList', 'UiActivityFeed', 'UiCalendar',
  'UiFilterBar', 'UiInfiniteScroll', 'UiKanban', 'UiPullToRefresh', 'UiStepper',
  'UiTimeline', 'UiTreeView', 'SpecializedAudioPlayer', 'SpecializedCameraCapture',
  'SpecializedDocumentViewer', 'SpecializedGallery', 'SpecializedImagePicker',
  'SpecializedLightbox', 'SpecializedVoiceRecorder', 'AutosaveIndicator',
  'CharacterEditor', 'CommentThread', 'MemberPicker', 'PermissionEditor',
  'ProjectStatusSelector', 'RoleEditor', 'SceneEditor', 'TagEditor',
  'UnsavedChangesGuard', 'VersionHistory', 'UiAccordion',
] as const;

export type ComponentCatalogName =
  | typeof componentCatalog[number][1]
  | typeof deferredComponentNames[number];

export const componentSlug = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
export const findCatalogComponent = (slug: string) => componentCatalog.find(([, name]) => componentSlug(name) === slug);
