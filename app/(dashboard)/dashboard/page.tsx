import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect("/auth/login");

  // Fetch Role
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  if (!roleData) return <div>No role assigned. Contact support.</div>;

  // Redirect based on ID
  switch (roleData.role_id) {
    case 1: redirect("/dashboard/super-admin");
    case 2: redirect("/dashboard/admin");
    case 3: redirect("/dashboard/team-lead");
    case 4: redirect("/dashboard/member");
    default: redirect("/unauthorized");
  }
}