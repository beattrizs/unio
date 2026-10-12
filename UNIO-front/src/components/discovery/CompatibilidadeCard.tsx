import { useId, useState } from "react";
import { CircleHelp } from "lucide-react";
import type { Compatibilidade, CriterioCompatibilidade } from "../../types/discovery";
import { FOCO_VISIVEL } from "../onboarding/selecao";
import MatchRing from "./MatchRing";
import ScoreBar from "./ScoreBar";
import SecaoPerfil from "./SecaoPerfil";

const CRITERIOS: { chave: CriterioCompatibilidade; rotulo: string }[] = [
  { chave: "segmento", rotulo: "Segmento" },
  { chave: "estagio", rotulo: "Estágio" },
  { chave: "ticket", rotulo: "Ticket" },
  { chave: "regiao", rotulo: "Região" },
  { chave: "disponibilidade", rotulo: "Disponibilidade" },
];

function fraseCompatibilidade(total: number) {
  if (total >= 90) return "Excelente match com sua tese";
  if (total >= 80) return "Ótimo match com sua tese";
  if (total >= 70) return "Bom match com sua tese";
  return "Match parcial com sua tese";
}

// "Compatibilidade de Tese": anel com o total e uma barra por critério.
// O "?" abre uma explicação curta de como o número é calculado.
export default function CompatibilidadeCard({ compatibilidade }: { compatibilidade: Compatibilidade }) {
  const [ajudaAberta, setAjudaAberta] = useState(false);
  const idAjuda = useId();

  return (
    <SecaoPerfil
      titulo="Compatibilidade de Tese"
      destaque
      selo={
        <button
          type="button"
          onClick={() => setAjudaAberta((aberta) => !aberta)}
          aria-expanded={ajudaAberta}
          aria-controls={idAjuda}
          aria-label="Como a compatibilidade é calculada"
          className={`rounded-full p-1 text-deepgreen hover:bg-lightgray ${FOCO_VISIVEL}`}
        >
          <CircleHelp size={20} aria-hidden="true" />
        </button>
      }
    >
      <p
        id={idAjuda}
        hidden={!ajudaAberta}
        className="mb-4 rounded-2xl bg-lightgray/50 p-3 text-xs leading-relaxed text-deepgreen/80"
      >
        Comparamos as respostas da sua tese (segmentos, estágios, ticket, região e disponibilidade) com
        os dados da startup. Segmento pesa mais; disponibilidade, menos.
      </p>

      <div className="flex flex-col items-center">
        <MatchRing valor={compatibilidade.total} tamanho="lg" />
        <p className="mt-5 text-center text-sm font-bold text-deepgreen">
          {fraseCompatibilidade(compatibilidade.total)}
        </p>
      </div>

      <div className="mt-6 space-y-4 border-t border-lightgray pt-5">
        {CRITERIOS.map(({ chave, rotulo }) => (
          <ScoreBar key={chave} rotulo={rotulo} valor={compatibilidade.notas[chave]} />
        ))}
      </div>
    </SecaoPerfil>
  );
}
