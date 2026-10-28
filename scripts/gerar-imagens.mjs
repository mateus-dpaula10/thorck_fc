// Gera as imagens do site a partir de assets/logo-original.png.
// Rodar de novo só se o logo mudar: `npm run imagens`.
import sharp from "sharp";

const ORIGEM = "assets/logo-original.png";
const LADO = 584;
const RAIO = 289; // o escudo ocupa praticamente a imagem toda; corta o fundo cinza

const mascara = Buffer.from(
  `<svg width="${LADO}" height="${LADO}"><circle cx="${LADO / 2}" cy="${LADO / 2}" r="${RAIO}" fill="#fff"/></svg>`,
);

const redondo = await sharp(ORIGEM)
  .resize(LADO, LADO)
  .ensureAlpha()
  .composite([{ input: mascara, blend: "dest-in" }])
  .png()
  .toBuffer();

const saidas = [
  ["public/logo-512.webp", 512, "webp"],
  ["public/logo-256.webp", 256, "webp"],
  ["public/logo-128.webp", 128, "webp"],
  ["src/app/icon.png", 192, "png"],
  ["src/app/apple-icon.png", 180, "png"],
  ["public/icon-192.png", 192, "png"],
];

for (const [arquivo, tamanho, formato] of saidas) {
  const img = sharp(redondo).resize(tamanho, tamanho);
  if (formato === "webp") await img.webp({ quality: 82 }).toFile(arquivo);
  else await img.png({ compressionLevel: 9, palette: tamanho <= 192 }).toFile(arquivo);
  console.log("ok", arquivo);
}

// Apple não aceita transparência bem: ícone com fundo preto.
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0a0a0a" } })
  .composite([{ input: await sharp(redondo).resize(164, 164).toBuffer(), top: 8, left: 8 }])
  .png({ compressionLevel: 9, palette: true })
  .toFile("src/app/apple-icon.png");

// Imagem de compartilhamento (WhatsApp, Instagram, Google): 1200x630.
const og = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="listras" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
      <rect width="30" height="60" fill="#111"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#listras)"/>
  <polygon points="0,560 1200,470 1200,630 0,630" fill="#ffd400"/>
  <text x="560" y="240" font-family="Impact, 'Arial Black', sans-serif" font-size="116" fill="#ffffff" letter-spacing="3">THORCK FC</text>
  <text x="566" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="29" fill="#ffd400" letter-spacing="3">VÁRZEA DE INDAIATUBA · SP</text>
  <text x="566" y="390" font-family="Arial, sans-serif" font-size="28" fill="#c9ced6">Elenco · Jogos · História</text>
</svg>`);

await sharp(og)
  .composite([{ input: await sharp(redondo).resize(420, 420).toBuffer(), top: 70, left: 90 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("ok public/og.jpg");
