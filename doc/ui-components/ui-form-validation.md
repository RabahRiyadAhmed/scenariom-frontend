# UiFormValidation

## Rôle UI

`UiFormValidation` valide deux présentations : messages sous les champs et messages compacts de type tooltip. La page teste également le mapping d'erreurs simulées du serveur et leur suppression lorsque le champ concerné change.

## Contrat standard

Les règles, l'état touched/submitted, le lien champ-erreur et la réponse backend appartiennent au moteur. Une erreur possède une clé de champ et un message traduit ; une erreur globale reste séparée. Le focus doit rejoindre le premier champ invalide lorsque le workflow l'exige.

## Personnalisation future

Le custom peut choisir bordure, icône, ton, placement et animation du feedback. Il ne peut pas rendre une erreur uniquement par couleur, déplacer le message vers un autre champ ou supprimer les annonces accessibles.

## Tests obligatoires

Tester erreurs locales/serveur, correction partielle, soumission répétée, contenu long, tooltip hors écran, RTL, clavier et contraste danger/succès.
