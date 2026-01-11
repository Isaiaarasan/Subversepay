import React from 'react';
import ActiveMerchantsTable from '@/components/merchants/active-merchants-table';

const Merchants: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Merchants Management</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor and manage all merchant accounts and activities.</p>
                </div>
            </div>

            <ActiveMerchantsTable />
        </div>
    );
};

export default Merchants;
