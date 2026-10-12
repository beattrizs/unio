const BLOCO = "animate-pulse rounded-xl bg-lightgray";

export default function StartupCardSkeleton() {
  return (
    <div className="flex h-[420px] flex-col rounded-3xl border border-lightgray bg-white p-5" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className={`h-6 w-28 rounded-full ${BLOCO}`} />
        <div className="h-12 w-12 animate-pulse rounded-full bg-lightgray" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className={`h-12 w-12 rounded-2xl ${BLOCO}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-5 w-32 ${BLOCO}`} />
          <div className={`h-3 w-40 ${BLOCO}`} />
        </div>
      </div>
      <div className={`mt-5 h-4 w-3/4 ${BLOCO}`} />
      <div className={`mt-2 h-4 w-2/3 ${BLOCO}`} />
      <div className="mt-auto space-y-4">
        <div className={`h-10 ${BLOCO}`} />
        <div className={`h-12 ${BLOCO}`} />
      </div>
    </div>
  );
}
