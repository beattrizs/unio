import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// Modal simples: fundo escurecido + caixa central. Clicar fora ou no X fecha.
export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-deepgreen">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-deepgreen transition-opacity hover:opacity-60"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
