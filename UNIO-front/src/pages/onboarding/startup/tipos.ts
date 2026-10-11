import type { RespostasStartup } from "../../../types/onboarding";

export interface PassoStartupProps {
  respostas: RespostasStartup;
  atualizar: (parcial: Partial<RespostasStartup>) => void;
}
