import type { ReactNode } from "react";

// Cada coluna sabe só o título e como renderizar a célula a partir da linha.
// É esse "render" que deixa a mesma tabela servir pra dados bem diferentes
// (cadastros, log de auditoria, etc.).
interface Coluna<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Coluna<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-deepgreen/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-lightgray text-deepgreen">
          <tr>
            {columns.map((coluna) => (
              <th key={coluna.header} className="px-4 py-3 font-semibold">
                {coluna.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-deepgreen">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)} className="border-t border-deepgreen/10">
                {columns.map((coluna) => (
                  <td key={coluna.header} className={`px-4 py-3 align-middle ${coluna.className ?? ""}`}>
                    {coluna.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
