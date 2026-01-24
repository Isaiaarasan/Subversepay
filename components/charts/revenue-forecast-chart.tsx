"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StatusFilterDropdown } from "@/app/(dashboard)/dashboard/_components/StatusFilterDropdown";

const RevenueForecastChart: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const data = [
        { month: 'Jan', collection: 85000, refunds: 2500, fees: 4200 },
        { month: 'Feb', collection: 92000, refunds: 3100, fees: 4600 },
        { month: 'Mar', collection: 88000, refunds: 2800, fees: 4400 },
        { month: 'Apr', collection: 101000, refunds: 3500, fees: 5050 },
        { month: 'May', collection: 96000, refunds: 3200, fees: 4800 },
        { month: 'Jun', collection: 112000, refunds: 3800, fees: 5600 },
    ];

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "collection", label: "Collection" },
        { value: "refunds", label: "Refunds" },
        { value: "fees", label: "Fees" },
    ];

    // Calculate max value based on selected category
    const getMaxValue = () => {
        if (selectedCategory === "all") {
            return Math.max(
                ...data.map(d => d.collection),
                ...data.map(d => d.refunds),
                ...data.map(d => d.fees)
            );
        }
        return Math.max(...data.map(d => d[selectedCategory as keyof typeof d] as number));
    };

    const maxValue = getMaxValue();

    // Generate y-axis labels
    const yAxisLabels = [0, Math.round(maxValue * 0.25), Math.round(maxValue * 0.5), Math.round(maxValue * 0.75), maxValue];

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    
                </h3>
                <StatusFilterDropdown
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                    allLabel="Category"
                />
            </div>

            <div className="relative flex-1">
                {/* Chart Container */}
                <div className="relative h-64">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2">
                        {yAxisLabels.reverse().map((label, i) => (
                            <span key={i} className="text-right leading-none">
                                ₹{label.toLocaleString()}
                            </span>
                        ))}
                    </div>

                    {/* Chart area with proper margins */}
                    <div className="ml-16 mr-6 h-full">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {[0, 25, 50, 75, 100].map(y => (
                                <line
                                    key={y}
                                    x1="0"
                                    y1={y}
                                    x2="100"
                                    y2={y}
                                    className="stroke-gray-200 dark:stroke-gray-700"
                                    strokeWidth="0.2"
                                />
                            ))}

                            {/* Vertical grid lines for months */}
                            {data.map((_, i) => {
                                const x = (i / (data.length - 1)) * 100;
                                return (
                                    <line
                                        key={i}
                                        x1={x}
                                        y1="0"
                                        x2={x}
                                        y2="100"
                                        className="stroke-gray-200 dark:stroke-gray-700"
                                        strokeWidth="0.2"
                                    />
                                );
                            })}

                            {/* Bars for each metric */}
                            {data.map((d, i) => {
                                const x = (i / (data.length - 1)) * 100;
                                const collectionHeight = (d.collection / maxValue) * 100;
                                const refundHeight = (d.refunds / maxValue) * 100;
                                const feeHeight = (d.fees / maxValue) * 100;

                                const barWidth = selectedCategory === "all" ? 3 : 6;
                                const barSpacing = selectedCategory === "all" ? 1 : 0;

                                return (
                                    <g key={i}>
                                        {/* Collection bar */}
                                        {(selectedCategory === "all" || selectedCategory === "collection") && (
                                            <motion.rect
                                                x={selectedCategory === "all" ? x - barWidth - barSpacing : x - barWidth / 2}
                                                y={100 - collectionHeight}
                                                width={barWidth}
                                                height={collectionHeight}
                                                fill="#3B82F6"
                                                initial={{ height: 0, y: 100 }}
                                                animate={{ height: collectionHeight, y: 100 - collectionHeight }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                            />
                                        )}
                                        {/* Refunds bar */}
                                        {(selectedCategory === "all" || selectedCategory === "refunds") && (
                                            <motion.rect
                                                x={selectedCategory === "all" ? x - barSpacing : x - barWidth / 2}
                                                y={100 - refundHeight}
                                                width={barWidth}
                                                height={refundHeight}
                                                fill="#EF4444"
                                                initial={{ height: 0, y: 100 }}
                                                animate={{ height: refundHeight, y: 100 - refundHeight }}
                                                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                                            />
                                        )}
                                        {/* Fees bar */}
                                        {(selectedCategory === "all" || selectedCategory === "fees") && (
                                            <motion.rect
                                                x={selectedCategory === "all" ? x + barSpacing : x - barWidth / 2}
                                                y={100 - feeHeight}
                                                width={barWidth}
                                                height={feeHeight}
                                                fill="#F59E0B"
                                                initial={{ height: 0, y: 100 }}
                                                animate={{ height: feeHeight, y: 100 - feeHeight }}
                                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>

                {/* X-axis labels */}
                <div className="ml-16 mr-6 flex justify-between mt-2">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center" style={{ width: '16.67%' }}>
                            {d.month}
                        </span>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-7 mt-6 pt-4">
                {(selectedCategory === "all" || selectedCategory === "collection") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Collection</span>
                    </div>
                )}
                {(selectedCategory === "all" || selectedCategory === "refunds") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Refunds</span>
                    </div>
                )}
                {(selectedCategory === "all" || selectedCategory === "fees") && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Fees</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueForecastChart;