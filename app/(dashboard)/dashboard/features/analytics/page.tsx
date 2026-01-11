import React from "react";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricsGrid } from "@/components/ui/metrics-grid";
import { Button } from "@/components/ui/button";
import MultiBarGraph from "@/components/charts/multi-bar-graph";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import SuccessScoreGraph from "@/components/charts/success-score-graph";
import {
    getAnalyticsMetrics,
    getTopMerchants,
    getGeographicDistribution,
} from "../../services/analytics-data.service";
import { DateRangeFilterWrapper, TimeRangeSelector } from "./_components/analytics-filters";

/**
 * Analytics Page
 * Analytics dashboard - orchestrates data fetching and rendering
 * NO business logic - all logic is in services
 */
export default async function AnalyticsPage() {
    // Fetch all data via services
    const metrics = await getAnalyticsMetrics();
    const topMerchants = await getTopMerchants();
    const geographicData = await getGeographicDistribution();

    // Convert metrics object to array for MetricsGrid
    const metricsArray = Object.values(metrics);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <PageHeader
                title="Analytics Dashboard"
                description="Comprehensive insights into platform performance."
                icon={BarChart3}
                actions={
                    <>
                        <DateRangeFilterWrapper />
                        <TimeRangeSelector />
                        <Button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                            Report
                        </Button>
                    </>
                }
            />

            {/* Metrics Grid */}
            <MetricsGrid metrics={metricsArray} columns={4} />

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <MultiBarGraph />
                </div>
                <div className="lg:col-span-1">
                    <PaymentPieChart />
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <ComparisonGraph />
                </div>
                <div className="lg:col-span-1">
                    <SuccessScoreGraph />
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopPerformingMerchantsWidget merchants={topMerchants} />
                <GeographicDistributionWidget data={geographicData} />
            </div>
        </div>
    );
}

function TopPerformingMerchantsWidget({
    merchants,
}: {
    merchants: Awaited<ReturnType<typeof getTopMerchants>>;
}) {
    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Top Performing Merchants
            </h3>
            <div className="space-y-4">
                {merchants.map((merchant) => (
                    <div
                        key={merchant.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                        <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">{merchant.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{merchant.revenue}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">{merchant.growth}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GeographicDistributionWidget({
    data,
}: {
    data: Awaited<ReturnType<typeof getGeographicDistribution>>;
}) {
    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                Geographic Distribution
            </h3>
            <div className="space-y-4">
                {data.map((region) => (
                    <div key={region.region} className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{region.region}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{region.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-indigo-500 h-2 rounded-full"
                                    style={{ width: `${region.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="ml-4 text-sm font-bold text-gray-900 dark:text-white">{region.amount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
