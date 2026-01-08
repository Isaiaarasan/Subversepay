"use client";

import React from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, ArrowUpDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: DataTableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (!onSort) return;

    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  if (loading) {
    return (
      <div className={`bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.className || ''}`}
                >
                  <div
                    className={`flex items-center gap-2 ${column.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200' : ''}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    {column.header}
                    {column.sortable && (
                      sortKey === column.key ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-3 ${column.className || ''}`}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || '')
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <MoreHorizontal className="h-6 w-6 text-gray-400" />
                    </div>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      {data.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="text-gray-500 dark:text-gray-400 text-xs">
            Showing <span className="font-bold text-gray-900 dark:text-white">1-{data.length}</span> of{' '}
            <span className="font-bold text-gray-900 dark:text-white">{data.length}</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}