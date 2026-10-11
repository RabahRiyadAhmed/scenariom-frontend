# SpecializedVideo

## Structure

`SpecializedVideo` affiche une vidéo distante dans un conteneur responsive. Les ratios validés sont `21:9`, `16:9`, `4:3` et `1:1`.

Le contrat partagé contient `sourceUrl`, `title` et `aspectRatio`. Le titre sert aussi à l’accessibilité du lecteur intégré.

## Différences de plateforme

- Web : intégration du lecteur compatible navigateur dans un conteneur responsive ;
- Expo : lecteur rendu dans la couche adaptée à React Native/DOM, avec le même ratio visible.

La page d’exemple utilise une vidéo YouTube simple. Le backend reste responsable des URLs définitives, autorisations et métadonnées métier.

## Personnalisation future

Un custom peut ajouter un poster, un cadre thématique, des contrôles visuels, une légende, un état loading ou erreur et des actions play/pause. Les contrôles essentiels doivent rester accessibles et les icônes doivent provenir du système partagé.

Les assets décoratifs ne doivent pas remplacer le lecteur ni intercepter ses contrôles. L’autoplay, le son et le plein écran doivent respecter les règles du navigateur ou du système mobile.

## Tests obligatoires

Tester chaque ratio, écran étroit, rotation Expo, chargement lent, URL invalide, plein écran, pause/reprise, thème clair/sombre et RTL.
