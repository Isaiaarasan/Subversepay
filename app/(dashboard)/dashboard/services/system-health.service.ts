"use server";

import { MetricCardProps } from "@/components/ui/metric-card";

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
        },
        failedRequests: {
            title: "Failed Requests",
            value: "421",
            subtitle: "0.003% Failure Rate",
            trend: "down",
            trendValue: "0.003%",
        },
        supabaseLogs: {
            title: "Supabase Logs",
            value: "Open Dashboard",
            subtitle: "External Link",
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

/**
 * Calculate latency data based on time range
 */
export function calculateLatencyData(timeRange: TimeRange): LatencyData {
    const ranges = {
        "Current Day": {
            labels: ["6:00", "12:00", "18:00"],
            data: [120, 135, 128, 142, 138, 145, 140, 132, 148, 143, 139, 146],
        },
        Week: {
            labels: ["Mon", "Wed", "Fri"],
            data: [125, 132, 128, 135, 140, 138, 142],
        },
        Month: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [130, 135, 132, 138],
        },
    };

    return ranges[timeRange];
}

/**
 * Calculate maximum latency for chart scaling
 */
export function calculateMaxLatency(data: number[]): number {
    return Math.max(...data) * 1.1;
}

/**
 * Generate SVG path for line chart
 */
export function calculateChartPath(
    data: number[],
    maxLatency: number,
    width: number,
    height: number
): string {
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / maxLatency) * height;
        return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
}

/**
 * Generate SVG path for area fill
 */
export function calculateAreaPath(
    data: number[],
    maxLatency: number,
    width: number,
    height: number
): string {
    const linePath = calculateChartPath(data, maxLatency, width, height);
    return `${linePath} L ${width},${height} L 0,${height} Z`;
}
