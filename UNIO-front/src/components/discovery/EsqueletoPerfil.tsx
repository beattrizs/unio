// Carregando de um perfil (startup ou investidor): cabeçalho + duas colunas
export default function EsqueletoPerfil({ rotulo }: { rotulo: string }) {
  const bloco = "animate-pulse rounded-3xl bg-lightgray";
  return (
    <div aria-busy="true">
      <span className="sr-only">{rotulo}</span>
      <div className={`h-40 ${bloco}`} />
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className={`h-64 ${bloco}`} />
          <div className={`h-80 ${bloco}`} />
        </div>
        <div className={`h-96 ${bloco}`} />
      </div>
    </div>
  );
}
