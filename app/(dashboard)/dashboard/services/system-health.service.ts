"use server";

import { MetricCardProps } from "@/components/ui/metric-card";
import { Activity, AlertOctagon, Database } from "lucide-react";

/**
 * System Health Service
 * Handles all business logic for system health monitoring
 */

export interface SystemHealthMetrics {
    totalRequests: MetricCardProps;
    failedRequests: MetricCardProps;
    supabaseLogs: MetricCardProps;
}

export interface ErrorLog {
    id: string;
    code: string;
    time: string;
    endpoint: string;
    message: string;
}

export interface LatencyData {
    labels: string[];
    data: number[];
}

export type TimeRange = "Current Day" | "Week" | "Month";

/**
 * Fetch system health metrics
 */
export async function getSystemHealthMetrics(): Promise<SystemHealthMetrics> {
    // TODO: Replace with actual monitoring service API
    return {
        totalRequests: {
            title: "Total Requests (24h)",
            value: "14.2M",
            subtitle: "+5% vs yesterday",
            trend: "up",
            trendValue: "+5%",
            icon: Activity,
        },
        failedRequests: {
            title: "Failed Requests",
            value: "421",
            subtitle: "0.003% Failure Rate",
            trend: "down",
            trendValue: "0.003%",
            icon: AlertOctagon,
        },
        supabaseLogs: {
            title: "Supabase Logs",
            value: "Open Dashboard",
            subtitle: "External Link",
            icon: Database,
        },
    };
}

/**
 * Fetch error logs
 */
export async function getErrorLogs(): Promise<ErrorLog[]> {
    // TODO: Replace with actual logging service
    return [
        {
            id: "1",
            code: "500",
            time: "14:32:15",
            endpoint: "/api/merchants",
            message: "Internal Server Error",
        },
        {
            id: "2",
            code: "503",
            time: "14:28:42",
            endpoint: "/api/settlements",
            message: "Service Unavailable",
        },
        {
            id: "3",
            code: "500",
            time: "14:15:03",
            endpoint: "/api/analytics",
            message: "Database Connection Timeout",
        },
    ];
}
