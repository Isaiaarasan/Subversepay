"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border',
  {
    variants: {
      variant: {
        success: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/30',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30',
        error: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/30',
        info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        neutral: 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-800',
        active: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        inactive: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
        pending: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30',
        processing: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        completed: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/30',
        failed: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/30',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[8px]',
        md: 'px-2 py-0.5 text-[10px]',
        lg: 'px-2.5 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  dot?: boolean;
}

export function StatusBadge({
  children,
  variant,
  size,
  dot = false,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={statusBadgeVariants({ variant, size, className })}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 flex-shrink-0" />
      )}
      {children}
    </span>
  );
}

// Specialized status badges for common use cases
export function MerchantStatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'active';
      case 'inactive':
        return 'inactive';
      case 'pending':
        return 'pending';
      default:
        return 'neutral';
    }
  };

  return (
    <StatusBadge variant={getVariant(status)}>
      {status}
    </StatusBadge>
  );
}

export function TicketPriorityBadge({ priority }: { priority: string }) {
  const getVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <StatusBadge variant={getVariant(priority)}>
      {priority}
    </StatusBadge>
  );
}

export function TicketStatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'error';
      case 'in progress':
        return 'processing';
      case 'closed':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <StatusBadge variant={getVariant(status)}>
      {status}
    </StatusBadge>
  );
}

export function ApprovalStatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'neutral';
    }
  };

  return (
    <StatusBadge variant={getVariant(status)}>
      {status}
    </StatusBadge>
  );
}

export function SettlementStatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'processing';
      case 'failed':
        return 'error';
      case 'pending':
        return 'pending';
      default:
        return 'neutral';
    }
  };

  return (
    <StatusBadge variant={getVariant(status)}>
      {status}
    </StatusBadge>
  );
}