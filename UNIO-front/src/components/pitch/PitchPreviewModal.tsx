import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { LeanCanvas } from "../../types/pitch";
import { LEAN_CANVAS_FIELDS, type VideoLink } from "../../utils/pitch";
import PitchCanvasCard from "../discovery/PitchCanvasCard";
import { FOCO_VISIVEL } from "../onboarding/selecao";
import InvestorFeedPreview from "./InvestorFeedPreview";
import { LEAN_CANVAS_BLOCKS } from "./leanCanvasBlocks";

interface PitchPreviewModalProps {
  startupName: string;
  sector: string;
  shortPitch: string;
  video: VideoLink | null;
  leanCanvas: LeanCanvas;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Full investor view of the current (unsaved included) pitch and canvas.
// Same dialog behavior as components/unios/UnioModal.tsx: portal, focus on
// the title, Tab trapped inside, Esc and backdrop click close.
export default function PitchPreviewModal({ leanCanvas, onClose, ...feed }: PitchPreviewModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === titleRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[45] flex items-end justify-center bg-deepgreen/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[94vh] w-full animate-fade-in flex-col overflow-hidden rounded-t-3xl bg-white font-jakarta text-deepgreen shadow-soft-lg sm:max-h-[90vh] sm:max-w-[760px] sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-lightgray px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} ref={titleRef} tabIndex={-1} className="text-xl font-bold focus:outline-none">
              Pré-visualização para Investidores
            </h2>
            <p className="mt-1 text-sm text-deepgreen/80">
              Inclui alterações ainda não publicadas. Investidores só veem a versão aprovada na moderação.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar pré-visualização"
            className={`-mr-1 shrink-0 rounded-full p-2 hover:bg-lightgray ${FOCO_VISIVEL}`}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          <InvestorFeedPreview {...feed} />

          <section aria-labelledby={`${titleId}-canvas`} className="mt-8">
            <h3 id={`${titleId}-canvas`} className="text-lg font-bold">
              Lean Canvas
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {LEAN_CANVAS_FIELDS.map((field) => {
                const { title, icon } = LEAN_CANVAS_BLOCKS[field];
                const text = leanCanvas[field].trim();
                return (
                  <li key={field} className="min-w-0 break-words">
                    <PitchCanvasCard titulo={title} icone={icon} texto={text || "Não preenchido."} />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
