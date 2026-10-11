# Figma Editor — Référence d'interface pour Scenariom

> Ce fichier décrit **l'interface de travail de Figma Design**, pas le site marketing de Figma.
>
> Il sert de référence UX pour construire les pages de création de Scenariom.
> Il ne faut pas copier l'identité visuelle de Figma : les couleurs finales doivent venir des tokens Scenariom.

---

## 1. Pourquoi cette référence existe

Le fichier `figma.design.md` d'origine décrit principalement le **site marketing Figma** : grandes sections colorées, typographie, boutons, pricing, navigation publique, etc.

Ce n'est pas la référence recherchée ici.

Pour Scenariom, Figma est intéressant comme **workspace de création** :

- un grand espace central consacré au contenu ;
- des outils accessibles sans prendre le contrôle de l'écran ;
- une navigation hiérarchique à gauche ;
- des propriétés contextuelles à droite ;
- une barre d'outils compacte ;
- des panneaux qui peuvent être réduits ;
- une interface qui change selon l'objet sélectionné.

Le principe principal est :

> **Le contenu créé doit rester au centre. L'interface existe autour de lui et devient contextuelle.**

---

## 2. Anatomie générale

Structure de référence :

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Fichier / contexte                                      actions     │
├──────────┬──────────────────────────────────────────────┬───────────┤
│          │                                              │           │
│ NAV      │                                              │ PROPRIÉTÉS│
│          │                                              │           │
│ Pages    │                  CANVAS                      │ sélection │
│ Layers   │                                              │ actuelle │
│ Assets   │                                              │           │
│          │                                              │           │
│          │                                              │           │
│          │             ┌───────────────┐                │           │
│          │             │   contenu     │                │           │
│          │             └───────────────┘                │           │
│          │                                              │           │
│          │             [ barre d'outils ]               │           │
└──────────┴──────────────────────────────────────────────┴───────────┘
```

Les zones fondamentales sont :

1. navigation ;
2. panneau gauche ;
3. canvas ;
4. panneau de propriétés ;
5. toolbar ;
6. contexte du fichier et actions globales.

---

## 3. Canvas : priorité absolue

Le canvas est la zone principale.

Il doit occuper la majorité de l'écran.

```yaml
workspace:
  canvas:
    priority: highest
    behavior:
      - pan
      - zoom
      - select
      - multi-select
      - drag
      - contextual-actions
    background: "{scenariom.workspace.canvas}"
```

Règles :

- ne pas enfermer le canvas dans une grosse carte ;
- éviter les headers inutilement hauts ;
- les outils doivent prendre le minimum d'espace nécessaire ;
- permettre de masquer/réduire les panneaux ;
- la sélection doit être visible sans masquer le contenu ;
- le zoom et le déplacement doivent sembler naturels.

Pour Scenariom, le canvas pourra accueillir plus tard :

- organisation d'une narration ;
- personnages ;
- lieux ;
- scènes ;
- événements ;
- relations ;
- chapitres ;
- blocs narratifs ;
- médias ;
- embranchements ;
- éléments interactifs.

---

## 4. Navigation gauche

Le côté gauche sert à comprendre **la structure du projet**.

Dans Figma, cette logique correspond notamment aux pages, layers et assets.

Adaptation Scenariom :

```text
Projet
│
├── Histoire
│   ├── Arc 1
│   │   ├── Chapitre 1
│   │   └── Chapitre 2
│   └── Arc 2
│
├── Personnages
├── Lieux
├── Événements
├── Objets
├── Relations
├── Médias
└── Composants / modèles
```

Structure proposée :

```yaml
left-panel:
  width:
    default: 260px
    min: 220px
    max: 420px

  sections:
    - project-navigation
    - hierarchy
    - assets
    - search

  behavior:
    resizable: true
    collapsible: true
    tree-navigation: true
    drag-reorder: true
```

Important :

> La sidebar n'est pas une simple navigation de site. C'est une représentation de la structure du travail.

---

## 5. Panneau droit contextuel

Le panneau droit affiche les propriétés de **ce qui est actuellement sélectionné**.

Il ne doit donc pas toujours afficher la même chose.

Exemple :

```text
Aucune sélection
→ informations du projet / canvas

Personnage sélectionné
→ identité
→ apparence
→ état
→ relations
→ métadonnées

Scène sélectionnée
→ titre
→ durée
→ participants
→ lieu
→ transitions

Bloc texte sélectionné
→ typographie
→ alignement
→ style
→ comportement

Événement sélectionné
→ date
→ participants
→ conséquences
→ relations
```

Modèle :

```yaml
properties-panel:
  position: right
  width:
    default: 300px
    min: 260px
    max: 460px

  behavior:
    contextual: true
    resizable: true
    collapsible: true

  groups:
    style:
      - accordion
      - compact-fields
      - segmented-controls
      - icon-actions
```

Le panneau doit être dense mais lisible.

Éviter de transformer chaque propriété en énorme carte.

---

## 6. Toolbar

La toolbar contient les actions de création les plus fréquentes.

Elle doit être compacte et accessible depuis le canvas.

Exemple Scenariom :

```text
[Select] [Move] │ [Text] [Character] [Place] [Event] [Relation] │ [...]
```

Configuration :

```yaml
toolbar:
  density: compact
  position: canvas-edge-or-floating

  groups:
    navigation:
      - select
      - hand

    creation:
      - text
      - character
      - location
      - event
      - relation
      - media

    utilities:
      - comment
      - more

  behavior:
    tooltips: true
    keyboard-shortcuts: true
    active-tool-visible: true
```

Une action utilisée rarement doit aller dans un menu secondaire plutôt que grossir la toolbar.

---

## 7. Sélection et contexte

L'interface doit réagir à la sélection.

```yaml
selection:
  single:
    show:
      - selection-outline
      - properties
      - contextual-actions

  multiple:
    show:
      - common-properties
      - group-actions
      - alignment-actions

  none:
    show:
      - project-or-canvas-properties
```

C'est une règle importante pour Scenariom.

Ne pas afficher tous les outils possibles en permanence.

---

## 8. Hiérarchie visuelle

Le workspace doit avoir plusieurs niveaux de surfaces discrètes.

Exemple conceptuel :

```text
application
    ↓
navigation / panels
    ↓
canvas
    ↓
content
    ↓
selected content
    ↓
active control
```

Les différences peuvent venir de :

- contraste léger ;
- bordure ;
- élévation subtile ;
- état actif ;
- couleur Scenariom ;
- opacité.

Éviter les ombres lourdes et les séparations trop agressives.

---

## 9. Densité

Contrairement à une Home marketing, l'éditeur est un outil de travail.

Les contrôles doivent donc être plus compacts.

```yaml
density:
  toolbar: compact
  sidebar: compact
  property-row: compact
  menu: compact
  canvas: spacious
```

Principe :

> **Interface dense autour, espace libre au centre.**

---

## 10. Couleurs Scenariom

Ne pas reprendre automatiquement le noir/blanc ou les couleurs marketing de Figma.

Utiliser les tokens Scenariom.

### Light

```yaml
colors:
  brand-primary: "#1E3A8A"
  creative-accent: "#6D28D9"
  metallic: "#9CA3AF"
  premium-accent: "#D4AF37"

  background: "#F8FAFC"
  foreground: "#111827"
```

### Dark

```yaml
colors:
  background: "#0F1420"
  surface: "#171E2E"
  panel: "#20293A"
  border: "#303A4D"

  primary: "#3B5CCC"
  accent: "#7C3AED"

  foreground: "#F1F5F9"
  muted: "#A8B3C5"
  disabled: "#667085"
```

### Règle

Le bleu profond + l'argent constituent la base identitaire.

Le violet sert principalement aux états créatifs ou spéciaux.

Le doré reste exceptionnel.

---

## 11. Tokens sémantiques recommandés

Les composants ne doivent pas dépendre directement des hex.

```yaml
semantic-colors:
  app-background: "{colors.background}"
  workspace-canvas: "{colors.workspace}"
  panel-background: "{colors.surface}"
  panel-border: "{colors.border}"

  control-background: "{colors.control}"
  control-hover: "{colors.control-hover}"
  control-active: "{colors.primary}"

  selection: "{colors.primary}"
  focus: "{colors.primary}"
  creative-state: "{colors.accent}"

  text-primary: "{colors.foreground}"
  text-secondary: "{colors.muted}"
```

Ainsi le même système peut être traduit pour :

- Tailwind Web ;
- React ;
- Expo / React Native ;
- NativeWind.

---

## 12. Composants de base du workspace

```yaml
components:

  workspace-shell:
    regions:
      - navigation-bar
      - left-panel
      - canvas
      - right-panel
      - toolbar

  navigation-panel:
    resizable: true
    collapsible: true

  properties-panel:
    resizable: true
    collapsible: true
    contextual: true

  hierarchy-tree:
    nesting: true
    reorder: true
    selectable: true
    collapsible-groups: true

  property-group:
    collapsible: true
    density: compact

  property-row:
    label: left
    control: right

  toolbar:
    grouped: true
    density: compact

  icon-button:
    states:
      - default
      - hover
      - active
      - disabled

  canvas:
    pan: true
    zoom: true
    selection: true

  context-menu:
    contextual: true

  command-menu:
    searchable: true

  tabs:
    compact: true

  breadcrumb:
    contextual: true
```

---

## 13. États obligatoires

Chaque composant interactif doit prévoir au minimum :

```text
default
hover
active
focus
selected
disabled
```

Les éléments chargés depuis le backend doivent également prévoir :

```text
loading
empty
error
```

---

## 14. Responsive

Cette interface est d'abord pensée pour desktop.

```yaml
breakpoints:

  desktop-large:
    left-panel: expanded
    right-panel: expanded
    toolbar: full

  desktop:
    left-panel: expanded
    right-panel: expanded-or-compact

  tablet:
    left-panel: overlay
    right-panel: overlay
    toolbar: compact

  mobile:
    canvas-tools: contextual
    panels: sheets
```

Ne pas essayer de reproduire exactement le desktop sur téléphone.

Le mobile doit conserver les mêmes concepts, mais avec une composition adaptée.

---

## 15. Animations de l'interface

Figma sert ici principalement de référence de workspace, pas de moteur d'animation.

Les animations doivent rester discrètes :

```yaml
motion:
  panel-open:
    duration: 160ms
    easing: ease-out

  panel-close:
    duration: 120ms
    easing: ease-in

  hover:
    duration: 100ms

  selection:
    duration: 100ms

  menu:
    duration: 120ms
```

Ne pas ajouter des animations décoratives à chaque interaction.

La référence **Rive** sera utilisée séparément pour définir :

- timeline ;
- keyframes ;
- animation ;
- lecture ;
- transitions ;
- séquences narratives ;
- états animés.

---

## 16. Adaptation spécifique à Scenariom

Figma manipule principalement des objets graphiques.

Scenariom manipule des **objets narratifs**.

La métaphore doit donc être adaptée.

```text
Figma                    Scenariom

Frame                 →  Groupe / scène / zone
Layer                 →  Élément narratif
Component             →  Modèle réutilisable
Asset                 →  Ressource
Page                  →  Espace / partie du projet
Properties            →  Propriétés narratives
Prototype connection  →  Relation / transition
Canvas                →  Espace de construction
```

Cette correspondance est une inspiration, pas une obligation métier.

---

## 17. Ce qu'il ne faut PAS copier de Figma

Ne pas copier automatiquement :

- le branding Figma ;
- les couleurs Figma ;
- les icônes propriétaires ;
- la typographie propriétaire ;
- les noms exacts des outils ;
- l'organisation métier exacte ;
- toutes les fonctionnalités de Figma.

Le but est de reprendre les principes qui rendent un grand espace de création clair et utilisable.

---

## 18. Règles pour un agent IA

Lorsqu'un agent utilise ce fichier pour générer l'interface :

1. Construire d'abord un **workspace**, pas une page marketing.
2. Donner la majorité de l'espace au canvas.
3. Utiliser une navigation structurée à gauche.
4. Utiliser un panneau de propriétés contextuel à droite.
5. Garder la toolbar compacte.
6. Rendre les panneaux redimensionnables et réductibles.
7. Ne montrer que les propriétés utiles à la sélection.
8. Utiliser les tokens Scenariom pour les couleurs.
9. Ne pas copier la palette Figma.
10. Prévoir light et dark mode.
11. Prévoir les états hover, focus, selected, disabled, loading, empty et error.
12. Garder les composants compatibles avec un système de design tokens partagé Web / Expo.
13. Ne pas coder les couleurs directement dans les composants si un token sémantique existe.
14. Préserver une architecture extensible : les futurs outils doivent pouvoir être ajoutés sans refaire le shell.

---

## 19. Résumé visuel

```text
                 SCENARIOM CREATOR

┌──────────────────────────────────────────────────────────────┐
│ Project                                         Preview / …  │
├───────────┬────────────────────────────────────┬─────────────┤
│           │                                    │             │
│ Structure │                                    │ Properties  │
│           │                                    │             │
│ Story     │                                    │ Character   │
│ Chapters  │              CANVAS                │ Name        │
│ Scenes    │                                    │ State       │
│           │                                    │ Relations   │
│ Entities  │                                    │             │
│ ├ Person  │                                    │             │
│ ├ Places  │                                    │             │
│ └ Events  │                                    │             │
│           │                                    │             │
│ Assets    │       [ select text link ... ]     │             │
└───────────┴────────────────────────────────────┴─────────────┘

          contenu au centre, outils autour
```

---

## 20. Principe final

> **Figma est une référence pour la manière d'organiser un espace de création, pas pour définir l'apparence de Scenariom.**

Le shell doit être suffisamment stable pour accueillir progressivement :

- canvas narratif ;
- éditeur de texte ;
- relations ;
- timeline ;
- animation ;
- prévisualisation ;
- collaboration ;
- outils futurs.

Les fonctionnalités peuvent arriver progressivement sans obliger à reconstruire l'architecture visuelle du Creator.
