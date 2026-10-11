# Architecture frontend Scenariom

## Décision

Le dépôt frontend est un monorepo pnpm. Les applications NestJS restent des services autonomes et ne font pas partie du workspace frontend.

```text
scenariom/
└── front/
    ├── web/                    Next.js (DOM)
    ├── mobile/                 Expo / React Native
    ├── packages/design-system/ tokens et composants communs
    ├── packages/i18n/          contrats et traductions communes
    └── doc/                    documentation frontend
```

Les applications sont organisées par responsabilité :

```text
app/ ou src/app/          routes uniquement
features/<domaine>/
├── components/           écrans et composants propres au domaine
├── services/             accès au gateway
└── types.ts              modèles reçus par l'API
shared/                   code local réutilisé par plusieurs features
```

Une route ne contient ni données métier statiques, ni appel HTTP, ni écran complexe. Elle
assemble un layout et le composant public d'une feature.

Le Web et le mobile partagent les valeurs et noms sémantiques, pas obligatoirement les composants. Next utilise des éléments HTML; Expo utilise `View`, `Text` et `Pressable`. Cela conserve l’accessibilité Web et le comportement natif mobile.

## Source de vérité

- `packages/design-system/src/tokens.ts` fournit les valeurs à TypeScript et `StyleSheet`.
- `packages/design-system/theme.css` expose les mêmes concepts à Tailwind CSS 4 et NativeWind.
- Les couleurs sont sémantiques : `background`, `surface`, `card`, `foreground`, `muted`, etc.
- Le bleu est l’action principale, le violet l’accent créatif, le doré un accent rare.

## Web

```tsx
<section className="bg-background text-foreground">
  <article className="rounded-lg border border-border bg-card">
    <button className="bg-primary text-white hover:bg-accent">Créer</button>
  </article>
</section>
```

Le mode sombre suit le système avec `prefers-color-scheme`. Dans les écrans Scenariom, préférer les classes sémantiques aux couleurs brutes comme `bg-white`, `bg-black` ou `text-zinc-*`.

## Expo

```tsx
import { Text, View } from 'react-native';

export function Example() {
  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-foreground">Scenariom</Text>
    </View>
  );
}
```

NativeWind traduit ces utilitaires vers React Native. Pour un style calculé ou une API qui exige une couleur brute, importer `colorTokens` depuis `@scenariom/design-system` ou utiliser `useTheme`.

Expo SDK 57 détecte automatiquement le workspace pnpm avec `expo/metro-config`. Le fichier
`metro.config.js` ne redéfinit donc pas `watchFolders`, `nodeModulesPaths` ou
`disableHierarchicalLookup`; il ne conserve que les intégrations réellement nécessaires comme
NativeWind.

## Ajouter un token

1. Ajouter les valeurs claire et sombre dans `src/tokens.ts`.
2. Ajouter sa variable `--sc-*` et son alias Tailwind `--color-*` dans `theme.css`.
3. Choisir un nom sémantique et vérifier le contraste dans les deux modes.
4. Tester Next et Expo Web, puis Android/iOS si une primitive native est concernée.

## Ajouter un composant partagé

Les composants génériques vivent sous `packages/design-system/src/components/ui`.
Chaque composant possède un dossier et deux variantes :

```text
components/ui/button/
├── button.web.ts
├── button.native.ts
├── index.web.ts
└── index.native.ts
```

Les deux variantes partagent le même contrat de props. Le DOM reste dans `.web` et les
primitives React Native restent dans `.native`. Ne pas utiliser `Platform.OS` pour construire
deux arbres de rendu importants dans un même fichier.

L'import normal reste :

```tsx
import { UiButton } from '@scenariom/design-system/ui';
```

Un import ciblé est possible :

```tsx
import { UiButton } from '@scenariom/design-system/components/ui/button';
```

`src/ui` contient encore les implémentations agrégées historiques. La façade
`src/components/ui` permet de les extraire progressivement, composant par composant, sans
casser les consommateurs. `UiDivider` et `UiKbd` sont extraits; les autres réexports
vers `src/ui` restent une migration à poursuivre.

## Ajouter une feature

1. Définir les types de réponse dans `features/<domaine>/types.ts`.
2. Centraliser `fetch` dans `features/<domaine>/services`.
3. Traduire les erreurs techniques en états connus (`unauthorized`, `request_failed`).
4. Construire l'écran dans `features/<domaine>/components` avec le design-system.
5. Garder la route Next ou Expo limitée à l'assemblage.
6. Ajouter toutes les chaînes utilisateur dans `packages/i18n`.

Les écrans du catalogue de composants vivent dans `features/component-lab/components` sur
Next et Expo. Les anciennes previews dans les dossiers `components/` sont encore des exemples
techniques à extraire progressivement, et non des écrans métier.

Les données de démonstration d'un laboratoire doivent être nommées `fixtures` et ne doivent
jamais être importées par une route métier. Une route métier consomme exclusivement le gateway.

## Commandes

Depuis la racine :

```bash
pnpm dev:web
pnpm dev:app
pnpm check
```

Chaque service Nest utilise également pnpm, depuis son propre dossier. Docker appelle les mêmes scripts pnpm et ne change jamais l'architecture du code.

## Règles d’évolution

- `packages/design-system` ne dépend d’aucune application.
- Aucun import direct entre `front/web` et `front/mobile`.
- Créer plus tard `ui-web` et `ui-native` si nécessaire; ils consommeront les mêmes tokens.
- Les thèmes des univers des utilisateurs restent distincts du thème produit Scenariom.
- `template/` inspire la structure et l’UX, jamais l’identité visuelle.
