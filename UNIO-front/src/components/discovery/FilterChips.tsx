import { Check } from "lucide-react";
import { FOCO_VISIVEL } from "../onboarding/selecao";

// Um grupo de chips (ex.: segmentos, estágios, tipo de investidor). Um valor
// por grupo; clicar de novo no chip ativo desmarca.
export interface GrupoFiltro {
  opcoes: string[];
  selecionado: string | null;
  onSelecionar: (valor: string | null) => void;
}

interface FilterChipsProps {
  id?: string;
  grupos: GrupoFiltro[];
  onTodos: () => void;
}

function Pilula({ rotulo, ativo, onClick }: { rotulo: string; ativo: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-sm transition ${FOCO_VISIVEL} ${
        ativo
          ? "border-sage bg-sage/40 font-semibold text-deepgreen"
          : "border-lightgray bg-white text-deepgreen hover:border-sage"
      }`}
    >
      {ativo && <Check size={14} strokeWidth={2.5} aria-hidden="true" />}
      {rotulo}
    </button>
  );
}

// Chips "Todos | grupo 1 | grupo 2 ...", com um separador entre os grupos
export default function FilterChips({ id, grupos, onTodos }: FilterChipsProps) {
  const nenhumAtivo = grupos.every((grupo) => grupo.selecionado === null);
  return (
    <div id={id} role="group" aria-label="Filtros" className="flex flex-wrap items-center gap-2">
      <Pilula rotulo="Todos" ativo={nenhumAtivo} onClick={onTodos} />
      {grupos.map((grupo, indice) => (
        <span key={indice} className="contents">
          {indice > 0 && grupo.opcoes.length > 0 && (
            <span className="mx-1 hidden h-6 w-px bg-lightgray sm:block" aria-hidden="true" />
          )}
          {grupo.opcoes.map((opcao) => (
            <Pilula
              key={opcao}
              rotulo={opcao}
              ativo={grupo.selecionado === opcao}
              onClick={() => grupo.onSelecionar(grupo.selecionado === opcao ? null : opcao)}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
