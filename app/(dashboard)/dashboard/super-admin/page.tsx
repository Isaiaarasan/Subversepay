import React from "react";
import SuperAdminClient from "./super-admin-client";
import { getOverviewMetrics, getPendingApprovals } from "../services/overview.service";

export default async function SuperAdminPage() {
  // Simulate loading delay for the premium loading screen experience
  await new Promise((resolve) => setTimeout(resolve, 800));

  const metrics = await getOverviewMetrics();
  const pendingApprovals = await getPendingApprovals();

  return (
    <SuperAdminClient
      initialMetrics={metrics}
      initialPendingApprovals={pendingApprovals}
    />
  );
}