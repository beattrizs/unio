import type {
  Segmento,
  Estagio,
  Necessidade,
  TipoPerfil,
  Disponibilidade,
} from "../types";

export const SEGMENTOS: Segmento[] = [
  "Fintech",
  "HealthTech",
  "EdTech",
  "AgTech",
  "Economia Criativa",
  "Outro",
];

export const ESTAGIOS: Estagio[] = ["Ideação", "MVP", "Operação", "Escala"];

export const NECESSIDADES: Necessidade[] = [
  "Investimento",
  "Mentoria",
  "Networking",
  "Validação de mercado",
];

export const TIPOS_PERFIL: TipoPerfil[] = [
  "Investidor Anjo",
  "Mentor",
  "Ambos",
];

export const DISPONIBILIDADES: Disponibilidade[] = ["Baixa", "Média", "Alta"];
