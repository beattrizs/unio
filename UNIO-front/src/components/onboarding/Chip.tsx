import { Check, Plus, type LucideIcon } from "lucide-react";
import { FOCO_VISIVEL } from "./selecao";

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
  // Mostra "+" antes do texto quando não selecionado (sugestões opcionais)
  showPlus?: boolean;
}

// Pílula selecionável (toggle button, aria-pressed). Com ícone, o check
// aparece no fim; sem ícone, o check (ou o "+") aparece no começo.
export default function Chip({
  label,
  selected,
  onToggle,
  icon: Icon,
  showPlus = false,
}: ChipProps) {
  const marcadorInicial = Icon ? (
    <Icon size={16} strokeWidth={selected ? 2.25 : 1.75} aria-hidden="true" />
  ) : selected ? (
    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
  ) : showPlus ? (
    <Plus size={16} aria-hidden="true" />
  ) : null;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-sm font-medium text-deepgreen transition ${FOCO_VISIVEL} ${
        selected
          ? "border-deepgreen bg-sage/25 font-semibold"
          : "border-lightgray bg-[#F6F7F4] hover:border-sage"
      }`}
    >
      {marcadorInicial}
      {label}
      {Icon && selected && <Check size={14} strokeWidth={2.5} aria-hidden="true" />}
    </button>
  );
}
