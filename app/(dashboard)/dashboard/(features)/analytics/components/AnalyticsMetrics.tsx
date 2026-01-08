"use client";

import React from 'react';
import StatCard from "@/components/ui/stat-card";

interface AnalyticsMetricsProps {
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  avgTransaction: number;
}

export function AnalyticsMetrics({
  totalRevenue,
  activeUsers,
  conversionRate,
  avgTransaction,
}: AnalyticsMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
        trend="up"
        trendValue="+12.5%"
        icon="💰"
      />
      <StatCard
        title="Active Users"
        value={activeUsers.toLocaleString()}
        trend="up"
        trendValue="+8.2%"
        icon="👥"
      />
      <StatCard
        title="Conversion Rate"
        value={`${conversionRate.toFixed(2)}%`}
        trend="up"
        trendValue="+2.1%"
        icon="📈"
      />
      <StatCard
        title="Avg Transaction"
        value={`₹${avgTransaction.toFixed(0)}`}
        trend="down"
        trendValue="-1.2%"
        icon="💳"
      />
    </div>
  );
}