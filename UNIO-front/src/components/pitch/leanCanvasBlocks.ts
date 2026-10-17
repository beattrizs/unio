import {
  Activity,
  Banknote,
  DollarSign,
  Fingerprint,
  Lightbulb,
  Network,
  Sparkles,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { LeanCanvasField } from "../../types/pitch";

export interface LeanCanvasBlock {
  title: string;
  hint: string;
  icon: LucideIcon;
  // Position in the classic canvas (10-column grid on xl: 5 blocks of 2
  // columns on top, Costs and Revenue with 5 columns each at the bottom)
  layout: string;
}

export const LEAN_CANVAS_BLOCKS: Record<LeanCanvasField, LeanCanvasBlock> = {
  problem: {
    title: "Problema",
    hint: "Os 3 principais problemas que seu cliente enfrenta hoje.",
    icon: TriangleAlert,
    layout: "xl:col-span-2 xl:col-start-1 xl:row-span-2 xl:row-start-1",
  },
  solution: {
    title: "Solução",
    hint: "As funcionalidades que resolvem cada problema.",
    icon: Lightbulb,
    layout: "xl:col-span-2 xl:col-start-3 xl:row-start-1",
  },
  keyMetrics: {
    title: "Métricas-Chave",
    hint: "Os números que mostram se o negócio está funcionando.",
    icon: Activity,
    layout: "xl:col-span-2 xl:col-start-3 xl:row-start-2",
  },
  uniqueValueProposition: {
    title: "Proposta de Valor Única",
    hint: "Uma mensagem clara de por que você é diferente.",
    icon: Sparkles,
    layout: "xl:col-span-2 xl:col-start-5 xl:row-span-2 xl:row-start-1",
  },
  unfairAdvantage: {
    title: "Vantagem Injusta",
    hint: "O que não pode ser facilmente copiado ou comprado.",
    icon: Fingerprint,
    layout: "xl:col-span-2 xl:col-start-7 xl:row-start-1",
  },
  channels: {
    title: "Canais",
    hint: "Como você chega até os clientes.",
    icon: Network,
    layout: "xl:col-span-2 xl:col-start-7 xl:row-start-2",
  },
  customerSegments: {
    title: "Segmentos de Clientes",
    hint: "Quem são seus clientes-alvo e os primeiros a adotar.",
    icon: Users,
    layout: "xl:col-span-2 xl:col-start-9 xl:row-span-2 xl:row-start-1",
  },
  costStructure: {
    title: "Estrutura de Custos",
    hint: "Custos fixos e variáveis para operar e adquirir clientes.",
    icon: Banknote,
    layout: "xl:col-span-5 xl:col-start-1 xl:row-start-3",
  },
  revenueStreams: {
    title: "Fluxos de Receita",
    hint: "Como a startup ganha dinheiro: modelo, preço e recorrência.",
    icon: DollarSign,
    layout: "xl:col-span-5 xl:col-start-6 xl:row-start-3",
  },
};
