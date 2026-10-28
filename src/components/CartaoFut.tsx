import Image from "next/image";
import { posicoes, type Jogador } from "@/data/clube";
import { Bandeira } from "./Bandeira";
import { Idade } from "./Idade";

// Gerada uma vez no build; serve de base para a idade antes do navegador recalcular.
const dataBuild = new Date().toISOString().slice(0, 10);

function Silhueta() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-x-[12%] bottom-0 text-amarelo/15">
      <circle cx="50" cy="40" r="19" fill="currentColor" />
      <path d="M12 100c0-24 17-37 38-37s38 13 38 37z" fill="currentColor" />
    </svg>
  );
}

// Card estilo Ultimate Team: posição, escudo e bandeira no canto, foto, nome e números da temporada.
// Os textos usam cqw (largura do card), então o card escala inteiro em qualquer grade.
export function CartaoFut({ jogador }: { jogador: Jogador }) {
  const { nome, posicao, nascimento, gols = 0, assistencias = 0, pais = "BR", foto } = jogador;
  const numeros = [
    { sigla: "GOL", nome: "Gols", valor: gols },
    { sigla: "AST", nome: "Assistências", valor: assistencias },
    { sigla: "IDA", nome: "Idade", valor: nascimento ? <Idade nascimento={nascimento} dataBuild={dataBuild} /> : "–" },
  ];

  return (
    <article className="card-fut @container group relative aspect-[5/7] bg-gradient-to-b from-amarelo via-ouro to-amarelo-escuro p-[3px] transition-transform duration-300 hover:-translate-y-1">
      <div className="card-fut relative h-full overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#2a2a2a,#0a0a0a_70%)]">
        <div className="listras absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,212,0,0.14),transparent_45%)]" aria-hidden="true" />

        {/* foto */}
        <div className="absolute right-[2%] top-[5%] aspect-square w-[74%] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
          {foto ? (
            <Image
              src={foto}
              alt={`${nome}, jogador do Thorck FC`}
              fill
              sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 18vw, (min-width: 640px) 25vw, 40vw"
              className="object-cover object-top"
            />
          ) : (
            <Silhueta />
          )}
        </div>

        {/* posição, escudo e bandeira */}
        <div className="absolute left-[9%] top-[9%] flex w-[20%] flex-col items-center gap-[3cqw]">
          {posicao && (
            <abbr title={posicoes[posicao]} className="font-display text-[13cqw] leading-none tracking-wide text-amarelo no-underline">
              {posicao}
            </abbr>
          )}
          <Image src="/logo-128.webp" alt="" width={64} height={64} className="w-[13cqw]" />
          <Bandeira pais={pais} className="w-[12cqw]" />
        </div>

        {/* nome e números */}
        <div className="absolute inset-x-[10%] top-[58%]">
          <h3 className="truncate border-b border-amarelo/40 pb-[1.5cqw] text-center font-display text-[12cqw] leading-none tracking-wide">
            {nome}
          </h3>
          <dl className="mt-[2.5cqw] grid grid-cols-3 divide-x divide-amarelo/20 text-center">
            {numeros.map((n) => (
              <div key={n.sigla} className="flex flex-col-reverse">
                <dt className="text-[4.5cqw] font-bold tracking-widest text-amarelo">
                  <abbr title={n.nome} className="no-underline">
                    {n.sigla}
                  </abbr>
                </dt>
                <dd className="font-display text-[12cqw] leading-none">{n.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-[3cqw] text-center text-[3.8cqw] font-bold uppercase tracking-[0.3em] text-amarelo/60" aria-hidden="true">
            {posicao ? posicoes[posicao] : "Thorck FC"}
          </p>
        </div>
      </div>
    </article>
  );
}
