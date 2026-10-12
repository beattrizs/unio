import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import startupRoutes from "./startupRoutes";
import investidorRoutes from "./investidorRoutes";
import compartilhadasRoutes from "./compartilhadasRoutes";
import onboardingRoutes from "./onboardingRoutes";
import ProtectedRoute from "./ProtectedRoute";
import GatePorPerfil from "./GatePorPerfil";

const AppLayout = lazy(() => import("../components/layout/AppLayout"));

// Componente único de rotas da aplicação — App.tsx só renderiza isso dentro
// do BrowserRouter. Junta as rotas públicas e as do admin (cada uma em seu
// próprio arquivo) e adiciona o catch-all: qualquer caminho desconhecido
// volta pra home.
//
// Investidor e startup ficam num grupo só: mesmos gates (cadastro e
// onboarding do perfil logado), mesmo AppLayout (sidebar compartilhada) e um
// ProtectedRoute por papel para as telas exclusivas.
export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}
      {onboardingRoutes}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {adminRoutes}
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["investidor", "startup"]} />}>
        <Route element={<GatePorPerfil etapa="cadastro" />}>
          <Route element={<GatePorPerfil etapa="onboarding" />}>
            <Route
              element={
                <Suspense fallback={<div className="p-8 text-deepgreen">Carregando...</div>}>
                  <AppLayout />
                </Suspense>
              }
            >
              <Route element={<ProtectedRoute allowedRoles={["investidor"]} />}>{investidorRoutes}</Route>
              <Route element={<ProtectedRoute allowedRoles={["startup"]} />}>{startupRoutes}</Route>
              {compartilhadasRoutes}
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
