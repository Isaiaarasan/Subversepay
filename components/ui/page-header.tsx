import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    actions?: React.ReactNode;
    className?: string;
    variant?: "default" | "gradient";
}

/**
 * PageHeader - Consistent page header component
 * Used across all dashboard pages for uniform header styling
 * 
 * @example
 * <PageHeader
 *   title="Analytics Dashboard"
 *   description="Comprehensive insights into platform performance"
 *   icon={BarChart3}
 *   actions={<Button>Download Report</Button>}
 * />
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    icon: Icon,
    actions,
    className,
    variant = "default",
}) => {
    const containerStyles = cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-6",
        variant === "gradient" &&
        "p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none",
        className
    );

    return (
        <div className={containerStyles}>
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    {description && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{description}</p>
                    )}
                </div>
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
    );
};

export default PageHeader;
