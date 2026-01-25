"use client";

import React from "react";

export function RetryMetrics() {

    

    const retryReasons = [
        {
            reason: "Network Timeout",
            totalRetries: 1247,
            successfulRetries: 892,
            successRate: 71.5,
            avgRecoveryTime: "2.3 min",
            description: "Temporary network connectivity issues"
        },
        {
            reason: "Insufficient Funds",
            totalRetries: 856,
            successfulRetries: 623,
            successRate: 72.8,
            avgRecoveryTime: "4.1 min",
            description: "Funds added after initial decline"
        },
        {
            reason: "Bank System Busy",
            totalRetries: 634,
            successfulRetries: 423,
            successRate: 66.7,
            avgRecoveryTime: "3.8 min",
            description: "Bank processing delays"
        },
        {
            reason: "Card Authentication",
            totalRetries: 432,
            successfulRetries: 312,
            successRate: 72.2,
            avgRecoveryTime: "2.9 min",
            description: "3D Secure or card verification delays"
        },
        {
            reason: "Payment Gateway Issues",
            totalRetries: 378,
            successfulRetries: 245,
            successRate: 64.8,
            avgRecoveryTime: "5.2 min",
            description: "External payment processor issues"
        }
    ];



    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Retry Performance Metrics
                </h3>
            
            </div>          

            {/* Retry Reasons Analysis */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-6 border border-gray-200 dark:border-gray-700">

                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {retryReasons.map((reason, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                        {reason.reason}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {reason.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {reason.successRate}%
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        success rate
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Total Retries:</span>
                                    <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                                        {reason.totalRetries}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Successful:</span>
                                    <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                                        {reason.successfulRetries}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Avg Recovery:</span>
                                    <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                                        {reason.avgRecoveryTime}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${reason.successRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}