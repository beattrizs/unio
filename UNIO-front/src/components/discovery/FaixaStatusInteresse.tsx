import { Link } from "react-router-dom";
import { Hourglass, Sparkles } from "lucide-react";
import type { StatusInteresse } from "../../types/discovery";
import { linkMeusUnios } from "../../utils/rotasUnio";
import { FOCO_VISIVEL } from "../onboarding/selecao";

interface FaixaStatusInteresseProps {
  // id da startup/investidor do perfil (para abrir o popup do unio)
  id: string;
  status: StatusInteresse;
  // "a startup" / "o investidor"
  outroLado: string;
}

// Faixa discreta no topo de um perfil com o estado do interesse (enviado / match)
export default function FaixaStatusInteresse({ id, status, outroLado }: FaixaStatusInteresseProps) {
  if (status === "nenhum") return null;
  if (status === "match") {
    return (
      <p className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl bg-sage/40 px-4 py-3 text-sm font-semibold text-deepgreen">
        <Sparkles size={16} aria-hidden="true" />
        Deu match!
        <Link to={linkMeusUnios(id)} className={`rounded underline underline-offset-2 hover:no-underline ${FOCO_VISIVEL}`}>
          Veja em Meus unios
        </Link>
      </p>
    );
  }
  return (
    <p className="mb-4 flex items-center gap-2 rounded-2xl bg-lightgray/70 px-4 py-3 text-sm text-deepgreen">
      <Hourglass size={16} aria-hidden="true" />
      Interesse enviado, aguardando {outroLado}
    </p>
  );
}
