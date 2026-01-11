/**
 * Client-side ticket utilities
 * No "use server" directive - these are client-side utilities
 */

import { filterItems, filterTicketsByStatus } from "./filtering.utils";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  user: string;
  type: string;
  priority: string;
  status: string;
  date: string;
  createdDate?: string;
  attachments?: boolean;
}

/**
 * Filter tickets client-side (for client components that already have data)
 * All filtering logic is centralized here
 */
export function filterTickets(
  tickets: Ticket[],
  filters: {
    activeTab?: 'active' | 'closed';
    searchQuery?: string;
    startDate?: string;
    endDate?: string;
  }
): Ticket[] {
  let filtered = tickets;

  // Status filter (active vs closed)
  if (filters.activeTab) {
    filtered = filterTicketsByStatus(filtered, filters.activeTab);
  }

  // Apply generic filters (search, date range)
  filtered = filterItems(filtered, {
    searchQuery: filters.searchQuery,
    searchFields: ['title', 'id', 'user', 'description', 'type', 'priority', 'status'],
    startDate: filters.startDate,
    endDate: filters.endDate,
    dateField: 'createdDate',
  });

  return filtered;
}

/**
 * Count active and closed tickets
 */
export function countActiveAndClosed(tickets: Ticket[]) {
  const active = tickets.filter((ticket) => ticket.status !== "Closed").length;
  const closed = tickets.filter((ticket) => ticket.status === "Closed").length;
  return { active, closed };
}
