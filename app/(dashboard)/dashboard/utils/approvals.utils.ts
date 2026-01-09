/**
 * Client-side approval utilities
 * No "use server" directive - these are client-side utilities
 */

import { filterItems } from "./filtering.utils";

export interface Approval {
  id: number;
  name: string;
  type: string;
  email: string;
  date: string;
  status: string;
  logo?: string;
  revenue?: string;
  subscribers?: string;
  growth?: string;
  sector?: string;
  phone?: string;
  address?: string;
  gst?: string;
  bank?: string;
  documentsList: Array<{ name: string; status: string }>;
}

export interface ApprovalFilters {
  searchQuery?: string;
  statusFilter?: 'All' | string;
  startDate?: string;
  endDate?: string;
}

/**
 * Filter approvals client-side (for client components that already have data)
 * All filtering logic is centralized here
 */
export function filterApprovals(
  approvals: Approval[],
  filters: ApprovalFilters
): Approval[] {
  return filterItems(approvals, {
    searchQuery: filters.searchQuery,
    searchFields: ['name', 'type', 'email'],
    statusFilter: filters.statusFilter === 'All' ? undefined : filters.statusFilter,
    startDate: filters.startDate,
    endDate: filters.endDate,
    dateField: 'date',
  });
}
