"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Check, X, Eye, AlertCircle, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MerchantDetailsModalContent from "@/components/merchants/merchant-details-modal-content";
import { DateRangeFilter } from "@/components/ui/date-range-filter";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  setSearchTerm,
  setFilterStatus,
  setStartDate,
  setEndDate,
  setSelectedApproval,
  setRejectId,
  setRejectReason,
  setApproveId,
  removeApproval,
  Approval,
} from "@/lib/store/slices/approvalsSlice";
import { filterApprovals } from "../../utils/approvals.utils";

const Approvals: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const {
    approvals,
    searchTerm,
    filterStatus,
    startDate,
    endDate,
    selectedApproval,
    rejectId,
    rejectReason,
    approveId,
  } = useAppSelector((state) => state.approvals);

  useEffect(() => {
    setMounted(true);
  }, []);

  // All filtering logic moved to service
  const filteredApprovals = useMemo(() => {
    return filterApprovals(approvals, {
      searchQuery: searchTerm,
      statusFilter: filterStatus,
      startDate,
      endDate,
    });
  }, [approvals, searchTerm, filterStatus, startDate, endDate]);

  const handleRejectClick = (id: number) => {
    dispatch(setRejectId(id));
    dispatch(setRejectReason(""));
  };

  const confirmReject = () => {
    if (!rejectReason) return alert("Please provide a reason.");
    if (rejectId) {
      dispatch(removeApproval(rejectId));
    }
    dispatch(setRejectId(null));
  };

  const handleApproveClick = (id: number) => {
    dispatch(setApproveId(id));
  };

  const confirmApprove = () => {
    if (approveId) {
      dispatch(removeApproval(approveId));
    }
    dispatch(setApproveId(null));
  };

  return (
    <div className="space-y-8 relative">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Pending Approvals
  </h1>
  <p className="text-gray-500 dark:text-gray-400 mt-1">
    Review and approve new merchant onboardings.
  </p>
</div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-1 rounded-2xl">
        <div className="relative w-full sm:w-100">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <DateRangeFilter startDate={startDate} endDate={endDate} onStartDateChange={(date) => dispatch(setStartDate(date))} onEndDateChange={(date) => dispatch(setEndDate(date))} />
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={filterStatus}
              onChange={(e) => dispatch(setFilterStatus(e.target.value))}
              className="w-full sm:w-auto pl-10 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm text-gray-700 dark:text-gray-300 font-medium"
            >
              <option value="All">Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden dark:bg-gray-900/80">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Merchant Entity
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Type
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Applied Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Documents
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredApprovals.length > 0 ? (
              filteredApprovals.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs"
                >
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </div>
                    <button
                      onClick={() => dispatch(setSelectedApproval(item))}
                      className="text-[10px] text-blue-600 dark:text-blue-400 cursor-pointer hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Eye size={10} /> View Details
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {item.date}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {item.documentsList.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 max-w-[150px]">
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{doc.name}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${doc.status === "Verified" ? "bg-green-500" : doc.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                              }`}
                            title={doc.status}
                          ></span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApproveClick(item.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 text-[10px] font-bold transition-colors"
                      >
                        <Check size={12} /> Approve
                      </button>
                      <button
                        onClick={() => handleRejectClick(item.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-[10px] font-bold transition-colors"
                      >
                        <X size={12} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search size={24} className="text-gray-300 dark:text-gray-600" />
                    <p>No approvals found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {rejectId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-50 dark:bg-red-900/20 p-6 flex items-center gap-4 border-b border-red-100 dark:border-red-900/30">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-200">
                    Reject Application
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Please provide a reason for rejecting this merchant.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => dispatch(setRejectReason(e.target.value))}
                    className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                    placeholder="Reason for rejection..."
                  ></textarea>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => dispatch(setRejectId(null))}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReject}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-shadow"
                  >
                    Confirm Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Approve Confirmation Modal */}
      <AnimatePresence>
        {approveId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                <Check size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Approve Merchant?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                This will create an active account for the merchant and send
                them an invitation.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => dispatch(setApproveId(null))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  className="px-5 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/30 transition-shadow"
                >
                  Approve
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      {/* Details Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedApproval && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
                onClick={() => dispatch(setSelectedApproval(null))}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="bg-slate-50 dark:bg-gray-950 w-full max-w-4xl h-full shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MerchantDetailsModalContent
                    merchant={{
                      id: selectedApproval.id,
                      name: selectedApproval.name,
                      logo: selectedApproval.logo,
                      status:
                        selectedApproval.status === "Pending"
                          ? "Active"
                          : selectedApproval.status,
                      revenue: selectedApproval.revenue,
                      subscribers: selectedApproval.subscribers,
                      growth: selectedApproval.growth,
                      sector: selectedApproval.sector,
                      email: selectedApproval.email,
                      phone: selectedApproval.phone,
                      address: selectedApproval.address,
                      gst: selectedApproval.gst,
                      bank: selectedApproval.bank,
                      documents: selectedApproval.documentsList,
                    }}
                    onClose={() => dispatch(setSelectedApproval(null))}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Approvals;
