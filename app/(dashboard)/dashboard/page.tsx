import React from "react";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricsGrid } from "@/components/ui/metrics-grid";
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getOverviewMetrics,
  getRecentActivities,
  getPendingApprovals,
} from "./services/overview.service";

/**
 * Overview Page
 * Main dashboard overview - orchestrates data fetching and rendering
 * NO business logic - all logic is in services
 */
export default async function OverviewPage() {
  // Fetch all data via services
  const metrics = await getOverviewMetrics();
  const recentActivities = await getRecentActivities();
  const pendingApprovals = await getPendingApprovals();

  // Convert metrics object to array for MetricsGrid
  const metricsArray = Object.values(metrics);

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <PageHeader
        title="Super Admin Dashboard"
        description="Overview of platform performance and entities."
        icon={Users}
        variant="gradient"
        actions={
          <>
            <TimeRangeSelector />
            <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </>
        }
      />

      {/* Metrics Grid */}
      <MetricsGrid metrics={metricsArray} columns={4} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ComparisonGraph />
        </div>
        <div className="lg:col-span-1">
          <PaymentPieChart />
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        <PendingApprovalsWidget approvals={pendingApprovals} />

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ActiveMerchantsWidget />
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionsWidget />
        <RecentActivityWidget activities={recentActivities} />
      </div>
    </div>
  );
}

// Extracted client components for interactivity
function TimeRangeSelector() {
  "use client";
  const [timeRange, setTimeRange] = React.useState("This Month");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[160px] justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">{timeRange}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl"
      >
        {["This Month", "Last Month", "This Quarter"].map((range) => (
          <DropdownMenuItem
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${timeRange === range
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-200"
              }`}
          >
            <Calendar className="h-4 w-4" />
            {range}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PendingApprovalsWidget({
  approvals,
}: {
  approvals: Awaited<ReturnType<typeof getPendingApprovals>>;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-200">Pending Approvals</h3>
        <a
          href="/dashboard/approvals"
          className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All
        </a>
      </div>
      <div className="space-y-3">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                {item.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{item.name}</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  {item.type} • {item.date}
                </p>
              </div>
            </div>
            <button className="text-[10px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
              Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveMerchantsWidget() {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-200">Active Merchants Activity</h3>
        <a
          href="/dashboard/merchants"
          className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Manage
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 uppercase">
              <th className="pb-2 pl-2">Merchant</th>
              <th className="pb-2 text-right">TPV (Today)</th>
              <th className="pb-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {[1, 2, 3].map((_, i) => (
              <tr key={i} className="text-xs hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-2.5 pl-2 font-medium text-gray-700 dark:text-gray-300">
                  SpeedNet ISP #{i + 1}
                </td>
                <td className="py-2.5 text-right text-gray-600 dark:text-gray-400">₹45,00{i}</td>
                <td className="py-2.5 text-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickActionsWidget() {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-left transition-colors">
          <div className="font-medium text-blue-900 dark:text-blue-100">Add Merchant</div>
          <div className="text-sm text-blue-600 dark:text-blue-300">Onboard new partner</div>
        </button>
        <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg text-left transition-colors">
          <div className="font-medium text-green-900 dark:text-green-100">View Reports</div>
          <div className="text-sm text-green-600 dark:text-green-300">Download analytics</div>
        </button>
        <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-left transition-colors">
          <div className="font-medium text-purple-900 dark:text-purple-100">Manage Users</div>
          <div className="text-sm text-purple-600 dark:text-purple-300">Team administration</div>
        </button>
        <button className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg text-left transition-colors">
          <div className="font-medium text-orange-900 dark:text-orange-100">System Health</div>
          <div className="text-sm text-orange-600 dark:text-orange-300">Check status</div>
        </button>
      </div>
    </div>
  );
}

function RecentActivityWidget({
  activities,
}: {
  activities: Awaited<ReturnType<typeof getRecentActivities>>;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div
              className={`w-2 h-2 rounded-full ${activity.type === "success"
                  ? "bg-green-500"
                  : activity.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
            ></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}