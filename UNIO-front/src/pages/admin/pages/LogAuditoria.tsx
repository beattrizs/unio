import AdminPageHeader from "../components/AdminPageHeader";
import DataTable from "../components/DataTable";
import { useAudit } from "../context/AuditContext";

// O log ainda é local até existir um endpoint de auditoria no back-end.

// Só leitura: o AuditContext já guarda os logs do mais recente pro mais
// antigo, então essa tela não precisa reordenar nada.
export default function LogAuditoria() {
  const { logs } = useAudit();

  return (
    <div>
      <AdminPageHeader
        title="Log de Auditoria"
        subtitle="Ações de moderação realizadas nesta sessão, mais recentes primeiro."
      />

      <DataTable
        rowKey={(row) => row.id}
        rows={logs}
        emptyMessage="Nenhuma ação registrada ainda. Aprove, rejeite ou remova algo nas telas de moderação."
        columns={[
          { header: "Data/Hora", render: (row) => row.dataHora },
          { header: "Usuário", render: (row) => row.usuario },
          { header: "Ação realizada", render: (row) => row.acao },
        ]}
      />
    </div>
  );
}
