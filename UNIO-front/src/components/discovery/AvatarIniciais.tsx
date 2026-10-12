import { iniciais } from "../../utils/nomeUsuario";

const TAMANHOS = {
  md: "h-12 w-12 text-base",
  lg: "h-24 w-24 text-4xl ring-4 ring-sage/30",
};

// Avatar de iniciais de uma pessoa (investidor/mentor). Decorativo: o nome
// sempre aparece ao lado.
export default function AvatarIniciais({ nome, tamanho = "md" }: { nome: string; tamanho?: keyof typeof TAMANHOS }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-sage/40 font-bold text-deepgreen ${TAMANHOS[tamanho]}`}
    >
      {iniciais(nome)}
    </span>
  );
}
