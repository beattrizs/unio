import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { CompletudePerfil } from "../../types/dashboard";
import { FOCO_VISIVEL } from "../onboarding/selecao";
import PainelCard from "./PainelCard";

// Cores do tailwind.config (o SVG precisa do valor, não da classe)
const VERDE = "#00412E";
const TRILHA = "#E8EAE5";

function Anel({ percentual }: { percentual: number }) {
  const lado = 128;
  const traco = 12;
  const raio = (lado - traco) / 2;
  const circunferencia = 2 * Math.PI * raio;
  return (
    <div
      role="img"
      aria-label={`Perfil ${percentual}% concluído`}
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: lado, height: lado }}
    >
      <svg width={lado} height={lado} className="-rotate-90" aria-hidden="true">
        <circle cx={lado / 2} cy={lado / 2} r={raio} fill="none" stroke={TRILHA} strokeWidth={traco} />
        <circle
          cx={lado / 2}
          cy={lado / 2}
          r={raio}
          fill="none"
          stroke={VERDE}
          strokeWidth={traco}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={circunferencia * (1 - percentual / 100)}
        />
      </svg>
      <span className="absolute flex flex-col items-center" aria-hidden="true">
        <span className="text-3xl font-bold leading-none text-deepgreen">{percentual}%</span>
        <span className="mt-1 text-xs text-deepgreen/75">concluído</span>
      </span>
    </div>
  );
}

interface ProfileCompletenessProps {
  completude: CompletudePerfil;
  // Destino do "Completar perfil"
  para: string;
}

// "Completude do perfil": anel com o % e checklist dos itens que mais somam
export default function ProfileCompleteness({ completude, para }: ProfileCompletenessProps) {
  return (
    <PainelCard
      titulo="Completude do perfil"
      subtitulo={
        <>
          Perfis completos recebem até <strong className="font-bold text-deepgreen">3,4× mais contatos</strong> de anjos
        </>
      }
      extra={
        <span className="inline-block rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-deepgreen">
          Nível {completude.nivel}
        </span>
      }
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Anel percentual={completude.percentual} />
        <ul className="w-full flex-1 space-y-3" aria-label="O que falta no perfil">
          {completude.itens.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                item.concluido ? "border-sage/60 bg-sage/15" : "border-lightgray bg-lightgray/30"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                  item.concluido ? "border-deepgreen bg-deepgreen text-white" : "border-deepgreen/40 bg-white"
                }`}
                aria-hidden="true"
              >
                {item.concluido && <Check size={14} strokeWidth={3} />}
              </span>
              <span className={`flex-1 text-deepgreen ${item.concluido ? "line-through decoration-deepgreen/40" : ""}`}>
                {item.rotulo}
                <span className="sr-only">{item.concluido ? " (concluído)" : " (pendente)"}</span>
              </span>
              <span className="shrink-0 rounded-full bg-sage/30 px-2 py-0.5 text-xs font-bold text-deepgreen">
                +{item.pontos}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={para}
        className={`mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-deepgreen px-6 text-base font-semibold text-white transition hover:bg-sage hover:text-deepgreen ${FOCO_VISIVEL}`}
      >
        {completude.percentual === 100 ? "Ver meu perfil" : "Completar perfil"}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </PainelCard>
  );
}
