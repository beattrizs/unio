import type { RespostasInvestidor } from "../../../types/onboarding";
import type { ConfigOnboarding } from "../config";

export const MIN_SEGMENTOS_INVESTIDOR = 3;

export const RESPOSTAS_INICIAIS_INVESTIDOR: RespostasInvestidor = {
  segmentosInteresse: [],
  estagiosInteresse: [],
  preferenciasStartup: [],
  ticketMedio: null,
  apenasMentor: false,
  disponibilidade: null,
  formasInteracao: [],
  regioesInteresse: [],
  consentimentoLgpd: false,
};

function validarPassoInvestidor(passo: number, r: RespostasInvestidor) {
  switch (passo) {
    case 1:
      return r.segmentosInteresse.length >= MIN_SEGMENTOS_INVESTIDOR;
    case 2:
      return r.estagiosInteresse.length >= 1;
    case 3:
      // Quem atua só como mentor não precisa informar ticket
      return (r.apenasMentor || r.ticketMedio !== null) && r.disponibilidade !== null;
    case 4:
      return r.regioesInteresse.length >= 1 && r.consentimentoLgpd;
    default:
      return false;
  }
}

export const CONFIG_INVESTIDOR: ConfigOnboarding<RespostasInvestidor> = {
  etapas: ["Interesses", "Estágio das startups", "Ticket e disponibilidade", "Região"],
  respostasIniciais: RESPOSTAS_INICIAIS_INVESTIDOR,
  validarPasso: validarPassoInvestidor,
  rotaHome: "/home-investidor",
};
