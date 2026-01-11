"use client";

import React from "react";
import { motion } from "framer-motion";

const ComparisonGraph: React.FC = () => {
    const data = [
        { month: 'Jan', current: 45, previous: 35 },
        { month: 'Feb', current: 52, previous: 42 },
        { month: 'Mar', current: 48, previous: 38 },
        { month: 'Apr', current: 61, previous: 55 },
        { month: 'May', current: 55, previous: 48 },
        { month: 'Jun', current: 67, previous: 62 },
    ];

    const maxValue = Math.max(...data.flatMap(d => [d.current, d.previous])) * 1.2;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                TPV Comparison (Current vs Previous Year)
            </h3>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="0.5" />
                    ))}

                    {/* Previous year bars */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const height = (d.previous / maxValue) * 180;
                        const y = 200 - height;
                        return (
                            <motion.rect
                                key={`prev-${i}`}
                                x={x - 8}
                                y={y}
                                width="8"
                                height={height}
                                className="fill-gray-200 dark:fill-gray-700"
                                initial={{ height: 0, y: 200 }}
                                animate={{ height, y }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                        );
                    })}

                    {/* Current year bars */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const height = (d.current / maxValue) * 180;
                        const y = 200 - height;
                        return (
                            <motion.rect
                                key={`curr-${i}`}
                                x={x}
                                y={y}
                                width="8"
                                height={height}
                                fill="#3B82F6"
                                initial={{ height: 0, y: 200 }}
                                animate={{ height, y }}
                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-6 mb-4">
                {data.map((d, i) => (
                    <span key={i} className="text-xs text-gray-400 dark:text-gray-500 font-mono">{d.month}</span>
                ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Current Year</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 shadow-sm"></div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Previous Year</span>
                </div>
            </div>
        </div>
    );
};

export default ComparisonGraph;