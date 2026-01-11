import React from "react";
import Merchants from "../../features/merchants/page";
import Approvals from "../../features/approvals/page";
import Analytics from "../../features/analytics/page";
import Alerts from "../../features/alerts/page";
import SystemHealth from "../../features/system-health/page";
import Tickets from "../../features/tickets/page";
import Settlements from "../../features/settlements/page";

// Feature mapping for super-admin
const featureComponents: Record<string, React.ComponentType<any>> = {
  merchants: Merchants,
  approvals: Approvals,
  analytics: Analytics,
  alerts: Alerts,
  "system-health": SystemHealth as any, // Cast as any because Async Server Components typically don't match React.ComponentType perfectly in TS yet
  tickets: Tickets,
  settlements: Settlements,
};

export default async function SuperAdminFeaturePage(props: { params: Promise<{ feature: string }> }) {
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