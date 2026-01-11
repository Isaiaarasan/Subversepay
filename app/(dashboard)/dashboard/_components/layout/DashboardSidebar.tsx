"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as Home, LayoutDashboard, Settings, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";

export function DashboardSidebar() {
  const pathname = usePathname();
  const isSuperAdmin = pathname?.startsWith("/dashboard/super-admin");
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-2xl overflow-hidden border-r border-sidebar-border">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border font-bold text-xl tracking-tight">
        <img src="/favicon.ico" alt="Subverse Pay" className="w-8 h-8 mr-2" /> Subverse Pay
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href={isSuperAdmin ? "/dashboard/super-admin/" : "/dashboard/"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/merchants" : "/dashboard/features/merchants"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Store className="h-4 w-4" />
          <span>Merchants</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/approvals" : "/dashboard/features/approvals"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <CheckCircle className="h-4 w-4" />
          <span>Approvals</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/analytics" : "/dashboard/features/analytics"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/alerts" : "/dashboard/features/alerts"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span>Alerts</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/settlements" : "/dashboard/features/settlements"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <CreditCard className="h-4 w-4" />
          <span>Settlements</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/system-health" : "/dashboard/features/system-health"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Activity className="h-4 w-4" />
          <span>System Health</span>
        </Link>
        <Link href={isSuperAdmin ? "/dashboard/super-admin/tickets" : "/dashboard/features/tickets"} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Ticket className="h-4 w-4" />
          <span>Tickets</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
