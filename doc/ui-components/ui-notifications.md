# UiNotifications

## Rôle UI

Cette fiche couvre les toasts : retours temporaires du front, positionnés par rapport à l'écran, empilables, fermables et masqués après une durée définie. Un toast n'est pas une carte permanente dans le flux de la page.

## Options UI

- position : haut, milieu ou bas ; début, centre ou fin ;
- ton : primaire, information, succès, avertissement, danger et neutre ;
- variante : standard, translucide ou pleine ;
- contenu : titre, message, heure facultative, bouton d'action et fermeture ;
- durée : fermeture automatique ou fermeture manuelle ;
- pile : plusieurs toasts simultanés.

## Personnalisation custom autorisée

Le futur éditeur peut personnaliser le conteneur de toast : rayon, bordure, texture légère, ombre, animation d'entrée/sortie, icône de ton et style typographique. Il ne doit pas transformer le toast en modal ou en bloc qui masque durablement la page.

Exemple : un thème Horror peut ajouter une bordure sombre et une animation discrète ; un thème Fantasy peut ajouter un petit sceau SVG à côté du titre. Le contrat reste : message court, fermeture, durée et position écran.

## Notification système : pas un composant custom

Les notifications navigateur et natives utilisent les API du système : `Notification` côté Web et `expo-notifications` côté mobile. Leur apparence dépend de l'OS ou du navigateur ; elle ne doit pas être remplacée par un SVG ou un composant custom.

Scenariom peut personnaliser uniquement les données envoyées : titre, texte, icône autorisée par la plateforme, deep link et catégorie. La livraison distante FCM/APNS et le backend seront documentés séparément.

## À tester

Web et Expo, durée, empilement, RTL, accès lecteur d'écran, contraste de tous les tons, zone sûre mobile et notification système dans une development build Android.
