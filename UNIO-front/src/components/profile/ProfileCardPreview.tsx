import { Banknote, Eye, MapPin } from "lucide-react";
import type { StartupProfileFormValues } from "../../types/startupProfile";
import { formatBrl } from "../../utils/startupProfile";
import AvatarIniciais from "../discovery/AvatarIniciais";
import PitchCard from "../pitch/PitchCard";
import { CHIP } from "../pitch/styles";

// Same chip styles as the investors' RecommendationCard
const CHIP_STYLES = [
  "bg-lightgray/70 font-medium text-deepgreen",
  "border border-sage bg-sage/20 font-medium text-deepgreen",
  "bg-lightgray/50 text-deepgreen/75",
];

// Live card of the startup as investors see it, built only from the fields
// the API has. Verified icon, founding year, funding type, compatibility
// and card statistics are not provided by the API and are not rendered.
export default function ProfileCardPreview({ values }: { values: StartupProfileFormValues }) {
  const name = values.nome.trim();
  const location = values.localizacao.trim();
  const pitch = values.pitchCanvas.trim();
  const chips = [values.segmento, values.estagio, values.modeloNegocio].map((chip) => chip.trim());

  return (
    <PitchCard
      title="Pré-visualização do card"
      icon={Eye}
      subtitle="Assim sua startup aparece para os investidores."
      // Same height as the form card on lg+ (content stays at the top)
      className="h-full"
      badge={
        <span className={`${CHIP} bg-sage/30 text-deepgreen`}>
          <span className="h-2 w-2 rounded-full bg-deepgreen" aria-hidden="true" />
          Live Preview
        </span>
      }
    >
      <article className="rounded-3xl border border-lightgray bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <AvatarIniciais nome={name || "?"} />
          <div className="min-w-0">
            <h3 className="break-words text-lg font-bold leading-tight text-deepgreen">{name || "Nome da startup"}</h3>
            {location && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-deepgreen/75">
                <MapPin size={12} aria-hidden="true" />
                {location}
              </p>
            )}
          </div>
        </div>

        {chips.some(Boolean) && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Características">
            {chips.map(
              (chip, index) =>
                chip && (
                  <li key={index} className={`rounded-md px-2 py-0.5 text-xs ${CHIP_STYLES[index]}`}>
                    {chip}
                  </li>
                ),
            )}
          </ul>
        )}

        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-lightgray/40 p-3">
          <span className="rounded-lg bg-white p-1.5 text-deepgreen" aria-hidden="true">
            <Banknote size={16} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-deepgreen/75">Rodada atual</p>
            <p className="text-lg font-bold leading-tight text-deepgreen">
              {values.capitalProcurado ? `Busca ${formatBrl(values.capitalProcurado)}` : "Valor não informado"}
            </p>
          </div>
        </div>

        {pitch ? (
          <blockquote className="mt-4 line-clamp-2 break-words border-l-4 border-sage pl-3 text-sm italic leading-relaxed text-deepgreen/90">
            “{pitch}”
          </blockquote>
        ) : (
          <p className="mt-4 text-sm text-deepgreen/75">Seu pitch aparece aqui.</p>
        )}
      </article>
    </PitchCard>
  );
}
