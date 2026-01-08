"use client";

import React, { useState } from 'react';
import StatCard from '@/components/ui/stat-card';
import ComparisonGraph from '@/components/charts/comparison-graph';
import PaymentPieChart from '@/components/charts/payment-pie-chart';
import { Users, CreditCard, UserCheck, Shield, ChevronDown, Download, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UI_LABELS, TIME_RANGES } from '../../_constants/actions';
import { useAppSelector, useAppDispatch } from '../../_services/store';
import { setTimeRange } from '../../_services/overviewSlice';

export default function OverviewFeature() {
  const dispatch = useAppDispatch();
  const { timeRange, stats, recentActivities } = useAppSelector((state) => state.overview);

  // Map icon strings to actual icon components
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Users': Users,
    'Shield': Shield,
    'UserCheck': UserCheck,
    'CreditCard': CreditCard,
  };

  const statsWithIcons = stats.map((stat) => ({
    ...stat,
    icon: iconMap[stat.icon] || Users,
  }));

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {UI_LABELS.OVERVIEW}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Dashboard overview and key metrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[160px] justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium">{timeRange}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[160px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl"
            >
              {TIME_RANGES.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => dispatch(setTimeRange(range.value))}
                  className={`flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                    timeRange === range.value
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            {UI_LABELS.SAVE}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsWithIcons.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Transaction Trends
          </h3>
          <ComparisonGraph />
        </div>

        <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Payment Methods
          </h3>
          <PaymentPieChart />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Activities
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}