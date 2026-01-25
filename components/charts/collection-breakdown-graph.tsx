"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StatusFilterDropdown } from "@/app/(dashboard)/dashboard/_components/StatusFilterDropdown";

const CollectionBreakdownGraph: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>("all");

    const data = [
        { month: 'Jan', online: 45000, offline: 25000, wallet: 15000 },
        { month: 'Feb', online: 52000, offline: 28000, wallet: 18000 },
        { month: 'Mar', online: 48000, offline: 32000, wallet: 20000 },
        { month: 'Apr', online: 61000, offline: 35000, wallet: 22000 },
        { month: 'May', online: 55000, offline: 38000, wallet: 25000 },
        { month: 'Jun', online: 67000, offline: 42000, wallet: 28000 },
    ];

    const paymentMethods = [
        { value: "all", label: "All Methods" },
        { value: "online", label: "Online" },
        { value: "offline", label: "Offline" },
        { value: "wallet", label: "Wallet" },
    ];

    // Filter data based on selected method
    const getFilteredData = () => {
        if (selectedMethod === "all") {
            return data.flatMap(d => [d.online, d.offline, d.wallet]);
        }
        return data.map(d => d[selectedMethod as keyof typeof d] as number);
    };

    const maxValue = Math.max(...getFilteredData()) * 1.2;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    Collection Breakdown
                </h3>
                <StatusFilterDropdown
                    value={selectedMethod}
                    onChange={setSelectedMethod}
                    options={paymentMethods}
                    allLabel="Payment Method"
                />
            </div>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="0.5" />
                    ))}

                    {/* Lines for each payment method */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const onlineY = 200 - (d.online / maxValue) * 180;
                        const offlineY = 200 - (d.offline / maxValue) * 180;
                        const walletY = 200 - (d.wallet / maxValue) * 180;

                        return (
                            <g key={i}>
                                {/* Online line points */}
                                {(selectedMethod === "all" || selectedMethod === "online") && (
                                    <motion.circle
                                        cx={x}
                                        cy={onlineY}
                                        r="3"
                                        fill="#3B82F6"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                    />
                                )}
                                {/* Offline line points */}
                                {(selectedMethod === "all" || selectedMethod === "offline") && (
                                    <motion.circle
                                        cx={x}
                                        cy={offlineY}
                                        r="3"
                                        fill="#10B981"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 + 0.1 }}
                                    />
                                )}
                                {/* Wallet line points */}
                                {(selectedMethod === "all" || selectedMethod === "wallet") && (
                                    <motion.circle
                                        cx={x}
                                        cy={walletY}
                                        r="3"
                                        fill="#F59E0B"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* Online line */}
                    {(selectedMethod === "all" || selectedMethod === "online") && (
                        <motion.polyline
                            points={data.map((d, i) => {
                                const x = (i / (data.length - 1)) * 350 + 25;
                                const y = 200 - (d.online / maxValue) * 180;
                                return `${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    )}

                    {/* Offline line */}
                    {(selectedMethod === "all" || selectedMethod === "offline") && (
                        <motion.polyline
                            points={data.map((d, i) => {
                                const x = (i / (data.length - 1)) * 350 + 25;
                                const y = 200 - (d.offline / maxValue) * 180;
                                return `${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        />
                    )}

                    {/* Wallet line */}
                    {(selectedMethod === "all" || selectedMethod === "wallet") && (
                        <motion.polyline
                            points={data.map((d, i) => {
                                const x = (i / (data.length - 1)) * 350 + 25;
                                const y = 200 - (d.wallet / maxValue) * 180;
                                return `${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.9 }}
                        />
                    )}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-6 px-6">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs text-gray-400 dark:text-gray-500 font-mono">{d.month}</span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 pt-4">
                {(selectedMethod === "all" || selectedMethod === "online") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                    </div>
                )}
                {(selectedMethod === "all" || selectedMethod === "offline") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Offline</span>
                    </div>
                )}
                {(selectedMethod === "all" || selectedMethod === "wallet") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Wallet</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionBreakdownGraph;