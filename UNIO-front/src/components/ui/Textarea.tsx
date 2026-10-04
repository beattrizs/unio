import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  id,
  className = '',
  ...rest
}: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block font-medium text-deepgreen">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={`w-full rounded-2xl border bg-lightgray px-4 py-3 text-deepgreen placeholder:text-deepgreen/60 focus:outline-none focus:ring-2 focus:ring-deepgreen ${
          error ? 'border-red-500' : 'border-deepgreen/30'
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
