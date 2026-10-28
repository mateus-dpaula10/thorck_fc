import Image from "next/image";
import { emCasa, formatarAtualizacao, formatarData, formatarHora, redes, temporada, type Jogo } from "@/data/clube";
import { Icone } from "./Icone";

function Escudo({ nome, thorck = false }: { nome: string; thorck?: boolean }) {
  if (thorck) return <Image src="/logo-128.webp" alt="" width={64} height={64} className="size-14 md:size-16" />;
  const iniciais = nome
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return (
    <span className="flex size-14 items-center justify-center rounded-full border-2 border-prata/40 bg-carvao font-display text-2xl text-prata md:size-16" aria-hidden="true">
      {iniciais}
    </span>
  );
}

// Placar grande, no estilo "próximo jogo" dos sites de clube.
export function ProximoJogo({ jogo }: { jogo: Jogo }) {
  const casa = jogo.mandante ? { nome: "Thorck FC", thorck: true } : { nome: jogo.adversario, thorck: false };
  const fora = jogo.mandante ? { nome: jogo.adversario, thorck: false } : { nome: "Thorck FC", thorck: true };
  return (
    <article className="chanfro relative overflow-hidden border-l-8 border-amarelo bg-carvao">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-amarelo px-5 py-2 text-preto">
        <p className="font-display text-xl tracking-wider">{jogo.campeonato ?? "Bora pro campo!"}</p>
        <p className="text-sm font-bold uppercase">{emCasa(jogo) ? "Em casa" : "Fora de casa"}</p>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6 md:px-8">
        {[casa, fora].map((time, i) => (
          <div key={time.nome} className={`flex flex-col items-center gap-2 text-center ${i === 1 ? "col-start-3" : ""}`}>
            <Escudo nome={time.nome} thorck={time.thorck} />
            <p className={`font-display text-2xl leading-none tracking-wide md:text-3xl ${time.thorck ? "text-amarelo" : ""}`}>{time.nome}</p>
          </div>
        ))}
        <p className="col-start-2 row-start-1 font-display text-4xl text-cinza md:text-5xl">×</p>
      </div>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 px-4 py-4 text-sm text-prata">
        <li className="flex items-center gap-2">
          <Icone nome="calendario" className="size-4 text-amarelo" />
          <time dateTime={`${jogo.data}-03:00`}>
            {formatarData(jogo)} · {formatarHora(jogo)}
          </time>
        </li>
        <li className="flex items-center gap-2">
          <Icone nome="local" className="size-4 text-amarelo" />
          {jogo.local}
        </li>
      </ul>
    </article>
  );
}

// Agenda vazia: manda a torcida para o Instagram, onde o time divulga os jogos.
export function SemJogoMarcado() {
  const insta = redes.find((r) => r.rede === "instagram");
  return (
    <div className="chanfro border-l-8 border-amarelo bg-carvao p-6">
      <p className="font-display text-3xl tracking-wide">Próximo jogo a confirmar</p>
      <p className="mt-2 text-prata">Assim que o jogo for marcado ele aparece aqui. Até lá, acompanhe as novidades no Instagram.</p>
      {insta && (
        <a href={insta.url} target="_blank" rel="noopener me" className="mt-4 inline-flex items-center gap-2 font-display text-2xl tracking-wider text-amarelo">
          <Icone nome="instagram" className="size-5" /> {insta.usuario}
        </a>
      )}
    </div>
  );
}

// Barra de vitórias/empates/derrotas da temporada. Jogos passados aparecem só como estatística.
export function ResumoCampanha() {
  const t = temporada;
  const partes = [
    { rotulo: "Vitórias", valor: t.vitorias, cor: "bg-vitoria" },
    { rotulo: "Empates", valor: t.empates, cor: "bg-cinza" },
    { rotulo: "Derrotas", valor: t.derrotas, cor: "bg-derrota" },
  ];
  return (
    <div className="chanfro bg-carvao p-6">
      <div className="flex h-4 overflow-hidden" aria-hidden="true">
        {partes.map((p) => (
          <div key={p.rotulo} className={p.cor} style={{ width: `${(p.valor / t.jogos) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {partes.map((p) => (
          <div key={p.rotulo} className="flex flex-col-reverse">
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cinza">
              <span className={`inline-block size-2 ${p.cor}`} aria-hidden="true" />
              {p.rotulo}
            </dt>
            <dd className="font-display text-5xl leading-none">{p.valor}</dd>
          </div>
        ))}
      </dl>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {[
          ["Gols pró", t.golsPro],
          ["Gols contra", t.golsContra],
          ["Pênaltis defendidos", t.penaltisDefendidos],
        ].map(([rotulo, valor]) => (
          <div key={rotulo} className="flex flex-col-reverse">
            <dt className="text-xs font-bold uppercase tracking-widest text-cinza">{rotulo}</dt>
            <dd className="font-display text-3xl leading-none">{valor}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-cinza">
        {t.jogos} jogos · atualizado em {formatarAtualizacao()}
      </p>
    </div>
  );
}
