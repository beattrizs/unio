import { Play, Video } from "lucide-react";
import type { VideoLink } from "../../utils/pitch";
import { CHIP } from "./styles";

interface InvestorFeedPreviewProps {
  startupName: string;
  sector: string;
  shortPitch: string;
  video: VideoLink | null;
}

// How the startup shows up in the investors' feed. Used by the side card
// (live while typing) and by the full preview modal.
//
// TODO(api): highlight chips ("-40% água"...), video duration, relevance
// score and the "Qualificado" badge are not provided by the API, so they
// are not rendered (see "Backend requests").
export default function InvestorFeedPreview({ startupName, sector, shortPitch, video }: InvestorFeedPreviewProps) {
  const pitch = shortPitch.trim();

  return (
    <div>
      {video ? (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-deepgreen text-white">
          <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            Pitch Video HD
          </span>
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-deepgreen shadow-soft-lg"
            aria-hidden="true"
          >
            <Play size={22} className="ml-0.5" fill="currentColor" />
          </span>
          <span className="absolute bottom-3 right-3 text-xs font-semibold text-white/90">{video.provider}</span>
          <span className="sr-only">Vídeo do pitch disponível</span>
        </div>
      ) : (
        <div className="flex aspect-video flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-deepgreen/20 bg-lightgray/40 px-4 text-center text-deepgreen/75">
          <Video size={22} aria-hidden="true" />
          <p className="text-sm font-semibold">Sem vídeo do pitch</p>
          <p className="text-xs">Adicione um link do YouTube ou do Vimeo.</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h3 className="min-w-0 break-words text-lg font-bold text-deepgreen">{startupName || "Sua startup"}</h3>
        {sector && <span className={`${CHIP} bg-lightgray text-deepgreen`}>{sector}</span>}
      </div>

      {pitch ? (
        <blockquote className="mt-3 break-words border-l-4 border-sage pl-4 text-sm italic leading-relaxed text-deepgreen/90">
          “{pitch}”
        </blockquote>
      ) : (
        <p className="mt-3 text-sm text-deepgreen/75">Seu pitch curto aparece aqui.</p>
      )}
    </div>
  );
}
