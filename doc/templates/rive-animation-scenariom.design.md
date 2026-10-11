# Rive Animation Layer — Complément du Figma Workspace pour Scenariom

> Ce fichier ne remplace PAS `figma-editor-scenariom.design.md`.
>
> **Figma + Rive doivent se compléter.**
>
> - Figma = organisation générale du workspace de création.
> - Rive = couche animation, timeline, séquences, états et pilotage temporel.
> - Obsidian = édition textuelle, notes et navigation narrative liée.
>
> L'interface Scenariom Creator est donc construite comme un seul produit cohérent :
>
> `Figma workspace + Rive animation layer + Obsidian text editing`

---

## 1. Rôle exact de Rive dans Scenariom

Rive possède lui aussi une interface de création avec Stage, Hierarchy, Inspector et Toolbar.

Scenariom ne doit PAS créer un deuxième workspace concurrent basé sur Rive.

La structure principale du Creator reste celle définie par :

```text
figma-editor-scenariom.design.md
```

Rive vient enrichir cette structure lorsqu'un contenu possède une dimension temporelle ou animée.

```text
FIGMA
│
├── organisation du projet
├── canvas
├── hiérarchie
├── sélection
├── propriétés
└── outils de création
        │
        ▼
      + RIVE
        │
        ├── timeline
        ├── playhead
        ├── tracks
        ├── keyframes
        ├── interpolation
        ├── playback
        ├── séquences
        ├── états
        └── transitions
```

Règle fondamentale :

> **Ne jamais demander à l'utilisateur de choisir entre un mode “Figma” et un mode “Rive”. Rive étend le workspace Figma lorsque l'animation ou le temps deviennent nécessaires.**

---

## 2. Architecture combinée

Workspace normal :

```text
┌──────────────────────────────────────────────────────────────────┐
│ Projet / contexte                                      Preview   │
├────────────┬─────────────────────────────────────────┬───────────┤
│            │                                         │           │
│ STRUCTURE  │                                         │ PROPRIÉTÉS│
│            │                 CANVAS                  │           │
│ Figma-like │                                         │ contextuel│
│ hierarchy  │                                         │           │
│            │                                         │           │
│            │          [ toolbar compacte ]           │           │
└────────────┴─────────────────────────────────────────┴───────────┘
```

Quand une animation ou une séquence est ouverte :

```text
┌──────────────────────────────────────────────────────────────────┐
│ Projet / contexte                            Preview   ▶ Play     │
├────────────┬─────────────────────────────────────────┬───────────┤
│            │                                         │           │
│ STRUCTURE  │                                         │ PROPRIÉTÉS│
│            │                 CANVAS                  │           │
│            │                                         │ animation │
│            │                                         │ sélection │
│            │                                         │           │
├────────────┴─────────────────────────────────────────┴───────────┤
│ ANIMATIONS │  0s     1s     2s     3s     4s                    │
│ Intro      │  │------◆-----------◆----------------               │
│ Dialogue   │  │----------◆-------------◆----------               │
│ Camera     │  │----◆-------------------------◆----               │
│ UI         │  │-------◆-------◆-------------------               │
│            │              ▲                                      │
│            │           PLAYHEAD                                   │
└──────────────────────────────────────────────────────────────────┘
```

La timeline **s'ajoute au workspace existant**.

Elle ne crée pas une nouvelle application.

---

## 3. Modes de travail

Rive distingue Design et Animate.

Scenariom reprend le principe, mais sans dupliquer inutilement le Design Mode puisque la création et l'organisation sont déjà couvertes par le workspace principal.

```yaml
creator-modes:

  create:
    base: figma-workspace
    purpose:
      - organize
      - create
      - position
      - connect
      - edit

  animate:
    base: figma-workspace
    adds:
      - animation-list
      - timeline
      - playhead
      - playback-controls
      - keyframes
      - interpolation
      - animation-properties
```

Le passage à Animate doit donc ressembler à une **extension du même écran**.

---

## 4. Timeline

La timeline est la contribution principale de Rive.

Elle apparaît depuis le bas du workspace lorsque le contexte nécessite du temps.

```yaml
timeline:

  position: bottom

  size:
    default-height: 280px
    min-height: 160px
    max-height: 60vh

  behavior:
    resizable: true
    collapsible: true
    zoomable: true
    pannable: true

  regions:
    - sequence-list
    - track-list
    - time-ruler
    - keyframe-area
    - playhead
    - playback-controls
```

La timeline ne doit pas être visible en permanence lorsqu'elle n'apporte rien.

---

## 5. Playhead et temps

Le playhead représente la position actuelle dans la séquence.

```yaml
playhead:
  draggable: true
  snap: true
  current-time-visible: true

time:
  display:
    - seconds
    - frames

  controls:
    - duration
    - playback-speed
    - snapping
```

Déplacer le playhead met immédiatement à jour le canvas.

```text
Timeline 00:04.20
        │
        ▼
Canvas affiche l'état exact de la scène à 00:04.20
```

---

## 6. Tracks

Chaque élément animé possède une ou plusieurs pistes.

Exemple générique :

```text
Character Emma
├── Position
├── Rotation
├── Opacity
└── Expression

Camera
├── Position
├── Zoom
└── Focus

Text
├── Opacity
├── Position
└── Reveal

Background
└── Parallax
```

Configuration :

```yaml
tracks:
  hierarchical: true
  collapsible: true
  reorderable: true

  filtering:
    - selected-only
    - animated-only
    - search
```

Quand une scène devient complexe, l'utilisateur doit pouvoir afficher seulement les éléments sélectionnés.

---

## 7. Keyframes

Une propriété animable peut recevoir des clés.

```text
Position X

0s        1s        2s        3s
◆-------------------◆
100                 500
```

Les clés doivent pouvoir être :

```yaml
keyframes:
  operations:
    - create
    - select
    - multi-select
    - move
    - copy
    - paste
    - delete
    - resize-selection

  visual-states:
    default: visible
    selected: highlighted
    collapsed-group: summarized
```

Modifier une propriété au niveau d'une clé met à jour le canvas.

Modifier directement un élément sur le canvas dans un contexte animé peut créer ou modifier une clé.

---

## 8. Interpolation / easing

Deux clés ne définissent pas uniquement deux valeurs.

Il faut également définir **comment le changement se produit entre elles**.

```text
A ◆────────────────◆ B

Linear
Ease In
Ease Out
Ease In Out
Custom
```

Configuration :

```yaml
interpolation:
  presets:
    - linear
    - ease-in
    - ease-out
    - ease-in-out

  custom-curve: true
  graph-editor: future
```

Pour Scenariom, c'est important pour obtenir des mouvements subtils plutôt que des changements brutaux.

---

## 9. Playback

La timeline possède ses propres contrôles de lecture.

```text
|◀   ◀   ▶/❚❚   ▶   ▶|
```

Minimum :

```yaml
playback:
  controls:
    - go-start
    - previous-key
    - play-pause
    - next-key
    - go-end

  modes:
    - one-shot
    - loop
    - ping-pong

  options:
    - speed
    - work-area
```

Le **work area** permet de lire uniquement une petite portion d'une longue séquence.

---

## 10. Séquences narratives

Scenariom ne manipule pas seulement des animations graphiques.

La timeline doit pouvoir représenter une **séquence narrative**.

Exemple :

```text
SCÈNE : Arrivée dans la ville

00:00 ───────────────────────────────────────── 00:12

Camera      ◆────────────◆─────────────◆
Background  ◆──────────────────────────◆
Emma        ─────◆──────────────◆───────
Dialogue    ─────────◆══════◆────────────
Music       ◆════════════════════════════
UI          ─────────────────────◆───────
```

Une séquence peut contenir :

```yaml
narrative-tracks:
  - character
  - camera
  - text
  - dialogue
  - image
  - audio
  - music
  - environment
  - ui
  - transition
  - event
```

Ce modèle doit rester extensible.

---

## 11. Animation subtile des pages

La timeline ne sert pas uniquement à fabriquer de grosses animations.

Elle peut aussi contrôler les petites transitions qui donnent de la vie aux pages.

Exemples :

```text
Titre
opacity 0 → 1
Y 12px → 0

Portrait
scale 0.98 → 1
opacity 0 → 1

Section suivante
translateX 24px → 0
opacity 0 → 1
```

Le but n'est pas de transformer chaque page en animation permanente.

Règle :

> **Le mouvement doit accompagner la narration et la navigation, pas distraire de la lecture.**

---

## 12. Presets simples au début

La première version ne doit pas obliger un utilisateur à comprendre les keyframes.

Prévoir des presets :

```yaml
motion-presets:

  fade:
    duration: 200ms

  slide-up:
    duration: 250ms

  slide-left:
    duration: 250ms

  scale-in:
    duration: 180ms

  narrative-reveal:
    duration: 350ms
```

Interface simple :

```text
Animation d'entrée

[ Fade ▼ ]

Durée
[ 250 ms ]

Délai
[ 0 ms ]

[ Aperçu ]
```

Le mode timeline avancé peut modifier le même système.

Ainsi :

```text
Utilisateur simple
      ↓
Preset
      ↓
mêmes données d'animation
      ↑
Timeline avancée
      ↑
Utilisateur expert
```

---

## 13. State Machine / logique interactive

Rive utilise des State Machines pour connecter des animations et définir les transitions entre états.

Ce principe est très intéressant pour Scenariom, mais il doit rester distinct de la timeline.

```text
TIMELINE
"Comment quelque chose évolue dans le temps"

STATE GRAPH
"Dans quel état sommes-nous et vers quel état pouvons-nous aller"
```

Exemple :

```text
            ┌─────────┐
            │  IDLE   │
            └────┬────┘
                 │ hover
                 ▼
            ┌─────────┐
            │ FOCUSED │
            └────┬────┘
                 │ click
                 ▼
            ┌─────────┐
            │ OPENED  │
            └─────────┘
```

Pour une narration interactive, cela pourrait plus tard servir à représenter :

```text
Scene A
  │
  ├── choix A → Scene B
  │
  └── choix B → Scene C
```

Mais ne pas confondre automatiquement **état d'animation** et **logique narrative métier**.

Le moteur narratif Scenariom doit rester maître de ses propres données.

---

## 14. Vue Graph

Lorsqu'une State Machine ou un système de transitions est sélectionné, le graph peut prendre la place de la timeline dans la zone inférieure ou centrale.

```text
┌──────────────────────────────────────────────┐
│                                              │
│      [Idle] ───────→ [Speaking]              │
│        ▲                  │                  │
│        │                  ▼                  │
│      [Exit] ←──────── [Reaction]             │
│                                              │
└──────────────────────────────────────────────┘
```

Configuration :

```yaml
state-graph:
  nodes: true
  transitions: true
  conditions: true
  inputs: true

  navigation:
    pan: true
    zoom: true

  inspector:
    contextual: true
```

Encore une fois, ce graph **s'intègre dans le Creator**.

Il ne devient pas une application séparée.

---

## 15. Inspector commun

Ne pas créer un Inspector “Figma” et un Inspector “Rive”.

Il doit rester **le même panneau droit contextuel**.

Exemple :

```text
Objet sélectionné
→ propriétés générales

Track sélectionnée
→ propriétés de la track

Keyframe sélectionnée
→ valeur
→ temps
→ interpolation

Animation sélectionnée
→ durée
→ playback
→ vitesse

Transition sélectionnée
→ condition
→ durée
→ easing

État sélectionné
→ animation
→ vitesse
→ comportement
```

Le contenu change.

Le panneau reste au même endroit.

---

## 16. Hierarchy commune

Même principe pour la navigation gauche.

Ne pas avoir :

```text
Figma Layers
+
Rive Hierarchy
```

comme deux systèmes concurrents.

Scenariom possède **une seule hiérarchie de projet**.

Elle peut simplement afficher des sous-éléments liés à l'animation.

```text
Scene 04
│
├── Emma
│   ├── Visual
│   └── Animations
│       ├── Enter
│       ├── Idle
│       └── Speak
│
├── Camera
├── Background
├── Dialogue
└── Music
```

---

## 17. Toolbar commune

Même règle.

Ne pas juxtaposer deux toolbars complètes.

La toolbar du workspace ajoute les outils nécessaires lorsque le contexte animation est actif.

```text
CREATE

[Select] [Move] │ [Text] [Character] [Event] [...]
```

devient :

```text
ANIMATE

[Select] [Move] │ [Key] [Curve] │ [Preview] [...]
```

Le shell ne bouge presque pas.

Les outils contextuels changent.

---

## 18. Preview

L'animation doit pouvoir être testée sans quitter l'éditeur.

```yaml
preview:
  modes:
    - current-canvas
    - isolated-scene
    - reader-preview

  controls:
    - play
    - pause
    - restart
    - fullscreen

  option:
    hide-editor-overlays: true
```

Le mode Preview doit masquer :

- sélection ;
- handles ;
- guides ;
- informations techniques ;

afin de montrer le résultat réel au lecteur.

---

## 19. Organisation Figma + Animation Rive

La relation correcte est :

```text
                    SCENARIOM CREATOR
                           │
             ┌─────────────┴─────────────┐
             │                           │
       ORGANISATION                  ÉDITION TEXTE
          FIGMA                        OBSIDIAN
             │                           │
             └─────────────┬─────────────┘
                           │
                        CONTENT
                           │
                           ▼
                         RIVE
                           │
                   TEMPS / ANIMATION
                           │
                ┌──────────┼──────────┐
                │          │          │
             Timeline   States    Preview
```

Mais visuellement, tout cela doit ressembler à **un seul logiciel**.

---

## 20. Données : ne pas enfermer l'animation dans l'UI

La timeline doit éditer des données structurées.

Exemple conceptuel :

```json
{
  "animation": {
    "id": "scene-intro",
    "duration": 4,
    "tracks": [
      {
        "target": "title",
        "property": "opacity",
        "keys": [
          { "time": 0, "value": 0 },
          { "time": 0.4, "value": 1, "easing": "ease-out" }
        ]
      }
    ]
  }
}
```

Ce JSON est un exemple de modèle conceptuel, pas un schéma définitif.

Le but est que :

- Web puisse l'interpréter ;
- Expo puisse l'interpréter ;
- Preview puisse l'interpréter ;
- l'éditeur puisse le modifier ;
- de futurs runtimes puissent l'utiliser.

---

## 21. Design tokens Scenariom

Rive ne définit pas les couleurs de l'application.

Utiliser le design system Scenariom.

### Light

```yaml
colors:
  primary: "#1E3A8A"
  accent: "#6D28D9"
  metallic: "#9CA3AF"
  gold: "#D4AF37"

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
```

La timeline doit elle aussi utiliser des tokens sémantiques :

```yaml
timeline-tokens:
  background: "{surface}"
  ruler: "{muted}"
  playhead: "{primary}"
  key-default: "{metallic}"
  key-selected: "{primary}"
  active-track: "{accent}"
  border: "{border}"
```

---

## 22. Première version recommandée

Ne pas essayer de reproduire Rive entièrement dès le départ.

### V1

```text
✓ timeline ouvrable/réductible
✓ play / pause
✓ playhead
✓ durée
✓ tracks
✓ keyframes simples
✓ déplacement de keyframes
✓ opacity
✓ position
✓ scale
✓ quelques easing
✓ presets fade / slide / scale
✓ preview
```

### Ensuite

```text
+ multi-selection de keys
+ work areas
+ graph editor
+ state graph
+ conditions
+ blend
+ événements
+ audio avancé
+ animation de propriétés narratives supplémentaires
```

L'architecture doit cependant prévoir ces ajouts dès le début.

---

## 23. Ce qu'il ne faut PAS faire

### Mauvais

```text
[ Figma Editor ]
       OU
[ Rive Editor ]
```

### Mauvais

```text
Bouton "ouvrir Rive mode"
→ nouvelle interface
→ nouvelle hierarchy
→ nouvel inspector
→ nouveaux concepts
```

### Correct

```text
Workspace Scenariom
       │
       ├── organisation Figma-like
       ├── texte Obsidian-like
       │
       └── lorsque nécessaire
              ↓
          outils Rive-like
          timeline
          animation
          states
```

---

## 24. Règles pour l'agent IA

Lorsqu'un agent utilise ce fichier :

1. Lire d'abord `figma-editor-scenariom.design.md`.
2. Considérer ce fichier Rive comme une **extension** de cette architecture.
3. Ne jamais remplacer le workspace Figma par un workspace Rive.
4. Ne jamais créer deux systèmes de navigation concurrents.
5. Conserver le même Inspector contextuel.
6. Conserver la même hiérarchie de projet.
7. Ajouter la timeline depuis le bas lorsque nécessaire.
8. Adapter la toolbar au contexte Animate.
9. Faire apparaître les keyframes uniquement pour les propriétés animées.
10. Mettre à jour le canvas lorsque le playhead change.
11. Permettre de manipuler les clés depuis la timeline.
12. Prévoir presets simples et édition avancée sur les mêmes données.
13. Prévoir Preview sans overlays d'édition.
14. Utiliser les couleurs et tokens Scenariom, pas le branding Rive.
15. Garder l'animation sérialisable et indépendante du composant React.
16. Prévoir que Web et Expo puissent interpréter le même modèle d'animation.
17. Ajouter les fonctionnalités progressivement sans reconstruire le shell.

---

## 25. Principe final

> **Figma organise l'espace de création. Rive apporte le temps, le mouvement et le pilotage. Obsidian apporte l'écriture et les liens narratifs.**

Ils ne sont pas trois interfaces concurrentes.

Ils constituent trois références complémentaires pour construire **une seule interface Scenariom Creator**.

```text
FIGMA
structure + canvas + organisation
              │
              ▼
        SCENARIOM CREATOR
              ▲
              │
RIVE ─────────┼──────── OBSIDIAN
temps         │         texte
animation     │         notes
states        │         liens
timeline      │         écriture
```

La base reste stable.

Chaque nouvelle version peut ensuite enrichir cette base avec de nouveaux outils de narration, d'animation et d'interaction sans casser l'organisation générale.
