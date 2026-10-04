import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: string[];
  placeholder?: string;
}

export default function Select({
  label,
  error,
  options,
  placeholder = "Selecione...",
  id,
  className = "",
  ...rest
}: SelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block font-medium text-deepgreen">
        {label}
      </label>
      <select
        id={id}
        className={`w-full rounded-full border bg-lightgray px-4 py-2.5 text-deepgreen focus:outline-none focus:ring-2 focus:ring-deepgreen ${
          error ? "border-red-500" : "border-deepgreen/30"
        } ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
