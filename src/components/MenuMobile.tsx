"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icone } from "./Icone";

type Item = { href: string; rotulo: string };

// <details> abre e fecha sem JS; o efeito só fecha o menu depois de navegar.
export function MenuMobile({ menu, whatsapp }: { menu: Item[]; whatsapp: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const caminho = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [caminho]);

  return (
    <details ref={ref} className="group md:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center text-amarelo [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <svg viewBox="0 0 24 24" className="size-7 group-open:hidden" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden size-7 group-open:block" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </summary>
      <nav aria-label="Principal (celular)" className="absolute inset-x-0 top-full border-b-2 border-amarelo bg-preto px-4 pb-6">
        <ul>
          {menu.map((item) => (
            <li key={item.href} className="border-b border-borda">
              <Link
                href={item.href}
                aria-current={caminho === item.href ? "page" : undefined}
                className="block py-3 font-display text-3xl tracking-wider hover:text-amarelo aria-[current=page]:text-amarelo"
              >
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          className="chanfro mt-5 flex items-center justify-center gap-2 bg-amarelo py-3 font-display text-2xl tracking-wider text-preto"
        >
          <Icone nome="whatsapp" /> Fale com a gente
        </a>
      </nav>
    </details>
  );
}
