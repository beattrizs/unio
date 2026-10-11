import { Info } from "lucide-react";
import type { ReactNode } from "react";

// Faixa de aviso com ícone de info, no fim de cada passo.
export default function InfoNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-2xl border border-lightgray bg-[#F1F5EF] px-4 py-3.5 text-sm text-deepgreen sm:items-center sm:px-5">
      <Info size={18} className="mt-0.5 shrink-0 sm:mt-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
