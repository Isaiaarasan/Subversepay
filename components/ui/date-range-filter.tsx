import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    className?: string;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    className = "",
}) => {
    return (
        <div className={`flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 shadow-sm ${className}`}>
            <Calendar size={16} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none w-auto sm:w-[130px]" // increased width slightly
                    placeholder="From"
                />
                <span className="text-gray-400">-</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none w-auto sm:w-[130px]"
                    placeholder="To"
                />
            </div>
        </div>
    );
};
