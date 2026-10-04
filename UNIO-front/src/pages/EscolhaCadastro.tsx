import { Link, useLocation } from "react-router-dom";

export default function EscolhaCadastro() {
  // O e-mail vem do passo 1 (AuthCard) e segue junto para RF01/RF02, que é
  // quem efetivamente registra a conta como cadastrada.
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  return (
    <div className="flex min-h-screen items-center justify-center bg-deepgreen px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-deepgreen">Criar conta</h1>
        <p className="mb-6 text-deepgreen">Como você quer se cadastrar?</p>

        <div className="flex flex-col gap-3">
          <Link
            to="/cadastro-startup"
            state={{ email }}
            className="w-full rounded-full bg-deepgreen px-4 py-2 font-semibold text-white transition-colors hover:bg-sage hover:text-deepgreen"
          >
            Sou startup
          </Link>
          <Link
            to="/cadastro-investidor"
            state={{ email }}
            className="w-full rounded-full border border-deepgreen/40 bg-white px-4 py-2 font-semibold text-deepgreen transition-colors hover:bg-sage/20"
          >
            Sou investidor / mentor
          </Link>
        </div>

        <p className="mt-6 text-sm text-deepgreen">
          Já tenho conta.{" "}
          <Link
            to="/login"
            className="font-semibold text-deepgreen hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
