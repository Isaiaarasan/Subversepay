"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { ROLES } from "@/lib/constants/roles";
import { AUTH_ROUTES } from "@/lib/constants/auth-routes";

export type UserRole = number;

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}


export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}


export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = await createClient();
  const { data: role, error } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .single();

  if (error || !role) {
    return null;
  }

  return role.role_id as UserRole;
}

/**
 * Ensure user is authenticated, redirect if not
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  return user;
}

/**
 * Ensure user has a specific role, redirect if not
 */
export async function requireRole(requiredRoleId: UserRole): Promise<AuthUser> {
  const user = await requireAuth();
  const roleId = await getUserRole(user.id);

  if (roleId !== requiredRoleId) {
    redirect(AUTH_ROUTES.UNAUTHORIZED);
  }

  return user;
}

/**
 * Check if user has a specific role (without redirecting)
 */
export async function hasRole(userId: string, roleId: UserRole): Promise<boolean> {
  const userRole = await getUserRole(userId);
  return userRole === roleId;
}
