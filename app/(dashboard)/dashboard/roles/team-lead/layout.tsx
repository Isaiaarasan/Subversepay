import { requireRole } from "../../services/auth.service";

export default async function TeamLeadLayout({ children }: { children: React.ReactNode }) {
  // Business logic moved to service
  await requireRole(3);

  return <>{children}</>;
}