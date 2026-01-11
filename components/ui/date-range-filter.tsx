import React, { useRef } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    className?: string;
    inputClassName?: string;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    className,
    inputClassName,
}) => {
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={cn(
            "group flex items-center p-1 gap-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300",
            className
        )}>
            {/* Start Date */}
            <div
                className="relative flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group-focus-within:bg-gray-50 dark:group-focus-within:bg-gray-800/50"
                onClick={() => startInputRef.current?.showPicker()}
            >
                <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">From</span>
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-500" />
                        <input
                            ref={startInputRef}
                            type="date"
                            value={startDate}
                            onChange={(e) => onStartDateChange(e.target.value)}
                            className={cn(
                                "bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-[85px] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full",
                                inputClassName
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="text-gray-300 dark:text-gray-600">
                <ArrowRight size={14} />
            </div>

            {/* End Date */}
            <div
                className="relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group-focus-within:bg-gray-50 dark:group-focus-within:bg-gray-800/50"
                onClick={() => endInputRef.current?.showPicker()}
            >
                <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">To</span>
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-500" />
                        <input
                            ref={endInputRef}
                            type="date"
                            value={endDate}
                            onChange={(e) => onEndDateChange(e.target.value)}
                            className={cn(
                                "bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-[85px] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full",
                                inputClassName
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Clear Button (only show if dates are selected) */}
            {(startDate || endDate) && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onStartDateChange('');
                        onEndDateChange('');
                    }}
                    className="p-1.5 mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
};
