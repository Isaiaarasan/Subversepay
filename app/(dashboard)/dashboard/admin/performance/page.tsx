"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, TrendingDown, Users, Clock, DollarSign, Target } from "lucide-react";

interface LCOPerformanceData {
  id: string;
  name: string;
  avatar?: string;
  address: string;
  state: string;
  subscribers: number;
  collectionRate: number;
  avgTime: string;
  revenue: number;
  churnRate: number;
  rank: number;
}

// Mock data for demonstration - in real app this would come from API
const mockLCOPerformanceData: LCOPerformanceData[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    address: "MG Road, Bangalore",
    state: "Karnataka",
    subscribers: 2540,
    collectionRate: 94.2,
    avgTime: "2.3h",
    revenue: 45230,
    churnRate: 3.1,
    rank: 1,
  },
  {
    id: "2",
    name: "Priya Sharma",
    address: "Connaught Place, Delhi",
    state: "Delhi",
    subscribers: 2180,
    collectionRate: 91.8,
    avgTime: "2.8h",
    revenue: 38950,
    churnRate: 4.2,
    rank: 2,
  },
  {
    id: "3",
    name: "Amit Singh",
    address: "Park Street, Kolkata",
    state: "West Bengal",
    subscribers: 1980,
    collectionRate: 89.5,
    avgTime: "3.1h",
    revenue: 35670,
    churnRate: 3.8,
    rank: 3,
  },
  {
    id: "4",
    name: "Sunita Patel",
    address: "Ashram Road, Ahmedabad",
    state: "Gujarat",
    subscribers: 1750,
    collectionRate: 87.3,
    avgTime: "3.4h",
    revenue: 32140,
    churnRate: 4.5,
    rank: 4,
  },
  {
    id: "5",
    name: "Vikram Rao",
    address: "Banjara Hills, Hyderabad",
    state: "Telangana",
    subscribers: 1620,
    collectionRate: 85.9,
    avgTime: "3.7h",
    revenue: 29850,
    churnRate: 5.1,
    rank: 5,
  },
  {
    id: "6",
    name: "Meera Joshi",
    address: "FC Road, Pune",
    state: "Maharashtra",
    subscribers: 1480,
    collectionRate: 83.4,
    avgTime: "4.1h",
    revenue: 27560,
    churnRate: 4.8,
    rank: 6,
  },
  {
    id: "7",
    name: "Suresh Gupta",
    address: "Sector 18, Noida",
    state: "Uttar Pradesh",
    subscribers: 1350,
    collectionRate: 81.2,
    avgTime: "4.4h",
    revenue: 24890,
    churnRate: 5.5,
    rank: 7,
  },
  {
    id: "8",
    name: "Kavita Desai",
    address: "Anna Nagar, Chennai",
    state: "Tamil Nadu",
    subscribers: 1220,
    collectionRate: 78.9,
    avgTime: "4.8h",
    revenue: 22340,
    churnRate: 6.2,
    rank: 8,
  },
  {
    id: "9",
    name: "Rakesh Mehta",
    address: "Civil Lines, Jaipur",
    state: "Rajasthan",
    subscribers: 1180,
    collectionRate: 76.5,
    avgTime: "5.2h",
    revenue: 21250,
    churnRate: 5.9,
    rank: 9,
  },
  {
    id: "10",
    name: "Anjali Nair",
    address: "MG Road, Kochi",
    state: "Kerala",
    subscribers: 1050,
    collectionRate: 74.1,
    avgTime: "5.6h",
    revenue: 19870,
    churnRate: 6.8,
    rank: 10,
  },
];

const LCOPerformanceCard: React.FC<{ lco: LCOPerformanceData }> = ({ lco }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getCollectionRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getChurnRateColor = (rate: number) => {
    if (rate <= 4) return "text-green-600";
    if (rate <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${lco.rank <= 3 ? "border-primary/20 bg-primary/5" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-muted-foreground min-w-[2rem] text-center">
              {getRankIcon(lco.rank)}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={lco.avatar} />
              <AvatarFallback className="bg-primary/10 text-xs font-semibold">
                {lco.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-0.5">
                  {lco.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  {lco.address}
                </p>
                <p className="text-xs font-medium text-primary leading-tight">
                  {lco.state}
                </p>
              </div>
              {lco.rank <= 3 && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                  <Trophy className="h-2.5 w-2.5 mr-1" />
                  Top Performer
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
              <div className="text-center p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-center mb-0.5">
                  <Users className="h-3.5 w-3.5 text-blue-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">Subscribers</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{lco.subscribers.toLocaleString()}</p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-center mb-0.5">
                  <Target className="h-3.5 w-3.5 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">Collection Rate</span>
                </div>
                <p className={`text-sm font-semibold ${getCollectionRateColor(lco.collectionRate)}`}>
                  {lco.collectionRate}%
                </p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-center mb-0.5">
                  <Clock className="h-3.5 w-3.5 text-orange-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">Avg Time</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{lco.avgTime}</p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-center mb-0.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">Revenue</span>
                </div>
                <p className="text-sm font-semibold text-foreground">₹{lco.revenue.toLocaleString()}</p>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-center mb-0.5">
                  <TrendingDown className="h-3.5 w-3.5 text-red-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">Churn Rate</span>
                </div>
                <p className={`text-sm font-semibold ${getChurnRateColor(lco.churnRate)}`}>
                  {lco.churnRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PerformancePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Monitor LCO performance metrics and rankings
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            LCO Performance Leaderboard
          </CardTitle>
          <CardDescription>
            Top performing LCOs based on collection rates, revenue, and customer retention metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLCOPerformanceData.map((lco) => (
              <LCOPerformanceCard key={lco.id} lco={lco} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}