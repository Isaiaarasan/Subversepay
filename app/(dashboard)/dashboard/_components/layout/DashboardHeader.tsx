"use client";

import React from 'react';
import { User, Search, Bell, Settings } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  actions?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function DashboardHeader({
  title,
  subtitle,
  user,
  actions,
  showSearch = false,
  showNotifications = false,
}: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Custom Actions */}
        {actions}

        {/* Notifications */}
        {showNotifications && (
          <button className="relative p-2 rounded-md hover:bg-muted/50 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </button>
        )}

        {/* User Menu */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-medium text-sm">
                {user.name || 'User'}
              </div>
              <div className="text-xs text-muted-foreground">
                {user.email}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}