import type { LucideIcon } from "lucide-react";
import { FIELD_BASE, fieldBorder } from "./styles";

interface TextAreaFieldProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  hint?: string;
  required?: boolean;
  value: string;
  maxLength: number;
  error?: string;
  rows?: number;
  placeholder?: string;
  // Background of the textarea (lightgray on white cards, white on tinted tiles)
  tone?: "default" | "onTinted";
  onChange: (value: string) => void;
  onBlur: () => void;
}

// Share of the limit from which the counter is highlighted
const NEAR_LIMIT = 0.9;

// Textarea with label, hint, character counter and an error linked through
// aria-describedby. The limit is soft (no native maxLength), so the counter
// can show when the text goes over it.
export default function TextAreaField({
  id,
  label,
  icon: Icon,
  hint,
  required = false,
  value,
  maxLength,
  error,
  rows = 4,
  placeholder,
  tone = "default",
  onChange,
  onBlur,
}: TextAreaFieldProps) {
  const hintId = `${id}-hint`;
  const counterId = `${id}-counter`;
  const errorId = `${id}-error`;
  const length = value.length;
  const overLimit = length > maxLength;
  const nearLimit = !overLimit && length >= maxLength * NEAR_LIMIT;
  const counterColor = overLimit
    ? "font-semibold text-red-600"
    : nearLimit
      ? "font-semibold text-deepgreen"
      : "text-deepgreen/75";

  const describedBy = [hint ? hintId : null, counterId, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className="flex h-full flex-col">
      <label htmlFor={id} className={`flex items-center gap-2 text-deepgreen ${Icon ? "font-bold" : "font-medium"}`}>
        {Icon && <Icon size={16} className="shrink-0" aria-hidden="true" />}
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="mt-0.5 text-xs text-deepgreen/75">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`${FIELD_BASE} ${fieldBorder(Boolean(error))} ${
          tone === "onTinted" ? "bg-white" : "bg-lightgray"
        } mt-2 min-h-[96px] flex-1 resize-y px-4 py-3 leading-relaxed`}
      />
      <div className="mt-1 flex items-start justify-between gap-3">
        {error ? (
          <p id={errorId} className="text-sm text-red-600">
            {error}
          </p>
        ) : (
          <span />
        )}
        <p id={counterId} className={`shrink-0 text-xs tabular-nums ${counterColor}`}>
          <span aria-hidden="true">
            {length}/{maxLength}
          </span>
          <span className="sr-only">
            {length} de {maxLength} caracteres
          </span>
        </p>
      </div>
    </div>
  );
}
