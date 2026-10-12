import { FOCO_VISIVEL } from "./selecao";

export interface SummaryRow {
  label: string;
  valores: string[];
  // Texto mostrado quando não há valores
  vazio?: string;
  onEdit: () => void;
}

// Resumo das respostas anteriores, com um "Editar" por linha que volta pro
// passo correspondente.
export default function SummaryList({ rows }: { rows: SummaryRow[] }) {
  return (
    <dl className="divide-y divide-lightgray rounded-2xl border border-lightgray bg-[#F7F8F5]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
        >
          <dt className="text-sm font-medium text-deepgreen sm:w-32 sm:shrink-0">
            {row.label}:
          </dt>
          <dd className="flex flex-1 items-start justify-between gap-3">
            <span className="flex flex-wrap gap-1.5">
              {row.valores.length > 0 ? (
                row.valores.map((valor) => (
                  <span
                    key={valor}
                    className="rounded-md border border-lightgray bg-white px-2 py-1 text-xs font-medium text-deepgreen"
                  >
                    {valor}
                  </span>
                ))
              ) : (
                <span className="py-1 text-xs text-deepgreen/70">
                  {row.vazio ?? "Não informado"}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={row.onEdit}
              aria-label={`Editar ${row.label.toLowerCase()}`}
              className={`shrink-0 rounded py-1 text-sm font-semibold text-deepgreen underline underline-offset-2 hover:text-deepgreen/80 ${FOCO_VISIVEL}`}
            >
              Editar
            </button>
          </dd>
        </div>
      ))}
    </dl>
  );
}
