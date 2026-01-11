/**
 * Client-side approval utilities
 * No "use server" directive - these are client-side utilities
 */

import { filterItems } from "./filtering.utils";
import { Approval } from "@/lib/store/slices/approvalsSlice";

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
