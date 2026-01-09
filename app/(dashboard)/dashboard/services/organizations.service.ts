"use server";

import { createClient } from "@/lib/supabase/server";

export interface Organization {
  id: string;
  name: string;
  cin?: string;
  company_pan?: string;
  status: 'active' | 'pending' | 'rejected';
  created_by: string;
}

/**
 * Get organization by creator ID
 */
export async function getOrganizationByCreator(userId: string): Promise<Organization | null> {
  const supabase = await createClient();
  const { data: org, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("created_by", userId)
    .single();
  
  if (error || !org) {
    return null;
  }
  
  return org as Organization;
}

/**
 * Get organization status
 */
export async function getOrganizationStatus(userId: string): Promise<'active' | 'pending' | 'rejected' | null> {
  const org = await getOrganizationByCreator(userId);
  return org?.status || null;
}
