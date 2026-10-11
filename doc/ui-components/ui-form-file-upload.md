# UiFormFileUpload

## Rôle UI

`UiFormFileUpload` couvre dropzone multiple, fichier unique, inputs natifs multiples et filtrage image. La preview utilise des fichiers locaux de test ; les assets définitifs sont envoyés au backend selon les règles de stockage.

## Contrat standard

Le moteur conserve sélection, nom, type MIME réel, taille, limite, progression, suppression, annulation, erreur et résultat serveur. Le glisser-déposer est Web ; Expo ouvre le picker natif. Le composant ne considère jamais l'extension seule comme une validation sûre.

## Personnalisation future

Le custom peut modifier dropzone, liste, miniature, icône, cadre, texture et progression. Les slots sont `empty`, `files`, `file`, `progress`, `error` et `actions`. Le thème ne lit pas le fichier, ne décide pas de son stockage et ne fabrique pas son MIME.

## Tests obligatoires

Tester annulation, fichier invalide/trop grand, limite multiple, doublons, permission refusée, upload lent/échoué, noms RTL/CJK et suppression pendant upload.
