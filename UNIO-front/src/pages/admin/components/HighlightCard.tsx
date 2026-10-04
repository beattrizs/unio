import type { ReactNode } from "react";

interface HighlightCardProps {
  variant: "dark" | "light";
  title: string;
  children: ReactNode;
  className?: string;
}

// Card grande de destaque, no fim da Visão Geral. `variant` troca o fundo
// (escuro/deepgreen ou claro/lightgray) — o conteúdo em si vem de fora via
// `children`, porque os dois cards mostram coisas bem diferentes.
export default function HighlightCard({ variant, title, children, className = "" }: HighlightCardProps) {
  // deepgreen é escuro o bastante pra texto white em cima na variante "dark".
  // A variante "light" usa lightgray com texto deepgreen pra contraste.
  const estiloVariant =
    variant === "dark"
      ? "bg-deepgreen text-white"
      : "border border-deepgreen/10 bg-lightgray text-deepgreen";

  return (
    <div className={`rounded-2xl p-6 ${estiloVariant} ${className}`}>
      <p className={`text-sm font-medium ${variant === "dark" ? "text-white/70" : "text-deepgreen"}`}>
        {title}
      </p>
      {children}
    </div>
  );
}
