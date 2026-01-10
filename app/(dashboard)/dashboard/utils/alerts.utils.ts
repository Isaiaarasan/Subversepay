/**
 * Client-side alert utilities
 * No "use server" directive - these are client-side utilities
 */

export type AlertType = "Critical" | "High" | "Medium" | "Low" | "Info";

export interface Alert {
  id: number;
  type: AlertType;
  category: string;
  message: string;
  source: string;
  time: string;
}

/**
 * Filter alerts client-side (for client components that already have data)
 * All filtering logic is centralized here
 */
export function filterAlerts(
  alerts: Alert[],
  filterType?: AlertType | "All"
): Alert[] {
  if (!filterType || filterType === "All") {
    return alerts;
  }
  
  return alerts.filter((alert) => alert.type === filterType);
}
