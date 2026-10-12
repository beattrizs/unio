import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { chaveUsuario, getStatus } from "../services/onboardingService";
import type { PerfilOnboarding, StatusOnboarding } from "../types/onboarding";

// Fica em volta da home do perfil: se o usuário ainda não concluiu nem pulou
// o onboarding, manda pra rota de onboarding. Assim tanto o login quanto o
// fim do cadastro (que já navegam pra home) passam por aqui sem precisar
// mudar aquelas telas. Deve ficar dentro de um ProtectedRoute.
export default function OnboardingGate({ perfil }: { perfil: PerfilOnboarding }) {
  const { user } = useAuth();
  const userKey = user ? chaveUsuario(user) : "";
  const [status, setStatus] = useState<{ userKey: string; valor: StatusOnboarding } | null>(
    null,
  );

  useEffect(() => {
    let ativo = true;
    getStatus(userKey).then((valor) => {
      if (ativo) setStatus({ userKey, valor });
    });
    return () => {
      ativo = false;
    };
  }, [userKey]);

  if (!status || status.userKey !== userKey) {
    return <div className="p-8 text-deepgreen">Carregando...</div>;
  }
  if (status.valor === "pendente") {
    return <Navigate to={`/onboarding/${perfil}`} replace />;
  }
  return <Outlet />;
}
