import type { Metadata } from "next";
import { Icone } from "@/components/Icone";
import { Container, TituloSecao, TopoPagina } from "@/components/ui";
import { clube, contato, linkWhatsApp, redes } from "@/data/clube";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com o Thorck FC: marque amistosos, seja patrocinador ou venha jogar no time de várzea de ${clube.cidade} - ${clube.estado}.`,
  alternates: { canonical: "/contato/" },
  openGraph: { url: "/contato/", title: "Contato | Thorck FC" },
};

const assuntos = [
  { titulo: "Marcar amistoso", texto: "Seu time quer enfrentar o Thorck? Manda data, horário e local.", mensagem: "Olá, Thorck FC! Quero marcar um amistoso." },
  { titulo: "Patrocínio", texto: "Coloque a marca da sua empresa na camisa e nas redes do time.", mensagem: "Olá, Thorck FC! Tenho interesse em patrocinar o time." },
  { titulo: "Quero jogar", texto: "Peneiras e vagas no elenco. Conta sua posição e experiência.", mensagem: "Olá, Thorck FC! Quero jogar no time. Minha posição é:" },
];

export default function Contato() {
  return (
    <>
      <TopoPagina
        sobre="Fale com a gente"
        titulo="Contato"
        texto="O jeito mais rápido de falar com o Thorck FC é pelo WhatsApp. Escolha o assunto e a mensagem já vai pronta."
      />

      <Container className="py-12 md:py-16">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {assuntos.map((a) => (
            <li key={a.titulo}>
              <a
                href={linkWhatsApp(a.mensagem)}
                target="_blank"
                rel="noopener"
                className="chanfro group flex h-full flex-col border-t-4 border-amarelo bg-carvao p-6 transition-colors hover:bg-amarelo hover:text-preto"
              >
                <h2 className="font-display text-4xl tracking-wide">{a.titulo}</h2>
                <p className="mt-2 flex-1 text-prata group-hover:text-preto/80">{a.texto}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-xl tracking-wider text-amarelo group-hover:text-preto">
                  <Icone nome="whatsapp" className="size-5" /> Chamar no WhatsApp
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <section aria-labelledby="t-canais">
            <TituloSecao id="t-canais" sobre="Canais" titulo="Onde achar a gente" />
            <ul className="space-y-3">
              {contato.whatsapps.map((w) => (
                <li key={w.numero}>
                  <a href={`https://wa.me/${w.numero}`} target="_blank" rel="noopener" className="flex items-center gap-4 bg-grafite p-4 hover:text-amarelo">
                    <Icone nome="whatsapp" className="size-7 text-amarelo" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-widest text-cinza">WhatsApp</span>
                      <span className="text-lg font-bold">{w.texto}</span>
                    </span>
                  </a>
                </li>
              ))}
              {contato.email && (
                <li>
                  <a href={`mailto:${contato.email}`} className="flex items-center gap-4 bg-grafite p-4 hover:text-amarelo">
                    <Icone nome="email" className="size-7 text-amarelo" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-widest text-cinza">E-mail</span>
                      <span className="text-lg font-bold">{contato.email}</span>
                    </span>
                  </a>
                </li>
              )}
              {redes.map((r) => (
                <li key={r.rede}>
                  <a href={r.url} target="_blank" rel="noopener me" className="flex items-center gap-4 bg-grafite p-4 hover:text-amarelo">
                    <Icone nome={r.rede} className="size-7 text-amarelo" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-widest text-cinza">{r.nome}</span>
                      <span className="text-lg font-bold">{r.usuario}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="t-campo">
            <TituloSecao id="t-campo" sobre="Nosso campo" titulo="Onde jogamos" />
            <div className="chanfro listras bg-grafite p-6">
              <Icone nome="local" className="size-10 text-amarelo" />
              <p className="mt-4 font-display text-4xl leading-none tracking-wide">{clube.campo.nome}</p>
              <p className="mt-2 text-prata">{clube.campo.endereco}</p>
              <a
                href={clube.campo.mapa}
                target="_blank"
                rel="noopener"
                className="chanfro mt-6 inline-flex items-center gap-2 bg-amarelo px-5 py-3 font-display text-xl tracking-wider text-preto hover:bg-white"
              >
                Abrir no mapa <Icone nome="seta" className="size-5" />
              </a>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
