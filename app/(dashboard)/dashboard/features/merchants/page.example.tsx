import React from "react";
import { Store } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMerchants, Merchant } from "../../services/merchants.service";

/**
 * Merchants Page
 * Displays all merchants in a table format
 * NO business logic - all logic is in services
 */
export default async function MerchantsPage() {
    // Fetch data via service
    const merchants = await getMerchants();

    // Define table columns
    const columns: Column<Merchant>[] = [
        {
            key: "name",
            header: "Merchant Name",
            render: (merchant) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {merchant.logo}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{merchant.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{merchant.sector}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "subscribers",
            header: "Subscribers",
            render: (merchant) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {merchant.subscribers.toLocaleString()}
                </span>
            ),
        },
        {
            key: "tpv",
            header: "TPV",
            render: (merchant) => (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{merchant.tpv}</span>
            ),
        },
        {
            key: "revenue",
            header: "Revenue",
            render: (merchant) => (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{merchant.revenue}</span>
            ),
        },
        {
            key: "growth",
            header: "Growth",
            render: (merchant) => (
                <span
                    className={`text-sm font-medium ${merchant.growth > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                >
                    {merchant.growth > 0 ? "+" : ""}
                    {merchant.growth}%
                </span>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (merchant) => (
                <Badge variant={merchant.status === "Active" ? "default" : "secondary"}>
                    {merchant.status}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <PageHeader
                title="Merchants"
                description="Manage and monitor all platform merchants."
                icon={Store}
                actions={
                    <>
                        <SearchFilter />
                        <StatusFilter />
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Add Merchant
                        </Button>
                    </>
                }
            />

            {/* Merchants Table */}
            <DataTable
                columns={columns}
                data={merchants}
                keyExtractor={(merchant) => merchant.id.toString()}
                onRowClick={(merchant) => {
                    // Navigate to merchant details
                    console.log("Clicked merchant:", merchant.id);
                }}
                emptyMessage="No merchants found"
            />
        </div>
    );
}

// Client components for interactivity
function SearchFilter() {
    "use client";
    const [search, setSearch] = React.useState("");

    return (
        <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
    );
}

function StatusFilter() {
    "use client";
    const [status, setStatus] = React.useState("all");

    return (
        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
    );
}
