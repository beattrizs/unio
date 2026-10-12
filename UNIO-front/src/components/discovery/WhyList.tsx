import { Check } from "lucide-react";
import type { Motivo } from "../../types/discovery";
import SecaoPerfil from "./SecaoPerfil";

// "Por que você viu esta startup/este investidor": motivos gerados pelos
// serviços a partir dos dados dos dois lados (services/compatibilidade.ts)
export default function WhyList({
  motivos,
  titulo = "Por que você viu esta startup",
}: {
  motivos: Motivo[];
  titulo?: string;
}) {
  return (
    <SecaoPerfil titulo={titulo}>
      <ul className="space-y-4">
        {motivos.map((motivo, indice) => (
          <li key={indice} className="flex items-start gap-3 text-sm leading-snug text-deepgreen">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-deepgreen text-white"
              aria-hidden="true"
            >
              <Check size={14} strokeWidth={3} />
            </span>
            <span>
              {motivo.map((trecho, i) =>
                trecho.forte ? (
                  <strong key={i} className="font-bold">
                    {trecho.texto}
                  </strong>
                ) : (
                  <span key={i}>{trecho.texto}</span>
                ),
              )}
            </span>
          </li>
        ))}
      </ul>
    </SecaoPerfil>
  );
}
