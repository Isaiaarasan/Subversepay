"use client";

import React from 'react';

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function DashboardContent({
  children,
  className = '',
  padding = 'lg',
}: DashboardContentProps) {
  return (
    <main className={`flex-1 overflow-auto ${paddingClasses[padding]} ${className}`}>
      {children}
    </main>
  );
}