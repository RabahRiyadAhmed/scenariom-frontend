# Scenariom — Guide simple du design et des thèmes

## 1. Objectif

Scenariom ne doit pas copier l'identité visuelle d'Adobe, Figma, Rive ou d'un autre site.

Les fichiers présents dans `template/` servent uniquement de **références de structure, d'UX et de mise en page** pour aider un développeur ou un agent IA à construire les interfaces.

L'identité visuelle utilisée par défaut reste celle de **Scenariom**.

---

## 2. Références de design

Les fichiers de référence sont placés à côté de ce document :

```text
template/
├── adobe.md
├── figma-editor-scenariom.design.md
├── rive-editor-scenariom.design.md
├── obsidian.md
└── ...
```

Ces fichiers peuvent être des `DESIGN.md` récupérés depuis des références externes.

### Site public Scenariom

Pour les pages liées directement à Scenariom :

- Home
- Présentation
- Tarifs
- Informations
- Marketplace
- Connexion / inscription
- autres pages institutionnelles

La première référence recommandée est :

```text
template/adobe.md
```

Adobe sert principalement de référence pour :

- la structure de la Home ;
- l'organisation des sections ;
- la présentation visuelle des fonctionnalités ;
- les grandes cartes et zones de contenu.

**Ne pas reprendre les couleurs Adobe.**

---

## 3. Interface de création

L'espace de création n'a pas les mêmes besoins que la Home.

Références principales :

```text
template/figma-editor-scenariom.design.md
template/rive-editor-scenariom.design.md
template/obsidian.md
```

### Figma / Rive

À utiliser comme inspiration pour :

- canvas ;
- panneaux latéraux ;
- outils ;
- propriétés ;
- organisation visuelle ;
- fenêtres de travail ;
- manipulation d'éléments.

### Obsidian

À utiliser comme inspiration pour :

- édition de texte ;
- notes ;
- navigation entre contenus ;
- liens entre éléments ;
- organisation d'informations narratives.

Il ne faut pas reproduire exactement ces applications. Elles servent de références pour construire une interface adaptée à Scenariom.

---

## 4. Identité visuelle Scenariom

Même lorsqu'une interface utilise Adobe, Figma, Rive ou Obsidian comme référence, **les couleurs de ces produits ne deviennent jamais les couleurs de Scenariom**.

Palette de référence :

| Rôle | Couleur | Valeur |
|---|---|---|
| Bleu principal | Bleu Scenariom | `#1E3A8A` |
| Accent créatif | Violet | `#6D28D9` |
| Accent spécial | Doré | `#D4AF37` |
| Fond clair | Blanc cassé | `#F8FAFC` |
| Texte clair | Gris très foncé | `#111827` |
| Secondaire / métal | Gris argenté | `#9CA3AF` |

Le **bleu** représente principalement Scenariom.

Le **violet** peut être utilisé pour la création, les outils créatifs, les états spéciaux et certains accents.

L'**argenté** accompagne directement l'identité du logo.

Le **doré** est un accent exceptionnel. Il ne doit pas devenir une couleur dominante.

Un dégradé bleu → violet peut être utilisé ponctuellement :

```text
#1E3A8A → #6D28D9
```

---

## 5. Dark mode Scenariom

Palette de départ :

| Token | Valeur | Usage |
|---|---|---|
| `background` | `#0F1420` | fond général |
| `surface` | `#171E2E` | navbar / sidebar |
| `card` | `#20293A` | cartes / panneaux |
| `border` | `#303A4D` | séparateurs |
| `primary` | `#3B5CCC` | actions principales |
| `accent` | `#7C3AED` | création / sélection |
| `foreground` | `#F1F5F9` | texte principal |
| `muted` | `#A8B3C5` | texte secondaire |
| `disabled` | `#667085` | éléments désactivés |

Éviter le noir pur et éviter d'utiliser `#FFFFFF` partout pour le texte.

---

## 6. Design tokens partagés

Le Web et l'application Expo ne doivent pas obligatoirement partager les mêmes composants.

Ils doivent partager **les mêmes concepts et valeurs de design**.

Exemple :

```text
packages/
└── design-system/
    ├── tokens/
    │   ├── base.json
    │   ├── light.json
    │   └── dark.json
    ├── themes/
    ├── schemas/
    └── adapters/
        ├── web.ts
        └── native.ts
```

Exemple simplifié :

```json
{
  "colors": {
    "primary": "#1E3A8A",
    "accent": "#6D28D9",
    "background": "#F8FAFC",
    "text": "#111827",
    "metal": "#9CA3AF",
    "gold": "#D4AF37"
  },
  "radius": {
    "sm": 6,
    "md": 10,
    "lg": 16
  },
  "spacing": {
    "sm": 8,
    "md": 16,
    "lg": 24
  }
}
```

Ces données constituent la source de vérité.

Le Web peut les adapter à Tailwind.

Expo / React Native peut les adapter à NativeWind ou à son système de styles.

---

## 7. Ne pas partager de force tous les composants

Il est acceptable d'avoir :

```text
packages/
├── ui-web/
│   └── Button.tsx
│
└── ui-native/
    └── Button.tsx
```

Les implémentations sont différentes, mais elles utilisent les mêmes tokens :

```text
primary
accent
background
surface
foreground
border
radius-md
spacing-md
```

Le but est d'unifier le **design system**, pas de forcer React Web et React Native à utiliser exactement le même code.

---

## 8. Thèmes des univers créés

Il faut distinguer l'identité de Scenariom de l'identité d'un univers créé avec Scenariom.

```text
SCENARIOM
├── Site public
│   └── identité Scenariom
│
├── Outils de création
│   └── identité Scenariom + interface de travail
│
└── Univers / expérience
    └── identité choisie par le créateur
```

Un univers cyberpunk ne doit pas être obligé d'utiliser le bleu Scenariom.

Une histoire des années 60 peut utiliser une palette rétro.

Un univers fantasy peut utiliser des couleurs, typographies et composants totalement différents.

Les couleurs Scenariom sont donc la référence pour **le produit Scenariom**, pas une contrainte imposée aux créations des utilisateurs.

---

## 9. Règle pour les agents IA

Lorsqu'un agent IA reçoit ce document avec un fichier de `template/`, il doit suivre cette règle :

> Utiliser le fichier `template/*.md` comme référence de structure, de composition et d'UX. Ne pas copier automatiquement son identité de marque ni sa palette de couleurs. Pour les interfaces appartenant à Scenariom, utiliser en priorité les design tokens et les couleurs définis dans ce document. Adapter la référence au produit Scenariom plutôt que reproduire le site source.

Par exemple :

```text
template/adobe.md
        +
SCENARIOM_DESIGN.md
        ↓
Home Scenariom

Structure inspirée d'Adobe
+
Identité visuelle Scenariom
```

Même principe pour l'espace de création :

```text
figma-editor-scenariom.design.md + rive-editor-scenariom.design.md + obsidian.md
                +
       SCENARIOM_DESIGN.md
                ↓
       Creator Scenariom
```

---

## 10. Principe à conserver

**Référence ≠ identité.**

Adobe, Figma, Rive, Obsidian et les futurs fichiers présents dans `template/` expliquent comment certaines interfaces résolvent des problèmes de design.

Scenariom conserve sa propre identité.

Les univers créés dans Scenariom peuvent ensuite dépasser complètement cette identité afin que le lecteur soit immergé dans l'univers du créateur.
