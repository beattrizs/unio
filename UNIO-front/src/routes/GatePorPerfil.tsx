import { useAuth } from "../contexts/AuthContext";
import { perfilDoPapel } from "../components/layout/navegacao";
import CadastroGate from "./CadastroGate";
import OnboardingGate from "./OnboardingGate";

// CadastroGate/OnboardingGate do perfil logado, para o grupo de rotas que
// investidor e startup compartilham. O <Outlet /> dos gates renderiza as
// rotas filhas desta.
export default function GatePorPerfil({ etapa }: { etapa: "cadastro" | "onboarding" }) {
  const { user } = useAuth();
  const perfil = perfilDoPapel(user?.role);
  if (etapa === "cadastro") {
    return <CadastroGate rotaCadastro={perfil === "startup" ? "/cadastro-startup" : "/cadastro-investidor"} />;
  }
  return <OnboardingGate perfil={perfil} />;
}
