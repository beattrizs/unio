import { Route } from "react-router-dom";
import OnboardingInvestidor from "../pages/onboarding/OnboardingInvestidor";
import OnboardingStartup from "../pages/onboarding/OnboardingStartup";
import ProtectedRoute from "./ProtectedRoute";

// Onboarding do primeiro acesso, uma rota por perfil (o passo atual fica em
// ?passo=N, não em rotas separadas). Mesmo formato de Fragment do
// publicRoutes.tsx.
const onboardingRoutes = (
  <>
    <Route element={<ProtectedRoute allowedRoles={["investidor"]} />}>
      <Route path="/onboarding/investidor" element={<OnboardingInvestidor />} />
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["startup"]} />}>
      <Route path="/onboarding/startup" element={<OnboardingStartup />} />
    </Route>
  </>
);

export default onboardingRoutes;
