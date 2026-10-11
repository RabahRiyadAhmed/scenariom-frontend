# UiRangeSlider

## Rôle UI

La page couvre curseur simple, intervalle à deux poignées, pas fixe et intervalle avec pas. Elle sert notamment aux réglages visuels rapides comme opacité de background ou intensité de filtre.

## Contrat standard

Le moteur conserve minimum, maximum, pas, valeur simple/double, ordre des bornes, formatage du label et callbacks. Web et Expo peuvent utiliser des gestes différents mais doivent retourner les mêmes valeurs normalisées.

## Personnalisation future

Le custom peut modifier rail, remplissage, poignée, graduations, tooltip et orientation. Il ne peut pas rendre la poignée trop petite, permettre aux bornes de se croiser sans règle explicite ou masquer la valeur accessible.

## Tests obligatoires

Tester min/max, pas décimal, deux poignées proches, clavier Web, tactile Expo, RTL, valeur contrôlée externe, disabled et contraste rail/remplissage.
