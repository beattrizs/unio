import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const VisaoGeral = lazy(() => import("../pages/startup/VisaoGeral"));
const Investidores = lazy(() => import("../pages/startup/Investidores"));
const PerfilInvestidor = lazy(() => import("../pages/startup/PerfilInvestidor"));
const PitchCanvas = lazy(() => import("../pages/startup/PitchCanvas"));

// Telas só da startup. Em routes/index.tsx ficam dentro do AppLayout e de
// ProtectedRoute(startup). Mesmo formato de Fragment do publicRoutes.tsx.
const startupRoutes = (
  <>
    <Route path="/home-startup" element={<VisaoGeral />} />
    {/* Subpáginas da home antiga (/home-startup/investidores etc.) */}
    <Route path="/home-startup/*" element={<Navigate to="/home-startup" replace />} />
    <Route path="/investidores" element={<Investidores />} />
    <Route path="/investidores/:id" element={<PerfilInvestidor />} />
    <Route path="/pitch-canvas" element={<PitchCanvas />} />
  </>
);

export default startupRoutes;
