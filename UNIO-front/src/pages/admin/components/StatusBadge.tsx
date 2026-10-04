import type { StatusCadastro } from "../types";

// Uma classe de cor pronta pra cada status possível do cadastro.
const ESTILOS: Record<StatusCadastro, string> = {
  Pendente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Aprovado: "bg-green-100 text-green-800 border-green-300",
  Rejeitado: "bg-red-100 text-red-800 border-red-300",
};

export default function StatusBadge({ status }: { status: StatusCadastro }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${ESTILOS[status]}`}
    >
      {status}
    </span>
  );
}
