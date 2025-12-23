"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, X, Eye, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MerchantDetailsModalContent from "@/components/merchants/merchant-details-modal-content";

interface Approval {
  id: number;
  name: string;
  type: string;
  date: string;
  documents: string;
  status: string;
  sector: string;
  subscribers: number;
  revenue: string;
  growth: number;
  logo: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  bank: {
    name: string;
    acc: string;
    ifsc: string;
  };
  documentsList: {
    name: string;
    status: string;
    url?: string;
    type?: 'image' | 'pdf';
  }[];
}

const Approvals: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock Data
  const approvals: Approval[] = [
    {
      id: 1,
      name: "Urban Fibernet Pvt Ltd",
      type: "ISP",
      date: "2024-10-24",
      documents: "Verified",
      status: "Pending",
      sector: "Internet",
      subscribers: 0,
      revenue: "₹0",
      growth: 0,
      logo: "UF",
      email: "onboarding@urbanfiber.net",
      phone: "+91 99887 76655",
      address: "Pending Address Verification",
      gst: "Pending GST",
      bank: { name: "Pending Bank", acc: "Pending", ifsc: "Pending" },
      documentsList: [
        { name: "GST Certificate", status: "Verified", url: "data:image/png;base64,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", type: "image" },
        { name: "PAN Card", status: "Verified", url: "https://placehold.co/600x400/png", type: "image" },
        { name: "Cancelled Cheque", status: "Verified", url: "https://placehold.co/600x400/png", type: "image" }
      ]
    },
    {
      id: 2,
      name: "SkyHigh Travels",
      type: "Travel Agency",
      date: "2024-10-23",
      documents: "Pending",
      status: "Pending",
      sector: "Travel",
      subscribers: 0,
      revenue: "₹0",
      growth: 0,
      logo: "SH",
      email: "admin@skyhigh.com",
      phone: "+91 88776 65544",
      address: "Pending Address",
      gst: "Pending",
      bank: { name: "Pending", acc: "Pending", ifsc: "Pending" },
      documentsList: [
        { name: "GST Certificate", status: "Pending", url: "https://placehold.co/600x400/png", type: "image" },
        { name: "PAN Card", status: "Verified", url: "https://placehold.co/600x400/png", type: "image" },
        { name: "Cancelled Cheque", status: "Pending", url: "https://placehold.co/600x400/png", type: "image" }
      ]
    },
    {
      id: 3,
      name: "Fresh Mart Chain",
      type: "Retail",
      date: "2024-10-23",
      documents: "Verified",
      status: "Rejected",
      sector: "Retail",
      subscribers: 0,
      revenue: "₹0",
      growth: 0,
      logo: "FM",
      email: "contact@freshmart.com",
      phone: "+91 77665 54433",
      address: "Pending",
      gst: "Pending",
      bank: { name: "Pending", acc: "Pending", ifsc: "Pending" },
      documentsList: [
        { name: "GST Certificate", status: "Rejected" },
        { name: "PAN Card", status: "Verified" },
        { name: "Cancelled Cheque", status: "Verified" }
      ]
    },
  ];

  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(
    null
  );
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [approveId, setApproveId] = useState<number | null>(null);

  const handleRejectClick = (id: number) => {
    setRejectId(id);
    setRejectReason("");
  };

  const confirmReject = () => {
    if (!rejectReason) return alert("Please provide a reason.");
    console.log("Rejected", rejectId, rejectReason);
    setRejectId(null);
  };

  const handleApproveClick = (id: number) => {
    setApproveId(id);
  };

  const confirmApprove = () => {
    console.log("Approved", approveId);
    setApproveId(null);
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pending Approvals
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review and approve new merchant onboardings.
        </p>
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
            {approvals.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs"
              >
                <td className="px-4 py-3">
                  <div className="font-bold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </div>
                  <button
                    onClick={() => setSelectedApproval(item)}
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
            ))}
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
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                    placeholder="Reason for rejection..."
                  ></textarea>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setRejectId(null)}
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
                  onClick={() => setApproveId(null)}
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
                onClick={() => setSelectedApproval(null)}
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
                    onClose={() => setSelectedApproval(null)}
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
