import React from 'react';
import ActiveMerchantsTable from '@/components/merchants/active-merchants-table';

const Merchants: React.FC = () => {
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

export default Merchants;
