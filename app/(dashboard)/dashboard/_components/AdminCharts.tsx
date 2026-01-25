"use client";

import React from "react";
import ComparisonGraph from "@/components/charts/comparison-graph";
import TicketOverlayGraph from "@/components/charts/ticket-overlay-graph";
import CollectionTrendBarGraph from "@/components/charts/collection-trend-bar-graph";
import CollectionBreakdownGraph from "@/components/charts/collection-breakdown-graph";

export function AdminCharts() {
  return (
    <>
      {/* Graph Row 1: Collection Trend & Collection Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <CollectionTrendBarGraph />
        </div>
        <div className="lg:col-span-1">
          <CollectionBreakdownGraph />
        </div>
      </div>

      {/* Graph Row 2: Payment Volume Comparison & Tickets Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <ComparisonGraph />
        </div>
        <div className="lg:col-span-1">
          <TicketOverlayGraph />
        </div>
      </div>
    </>
  );
}