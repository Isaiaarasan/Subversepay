"use client";

import React from "react";
import { Shield, CheckCircle, Activity, Bell, Server, Database, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

const NotificationsPage = () => {
    // Mock Data
    const merchantActivity = [1, 2, 3, 4, 5, 6].map((_, i) => ({
        name: `SpeedNet ISP #${i + 1}`,
        tpv: `₹45,00${i}`,
        status: "active",
        time: "2 mins ago"
    }));

    const systemHealth = [
        { name: "API Services", status: "Operational", uptime: "100%", icon: Server, color: "text-green-500", bg: "bg-green-500" },
        { name: "Database", status: "Operational", uptime: "99.9%", icon: Database, color: "text-green-500", bg: "bg-green-500" },
        { name: "Payment Gateway", status: "Latency", uptime: "98.5%", icon: Activity, color: "text-yellow-500", bg: "bg-yellow-500" },
        { name: "Security Protocols", status: "Active", uptime: "100%", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500" },
    ];

    const recentActivities = [
        { action: "Merchant 'SpeedNet ISP #4' onboarded", time: "2 mins ago", type: "success" },
        { action: "High TPV alert for 'TechSolutions'", time: "15 mins ago", type: "warning" },
        { action: "System update scheduled", time: "1 hour ago", type: "neutral" },
        { action: "New support ticket #442 created", time: "2 hours ago", type: "neutral" },
        { action: "Payment Gateway latency resolved", time: "3 hours ago", type: "success" },
    ];

    const recentAlerts = [
        { title: "High Failure Rate", desc: "Unusual spike in transaction failures detected.", time: "10 mins ago", type: "warning" },
        { title: "System Maintenance", desc: "Scheduled maintenance in 2 hours.", time: "1 hour ago", type: "neutral" },
        { title: "New Merchant Application", desc: "TechPro Ltd has submitted documents.", time: "30 mins ago", type: "success" },
    ];

    return (
        <div className="space-y-8 pb-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Notifications & Activity
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Real-time updates, system health, and merchant activities.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Alerts & Recent Activity */}
                <div className="space-y-6">
                    {/* Recent Alerts */}
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            Critical Alerts
                        </h3>
                        <div className="space-y-4">
                            {recentAlerts.map((alert, i) => (
                                <div key={i} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 py-1">
                                    <div className={`absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-gray-900 ${alert.type === 'warning' ? 'bg-yellow-500' : alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                        }`}></div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{alert.title}</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.desc}</p>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-1.5 block">{alert.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Feed (Moved from Dashboard) */}
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {recentActivities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-800">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.type === 'success' ? 'bg-green-500' :
                                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                        }`}></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Active Merchants & System Health */}
                <div className="lg:col-span-2 space-y-6">
                    {/* System Status Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {systemHealth.map((item, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/60 dark:border-gray-800 shadow-sm hover:shadow-md transition-all dark:bg-gray-900/80 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${item.color}`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${item.bg} animate-pulse mt-1`}></div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Merchants */}
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Active Merchants Activity</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Live transaction processing status</p>
                            </div>
                            <Link href="/dashboard/super-admin/merchants" className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-semibold rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-100 dark:border-purple-900/30">
                                Manage Merchants
                            </Link>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                    <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        <th className="px-6 py-4 font-semibold">Merchant</th>
                                        <th className="px-6 py-4 font-semibold text-right">TPV (Today)</th>
                                        <th className="px-6 py-4 font-semibold text-center">Last Active</th>
                                        <th className="px-6 py-4 font-semibold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900/40">
                                    {merchantActivity.map((merchant, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-white dark:ring-gray-800">
                                                        {merchant.name.substring(0, 1)}
                                                    </div>
                                                    <span className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                                                        {merchant.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono text-sm text-gray-600 dark:text-gray-300">
                                                {merchant.tpv}
                                            </td>
                                            <td className="px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                                {merchant.time}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">Live</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
