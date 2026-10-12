import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { FOCO_VISIVEL } from "../onboarding/selecao";

interface ConviteFaixaProps {
  icone: LucideIcon;
  titulo: string;
  texto: string;
  acao: { para: string; rotulo: string };
}

// Faixa no fim da lista convidando a completar a tese/perfil
export default function ConviteFaixa({ icone: Icone, titulo, texto, acao }: ConviteFaixaProps) {
  return (
    <aside className="mt-10 flex flex-col gap-4 rounded-3xl border border-lightgray bg-lightgray/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-deepgreen text-white"
          aria-hidden="true"
        >
          <Icone size={22} />
        </span>
        <div>
          <p className="text-lg font-bold text-deepgreen">{titulo}</p>
          <p className="mt-1 text-sm text-deepgreen/80">{texto}</p>
        </div>
      </div>
      <Link
        to={acao.para}
        className={`inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-deepgreen bg-white px-6 text-sm font-bold text-deepgreen transition hover:bg-sage/30 ${FOCO_VISIVEL}`}
      >
        {acao.rotulo}
      </Link>
    </aside>
  );
}
