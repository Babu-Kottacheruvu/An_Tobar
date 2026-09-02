import type { ReactNode } from "react";

export interface AdminTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  caption: string;
}

export function AdminTable<T>({ columns, rows, getRowId, caption }: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-brand-navy-800/12 bg-white">
      <table className="w-full min-w-160 border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-brand-navy-800/12 bg-brand-navy-50">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 font-bold text-brand-navy-900"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowId(row)} className="border-b border-brand-navy-800/8 last:border-0">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-brand-navy-800/90">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
