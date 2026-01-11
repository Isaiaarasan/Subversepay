"use server";

import { createClient } from "@/lib/supabase/server";

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


export async function getApprovals(
  userId: string,
  filters?: ApprovalFilters
): Promise<Approval[]> {
  const supabase = await createClient();
  
 
  
  return [];
}
