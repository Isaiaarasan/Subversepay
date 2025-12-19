"use client";

import React, { useState } from "react";
import { Server, Activity, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorLog {
    id: string;
    code: number;
    endpoint: string;
    message: string;
    time: string;
}

const SystemHealth: React.FC = () => {
    // Latency Mock Data
    const [timeRange, setTimeRange] = useState('Current Day');

    const generateData = (points: number, base: number, variance: number): number[] => {
        return Array.from({ length: points }, () => base + Math.random() * variance - variance / 2);
    };

    const latencyData = {
        'Current Day': { data: generateData(24, 45, 10), labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), interval: 'Overview (Hourly)' },
        'Week': { data: generateData(7, 50, 15), labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], interval: 'Overview (Daily)' },
        'Month': { data: generateData(30, 48, 20), labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`), interval: 'Overview (Daily)' }
    };

    const currentData = latencyData[timeRange as keyof typeof latencyData];
    const maxLatency = Math.max(...currentData.data) * 1.2;

    const errorLogs: ErrorLog[] = [
        { id: "ERR-5011", code: 500, endpoint: "/api/v1/payments/initiate", message: "Internal Server Error: Database Connection Limit Exceeded", time: "10:42 AM" },
        { id: "ERR-5012", code: 503, endpoint: "/api/v1/webhooks/hdfc", message: "Service Unavailable: Upstream Timeout", time: "11:15 AM" },
        { id: "ERR-5013", code: 500, endpoint: "/api/v1/merchants/onboard", message: "Unhandled Exception: Null Reference at Service.User", time: "01:20 PM" },
    ];

    // SVG Layout Helpers
    const width = 100;
    const height = 100;

    // Create Line Path
    const points = currentData.data.map((val, i) => {
        const x = (i / (currentData.data.length - 1)) * width;
        const y = height - (val / maxLatency) * height;
        return `${x},${y}`;
    }).join(" L ");

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
                    <p className="text-gray-500">Infrastructure performance and error tracking.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <RefreshCw size={14} /> Last updated: Just now
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Total Requests (24h)</h3>
                    <div className="text-2xl font-bold text-gray-900">14.2M</div>
                    <div className="text-green-500 text-[10px] font-medium mt-1">+5% vs yesterday</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Failed Requests</h3>
                    <div className="text-2xl font-bold text-gray-900">421</div>
                    <div className="text-red-500 text-[10px] font-medium mt-1">0.003% Failure Rate</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Supabase Logs</h3>
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                        Open Dashboard <ExternalLink size={14} />
                    </a>
                    <div className="text-gray-400 text-xs mt-1">External Link</div>
                </div>
            </div>

            {/* API Latency Linear Graph */}
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 h-80 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" /> API Latency
                        </h3>
                        <p className="text-xs text-gray-400">Average response time in ms</p>
                    </div>
                    <div className="flex bg-gray-50 rounded-lg p-1">
                        {['Current Day', 'Week', 'Month'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range ? "bg-white text-blue-600 shadow-sm font-bold" : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative w-full overflow-hidden">
                    <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                        {/* Grid Lines */}
                        {[0, 25, 50, 75, 100].map(y => (
                            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                        ))}

                        {/* Line Path */}
                        <motion.path
                            d={`M ${points}`}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />

                        {/* Area Fill (Optional) */}
                        <motion.path
                            d={`M ${points} L 100,100 L 0,100 Z`}
                            fill="url(#latencyGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />

                        <defs>
                            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Tooltip Hover Area (Simplified) */}
                </div>

                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
                    <span>{currentData.labels[0]}</span>
                    <span>{currentData.labels[Math.floor(currentData.labels.length / 2)]}</span>
                    <span>{currentData.labels[currentData.labels.length - 1]}</span>
                </div>
            </div>

            {/* API Error Log */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/60 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500" /> Recent 500 Errors
                    </h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline">View All Logs</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase">Code</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase">Time</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase">Endpoint</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {errorLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-red-50/10 transition-colors">
                                <td className="px-4 py-3">
                                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded-md text-[10px] font-bold">{log.code}</span>
                                </td>
                                <td className="px-4 py-3 text-xs font-mono text-gray-500">{log.time}</td>
                                <td className="px-4 py-3 text-xs font-mono text-gray-700">{log.endpoint}</td>
                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{log.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemHealth;