import { useId, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface SecaoPerfilProps {
  titulo: string;
  icone?: LucideIcon;
  // Selo à direita do título (ex.: "Dossiê UNIO Audit")
  selo?: ReactNode;
  destaque?: boolean;
  className?: string;
  children: ReactNode;
}

// Card de seção do perfil da startup: título com ícone, linha divisória e conteúdo
export default function SecaoPerfil({
  titulo,
  icone: Icone,
  selo,
  destaque = false,
  className = "",
  children,
}: SecaoPerfilProps) {
  const idTitulo = useId();
  return (
    <section
      aria-labelledby={idTitulo}
      className={`rounded-3xl bg-white p-5 shadow-soft sm:p-6 ${
        destaque ? "border-2 border-lightgray" : "border border-lightgray"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lightgray pb-4 sm:flex-nowrap">
        <h2 id={idTitulo} className="flex min-w-0 items-center gap-2 text-xl font-bold text-deepgreen">
          {Icone && <Icone size={18} className="shrink-0" aria-hidden="true" />}
          {titulo}
        </h2>
        {selo && <div className="shrink-0">{selo}</div>}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}
