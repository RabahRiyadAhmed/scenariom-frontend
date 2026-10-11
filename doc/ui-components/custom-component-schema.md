# Contrat de métadonnées pour l’éditeur

L’éditeur pourra enregistrer un composant custom avec un contrat de ce type :

```ts
type CustomComponentDefinition = {
  id: string;
  asset?: { source: string; width: number; height: number; resizeMode: string };
  assets?: Array<{
    id: string;
    source: string;
    width: number;
    height: number;
    resizeMode: 'uniform'|'stretch'|'horizontal-slice'|'vertical-slice'|'nine-slice';
    capInsets?: { top: number; right: number; bottom: number; left: number };
  }>;
  slots: Array<
    'header'|'body'|'footer'|'title'|'text'|'icon'|'actions'|'overlay'|
    'trigger'|'items'|'item-leading'|'item-trailing'|'separator'|'badge'|'arrow'|
    'media'|'value'|'description'|'trend'|'chart'
  >;
  layout: {
    minWidth?: number;
    minHeight?: number;
    padding?: number;
    contentArea?: object;
    placement?: 'top'|'right'|'bottom'|'left'|'start'|'end';
    columns?: number;
    breakpoints?: Record<string, object>;
  };
  geometry?: {
    viewBox?: string;
    contentBounds?: object;
    anchor?: object;
    safeTextBounds?: object;
    overflow?: 'visible'|'hidden';
  };
  style: { tone?: string; radius?: number; border?: object; shadow?: object; texture?: object };
  states: Record<string, { style?: object; icon?: string; textKey?: string; animation?: string }>;
  motion?: {
    preset?: string;
    durationMs?: number;
    delayMs?: number;
    easing?: string;
    iterations?: number;
    reducedMotionFallback?: 'none'|'instant'|'opacity';
  };
  actions: Array<{
    name: string;
    event: 'press'|'select'|'open'|'close'|'confirm'|'reject'|'change';
    target?: string;
  }>;
  responsive?: object;
  typography?: { family?: string; fallbackByScript?: Record<string, string>; scale?: string; lineHeight?: number };
  interaction?: {
    dismissible?: boolean;
    disabled?: boolean;
    focusTrap?: boolean;
    closeOnOutsidePress?: boolean;
    placement?: 'top'|'right'|'bottom'|'left'|'start'|'end';
    keyboardNavigation?: boolean;
  };
  dataBinding?: {
    sourceId?: string;
    fields?: Record<string, string>;
    refreshPolicy?: 'manual'|'on-focus'|'interval';
  };
  accessibility: { labelKey?: string; role: string };
};
```

Ce contrat sépare l’asset et sa géométrie, les slots dynamiques, le style, les états, les actions et l’accessibilité. Il permet à l’éditeur de charger les mêmes informations pour Web et Expo sans transformer chaque SVG en composant codé en dur.

## Règle de stockage

La définition et les métadonnées sont des données persistantes côté backend. Le frontend reçoit la définition, résout les clés i18n et rend le composant avec les primitives disponibles. Un asset définitif ne doit pas être stocké uniquement dans le frontend.
