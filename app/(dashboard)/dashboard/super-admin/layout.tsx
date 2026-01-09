import { requireRole } from "../services/auth.service";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Business logic moved to service
  await requireRole(1);

  return <>{children}</>;
}