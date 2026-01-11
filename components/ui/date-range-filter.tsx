import React, { useState, useEffect } from "react";
import { format, differenceInDays, parseISO, isValid } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
}) => {
    const [date, setDate] = useState<DateRange | undefined>(() => {
        if (startDate && endDate) {
            return {
                from: new Date(startDate),
                to: new Date(endDate),
            };
        }
        return undefined;
    });
    const [isOpen, setIsOpen] = useState(false);

    // Update internal state when props change
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (isValid(start) && isValid(end)) {
                setDate({ from: start, to: end });
            }
        } else if (!startDate && !endDate) {
            setDate(undefined);
        }
    }, [startDate, endDate]);

    const handleApply = () => {
        if (date?.from) {
            onStartDateChange(format(date.from, "yyyy-MM-dd"));
        } else {
            onStartDateChange("");
        }

        if (date?.to) {
            onEndDateChange(format(date.to, "yyyy-MM-dd"));
        } else {
            onEndDateChange("");
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
        // Reset to props state
        if (startDate && endDate) {
            setDate({ from: new Date(startDate), to: new Date(endDate) });
        } else {
            setDate(undefined);
        }
    };

    const getDayCount = () => {
        if (date?.from && date?.to) {
            return differenceInDays(date.to, date.from) + 1;
        }
        return 0;
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[200px] justify-between text-left font-normal bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLO dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span className="text-gray-500">Select Range</span>
                        )}
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800">
                        {/* Header */}
                        <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between gap-2">
                                {/* Start Date */}
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider text-center">Start</span>
                                    <div className="px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-center text-[10px]">
                                        {date?.from ? format(date.from, "MMM dd, yyyy") : "-"}
                                    </div>
                                </div>

                                {/* Arrow & Badge */}
                                <div className="flex flex-col items-center gap-0.5 pt-3">
                                    <ArrowRight className="h-2.5 w-2.5 text-gray-400" />
                                    {date?.from && date?.to && (
                                        <span className="text-[9px] text-blue-600 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-900/20 px-1 rounded">
                                            {getDayCount()}d
                                        </span>
                                    )}
                                </div>

                                {/* End Date */}
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider text-center">End</span>
                                    <div className="px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-center text-[10px]">
                                        {date?.to ? format(date.to, "MMM dd, yyyy") : "-"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="p-2">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                className="bg-transparent"
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-2 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-lg">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleApply}
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
