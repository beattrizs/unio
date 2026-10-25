import { useState } from "react";
import { flushSync } from "react-dom";
import { Building2, CircleAlert, Clock, Eye, FileText, Users } from "lucide-react";
import AvisoEstado from "../../components/discovery/AvisoEstado";
import { OUTLINE_BUTTON } from "../../components/pitch/styles";
import CompanyDataCard from "../../components/profile/CompanyDataCard";
import PendingChangesBar from "../../components/profile/PendingChangesBar";
import ProfileCardPreview from "../../components/profile/ProfileCardPreview";
import ProfilePageSkeleton from "../../components/profile/ProfilePageSkeleton";
import Tabs, { TabPanel, type TabItem } from "../../components/ui/Tabs";
import ContatosForm from "../../components/unios/ContatosForm";
import { useStartupProfileEditor } from "../../hooks/useStartupProfileEditor";

type ProfileTab = "dados" | "equipe" | "documentos" | "visibilidade";

const TABS_ID = "perfil-tabs";

// No count badges: the API doesn't provide them
const TABS: TabItem<ProfileTab>[] = [
  { id: "dados", label: "Dados gerais", icon: Building2 },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "documentos", label: "Documentos", icon: FileText },
  { id: "visibilidade", label: "Visibilidade", icon: Eye },
];

// Tabs the API doesn't support yet. Same notice as pages/EmBreve.tsx, without
// its page header (this page already has one).
const COMING_SOON: Record<Exclude<ProfileTab, "dados">, string> = {
  equipe: "Em breve você poderá gerenciar a equipe da startup aqui.",
  documentos: "Em breve você poderá enviar e organizar os documentos da startup aqui.",
  visibilidade: "Em breve você poderá escolher quem vê o perfil da startup aqui.",
};

// "Meu Perfil" of the startup (/meu-perfil). Only "Dados gerais" has content;
// the other tabs are "Em breve". Data comes from GET /api/profile/me via
// useStartupProfileEditor. The editor state lives here and the panels stay
// mounted, so switching tabs keeps unsaved changes.
export default function StartupProfile() {
  const editor = useStartupProfileEditor();
  const { saved, values, errors } = editor;
  const [activeTab, setActiveTab] = useState<ProfileTab>("dados");
  // Header name follows the saved profile, not the draft being typed
  const savedName = saved?.nome.trim();

  // Save can be clicked from any tab; show the form first so the hook can
  // focus the first invalid field (a hidden panel can't take focus)
  function handleSave() {
    flushSync(() => setActiveTab("dados"));
    void editor.save();
  }

  let content;
  if (editor.loading) {
    content = <ProfilePageSkeleton />;
  } else if (editor.loadError || !saved || !values) {
    content = (
      <AvisoEstado
        erro
        icone={CircleAlert}
        titulo="Não foi possível carregar o perfil"
        texto={editor.loadError ?? undefined}
        acao={
          <button type="button" onClick={editor.reload} className={OUTLINE_BUTTON}>
            Tentar novamente
          </button>
        }
      />
    );
  } else {
    content = (
      // Side by side with the same height on lg+, stacked on mobile
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <CompanyDataCard
            values={values}
            saved={saved}
            errors={errors}
            onChange={editor.setField}
            onBlur={editor.touchField}
          />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <ProfileCardPreview values={values} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 border-b border-lightgray pb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-deepgreen/75">Configurações institucionais</p>
        <h1 className="mt-2 text-3xl font-bold text-deepgreen sm:text-4xl">Meu Perfil</h1>
        <p className="mt-2 max-w-2xl text-deepgreen/80">
          Gerencie as informações públicas e cadastrais {savedName ? `da ${savedName}` : "da sua startup"}.
        </p>
      </div>

      <Tabs
        label="Seções do perfil"
        idPrefix={TABS_ID}
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
      />

      <TabPanel idPrefix={TABS_ID} tab="dados" activeTab={activeTab} className="mt-6">
        {content}

        {/* Contacts shared after a match (unchanged, already part of "Meu perfil").
            Rendered bare, as EmBreve did: the section already has its own mt-6 */}
        <ContatosForm />
      </TabPanel>

      {(Object.keys(COMING_SOON) as (keyof typeof COMING_SOON)[]).map((tab) => (
        <TabPanel key={tab} idPrefix={TABS_ID} tab={tab} activeTab={activeTab} className="mt-6">
          <AvisoEstado icone={Clock} titulo="Em breve" texto={COMING_SOON[tab]} />
        </TabPanel>
      ))}

      {editor.isDirty && (
        <PendingChangesBar
          saving={editor.saving}
          error={editor.saveError}
          onDiscard={editor.discard}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
