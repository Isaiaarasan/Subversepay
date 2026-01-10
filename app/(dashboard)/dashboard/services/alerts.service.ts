"use server";

import { createClient } from "@/lib/supabase/server";

export type AlertType = "Critical" | "High" | "Medium" | "Low" | "Info";

export interface Alert {
  id: string;
  type: AlertType;
  category: string;
  message: string;
  source: string;
  time: string;
}


export async function getAlerts(
  userId: string,
  filterType?: AlertType | "All"
): Promise<Alert[]> {
  const supabase = await createClient();
  

  
  return [];
}
