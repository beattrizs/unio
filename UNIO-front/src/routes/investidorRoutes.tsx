import { lazy } from "react";
import { Route } from "react-router-dom";

const HomeInvestidor = lazy(() => import("../pages/investidor/HomeInvestidor"));
const PerfilStartup = lazy(() => import("../pages/investidor/PerfilStartup"));

// Telas só do investidor. Em routes/index.tsx ficam dentro do AppLayout e de
// ProtectedRoute(investidor); /salvos, /meus-unios, /reunioes e /meu-perfil
// estão em compartilhadasRoutes.tsx. Mesmo formato de Fragment do publicRoutes.tsx.
const investidorRoutes = (
  <>
    <Route path="/home-investidor" element={<HomeInvestidor />} />
    <Route path="/startups/:id" element={<PerfilStartup />} />
  </>
);

export default investidorRoutes;
