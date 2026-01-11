"use client";

import React from "react";
import { useParams } from "next/navigation";

// Feature mapping for super-admin
const featureComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  merchants: React.lazy(() => import("../../features/merchants/page")),
  approvals: React.lazy(() => import("../../features/approvals/page")),
  analytics: React.lazy(() => import("../../features/analytics/page")),
  alerts: React.lazy(() => import("../../features/alerts/page")),
  "system-health": React.lazy(() => import("../../features/system-health/page")),
  tickets: React.lazy(() => import("../../features/tickets/page")),
  settlements: React.lazy(() => import("../../features/settlements/page")),
};

const SuperAdminFeaturePage: React.FC = () => {
  const params = useParams();
  const feature = params.feature as string;

  const FeatureComponent = featureComponents[feature];

  if (!FeatureComponent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Feature Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested feature is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      }
    >
      <FeatureComponent />
    </React.Suspense>
  );
};

export default SuperAdminFeaturePage;