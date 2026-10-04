import type { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  id,
  className = "",
  ...rest
}: AuthInputProps) {
  return (
    <div className="mb-3 w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-full border border-deepgreen/30 bg-lightgray px-5 py-2.5 text-sm text-deepgreen placeholder:text-deepgreen/70 focus:outline-none focus:ring-2 focus:ring-deepgreen ${className}`}
        {...rest}
      />
    </div>
  );
}
