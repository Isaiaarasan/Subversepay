"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StatusFilterDropdown } from "@/app/(dashboard)/dashboard/_components/StatusFilterDropdown";

const CollectionTrendBarGraph: React.FC = () => {
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
            ) * 1.2;
        }
        return Math.max(...data.map(d => d[selectedCategory as keyof typeof d] as number)) * 1.2;
    };

    const maxValue = getMaxValue();

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 h-full flex flex-col dark:bg-gray-900/80">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    Collection Trend
                </h3>
                <StatusFilterDropdown
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                    allLabel="Category"
                />
            </div>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="0.5" />
                    ))}

                    {/* Bars for each metric */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const collectionHeight = (d.collection / maxValue) * 180;
                        const refundHeight = (d.refunds / maxValue) * 180;
                        const feeHeight = (d.fees / maxValue) * 180;

                        return (
                            <g key={i}>
                                {/* Collection bar */}
                                {(selectedCategory === "all" || selectedCategory === "collection") && (
                                    <motion.rect
                                        x={selectedCategory === "all" ? x - 12 : x - 8}
                                        y={200 - collectionHeight}
                                        width={selectedCategory === "all" ? "8" : "16"}
                                        height={collectionHeight}
                                        fill="#3B82F6"
                                        initial={{ height: 0, y: 200 }}
                                        animate={{ height: collectionHeight, y: 200 - collectionHeight }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                    />
                                )}
                                {/* Refunds bar */}
                                {(selectedCategory === "all" || selectedCategory === "refunds") && (
                                    <motion.rect
                                        x={selectedCategory === "all" ? x - 4 : x - 8}
                                        y={200 - refundHeight}
                                        width={selectedCategory === "all" ? "8" : "16"}
                                        height={refundHeight}
                                        fill="#EF4444"
                                        initial={{ height: 0, y: 200 }}
                                        animate={{ height: refundHeight, y: 200 - refundHeight }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                                    />
                                )}
                                {/* Fees bar */}
                                {(selectedCategory === "all" || selectedCategory === "fees") && (
                                    <motion.rect
                                        x={selectedCategory === "all" ? x + 4 : x - 8}
                                        y={200 - feeHeight}
                                        width={selectedCategory === "all" ? "8" : "16"}
                                        height={feeHeight}
                                        fill="#F59E0B"
                                        initial={{ height: 0, y: 200 }}
                                        animate={{ height: feeHeight, y: 200 - feeHeight }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-6 px-6">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs text-gray-400 dark:text-gray-500 font-mono">{d.month}</span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-7 mt-12 pt-4">
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

export default CollectionTrendBarGraph;