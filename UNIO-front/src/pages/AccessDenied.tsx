import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center text-deepgreen">
        <h1 className="text-2xl font-bold">Acesso negado</h1>
        <p className="mt-2">Seu perfil não tem permissão para acessar esta área.</p>
        <Link className="mt-6 inline-block rounded-full bg-deepgreen px-5 py-2 text-white" to="/">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
