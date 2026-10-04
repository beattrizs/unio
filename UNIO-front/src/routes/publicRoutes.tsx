import { Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import CadastroStartup from "../pages/CadastroStartup";
import CadastroInvestidor from "../pages/CadastroInvestidor";
import HomeStartup from "../pages/HomeStartup";
import HomeInvestidor from "../pages/HomeInvestidor";
import AccessDenied from "../pages/AccessDenied";
import ProtectedRoute from "./ProtectedRoute";

// Rotas públicas: landing, login/cadastro e as páginas iniciais de cada tipo
// de conta. Isso já é um elemento <Route>/Fragment pronto (não uma função
// componente) porque o <Routes> em routes/index.tsx só sabe "olhar para
// dentro" de um Fragment — se isso fosse renderizado como <PublicRoutes />,
// o React Router não enxergaria as rotas lá dentro.
const publicRoutes = (
  <>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<EscolhaCadastro />} />
    <Route element={<ProtectedRoute allowedRoles={["startup"]} />}>
      <Route path="/cadastro-startup" element={<CadastroStartup />} />
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["investidor"]} />}>
      <Route path="/cadastro-investidor" element={<CadastroInvestidor />} />
    </Route>
    <Route path="/acesso-negado" element={<AccessDenied />} />
    <Route element={<ProtectedRoute allowedRoles={["startup"]} />}>
      <Route path="/home-startup" element={<HomeStartup />} />
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["investidor"]} />}>
      <Route path="/home-investidor" element={<HomeInvestidor />} />
    </Route>
  </>
);

export default publicRoutes;
