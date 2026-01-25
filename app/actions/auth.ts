"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { AUTH_ROUTES } from "@/lib/constants/auth-routes";

export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect(AUTH_ROUTES.LOGIN);
}
