"use client";

import React from "react";
import MetricCard from "@/components/ui/metric-card";
// import WeeklyTrendChart from "@/components/charts/weekly-trend-chart";
import ActiveCustomersTable from "@/components/customers/active-customers-table";
import PaymentHistoryTable from "@/components/payments/payment-history-table";
import { Users, CreditCard, Clock, BarChart3 } from "lucide-react";

const CustomerPage: React.FC = () => {
    // Mock data - In production, this would come from API/Redux store
    const activeSubscribers = 1247;
    const todaysCollection = 45230;
    const pendingCollection = 125000;
    const collectionOverview = {
        total: 2450000,
        thisMonth: 245000,
        lastMonth: 218000,
        growth: 12.4
    };

    return (
        <div className="space-y-8 pb-8">
            {/* Page Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Customer Management
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Monitor customer subscriptions, collections, and payment trends.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Active Subscribers Count */}
                <MetricCard
                    title="Active Subscribers"
                    value={activeSubscribers.toLocaleString('en-IN')}
                    subtitle="Total active customers"
                    trend="up"
                    trendValue="+8.2%"
                    icon={Users}
                />

                {/* Today's Collection */}
                <MetricCard
                    title="Today's Collection"
                    value={`₹${todaysCollection.toLocaleString('en-IN')}`}
                    subtitle="Collected today"
                    trend="up"
                    trendValue="+15.3%"
                    icon={CreditCard}
                />

                {/* Pending Collection */}
                <MetricCard
                    title="Pending Collection"
                    value={`₹${pendingCollection.toLocaleString('en-IN')}`}
                    subtitle="Awaiting payment"
                    trend="down"
                    trendValue="-5.2%"
                    icon={Clock}
                />

                {/* Collection Overview */}
                <MetricCard
                    title="Collection Overview"
                    value={`₹${(collectionOverview.thisMonth / 1000).toFixed(0)}K`}
                    subtitle={`This month (${collectionOverview.growth > 0 ? '+' : ''}${collectionOverview.growth}%)`}
                    trend={collectionOverview.growth > 0 ? "up" : "down"}
                    trendValue={`${collectionOverview.growth > 0 ? '+' : ''}${collectionOverview.growth}%`}
                    icon={BarChart3}
                />
            </div>

            {/* Weekly Trend Chart */}
            {/* <div className="rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none overflow-hidden">
                <WeeklyTrendChart />
            </div> */}

            {/* Active Customers Table */}
            <div className="rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none overflow-hidden">
                <ActiveCustomersTable />
            </div>

            {/* Payment History Section */}
            <div className="rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none overflow-hidden p-6">
                <PaymentHistoryTable />
            </div>
        </div>
    );
};

export default CustomerPage;
