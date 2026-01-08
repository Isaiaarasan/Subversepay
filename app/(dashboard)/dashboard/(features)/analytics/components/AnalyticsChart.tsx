"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnalyticsChartProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AnalyticsChart({ title, children, className = '' }: AnalyticsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80 ${className}`}
    >
      <div className="p-6">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
}