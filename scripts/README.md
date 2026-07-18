# Pipeline photos recettes

Pour ajouter une photo générée (Nano Banana Pro) à une recette :

```
node scripts/add-photo.mjs <image> <id-recette>     # ex: node scripts/add-photo.mjs poulet.png r1
```

Le script redimensionne (800px max), compresse en JPG (<100 Ko), enregistre dans `img/recipes/<id>.jpg` et branche automatiquement le champ `img:` de la recette dans `index.html`. Relancer la commande avec une nouvelle image écrase l'ancienne photo.
