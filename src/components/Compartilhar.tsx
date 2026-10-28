"use client";

import { useEffect, useRef, useState } from "react";
import { Icone } from "./Icone";

type Props = { nome: string; slug: string; variante?: "card" | "pagina" };

// Compartilha o card do jogador pelo menu nativo do celular (navigator.share).
// - "card": botão pequeno sob o card do elenco; compartilha o link (a prévia do link já mostra o card).
// - "pagina": na página do jogador; a imagem é baixada ao abrir a página, para poder ser enviada como
//   arquivo na hora do toque (o iPhone só abre o menu se ele for chamado direto no toque, sem esperar).
// Sem menu nativo (alguns computadores), abre opções: WhatsApp, copiar link e baixar imagem.
export function Compartilhar({ nome, slug, variante = "card" }: Props) {
  const pagina = `/elenco/${slug}/`;
  const imagem = `${pagina}card.png`;
  const texto = `Olha o card do ${nome} no Thorck FC!`;
  const arquivo = useRef<File | null>(null);
  const [menu, setMenu] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (variante !== "pagina") return;
    fetch(imagem)
      .then((r) => r.blob())
      .then((b) => (arquivo.current = new File([b], `thorck-fc-${slug}.png`, { type: "image/png" })))
      .catch(() => {});
  }, [imagem, slug, variante]);

  const linkCompleto = () => new URL(pagina, location.href).href;

  async function compartilhar() {
    const url = linkCompleto();
    const f = arquivo.current;
    try {
      if (f && navigator.canShare?.({ files: [f] })) {
        await navigator.share({ files: [f], text: `${texto} ${url}` });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: `${nome} | Thorck FC`, text: texto, url });
        return;
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return; // a pessoa fechou o menu
    }
    setMenu((m) => !m);
  }

  async function copiar() {
    await navigator.clipboard.writeText(linkCompleto());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  const whatsapp = () => `https://wa.me/?text=${encodeURIComponent(`${texto} ${linkCompleto()}`)}`;

  const opcoes = (
    <>
      <button
        type="button"
        onClick={() => window.open(whatsapp(), "_blank", "noopener")}
        className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-amarelo hover:text-preto"
      >
        <Icone nome="whatsapp" className="size-4" /> WhatsApp
      </button>
      <button type="button" onClick={copiar} className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-amarelo hover:text-preto">
        <Icone nome="link" className="size-4" /> {copiado ? "Link copiado!" : "Copiar link"}
      </button>
      <a href={imagem} download={`thorck-fc-${slug}.png`} className="flex items-center gap-2 px-4 py-3 hover:bg-amarelo hover:text-preto">
        <Icone nome="baixar" className="size-4" /> Baixar imagem
      </a>
    </>
  );

  if (variante === "pagina") {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={compartilhar}
          className="chanfro flex w-full items-center justify-center gap-2 bg-amarelo px-6 py-3 font-display text-2xl tracking-wider text-preto transition-colors hover:bg-white"
        >
          <Icone nome="compartilhar" /> Compartilhar card
        </button>
        {/* no celular: ícone em cima, texto embaixo, para caber em três colunas */}
        <div className="grid grid-cols-3 divide-x divide-borda bg-carvao text-sm font-bold [&>*]:justify-center [&>*]:px-2 [&>*]:text-center max-sm:[&>*]:flex-col max-sm:[&>*]:gap-1 max-sm:[&>*]:text-xs">
          {opcoes}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={compartilhar}
        aria-expanded={menu}
        className="flex w-full items-center justify-center gap-2 py-2 font-display text-lg tracking-wider text-prata transition-colors hover:text-amarelo"
      >
        <Icone nome="compartilhar" className="size-4" /> Compartilhar
        <span className="sr-only"> o card de {nome}</span>
      </button>
      {menu && (
        <div className="absolute inset-x-0 top-full z-20 border border-amarelo bg-preto text-sm font-bold shadow-lg">{opcoes}</div>
      )}
    </div>
  );
}
