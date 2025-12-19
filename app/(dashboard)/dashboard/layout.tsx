import Link from "next/link";
import { User, LayoutDashboard, Settings, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth-wrapper";
import Header from "@/components/layout/header";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = await createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  const handleSignOut = async () => {
    "use server";
    const { createClient } = await import("@/lib/supabase/server");
    const sb = await createClient();
    await sb.auth.signOut();
    const { redirect } = await import("next/navigation");
    redirect("/auth/login");
  };

  return (
    <AuthWrapper>
      <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col bg-[#0f172a] text-white shadow-2xl overflow-hidden border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-xl tracking-tight">
          Subverse Pay
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/merchants" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <Store className="h-4 w-4" />
            <span>Merchants</span>
          </Link>
          <Link href="/dashboard/approvals" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <CheckCircle className="h-4 w-4" />
            <span>Approvals</span>
          </Link>
          <Link href="/dashboard/analytics" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
          <Link href="/dashboard/alerts" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </Link>
          <Link href="/dashboard/settlements" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <CreditCard className="h-4 w-4" />
            <span>Settlements</span>
          </Link>
          <Link href="/dashboard/system-health" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <Activity className="h-4 w-4" />
            <span>System Health</span>
          </Link>
          <Link href="/dashboard/tickets" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <Ticket className="h-4 w-4" />
            <span>Tickets</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          {/* <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            
          </div> */}
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <form action={handleSignOut}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-slate-200 hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <Header
          userName={
            (user?.user_metadata as { full_name?: string })?.full_name ||
            user?.email ||
            "User"
          }
          userEmail={user?.email || "user@example.com"}
          avatarUrl={(user?.user_metadata as { avatar_url?: string })?.avatar_url}
        />
        <main className="p-8">{children}</main>
      </div>
    </div>
    </AuthWrapper>
  );
}