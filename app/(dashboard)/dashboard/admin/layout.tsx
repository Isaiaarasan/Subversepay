import { requireRole } from "../services/auth.service";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  await requireRole(2);

  return <>{children}</>;
}