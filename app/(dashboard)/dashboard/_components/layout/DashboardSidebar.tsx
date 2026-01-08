"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, SETTINGS_ITEM, type NavigationItem } from '../../_constants/navigation';
import type { Role } from '../../_constants/roles';

interface DashboardSidebarProps {
  userRole: Role;
  className?: string;
}

export function DashboardSidebar({ userRole, className }: DashboardSidebarProps) {
  const pathname = usePathname();

  const filteredItems = NAVIGATION_ITEMS.filter(item =>
    item.roles.includes(userRole)
  );

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    }
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          active
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent/50 hover:text-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside className={cn(
      "w-64 h-screen fixed left-0 top-0 z-50 flex flex-col bg-card text-card-foreground shadow-lg border-r border-border overflow-hidden",
      className
    )}>
      {/* Logo/Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="font-bold text-xl tracking-tight">Subverse Pay</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map(renderNavItem)}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Link
          href={SETTINGS_ITEM.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            isActive(SETTINGS_ITEM.href)
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent/50 hover:text-accent-foreground"
          )}
        >
          <SETTINGS_ITEM.icon className="h-4 w-4 flex-shrink-0" />
          <span>{SETTINGS_ITEM.name}</span>
        </Link>
      </div>
    </aside>
  );
}