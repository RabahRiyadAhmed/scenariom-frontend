# Fiche outil — texte custom

Le texte custom est un composant indépendant pouvant remplacer le texte d’un bouton, d’une carte, d’une modal ou d’un titre.

## Options

Famille de police, poids, taille, interligne, espacement des lettres, alignement, couleur, gradient, contour, ombre, glow, opacité, largeur maximale, troncature et retour à la ligne.

## Contenu

Clé i18n, valeur traduite, texte multiligne, nombres, variables interpolées, contenu RTL et fallback si la police ne possède pas les glyphes nécessaires.

## Effets

Apparition, écriture progressive, fondu, déplacement, changement de couleur, effet encre et état animé après validation/rejet. Les effets doivent préserver la lisibilité et respecter `prefers-reduced-motion` sur Web ainsi qu’un fallback Expo.

## Polices et scripts

Tester latin, arabe, japonais, coréen, chinois, russe, turc et arménien. Une police peut être remplacée par script ; l’éditeur doit signaler les glyphes absents au lieu de produire des carrés.

