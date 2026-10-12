import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface AvisoEstadoProps {
  icone: LucideIcon;
  titulo: string;
  texto?: string;
  // Botão/link de ação (ex.: "Tentar novamente", "Limpar filtros")
  acao?: ReactNode;
  erro?: boolean;
}

// Estado vazio, de erro ou "não encontrado" das telas do investidor
export default function AvisoEstado({ icone: Icone, titulo, texto, acao, erro = false }: AvisoEstadoProps) {
  return (
    <div
      role={erro ? "alert" : undefined}
      className="flex flex-col items-center rounded-3xl border border-dashed border-deepgreen/20 bg-white px-6 py-12 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightgray text-deepgreen" aria-hidden="true">
        <Icone size={22} />
      </span>
      <p className="mt-4 text-lg font-bold text-deepgreen">{titulo}</p>
      {texto && <p className="mt-1 max-w-md text-sm text-deepgreen/75">{texto}</p>}
      {acao && <div className="mt-5">{acao}</div>}
    </div>
  );
}
