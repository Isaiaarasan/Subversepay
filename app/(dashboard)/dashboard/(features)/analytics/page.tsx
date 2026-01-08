"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import MultiBarGraph from "@/components/charts/multi-bar-graph";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import SuccessScoreGraph from "@/components/charts/success-score-graph";
import { motion } from "framer-motion";
import { analyticsService } from '../../_services/analytics.service';
import { useAnalyticsFilters } from '../../_private/hooks/useAnalyticsFilters';
import { AnalyticsFilters } from './components/AnalyticsFilters';
import { AnalyticsMetrics } from './components/AnalyticsMetrics';

const Analytics = () => {
  const { startDate, endDate, timeRange, setStartDate, setEndDate, setTimeRange, filters } = useAnalyticsFilters();

  const handleExport = async () => {
    try {
      const blob = await analyticsService.exportAnalytics(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Comprehensive insights into platform performance.</p>
        </div>

        <AnalyticsFilters
          startDate={startDate}
          endDate={endDate}
          timeRange={timeRange}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onTimeRangeChange={setTimeRange}
          onExport={handleExport}
        />
      </div>

      {/* Key Metrics */}
      <AnalyticsMetrics
        totalRevenue={1250000}
        activeUsers={45200}
        conversionRate={3.24}
        avgTransaction={1250}
      />

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
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            Top Performing Merchants
          </h3>
          <div className="space-y-4">
            {[
              { name: "SpeedNet ISP", revenue: "₹2.1L", growth: "+12%" },
              { name: "FitZone Gyms", revenue: "₹1.8L", growth: "+8%" },
              { name: "CableNet Sols", revenue: "₹1.5L", growth: "+15%" },
            ].map((merchant, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
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

        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            Geographic Distribution
          </h3>
          <div className="space-y-4">
            {[
              { region: "Maharashtra", percentage: 35, amount: "₹4.2L" },
              { region: "Karnataka", percentage: 28, amount: "₹3.4L" },
              { region: "Tamil Nadu", percentage: 20, amount: "₹2.4L" },
              { region: "Delhi NCR", percentage: 17, amount: "₹2.1L" },
            ].map((region, i) => (
              <div key={i} className="flex items-center justify-between">
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
      </div>
    </motion.div >
  );
};

export default Analytics;