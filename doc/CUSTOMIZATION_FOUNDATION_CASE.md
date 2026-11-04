# Personnalisation Scenariom — décision de cadrage et premier cas vertical

## Statut

Décision de cadrage avant implémentation. Ce document fixe le vocabulaire, les limites et le
premier cas vertical final. L'étape préalable obligatoire est définie dans
`COMPONENT_CUSTOMIZATION_AUDIT.md` : aucun modèle BDD de personnalisation ne doit être ajouté
avant d'avoir stabilisé les capacités réelles des primitives et prouvé la parité de `Button`.
Ce document complète `CROSS_PLATFORM_CUSTOMIZATION_PLAN.md` sans affirmer que les modèles, API
ou éditeurs décrits ici existent déjà.

## Vision produit

Scenariom possède deux interfaces visuelles distinctes :

1. **l'outil Scenariom**, utilisé pour créer et administrer un projet narratif ;
2. **l'expérience du projet**, dont l'apparence est choisie par son créateur pour immerger le
   lecteur ou le participant dans son univers.

La personnalisation concerne d'abord l'expérience du projet. Elle ne doit pas rendre
l'interface d'administration illisible ni permettre l'exécution de code fourni par un
utilisateur.

## Les trois axes

### Axe 1 — éditeur d'assets et de définitions

Une application desktop pourra être réalisée en C++ avec Qt. Qt fournit l'interface de
l'éditeur, les outils de manipulation et la prévisualisation. Le format produit par l'éditeur
reste indépendant de Qt : assets contrôlés et documents JSON versionnés.

L'éditeur doit pouvoir, par étapes :

- importer, afficher et manipuler un SVG ;
- définir ses zones sûres, ses découpes et son mode de redimensionnement ;
- associer l'asset à une primitive Scenariom, par exemple un bouton ou une carte ;
- prévisualiser les états et plusieurs tailles d'écran ;
- valider puis envoyer le fichier et sa définition au backend.

La création vectorielle complète est un objectif ultérieur. Le premier incrément est un
éditeur de métadonnées géométriques autour d'un SVG existant. Ce choix permet de valider le
pipeline avant de construire un outil de dessin comparable à un logiciel spécialisé.

### Axe 2 — moteurs de rendu Next et Expo

Next.js et Expo consomment le même contrat validé, mais utilisent chacun un renderer adapté à
leur plateforme. La parité recherchée est sémantique et fonctionnelle, pas pixel-perfect.

Trois niveaux sont retenus :

- **standard** : tokens, typographie, espacements, couleurs, fonds et presets de primitives ;
- **déclaratif** : assets SVG/images et métadonnées JSON interprétés par les renderers ;
- **natif spécialisé** : composant WebAssembly ou natif uniquement après mesure démontrant
  que le renderer déclaratif ne permet pas le comportement ou les performances nécessaires.

Le troisième niveau n'est pas un format de composant envoyé par un utilisateur. Il s'agit de
code développé, audité, compilé et livré avec Scenariom. Aucun C++, WebAssembly, JavaScript,
JSX ou CSS arbitraire venant d'un projet ne doit être exécuté.

### Axe 3 — ressources backend et affectations narratives

Le backend est la source de vérité pour les styles, définitions, assets, versions et
affectations. Le frontend ne stocke aucune donnée métier définitive.

La gateway reste l'unique point d'entrée des clients. Le service propriétaire valide les
droits, le schéma, les références, le MIME et le contenu des assets avant publication.

## Vocabulaire fixé

| Terme | Responsabilité |
|---|---|
| `StyleDefinition` | Valeurs visuelles : couleurs, typographie, surfaces, motion et fond. |
| `AssetDefinition` | Fichier contrôlé et métadonnées intrinsèques : taille, MIME, géométrie et découpe. |
| `ComponentDefinition` | Habillage déclaratif d'une primitive connue avec slots, états et assets. |
| `PageDefinition` | Arbre versionné de blocs autorisés ; aucune donnée métier copiée dans la page. |
| `StyleAssignment` | Lie un style ou des overrides à une portée et, plus tard, à un contexte narratif. |
| `PublishedRevision` | Révision immuable utilisée par les clients ; un brouillon n'est jamais rendu publiquement. |

Le mot **thème** reste temporairement utilisé par l'API `/themes` existante. La cible emploie
`StyleDefinition` pour éviter de confondre le thème du produit Scenariom, le style d'un projet
et l'habillage d'un composant.

## Premier cas vertical retenu : « de la forêt à la grotte »

### Intention

Un créateur possède un projet narratif. L'expérience utilise par défaut un style forêt. Quand
le lecteur ouvre la scène « Entrée de la grotte », l'environnement devient rocheux et sombre.
Le bouton principal adopte un cadre SVG personnalisé, sans perdre son action, son focus, son
état désactivé ni son label accessible.

### Portée fonctionnelle

Le cas contient exactement :

1. un style publié `forest` affecté au projet ;
2. un style publié `cave`, ou un jeu limité d'overrides, affecté à une scène ;
3. une image de fond pour chaque environnement ;
4. un `ComponentDefinition` de type `button` utilisant un SVG en `nine-slice` ;
5. les états `idle`, `hover` Web, `pressed`, `focus` Web, `disabled` et `loading` ;
6. un écran de lecture minimal rendu à partir des données reçues par la gateway ;
7. le même bouton et la même scène sur Next et Expo, avec adaptations natives autorisées ;
8. un brouillon modifiable puis une publication explicite ;
9. un fallback vers `scenariomTheme` si la définition, la révision ou l'asset est invalide.

### Hors périmètre de ce premier cas

- éditeur libre de pages par glisser-déposer ;
- création vectorielle complète dans Qt ;
- conditions, boucles ou DSL ;
- animations narratives complexes ;
- composants C++ natifs ou WebAssembly ;
- marketplace et partage public entre créateurs ;
- remplacement custom de toutes les primitives ;
- synchronisation collaborative en temps réel.

### Cascade de résolution

Pour ce cas, la priorité est :

```text
overrides de la scène
        ↓
style du projet
        ↓
scenariomTheme
```

Les préférences personnelles d'affichage accessibles, par exemple réduction des animations ou
augmentation du contraste, sont appliquées après cette résolution et ne peuvent pas être
désactivées par le créateur.

### Flux attendu

```text
Éditeur Qt
  └─ SVG + métadonnées nine-slice + définition du bouton
                         ↓
Service backend propriétaire
  └─ validation → brouillon → révision publiée → stockage des assets
                         ↓
Gateway authentifiée
  └─ définition résolue de la scène + URLs d'assets autorisées
                    ↙                         ↘
           Renderer Next                Renderer Expo
```

Le backend renvoie des identifiants et des URLs contrôlées, jamais un chemin de fichier local.
Le changement de scène sélectionne une affectation ; il ne transporte pas un nouveau morceau
de code vers le client.

## Contrat minimal à stabiliser avant les modèles de données

Les noms définitifs pourront évoluer, mais le premier schéma doit couvrir :

```ts
type PublishedExperienceSnapshot = {
  schemaVersion: 1;
  projectId: string;
  context: { type: 'project' | 'scene'; id: string };
  style: ResolvedStyleSnapshot;
  components: Record<string, ResolvedComponentDefinition>;
  assets: Record<string, { url: string; mime: string; integrity?: string }>;
  revision: string;
};
```

Le snapshot est déjà résolu et validé côté serveur ou par un package de contrat partagé. Les
clients ne doivent pas deviner la cascade à partir de plusieurs réponses incompatibles.

## Critères d'acceptation

Le cas est terminé lorsque :

- changer le contexte de `forest` vers `cave` modifie le fond et les tokens prévus sans
  modifier les données narratives ;
- le bouton SVG conserve une géométrie correcte sur téléphone, tablette et desktop ;
- Next et Expo exposent la même action et les mêmes états applicables ;
- clavier, lecteur d'écran, RTL, texte long et réduction des animations restent utilisables ;
- un asset absent ou une définition invalide produit le fallback sûr sans écran bloqué ;
- un brouillon n'affecte pas l'expérience publiée ;
- une publication crée une révision traçable et invalidable ;
- les clients ne chargent les données et assets que par la gateway ;
- aucun code utilisateur arbitraire n'est exécuté.

## Ordre de travail associé

1. Auditer les composants et classer leurs valeurs selon
   `COMPONENT_CUSTOMIZATION_AUDIT.md`.
2. Stabiliser les fondations globales sans BDD : tokens, états, typographie, densité et motion.
3. Définir puis tester le contrat dynamique de `Button` sur Next et Expo.
4. Étendre progressivement les mêmes règles aux autres primitives et compositions.
5. Stabiliser le package TypeScript pur de contrats, validation, résolution et migrations.
6. Définir seulement alors le snapshot et les ressources backend versionnées.
7. Construire la fixture « forêt → grotte » et son bouton nine-slice.
8. Ajouter le flux brouillon/publication et les affectations projet/scène.
9. Construire dans Qt l'éditeur de métadonnées capable de produire cette même fixture.

## Décisions explicitement reportées

Le choix précis de la bibliothèque SVG Qt, du format de projet interne de l'éditeur, du moteur
de stockage binaire et de l'éventuelle présence de WebAssembly sera fait après le POC vertical.
Ces choix ne doivent pas modifier le contrat public consommé par Next et Expo.
