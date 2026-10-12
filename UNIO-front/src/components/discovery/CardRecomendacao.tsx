import type { Recomendacao } from "../../types/recomendacoes";
import InvestorCard from "./InvestorCard";
import StartupCard from "./StartupCard";

interface CardRecomendacaoProps {
  rec: Recomendacao;
  melhorMatch?: boolean;
  ocupado?: boolean;
  onSalvar: () => void;
  onInteresse: () => void;
  onDesfazer: () => void;
}

// Card certo para o perfil: startup (vista pelo investidor) ou investidor
// (vista pela startup). Usado nas telas compartilhadas, como Salvos.
export default function CardRecomendacao({ rec, ...acoes }: CardRecomendacaoProps) {
  return rec.perfil === "investidor" ? <StartupCard item={rec.item} {...acoes} /> : <InvestorCard item={rec.item} {...acoes} />;
}
