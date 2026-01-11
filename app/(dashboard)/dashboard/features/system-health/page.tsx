"use client";

import React, { useMemo } from "react";
import { Server, Activity, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setTimeRange } from "@/lib/store/slices/systemHealthSlice";
import {
  calculateLatencyData,
  calculateMaxLatency,
  calculateChartPath,
  calculateAreaPath,
  TimeRange,
} from "../../utils/system-health.utils";

const SystemHealth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { timeRange, errorLogs } = useAppSelector((state) => state.systemHealth);

    // All calculations moved to service
    const currentData = useMemo(() => {
        return calculateLatencyData(timeRange as TimeRange);
    }, [timeRange]);

    const maxLatency = useMemo(() => {
        return calculateMaxLatency(currentData.data);
    }, [currentData.data]);

    // SVG Layout Helpers
    const width = 100;
    const height = 100;

    // All path calculations moved to service
    const linePath = useMemo(() => {
        return calculateChartPath(currentData.data, maxLatency, width, height);
    }, [currentData.data, maxLatency]);

    const areaPath = useMemo(() => {
        return calculateAreaPath(currentData.data, maxLatency, width, height);
    }, [currentData.data, maxLatency]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Health</h1>
                    <p className="text-gray-500 dark:text-gray-400">Infrastructure performance and error tracking.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <RefreshCw size={14} /> Last updated: Just now
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Total Requests (24h)</h3>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">14.2M</div>
                    <div className="text-green-500 text-[10px] font-medium mt-1">+5% vs yesterday</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Failed Requests</h3>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">421</div>
                    <div className="text-red-500 text-[10px] font-medium mt-1">0.003% Failure Rate</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300">
                    <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Supabase Logs</h3>
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
                        Open Dashboard <ExternalLink size={14} />
                    </a>
                    <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">External Link</div>
                </div>
            </div>

            {/* API Latency Linear Graph */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-80 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" /> API Latency
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Average response time in ms</p>
                    </div>
                    <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                        {['Current Day', 'Week', 'Month'].map(range => (
                            <button
                                key={range}
                                onClick={() => dispatch(setTimeRange(range))}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
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
                            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" className="text-gray-100 dark:text-gray-800" />
                        ))}

                        {/* Line Path */}
                        <motion.path
                            d={linePath}
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
                            d={areaPath}
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

                <div className="flex justify-between mt-2 text-[10px] text-gray-400 dark:text-gray-600 font-mono">
                    <span>{currentData.labels[0]}</span>
                    <span>{currentData.labels[Math.floor(currentData.labels.length / 2)]}</span>
                    <span>{currentData.labels[currentData.labels.length - 1]}</span>
                </div>
            </div>

            {/* API Error Log */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500" /> Recent 500 Errors
                    </h3>
                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All Logs</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase">Code</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase">Time</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase">Endpoint</th>
                            <th className="px-4 py-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {errorLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-red-50/10 dark:hover:bg-red-900/10 transition-colors">
                                <td className="px-4 py-3">
                                    <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-[10px] font-bold">{log.code}</span>
                                </td>
                                <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">{log.time}</td>
                                <td className="px-4 py-3 text-xs font-mono text-gray-700 dark:text-gray-300">{log.endpoint}</td>
                                <td className="px-4 py-3 text-xs text-red-600 dark:text-red-400 font-medium">{log.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemHealth;
