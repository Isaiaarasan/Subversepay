"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onClick?: () => void;
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  colorScheme?: "emerald" | "blue" | "purple";
}

export function ActionButton({
  onClick,
  label = "Download Report",
  icon: Icon = Download,
  colorScheme = "blue"
}: ActionButtonProps) {
  const colorClasses = {
    emerald: "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700",
    blue: "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700",
    purple: "text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700"
  };

  return (
    <button
      onClick={onClick}
      className={`group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-md transition-all duration-300 ${colorClasses[colorScheme]}`}
    >
      <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent transition-colors w-full h-full">
        <div className="flex flex-col justify-center w-full h-full">
          <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
          <div className="flex items-center gap-2">
            <Icon size={14} className={`${colorScheme === "emerald" ? "text-emerald-500" : colorScheme === "blue" ? "text-blue-500" : "text-purple-500"}`} />
            <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">{label}</span>
          </div>
        </div>
      </div>
    </button>
  );
}