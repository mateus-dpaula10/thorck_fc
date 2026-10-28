import Image from "next/image";
import Link from "next/link";
import { clube, contato, redes } from "@/data/clube";
import { menu } from "./Cabecalho";
import { Icone } from "./Icone";
import { Container } from "./ui";

export function Rodape() {
  return (
    <footer className="relative mt-auto border-t-4 border-amarelo bg-grafite">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/logo-128.webp" alt="Escudo do Thorck FC" width={72} height={72} loading="lazy" />
            <div>
              <p className="font-display text-4xl leading-none tracking-wide">
                Thorck <span className="text-amarelo">FC</span>
              </p>
              <p className="text-sm text-cinza">
                Várzea de {clube.cidade} · {clube.estado} · desde {clube.fundacao}
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <p className="mb-3 font-display text-2xl tracking-wider text-amarelo">Navegue</p>
          <ul className="space-y-1">
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-prata hover:text-amarelo">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-display text-2xl tracking-wider text-amarelo">Contato</p>
          <ul className="space-y-2 text-prata">
            {contato.whatsapps.map((w) => (
              <li key={w.numero}>
                <a href={`https://wa.me/${w.numero}`} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-amarelo">
                  <Icone nome="whatsapp" className="size-4" /> {w.texto}
                </a>
              </li>
            ))}
            {redes.map((r) => (
              <li key={r.rede}>
                <a href={r.url} target="_blank" rel="noopener me" className="flex items-center gap-2 hover:text-amarelo">
                  <Icone nome={r.rede} className="size-4" /> {r.usuario}
                </a>
              </li>
            ))}
            {contato.email && (
              <li>
                <a href={`mailto:${contato.email}`} className="flex items-center gap-2 hover:text-amarelo">
                  <Icone nome="email" className="size-4" /> {contato.email}
                </a>
              </li>
            )}
            <li>
              <a href={clube.campo.mapa} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-amarelo">
                <Icone nome="local" className="size-4" /> {clube.campo.nome}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-borda py-4 text-center text-xs text-cinza">
        © {new Date().getFullYear()} Thorck FC · Indaiatuba, SP
      </div>
    </footer>
  );
}
