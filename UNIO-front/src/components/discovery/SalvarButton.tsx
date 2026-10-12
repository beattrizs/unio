import { Bookmark } from "lucide-react";
import { FOCO_VISIVEL } from "../onboarding/selecao";

interface SalvarButtonProps {
  salvo: boolean;
  // Nome de quem é salvo (startup ou investidor), para o rótulo acessível
  nome: string;
  onClick: () => void;
  ocupado?: boolean;
  // icone: quadrado só com o bookmark (card); completo: com texto (perfil)
  variante?: "icone" | "completo";
  // Textos da variante completa
  rotulos?: { salvar: string; salvo: string };
}

// Salvar é independente do interesse. Estado exposto com aria-pressed.
export default function SalvarButton({
  salvo,
  nome,
  onClick,
  ocupado = false,
  variante = "icone",
  rotulos = { salvar: "Salvar startup", salvo: "Startup salva" },
}: SalvarButtonProps) {
  const icone = <Bookmark size={18} fill={salvo ? "currentColor" : "none"} aria-hidden="true" />;
  const base = `inline-flex min-h-[48px] items-center justify-center rounded-2xl border transition disabled:opacity-60 ${FOCO_VISIVEL} ${
    salvo
      ? "border-deepgreen bg-sage/30 text-deepgreen"
      : "border-lightgray bg-white text-deepgreen hover:border-sage"
  }`;

  if (variante === "completo") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={ocupado}
        aria-pressed={salvo}
        className={`${base} w-full gap-2 px-5 text-sm font-semibold`}
      >
        {icone}
        {salvo ? rotulos.salvo : rotulos.salvar}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={ocupado}
      aria-pressed={salvo}
      aria-label={`Salvar ${nome}`}
      title={salvo ? "Remover dos salvos" : "Salvar"}
      className={`${base} w-12 shrink-0`}
    >
      {icone}
    </button>
  );
}
