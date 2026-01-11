/**
 * Client-side filtering utilities
 * No "use server" directive - these are client-side utilities
 */

export interface FilterOptions {
  searchQuery?: string;
  searchFields?: string[];
  statusFilter?: string | "all";
  startDate?: string;
  endDate?: string;
  dateField?: string;
  customFilters?: Record<string, (item: any) => boolean>;
}

/**
 * Generic filter function that can be reused across features
 * Client-side utility - no server actions
 */
export function filterItems<T extends Record<string, any>>(
  items: T[],
  options: FilterOptions
): T[] {
  return items.filter((item) => {
    // Search filter
    if (options.searchQuery && options.searchFields && options.searchFields.length > 0) {
      const searchLower = options.searchQuery.toLowerCase();
      const matchesSearch = options.searchFields.some((field) => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(searchLower);
      });
      if (!matchesSearch) return false;
    }

    // Status filter
    if (options.statusFilter && options.statusFilter !== "all") {
      if (item.status !== options.statusFilter) return false;
    }

    // Date range filter
    if (options.startDate || options.endDate) {
      const dateField = options.dateField || "date" || "createdDate";
      const itemDate = item[dateField];
      
      if (itemDate) {
        const itemDateObj = new Date(itemDate);
        const start = options.startDate ? new Date(options.startDate) : null;
        const end = options.endDate ? new Date(options.endDate) : null;

        if (start && itemDateObj < start) return false;
        if (end && itemDateObj > end) return false;
      } else if (options.startDate || options.endDate) {
        // If date field doesn't exist but filters are set, exclude item
        return false;
      }
    }

    // Custom filters
    if (options.customFilters) {
      for (const [key, filterFn] of Object.entries(options.customFilters)) {
        if (!filterFn(item)) return false;
      }
    }

    return true;
  });
}

/**
 * Filter tickets by status (active vs closed)
 * Client-side utility
 */
export function filterTicketsByStatus<T extends { status: string }>(
  tickets: T[],
  activeTab: "active" | "closed"
): T[] {
  if (activeTab === "active") {
    return tickets.filter((ticket) => ticket.status !== "Closed");
  }
  return tickets.filter((ticket) => ticket.status === "Closed");
}

/**
 * Count items by status
 * Client-side utility
 */
export function countByStatus<T extends { status: string }>(
  items: T[],
  status: string
): number {
  return items.filter((item) => item.status === status).length;
}

/**
 * Count active vs closed items
 * Client-side utility
 */
export function countActiveAndClosed<T extends { status: string }>(items: T[]) {
  const active = items.filter((item) => item.status !== "Closed").length;
  const closed = items.filter((item) => item.status === "Closed").length;
  return { active, closed };
}
