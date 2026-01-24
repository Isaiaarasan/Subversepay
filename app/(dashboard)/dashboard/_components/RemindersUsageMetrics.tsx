"use client";

import React from "react";

export function RemindersUsageMetrics() {

    const reminderTypes = [
        {
            type: "Payment Due",
            sent: 2847,
            responded: 1056,
            responseRate: 37.1,
            recovered: 623,
        },
        {
            type: "Retry Reminder",
            sent: 1245,
            responded: 387,
            responseRate: 31.1,
            recovered: 211,
        },
        {
            type: "Subscription Renewal",
            sent: 475,
            responded: 134,
            responseRate: 28.2,
            recovered: 58,
        },
        {
            type: "Failed Payment Alert",
            sent: 892,
            responded: 234,
            responseRate: 26.2,
            recovered: 145,
        },
        {
            type: "Account Verification",
            sent: 345,
            responded: 98,
            responseRate: 28.4,
            recovered: 67,
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reminders Usage Metrics
                </h3>
            </div>

            {/* Reminder Types Breakdown */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
                    Reminder Performance by Type
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {reminderTypes.map((reminder, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {reminder.type}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {reminder.sent} sent
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Response Rate: {reminder.responseRate}%
                                        </span>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${reminder.responseRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Recovered: {reminder.recovered}
                                        </span>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {reminder.responded} responses
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}