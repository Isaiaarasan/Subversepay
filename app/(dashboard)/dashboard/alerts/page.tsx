"use client";

import React, { useMemo, useState } from "react";
import { AlertOctagon, AlertTriangle, Info, CheckCircle, X, Filter } from "lucide-react";
import { motion } from "framer-motion";

type AlertType = "Critical" | "High" | "Medium" | "Low" | "Info";

interface Alert {
  id: number;
  type: AlertType;
  source: string;
  message: string;
  time: string;
  category: string;
}

const Alerts: React.FC = () => {
  const [filterType, setFilterType] = useState<AlertType | "All">("All");
  const [showFilter, setShowFilter] = useState(false);
  const alerts: Alert[] = [
    {
      id: 1,
      type: "Critical",
      source: "Payment Gateway",
      message: "High failure rate detected (15%) in last hour for HDFC Netbanking.",
      time: "10 mins ago",
      category: "Payment Failures",
    },
    {
      id: 2,
      type: "High",
      source: "SpeedNet ISP",
      message: "Sudden 20% drop in active subscribers detected.",
      time: "45 mins ago",
      category: "Subscriber Drop",
    },
    {
      id: 3,
      type: "Medium",
      source: "Support Desk",
      message: "Unusual spike in support tickets from 'CableNet Sols'.",
      time: "2 hours ago",
      category: "Support Tickets",
    },
    {
      id: 4,
      type: "Low",
      source: "System",
      message: "Routine database optimization completed with warnings.",
      time: "5 hours ago",
      category: "Maintenance",
    },
    {
      id: 5,
      type: "Info",
      source: "Onboarding",
      message: "New merchant 'Urban Fibernet' documentation verified.",
      time: "1 day ago",
      category: "Onboarding",
    },
  ];

  const getIcon = (type: AlertType) => {
    switch (type) {
      case "Critical":
        return <AlertOctagon className="text-red-500" />;
      case "High":
        return <AlertTriangle className="text-orange-500" />;
      case "Medium":
        return <AlertTriangle className="text-yellow-500" />;
      case "Low":
        return <Info className="text-blue-500" />;
      case "Info":
      default:
        return <Info className="text-gray-500" />;
    }
  };

  const filteredAlerts = useMemo(() => {
    let list = alerts;
    if (filterType !== "All") {
      list = list.filter((a) => a.type === filterType);
    }
    return list;
  }, [alerts, filterType]);

  const getTypeStyles = (type: AlertType) => {
    switch (type) {
      case "Critical":
        return "bg-red-50 dark:bg-red-950 border-red-100 dark:border-red-800 text-red-900 dark:text-red-100";
      case "High":
        return "bg-orange-50 dark:bg-orange-950 border-orange-100 dark:border-orange-800 text-orange-900 dark:text-orange-100";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-100 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100";
      case "Low":
        return "bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-800 text-blue-900 dark:text-blue-100";
      default:
        return "bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-700 text-gray-900 dark:text-slate-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-50">System Alerts</h1>
          <p className="text-gray-500 dark:text-slate-400">Real-time monitoring of critical events.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilter((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-100"
            >
              <Filter size={18} />
              {filterType === "All" ? "Filter Priority" : `Priority: ${filterType}`}
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-20 p-2">
                {["All", "Critical", "High", "Medium", "Low", "Info"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type as AlertType | "All");
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      filterType === type
                        ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200 font-semibold"
                        : "text-gray-700 dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setFilterType("Critical")}
            className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors font-medium text-sm"
          >
            Clear Critical
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-4 rounded-xl border ${getTypeStyles(alert.type)} relative group`}
          >
            <div className="mt-0.5 flex-shrink-0 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-sm">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50">{alert.type} Alert</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-900/80 border border-black/5 dark:border-slate-700 uppercase tracking-wide text-slate-800 dark:text-slate-100">
                    {alert.category}
                  </span>
                </div>
                <button className="text-black/20 dark:text-white/30 hover:text-black/50 dark:hover:text-white/60 transition-colors">
                  <X size={14} />
                </button>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-800 dark:text-slate-100">{alert.message}</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                <span>Source: {alert.source}</span>
                <span>•</span>
                <span>{alert.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;