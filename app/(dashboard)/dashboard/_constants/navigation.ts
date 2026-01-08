import { LayoutDashboard, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, Settings } from "lucide-react";
import { ROLES, type Role } from './roles';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
  description: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.MEMBER, ROLES.TEAM_LEAD, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Dashboard overview and metrics"
  },
  {
    name: "Merchants",
    href: "/dashboard/merchants",
    icon: Store,
    roles: [ROLES.TEAM_LEAD, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Manage and view merchant accounts"
  },
  {
    name: "Approvals",
    href: "/dashboard/approvals",
    icon: CheckCircle,
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Review and approve pending requests"
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: [ROLES.MEMBER, ROLES.TEAM_LEAD, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "View analytics and reports"
  },
  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
    roles: [ROLES.MEMBER, ROLES.TEAM_LEAD, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "System alerts and notifications"
  },
  {
    name: "Settlements",
    href: "/dashboard/settlements",
    icon: CreditCard,
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Settlement reports and payments"
  },
  {
    name: "System Health",
    href: "/dashboard/system-health",
    icon: Activity,
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Monitor system status and performance"
  },
  {
    name: "Tickets",
    href: "/dashboard/tickets",
    icon: Ticket,
    roles: [ROLES.MEMBER, ROLES.TEAM_LEAD, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    description: "Support tickets and issues"
  },
];

export const SETTINGS_ITEM = {
  name: "Settings",
  href: "/dashboard/settings",
  icon: Settings,
  description: "Account and system settings"
} as const;