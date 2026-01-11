import React from "react";
import { cn } from "@/lib/utils";
import { MetricCard, MetricCardProps } from "./metric-card";

export interface MetricsGridProps {
    metrics: MetricCardProps[];
    columns?: 2 | 3 | 4;
    className?: string;
}

/**
 * MetricsGrid - Grid layout for metric cards
 * Automatically handles responsive layout for metric cards
 * 
 * @example
 * <MetricsGrid
 *   metrics={[
 *     { title: "Total Revenue", value: "₹12.5L", trend: "up", trendValue: "+15.3%" },
 *     { title: "Active Users", value: "45.2K", trend: "up", trendValue: "+8.1%" }
 *   ]}
 *   columns={4}
 * />
 */
export const MetricsGrid: React.FC<MetricsGridProps> = ({
    metrics,
    columns = 4,
    className,
}) => {
    const gridClassName = cn(
        "grid grid-cols-1 gap-4",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "md:grid-cols-2 lg:grid-cols-4",
        className
    );

    return (
        <div className={gridClassName}>
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </div>
    );
};

export default MetricsGrid;
