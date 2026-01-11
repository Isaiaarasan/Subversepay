import AuthWrapper from "@/components/auth-wrapper";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardContent } from "./DashboardContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  avatarUrl?: string;
}

export function DashboardLayout({
  children,
  userName,
  userEmail,
  avatarUrl,
}: DashboardLayoutProps) {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen bg-dashboard">
        <DashboardSidebar />
        <div className="flex-1 ml-64">
          <DashboardHeader userName={userName} userEmail={userEmail} avatarUrl={avatarUrl} />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </div>
    </AuthWrapper>
  );
}
