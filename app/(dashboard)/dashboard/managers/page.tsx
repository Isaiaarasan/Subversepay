"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Download, UserCheck, Plus } from "lucide-react";
import ManagersTable from "../_components/ManagersTable";
import { SearchInput } from "../_components/SearchInput";
import { StatusFilterDropdown } from "../_components/StatusFilterDropdown";
import { LoadingSpinner } from "../_components/LoadingSpinner";

const Managers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    const managers = [
        { id: 1, name: "John Doe", email: "john@subverse.ai", role: "Ops Manager", lastActive: "2 mins ago", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@subverse.ai", role: "Support Lead", lastActive: "1 hour ago", status: "Active" },
        { id: 3, name: "Mike Johnson", email: "mike@subverse.ai", role: "Finance Manager", lastActive: "1 day ago", status: "Inactive" },
        { id: 4, name: "Sarah Wilson", email: "sarah@subverse.ai", role: "HR Manager", lastActive: "30 mins ago", status: "Active" },
        { id: 5, name: "David Brown", email: "david@subverse.ai", role: "Tech Lead", lastActive: "5 mins ago", status: "Active" },
    ];

    const filteredManagers = useMemo(() => {
        let filtered = managers;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(manager =>
                manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                manager.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(manager => manager.status === statusFilter);
        }

        return filtered;
    }, [managers, searchQuery, statusFilter]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Managers List</h1>
                    <p className="text-gray-500">Platform  .</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsLoading(!isLoading)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 shadow-md"
                    >
                        {isLoading ? "Stop Loading" : "Show Loading"}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md">
                        <Plus className="w-4 h-4" />
                        Add Manager
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search managers by name, email, or role..."
                        className="w-full sm:w-80"
                    />
                    <StatusFilterDropdown
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { value: "all", label: "All Status" },
                            { value: "Active", label: "Active" },
                            { value: "Inactive", label: "Inactive" },
                        ]}
                    />
                </div>
                <div className="text-sm text-gray-500">
                    {filteredManagers.length} of {managers.length} managers
                </div>
            </div>

            {isLoading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <LoadingSpinner size="lg" />
                    <p className="text-center text-gray-500 mt-4">Loading managers...</p>
                </div>
            ) : (
                <ManagersTable managers={filteredManagers} />
            )}
        </div>
    );
};

export default Managers;