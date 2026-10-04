import type { ButtonHTMLAttributes } from "react";

// Fica sobre o painel deepgreen (verde escuro), então usa white — não
// deepgreen — pra ter contraste de verdade. No hover inverte: fundo
// white sólido com texto deepgreen.
export default function OutlineButton({
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-full border-2 border-white bg-transparent px-8 py-2 font-semibold tracking-wide text-white transition-colors hover:bg-white hover:text-deepgreen ${className}`}
      {...rest}
    />
  );
}
