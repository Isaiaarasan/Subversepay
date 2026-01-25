import React from "react";
import Tickets from "../../super-admin/features/tickets/page";
import RevenueForecast from "../../super-admin/features/revenue-forecast/page";
import AdminAnalyticsPage from "../analytics/page";
import PerformancePage from "../performance/page";

// Feature mapping for admin
const featureComponents: Record<string, React.ComponentType<any>> = {
  tickets: Tickets,
  "revenue-forecast": RevenueForecast,
  analytics: AdminAnalyticsPage,
  performance: PerformancePage,
};

export default async function AdminFeaturePage(props: { params: Promise<{ feature: string }> }) {
  const params = await props.params;
  const feature = params.feature;

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
    <FeatureComponent />
  );
}