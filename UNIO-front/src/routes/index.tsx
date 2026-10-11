import { Routes, Route, Navigate } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import startupRoutes from "./startupRoutes";
import onboardingRoutes from "./onboardingRoutes";
import ProtectedRoute from "./ProtectedRoute";
import CadastroGate from "./CadastroGate";
import OnboardingGate from "./OnboardingGate";

// Componente único de rotas da aplicação — App.tsx só renderiza isso dentro
// do BrowserRouter. Junta as rotas públicas e as do admin (cada uma em seu
// próprio arquivo) e adiciona o catch-all: qualquer caminho desconhecido
// volta pra home.
export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}
      {onboardingRoutes}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {adminRoutes}
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["startup"]} />}>
        <Route element={<CadastroGate rotaCadastro="/cadastro-startup" />}>
          <Route element={<OnboardingGate perfil="startup" />}>
            {startupRoutes}
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
