import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "../../services/auth.service";
import { getOrganizationByCreator } from "../../services/organizations.service";

export default async function AdminPage() {
  // Business logic moved to services
  const user = await requireAuth();
  const org = await getOrganizationByCreator(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Organization Admin</h2>
        {org?.status === 'active' ? (
          <Badge variant="default" className="bg-green-600">Active</Badge>
        ) : (
          <Badge variant="secondary">Verified</Badge>
        )}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{org?.name || "Your Organization"}</CardTitle>
            <CardDescription>
              CIN: {org?.cin} | PAN: {org?.company_pan}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your organization settings, invite team leads, and oversee operations here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}