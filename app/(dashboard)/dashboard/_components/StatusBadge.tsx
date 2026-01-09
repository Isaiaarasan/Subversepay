import React from "react";

export type StatusVariant = "success" | "warning" | "error" | "info" | "default";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
  size?: "sm" | "md";
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30",
  warning: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30",
  error: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-900/30",
  info: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-900/30",
  default: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700",
};

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function StatusBadge({
  status,
  variant = "default",
  className = "",
  size = "sm",
}: StatusBadgeProps) {
  // Auto-detect variant from status string if not provided
  const detectVariant = (status: string): StatusVariant => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("completed") || lowerStatus.includes("active") || lowerStatus.includes("success")) {
      return "success";
    }
    if (lowerStatus.includes("processing") || lowerStatus.includes("pending") || lowerStatus.includes("warning")) {
      return "warning";
    }
    if (lowerStatus.includes("failed") || lowerStatus.includes("error") || lowerStatus.includes("critical")) {
      return "error";
    }
    if (lowerStatus.includes("info") || lowerStatus.includes("low")) {
      return "info";
    }
    return "default";
  };

  const finalVariant = variant === "default" ? detectVariant(status) : variant;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${variantStyles[finalVariant]} ${sizeStyles[size]} ${className}`}
    >
      {status}
    </span>
  );
}
