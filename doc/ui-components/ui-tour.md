# UiTour

## Rôle UI

`UiTour` orchestre une suite d’étapes d’onboarding autour de zones réelles de l’interface. Ce n’est pas seulement une modal décorée : le moteur mesure une cible, la rend visible, place l’explication et contrôle la navigation.

La page actuelle teste une introduction centrée, plusieurs cibles réelles, des placements haut/bas, une fermeture et un redémarrage du parcours.

## Contrat fonctionnel

Chaque étape possède au minimum une clé stable, une cible enregistrée, un contenu traduit et un placement préféré. Elle peut aussi définir un titre et une action métier autorisée.

Le moteur conserve :

- l’index courant et les actions précédent, suivant, terminer et ignorer ;
- la mesure de la cible, le scroll, les safe areas et le recalcul après rotation/redimensionnement ;
- le spotlight, le backdrop, le focus et les annonces accessibles ;
- le fallback centré lorsqu’une cible est absente ou non mesurable.

Les sélecteurs DOM Web et les références mesurées Expo sont des adaptateurs de plateforme. Une définition persistée ne doit pas contenir de coordonnées fixes.

## Personnalisation future

Un tour custom peut modifier la carte d’explication, la flèche, le masque, le cadre du spotlight, les icônes, les libellés et les transitions. Il peut proposer des variantes parchemin, terminal ou manga tout en gardant la même orchestration.

Les cibles disponibles doivent être enregistrées par le frontend avec des identifiants stables. Les textes et l’ordre des étapes peuvent venir du backend et utiliser des clés i18n ; le thème ne doit pas inventer une cible ou exécuter une action arbitraire.

## Tests obligatoires

Tester cible absente, contenu scrollé, clavier et focus Web, bouton retour Android, rotation Expo, RTL, petite hauteur d’écran, reprise/fermeture et réduction des animations.
