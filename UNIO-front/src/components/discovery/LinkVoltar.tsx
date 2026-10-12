import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FOCO_VISIVEL } from "../onboarding/selecao";

// "← Voltar para ..." no topo dos perfis
export default function LinkVoltar({ para, rotulo }: { para: string; rotulo: string }) {
  return (
    <Link
      to={para}
      className={`inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-deepgreen hover:underline ${FOCO_VISIVEL}`}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {rotulo}
    </Link>
  );
}
