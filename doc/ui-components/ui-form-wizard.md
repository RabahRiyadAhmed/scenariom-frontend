# UiFormWizard

## Rôle UI

`UiFormWizard` découpe un formulaire en étapes. La page valide le wizard simple, le wizard avec barre de progression thématique et le wizard avec validation par étape : compte, profil puis confirmation.

## Contrat standard

Le moteur possède l'étape courante, les valeurs, la validation, précédent/suivant, soumission, progression et protection contre les sauts invalides. Les trois variantes utilisent des états indépendants. Expo et Web exposent le même workflow même si les contrôles internes sont natifs.

## Personnalisation future

Le custom peut modifier stepper, barre, icônes d'étape, cadre, transitions et écran final. Les zones `steps`, `progress`, `body`, `previous`, `next` et `result` restent identifiables. Un thème ne peut pas changer l'ordre métier, ignorer la validation ou soumettre directement.

## Tests obligatoires

Tester précédent au premier écran, validation bloquante, double soumission, conservation des valeurs, textes traduits longs, RTL, retour Android, rotation et restauration d'un brouillon.
