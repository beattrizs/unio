import type { ReactNode } from "react";
import { navegarRadioPorTeclado } from "./selecao";

interface OptionGroupProps {
  mode: "single" | "multiple";
  // id do título que nomeia o grupo (ou use label quando não houver título)
  labelledBy?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}

// Agrupa SelectableCards/Chips: escolha única vira radiogroup (com setas pra
// navegar) e múltipla vira group.
export default function OptionGroup({
  mode,
  labelledBy,
  label,
  className = "",
  children,
}: OptionGroupProps) {
  return (
    <div
      role={mode === "single" ? "radiogroup" : "group"}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      onKeyDown={mode === "single" ? navegarRadioPorTeclado : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
