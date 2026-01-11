"use client";

import React from "react";
import { motion } from "framer-motion";

const MultiBarGraph: React.FC = () => {
    const data = [
        { month: 'Jan', users: 1200, merchants: 45, transactions: 8500 },
        { month: 'Feb', users: 1350, merchants: 52, transactions: 9200 },
        { month: 'Mar', users: 1180, merchants: 48, transactions: 8800 },
        { month: 'Apr', users: 1420, merchants: 61, transactions: 10100 },
        { month: 'May', users: 1380, merchants: 55, transactions: 9600 },
        { month: 'Jun', users: 1520, merchants: 67, transactions: 11200 },
    ];

    const maxUsers = Math.max(...data.map(d => d.users)) * 1.2;
    const maxMerchants = Math.max(...data.map(d => d.merchants)) * 1.2;
    const maxTransactions = Math.max(...data.map(d => d.transactions)) * 1.2;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                Platform Growth Metrics
            </h3>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="0.5" />
                    ))}

                    {/* Bars for each metric */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const userHeight = (d.users / maxUsers) * 180;
                        const merchantHeight = (d.merchants / maxMerchants) * 180;
                        const transactionHeight = (d.transactions / maxTransactions) * 180;

                        return (
                            <g key={i}>
                                {/* Users bar */}
                                <motion.rect
                                    x={x - 12}
                                    y={200 - userHeight}
                                    width="8"
                                    height={userHeight}
                                    fill="#3B82F6"
                                    initial={{ height: 0, y: 200 }}
                                    animate={{ height: userHeight, y: 200 - userHeight }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                />
                                {/* Merchants bar */}
                                <motion.rect
                                    x={x - 2}
                                    y={200 - merchantHeight}
                                    width="8"
                                    height={merchantHeight}
                                    fill="#10B981"
                                    initial={{ height: 0, y: 200 }}
                                    animate={{ height: merchantHeight, y: 200 - merchantHeight }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                                />
                                {/* Transactions bar */}
                                <motion.rect
                                    x={x + 8}
                                    y={200 - transactionHeight}
                                    width="8"
                                    height={transactionHeight}
                                    fill="#F59E0B"
                                    initial={{ height: 0, y: 200 }}
                                    animate={{ height: transactionHeight, y: 200 - transactionHeight }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-6">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs text-gray-400 dark:text-gray-500 font-mono">{d.month}</span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-auto pt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Users</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Merchants</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Transactions</span>
                </div>
            </div>
        </div>
    );
};

export default MultiBarGraph;