import React from "react";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { PaymentStatusCards } from "../../_components/PaymentStatusCards";
import { TimePeriodSelector } from "../../_components/TimePeriodSelector";
import { FailureRecoveryChart } from "@/components/charts/failure-recovery-chart";
import { RetryMetrics } from "../../_components/RetryMetrics";
import { RemindersUsageMetrics } from "../../_components/RemindersUsageMetrics";


export default async function AdminAnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <PageHeader
                    title="Analytics Dashboard"
                    description="Comprehensive insights into platform performance."
                    icon={BarChart3}
                    actions={
                        <>
                            
                            <TimePeriodSelector />
                            <Button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                                Report
                            </Button>
                        </>
                    }
                />
            </div>

            {/* Payment Status Cards */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <PaymentStatusCards />
            </div>

            {/* Failure Reasons & Recovery Linear Graph */}
           

            {/* Retry Metrics & Reminders Usage Metrics - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                    <RetryMetrics />
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                    <RemindersUsageMetrics />
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <FailureRecoveryChart />
            </div>
        </div>
    );
}
