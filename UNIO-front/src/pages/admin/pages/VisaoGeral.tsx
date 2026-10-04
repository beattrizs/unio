import { Link } from "react-router-dom";
import AdminPageHeader from "../components/AdminPageHeader";
import MetricCard from "../components/MetricCard";
import GaugeCard from "../components/GaugeCard";
import DonutCard from "../components/DonutCard";
import RegionCard from "../components/RegionCard";
import HighlightCard from "../components/HighlightCard";
import {
  AVATARES_ATIVOS,
  CADASTROS_PENDENTES,
  CADASTROS_POR_REGIAO,
  DISTRIBUICAO_SEGMENTO,
  METRICAS,
  STARTUPS_ATIVAS,
  TAXA_APROVACAO,
} from "../data/mockAdmin";

// Dashboard de métricas, no estilo dos dashboards de analytics/fintech:
// 3 cards de número no topo, 3 cards de gráfico no meio (gauge, donut,
// barras de região) e 2 cards de destaque maiores embaixo.
export default function VisaoGeral() {
  return (
    <div>
      <AdminPageHeader
        title="Visão Geral"
        actionLabel="Exportar relatório"
        onAction={() => console.log("Exportação simulada (sem back-end).")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {METRICAS.map((metrica) => (
          <MetricCard key={metrica.label} {...metrica} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GaugeCard title="Taxa de Aprovação" percentual={TAXA_APROVACAO} legenda="aprovados" />
        <DonutCard title="Distribuição por Segmento" dados={DISTRIBUICAO_SEGMENTO} />
        <RegionCard title="Cadastros por Região" dados={CADASTROS_POR_REGIAO} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <HighlightCard variant="dark" title="Cadastros pendentes de revisão">
          <p className="mt-2 text-4xl font-bold">{CADASTROS_PENDENTES}</p>
          <Link
            to="/admin/cadastros"
            className="mt-4 inline-block rounded-full border-2 border-white px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-deepgreen"
          >
            Ver todos
          </Link>
        </HighlightCard>

        <HighlightCard variant="light" title="Ecossistema Porto Digital">
          <p className="mt-2 text-lg font-semibold text-deepgreen">
            {STARTUPS_ATIVAS} startups ativas na plataforma
          </p>
          <div className="mt-4 flex items-center">
            <div className="flex -space-x-3">
              {AVATARES_ATIVOS.map((iniciais) => (
                <span
                  key={iniciais}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-lightgray bg-deepgreen text-xs font-bold text-white"
                >
                  {iniciais}
                </span>
              ))}
            </div>
            <span className="ml-3 text-sm text-deepgreen">
              +{STARTUPS_ATIVAS - AVATARES_ATIVOS.length} outras
            </span>
          </div>
        </HighlightCard>
      </div>
    </div>
  );
}
