// Dados fictícios da área do admin. Como o projeto não tem back-end, tudo
// aqui é só pra preencher a demo — em produção viria de uma API.
import type {
  CadastroPendente,
  ConteudoPublicado,
  FatiaSegmento,
  Metrica,
  PerfilAdmin,
  PontoEvolucao,
  RegiaoCadastro,
} from "../types";

// Cadastros pendentes fica fora dos 3 cards de métrica — ele vira o
// card de destaque escuro lá embaixo, como um atalho pra moderação.
export const CADASTROS_PENDENTES = 5;

// Os 3 cards de métrica do topo: valor + variação no mês + sparkline
export const METRICAS: Metrica[] = [
  {
    label: "Matches Realizados",
    valor: 128,
    variacaoPercentual: 12,
    sparkline: [8, 14, 12, 19, 23, 21, 28, 33],
  },
  {
    label: "Conversas Iniciadas",
    valor: 342,
    variacaoPercentual: 8,
    sparkline: [40, 52, 48, 61, 58, 70, 75, 82],
  },
  {
    label: "Reuniões Agendadas",
    valor: 47,
    variacaoPercentual: -4,
    sparkline: [9, 7, 8, 6, 7, 5, 6, 5],
  },
];

export const EVOLUCAO_MATCHES: PontoEvolucao[] = [
  { periodo: "Sem 1", matches: 8 },
  { periodo: "Sem 2", matches: 14 },
  { periodo: "Sem 3", matches: 12 },
  { periodo: "Sem 4", matches: 19 },
  { periodo: "Sem 5", matches: 23 },
  { periodo: "Sem 6", matches: 21 },
  { periodo: "Sem 7", matches: 28 },
  { periodo: "Sem 8", matches: 33 },
];

// % de cadastros aprovados — vira o gauge "Taxa de Aprovação"
export const TAXA_APROVACAO = 78;

// Proporção de startups por segmento — vira o donut "Distribuição por Segmento"
export const DISTRIBUICAO_SEGMENTO: FatiaSegmento[] = [
  { segmento: "Fintech", quantidade: 8 },
  { segmento: "HealthTech", quantidade: 6 },
  { segmento: "EdTech", quantidade: 5 },
  { segmento: "AgTech", quantidade: 4 },
  { segmento: "Economia Criativa", quantidade: 3 },
  { segmento: "Outro", quantidade: 2 },
];

// Cadastros por cidade — vira a lista de barras horizontais "Cadastros por Região"
export const CADASTROS_POR_REGIAO: RegiaoCadastro[] = [
  { local: "Recife", quantidade: 42 },
  { local: "Olinda", quantidade: 18 },
  { local: "Caruaru", quantidade: 12 },
  { local: "Salvador", quantidade: 9 },
  { local: "Fortaleza", quantidade: 7 },
];

export const PERFIL_ADMIN: PerfilAdmin = {
  nome: "Admin Master",
  cargo: "Administrador da plataforma",
  iniciais: "AM",
};

// Nomes usados nos avatares sobrepostos do card "Ecossistema Porto Digital"
export const STARTUPS_ATIVAS = 128;
export const AVATARES_ATIVOS = ["EC", "ML", "AG", "PM", "RN"];

export const CADASTROS_MOCK: CadastroPendente[] = [
  {
    id: "1",
    nome: "EcoTech Solutions",
    tipo: "Startup",
    dataCadastro: "2026-08-28",
    status: "Pendente",
    detalhes: {
      segmento: "AgTech",
      estagio: "MVP",
      necessidades: ["Investimento", "Mentoria"],
      descricao: "Soluções sustentáveis para o agronegócio.",
    },
  },
  {
    id: "2",
    nome: "Fernanda Lima",
    tipo: "Investidor",
    dataCadastro: "2026-08-30",
    status: "Pendente",
    detalhes: {
      tipoPerfil: "Investidor Anjo",
      areaInteresse: ["Fintech", "HealthTech"],
      ticketMedio: 80000,
      disponibilidade: "Média",
    },
  },
  {
    id: "3",
    nome: "MedConnect",
    tipo: "Startup",
    dataCadastro: "2026-09-01",
    status: "Aprovado",
    detalhes: {
      segmento: "HealthTech",
      estagio: "Operação",
      necessidades: ["Networking", "Validação de mercado"],
      descricao: "Plataforma de telemedicina para regiões remotas.",
    },
  },
  {
    id: "4",
    nome: "Ricardo Nogueira",
    tipo: "Investidor",
    dataCadastro: "2026-09-02",
    status: "Pendente",
    detalhes: {
      tipoPerfil: "Mentor",
      areaInteresse: ["EdTech", "Economia Criativa"],
      ticketMedio: null,
      disponibilidade: "Baixa",
    },
  },
  {
    id: "5",
    nome: "AgroDrones",
    tipo: "Startup",
    dataCadastro: "2026-09-03",
    status: "Rejeitado",
    detalhes: {
      segmento: "AgTech",
      estagio: "Ideação",
      necessidades: ["Investimento"],
      descricao: "Monitoramento de plantações via drones autônomos.",
    },
  },
  {
    id: "6",
    nome: "Paula Martins",
    tipo: "Investidor",
    dataCadastro: "2026-09-04",
    status: "Pendente",
    detalhes: {
      tipoPerfil: "Ambos",
      areaInteresse: ["Fintech", "Outro"],
      ticketMedio: 150000,
      disponibilidade: "Alta",
    },
  },
  {
    id: "7",
    nome: "EduPlay",
    tipo: "Startup",
    dataCadastro: "2026-09-05",
    status: "Pendente",
    detalhes: {
      segmento: "EdTech",
      estagio: "Escala",
      necessidades: ["Networking"],
      descricao: "Gamificação para o ensino fundamental.",
    },
  },
];

export const CONTEUDO_MOCK: ConteudoPublicado[] = [
  {
    id: "c1",
    startup: "EcoTech Solutions",
    trecho:
      "Buscamos revolucionar o agronegócio brasileiro com sensores de baixo custo que reduzem o uso de água em até 40%.",
    dataPublicacao: "2026-08-29",
    sinalizado: false,
  },
  {
    id: "c2",
    startup: "MedConnect",
    trecho:
      "Já conectamos mais de 2 mil pacientes a especialistas em cidades sem acesso a hospitais de referência.",
    dataPublicacao: "2026-09-01",
    sinalizado: false,
  },
  {
    id: "c3",
    startup: "EduPlay",
    trecho:
      "Nosso app gamificado aumentou em 30% o engajamento de alunos do 5º ano em escolas públicas parceiras.",
    dataPublicacao: "2026-09-05",
    sinalizado: true,
  },
  {
    id: "c4",
    startup: "AgroDrones",
    trecho:
      "Drones autônomos que sobrevoam plantações e identificam pragas antes que se espalhem pela lavoura.",
    dataPublicacao: "2026-09-03",
    sinalizado: false,
  },
];
