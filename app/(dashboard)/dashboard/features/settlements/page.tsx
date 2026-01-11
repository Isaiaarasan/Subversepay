"use client";

import React, { useMemo } from "react";
import { Download, Search, Filter } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/date-range-filter";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSearchQuery, setStatusFilter, setStartDate, setEndDate } from "@/lib/store/slices/settlementsSlice";
import { filterSettlements } from "../../utils/settlements.utils";

const Settlements: React.FC = () => {
    const dispatch = useAppDispatch();
    const { settlements, searchQuery, statusFilter, startDate, endDate } = useAppSelector((state) => state.settlements);

    // All filtering logic moved to service
    const filteredSettlements = useMemo(() => {
        return filterSettlements(settlements, {
            searchQuery,
            statusFilter,
            startDate,
            endDate,
        });
    }, [settlements, searchQuery, statusFilter, startDate, endDate]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settlements</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and track merchant payouts.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    {/* <DateRangeFilter startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} /> */}
                    <div className="flex gap-2">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search ID, merchant..."
                                value={searchQuery}
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        </div>
                        <div className="relative group main-dropdown">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
                                <Filter size={18} />
                                <span>{statusFilter === 'all' ? 'Status' : statusFilter}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-20">
                                {['all', 'Completed', 'Processing', 'Failed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => dispatch(setStatusFilter(status))}
                                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${statusFilter === status ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        {status === 'all' ? 'All Settlements' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden dark:bg-gray-900/80">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Txn ID</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">From</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">To</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bank</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {filteredSettlements.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs">
                                <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 font-bold">{item.id}</td>
                                <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{item.from}</td>
                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-200">{item.to}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700 dark:text-gray-300">
                                            {item.bankLogo}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-bold text-gray-800 dark:text-gray-200">{item.amount}</td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${item.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30' :
                                        item.status === 'Processing' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30' :
                                            'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-900/30'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Settlements;
