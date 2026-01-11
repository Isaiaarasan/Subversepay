import React from "react";
import { Filter } from "lucide-react";

interface StatusFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  allLabel?: string;
  className?: string;
}

export function StatusFilterDropdown({
  value,
  onChange,
  options,
  allLabel = "Status",
  className = "",
}: StatusFilterDropdownProps) {
  return (
    <div className={`relative group ${className}`}>
      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
        <Filter size={18} />
        <span>{value === "all" || value === "All" ? allLabel : value}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-20">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
              value === option.value
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
