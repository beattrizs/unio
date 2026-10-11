import type { RespostasInvestidor, RespostasStartup } from "../../types/onboarding";
import { CONFIG_INVESTIDOR } from "./investidor/config";
import { CONFIG_STARTUP } from "./startup/config";

// O que muda entre os fluxos de onboarding; o resto (navegação entre passos,
// persistência, concluir/pular) fica no useOnboarding.
export interface ConfigOnboarding<T> {
  // Nomes das etapas no stepper (a quantidade define o total de passos)
  etapas: string[];
  respostasIniciais: T;
  // Se as respostas do passo (começando em 1) permitem avançar
  validarPasso: (passo: number, respostas: T) => boolean;
  // Pra onde vai depois de concluir ou pular
  rotaHome: string;
}

export interface RespostasPorPerfil {
  investidor: RespostasInvestidor;
  startup: RespostasStartup;
}

export type PerfilComOnboarding = keyof RespostasPorPerfil;

export const ONBOARDING_CONFIG: {
  [P in PerfilComOnboarding]: ConfigOnboarding<RespostasPorPerfil[P]>;
} = {
  investidor: CONFIG_INVESTIDOR,
  startup: CONFIG_STARTUP,
};
