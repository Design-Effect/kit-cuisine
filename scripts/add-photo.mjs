#!/usr/bin/env node
// Usage : node scripts/add-photo.mjs <image> <id-recette>
// Ex.   : node scripts/add-photo.mjs mon-image.png r7
// Redimensionne (800px max), compresse en JPG (~80, <100 Ko), place dans
// img/recipes/<id>.jpg et insère/met à jour le champ img: dans le HTML.

import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = join(ROOT, 'kit-cuisine-v1.2.html');
const MAX_BYTES = 100_000;

const [srcArg, id] = process.argv.slice(2);
if (!srcArg || !id) {
  console.error('Usage : node scripts/add-photo.mjs <image> <id-recette>   (ex: node scripts/add-photo.mjs photo.png r7)');
  process.exit(1);
}
if (!/^r([1-9]|[12][0-9]|3[0-5])$/.test(id)) {
  console.error(`Id de recette invalide : "${id}" (attendu : r1 à r35)`);
  process.exit(1);
}
const src = resolve(srcArg);
if (!existsSync(src)) {
  console.error(`Image introuvable : ${src}`);
  process.exit(1);
}

const dest = join(ROOT, 'img', 'recipes', `${id}.jpg`);
const relPath = `img/recipes/${id}.jpg`;

// 1) Redimensionne + compresse (baisse la qualité si > 100 Ko)
let quality = 80;
for (;;) {
  await sharp(src)
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(dest);
  const size = statSync(dest).size;
  if (size <= MAX_BYTES || quality <= 60) {
    const meta = await sharp(dest).metadata();
    console.log(`✔ ${relPath} : ${meta.width}×${meta.height}, ${(size / 1024).toFixed(0)} Ko (qualité ${quality})`);
    if (size > MAX_BYTES) console.warn(`⚠ Toujours > 100 Ko malgré qualité ${quality} — vérifie le rendu.`);
    break;
  }
  quality -= 10;
}

// 2) Insère ou met à jour le champ img: dans le tableau RECIPES du HTML
const html = readFileSync(HTML_PATH, 'utf8');
const idToken = `{id:'${id}'`;
const start = html.indexOf(idToken);
if (start === -1) {
  console.error(`Recette ${id} introuvable dans ${HTML_PATH}`);
  process.exit(1);
}
const nextObj = html.indexOf(`{id:'r`, start + idToken.length);
const end = nextObj === -1 ? html.indexOf('];', start) : nextObj;
const slice = html.slice(start, end);

let newSlice;
const imgRe = /img:\s*'[^']*'/;
if (imgRe.test(slice)) {
  newSlice = slice.replace(imgRe, `img:'${relPath}'`);
  console.log(`✔ Champ img: mis à jour pour ${id} dans le HTML`);
} else {
  newSlice = slice.replace(`${idToken},`, `${idToken}, img:'${relPath}',`);
  if (newSlice === slice) {
    console.error(`Impossible d'insérer le champ img: pour ${id} (format inattendu)`);
    process.exit(1);
  }
  console.log(`✔ Champ img:'${relPath}' inséré pour ${id} dans le HTML`);
}
writeFileSync(HTML_PATH, html.slice(0, start) + newSlice + html.slice(end));
