import Link from "next/link";
import type { ReactNode } from "react";
import { Icone } from "./Icone";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function TituloSecao({
  sobre,
  titulo,
  id,
  escuro = false,
}: {
  sobre: string;
  titulo: string;
  id?: string;
  escuro?: boolean;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <p className={`mb-1 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] ${escuro ? "text-preto/70" : "text-amarelo"}`}>
        <span className={`inline-block h-1 w-8 -skew-x-[30deg] ${escuro ? "bg-preto" : "bg-amarelo"}`} aria-hidden="true" />
        {sobre}
      </p>
      <h2 id={id} className={`font-display text-5xl leading-[0.95] tracking-wide md:text-6xl ${escuro ? "text-preto" : ""}`}>
        {titulo}
      </h2>
    </div>
  );
}

// Título grande das páginas internas.
export function TopoPagina({ sobre, titulo, texto }: { sobre: string; titulo: string; texto: string }) {
  return (
    <section className="listras corte-baixo relative bg-grafite pb-20 pt-12 md:pb-28 md:pt-16">
      <Container>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-amarelo">{sobre}</p>
        <h1 className="font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">{titulo}</h1>
        <p className="mt-4 max-w-2xl text-lg text-prata">{texto}</p>
      </Container>
    </section>
  );
}

export function LinkSeta({ href, children, escuro = false }: { href: string; children: ReactNode; escuro?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-display text-2xl tracking-wider ${escuro ? "text-preto" : "text-amarelo"}`}
    >
      {children}
      <Icone nome="seta" className="size-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Botao({
  href,
  children,
  variante = "amarelo",
  externo = false,
}: {
  href: string;
  children: ReactNode;
  variante?: "amarelo" | "contorno" | "preto";
  externo?: boolean;
}) {
  const estilos = {
    amarelo: "bg-amarelo text-preto hover:bg-white",
    contorno: "border-2 border-white/80 text-white hover:border-amarelo hover:text-amarelo",
    preto: "bg-preto text-amarelo hover:bg-carvao",
  }[variante];
  const classe = `chanfro inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-2xl tracking-wider transition-colors ${estilos}`;
  return externo ? (
    <a href={href} target="_blank" rel="noopener" className={classe}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classe}>
      {children}
    </Link>
  );
}

export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
