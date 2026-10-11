# UiSweetAlert

## Rôle UI

`UiSweetAlert` est une confirmation ou un message modal court construit sur `UiModal`. La page d’exemple couvre message simple, titre et texte, succès, erreur, contenu long, position, confirmation/annulation, image, fermeture temporisée, contenu composé, requête asynchrone et séquences d’alertes.

La preview remplie couvre aussi résultat supprimé/annulé, réponse asynchrone simulée et insertion dynamique d'une étape. Ces scénarios restent locaux au laboratoire et ne constituent pas une API réseau.

## Contrat fonctionnel

Le contrat contient : type sémantique (`info`, `success`, `warning`, `danger`, `question`), titre, contenu, texte des actions, visibilité de l’annulation et règles de fermeture. Les callbacks de confirmation et d’annulation restent fournis par l’application.

Le moteur gère le focus modal, le backdrop, la fermeture, le chargement asynchrone, le timer, l’enchaînement des étapes et la protection contre une double validation. Une action destructive doit être identifiable et ne peut pas devenir une simple action neutre à cause du thème.

## Personnalisation future

Un custom peut changer le cadre, l’icône, la texture, les tons, la largeur, les espacements et les animations d’entrée/sortie. Les slots `title`, `body`, `icon`, `actions` et `media` peuvent recevoir du contenu autorisé.

Le custom ne remplace pas `UiModal`, ne code pas la requête réseau et ne stocke pas les callbacks. Pour une alerte parchemin, l’asset décrit les zones sûres ; le moteur continue de rendre les actions et le focus.

## Tests obligatoires

Tester confirmation, annulation, erreur réseau, contenu long, timer, file multi-étapes, RTL, clavier, lecteur d’écran, bouton retour Android et contraste de chaque type.
