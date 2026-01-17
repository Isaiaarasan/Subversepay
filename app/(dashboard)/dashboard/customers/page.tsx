"use client";

import React from "react";
import { Search, Filter, Download, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectFilteredCustomers } from "@/lib/store/slices/customersSlice";
import CustomersTable from "../_components/CustomersTable";

const Customers: React.FC = () => {
    // Use the memoized selector for efficiency
    // If a search query existed, we would use selectFilteredCustomers
    // For now, we defaults to all or filtered if query is set in slice
    const customers = useAppSelector(selectFilteredCustomers);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers List</h1>
                    <p className="text-gray-500">End-users subscribed to merchants.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-700">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            <CustomersTable customers={customers} />
        </div>
    );
};

export default Customers;
