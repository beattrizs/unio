import {
  BookOpen,
  Building2,
  Cloud,
  Gamepad2,
  Globe,
  Heart,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  MessageSquare,
  Palette,
  Plane,
  Ellipsis,
  Recycle,
  Rocket,
  ShoppingBag,
  TrendingUp,
  Truck,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type {
  Estagio,
  FormaInteracao,
  RegiaoInteresse,
  Segmento,
} from "../../types";

// Ícone de cada opção do onboarding (separado de data/options.ts pra lá
// continuar sendo só dado, sem depender de React).

export const SEGMENTO_ICONES: Record<Segmento, LucideIcon> = {
  Fintech: Landmark,
  HealthTech: Heart,
  EdTech: BookOpen,
  AgTech: Leaf,
  "Economia Criativa": Palette,
  Games: Gamepad2,
  Logística: Truck,
  Energia: Zap,
  Varejo: ShoppingBag,
  Sustentabilidade: Recycle,
  "SaaS B2B": Cloud,
  Turismo: Plane,
  Outro: Ellipsis,
};

export const ESTAGIO_ICONES: Record<Estagio, LucideIcon> = {
  Ideação: Lightbulb,
  MVP: Rocket,
  Operação: TrendingUp,
  Escala: Building2,
};

export const FORMA_INTERACAO_ICONES: Record<FormaInteracao, LucideIcon> = {
  Mensagens: MessageSquare,
  "Reuniões online": Video,
  "Encontros presenciais no Recife": MapPin,
};

export const REGIAO_ICONES: Record<RegiaoInteresse, LucideIcon> = {
  "Recife / Porto Digital": MapPin,
  Pernambuco: MapPin,
  Nordeste: MapPin,
  "Todo o Brasil": MapPin,
  "Aberto a startups remotas": Globe,
};
