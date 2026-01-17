"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as Home, LayoutDashboard, Settings, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

function SidebarLink({ href, icon: Icon, label, active }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
        ${active
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }
      `}
    >
      <Icon className={`h-4 w-4 shrink-0 transition-colors ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"}`} />
      <span>{label}</span>
    </Link>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const isSuperAdmin = pathname?.startsWith("/dashboard/super-admin");
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-2xl overflow-hidden border-r border-sidebar-border">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border font-bold text-xl tracking-tight">
        <img src="/favicon.ico" alt="Subverse Pay" className="w-8 h-8 mr-2" /> Subverse Pay
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/" : "/dashboard/"}
          icon={LayoutDashboard}
          label="Dashboard"
          active={pathname === (isSuperAdmin ? "/dashboard/super-admin" : "/dashboard") || pathname === (isSuperAdmin ? "/dashboard/super-admin/" : "/dashboard/")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/merchants" : "/dashboard/features/merchants"}
          icon={Store}
          label="Merchants"
          active={pathname?.includes("merchants")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/approvals" : "/dashboard/features/approvals"}
          icon={CheckCircle}
          label="Approvals"
          active={pathname?.includes("approvals")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/analytics" : "/dashboard/features/analytics"}
          icon={BarChart3}
          label="Analytics"
          active={pathname?.includes("analytics")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/alerts" : "/dashboard/features/alerts"}
          icon={Bell}
          label="Alerts"
          active={pathname?.includes("alerts")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/settlements" : "/dashboard/features/settlements"}
          icon={CreditCard}
          label="Settlements"
          active={pathname?.includes("settlements")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/system-health" : "/dashboard/features/system-health"}
          icon={Activity}
          label="System Health"
          active={pathname?.includes("system-health")}
        />
        <SidebarLink
          href={isSuperAdmin ? "/dashboard/super-admin/tickets" : "/dashboard/features/tickets"}
          icon={Ticket}
          label="Tickets"
          active={pathname?.includes("tickets")}
        />
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
