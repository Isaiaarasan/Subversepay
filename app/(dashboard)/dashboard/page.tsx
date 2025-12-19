"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import TicketOverlayGraph from "@/components/charts/ticket-overlay-graph";
import SuccessScoreGraph from "@/components/charts/success-score-graph";
import { Users, CreditCard, UserCheck, Shield, ArrowUpRight } from "lucide-react";

const Overview = () => {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-500">Overview of platform performance and entities.</p>
        </div>

        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500/20 outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
            Download Report
          </button>
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
        <TicketOverlayGraph />
        <SuccessScoreGraph />
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Pending Approvals</h3>
            <a href="/approvals" className="text-[10px] font-semibold text-blue-600 hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                    <p className="text-[10px] text-gray-500">{item.type} • {item.date}</p>
                  </div>
                </div>
                <button className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md font-medium text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Active Merchants Preview */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Active Merchants Activity</h3>
            <a href="/merchants" className="text-[10px] font-semibold text-blue-600 hover:underline">Manage</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
                  <th className="pb-2 pl-2">Merchant</th>
                  <th className="pb-2 text-right">TPV (Today)</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="text-xs">
                    <td className="py-2.5 pl-2 font-medium text-gray-700">SpeedNet ISP #{i + 1}</td>
                    <td className="py-2.5 text-right text-gray-600">₹45,00{i}</td>
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
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-blue-900">Add Merchant</div>
              <div className="text-sm text-blue-600">Onboard new partner</div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-green-900">View Reports</div>
              <div className="text-sm text-green-600">Download analytics</div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-purple-900">Manage Users</div>
              <div className="text-sm text-purple-600">Team administration</div>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-orange-900">System Health</div>
              <div className="text-sm text-orange-600">Check status</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
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
      </div>
    </div>
  );
};

export default Overview;