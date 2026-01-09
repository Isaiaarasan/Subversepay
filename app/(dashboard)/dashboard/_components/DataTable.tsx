import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  emptyMessage = "No data available",
  className = "",
  rowClassName = "",
  onRowClick,
}: DataTableProps<T>) {
  const getRowClassName = (row: T, index: number): string => {
    const baseClass = "hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs";
    const customClass =
      typeof rowClassName === "function" ? rowClassName(row, index) : rowClassName;
    const clickableClass = onRowClick ? "cursor-pointer" : "";
    return `${baseClass} ${customClass} ${clickableClass}`;
  };

  const renderCell = (column: Column<T>, row: T): React.ReactNode => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden dark:bg-gray-900/80 ${className}`}>
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${column.headerClassName || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={getRowClassName(row, rowIndex)}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 ${column.className || ""}`}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
