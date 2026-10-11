# Scenariom — Structure des pages et espace Creator

## Objectif

Ce document explique la différence entre **Home**, **Projets**, **Organisation** et **Éditeur**.

Les fichiers de `template/` sont des références UX/visuelles :

```text
template/
├── adobe.md
├── figma.md
├── rive.md
├── obsidian.md
└── ...
```

Ils ne remplacent pas l'identité Scenariom.

---

# 1. Home — Présenter Scenariom

Référence principale :

```text
template/adobe.md
```

Utiliser Adobe pour la logique de présentation : grandes sections, cartes, démonstrations visuelles et mise en avant progressive des outils.

Le contenu doit cependant présenter **Scenariom**.

La Home doit montrer que Scenariom permet de construire un univers narratif complet :

- histoires ;
- chapitres ;
- scènes ;
- personnages ;
- lieux ;
- objets ;
- relations ;
- timeline ;
- wiki ;
- écriture ;
- narration interactive ;
- outils de mise en scène.

Exemple :

```text
HOME

Hero
│
├── Présentation de Scenariom
├── Construire son univers
├── Organiser son histoire
├── Écrire
├── Relier personnages / lieux / événements
├── Mettre en scène
└── CTA : créer ou ouvrir un projet
```

La Home ne doit pas donner l'impression que Scenariom est seulement un éditeur de texte.

---

# 2. Projets — Les vrais projets de l'utilisateur

La page **Projets** sert à afficher les univers/projets Scenariom.

Exemple :

```text
MES PROJETS

[ Les Cités de Verre ]
[ Signal Zéro        ]
[ Le Jardin d'Ambre  ]

+ Nouveau projet
```

Elle sert à :

- créer un projet ;
- ouvrir un projet ;
- rechercher ;
- afficher les projets récents ;
- gérer/archiver un projet.

## Important

**Projets ≠ Organisation.**

Un projet est le conteneur général :

```text
PROJET : Les Cités de Verre
│
├── Dashboard
├── Organisation
├── Écriture
├── Personnages
├── Lieux
├── Relations
├── Timeline
├── Wiki
└── autres outils
```

---

# 3. Espace Projet — Le vrai workspace Creator

Une fois un projet ouvert, l'utilisateur entre dans un espace de création.

Références :

```text
template/figma.md
template/rive.md
```

Reprendre surtout leur logique d'application de création :

```text
┌─────────────────────────────────────────────────────────┐
│ Les Cités de Verre                         Aperçu       │
├──────────────┬────────────────────────────┬─────────────┤
│ Navigation   │                            │ Propriétés  │
│              │      ESPACE DE TRAVAIL     │             │
│ Dashboard    │                            │ contexte de │
│ Organisation │                            │ la sélection│
│ Écriture     │                            │             │
│ Personnages  │                            │             │
│ Lieux        │                            │             │
│ Relations    │                            │             │
│ Timeline     │                            │             │
│ Wiki         │                            │             │
└──────────────┴────────────────────────────┴─────────────┘
```

La zone centrale change selon l'outil sélectionné.

Le panneau de droite affiche les propriétés de l'élément actuellement sélectionné.

Il faut avoir la sensation d'utiliser un **logiciel de création**, pas une succession de pages/formulaires indépendants.

---

# 4. Organisation — Organisation de l'histoire

C'est ici que la première proposition avait mal interprété le terme.

**Organisation ne sert PAS à organiser les projets.**

Organisation est un outil situé **dans un projet**.

Il sert à organiser la structure narrative.

Exemple classique :

```text
Histoire
│
├── Chapitre I
│   ├── Scène 01
│   ├── Scène 02
│   └── Scène 03
│
└── Chapitre II
    ├── Scène 04
    └── Scène 05
```

Mais cette structure ne doit pas être imposée.

Le créateur peut décider d'utiliser :

```text
Arc
└── Chapitre
    └── Scène
```

ou :

```text
Acte
└── Séquence
    └── Scène
```

ou une autre structure adaptée à son histoire.

## Interface Organisation

S'inspirer de Figma/Rive pour permettre une organisation visuelle :

- arborescence ;
- cartes/nœuds ;
- groupes ;
- drag & drop ;
- réorganisation ;
- relations éventuelles ;
- sélection ;
- panneau de propriétés ;
- canvas/zoom lorsque nécessaire.

Exemple :

```text
┌──────────────┬─────────────────────────────┬──────────────┐
│ STRUCTURE    │       ORGANISATION          │ PROPRIÉTÉS   │
│              │                             │              │
│ Chapitre I   │       [Chapitre I]          │ Nom          │
│ ├ Scène 01   │          │                  │ Type         │
│ ├ Scène 02   │          ├── [Scène 01]     │ Notes        │
│ └ Scène 03   │          ├── [Scène 02]     │ Relations    │
│              │          └── [Scène 03]     │              │
│ Chapitre II  │                             │              │
└──────────────┴─────────────────────────────┴──────────────┘
```

La page Organisation est donc une **vue de structure du récit**, pas une grille des projets.

---

# 5. Éditeur — Modifier un élément précis

La page d'édition montrée actuellement est correcte comme idée, mais elle représente un niveau plus détaillé.

Flux :

```text
Projet
  ↓
Organisation
  ↓
Chapitre I
  ↓
Scène 02
  ↓
ÉDITEUR
```

L'éditeur sert à travailler sur la scène ou l'élément sélectionné.

Référence textuelle :

```text
template/obsidian.md
```

Exemple :

```text
┌──────────────┬─────────────────────────────┬──────────────┐
│ STRUCTURE    │ ÉDITION                     │ PROPRIÉTÉS   │
│              │                             │              │
│ Chapitre I   │ SCÈNE 02                    │ Point de vue │
│ 01 Arrivée   │                             │ Ambiance     │
│ 02 La porte  │ La porte sous la ville      │ Tags         │
│ 03 Le choix  │                             │ Notes        │
│              │ Texte de la scène...        │ Relations    │
└──────────────┴─────────────────────────────┴──────────────┘
```

Obsidian sert de référence pour :

- écriture ;
- navigation liée ;
- notes ;
- informations connectées ;
- liens entre éléments.

L'éditeur n'est cependant qu'un outil parmi les outils du projet.

---

# 6. Canvas et outils visuels

Pour les parties qui nécessitent de manipuler visuellement des éléments, utiliser davantage :

```text
template/figma.md
template/rive.md
```

Cela concerne notamment :

- organisation narrative complexe ;
- relations entre personnages ;
- branches narratives ;
- mise en scène ;
- interactions ;
- autres systèmes visuels.

Principe :

```text
OUTILS / STRUCTURE       CANVAS            PROPRIÉTÉS
        │                   │                   │
        └──── sélection / manipulation ─────────┘
```

---

# 7. Hiérarchie générale

```text
SCENARIOM
│
├── HOME
│   └── présentation du produit
│
├── PROJETS
│   ├── Projet A
│   ├── Projet B
│   └── Projet C
│
└── PROJET OUVERT
    │
    ├── Dashboard
    │
    ├── Organisation
    │   └── structure libre de l'histoire
    │
    ├── Écriture / Éditeur
    │   └── travail détaillé sur un élément
    │
    ├── Personnages
    ├── Lieux
    ├── Relations
    ├── Timeline
    ├── Wiki
    └── autres outils
```

À retenir :

```text
PROJETS
= choisir quel projet/univers ouvrir

ORGANISATION
= organiser le contenu narratif À L'INTÉRIEUR du projet

ÉDITEUR
= travailler précisément sur un élément sélectionné
```

---

# 8. Identité Scenariom

Les références Adobe/Figma/Rive/Obsidian ne doivent pas remplacer les couleurs Scenariom.

```text
Bleu Scenariom       #1E3A8A
Violet créatif       #6D28D9
Argent / gris        #9CA3AF
Blanc cassé          #F8FAFC
Gris très foncé      #111827
Doré optionnel       #D4AF37
```

Dark mode :

```text
Background           #0F1420
Surface              #171E2E
Card                 #20293A
Border               #303A4D
Primary              #3B5CCC
Accent               #7C3AED
Text                 #F1F5F9
Secondary            #A8B3C5
Disabled             #667085
```

Le bleu et l'argent/gris restent les références principales de l'identité Scenariom.

Le violet sert surtout d'accent créatif.

Le doré reste exceptionnel.

---

# 9. Instruction pour l'agent IA

> Construire Scenariom comme une vraie application de création. Utiliser `template/adobe.md` comme référence pour la présentation de la Home, `template/figma.md` et `template/rive.md` pour les espaces de travail visuels, et `template/obsidian.md` pour l'édition textuelle. Conserver le design system et les couleurs Scenariom. Ne jamais confondre **Projets** avec **Organisation** : Projets liste les univers/projets de l'utilisateur ; Organisation est un outil à l'intérieur d'un projet permettant au créateur de structurer librement son histoire. L'Éditeur sert ensuite à travailler en détail sur un élément sélectionné.
