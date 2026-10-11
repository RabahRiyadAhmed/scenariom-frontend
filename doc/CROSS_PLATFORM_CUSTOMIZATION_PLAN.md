# Plan directeur Web, Expo et editeurs custom

## Statut du document

Ce document est un audit et une feuille de route. Il ne signifie pas que les corrections sont deja implementees.

L'objectif est de garantir une parite semantique entre Next.js et Expo : memes donnees, composants, tokens et comportements, avec des adaptations controlees pour le Web, le mobile et la tablette.

La mise en oeuvre devra suivre cet ordre : correction des fondations actuelles, moteur de style partage, editeur de styles globaux, composants custom, pages custom, puis langage declaratif securise.

## Architecture actuelle

Le design-system partage actuellement trois mecanismes principaux :

- `packages/design-system/theme.css` definit le contrat Tailwind et les variables CSS `--sc-*` ;
- `packages/design-system/src/tokens.ts` expose les valeurs TypeScript utilisees notamment par Expo ;
- `packages/design-system/src/themes.ts` definit `ThemeDefinition`, le fallback `scenariomTheme` et la resolution des themes.

Next applique les themes avec des variables CSS sur `document.documentElement`. Expo resout les couleurs en JavaScript et les transmet avec `UiThemeProvider` et `VariableContextProvider`.

Cette separation entre les renderers Web et Native est normale. Le probleme est que certaines decisions de theme sont encore dupliquees ou resolues differemment.

## Defauts a corriger

### Sources de verite concurrentes

- Les couleurs par defaut sont definies dans `tokens.ts`.
- Les memes couleurs sont repetees plusieurs fois dans `theme.css`.
- Le seed backend possede encore ses propres palettes de base.
- Certaines valeurs divergent deja entre ces fichiers, notamment `background`, `card`, `primary`, `purple` et `gold`.

Une couleur ne doit plus etre modifiee manuellement dans plusieurs fichiers.

### Contrat de theme incomplet

`ThemeDefinition` contient les modes de couleur, rayons, animations et quelques options de composants. En revanche, les chemins d'images, opacites, filtres et categories se trouvent dans `extraData`, qui est non type.

Next et Expo lisent ces valeurs avec des conversions TypeScript forcees. Une donnee invalide peut donc atteindre les applications sans validation fiable.

### Validation insuffisante

La validation actuelle controle principalement les couleurs, le slug et une partie des SVG. Elle doit aussi controler :

- les valeurs numeriques et leurs bornes ;
- les rayons, durees, epaisseurs et dimensions ;
- les effets et formes autorises ;
- les URLs et references d'assets ;
- les proprietes inconnues ;
- la coherence entre le record backend et sa definition ;
- les limites de taille et de complexite des SVG.

### Etats de couleur non synchronises

Les couleurs `foreground`, `hover`, `pressed`, `focus` et `disabled` ne suivent pas toutes le meme chemin de resolution. Un utilisateur peut modifier `primary` sans obtenir automatiquement des etats interactifs coherents sur les deux plateformes.

Ces valeurs doivent etre calculees par un resoluteur partage, avec des overrides avances facultatifs.

### Valeurs Web utilisees dans React Native

Plusieurs composants natifs passent encore litteralement `var(--sc-muted)` a `placeholderTextColor`. React Native attend une couleur deja resolue et ne peut pas interpreter cette syntaxe CSS dans cette propriete.

### Effets attaches au slug

Certains effets Web sont appliques avec `data-style="neon"`, `cyberpunk`, `arcane`, etc. Un theme utilisateur possedant `effect: "glow"` mais un autre slug ne recevra donc pas automatiquement le meme rendu.

Les effets doivent dependre des proprietes declaratives du theme, jamais du nom ou du slug.

### Proprietes declarees mais peu appliquees

`components.card`, `button.effect`, plusieurs durees de motion et certains rayons existent dans le contrat, mais ne sont pas interpretes uniformement par les composants Web et Native.

### Runtime duplique

Les providers Next et Expo dupliquent le chargement, la validation, les fallbacks, l'extraction de `extraData`, les opacites et les filtres. Cette duplication facilite les divergences futures.

### Backend non prepare aux creations utilisateur

Le modele `Theme` actuel ne contient pas de proprietaire, de brouillon, de revision publiee, de visibilite ou d'historique. Les reglages d'apparence modifies actuellement concernent directement un theme partage.

### Tests absents

Il n'existe pas encore de tests dedies au contrat de theme, au resoluteur, a la generation CSS ou a la parite Web/Native.

## Architecture cible

Le Web et Native ne doivent pas utiliser le meme moteur de rendu. Ils doivent recevoir le meme resultat resolu :

```text
ThemeDefinition enregistre en BDD
             |
       validation + migration
             |
 resolveTheme(theme, mode, contexte)
             |
       ResolvedThemeSnapshot
        /                 \
Web: variables CSS     Native: objet de styles
```

`ResolvedThemeSnapshot` doit contenir toutes les valeurs finales : couleurs, textes, hover, pressed, focus, rayons, densite, typographie, animations, effets, composants et apparence du fond.

Web transformera ce snapshot en variables CSS. Expo utilisera directement les memes valeurs JavaScript.

## Fichiers et packages futurs

### Nouveau package de contrat

Ajouter `packages/theme-contract`, package TypeScript pur sans React, consommable par le frontend et le backend.

Il devra contenir :

- `ThemeDefinitionV2` ;
- `ResolvedTheme` ;
- `CustomComponentDefinition` ;
- `PageDefinition` ;
- `StyleAssignment` ;
- les schemas de validation ;
- les migrations entre versions ;
- les types de breakpoints et d'overrides.

### Design-system

Ajouter dans le design-system :

- un resoluteur de theme pur et deterministe ;
- un adaptateur qui produit les variables CSS Web ;
- un provider Native utilisant le snapshot resolu ;
- des utilitaires de contraste et d'etats interactifs ;
- des renderers Web et Native bases sur les memes contrats ;
- des fixtures partagees pour les laboratoires de composants.

Le fallback statique de `theme.css` devra etre genere depuis les tokens canoniques et ne plus etre une deuxieme source manuelle.

### Adaptateurs des applications

Next conservera `localStorage` et l'application des variables CSS. Expo conservera `SecureStore`, la gestion des safe areas et les integrations systeme. La selection, l'heritage, la normalisation et la resolution devront etre partages.

Le dernier style publie valide devra pouvoir etre conserve en cache pour le fonctionnement hors connexion d'Expo.

## Valeurs globales modifiables

La premiere version de l'editeur global devra gerer :

- couleurs de surface, texte, bordure, actions et etats semantiques ;
- typographie, familles autorisees, poids, tailles et hauteurs de ligne ;
- rayons, formes et epaisseurs de bordure ;
- densite compacte, normale ou confortable ;
- motion desactivee, reduite ou normale ;
- images de fond light/dark, position, opacite et filtre ;
- exceptions limitees pour boutons, cartes, champs et modales.

Les couleurs derivees devront etre calculees automatiquement. L'editeur pourra proposer un override avance, mais devra toujours verifier le contraste.

## Heritage des styles

La priorite de resolution retenue est :

```text
section ou page -> projet -> preference globale utilisateur -> scenariomTheme
```

Une section pourra :

- referencer un style complet different ;
- conserver le style du projet avec quelques overrides ;
- revenir a l'heritage normal sans recopier le theme.

Exemple : un projet peut utiliser un theme d'ecole, puis une section en foret peut appliquer un autre style complet ou uniquement changer le fond, les surfaces et l'accent.

Un style utilisateur publie reste une reference vivante. Lorsque l'utilisateur publie une nouvelle version, tous les projets qui referencent ce style utilisent la nouvelle version. Les modifications en brouillon ne changent pas les ecrans publics avant publication.

## Responsive et layouts

L'editeur proposera des layouts adaptatifs de depart. L'utilisateur pourra :

- selectionner un layout par defaut ;
- l'appliquer a tout un projet ;
- l'appliquer uniquement a une page ou section ;
- modifier certaines valeurs selon le format ;
- remplacer le layout d'une section particuliere si necessaire.

Chaque layout possedera une configuration `base`, puis des overrides semantiques `phone`, `tablet` et `desktop`.

Les renderers traduiront ces memes regles vers les media queries Web ou `useWindowDimensions` cote Native. Le contenu, la hierarchie, les actions et les tokens doivent rester identiques, mais une sidebar desktop pourra devenir un drawer ou une navigation inferieure sur mobile.

## Pages custom

Les pages seront stockees sous forme d'arbres JSON versions, composes uniquement de blocs autorises.

Le contrat devra couvrir :

- layout et sections ;
- composants et slots ;
- bindings vers les donnees autorisees ;
- actions declaratives ;
- visibilite conditionnelle ;
- regles responsive ;
- accessibilite ;
- references de styles et d'assets.

La premiere version interdira JSX, JavaScript, CSS libre, classes arbitraires et URLs non validees.

Une future DSL pourra ajouter conditions, listes et boucles bornees sous forme d'AST JSON. Elle devra etre interpretee sans `eval`, sans import utilisateur et sans acces reseau direct. Elle imposera des limites de profondeur, de nombre de noeuds, d'iterations et de temps d'execution.

## Composants custom

Les primitives classiques comme les boutons, cartes et champs resteront la fondation stable. Un composant custom devra composer ou envelopper ces primitives au lieu de remplacer arbitrairement leurs comportements.

Le contrat custom devra definir :

- assets et geometrie ;
- zones de contenu et slots ;
- dimensions minimales et maximales ;
- paddings et zones extensibles ;
- etats `idle`, `hover`, `pressed`, `focus`, `disabled`, `loading`, `success` et `error` ;
- animations et fallback reduced motion ;
- comportement responsive et RTL ;
- roles et labels d'accessibilite ;
- capacites disponibles sur chaque plateforme.

Les tests SVG actuels doivent rester marques comme POC jusqu'a la validation du pipeline d'assets, des metadonnees et des strategies de redimensionnement.

## Backend et API

Prevoir des ressources possedees et versionnees pour :

- styles ;
- revisions et brouillons ;
- composants custom ;
- pages custom ;
- affectations de styles aux utilisateurs, projets, pages et sections.

Les modeles devront inclure proprietaire, visibilite, statut de publication, version de schema, revision publiee et dates.

L'API devra proposer creation, lecture, mise a jour, duplication, apercu, validation, publication et resolution des affectations. `/themes` restera temporairement compatible et retournera des definitions normalisees.

Les definitions JSON resteront en BDD. Les images, SVG, polices et autres assets seront stockes et servis par le backend. Le backend verifiera permissions, MIME, dimensions, taille, contenu SVG et references entre ressources.

## Audit des pages et laboratoires actuels

### Erreurs statiques detectees

- Le build de production Next reussit.
- La verification TypeScript Expo reussit.
- Le lint Web echoue actuellement avec 10 erreurs et 19 avertissements.
- Le lint Expo echoue actuellement avec 24 erreurs et 15 avertissements.
- Les deux `ComponentPreview` appellent des hooks apres des retours conditionnels.
- La demonstration des modales Expo cree un composant pendant le rendu.
- Les providers de theme possedent des effets synchrones signales par le lint et des dependances de hooks incompletes.

### Couverture incomplete du catalogue

Le catalogue contient 90 composants. Environ 32 possedent une branche de demonstration reelle, tandis que 58 routes affichent un fallback generique qui ne teste pas le composant annonce.

Les groupes les moins couverts sont :

- formulaires avances ;
- navigation ;
- composants data ;
- medias specialises ;
- composants metier ;
- etats systeme et permissions.

Chaque composant catalogue devra posseder une fixture et une demonstration Web et Native explicites. Une entree sans exemple ne devra plus etre consideree comme couverte.

### Duplication des exemples

Les laboratoires Web et Expo sont deux implementations separees. Ils n'utilisent pas toujours les memes donnees, variantes ou scenarios. Il faut partager les fixtures et la description des cas, puis conserver uniquement le rendu propre a chaque plateforme.

### Pages metier trop locales

Plusieurs pages utilisent encore des couleurs, tailles, rayons et espacements directement dans leurs `StyleSheet`. Elles ne permettent donc pas de mesurer correctement l'effet d'un theme utilisateur.

Les fausses donnees de projets et scenes doivent etre placees dans des fixtures de laboratoire clairement isolees ou provenir de l'API, conformement a la regle du projet qui interdit les donnees metier hardcodees dans le frontend.

### Page organisation Expo

La page organisation Expo utilise trois zones fixes d'environ 220, 760 et 250 pixels, puis un scroll horizontal. Ce comportement peut servir sur grand ecran, mais ne constitue pas une adaptation telephone ou tablette.

Elle devra definir :

- desktop : structure, canvas et proprietes visibles ;
- tablette : panneaux repliables autour du canvas ;
- telephone : une zone principale avec drawers ou sheets pour structure et proprietes.

### Autres cas responsive a ajouter

- textes longs et traductions ;
- arabe et RTL ;
- clavier virtuel ;
- safe areas et encoches ;
- portrait et paysage ;
- telephone compact ;
- tablette et iPad ;
- desktop et fenetre Web etroite ;
- zoom navigateur ;
- absence de hover et navigation clavier ;
- reduced motion ;
- images ou polices indisponibles.

## Reorganisation de la documentation custom

Les documents existants devront etre reecrits pour utiliser les memes termes et contrats :

- `custom-component-schema.md` : schema versionne complet ;
- `custom-component-rules.md` : regles communes et securite ;
- `custom-button.md` : geometrie, etats et actions ;
- `custom-modal.md` : zones, scroll, focus et responsive ;
- `custom-text.md` : typographie, scripts et fallback de glyphes ;
- `svg-button-asset-editor-spec.md` : pipeline d'assets aligne sur le contrat commun.

Ajouter ensuite des fiches pour la carte, les champs, la navigation, les listes et les conteneurs de page.

## Ordre d'implementation

### Phase 1 - Stabiliser l'existant

- Corriger toutes les erreurs de lint Web et Expo.
- Corriger les hooks et les proprietes Native contenant des variables CSS.
- Aligner les versions React et les types partages.
- Ajouter les premiers tests des tokens et themes.

### Phase 2 - Source unique et resoluteur

- Introduire le package de contrat.
- Creer `ThemeDefinitionV2` et ses migrations.
- Creer `resolveTheme()` et `ResolvedThemeSnapshot`.
- Generer le fallback CSS depuis la source canonique.
- Brancher les deux applications sur le meme snapshot.

### Phase 3 - Parite des composants et exemples

- Remplacer le fallback generique du catalogue.
- Partager les fixtures de demonstrations.
- Completer les exemples manquants par groupe.
- Construire une matrice automatique de couverture et de capacites.

### Phase 4 - Styles utilisateur

- Ajouter brouillons, publication et proprietaires.
- Implementer la cascade globale, projet, page et section.
- Ajouter l'editeur des valeurs globales avec apercu light/dark et responsive.
- Ajouter validation de contraste et fallback.

### Phase 5 - Composants custom

- Finaliser le contrat des assets et composants.
- Implementer les renderers securises Web et Native.
- Ajouter les etats, animations, slots et controles responsive.
- Transformer les POC SVG utiles en fixtures de validation.

### Phase 6 - Pages custom

- Implementer les layouts de depart.
- Implementer l'arbre JSON de pages et ses bindings autorises.
- Ajouter l'affectation de styles par page et section.
- Ajouter apercus phone, tablet et desktop.

### Phase 7 - DSL securisee

- Ajouter conditions et expressions bornees.
- Ajouter listes et boucles avec limites strictes.
- Interdire toute execution directe de code utilisateur.
- Auditer securite, performances et consommation memoire.

## Tests et criteres d'acceptation

- Valider et migrer chaque version de schema.
- Rejeter les donnees hostiles, invalides ou excessives.
- Verifier qu'une meme definition produit le meme snapshot sur Next et Expo.
- Tester la cascade globale, projet, page et section.
- Verifier qu'un brouillon ne modifie aucun ecran publie.
- Verifier qu'une publication met a jour toutes les references du style.
- Ajouter des captures Web aux formats phone, tablet et desktop.
- Ajouter des captures Expo Android et iOS sur telephone et tablette.
- Tester chaque composant en light, dark, RTL, texte long et reduced motion.
- Maintenir une matrice des 90 composants : implementation Web, Native, exemple Web, exemple Native, responsive, RTL et accessibilite.
- Exiger build Next, TypeScript Expo et lint sans erreur avant chaque nouvelle phase.

Le resultat sera accepte lorsqu'une meme page JSON, avec les memes donnees et le meme style publie, conservera sa structure, sa hierarchie, ses tokens, ses etats et ses actions sur toutes les cibles, sans chevauchement ni contenu inaccessible.

## Decisions retenues

- La cible est une parite semantique, pas un rendu pixel-perfect.
- Les adaptations natives sont autorisees pour la navigation, le clavier, les safe areas et l'accessibilite.
- Les styles publies sont des references vivantes et leurs mises a jour se propagent.
- Les changements restent en brouillon avant publication.
- Une section peut choisir un style complet ou seulement des overrides.
- Les layouts sont adaptatifs par defaut avec overrides phone, tablet et desktop.
- Aucun code utilisateur arbitraire ne sera execute.
- La future logique sera une DSL JSON interpretee, limitee et securisee.
- `scenariomTheme` reste le fallback de securite code en dur.
