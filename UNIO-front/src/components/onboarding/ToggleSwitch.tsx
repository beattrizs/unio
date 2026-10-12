import { FOCO_VISIVEL } from "./selecao";

interface ToggleSwitchProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// Interruptor liga/desliga (role="switch"). O texto é um <label> ligado ao
// botão, então clicar no texto também alterna.
export default function ToggleSwitch({
  id,
  label,
  description,
  checked,
  onChange,
}: ToggleSwitchProps) {
  const descricaoId = description ? `${id}-descricao` : undefined;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-deepgreen">
          {label}
        </label>
        {description && (
          <p id={descricaoId} className="mt-0.5 text-xs text-deepgreen/75">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={descricaoId}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${FOCO_VISIVEL} ${
          checked ? "bg-deepgreen" : "bg-lightgray"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
