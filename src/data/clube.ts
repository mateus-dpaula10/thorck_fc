// Todo o conteúdo do site sai daqui. Para atualizar elenco, jogos ou redes,
// edite este arquivo e rode `npm run build` de novo.
// ⚠️ Os valores marcados com EXEMPLO são provisórios — troque pelos reais.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thorckfc.com.br").replace(/\/$/, "");

export const clube = {
  nome: "Thorck FC",
  slogan: "Raça, união e várzea de verdade",
  cidade: "Indaiatuba",
  estado: "SP",
  fundacao: 2018, // EXEMPLO
  descricao:
    "Thorck FC é um time de futebol de várzea de Indaiatuba (SP). Conheça o elenco, a artilharia, o próximo jogo, a campanha e a história do clube.",
  campo: {
    nome: "Poli Esportivo Cruzeiro",
    rua: "R. Anselmo Scacheti, 45 - Jardim Paraíso",
    cep: "13343-150",
    endereco: "R. Anselmo Scacheti, 45 - Jardim Paraíso, Indaiatuba - SP, 13343-150",
    mapa: "https://www.google.com/maps/search/?api=1&query=Poli+Esportivo+Cruzeiro+Thorck+FC%2C+R.+Anselmo+Scacheti%2C+45%2C+Indaiatuba+-+SP",
  },
};

// O primeiro WhatsApp é o dos botões "Chamar no WhatsApp"; todos aparecem no Contato e no rodapé.
export const contato: { whatsapps: { numero: string; texto: string }[]; email?: string } = {
  whatsapps: [
    { numero: "5519981248787", texto: "(19) 98124-8787" }, // só números no `numero`, com 55 + DDD
    { numero: "5519994382756", texto: "(19) 99438-2756" },
  ],
  // email: "contato@thorckfc.com.br", // o time ainda não tem e-mail; descomente quando tiver
};

// Para adicionar TikTok, YouTube ou Facebook, é só incluir uma linha (os ícones já existem).
export type Rede = "instagram" | "tiktok" | "youtube" | "facebook";

export const redes: { rede: Rede; nome: string; usuario: string; url: string }[] = [
  { rede: "instagram", nome: "Instagram", usuario: "@thorckfc", url: "https://www.instagram.com/thorckfc/" },
];

// Números oficiais da temporada, copiados do retrospecto do time.
// Atualize junto com a artilharia e troque a data.
export const temporada = {
  ano: 2026,
  atualizadoEm: "2026-10-24",
  jogos: 33,
  vitorias: 11,
  empates: 6,
  derrotas: 16,
  golsPro: 87,
  golsContra: 76,
  penaltisDefendidos: 2,
};

export const comissao: { nome: string; funcao: string }[] = [{ nome: "Marcos Gaúcho", funcao: "Treinador" }];

// Siglas do card estilo Ultimate Team.
export const posicoes = {
  GOL: "Goleiro",
  ZAG: "Zagueiro",
  LD: "Lateral direito",
  LE: "Lateral esquerdo",
  VOL: "Volante",
  MC: "Meio-campo",
  MEI: "Meia",
  PD: "Ponta direita",
  PE: "Ponta esquerda",
  ATA: "Atacante",
} as const;
export type Posicao = keyof typeof posicoes;

export type Jogador = {
  nome: string; // como o time chama o jogador
  posicao?: Posicao;
  nascimento?: string; // "AAAA-MM-DD"; a idade no card é calculada sozinha
  gols?: number;
  assistencias?: number;
  pais?: "BR" | "PY"; // padrão: BR
  foto?: string; // ex.: "/jogadores/de-paula.webp" (retrato ~600x600 com fundo removido, em public/jogadores)
};

// Camisas não são fixas: o elenco é ordenado pela artilharia.
export const elenco: Jogador[] = [
  { nome: "Rafinha", gols: 32, assistencias: 18 },
  { nome: "Natan", gols: 16, assistencias: 6 },
  { nome: "Maikinho", gols: 10, assistencias: 5 },
  { nome: "Igão", gols: 3, assistencias: 1 },
  { nome: "Osiris", gols: 3 },
  { nome: "Fernando", gols: 3, assistencias: 2 },
  { nome: "Gaúcho", gols: 3, assistencias: 2 },
  { nome: "Daniel", gols: 3 },
  { nome: "Juan", gols: 2, assistencias: 5 },
  { nome: "Modesto", gols: 2, assistencias: 9 },
  { nome: "Regis", gols: 2, assistencias: 3 },
  { nome: "Esdra", gols: 2, assistencias: 1 },
  { nome: "Neto", gols: 2 },
  { nome: "Luan", gols: 2 },
  { nome: "De Paula", posicao: "VOL", gols: 2, nascimento: "1999-09-04", foto: "/jogadores/de-paula.webp" },
  { nome: "Bellinghan", gols: 1, assistencias: 3, pais: "PY" },
  { nome: "MLK Magrão", gols: 1 },
  { nome: "Juka", gols: 1, assistencias: 1 },
  { nome: "Gu", gols: 1, assistencias: 1 },
  { nome: "Binho", gols: 1 },
  { nome: "Pedro", gols: 1 },
  { nome: "Lukinha", gols: 1 },
  { nome: "Neguinho", assistencias: 3 },
  { nome: "Osires", assistencias: 2 },
  { nome: "Magrão", assistencias: 2 },
  { nome: "Zorrinho", assistencias: 2 },
  { nome: "Junior", assistencias: 2 },
  { nome: "Tiago", assistencias: 1 },
  { nome: "Juan Chupisco", assistencias: 1 },
  { nome: "Barraca", assistencias: 1 },
];

// Desempate: quem tem mais do outro quesito fica na frente.
export const artilharia = () =>
  elenco.filter((j) => j.gols).sort((a, b) => b.gols! - a.gols! || (b.assistencias ?? 0) - (a.assistencias ?? 0));
export const garcons = () =>
  elenco.filter((j) => j.assistencias).sort((a, b) => b.assistencias! - a.assistencias! || (b.gols ?? 0) - (a.gols ?? 0));

// Idade em um dia qualquer (o card recalcula no navegador, então não envelhece com o build).
export function idadeEm(nascimento: string, hoje: Date) {
  const [ano, mes, dia] = nascimento.split("-").map(Number);
  const fezAniversario = hoje.getMonth() + 1 > mes || (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);
  return hoje.getFullYear() - ano - (fezAniversario ? 0 : 1);
}

// Os 3 primeiros da artilharia + o maior garçom que não está entre eles.
export function destaquesDaTemporada() {
  const podio = artilharia().slice(0, 3);
  const garcom = garcons().find((j) => !podio.includes(j));
  return { podio, garcom };
}

export type Jogo = {
  data: string; // "AAAA-MM-DDTHH:mm" (horário de Brasília)
  adversario: string;
  campeonato?: string; // ex.: "Amistoso", "Copa Várzea Indaiatuba"
  local: string;
  mandante: boolean; // true = Thorck vem primeiro ("Thorck x Fulano"); "em casa" sai do local
};

// O site mostra só o próximo jogo. Jogos que já passaram entram apenas nos números da `temporada`.
// Sem jogo marcado, use `null`.
export const proximoJogo: Jogo | null = {
  data: "2026-10-31T14:00",
  adversario: "Ajac",
  local: "Campo Califórnia",
  mandante: true,
};

// EXEMPLO: linha do tempo provisória
export const historia: { ano: string; titulo: string; texto: string }[] = [
  { ano: "2018", titulo: "A fundação", texto: "Um grupo de amigos do bairro decide montar um time para disputar os torneios da várzea de Indaiatuba. Nasce o Thorck FC." },
  { ano: "2019", titulo: "Primeiro campeonato", texto: "Estreia em competição oficial da várzea e a primeira vitória que ninguém do grupo esquece." },
  { ano: "2022", titulo: "Escudo e uniforme novos", texto: "O clube ganha a identidade preta e amarela que veste até hoje, com o escudo TF." },
  { ano: "2024", titulo: "Primeiro título", texto: "Campeão de torneio regional, com a torcida lotando o alambrado na final." },
  { ano: "2026", titulo: "Rumo a mais", texto: "Elenco renovado, categoria de base em formação e o objetivo de seguir crescendo dentro e fora de campo." },
];

export const titulos: { ano: string; nome: string }[] = [
  { ano: "2024", nome: "Torneio Regional da Várzea" }, // EXEMPLO
];

// ---- utilitários ----

const fmtData = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short", timeZone: "America/Sao_Paulo" });
const fmtHora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

export const dataDoJogo = (j: Jogo) => new Date(`${j.data}:00-03:00`);
export const formatarData = (j: Jogo) => {
  const texto = fmtData.format(dataDoJogo(j)).replace(/\./g, "");
  return texto[0].toUpperCase() + texto.slice(1);
};
export const formatarHora = (j: Jogo) => fmtHora.format(dataDoJogo(j));

export const formatarAtualizacao = () =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" }).format(new Date(`${temporada.atualizadoEm}T12:00:00-03:00`));

// Se a data já passou, o jogo some do site no próximo build.
export const jogoMarcado = () => (proximoJogo && dataDoJogo(proximoJogo) > new Date() ? proximoJogo : null);
export const emCasa = (j: Jogo) => j.local === clube.campo.nome;

export const linkWhatsApp = (mensagem: string) =>
  `https://wa.me/${contato.whatsapps[0].numero}?text=${encodeURIComponent(mensagem)}`;
