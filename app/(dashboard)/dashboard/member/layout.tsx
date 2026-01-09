import { requireRole } from "../services/auth.service";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  // Business logic moved to service
  await requireRole(4);

  return <>{children}</>;
}