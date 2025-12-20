"use client";

import React from "react";
import { motion } from "framer-motion";

const PaymentPieChart: React.FC = () => {
    const data = [
        { method: 'UPI', percentage: 45, color: '#3B82F6' },
        { method: 'Cards', percentage: 30, color: '#10B981' },
        { method: 'Net Banking', percentage: 15, color: '#F59E0B' },
        { method: 'Wallets', percentage: 10, color: '#EF4444' },
    ];

    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    let cumulativePercentage = 0;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Payment Methods
            </h3>

            <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {data.map((item, index) => {
                        const startAngle = (cumulativePercentage / total) * 360;
                        const endAngle = ((cumulativePercentage + item.percentage) / total) * 360;
                        const largeArcFlag = item.percentage > 50 ? 1 : 0;

                        const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                        const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                        const pathData = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

                        cumulativePercentage += item.percentage;

                        return (
                            <motion.path
                                key={index}
                                d={pathData}
                                fill={item.color}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                        );
                    })}
                </svg>

                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-inner flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{total}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.method}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PaymentPieChart;