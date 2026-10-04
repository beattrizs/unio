import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-8">
      {children}
    </main>
  );
}
