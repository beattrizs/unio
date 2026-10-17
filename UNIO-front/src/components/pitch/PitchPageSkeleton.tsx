// Loading state of the "Pitch & Lean Canvas" page: tabs + two columns
export default function PitchPageSkeleton() {
  const block = "animate-pulse rounded-3xl bg-lightgray";
  return (
    <div aria-busy="true">
      <span className="sr-only">Carregando pitch e Lean Canvas</span>
      <div className="h-12 w-64 animate-pulse rounded-2xl bg-lightgray" />
      <div className="mt-4 h-14 animate-pulse rounded-2xl bg-lightgray" />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className={`h-96 ${block}`} />
          <div className={`h-64 ${block}`} />
        </div>
        <div className={`h-[28rem] lg:col-span-2 ${block}`} />
      </div>
    </div>
  );
}
