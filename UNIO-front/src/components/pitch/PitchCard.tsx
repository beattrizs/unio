import { useId, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PitchCardProps {
  title: string;
  icon: LucideIcon;
  subtitle?: string;
  // Element to the right of the title (badge)
  badge?: ReactNode;
  className?: string;
  children: ReactNode;
}

// Card of the "Pitch & Lean Canvas" page. Same shell as PainelCard and
// SecaoPerfil, with the icon + subtitle + badge combination they don't offer.
export default function PitchCard({ title, icon: Icon, subtitle, badge, className = "", children }: PitchCardProps) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className={`rounded-3xl border border-lightgray bg-white p-5 shadow-soft sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lightgray text-deepgreen"
            aria-hidden="true"
          >
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <h2 id={titleId} className="text-xl font-bold text-deepgreen">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-deepgreen/80">{subtitle}</p>}
          </div>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
