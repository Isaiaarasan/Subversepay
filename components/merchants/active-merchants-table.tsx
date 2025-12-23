"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    MoreHorizontal,
    AlertCircle,
    CheckCircle,
    Eye,
    Power,
    Ban,
    Search,
    Filter,
    Download,
    TrendingUp,
    TrendingDown,
    UserCheck,
    X,
} from 'lucide-react';
import Link from 'next/link';
import MerchantDetailsModalContent from './merchant-details-modal-content';

interface Merchant {
    id: number;
    name: string;
    sector: string;
    subscribers: number;
    tpv: string;
    revenue: string;
    growth: number;
    status: string;
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

const ActiveMerchantsTable: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock Data
    const [merchants, setMerchants] = useState<Merchant[]>([
        {
            id: 1,
            name: 'SpeedNet ISP',
            sector: 'Internet',
            subscribers: 12500,
            tpv: '₹3.5 Cr',
            revenue: '₹12.5 L',
            growth: 12.5,
            status: 'Active',
            logo: 'SN',
            email: "contact@speednet.com",
            phone: "+91 98765 43210",
            address: "123, Tech Park, Bangalore",
            gst: "29ABCDE1234F1Z5",
            bank: { name: "HDFC Bank", acc: "1234567890", ifsc: "HDFC0001234" }
        },
        {
            id: 2,
            name: 'CableNet Sols',
            sector: 'Cable',
            subscribers: 8200,
            tpv: '₹2.1 Cr',
            revenue: '₹8.2 L',
            growth: -2.4,
            status: 'Active',
            logo: 'CN',
            email: "support@cablenet.in",
            phone: "+91 98765 11111",
            address: "45, Media Street, Mumbai",
            gst: "27AAAAA0000A1Z5",
            bank: { name: "ICICI Bank", acc: "0987654321", ifsc: "ICIC0001234" }
        },
        {
            id: 3,
            name: 'FitZone Gyms',
            sector: 'Fitness',
            subscribers: 450,
            tpv: '₹1.2 Cr',
            revenue: '₹3.5 L',
            growth: 5.8,
            status: 'Active',
            logo: 'FZ',
            email: "info@fitzone.com",
            phone: "+91 98765 22222",
            address: "78, Health Avenue, Delhi",
            gst: "07BBBBB1111B1Z5",
            bank: { name: "SBI", acc: "1122334455", ifsc: "SBIN0001234" }
        },
        {
            id: 4,
            name: 'Urban Fibernet',
            sector: 'Internet',
            subscribers: 6800,
            tpv: '₹1.8 Cr',
            revenue: '₹6.1 L',
            growth: 8.1,
            status: 'Active',
            logo: 'UF',
            email: "hello@urbanfiber.net",
            phone: "+91 98765 33333",
            address: "90, Cyber City, Gurgaon",
            gst: "06CCCCC2222C1Z5",
            bank: { name: "Axis Bank", acc: "6789012345", ifsc: "UTIB0001234" }
        },
        {
            id: 5,
            name: 'Metro Cable',
            sector: 'Cable',
            subscribers: 3200,
            tpv: '₹95 L',
            revenue: '₹2.8 L',
            growth: 0.5,
            status: 'Inactive',
            logo: 'MC',
            email: "contact@metrocable.com",
            phone: "+91 98765 44444",
            address: "10, Film City, Noida",
            gst: "09DDDDD3333D1Z5",
            bank: { name: "PNB", acc: "5544332211", ifsc: "PUNB0001234" }
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
    const [deactivateId, setDeactivateId] = useState<number | null>(null);
    const [deactivateReason, setDeactivateReason] = useState("");

    const filteredMerchants = merchants.filter(merchant => {
        const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            merchant.sector.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDeactivateClick = (id: number) => {
        setDeactivateId(id);
        setDeactivateReason("");
    };

    const confirmDeactivate = () => {
        if (!deactivateReason) return alert("Please provide a reason.");
        setMerchants(merchants.map(m => m.id === deactivateId ? { ...m, status: 'Inactive' } : m));
        setDeactivateId(null);
    };

    const handleActivate = (id: number) => {
        if (window.confirm("Are you sure you want to activate this merchant?")) {
            setMerchants(merchants.map(m => m.id === id ? { ...m, status: 'Active' } : m));
        }
    };

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="relative z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900/80 backdrop-blur-xl p-1 rounded-xl border border-transparent dark:border-gray-800">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search merchants, sectors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-xs transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Link href="/dashboard/approvals" className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xs font-medium shadow-sm">
                        <UserCheck size={14} />
                        <span>Approvals</span>
                    </Link>
                    <div className="relative group main-dropdown">
                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xs font-medium shadow-sm w-full">
                            <Filter size={14} />
                            <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-20">
                            {['all', 'Active', 'Inactive'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${statusFilter === status ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {status === 'all' ? 'All Merchants' : status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all text-xs font-medium">
                        <Download size={14} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Merchant Name</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subscribers</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">TPV</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Growth</th>
                                <th className="px-6 py-4 text-center text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredMerchants.map((merchant, index) => (
                                <tr
                                    key={merchant.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="px-6 py-3 cursor-pointer" onClick={() => setSelectedMerchant(merchant)}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/30 text-[10px]">
                                                {merchant.logo}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-gray-100 text-xs hover:text-blue-600 transition-colors">{merchant.name}</div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400">#{merchant.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {merchant.sector}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right text-xs text-gray-600 dark:text-gray-400 font-medium">{merchant.subscribers.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-right text-xs font-bold text-gray-900 dark:text-gray-100">{merchant.tpv}</td>
                                    <td className="px-6 py-3 text-right text-xs font-bold text-emerald-600 dark:text-emerald-400">{merchant.revenue}</td>
                                    <td className="px-6 py-3 text-right">
                                        <div className={`inline-flex items-center gap-1 font-bold text-[10px] ${merchant.growth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {merchant.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {Math.abs(merchant.growth)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${merchant.status === 'Active'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                            }`}>
                                            {merchant.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setSelectedMerchant(merchant)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded bg-transparent transition-colors">
                                                <Eye size={14} />
                                            </button>
                                            {merchant.status === 'Active' ? (
                                                <button onClick={() => handleDeactivateClick(merchant.id)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded bg-transparent transition-colors">
                                                    <Ban size={14} />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleActivate(merchant.id)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded bg-transparent transition-colors">
                                                    <Power size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Showing <span className="font-bold text-gray-900 dark:text-white">1-{filteredMerchants.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredMerchants.length}</span></div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Merchant Details Modal */}
            {/* Merchant Details Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedMerchant && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-end bg-black/60 backdrop-blur-md"
                            onClick={() => setSelectedMerchant(null)}
                        >
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween", duration: 0.3 }}
                                className="bg-white dark:bg-gray-950 w-full max-w-2xl h-full shadow-2xl overflow-y-auto border-l border-gray-100 dark:border-gray-800"
                                onClick={e => e.stopPropagation()}
                            >
                                <MerchantDetailsModalContent
                                    merchant={{
                                        id: selectedMerchant.id,
                                        name: selectedMerchant.name,
                                        logo: selectedMerchant.logo,
                                        status: selectedMerchant.status === 'Active' ? 'Active' : 'Inactive',
                                        revenue: selectedMerchant.revenue,
                                        subscribers: selectedMerchant.subscribers,
                                        growth: selectedMerchant.growth,
                                        sector: selectedMerchant.sector,
                                        email: selectedMerchant.email,
                                        phone: selectedMerchant.phone,
                                        address: selectedMerchant.address,
                                        gst: selectedMerchant.gst,
                                        bank: selectedMerchant.bank,
                                    }}
                                    onClose={() => setSelectedMerchant(null)}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Deactivation Modal */}
            <AnimatePresence>
                {deactivateId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="bg-white dark:bg-gray-900 p-6 pb-0 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Deactivate Merchant</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">This action will suspend access immediately.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Deactivation</label>
                                    <textarea
                                        value={deactivateReason}
                                        onChange={(e) => setDeactivateReason(e.target.value)}
                                        className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none text-sm"
                                        placeholder="Please detail the reason..."
                                    ></textarea>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button onClick={() => setDeactivateId(null)} className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                                    <button onClick={confirmDeactivate} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 shadow-sm transition-shadow">Deactivate</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActiveMerchantsTable;