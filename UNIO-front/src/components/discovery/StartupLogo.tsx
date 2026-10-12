import {
  Activity,
  Code,
  Fingerprint,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Leaf,
  Luggage,
  Palette,
  ShoppingCart,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CorLogo, IconeStartup, StartupDescoberta } from "../../types/discovery";
import { iniciais } from "../../utils/nomeUsuario";

const ICONES: Record<IconeStartup, LucideIcon> = {
  digital: Fingerprint,
  pulso: Activity,
  folha: Leaf,
  capelo: GraduationCap,
  caminhao: Truck,
  paleta: Palette,
  raio: Zap,
  coracao: HeartPulse,
  carrinho: ShoppingCart,
  codigo: Code,
  mala: Luggage,
  controle: Gamepad2,
};

const CORES: Record<CorLogo, string> = {
  escuro: "bg-deepgreen text-white",
  salvia: "bg-sage/40 text-deepgreen",
  neutro: "bg-lightgray text-deepgreen",
};

const TAMANHOS = {
  sm: { caixa: "h-10 w-10 rounded-xl text-sm", icone: 20 },
  md: { caixa: "h-12 w-12 rounded-2xl text-base", icone: 24 },
  lg: { caixa: "h-24 w-24 rounded-[28px] text-4xl ring-4 ring-sage/30", icone: 44 },
};

interface StartupLogoProps {
  startup: Pick<StartupDescoberta, "nome" | "icone" | "corLogo">;
  tamanho?: keyof typeof TAMANHOS;
}

// Logo da startup: ícone do segmento ou, sem ícone, monograma com as iniciais
// (ex.: "VP"). Decorativa — o nome sempre aparece ao lado.
export default function StartupLogo({ startup, tamanho = "md" }: StartupLogoProps) {
  const { caixa, icone } = TAMANHOS[tamanho];
  const Icone = startup.icone ? ICONES[startup.icone] : null;

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-bold ${caixa} ${CORES[startup.corLogo]}`}
    >
      {Icone ? <Icone size={icone} strokeWidth={1.75} /> : iniciais(startup.nome)}
    </span>
  );
}
