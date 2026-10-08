# Ranges Préflop Cash Game

Outil web pour le no-limit hold'em en cash game (100bb) : choisis le nombre de joueurs (heads-up à 9), ta place et l'action avant toi, tape ta main, et la page te dit s'il faut relancer, suivre, limper, checker, aller à tapis ou se coucher, avec la grille complète des 169 mains.

Site : https://porggg.github.io/poker-help/

## Fonctions

- Situations : tout le monde s'est couché (open), quelqu'un a limpé, quelqu'un a relancé, tu as relancé et on te 3-bet, tu as 3-bet et on te 4-bet, tu as 4-bet et on te fait tapis.
- Deux modes : **Simple** (une action par main) et **GTO** (fréquences du solveur, cases mixtes).
- Quiz de spots pour s'entraîner, aide pour débutants (positions, actions, abréviations, lecture de la grille), français / anglais.

## Sources des ranges

- **[Pokertrainer.se](https://app.pokertrainer.se/range-viewer?format=cash&players=6&stack=100&scenario=open)** (application « Range Viewer ») : toutes les situations de 6 à 9 joueurs, cash 100bb, open 2,5bb. Mode Simple = leurs ranges « PTO », mode GTO = leurs solutions de solveur. De 3 à 5 joueurs, chaque place reprend la range de la place qui a le même nombre de joueurs derrière elle.
- **Approximations écrites à la main** pour ce que Pokertrainer ne couvre pas : heads-up, limps, plan « relance ou limp » en small blind.

Sur le site, la ligne sous chaque grille indique sa source (point vert) ou signale une approximation (point jaune).

## Structure

```
index.html              page
css/style.css           style
js/approx.js            plan de table, approximations, lecture de la notation poker
js/i18n.js              textes français / anglais et aide
js/app.js               logique du site
data/ranges.js          ranges Pokertrainer extraites (généré)
tools/extract_pokertrainer.py   script d'extraction
```

## Mettre à jour les ranges

Les fichiers de l'application Pokertrainer ne sont pas dans le dépôt (`sources/raw/` est ignoré). Pour régénérer `data/ranges.js` :

1. Ouvre le Range Viewer de Pokertrainer et repère dans les outils réseau du navigateur les deux fichiers JavaScript qui contiennent les ranges (actuellement `7698.*.js` pour les solutions GTO et `7155.*.js` pour les ranges PTO).
2. Enregistre-les dans `sources/raw/`.
3. Lance `python3 -I tools/extract_pokertrainer.py`. Le script lit seulement les blocs JSON, sans exécuter leur code, vérifie la cohérence des fréquences et écrit `data/ranges.js`.
