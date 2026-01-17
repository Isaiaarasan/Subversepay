"use client";

import React from "react";
import Link from "next/link";
import StatCard from "@/components/ui/stat-card";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import { Users, CreditCard, UserCheck, Shield, ArrowUpRight, ChevronDown, Download, Calendar, Building2, Activity, Store, CheckCircle, BarChart3, Bell, Ticket, LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setTimeRange } from "@/lib/store/slices/overviewSlice";

const SuperAdminPage = () => {
  const dispatch = useAppDispatch();
  const { timeRange, stats, recentActivities, pendingApprovals } = useAppSelector((state) => state.overview);

  // Map icon strings to actual icon components
  const iconMap: Record<string, LucideIcon> = {
    Users,
    Shield,
    UserCheck,
    CreditCard,
    Building2,
    Activity,
  };

  const statsWithIcons = stats.map((stat) => ({
    title: stat.title,
    value: stat.value,
    subtitle: stat.subtext, // Map subtext to subtitle
    trend: stat.trend as "up" | "down" | "neutral",
    trendValue: stat.trendValue,
    icon: iconMap[stat.icon] || Users,
  }));

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Complete platform oversight and management.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Time Range Selector - Premium Style */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer min-w-[140px]">
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
                  <div className="flex flex-col justify-center w-full">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Time Period</span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-500" />
                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">{timeRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[160px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-1"
            >
              <DropdownMenuItem
                onClick={() => dispatch(setTimeRange("This Month"))}
                className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "This Month"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(setTimeRange("Last Month"))}
                className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "Last Month"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                Last Month
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(setTimeRange("This Quarter"))}
                className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "This Quarter"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                This Quarter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Download Report Button - Premium Style */}
          <button className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all duration-300">
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent transition-colors w-full h-full">
              <div className="flex flex-col justify-center w-full h-full">
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
                <div className="flex items-center gap-2">
                  <Download size={14} className="text-emerald-500" />
                  <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Download Report</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsWithIcons.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Super Admin Actions - Premium Cards */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none dark:bg-gray-900/80">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-5 text-lg">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/super-admin/merchants" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Store size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-blue-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Manage Merchants</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Onboard new partners and monitor merchant activities.</p>
          </Link>

          <Link href="/dashboard/super-admin/approvals" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                <CheckCircle size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-green-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Review Approvals</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Validate documents and approve pending requests.</p>
          </Link>

          <Link href="/dashboard/super-admin/analytics" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <BarChart3 size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-purple-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">View Analytics</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Analyze platform performance and revenue growth.</p>
          </Link>

          <Link href="/dashboard/super-admin/system-health" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                <Activity size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-orange-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">System Health</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Monitor infrastructure status and uptime.</p>
          </Link>

          <Link href="/dashboard/super-admin/alerts" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                <Bell size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-red-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Monitor Alerts</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Track critical system notifications and issues.</p>
          </Link>

          <Link href="/dashboard/super-admin/tickets" className="group p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Ticket size={20} />
              </div>
              <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-indigo-500 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">Support Tickets</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Manage customer support inquiries.</p>
          </Link>
        </div>
      </div>

      {/* Graph Row 1: TPV & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ComparisonGraph />
        </div>
        <div className="lg:col-span-1">
          <PaymentPieChart />
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Pending Approvals</h3>
            <Link href="/dashboard/super-admin/approvals" className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-[10px]">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.type} • {item.date}</p>
                  </div>
                </div>
                <button className="text-[10px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Merchants Preview */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Active Merchants Activity</h3>
            <Link href="/dashboard/super-admin/merchants" className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 hover:underline">Manage</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 uppercase">
                  <th className="pb-2 pl-2">Merchant</th>
                  <th className="pb-2 text-right">TPV (Today)</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="text-xs hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-2.5 pl-2 font-medium text-gray-700 dark:text-gray-300">SpeedNet ISP #{i + 1}</td>
                    <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">₹45,00{i}</td>
                    <td className="py-2.5 text-center">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">System Status Overview</h3>
          <Link href="/dashboard/super-admin/system-health" className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">View Details</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">API Services</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Database</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">99.9% uptime</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Payment Gateway</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Minor latency detected</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Security Systems</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">All protocols active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;