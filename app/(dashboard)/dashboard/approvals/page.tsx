"use client";

import React, { useState } from "react";
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
}

const Approvals: React.FC = () => {
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
            bank: { name: "Pending Bank", acc: "Pending", ifsc: "Pending" }
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
            bank: { name: "Pending", acc: "Pending", ifsc: "Pending" }
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
            bank: { name: "Pending", acc: "Pending", ifsc: "Pending" }
        },
    ];

    const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
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
                <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
                <p className="text-gray-500">Review and approve new merchant onboardings.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/60 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Merchant Entity</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Applied Date</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Documents</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {approvals.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors text-xs">
                                <td className="px-4 py-3">
                                    <div className="font-bold text-gray-900">{item.name}</div>
                                    <button
                                        onClick={() => setSelectedApproval(item)}
                                        className="text-[10px] text-blue-600 cursor-pointer hover:underline flex items-center gap-1 mt-0.5"
                                    >
                                        <Eye size={10} /> View Details
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{item.type}</td>
                                <td className="px-4 py-3 text-gray-500">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.documents === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.documents}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleApproveClick(item.id)} className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 text-[10px] font-bold transition-colors">
                                            <Check size={12} /> Approve
                                        </button>
                                        <button onClick={() => handleRejectClick(item.id)} className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100 text-[10px] font-bold transition-colors">
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
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Application</h3>
                            <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejecting this merchant.</p>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 outline-none resize-none mb-4"
                                placeholder="Reason for rejection..."
                            ></textarea>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setRejectId(null)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button onClick={confirmReject} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg shadow-red-500/30">Confirm Reject</button>
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
                            className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Check size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Approve Merchant?</h3>
                            <p className="text-sm text-gray-500 mb-6">This will create an active account for the merchant and send them an invitation.</p>
                            <div className="flex justify-center gap-3">
                                <button onClick={() => setApproveId(null)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button onClick={confirmApprove} className="px-5 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/30">Approve</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedApproval && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedApproval(null)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-slate-50 w-full max-w-4xl h-full shadow-2xl overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <MerchantDetailsModalContent 
                                merchant={{
                                    id: selectedApproval.id,
                                    name: selectedApproval.name,
                                    logo: selectedApproval.logo,
                                    status: selectedApproval.status === 'Pending' ? 'Active' : selectedApproval.status,
                                    revenue: selectedApproval.revenue,
                                    subscribers: selectedApproval.subscribers,
                                    growth: selectedApproval.growth,
                                    sector: selectedApproval.sector,
                                    email: selectedApproval.email,
                                    phone: selectedApproval.phone,
                                    address: selectedApproval.address,
                                    gst: selectedApproval.gst,
                                    bank: selectedApproval.bank,
                                }}
                                onClose={() => setSelectedApproval(null)} 
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Approvals;