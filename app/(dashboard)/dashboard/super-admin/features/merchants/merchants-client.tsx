"use client";

import React, { useState } from 'react';
import ActiveMerchantsTable from '@/components/merchants/active-merchants-table';
import { Merchant } from '@/app/(dashboard)/dashboard/services/merchants.service';

interface MerchantsClientProps {
    initialMerchants: Merchant[];
}

const MerchantsClient: React.FC<MerchantsClientProps> = ({ initialMerchants }) => {
    // In a real app, passing initialMerchants might hydrate the table or store
    // For now, ActiveMerchantsTable fetches its own data or uses mock data.
    // If we want the loading screen to appear, the SERVER component must wait.
    // This client component is just the interactive shell.

    return (
        <div className="space-y-8 pb-8">
            {/* Page Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Merchants Management
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Monitor and manage all merchant accounts and activities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Active Merchants Table */}
            <div className="rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none overflow-hidden">
                <ActiveMerchantsTable />
            </div>
        </div>
    );
};

export default MerchantsClient;
