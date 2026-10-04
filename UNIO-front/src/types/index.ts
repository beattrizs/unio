export type Segmento =
  | "Fintech"
  | "HealthTech"
  | "EdTech"
  | "AgTech"
  | "Economia Criativa"
  | "Outro";

export type Estagio = "Ideação" | "MVP" | "Operação" | "Escala";

export type Necessidade =
  | "Investimento"
  | "Mentoria"
  | "Networking"
  | "Validação de mercado";

export type TipoPerfil = "Investidor Anjo" | "Mentor" | "Ambos";

export type Disponibilidade = "Baixa" | "Média" | "Alta";

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
