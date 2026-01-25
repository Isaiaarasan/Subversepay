"use client";

import React from "react";
import Link from "next/link";
import { Settings, Activity, TrendingUp, Cog, ArrowUpRight, Ticket, BarChart3 } from "lucide-react";

export function AdminQuickActions() {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none dark:bg-gray-900/80">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-5 text-lg">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard/admin/manage/managers" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Cog size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-blue-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Manage Team</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Oversee managers and team operations.</p>
        </Link>

        <Link href="/dashboard/admin/analytics" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-purple-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">View Analytics</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Analyze performance and trends.</p>
        </Link>

        <Link href="/dashboard/admin/performance" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-green-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Performance</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Monitor system performance metrics.</p>
        </Link>

        <Link href="/dashboard/admin/settings" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
              <Settings size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-orange-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Settings</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Configure organization preferences.</p>
        </Link>

        <Link href="/dashboard/admin/revenue-forecast" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <BarChart3 size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-indigo-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Revenue Forecast</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Predict future revenue trends.</p>
        </Link>

        <Link href="/dashboard/admin/tickets" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
              <Ticket size={20} />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-red-500 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Support Tickets</div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Manage customer support inquiries.</p>
        </Link>
      </div>
    </div>
  );
}