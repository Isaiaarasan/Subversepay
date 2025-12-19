import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: role } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  if (role?.role_id !== 2) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}