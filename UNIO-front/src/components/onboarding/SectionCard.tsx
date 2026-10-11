import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionCardProps {
  // id do <h2>, pra ser usado como aria-labelledby dos grupos de opções
  tituloId: string;
  titulo: string;
  subtitulo?: string;
  icone?: LucideIcon;
  // Texto pequeno à direita (ex.: "Selecione uma opção")
  dica?: string;
  // Selo em pílula à direita (ex.: "Seleção única", "Opcional")
  selo?: string;
  children: ReactNode;
}

// Bloco branco com título usado pra agrupar perguntas dentro de um passo.
export default function SectionCard({
  tituloId,
  titulo,
  subtitulo,
  icone: Icone,
  dica,
  selo,
  children,
}: SectionCardProps) {
  return (
    <section
      aria-labelledby={tituloId}
      className="rounded-3xl border border-lightgray bg-white p-5 shadow-soft sm:p-8"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <h2
            id={tituloId}
            className="flex items-center gap-2.5 text-lg font-semibold text-deepgreen sm:text-xl"
          >
            {Icone && <Icone size={20} aria-hidden="true" />}
            {titulo}
          </h2>
          {subtitulo && (
            <p className="mt-1 text-sm text-deepgreen/75">{subtitulo}</p>
          )}
        </div>
        {dica && <span className="pt-1 text-xs text-deepgreen/75">{dica}</span>}
        {selo && (
          <span className="rounded-full bg-lightgray/70 px-2.5 py-1 text-xs font-medium text-deepgreen/80">
            {selo}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
