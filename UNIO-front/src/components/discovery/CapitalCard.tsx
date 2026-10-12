import { Banknote, Users } from "lucide-react";
import type { Captacao } from "../../types/discovery";
import { formatarMoeda, formatarPercentual } from "../../utils/formatoDescoberta";
import SecaoPerfil from "./SecaoPerfil";

// "Capital procurado e Rodada": meta, métricas da rodada e progresso da captação
export default function CapitalCard({ captacao }: { captacao: Captacao }) {
  const percentual = Math.min(100, Math.round((captacao.captado / captacao.meta) * 100));
  const investidores = captacao.investidoresConfirmados;

  return (
    <SecaoPerfil
      titulo="Capital procurado e Rodada"
      icone={Banknote}
      selo={
        <span className="rounded-full bg-sage/40 px-3 py-1 text-xs font-semibold text-deepgreen">
          Rodada {captacao.rodada} Aberta
        </span>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-deepgreen/75">Meta de captação</p>
        <p className="flex items-center gap-1.5 text-sm font-medium text-deepgreen">
          <span className="h-2 w-2 rounded-full bg-sage ring-2 ring-sage/30" aria-hidden="true" />
          Recebendo aportes
        </p>
      </div>
      <p className="mt-2 text-4xl font-bold tracking-tight text-deepgreen sm:text-5xl">
        Busca {formatarMoeda(captacao.meta)}
      </p>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-lightgray bg-lightgray/30 p-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-deepgreen/75">Valuation pretendido</dt>
          <dd className="mt-1 text-lg font-bold text-deepgreen">{formatarMoeda(captacao.valuation)}</dd>
        </div>
        <div>
          <dt className="text-xs text-deepgreen/75">Equity ofertado</dt>
          <dd className="mt-1 text-lg font-bold text-deepgreen">{formatarPercentual(captacao.equity)}</dd>
        </div>
        <div>
          <dt className="text-xs text-deepgreen/75">Instrumento</dt>
          <dd className="mt-1 text-lg font-bold text-deepgreen">{captacao.instrumento}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-bold text-deepgreen">
          {formatarMoeda(captacao.captado)} captados{" "}
          <span className="font-semibold text-deepgreen/75">({percentual}%)</span>
        </p>
        <p className="text-xs text-deepgreen/75">Meta: {formatarMoeda(captacao.meta)}</p>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso da captação"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentual}
        className="mt-2 h-3 overflow-hidden rounded-full border border-lightgray bg-lightgray/50"
      >
        <div className="h-full rounded-full bg-deepgreen" style={{ width: `${percentual}%` }} />
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-deepgreen/80">
        <Users size={16} aria-hidden="true" />
        <span>
          <strong className="font-semibold text-deepgreen">
            {investidores} {investidores === 1 ? "investidor" : "investidores"}
          </strong>{" "}
          já {investidores === 1 ? "confirmado" : "confirmados"} na rodada
        </span>
      </p>
    </SecaoPerfil>
  );
}
