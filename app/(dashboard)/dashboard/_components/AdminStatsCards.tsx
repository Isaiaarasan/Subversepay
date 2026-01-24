"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import { CreditCard, Users, UserCheck, Brain, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

export function AdminStatsCards() {
  // Admin-specific stats data
  const adminStats = [
    {
      title: "Total Collection",
      value: "₹2,45,000",
      subtitle: "This month",
      trend: "up" as const,
      trendValue: "+12.5%",
      icon: CreditCard,
    },
    {
      title: "Total Managers",
      value: "24",
      subtitle: "Active managers",
      trend: "up" as const,
      trendValue: "+3",
      icon: Users,
    },
    {
      title: "Total Customers",
      value: "1,247",
      subtitle: "Registered users",
      trend: "up" as const,
      trendValue: "+8.2%",
      icon: UserCheck,
    },
    {
      title: "AI Retry Success",
      value: "94.7%",
      subtitle: "Success rate",
      trend: "up" as const,
      trendValue: "+2.1%",
      icon: Brain,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {adminStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}