"use client";

import React from "react";
import { motion } from "framer-motion";

const SuccessScoreGraph: React.FC = () => {
    const score = 94.2;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Success Score
            </h3>

            <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    {/* Background circle */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        className="stroke-gray-200 dark:stroke-gray-800"
                        strokeWidth="8"
                    />

                    {/* Progress circle */}
                    <motion.circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={strokeDasharray}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{score}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mt-auto">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Transaction Success</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Merchant Uptime</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">99.8%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">4.7/5</span>
                </div>
            </div>
        </div>
    );
};

export default SuccessScoreGraph;