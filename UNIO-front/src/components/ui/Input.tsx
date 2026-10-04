import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block font-medium text-deepgreen">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-full border bg-lightgray px-4 py-2.5 text-deepgreen placeholder:text-deepgreen/60 focus:outline-none focus:ring-2 focus:ring-deepgreen ${
          error ? "border-red-500" : "border-deepgreen/30"
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
