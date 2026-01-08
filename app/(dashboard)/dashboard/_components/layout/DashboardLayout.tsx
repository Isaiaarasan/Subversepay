"use client";

import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardContent } from './DashboardContent';
import { DashboardSidebar as Sidebar } from './DashboardSidebar';
import { useAuth } from '../../_services/auth.service';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  headerProps?: React.ComponentProps<typeof DashboardHeader>;
  contentProps?: Omit<React.ComponentProps<typeof DashboardContent>, 'children'>;
}

export function DashboardLayout({
  children,
  headerProps,
  contentProps,
}: DashboardLayoutProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." size="lg" />;
  }

  if (!isAuthenticated || !role) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={role} />

      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader {...headerProps} title={headerProps?.title ?? 'Dashboard'} />
        <DashboardContent {...contentProps}>
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}