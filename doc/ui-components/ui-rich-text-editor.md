# SpecializedRichTextEditor

## Rôle UI

L'éditeur riche expose une valeur HTML contrôlée. La page remplie teste éditeur complet, compact, aperçu de la valeur et mode désactivé. Web utilise TinyMCE auto-hébergé ; Expo utilise l'adaptateur natif disponible et un textarea HTML lorsque le build ne contient pas le module requis.

## Contrat standard

Le moteur conserve valeur, sélection, historique, commandes autorisées, nettoyage HTML, RTL, état désactivé et limites de contenu. L'HTML reçu ou envoyé doit être nettoyé ; scripts, handlers et contenus non autorisés sont interdits.

## Personnalisation future

Le custom peut modifier toolbar, groupes de commandes, cadre, typographie de rédaction, hauteur et mode compact. Il ne peut pas injecter un plugin arbitraire, exécuter du HTML ou contourner la politique de nettoyage.

## Tests obligatoires

Tester copier-coller, listes, liens, médias autorisés, RTL, très long contenu, undo/redo, disabled, Expo Go et development build.
