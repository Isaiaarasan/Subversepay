"use client";

import React from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { ROLE_LABELS, ROLE_DESCRIPTIONS, type Role } from '../_constants/roles';

interface RolePageProps {
  role: Role;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function RolePage({ role, title, subtitle, children }: RolePageProps) {
  const defaultTitle = ROLE_LABELS[role];
  const defaultSubtitle = ROLE_DESCRIPTIONS[role];

  return (
    <DashboardLayout
      headerProps={{
        title: title || defaultTitle,
        subtitle: subtitle || defaultSubtitle,
      }}
    >
      {children || (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Welcome to {defaultTitle} Dashboard
          </h2>
          <p className="text-muted-foreground">
            {defaultSubtitle}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}