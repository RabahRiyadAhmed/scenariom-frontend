# Composants UI multiplateformes

Chaque composant public possède son dossier et deux implémentations résolues par la plateforme.

```text
button/
├── button.web.ts
├── button.native.ts
├── index.web.ts
└── index.native.ts
```

Utiliser normalement le point d’entrée commun :

```ts
import { UiButton } from '@scenariom/design-system/ui';
```

Un import ciblé est disponible lorsqu’un écran n’utilise qu’une primitive :

```ts
import { UiButton } from '@scenariom/design-system/components/ui/button';
```

Les contrats TypeScript restent partagés dans `src/ui/*-types.ts`. Cette façade est la
frontière publique stable pendant l’extraction progressive des anciennes implémentations
agrégées de `src/ui`. `UiDivider` et `UiKbd` ont été extraits : leurs fichiers `.web.ts`
et `.native.ts` exportent désormais des implémentations `.tsx` locales. Les autres composants
peuvent encore réexporter les index historiques pendant cette migration.
