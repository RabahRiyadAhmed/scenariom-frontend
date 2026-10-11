# UiFormAdvanced

## Rôle UI

`UiFormAdvanced` couvre les sélections simple/multiple avec recherche, conservation ou retrait des choix sélectionnés, typeahead, dates, intervalles, heures et masques de saisie téléphone/date/heure.

## Contrat standard

Le moteur conserve les options, identifiants, recherche, sélection multiple, bornes de dates, formats transportés, fuseau éventuel et valeur non formatée. Web utilise les contrôles navigateur adaptés ; Expo ouvre les pickers de plateforme ou un fallback explicite.

## Personnalisation future

Le custom peut modifier la liste, les tags sélectionnés, la feuille mobile, le calendrier, les icônes, le cadre et l'affichage du masque. Il ne doit pas modifier silencieusement une valeur, confondre texte affiché et valeur backend, ni coder les options métier dans le thème.

## Tests obligatoires

Tester zéro/beaucoup d'options, recherche sans résultat, suppression des tags, limites de dates, formats locaux, clavier, rotation, RTL et accessibilité des listes.
