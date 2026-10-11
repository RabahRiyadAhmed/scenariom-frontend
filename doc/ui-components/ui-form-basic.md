# UiFormBasic

## Rôle UI

`UiFormBasic` rassemble les contrôles courants d'un formulaire. La page remplie valide les champs texte, email, mot de passe visible/masqué, textarea, lecture seule, désactivation, aide, select simple et multiple, fichier, date, mois, heure, semaine, nombre, couleur et range.

Elle couvre aussi les labels flottants, tailles, groupes d'inputs, formulaires vertical/horizontal, grille d'adresse, switches, radios et checkboxes avec les tons du thème.

## Contrat standard

Chaque champ possède une valeur indépendante, un label réel, un état contrôlé, une description, une erreur et un état désactivé. Le moteur conserve validation, focus, clavier, sélection, valeur, accessibilité, RTL et ouverture des pickers natifs. Le fichier est choisi avec l'API navigateur sur Web et le document picker sur Expo.

## Personnalisation future

Le custom peut changer cadre, texture, rayon, label, icône, densité, couleurs et transitions de focus. Il peut composer des slots `label`, `control`, `leading`, `trailing`, `description` et `error`. Il ne peut pas remplacer un type de champ par une image, fusionner les états de plusieurs champs ni cacher une erreur.

## Tests obligatoires

Tester saisies indépendantes, mot de passe, select multiple, fichier, clavier mobile, champs longs, erreurs, disabled/read-only, RTL, scripts non latins et contraste de tous les tons.
