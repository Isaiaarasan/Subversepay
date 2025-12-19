import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 p-4">
      <ShieldAlert className="h-20 w-20 text-red-600" />
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900">Access Denied</h1>
        <p className="text-slate-600 max-w-md">
          You do not have the required permissions to access this dashboard.
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link href="/auth/login">
          <Button>Back to Login</Button>
        </Link>
      </div>
    </div>
  );
}