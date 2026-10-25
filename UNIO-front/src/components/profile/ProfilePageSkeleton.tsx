// Loading state of "Meu Perfil": form card + preview card
export default function ProfilePageSkeleton() {
  const block = "animate-pulse rounded-3xl bg-lightgray";
  return (
    <div aria-busy="true">
      <span className="sr-only">Carregando perfil da startup</span>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className={`h-[36rem] lg:col-span-3 ${block}`} />
        <div className={`h-96 lg:col-span-2 ${block}`} />
      </div>
    </div>
  );
}
