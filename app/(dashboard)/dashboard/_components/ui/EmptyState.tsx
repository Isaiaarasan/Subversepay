"use client";

import React from 'react';
import { FileX, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'error';
}

const variantConfig = {
  default: {
    icon: FileX,
    color: 'text-muted-foreground',
  },
  search: {
    icon: Search,
    color: 'text-blue-500',
  },
  error: {
    icon: AlertTriangle,
    color: 'text-destructive',
  },
};

export function EmptyState({
  icon: IconComponent,
  title,
  description,
  action,
  variant = 'default',
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = IconComponent || config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Icon className={`h-12 w-12 mb-4 ${config.color}`} />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}