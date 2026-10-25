import { lazy } from "react";
import { Route } from "react-router-dom";
import PorPerfil from "./PorPerfil";
import ContatosForm from "../components/unios/ContatosForm";

const PaginaSalvos = lazy(() => import("../pages/shared/PaginaSalvos"));
const PaginaMeusUnios = lazy(() => import("../pages/shared/PaginaMeusUnios"));
const EmBreve = lazy(() => import("../pages/EmBreve"));
const StartupProfile = lazy(() => import("../pages/startup/StartupProfile"));

// Rotas iguais para investidor e startup (mesmos itens da sidebar). Cada
// perfil vê o seu conteúdo; Salvos e Meus unios são a mesma página com a
// prop `perfil`. Mesmo formato de Fragment do publicRoutes.tsx.
const compartilhadasRoutes = (
  <>
    <Route
      path="/salvos"
      element={<PorPerfil investidor={<PaginaSalvos perfil="investidor" />} startup={<PaginaSalvos perfil="startup" />} />}
    />
    <Route
      path="/meus-unios"
      element={
        <PorPerfil investidor={<PaginaMeusUnios perfil="investidor" />} startup={<PaginaMeusUnios perfil="startup" />} />
      }
    />
    <Route
      path="/reunioes"
      element={
        <PorPerfil
          investidor={
            <EmBreve
              titulo="Reuniões"
              texto="As reuniões ficam disponíveis depois do match, com as startups de Meus unios."
              link={{ para: "/meus-unios", rotulo: "Ver Meus unios" }}
            />
          }
          startup={
            <EmBreve
              titulo="Reuniões"
              texto="As reuniões ficam disponíveis depois do match, com os investidores de Meus unios."
              link={{ para: "/meus-unios", rotulo: "Ver Meus unios" }}
            />
          }
        />
      }
    />
    <Route
      path="/meu-perfil"
      element={
        <PorPerfil
          investidor={
            <EmBreve
              titulo="Meu perfil"
              texto="Em breve você poderá editar seus dados aqui. Sua tese de investimento já pode ser revisada."
              link={{ para: "/onboarding/investidor?passo=1", rotulo: "Revisar minha tese" }}
            >
              <ContatosForm />
            </EmBreve>
          }
          startup={<StartupProfile />}
        />
      }
    />
  </>
);

export default compartilhadasRoutes;
