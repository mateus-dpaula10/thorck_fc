// Roda sozinho depois do `npm run build` (postbuild).
// O export estático do Next 16 grava os arquivos de prefetch em subpastas
// (out/jogos/__next.jogos/__PAGE__.txt), mas o navegador pede o nome achatado
// (out/jogos/__next.jogos.__PAGE__.txt). Sem isso o prefetch dá 404.
import fs from "node:fs";
import path from "node:path";

const RAIZ = "out";
let copiados = 0;

function arquivosDe(pasta) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(pasta, e.name);
    return e.isDirectory() ? arquivosDe(p) : [p];
  });
}

function percorrer(pasta) {
  for (const e of fs.readdirSync(pasta, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(pasta, e.name);
    if (e.name.startsWith("__next.")) {
      for (const arquivo of arquivosDe(p)) {
        const relativo = path.relative(p, arquivo).split(path.sep).join(".");
        fs.copyFileSync(arquivo, path.join(pasta, `${e.name}.${relativo}`));
        copiados++;
      }
    } else if (e.name !== "_next") {
      percorrer(p);
    }
  }
}

percorrer(RAIZ);
console.log(`segmentos de prefetch achatados: ${copiados}`);
