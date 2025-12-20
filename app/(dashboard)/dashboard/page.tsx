"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
//import TicketOverlayGraph from "@/components/charts/ticket-overlay-graph";
//import SuccessScoreGraph from "@/components/charts/success-score-graph";
import { Users, CreditCard, UserCheck, Shield, ArrowUpRight, ChevronDown, Download, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Overview = () => {
  const [timeRange, setTimeRange] = React.useState("This Month");

  const stats = [
    {
      title: "Total Merchants",
      value: "45",
      subtext: "Platform partners",
      icon: Users,
      trend: "up" as const,
      trendValue: "+3 this week",
    },
    {
      title: "Total Managers",
      value: "12",
      subtext: "Operational staff",
      icon: Shield,
      trend: "up" as const,
      trendValue: "+1 newly added",
    },
    {
      title: "Total Customers",
      value: "1.25L",
      subtext: "End users",
      icon: UserCheck,
      trend: "up" as const,
      trendValue: "+12.5% Growth",
    },
    {
      title: "Total TPV",
      value: "₹8.5 Cr",
      subtext: "Processed Volume",
      icon: CreditCard,
      trend: "up" as const,
      trendValue: "+8.2%",
    },
  ];

  const recentActivities = [
    { action: "New merchant onboarded", time: "2 mins ago", type: "success" },
    { action: "Payment processed", time: "5 mins ago", type: "info" },
    { action: "Approval request received", time: "10 mins ago", type: "warning" },
    { action: "System health check completed", time: "15 mins ago", type: "success" },
  ];

  const pendingApprovals = [
    { name: "Urban Fibernet Pvt Ltd", date: "2 mins ago", type: "ISP" },
    { name: "SkyHigh Travels", date: "1 hour ago", type: "Travel" },
    { name: "Fresh Mart Chain", date: "4 hours ago", type: "Retail" },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Super Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Overview of platform performance and entities.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
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
              <DropdownMenuItem
                onClick={() => setTimeRange("This Month")}
                className={`flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                  timeRange === "This Month"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTimeRange("Last Month")}
                className={`flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                  timeRange === "Last Month"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Last Month
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTimeRange("This Quarter")}
                className={`flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                  timeRange === "This Quarter"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                This Quarter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Download Report Button */}
          <Button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
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

      {/* Graph Row 2: Ticket Overlay & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <TicketOverlayGraph /> */}
        {/* <SuccessScoreGraph /> */}
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        {/* Pending Approvals */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Pending Approvals</h3>
            <a href="/dashboard/approvals" className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.type} • {item.date}</p>
                  </div>
                </div>
                <button className="text-[10px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Active Merchants Preview */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Active Merchants Activity</h3>
            <a href="/merchants" className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">Manage</a>
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

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-left transition-colors">
              <div className="font-medium text-blue-900 dark:text-blue-100">Add Merchant</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Onboard new partner</div>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg text-left transition-colors">
              <div className="font-medium text-green-900 dark:text-green-100">View Reports</div>
              <div className="text-sm text-green-600 dark:text-green-300">Download analytics</div>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-left transition-colors">
              <div className="font-medium text-purple-900 dark:text-purple-100">Manage Users</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">Team administration</div>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg text-left transition-colors">
              <div className="font-medium text-orange-900 dark:text-orange-100">System Health</div>
              <div className="text-sm text-orange-600 dark:text-orange-300">Check status</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
        <h3 className="font-bold text-gray-800 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="font-medium text-gray-900">API Services</div>
              <div className="text-sm text-gray-500">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <div className="font-medium text-gray-900">Database</div>
              <div className="text-sm text-gray-500">99.9% uptime</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div>
              <div className="font-medium text-gray-900">Payment Gateway</div>
              <div className="text-sm text-gray-500">Minor latency detected</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Overview;