import { Check } from "lucide-react";

// Ainda não existe página da política no front; trocar quando existir.
const POLITICA_PRIVACIDADE_URL = "/politica-de-privacidade";

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  // Completa a frase "Concordo em usar ___ para gerar recomendações"
  assunto: string;
  privacyHref?: string;
}

// Checkbox de consentimento LGPD. Usa um <input type="checkbox"> nativo
// (escondido visualmente) pra manter teclado e leitor de tela de graça.
export default function ConsentCheckbox({
  id,
  checked,
  onChange,
  assunto,
  privacyHref = POLITICA_PRIVACIDADE_URL,
}: ConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-lightgray bg-[#F7F8F5] px-4 py-4 sm:items-center sm:px-5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-deepgreen peer-focus-visible:ring-offset-2 ${
          checked
            ? "bg-deepgreen text-white"
            : "border-[1.5px] border-deepgreen/40 bg-white"
        }`}
      >
        {checked && <Check size={15} strokeWidth={3} />}
      </span>
      <span className="text-sm text-deepgreen">
        Concordo em usar {assunto} para gerar recomendações e a compartilhar meu contato com quem der match
        comigo, conforme a{" "}
        <a
          href={privacyHref}
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-deepgreen/80"
        >
          Política de Privacidade (LGPD)
        </a>
        .
      </span>
    </label>
  );
}
