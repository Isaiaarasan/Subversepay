"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Link as Home, LayoutDashboard, Settings, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, LogOut, TrendingUp, Cog, ChevronDown, Users, UserCog } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { ROUTES } from "@/lib/constants/routes";
import { LABELS } from "@/lib/constants/labels";

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
  const isSuperAdmin = pathname?.startsWith(ROUTES.SUPER_ADMIN.ROOT);
  const isAdmin = pathname?.startsWith(ROUTES.ADMIN.ROOT);
  const [isManageOpen, setIsManageOpen] = useState(pathname?.includes(ROUTES.ADMIN.MANAGE.ROOT));

  const isManageActive = pathname?.includes(ROUTES.ADMIN.MANAGE.ROOT);

  // Keep dropdown open when on manage sub-pages
  useEffect(() => {
    if (pathname?.includes(ROUTES.ADMIN.MANAGE.ROOT)) {
      setIsManageOpen(true);
    }
  }, [pathname]);

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-2xl overflow-hidden border-r border-sidebar-border">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border font-bold text-xl tracking-tight">
        <img src="/favicon.ico" alt={LABELS.SUBVERSE_PAY} className="w-8 h-8 mr-2" /> {LABELS.SUBVERSE_PAY}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {isAdmin ? (
          <>
            <SidebarLink
              href={ROUTES.ADMIN.ROOT}
              icon={LayoutDashboard}
              label={LABELS.DASHBOARD}
              active={pathname === ROUTES.ADMIN.ROOT || pathname === `${ROUTES.ADMIN.ROOT}/`}
            />
            <div className="space-y-1">
              <button
                onClick={() => setIsManageOpen(!isManageOpen)}
                className={`w-full relative group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                  ${isManageActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Cog className={`h-4 w-4 shrink-0 transition-colors ${isManageActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"}`} />
                  <span>{LABELS.MANAGE}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isManageOpen ? "rotate-180" : ""} ${isManageActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                />
              </button>
              {isManageOpen && (
                <div className="ml-4 space-y-1 pl-4 border-l-2 border-sidebar-border">
                  <Link
                    href={ROUTES.ADMIN.MANAGE.MANAGERS}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                      ${pathname?.includes(ROUTES.ADMIN.MANAGE.MANAGERS)
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
                    `}
                  >
                    <UserCog className="h-4 w-4 shrink-0" />
                    <span>{LABELS.MANAGERS}</span>
                  </Link>
                  <Link
                    href={ROUTES.ADMIN.MANAGE.CUSTOMERS}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                      ${pathname?.includes(ROUTES.ADMIN.MANAGE.CUSTOMERS)
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
                    `}
                  >
                    <Users className="h-4 w-4 shrink-0" />
                    <span>{LABELS.CUSTOMERS}</span>
                  </Link>
                </div>
              )}
            </div>
            <SidebarLink
              href={ROUTES.ADMIN.ANALYTICS}
              icon={BarChart3}
              label={LABELS.ANALYTICS}
              active={pathname?.includes("analytics")}
            />
            <SidebarLink
              href={ROUTES.ADMIN.PERFORMANCE}
              icon={Activity}
              label={LABELS.PERFORMANCE}
              active={pathname?.includes("performance")}
            />
            <SidebarLink
              href={ROUTES.ADMIN.REVENUE_FORECAST}
              icon={TrendingUp}
              label={LABELS.REVENUE_FORECAST}
              active={pathname?.includes("revenue-forecast")}
            />
            <SidebarLink
              href={ROUTES.ADMIN.SETTINGS}
              icon={Settings}
              label={LABELS.SETTINGS}
              active={pathname?.includes("settings")}
            />
            <SidebarLink
              href={ROUTES.ADMIN.TICKETS}
              icon={Ticket}
              label={LABELS.TICKETS}
              active={pathname?.includes("tickets")}
            />
          </>
        ) : (
          <>
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.ROOT : ROUTES.DASHBOARD.ROOT}
              icon={LayoutDashboard}
              label={LABELS.DASHBOARD}
              active={pathname === (isSuperAdmin ? ROUTES.SUPER_ADMIN.ROOT : ROUTES.DASHBOARD.ROOT) || pathname === (isSuperAdmin ? `${ROUTES.SUPER_ADMIN.ROOT}/` : `${ROUTES.DASHBOARD.ROOT}/`)}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.MERCHANTS : ROUTES.DASHBOARD.FEATURES.MERCHANTS}
              icon={Store}
              label={LABELS.MERCHANTS}
              active={pathname?.includes("merchants")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.APPROVALS : ROUTES.DASHBOARD.FEATURES.APPROVALS}
              icon={CheckCircle}
              label={LABELS.APPROVALS}
              active={pathname?.includes("approvals")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.ANALYTICS : ROUTES.DASHBOARD.FEATURES.ANALYTICS}
              icon={BarChart3}
              label={LABELS.ANALYTICS}
              active={pathname?.includes("analytics")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.ALERTS : ROUTES.DASHBOARD.FEATURES.ALERTS}
              icon={Bell}
              label={LABELS.ALERTS}
              active={pathname?.includes("alerts")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.SETTLEMENTS : ROUTES.DASHBOARD.FEATURES.SETTLEMENTS}
              icon={CreditCard}
              label={LABELS.SETTLEMENTS}
              active={pathname?.includes("settlements")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.SYSTEM_HEALTH : ROUTES.DASHBOARD.FEATURES.SYSTEM_HEALTH}
              icon={Activity}
              label={LABELS.SYSTEM_HEALTH}
              active={pathname?.includes("system-health")}
            />
            <SidebarLink
              href={isSuperAdmin ? ROUTES.SUPER_ADMIN.FEATURES.TICKETS : ROUTES.DASHBOARD.FEATURES.TICKETS}
              icon={Ticket}
              label={LABELS.TICKETS}
              active={pathname?.includes("tickets")}
            />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>{LABELS.LOGOUT}</span>
        </button>
      </div>
    </aside>
  );
}
