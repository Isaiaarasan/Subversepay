import React from 'react';
import { DashboardLayout as DashboardLayoutComponent } from './_components/layout/DashboardLayout';
import { DashboardReduxProvider } from '@/components/providers/ReduxProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardReduxProvider>
      <DashboardLayoutComponent>
        {children}
      </DashboardLayoutComponent>
    </DashboardReduxProvider>
  );
}