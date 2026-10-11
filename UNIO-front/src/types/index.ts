export type Segmento =
  | "Fintech"
  | "HealthTech"
  | "EdTech"
  | "AgTech"
  | "Economia Criativa"
  | "Games"
  | "Logística"
  | "Energia"
  | "Varejo"
  | "Sustentabilidade"
  | "SaaS B2B"
  | "Turismo"
  | "Outro";

export type Estagio = "Ideação" | "MVP" | "Operação" | "Escala";

export type Necessidade =
  | "Investimento"
  | "Mentoria"
  | "Networking"
  | "Validação de mercado";

export type TipoPerfil = "Investidor Anjo" | "Mentor" | "Ambos";

export type Disponibilidade = "Baixa" | "Média" | "Alta";

// Faixa de capital (ticket do investidor / capital procurado pela startup).
// Fica como intervalo em texto no front; a conversão pra número fica pra
// etapa de integração com o back.
export type FaixaCapital =
  | "Até R$ 50 mil"
  | "R$ 50 a 200 mil"
  | "R$ 200 a 500 mil"
  | "Acima de R$ 500 mil";

export type PreferenciaStartup =
  | "Time fundador completo"
  | "Primeiros clientes pagantes"
  | "Protótipo funcional"
  | "Pitch já estruturado";

export type FormaInteracao =
  | "Mensagens"
  | "Reuniões online"
  | "Encontros presenciais no Recife";

export type RegiaoInteresse =
  | "Recife / Porto Digital"
  | "Pernambuco"
  | "Nordeste"
  | "Todo o Brasil"
  | "Aberto a startups remotas";

// RF01 - registro de uma startup cadastrada
export interface Startup {
  id: string;
  nome: string;
  segmento: Segmento;
  estagio: Estagio;
  necessidades: Necessidade[];
  descricao: string;
}

// RF02 - registro de um investidor/mentor cadastrado
export interface Investidor {
  id: string;
  nome: string;
  tipoPerfil: TipoPerfil;
  areaInteresse: Segmento[];
  ticketMedio: number | null;
  disponibilidade: Disponibilidade;
}
