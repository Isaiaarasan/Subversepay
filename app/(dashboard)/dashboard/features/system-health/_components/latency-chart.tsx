"use client";

import React, { useMemo, useState } from "react";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import {
    calculateLatencyData,
    calculateMaxLatency,
    calculateChartPath,
    calculateAreaPath,
} from "../../../services/system-health.utils";
import { TimeRange } from "../../../services/system-health.service";

export function LatencyChart() {
    const [timeRange, setTimeRange] = useState<TimeRange>("Current Day");
    const currentData = useMemo(() => {
        return calculateLatencyData(timeRange);
    }, [timeRange]);

    const maxLatency = useMemo(() => {
        return calculateMaxLatency(currentData.data);
    }, [currentData.data]);

    const width = 100;
    const height = 100;


    const linePath = useMemo(() => {
        return calculateChartPath(currentData.data, maxLatency, width, height);
    }, [currentData.data, maxLatency]);

    const areaPath = useMemo(() => {
        return calculateAreaPath(currentData.data, maxLatency, width, height);
    }, [currentData.data, maxLatency]);

    return (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-80 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Activity size={18} className="text-blue-500" /> API Latency
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Average response time in ms</p>
                </div>
                <div>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                        className="text-xs font-medium rounded-lg px-3 py-2  bg-gray-50 dark:bg-gray-800text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option value="Current Day">Current Day</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                    </select>
                </div>

            </div>

            <div className="flex-1 relative w-full overflow-hidden">
                <svg
                    className="w-full h-full overflow-visible"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                >

                    {[0, 25, 50, 75, 100].map((y) => (
                        <line
                            key={y}
                            x1="0"
                            y1={y}
                            x2="100"
                            y2={y}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                            className="text-gray-100 dark:text-gray-800"
                        />
                    ))}

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
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-gray-400 dark:text-gray-600 font-mono">
                <span>{currentData.labels[0]}</span>
                <span>{currentData.labels[Math.floor(currentData.labels.length / 2)]}</span>
                <span>{currentData.labels[currentData.labels.length - 1]}</span>
            </div>
        </div>
    );
}
