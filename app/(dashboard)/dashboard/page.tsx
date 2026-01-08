"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './_services/auth.service';

export default function DashboardRouter() {
  const router = useRouter();
  const { role, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (!role) {
        router.push('/unauthorized');
        return;
      }

      // Redirect to role-specific dashboard
      router.replace(`/dashboard/${role}`);
    }
  }, [role, isLoading, isAuthenticated, router]);

  // Show loading state while determining role
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render anything while redirecting
  return null;
}