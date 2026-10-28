import Image from "next/image";
import Link from "next/link";
import { linkWhatsApp } from "@/data/clube";
import { Icone } from "./Icone";
import { MenuMobile } from "./MenuMobile";

export const menu = [
  { href: "/", rotulo: "Início" },
  { href: "/elenco/", rotulo: "Elenco" },
  { href: "/jogos/", rotulo: "Jogos" },
  { href: "/historia/", rotulo: "História" },
  { href: "/contato/", rotulo: "Contato" },
];

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-amarelo bg-preto/95 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-amarelo focus:px-4 focus:py-2 focus:text-preto">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label="Thorck FC — página inicial">
          <Image src="/logo-128.webp" alt="" width={52} height={52} loading="eager" className="size-11 md:size-13" />
          <span className="font-display text-3xl leading-none tracking-wide md:text-4xl">
            Thorck <span className="text-amarelo">FC</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 font-display text-xl tracking-wider text-prata transition-colors hover:text-amarelo"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <a
                href={linkWhatsApp("Olá, Thorck FC! Vim pelo site.")}
                target="_blank"
                rel="noopener"
                className="chanfro flex items-center gap-2 bg-amarelo px-4 py-2 font-display text-xl tracking-wider text-preto transition-colors hover:bg-white"
              >
                <Icone nome="whatsapp" className="size-4" /> Fale com a gente
              </a>
            </li>
          </ul>
        </nav>

        <MenuMobile menu={menu} whatsapp={linkWhatsApp("Olá, Thorck FC! Vim pelo site.")} />
      </div>
    </header>
  );
}
