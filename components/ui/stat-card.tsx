import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtext?: string;
    trend?: "up" | "down";
    icon: React.ComponentType<any>;
    trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, trend, icon: Icon, trendValue }) => {
  const isPositive = trend === "up";

  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
          <Icon size={20} />
        </div>
        {trendValue && (
          <div
            className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"
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
      <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-gray-900">{value}</h2>
        {subtext && <span className="text-[10px] text-gray-400">{subtext}</span>}
      </div>
    </div>
  );
};

export default StatCard;