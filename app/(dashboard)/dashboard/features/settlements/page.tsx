"use client";

import React, { useMemo } from "react";
import { Download, Search, Filter } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/date-range-filter";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSearchQuery, setStatusFilter, setStartDate, setEndDate, SettlementStatusFilter } from "@/lib/store/slices/settlementsSlice";
import { filterSettlements } from "../../utils/settlements.utils";

const Settlements: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
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

  const paginatedSettlements = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSettlements.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSettlements, currentPage]);

  return (
    <div className="space-y-8">
      <div className="relative z-30 p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settlements
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage and track merchant payouts.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex flex-col sm:flex-row gap-2 items-stretch h-full">

              {/* Search */}
              <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300">
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-text w-full group-focus-within:bg-gray-50 dark:group-focus-within:bg-gray-800/50">
                  <div className="flex flex-col justify-center w-full">
                    {/* <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">
                      Search ID/Merchant
                    </span> */}
                    <div className="flex items-center gap-2">
                      <Search className="text-blue-500 shrink-0" size={14} />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        className="bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-full min-w-[140px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer z-20">
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[130px]">
                  <div className="flex flex-col justify-center w-full">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">
                      Filter Status
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Filter size={14} className="text-purple-500" />
                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                          {statusFilter === "all" ? "All Status" : statusFilter}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 z-10" />
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                  {["all", "Completed", "Processing", "Failed"].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        dispatch(setStatusFilter(status as SettlementStatusFilter))
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === status
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      {status === "all" ? "All Settlements" : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export */}
              <button className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300">
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent transition-colors w-full h-full">
                  <div className="flex flex-col justify-center w-full h-full">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">
                      Action
                    </span>
                    <div className="flex items-center gap-2">
                      <Download size={14} className="text-emerald-500" />
                      <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                        Export CSV
                      </span>
                    </div>
                  </div>
                </div>
              </button>

            </div>
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
            {paginatedSettlements.map((item) => (
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

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="text-gray-500 dark:text-gray-400 text-xs">
            Showing <span className="font-bold text-gray-900 dark:text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredSettlements.length)}-{Math.min(currentPage * itemsPerPage, filteredSettlements.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredSettlements.length}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredSettlements.length / itemsPerPage), p + 1))}
              disabled={currentPage >= Math.ceil(filteredSettlements.length / itemsPerPage)}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlements;
