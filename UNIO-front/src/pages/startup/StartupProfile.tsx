import { useState } from "react";
import { flushSync } from "react-dom";
import { Building2, CircleAlert, Clock, Eye, FileText, Users } from "lucide-react";
import AvisoEstado from "../../components/discovery/AvisoEstado";
import { OUTLINE_BUTTON } from "../../components/pitch/styles";
import CompanyDataCard from "../../components/profile/CompanyDataCard";
import DocumentsSection from "../../components/profile/documents/DocumentsSection";
import PendingChangesBar from "../../components/profile/PendingChangesBar";
import ProfileCardPreview from "../../components/profile/ProfileCardPreview";
import ProfilePageSkeleton from "../../components/profile/ProfilePageSkeleton";
import TeamSection from "../../components/profile/team/TeamSection";
import Tabs, { TabPanel, type TabItem } from "../../components/ui/Tabs";
import ContatosForm from "../../components/unios/ContatosForm";
import { useStartupDocuments } from "../../hooks/useStartupDocuments";
import { useStartupProfileEditor } from "../../hooks/useStartupProfileEditor";
import { useStartupTeam } from "../../hooks/useStartupTeam";

type ProfileTab = "dados" | "equipe" | "documentos" | "visibilidade";

const TABS_ID = "perfil-tabs";

function profileTabs(teamCount: number | null, documentCount: number | null): TabItem<ProfileTab>[] {
  return [
    { id: "dados", label: "Dados gerais", icon: Building2 },
    { id: "equipe", label: teamCount ? `Equipe (${teamCount})` : "Equipe", icon: Users },
    { id: "documentos", label: documentCount ? `Documentos (${documentCount})` : "Documentos", icon: FileText }, 
    { id: "visibilidade", label: "Visibilidade", icon: Eye },
  ];
}

const COMING_SOON: Record<Exclude<ProfileTab, "dados" | "equipe" | "documentos">, string> = {
  visibilidade: "Em breve você poderá escolher quem vê o perfil da startup aqui.",
};

export default function StartupProfile() {
  const editor = useStartupProfileEditor();
  const { saved, values, errors } = editor;
  const [activeTab, setActiveTab] = useState<ProfileTab>("dados");
  const team = useStartupTeam();
  const documents = useStartupDocuments();
  const savedName = saved?.nome.trim();

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
        tabs={profileTabs(team.count, documents.count)}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
      />

      <TabPanel idPrefix={TABS_ID} tab="dados" activeTab={activeTab} className="mt-6">
        {content}

        <ContatosForm />
      </TabPanel>
      
       <TabPanel idPrefix={TABS_ID} tab="equipe" activeTab={activeTab} className="mt-6">
        <TeamSection team={team} startupName={savedName ?? ""} />
      </TabPanel>

      <TabPanel idPrefix={TABS_ID} tab="documentos" activeTab={activeTab} className="mt-6">
        <DocumentsSection documents={documents} />
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
