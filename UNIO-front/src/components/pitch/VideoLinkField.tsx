import { ExternalLink, Play } from "lucide-react";
import { parseVideoUrl } from "../../utils/pitch";
import { FIELD_BASE, OUTLINE_BUTTON, fieldBorder } from "./styles";

interface VideoLinkFieldProps {
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

// URL field of the pitch video (YouTube or Vimeo) with a "Testar link"
// action that opens the video in a new tab. Disabled while the link is empty
// or invalid (a disabled <a> doesn't exist, hence the <button>).
export default function VideoLinkField({ id, value, error, onChange, onBlur }: VideoLinkFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const link = parseVideoUrl(value);

  const content = (
    <>
      <ExternalLink size={16} aria-hidden="true" />
      Testar link
    </>
  );

  return (
    <div>
      <label htmlFor={id} className="block font-medium text-deepgreen">
        Link do vídeo pitch (opcional)
      </label>
      <p id={hintId} className="mt-0.5 text-xs text-deepgreen/75">
        Aceita links do YouTube ou do Vimeo.
      </p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Play
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-deepgreen/75"
            aria-hidden="true"
          />
          <input
            id={id}
            type="url"
            inputMode="url"
            autoComplete="url"
            value={value}
            placeholder="https://youtube.com/watch?v=..."
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${hintId} ${errorId}` : hintId}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            className={`${FIELD_BASE} ${fieldBorder(Boolean(error))} min-h-[48px] bg-lightgray pl-11 pr-4`}
          />
        </div>
        {link ? (
          <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${OUTLINE_BUTTON} shrink-0`}>
            {content}
            <span className="sr-only"> (abre o vídeo do {link.provider} em uma nova aba)</span>
          </a>
        ) : (
          <button type="button" disabled className={`${OUTLINE_BUTTON} shrink-0`}>
            {content}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
