import type { TipoPerfil } from "../../types";

// Tipo do investidor como aparece nos cards e perfis
const ROTULO_TIPO: Record<TipoPerfil, string> = {
  "Investidor Anjo": "Investidor anjo",
  Mentor: "Mentor",
  Ambos: "Anjo e mentor",
};

export function rotuloTipoInvestidor(tipo: TipoPerfil) {
  return ROTULO_TIPO[tipo];
}
