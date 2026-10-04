interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Cabeçalho padrão de cada tela do admin: título (+ subtítulo opcional) à
// esquerda e um botão de ação opcional à direita — reaproveitado nas 4
// telas pra manter a mesma identidade visual.
export default function AdminPageHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-deepgreen">{title}</h1>
        {subtitle && <p className="mt-1 text-deepgreen">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-deepgreen px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage hover:text-deepgreen"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
