import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: LucideIcon;
    variant?: "default" | "compact" | "detailed";
    className?: string;
    valueClassName?: string;
    onClick?: () => void;
}

/**
 * MetricCard - Reusable metric display component
 * Used across: Overview, Analytics, System Health, and other dashboard pages
 * 
 * @example
 * <MetricCard
 *   title="Total Merchants"
 *   value="45"
 *   subtitle=" "
 *   trend="up"
 *   trendValue="+3 this week"
 *   icon={Users}
 * />
 */
export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    subtitle,
    trend,
    trendValue,
    icon: Icon,
    variant = "default",
    className,
    valueClassName,
    onClick,
}) => {
    const isPositive = trend === "up";
    const isNegative = trend === "down";
    const isClickable = !!onClick;

    const getTrendColor = () => {
        if (isPositive) return "text-green-600 dark:text-green-400";
        if (isNegative) return "text-red-600 dark:text-red-400";
        return "text-gray-600 dark:text-gray-400";
    };

    const baseStyles = cn(
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800",
        "shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 min-h-[140px]",
        isClickable && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
    );

    const contentPadding = variant === "compact" ? "p-4" : "p-6";

    return (
        <div className={cn(baseStyles, contentPadding)} onClick={onClick}>
            {/* Header with Icon and Trend */}
            <div className="flex justify-between items-start mb-4">
                {Icon && (
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-700 dark:text-blue-300">
                        <Icon size={variant === "compact" ? 16 : 20} />
                    </div>
                )}
                {trendValue && (
                    <div className={cn("flex items-center gap-0.5 text-xs font-medium ml-auto", getTrendColor())}>
                        {isPositive && <ArrowUpRight size={14} />}
                        {isNegative && <ArrowDownRight size={14} />}
                        {trendValue}
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
                {title}
            </h3>

            {/* Value and Subtitle */}
            <div className="flex items-baseline gap-2">
                <h2
                    className={cn(
                        "text-2xl font-bold text-gray-900 dark:text-white",
                        variant === "compact" && "text-xl",
                        valueClassName
                    )}
                >
                    {value}
                </h2>
                {subtitle && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                        {subtitle}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MetricCard;
