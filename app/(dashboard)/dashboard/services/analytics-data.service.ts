"use server";

import { MetricCardProps } from "@/components/ui/metric-card";

/**
 * Analytics Service
 * Handles all business logic for analytics dashboard
 */

export interface AnalyticsMetrics {
    revenue: MetricCardProps;
    activeUsers: MetricCardProps;
    conversionRate: MetricCardProps;
    avgTransaction: MetricCardProps;
}

export interface TopMerchant {
    id: string;
    name: string;
    revenue: string;
    growth: string;
}

export interface GeographicData {
    region: string;
    percentage: number;
    amount: string;
}

/**
 * Fetch analytics metrics
 */
export async function getAnalyticsMetrics(): Promise<AnalyticsMetrics> {
    // TODO: Replace with actual Supabase query
    return {
        revenue: {
            title: "Total Revenue",
            value: "₹12.5L",
            subtitle: "This month",
            trend: "up",
            trendValue: "+15.3%",
        },
        activeUsers: {
            title: "Active Users",
            value: "45.2K",
            subtitle: "Daily active",
            trend: "up",
            trendValue: "+8.1%",
        },
        conversionRate: {
            title: "Conversion Rate",
            value: "3.24%",
            subtitle: "Payment success",
            trend: "up",
            trendValue: "+0.5%",
        },
        avgTransaction: {
            title: "Avg Transaction",
            value: "₹1,250",
            subtitle: "Per transaction",
            trend: "down",
            trendValue: "-2.1%",
        },
    };
}

/**
 * Fetch top performing merchants
 */
export async function getTopMerchants(): Promise<TopMerchant[]> {
    // TODO: Replace with actual Supabase query
    return [
        { id: "1", name: "SpeedNet ISP", revenue: "₹2.1L", growth: "+12%" },
        { id: "2", name: "FitZone Gyms", revenue: "₹1.8L", growth: "+8%" },
        { id: "3", name: "CableNet Sols", revenue: "₹1.5L", growth: "+15%" },
    ];
}

/**
 * Fetch geographic distribution data
 */
export async function getGeographicDistribution(): Promise<GeographicData[]> {
    // TODO: Replace with actual Supabase query
    return [
        { region: "Maharashtra", percentage: 35, amount: "₹4.2L" },
        { region: "Karnataka", percentage: 28, amount: "₹3.4L" },
        { region: "Tamil Nadu", percentage: 20, amount: "₹2.4L" },
        { region: "Delhi NCR", percentage: 17, amount: "₹2.1L" },
    ];
}
