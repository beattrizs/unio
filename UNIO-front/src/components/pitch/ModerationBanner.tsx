import { Info } from "lucide-react";

// Fixed notice below the tabs. TODO(api): the SLA is static copy from the
// design; it should come from the backend if moderation times change.
export default function ModerationBanner() {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-sage/60 bg-sage/15 px-4 py-3 text-sm text-deepgreen sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2">
        <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        Conteúdos publicados passam por moderação antes de ficarem visíveis para os investidores da rede do Porto
        Digital.
      </p>
      <p className="shrink-0 pl-6 font-semibold sm:pl-0">SLA: ~4h úteis</p>
    </div>
  );
}
