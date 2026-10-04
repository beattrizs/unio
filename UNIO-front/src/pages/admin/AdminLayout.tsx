import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { AuditProvider } from "./context/AuditContext";

// Layout compartilhado de toda a área /admin: sidebar + conteúdo da
// sub-rota atual (via <Outlet />), no estilo "painéis flutuantes" — o
// fundo da página é white e tanto a sidebar quanto o card de conteúdo
// têm seus próprios cantos arredondados e sombra, como se estivessem
// "boiando" sobre esse fundo.
//
// O AuditProvider fica aqui em cima pra todas as sub-rotas (cadastros,
// conteúdo, auditoria) compartilharem o mesmo log de ações.
export default function AdminLayout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <AuditProvider>
      <div className="min-h-screen bg-white p-4 md:flex md:items-start md:gap-4 lg:gap-6">
        <AdminSidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} />

        <div className="min-w-0 flex-1">
          {/* Essa barra só aparece no mobile — é o jeito de abrir a sidebar */}
          <header className="mb-4 flex items-center gap-3 rounded-2xl bg-deepgreen px-4 py-3 text-white md:hidden">
            <button type="button" onClick={() => setMenuAberto(true)} aria-label="Abrir menu">
              <Menu size={20} />
            </button>
            <span className="text-lg font-bold tracking-wide">UNIO Admin</span>
          </header>

          <main className="rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AuditProvider>
  );
}
