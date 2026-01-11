/**
 * Client-side settlement utilities
 * No "use server" directive - these are client-side utilities
 */

import { filterItems } from "./filtering.utils";
import { Settlement } from "@/lib/store/slices/settlementsSlice";

export interface SettlementFilters {
  searchQuery?: string;
  statusFilter?: 'all' | 'Completed' | 'Processing' | 'Failed';
  startDate?: string;
  endDate?: string;
}

/**
 * Filter settlements client-side (for client components that already have data)
 * All filtering logic is centralized here
 */
export function filterSettlements(
  settlements: Settlement[],
  filters: SettlementFilters
): Settlement[] {
  return filterItems(settlements, {
    searchQuery: filters.searchQuery,
    searchFields: ['id', 'to', 'from'],
    statusFilter: filters.statusFilter === 'all' ? undefined : filters.statusFilter,
    startDate: filters.startDate,
    endDate: filters.endDate,
    dateField: 'date',
  });
}
