"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

const failureRecoveryData = [
    {
        date: "Jan 1",
        failedPayments: 45,
        recoveredPayments: 38,
        recoveryRate: 84.4,
    },
    {
        date: "Jan 2",
        failedPayments: 52,
        recoveredPayments: 41,
        recoveryRate: 78.8,
    },
    {
        date: "Jan 3",
        failedPayments: 38,
        recoveredPayments: 35,
        recoveryRate: 92.1,
    },
    {
        date: "Jan 4",
        failedPayments: 61,
        recoveredPayments: 49,
        recoveryRate: 80.3,
    },
    {
        date: "Jan 5",
        failedPayments: 49,
        recoveredPayments: 42,
        recoveryRate: 85.7,
    },
    {
        date: "Jan 6",
        failedPayments: 55,
        recoveredPayments: 47,
        recoveryRate: 85.5,
    },
    {
        date: "Jan 7",
        failedPayments: 43,
        recoveredPayments: 39,
        recoveryRate: 90.7,
    },
];



export function FailureRecoveryChart() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Failure Reasons & Recovery Performance
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last 7 days
                </span>
            </div>

            {/* Recovery Linear Graph */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
                    Recovery Rate Trend
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={failureRecoveryData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis
                            dataKey="date"
                            className="text-xs text-gray-600 dark:text-gray-400"
                        />
                        <YAxis
                            className="text-xs text-gray-600 dark:text-gray-400"
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="recoveryRate"
                            stroke="#10b981"
                            strokeWidth={3}
                            name="Recovery Rate (%)"
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Failure Reasons Bar Chart */}
           
        </div>
    );
}