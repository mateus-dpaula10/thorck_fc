# Thorck FC — site oficial

Site do Thorck FC, time de futebol de várzea de Indaiatuba (SP). Next.js 16 com export
100% estático: o `npm run build` gera a pasta `out/`, que sobe em qualquer hospedagem
(aaPanel, Cloudflare Pages, Netlify, Hostinger etc.) sem Node no servidor.

Páginas: Início, Elenco, Jogos, História, Contato (+ 404, sitemap, robots e manifest).

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:3000
```

## Atualizar o conteúdo

Todo o conteúdo fica em [`src/data/clube.ts`](src/data/clube.ts): dados do clube, campo,
WhatsApp, redes, campanha, elenco, próximo jogo, linha do tempo e títulos. Os valores
marcados com `// EXEMPLO` são provisórios.

- **Próximo jogo:** o site mostra um jogo só, o de `proximoJogo`. Sem jogo marcado, use
  `null`: aparece "Próximo jogo a confirmar" com link para o Instagram. Se a data já passou,
  o jogo some sozinho no próximo build.
- **Jogos que já passaram** não aparecem um a um: entram só nos números de `temporada`
  (jogos, vitórias, empates, derrotas, gols pró/contra, pênaltis defendidos). Atualize
  também `atualizadoEm`.
- **Artilharia:** gols e assistências de cada um em `elenco`. O pódio (3 artilheiros +
  maior garçom) e os rankings se montam sozinhos. Camisas não são fixas.
- **Foto de jogador (opcional):** foto quadrada (~600px, `.webp`) em `public/jogadores/` e
  `foto: "/jogadores/rafinha.webp"` no jogador. Sem foto, o cartão mostra os gols em destaque.

Como o site é estático, **toda mudança só vale depois de um novo build e upload**.

## Escudo e imagens

O escudo original fica em `assets/logo-original.png`. Se ele mudar, rode
`npm run imagens` para gerar de novo os logos `.webp`, os ícones e a imagem de
compartilhamento (`public/og.jpg`).

## Publicar

```bash
NEXT_PUBLIC_SITE_URL=https://thorckfc.com.br npm run build
```

Suba o conteúdo de `out/` para a raiz do domínio. A `NEXT_PUBLIC_SITE_URL` define os
links canônicos, o sitemap e a imagem de compartilhamento. Sem ela, o padrão é
`https://thorckfc.com.br`.

O `postbuild` (`scripts/achatar-segmentos.mjs`) roda sozinho e corrige um detalhe do
export do Next 16 que, sem ele, faz o prefetch das páginas dar 404.
