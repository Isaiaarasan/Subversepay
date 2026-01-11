import React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T, index: number) => string | number;
    onRowClick?: (item: T, index: number) => void;
    emptyMessage?: string;
    className?: string;
    headerClassName?: string;
    rowClassName?: string | ((item: T, index: number) => string);
    loading?: boolean;
    loadingRows?: number;
}

/**
 * DataTable - Reusable table component with consistent styling
 * Used across: Merchants, Approvals, Tickets, System Health, etc.
 * 
 * @example
 * <DataTable
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'status', header: 'Status', render: (item) => <Badge>{item.status}</Badge> }
 *   ]}
 *   data={merchants}
 *   keyExtractor={(item) => item.id}
 *   onRowClick={(item) => handleRowClick(item)}
 * />
 */
export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    keyExtractor,
    onRowClick,
    emptyMessage = "No data available",
    className,
    headerClassName,
    rowClassName,
    loading = false,
    loadingRows = 5,
}: DataTableProps<T>) {
    const isClickable = !!onRowClick;

    const getRowClassName = (item: T, index: number) => {
        const baseClass = cn(
            "transition-colors",
            isClickable && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
        );

        if (typeof rowClassName === "function") {
            return cn(baseClass, rowClassName(item, index));
        }
        return cn(baseClass, rowClassName);
    };

    if (loading) {
        return (
            <div className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden", className)}>
                <table className="w-full text-left">
                    <thead className={cn("bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800", headerClassName)}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={cn(
                                        "px-4 py-3 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider",
                                        column.headerClassName
                                    )}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {Array.from({ length: loadingRows }).map((_, i) => (
                            <tr key={i}>
                                {columns.map((column) => (
                                    <td key={column.key} className="px-4 py-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden", className)}>
                <div className="p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden", className)}>
            <table className="w-full text-left">
                <thead className={cn("bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800", headerClassName)}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    "px-4 py-3 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider",
                                    column.headerClassName
                                )}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {data.map((item, index) => (
                        <tr
                            key={keyExtractor(item, index)}
                            className={getRowClassName(item, index)}
                            {...(onRowClick ? { onClick: () => onRowClick(item, index) } : {})}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={cn("px-4 py-3 text-sm text-gray-700 dark:text-gray-300", column.className)}
                                >
                                    {column.render ? column.render(item, index) : item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
