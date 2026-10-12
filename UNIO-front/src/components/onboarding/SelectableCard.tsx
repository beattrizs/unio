import { Check, type LucideIcon } from "lucide-react";
import { FOCO_VISIVEL } from "./selecao";

interface SelectableCardProps {
  // single = rádio (escolha única), multiple = checkbox (escolha múltipla)
  variant: "single" | "multiple";
  selected: boolean;
  onSelect: () => void;
  title: string;
  icon?: LucideIcon;
  // Rótulo pequeno acima do título (ex.: "Finanças & Banking", "Faixa 1")
  eyebrow?: string;
  description?: string;
  size?: "md" | "lg";
  // Em grupos de escolha única, use tabIndexRadio() pra só um card do grupo
  // entrar na ordem do Tab (as setas navegam entre os outros).
  tabIndex?: number;
}

// Card selecionável usado nas grades do onboarding (segmentos, estágios,
// faixas de ticket, disponibilidade...). Deve ficar dentro de um OptionGroup,
// que dá o role="radiogroup"/"group" e a navegação por setas.
export default function SelectableCard({
  variant,
  selected,
  onSelect,
  title,
  icon: Icon,
  eyebrow,
  description,
  size = "md",
  tabIndex,
}: SelectableCardProps) {
  const eyebrowEl = eyebrow && (
    <span className="block text-xs font-medium tracking-wide text-deepgreen/70">
      {eyebrow}
    </span>
  );

  return (
    <button
      type="button"
      role={variant === "single" ? "radio" : "checkbox"}
      aria-checked={selected}
      tabIndex={tabIndex}
      onClick={onSelect}
      className={`flex h-full w-full flex-col rounded-[20px] border-[1.5px] p-4 text-left text-deepgreen transition sm:p-5 ${FOCO_VISIVEL} ${
        selected
          ? "border-deepgreen bg-sage/20 shadow-soft"
          : "border-lightgray bg-white hover:border-sage hover:shadow-soft"
      }`}
    >
      <span className="flex w-full items-start justify-between gap-3">
        {Icon ? (
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
              selected ? "bg-white shadow-sm" : "bg-lightgray/60"
            }`}
          >
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
          </span>
        ) : (
          eyebrowEl
        )}
        <Indicador variant={variant} selected={selected} />
      </span>

      <span className={`mt-auto block ${Icon ? "pt-4" : "pt-3"}`}>
        {Icon && eyebrowEl}
        <span
          className={`block font-semibold leading-snug ${
            size === "lg" ? "text-lg" : "text-base"
          } ${Icon && eyebrow ? "mt-0.5" : ""}`}
        >
          {title}
        </span>
        {description && (
          <span className="mt-1 block text-sm leading-snug text-deepgreen/75">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

// Círculo pra escolha única e quadrado pra múltipla (convenção de rádio x
// checkbox), preenchido com check quando selecionado.
function Indicador({
  variant,
  selected,
}: {
  variant: "single" | "multiple";
  selected: boolean;
}) {
  const forma = variant === "single" ? "rounded-full" : "rounded-md";
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center ${forma} transition-colors ${
        selected
          ? "bg-deepgreen text-white"
          : "border-[1.5px] border-deepgreen/25 bg-white"
      }`}
    >
      {selected && <Check size={14} strokeWidth={3} />}
    </span>
  );
}
