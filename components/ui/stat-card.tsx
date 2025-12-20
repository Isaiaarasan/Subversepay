import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  trend?: "up" | "down";
  icon?: React.ComponentType<any>;
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, trend, icon: Icon, trendValue }) => {
  const isPositive = trend === "up";

  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
      <div className="flex justify-between items-start mb-3">
        {Icon && (
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
            <Icon size={20} />
          </div>
        )}
        {trendValue && (
          <div
            className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
          >
            {isPositive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h2>
        {subtext && <span className="text-[10px] text-gray-400 dark:text-gray-500">{subtext}</span>}
      </div>
    </div>
  );
};

export default StatCard;