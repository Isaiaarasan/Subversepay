import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "../services/auth.service";
import { getOrganizationByCreator } from "../services/organizations.service";
import { Shield } from "lucide-react";
import { TimePeriodSelector } from "../_components/TimePeriodSelector";
import { AdminStatsCards } from "../_components/AdminStatsCards";
import { AdminQuickActions } from "../_components/AdminQuickActions";
import { AdminCharts } from "../_components/AdminCharts";

export default async function AdminPage() {
  // Business logic moved to services
  const user = await requireAuth();
  const org = await getOrganizationByCreator(user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Complete platform oversight and management.</p>
          </div>
        </div>

        <TimePeriodSelector />
      </div>

      {/* Stats Grid */}
      <AdminStatsCards />

      {/* Quick Actions */}
      <AdminQuickActions />

      {/* Charts Section */}
      <AdminCharts />

      <div className="grid gap-6">

      </div>
    </div>
  );
}