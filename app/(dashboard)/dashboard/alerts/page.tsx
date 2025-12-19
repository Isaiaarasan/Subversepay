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
        return <AlertOctagon className="text-white" />;
      case "High":
        return <AlertTriangle className="text-white" />;
      case "Medium":
        return <AlertTriangle className="text-black" />;
      case "Low":
        return <Info className="text-zinc-500" />;
      case "Info":
      default:
        return <Info className="text-zinc-400" />;
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
        return "bg-red-600 border-red-600 text-white shadow-md shadow-red-200";
      case "High":
        return "bg-black border-black text-white shadow-lg shadow-zinc-300";
      case "Medium":
        return "bg-white border-2 border-black text-black shadow-md shadow-zinc-200";
      case "Low":
        return "bg-zinc-100 border-zinc-200 text-zinc-800";
      default:
        return "bg-white border-zinc-100 text-zinc-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">System Alerts</h1>
          <p className="text-zinc-500">Real-time monitoring of critical events.</p>
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
            className={`flex items-start gap-3 p-4 rounded-xl border ${getTypeStyles(alert.type)} relative group`}
          >
            <div className="mt-0.5 flex-shrink-0 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-sm">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-inherit">{alert.type} Alert</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide border ${alert.type === 'High' || alert.type === 'Critical' ? 'bg-white/20 border-white/20 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                    }`}>
                    {alert.category}
                  </span>
                </div>
                <button className={`${alert.type === 'High' || alert.type === 'Critical' ? 'text-white/60 hover:text-white' : 'text-zinc-400 hover:text-black'} transition-colors`}>
                  <X size={14} />
                </button>
              </div>
              <p className={`mt-1 text-xs font-medium ${alert.type === 'High' || alert.type === 'Critical' ? 'text-white/90' : 'text-zinc-600'}`}>{alert.message}</p>
              <div className={`flex items-center gap-4 mt-2 text-[10px] font-semibold uppercase tracking-wide ${alert.type === 'High' || alert.type === 'Critical' ? 'text-white/60' : 'text-zinc-400'}`}>
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