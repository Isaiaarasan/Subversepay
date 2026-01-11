"use client";

import React from "react";
import { DateRangeFilter } from "@/components/ui/date-range-filter";

export function DateRangeFilterWrapper() {
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    return (
        <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
        />
    );
}

export function TimeRangeSelector() {
    const [timeRange, setTimeRange] = React.useState("Last 7 days");

    return (
        <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 content-center h-full">
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer w-full">
                <div className="flex flex-col justify-center w-full">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Time Period</span>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 focus:outline-none w-full cursor-pointer appearance-none pr-4"
                    >
                        <option className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">This days</option>
                        <option className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">This week</option>
                        <option className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">This month</option>
                        <option className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">This year</option>
                    </select>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
