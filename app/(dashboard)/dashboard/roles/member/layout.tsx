import { requireRole } from "../../services/auth.service";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {

  await requireRole(4);

  return <>{children}</>;
}