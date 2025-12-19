"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import MultiBarGraph from "@/components/charts/multi-bar-graph";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import SuccessScoreGraph from "@/components/charts/success-score-graph";
import { motion } from "framer-motion";

const Analytics: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-500">Comprehensive insights into platform performance.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500/20 outline-none">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Revenue"
                    value="₹12.5L"
                    subtext="This month"
                    icon={() => <div>₹</div>}
                    trend="up"
                    trendValue="+15.3%"
                />
                <StatCard
                    title="Active Users"
                    value="45.2K"
                    subtext="Daily active"
                    icon={() => <div>👥</div>}
                    trend="up"
                    trendValue="+8.1%"
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.24%"
                    subtext="Payment success"
                    icon={() => <div>📈</div>}
                    trend="up"
                    trendValue="+0.5%"
                />
                <StatCard
                    title="Avg Transaction"
                    value="₹1,250"
                    subtext="Per transaction"
                    icon={() => <div>💰</div>}
                    trend="down"
                    trendValue="-2.1%"
                />
            </div>

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
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        Top Performing Merchants
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "SpeedNet ISP", revenue: "₹2.1L", growth: "+12%" },
                            { name: "FitZone Gyms", revenue: "₹1.8L", growth: "+8%" },
                            { name: "CableNet Sols", revenue: "₹1.5L", growth: "+15%" },
                        ].map((merchant, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">{merchant.name}</div>
                                    <div className="text-sm text-gray-500">{merchant.revenue}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-600">{merchant.growth}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
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
                                        <span className="text-sm font-medium text-gray-900">{region.region}</span>
                                        <span className="text-sm text-gray-500">{region.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full"
                                            style={{ width: `${region.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ml-4 text-sm font-bold text-gray-900">{region.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;