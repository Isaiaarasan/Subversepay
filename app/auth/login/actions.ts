"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) return { error: "Invalid inputs" };

  const { email, password } = validated.data;

  // 1. Sign In
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Invalid email or password" };
  }

  // 2. Check Organization Status & Fetch Role in Parallel
  const [orgResponse, roleResponse] = await Promise.all([
    supabase.from("organizations").select("status").eq("created_by", data.user.id).single(),
    supabase.from("user_roles").select("role_id").eq("user_id", data.user.id).single()
  ]);

  // -- Organization Status Check --
  const org = orgResponse.data;
  if (org && org.status === 'pending') {
    await supabase.auth.signOut();
    return { 
      error: "Your Organization is under verification. Please come back later.",
      isPendingOrg: true 
    };
  }
  
  if (org && org.status === 'rejected') {
    await supabase.auth.signOut();
    return { error: "Your Organization application was rejected." };
  }

  // -- Role Based Redirection --
  const roleId = roleResponse.data?.role_id;

  if (!roleId) {
    return { error: "No role assigned to this user." };
  }

  switch (roleId) {
    case 1:
      redirect("/dashboard/super-admin");
    case 2:
      redirect("/dashboard/admin");
    case 3:
      redirect("/dashboard/team-lead");
    case 4:
      redirect("/dashboard/member");
    default:
      redirect("/dashboard"); 
  }
}