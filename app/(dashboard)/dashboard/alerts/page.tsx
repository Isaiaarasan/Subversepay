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
        return <AlertOctagon className="text-red-500 dark:text-red-400" />;
      case "High":
        return <AlertTriangle className="text-orange-500 dark:text-orange-400" />;
      case "Medium":
        return <AlertTriangle className="text-yellow-500 dark:text-yellow-400" />;
      case "Low":
        return <Info className="text-blue-500 dark:text-blue-400" />;
      case "Info":
      default:
        return <Info className="text-gray-400 dark:text-gray-500" />;
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
        return "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-200";
      case "High":
        return "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30 text-orange-800 dark:text-orange-200";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "Low":
        return "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-200";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Alerts</h1>
          <p className="text-gray-500 dark:text-gray-400">Real-time monitoring of critical events.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilter((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm hover:bg-zinc-50 text-zinc-700 transition-all shadow-sm"
            >
              <Filter size={18} />
              {filterType === "All" ? "Filter Priority" : `Priority: ${filterType}`}
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-zinc-200 rounded-lg shadow-xl z-20 p-2">
                {["All", "Critical", "High", "Medium", "Low", "Info"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type as AlertType | "All");
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filterType === type
                      ? "bg-black text-white font-medium"
                      : "text-zinc-600 hover:bg-zinc-100"
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
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 font-bold text-sm"
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
            className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${getTypeStyles(alert.type)}`}
          >
            <div className="mt-0.5 flex-shrink-0 p-2 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base">{alert.type} Alert</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-white/50 dark:bg-black/20 backdrop-blur-sm`}>
                    {alert.category}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <p className="mt-1 text-sm font-medium opacity-90">{alert.message}</p>
              <div className="flex items-center gap-4 mt-3 text-xs font-semibold uppercase tracking-wide opacity-60">
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