// Génère les icônes de Keskonmange à partir d'un SVG unique.
// Usage : node scripts/gen-icons.mjs
//
// Composition symétrique : fourchette centrée à x=106, couteau à x=406
// (512−106), assiette au centre. Tranchant du couteau vers la gauche
// (vers l'assiette, comme à table).
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const BG = '#C65D3E';
const RING = '#FAF0DC';
const WHITE = '#FFFFFF';

// Couverts + assiette (dessinés dans un canevas 512×512).
const CONTENT = `
  <!-- Assiette -->
  <circle cx="256" cy="256" r="98" fill="${RING}"/>
  <circle cx="256" cy="256" r="74" fill="${WHITE}"/>
  <!-- Fourchette (centre x=106) : 4 dents, tête, manche -->
  <g fill="${WHITE}">
    <rect x="84"  y="126" width="8" height="69" rx="4"/>
    <rect x="96"  y="126" width="8" height="69" rx="4"/>
    <rect x="108" y="126" width="8" height="69" rx="4"/>
    <rect x="120" y="126" width="8" height="69" rx="4"/>
    <rect x="84"  y="168" width="44" height="46" rx="12"/>
    <rect x="95"  y="195" width="22" height="191" rx="11"/>
  </g>
  <!-- Couteau (centre x=406) : tranchant rectiligne à gauche (vers
       l'assiette), dos courbé à droite, cran lame/manche côté gauche -->
  <path fill="${WHITE}" d="
    M 390 152
    Q 390 134 401 134
    Q 422 138 422 172
    L 419 246
    L 417 258
    L 417 375
    Q 417 386 406 386
    Q 395 386 395 375
    L 395 258
    L 390 252
    Z"/>
`;

// rounded : coins arrondis transparents (icônes classiques) ou fond plein
// (maskable, apple-touch). scale : zone de sécurité maskable (contenu à 80 %).
function svg({ rounded, scale = 1 }) {
  const shift = 256 * (1 - scale);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  ${rounded
    ? `<rect width="512" height="512" rx="110" fill="${BG}"/>`
    : `<rect width="512" height="512" fill="${BG}"/>`}
  <g transform="translate(${shift} ${shift}) scale(${scale})">${CONTENT}</g>
</svg>`;
}

const OUT = new URL('../img/icons/', import.meta.url);
const out = f => fileURLToPath(new URL(f, OUT));
const render = (s, size) => sharp(Buffer.from(s)).resize(size, size).png();

await render(svg({ rounded: true }), 512).toFile(out('icon-512.png'));
await render(svg({ rounded: true }), 192).toFile(out('icon-192.png'));
await render(svg({ rounded: false, scale: 0.8 }), 512).toFile(out('icon-maskable-512.png'));
await render(svg({ rounded: false }), 180).toFile(out('apple-touch-icon.png'));

console.log('4 icônes régénérées dans img/icons/');
