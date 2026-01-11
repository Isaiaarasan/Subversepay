import React from "react";
import { Activity, RefreshCw, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricsGrid } from "@/components/ui/metrics-grid";
import { DataTable, Column } from "@/components/ui/data-table";
import {
    getSystemHealthMetrics,
    getErrorLogs,
    ErrorLog,
} from "../../services/system-health.service";
import { LatencyChart } from "./_components/latency-chart";

/**
 * System Health Page
 * System monitoring dashboard - orchestrates data fetching and rendering
 * NO business logic - all logic is in services
 */
export default async function SystemHealthPage() {
    // Fetch all data via services
    const metrics = await getSystemHealthMetrics();
    const errorLogs = await getErrorLogs();

    // Convert metrics object to array for MetricsGrid
    const metricsArray = [
        metrics.totalRequests,
        metrics.failedRequests,
        {
            ...metrics.supabaseLogs,
            onClick: () => {
                // This will be handled by client component
            },
        },
    ];

    // Define table columns
    const errorLogColumns: Column<ErrorLog>[] = [
        {
            key: "code",
            header: "Code",
            render: (log) => (
                <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-[10px] font-bold">
                    {log.code}
                </span>
            ),
        },
        {
            key: "time",
            header: "Time",
            className: "font-mono text-xs text-gray-500 dark:text-gray-400",
        },
        {
            key: "endpoint",
            header: "Endpoint",
            className: "font-mono text-xs text-gray-700 dark:text-gray-300",
        },
        {
            key: "message",
            header: "Message",
            className: "text-xs text-red-600 dark:text-red-400 font-medium",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <PageHeader
                title="System Health"
                description="Infrastructure performance and error tracking."
                icon={Activity}
                actions={
                    <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <RefreshCw size={14} /> Last updated: Just now
                    </button>
                }
            />

            {/* Metrics Grid */}
            <MetricsGrid metrics={metricsArray} columns={3} />

            {/* API Latency Chart */}
            <LatencyChart />

            {/* Error Logs Table */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                        <Activity size={16} className="text-red-500" /> Recent 500 Errors
                    </h3>
                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        View All Logs
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <DataTable
                        columns={errorLogColumns}
                        data={errorLogs}
                        keyExtractor={(log) => log.id}
                        rowClassName="hover:bg-red-50/10 dark:hover:bg-red-900/10"
                        className="border-0 shadow-none"
                    />
                </div>
            </div>
        </div>
    );
}
