import type { ConfigOnboarding } from "../config";
import type { RespostasStartup } from "../../../types/onboarding";

export const RESPOSTAS_INICIAIS_STARTUP: RespostasStartup = {
  segmento: null,
  estagio: null,
  necessidades: [],
  capitalProcurado: null,
  localizacao: "",
  tracao: [],
  tamanhoEquipe: null,
  modeloNegocio: null,
  mercadoAlvo: "",
  pitch: "",
  consentimentoLgpd: false,
};

function validarPassoStartup(passo: number, respostas: RespostasStartup) {
  switch (passo) {
    case 1:
      return respostas.segmento !== null && respostas.estagio !== null;
    case 2:
      return (
        respostas.necessidades.length > 0 &&
        (!respostas.necessidades.includes("Investimento") ||
          respostas.capitalProcurado !== null)
      );
    case 3:
      return (
        respostas.localizacao.trim() !== "" &&
        respostas.tamanhoEquipe !== null
      );
    case 4:
      return respostas.modeloNegocio !== null && respostas.mercadoAlvo.trim() !== "" &&
        respostas.consentimentoLgpd;
    default:
      return false;
  }
}

export const CONFIG_STARTUP: ConfigOnboarding<RespostasStartup> = {
  etapas: ["Segmento e estágio", "O que busca", "Localização e tração", "Modelo de negócio"],
  respostasIniciais: RESPOSTAS_INICIAIS_STARTUP,
  validarPasso: validarPassoStartup,
  rotaHome: "/home-startup",
};
