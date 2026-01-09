import { requireRole } from "../services/auth.service";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Business logic moved to service
  await requireRole(2);

  return <>{children}</>;
}