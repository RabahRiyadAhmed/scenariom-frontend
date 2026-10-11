# Spécification : éditeur d’assets bouton SVG

## 1. Constats — pourquoi on ne peut pas découper n’importe quel SVG

Les assets actuels (`btn_circle_*.svg`, `btn_square_wax-seal_*.svg`) sont dessinés comme des objets complets :

* **Gradients radiaux / linéaires** qui ne peuvent pas être étirés horizontalement sans casser la lumière.
* **Bordures continues** qui n’ont pas de bandes latérales propres (ex. le sceau en cire a des pointes jusqu’à ~20 px du bord sur 128 px).
* **Ornements centraux** qui font partie du design et qu’on ne peut pas répéter.

Transformer un tel SVG en bouton rectangulaire par découpe naive produit :

* des caps qui répètent l’ornement central,
* un centre qui devient un rectangle plat non lié au SVG,
* des discontinuités de dégradé.

**Conclusion :** la vraie solution n’est pas un algorithme de découpe automatique, mais un **éditeur de métadonnées** associé à chaque asset SVG. L’éditeur permet au créateur de définir comment l’image doit devenir un bouton.

---

## 2. Modes de redimensionnement (`resizeMode`)

| Mode | Quand l’utiliser | Comportement |
|------|------------------|--------------|
| `uniform` | Objet rond / carré décoratif avec ornement central unique (ex. Aurora, Wax Seal). | L’image garde ses proportions. Le label est positionné dans une `contentArea` définie. Pas d’étirement. |
| `stretch` | Texture, dégradé ou motif continu (ex. gradient forest). | L’image est étirée sur toute la surface du bouton avec `preserveAspectRatio="none"`. |
| `horizontal-slice` | Bordures latérales décoratives + centre extensible horizontal (ex. Notched navy). | `leftCap` + `center` + `rightCap`. Le centre est une zone du SVG elle-même, pas une couleur manuelle. |
| `vertical-slice` | Même idée, selon l’axe vertical. | `topCap` + `center` + `bottomCap`. |
| `nine-slice` | Coins fixes + bords extensibles + centre extensible (ex. cadre avec coins ornés). | Découpe en 9 zones : 4 coins, 4 bords, 1 centre. |
| `decorated-center` | Asset avec un ornement central qu’on veut garder, mais un cadre extensible. | Cadre découpé (`horizontal-slice` ou `nine-slice`) + couche centrale affichée une seule fois, non étirée. |

> **Important :** un asset circulaire ne peut pas devenir `horizontal-slice` si ses bords ne contiennent pas de zone décorative propre. Il doit rester `uniform` ou `decorated-center` (si un cadre distinct existe).

---

## 3. Format de métadonnées (`ButtonAssetMeta`)

Stocké côté backend dans la table `themes` ou une nouvelle table `theme_button_assets`, et servi par la gateway.

```ts
interface ButtonAssetMeta {
  id: string;
  name: string;
  sourceFile: string;            // ex. "btn_notched-corner_flat-navy_01_01.svg"
  sourceWidth: number;          // ex. 128
  sourceHeight: number;         // ex. 128
  resizeMode: "uniform" | "stretch" | "horizontal-slice" | "vertical-slice" | "nine-slice" | "decorated-center";

  // Pour uniform / stretch
  contentArea?: { x: number; y: number; width: number; height: number };

  // Pour horizontal-slice
  horizontal?: {
    leftCap: number;              // largeur fixe à gauche, en px source
    centerStart: number;          // début de la zone centrale
    centerEnd: number;          // fin de la zone centrale
    rightCap: number;           // largeur fixe à droite, en px source
    contentPadding?: { left: number; right: number };
  };

  // Pour vertical-slice
  vertical?: {
    topCap: number;
    centerStart: number;
    centerEnd: number;
    bottomCap: number;
    contentPadding?: { top: number; bottom: number };
  };

  // Pour nine-slice
  nineSlice?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  // Pour decorated-center
  decoratedCenter?: {
    frame: "horizontal" | "nine";   // mode du cadre
    emblem: { x: number; y: number; width: number; height: number }; // zone centrale unique
    emblemPlacement: "center" | "stretch"; // center = taille fixe, stretch = étiré
  };

  // Styling additionnel
  defaultHeight?: number;         // hauteur par défaut du bouton
  minWidth?: number;
  maxWidth?: number;
  textStyle?: {
    color: string;
    shadow?: { color: string; radius: number; offset: { x: number; y: number } };
    align: "left" | "center" | "right";
  };

  // États
  hover?: { brightness?: number; overlay?: string; scale?: number };
  active?: { brightness?: number; overlay?: string; scale?: number };
  disabled?: { brightness?: number; overlay?: string; opacity?: number };
}
```

---

## 4. Architecture du pipeline

```
Designer / Admin
      │
      ▼
+-----------------------------------+
|  Back-office : éditeur d’assets    |
|  - upload SVG                      |
|  - choix du resizeMode             |
|  - placement des zones (visuel)    |
|  - prévisualisation live web       |
+-----------------------------------+
      │
      ▼
+-----------------------------------+
|  scenariom-back : DB + fichiers     |
|  - table theme_button_assets       |
|  - fichiers dans public/assets/... |
+-----------------------------------+
      │
      ▼
+-----------------------------------+
|  scenariom-gateway : proxy assets   |
|  /api/assets/custom/button/:file   |
|  /api/theme/assets                 |
+-----------------------------------+
      │
      ▼
+-----------------------------------+
|  Expo / Next                        |
|  - reçoit ButtonAssetMeta JSON     |
|  - télécharge le SVG via gateway   |
|  - rend selon resizeMode           |
+-----------------------------------+
```

---

## 5. Stratégies de rendu côté client

### 5.1 `uniform`

* Afficher le SVG entier dans une boîte de la taille souhaitée (généralement carrée).
* Positionner le texte dans `contentArea` (en px source, scalable).
* Pas de découpe.

### 5.2 `stretch`

* Afficher le SVG avec `preserveAspectRatio="none"`.
* Le texte est centré.

### 5.3 `horizontal-slice`

*Découpe réelle des zones du SVG source, jamais de rectangle de remplacement.*

Pour chaque bouton de largeur `W` et hauteur `H` :

```
renderedLeftCap  = H * (leftCap / sourceHeight)   // conserve le ratio source
renderedRightCap = H * (rightCap / sourceHeight)
centerWidth      = W - renderedLeftCap - renderedRightCap
```

Le client affiche trois couches :

1. Left cap : crop source `[0, 0, leftCap, sourceHeight]` → taille `renderedLeftCap × H`.
2. Center : crop source `[centerStart, 0, centerEnd - centerStart, sourceHeight]` → taille `centerWidth × H`, étiré horizontalement (`preserveAspectRatio="none"`).
3. Right cap : crop source `[sourceWidth - rightCap, 0, rightCap, sourceHeight]` → taille `renderedRightCap × H`.

Le texte est inséré au centre avec un padding horizontal `contentPadding`.

### 5.4 `nine-slice`

*Découpe en 9 zones réelles.*

Les coins gardent leur aspect ratio. Les bords s’étirent selon un seul axe. Le centre s’étire sur les deux axes.

```
rows    = top, middleV, bottom
columns = left, middleH, right
```

### 5.5 `decorated-center`

* Cadre rendu avec `horizontal-slice` ou `nine-slice`.
* Emblème rendu une seule fois, centré (ou étiré si `emblemPlacement === "stretch"`), par-dessus le centre.
* Texte par-dessus l’emblème si nécessaire.

---

## 6. UX de l’éditeur (proposition minimale)

### Étape 1 — Upload et aperçu

* Glisser-déposer du SVG.
* Aperçu natif 128 × 128 + zoom.

### Étape 2 — Choisir le mode

* Boutons radio : `uniform`, `stretch`, `horizontal-slice`, `nine-slice`, `decorated-center`.
* Désactiver les modes impossibles selon la géométrie (ex. pas de `horizontal-slice` si l’ornement touche les bords).

### Étape 3 — Placer les guides

* Pour `horizontal-slice` : lignes verticales draggable à gauche et à droite, ligne de début/fin de centre.
* Pour `nine-slice` : rectangle de découpe draggable avec 4 poignées.
* Pour `decorated-center` : rectangle de sélection de l’emblème.

### Étape 4 — Définir la zone de texte

* Rectangle draggable représentant la `contentArea`.
* Aperçu du label « Continuer » à différentes tailles.

### Étape 5 — Tester à plusieurs dimensions

* Prévisualisation instantanée en 128×48, 200×48, 300×64, 400×72.
* Basculer LTR / RTL.
* Tester hover, active, disabled.

### Étape 6 — Sauvegarder

* JSON `ButtonAssetMeta` stocké.
* Fichier SVG conservé inchangé.

---

## 7. Cas d’usage actuels

| Asset | Mode recommandé | Justification |
|-------|-----------------|---------------|
| `btn_circle_aurora-glass_01_01.svg` | `uniform` | Cercle avec dégradé radial et anneau décoratif. Pas de bande propre. |
| `btn_circle_blue-silver_02.svg` | `uniform` | Idem. |
| `btn_circle_pastel-coral_01.svg` | `uniform` | Idem. |
| `btn_notched-corner_flat-navy_01_01.svg` | `horizontal-slice` ou `nine-slice` | Forme octogonale symétrique avec bordure uniforme et centre plat. |
| `btn_square_wax-seal_01_01.svg` | `uniform` ou `decorated-center` (si on sépare cadre + sceau) | Le sceau central touche presque le cadre ; pas de caps propres. |
| `gr_forest-canopy_01.svg` | `stretch` | Texture / dégradé continu. |

---

## 8. POC immédiat

Pendant que l’éditeur n’existe pas, les assets circulaires doivent être présentés comme des **boutons carrés/uniformes** (image entière + label dans la zone de contenu). Seul `Notched navy` mérite le POC 9-slice, car c’est le seul asset géométriquement adapté.

La page `UiButton` doit donc d’abord reprendre l’organisation de `inertia-app/resources/js/Pages/Template/Buttons.tsx`, puis présenter les POCs custom en fin de page comme une section expérimentale.
