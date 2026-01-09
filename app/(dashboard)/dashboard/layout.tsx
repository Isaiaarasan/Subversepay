import { DashboardLayout as DashboardLayoutComponent } from "./_components/layout/DashboardLayout";
import { requireAuth } from "./services/auth.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Business logic moved to service
  const user = await requireAuth();

  return (
    <DashboardLayoutComponent
      userName={
        (user.user_metadata as { full_name?: string })?.full_name ||
        user.email ||
        "User"
      }
      userEmail={user.email || "user@example.com"}
      avatarUrl={(user.user_metadata as { avatar_url?: string })?.avatar_url}
    >
      {children}
    </DashboardLayoutComponent>
  );
}