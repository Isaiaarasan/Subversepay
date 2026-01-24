"use client";

import React from "react";
import { motion } from "framer-motion";

interface WeeklyTrendChartProps {
    data?: { week: string; collection: number }[];
}

const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ data }) => {
    // Default data for current month (4 weeks)
    const defaultData = [
        { week: 'Week 1', collection: 125000 },
        { week: 'Week 2', collection: 142000 },
        { week: 'Week 3', collection: 138000 },
        { week: 'Week 4', collection: 156000 },
    ];

    const chartData = data || defaultData;
    const maxValue = Math.max(...chartData.map(d => d.collection)) * 1.2;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    Weekly Trend (Current Month)
                </h3>
            </div>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="0.5" />
                    ))}

                    {/* Collection line */}
                    <motion.polyline
                        points={chartData.map((d, i) => {
                            const x = (i / (chartData.length - 1)) * 350 + 25;
                            const y = 200 - (d.collection / maxValue) * 180;
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />

                    {/* Collection area fill */}
                    <motion.polygon
                        points={`25,200 ${chartData.map((d, i) => {
                            const x = (i / (chartData.length - 1)) * 350 + 25;
                            const y = 200 - (d.collection / maxValue) * 180;
                            return `${x},${y}`;
                        }).join(' ')} ${(chartData.length - 1) / (chartData.length - 1) * 350 + 25},200`}
                        fill="url(#gradient)"
                        fillOpacity="0.3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Data points */}
                    {chartData.map((d, i) => {
                        const x = (i / (chartData.length - 1)) * 350 + 25;
                        const y = 200 - (d.collection / maxValue) * 180;
                        return (
                            <g key={i}>
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="#3B82F6"
                                    stroke="white"
                                    strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-6 px-6">
                    {chartData.map((d, i) => (
                        <span key={i} className="text-xs text-gray-400 dark:text-gray-500 font-mono">{d.week}</span>
                    ))}
                </div>
            </div>

            {/* Summary stats */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Collection</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total: ₹{chartData.reduce((sum, d) => sum + d.collection, 0).toLocaleString('en-IN')}
                </div>
            </div>
        </div>
    );
};

export default WeeklyTrendChart;
