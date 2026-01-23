"use client";

import React from "react";
import { Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setTimeRange } from "@/lib/store/slices/overviewSlice";
import { ActionButton } from "./ActionButton";

interface TimePeriodSelectorProps {
  showAction?: boolean;
  actionColorScheme?: "emerald" | "blue" | "purple";
  actionLabel?: string;
  onActionClick?: () => void;
}

export function TimePeriodSelector({
  showAction = true,
  actionColorScheme = "blue",
  actionLabel = "Download Report",
  onActionClick
}: TimePeriodSelectorProps) {
  const dispatch = useAppDispatch();
  const { timeRange } = useAppSelector((state) => state.overview);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Time Range Selector - Premium Style */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer min-w-[140px]">
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Time Period</span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">{timeRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-1"
        >
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("This Month"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "This Month"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            This Month
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("Last Month"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "Last Month"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            Last Month
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("This Quarter"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "This Quarter"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            This Quarter
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("Last Quarter"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "Last Quarter"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            Last Quarter
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("This Year"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "This Year"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            This Year
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTimeRange("Last Year"))}
            className={`flex items-center gap-2 cursor-pointer rounded-lg text-xs font-medium px-3 py-2 transition-colors ${timeRange === "Last Year"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            Last Year
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Action Button */}
      {showAction && (
        <ActionButton
          onClick={onActionClick}
          label={actionLabel}
          colorScheme={actionColorScheme}
        />
      )}
    </div>
  );
}