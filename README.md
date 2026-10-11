# Frontend Scenariom

- `web/` contient l'application Next.js.
- `mobile/` contient l'application Expo / React Native.
- `packages/` contient uniquement le code réellement partagé (design-system et i18n).
- `doc/` contient la documentation frontend.

Ce dossier est un monorepo pnpm autonome. Son `package.json`, son `pnpm-workspace.yaml`, son
lockfile et son `.gitignore` sont versionnés avec le frontend.

Web et mobile restent deux applications autonomes. Elles partagent des contrats visuels et des
composants adaptés à chaque plateforme, mais pas obligatoirement leurs pages ni leurs logiques.
