import type { RespostasInvestidor } from "../../../types/onboarding";

// Props em comum dos componentes de cada passo do investidor
export interface PassoInvestidorProps {
  respostas: RespostasInvestidor;
  atualizar: (parcial: Partial<RespostasInvestidor>) => void;
}
