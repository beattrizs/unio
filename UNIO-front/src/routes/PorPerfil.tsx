import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { perfilDoPapel } from "../components/layout/navegacao";

// Mesma rota, conteúdo diferente por perfil (ex.: /meus-unios)
export default function PorPerfil({ investidor, startup }: { investidor: ReactNode; startup: ReactNode }) {
  const { user } = useAuth();
  return <>{perfilDoPapel(user?.role) === "startup" ? startup : investidor}</>;
}
