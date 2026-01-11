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
            className="h-[38px] px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-blue-500 transition-colors"
            inputClassName="text-xs font-medium w-24"
        />
    );
}

export function TimeRangeSelector() {
    const [timeRange, setTimeRange] = React.useState("Last 7 days");

    return (
        <div className="relative">
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-blue-600 text-white border border-blue-600 text-sm rounded-lg pl-4 pr-10 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500/20 outline-none hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-medium"
            >
                <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Last 7 days</option>
                <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Last 30 days</option>
                <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Last 3 months</option>
                <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Last year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    );
}
