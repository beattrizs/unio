import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Fica em volta da home do perfil: quem tem conta mas ainda não cadastrou o
// perfil (startup/investidor) é mandado pro formulário de cadastro. Deve
// ficar dentro de um ProtectedRoute.
export default function CadastroGate({ rotaCadastro }: { rotaCadastro: string }) {
  const { user } = useAuth();
  if (user?.perfilCompleto === false) {
    return <Navigate to={rotaCadastro} replace />;
  }
  return <Outlet />;
}
