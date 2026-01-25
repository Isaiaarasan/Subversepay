"use client";

import React from "react";
import { TrendingUp, DollarSign, Calendar, BarChart3, Plus, CreditCard, Target } from "lucide-react";
import MetricCard from "@/components/ui/metric-card";
import { TimePeriodSelector } from "../../_components/TimePeriodSelector";
import RevenueForecastChart from "@/components/charts/revenue-forecast-chart";

const RevenueForecast: React.FC = () => {
  return (
    <div className="space-y-8 pb-8">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Revenue Forecast
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Predict future revenue trends and analyze financial performance.
            </p>
          </div>
          <TimePeriodSelector />
        </div>
      </div>

      {/* Revenue Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Month (Actual) */}
        <MetricCard
          title="Current Month (Actual)"
          value="₹2,45,000"
          trend="up"
          trendValue="+12.5%"
          icon={DollarSign}
        />

        {/* Current Month (Forecast) */}
        <MetricCard
          title="Current Month (Forecast)"
          value="₹2,78,000"
          trend="up"
          trendValue="+12.5%"
          icon={TrendingUp}
        />

        {/* Current Month Collection (Actual) */}
        <MetricCard
          title="Current Month Collection"
          value="₹2,35,000"
          trend="up"
          trendValue="+15.2%"
          icon={CreditCard}
        />

        {/* Upcoming Month Collection (Predicted) */}
        <MetricCard
          title="Upcoming Month Collection"
          value="₹3,05,000"
          trend="up"
          trendValue="+13.4%"
          icon={BarChart3}
        />
      </div>

      {/* Revenue Forecast Trend Graph */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 dark:border-gray-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none dark:bg-gray-900/80 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Forecast Trend</h3>
        </div>
        <RevenueForecastChart />
      </div>

      {/* Additional Content Area */}
      
    </div>
  );
};

export default RevenueForecast;