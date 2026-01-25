"use client";

import React from "react";
import StatCard from "@/components/ui/stat-card";
import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

export function PaymentStatusCards() {
  // Payment status stats data
  const paymentStats = [
    {
      title: "Successful Payment Count",
      value: "1,245",
      subtitle: "Completed payments",
      trend: "up" as const,
      trendValue: "+15.3%",
      icon: CheckCircle,
    },
    {
      title: "Pending Payment Count",
      value: "23",
      subtitle: "Awaiting processing",
      trend: "down" as const,
      trendValue: "-5.2%",
      icon: Clock,
    },
    {
      title: "Aborted Payment Count",
      value: "8",
      subtitle: "Cancelled by user",
      trend: "down" as const,
      trendValue: "-12.5%",
      icon: XCircle,
    },
    {
      title: "Failed Payment Count",
      value: "15",
      subtitle: "Payment errors",
      trend: "down" as const,
      trendValue: "-8.7%",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {paymentStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}