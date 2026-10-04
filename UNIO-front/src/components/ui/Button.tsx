import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = true,
  className = "",
  ...rest
}: ButtonProps) {
  const base = `${
    fullWidth ? "w-full px-4 py-2" : "w-auto px-6 py-1.5 text-sm"
  } rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`;

  const variants = {
    // deepgreen é escuro o bastante pra texto white em cima. No hover o fundo
    // vira sage (mais claro), então o texto troca pra deepgreen pra manter contraste.
    primary:
      "bg-deepgreen text-white hover:bg-sage hover:text-deepgreen focus:ring-deepgreen",
    secondary:
      "bg-white text-deepgreen border border-deepgreen/40 hover:bg-sage/20 focus:ring-deepgreen",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
  );
}
