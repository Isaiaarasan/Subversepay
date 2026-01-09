import Header from "@/components/layout/header";

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  avatarUrl?: string;
}

export function DashboardHeader({ userName, userEmail, avatarUrl }: DashboardHeaderProps) {
  return (
    <Header userName={userName} userEmail={userEmail} avatarUrl={avatarUrl} />
  );
}
