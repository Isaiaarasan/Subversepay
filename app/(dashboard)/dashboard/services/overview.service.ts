"use server";

import { MetricCardProps } from "@/components/ui/metric-card";
import { Users, Shield, UserCheck, CreditCard } from "lucide-react";

/**
 * Overview Service
 * Handles all business logic for the overview/dashboard page
 * Separates data fetching and transformation from UI components
 */

export interface OverviewMetrics {
    merchants: MetricCardProps;
    managers: MetricCardProps;
    customers: MetricCardProps;
    tpv: MetricCardProps;
}

export interface RecentActivity {
    id: string;
    action: string;
    time: string;
    type: "success" | "warning" | "info";
}

export interface PendingApproval {
    id: string;
    name: string;
    type: string;
    date: string;
}

/**
 * Fetch overview metrics
 * In production, this would fetch from Supabase
 */
export async function getOverviewMetrics(): Promise<OverviewMetrics> {
    // TODO: Replace with actual Supabase query
    // const supabase = await createClient();
    // const { data, error } = await supabase.from('metrics').select('*');

    return {
        merchants: {
            title: "Total Merchants",
            value: "45",
            subtitle: "Platform partners",
            trend: "up",
            trendValue: "+3 this week",
            icon: Users,
        },
        managers: {
            title: "Total Managers",
            value: "12",
            subtitle: "Operational staff",
            trend: "up",
            trendValue: "+1 newly added",
            icon: Shield,
        },
        customers: {
            title: "Total Customers",
            value: "1.25L",
            subtitle: "End users",
            trend: "up",
            trendValue: "+12.5% Growth",
            icon: UserCheck,
        },
        tpv: {
            title: "Total TPV",
            value: "₹8.5 Cr",
            subtitle: "Processed Volume",
            trend: "up",
            trendValue: "+8.2%",
            icon: CreditCard,
        },
    };
}

/**
 * Fetch recent activities
 */
export async function getRecentActivities(): Promise<RecentActivity[]> {
    // TODO: Replace with actual Supabase query
    return [
        {
            id: "1",
            action: "New merchant onboarded: SpeedNet ISP",
            time: "2 minutes ago",
            type: "success",
        },
        {
            id: "2",
            action: "Settlement processed: ₹2.5L",
            time: "15 minutes ago",
            type: "success",
        },
        {
            id: "3",
            action: "Approval pending: FitZone Gyms",
            time: "1 hour ago",
            type: "warning",
        },
        {
            id: "4",
            action: "System health check completed",
            time: "2 hours ago",
            type: "info",
        },
    ];
}

/**
 * Fetch pending approvals
 */
export async function getPendingApprovals(): Promise<PendingApproval[]> {
    // TODO: Replace with actual Supabase query
    return [
        {
            id: "1",
            name: "Urban Fibernet",
            type: "Merchant Onboarding",
            date: "2 days ago",
        },
        {
            id: "2",
            name: "Metro Cable",
            type: "Document Verification",
            date: "1 day ago",
        },
        {
            id: "3",
            name: "FitZone Gyms",
            type: "Settlement Request",
            date: "3 hours ago",
        },
    ];
}
