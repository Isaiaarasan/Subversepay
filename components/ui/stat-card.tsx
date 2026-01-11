/**
 * StatCard - Legacy export for backward compatibility
 * @deprecated Use MetricCard from @/components/ui/metric-card instead
 * 
 * This file re-exports MetricCard to maintain backward compatibility
 * with existing code that imports StatCard.
 */

export { MetricCard as default } from "./metric-card";
export type { MetricCardProps as StatCardProps } from "./metric-card";
