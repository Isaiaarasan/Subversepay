"use client";

import React, { useState } from 'react';
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
    Wifi,
    Tv,
    Dumbbell,
    X,
    Building,
    CreditCard,
    FileText,
    UserCheck
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
        <div className="space-y-6 relative">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-white/50 dark:border-gray-800 shadow-sm dark:bg-gray-900/80">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search merchants, sectors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium transition-all"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Link href="/dashboard/approvals" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm">
                        <UserCheck size={18} />
                        <span>Approvals</span>
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm">
                            <Filter size={18} />
                            <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block z-20">
                            {['all', 'Active', 'Inactive'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${statusFilter === status ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {status === 'all' ? 'All Merchants' : status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4169E1] text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all font-medium">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 backdrop-blur-3xl rounded-2xl border border-white/60 dark:border-gray-800 shadow-xl overflow-hidden shadow-slate-200/50 dark:shadow-none dark:bg-gray-900/80">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Merchant Name</th>
                                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sector</th>
                                <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subscribers</th>
                                <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">TPV</th>
                                <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue (Comm.)</th>
                                <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Growth</th>
                                <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 relative">
                            <AnimatePresence>
                                {filteredMerchants.map((merchant, index) => (
                                    <motion.tr
                                        key={merchant.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors relative"
                                    >
                                        <td className="px-4 py-3 cursor-pointer" onClick={() => setSelectedMerchant(merchant)}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold shadow-inner text-xs">
                                                    {merchant.logo}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-blue-600 transition-colors">{merchant.name}</div>
                                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">#{merchant.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-800">
                                                {merchant.sector}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-slate-600 dark:text-slate-400 text-xs">{merchant.subscribers.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100 text-xs">{merchant.tpv}</td>
                                        <td className="px-4 py-3 text-right font-bold text-green-600 text-xs">{merchant.revenue}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className={`inline-flex items-center gap-1 font-bold text-xs ${merchant.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {merchant.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                {Math.abs(merchant.growth)}%
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${merchant.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                                                }`}>
                                                {merchant.status}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setSelectedMerchant(merchant)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye size={14} />
                                                </button>
                                                {merchant.status === 'Active' ? (
                                                    <button onClick={() => handleDeactivateClick(merchant.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                        <Ban size={14} />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleActivate(merchant.id)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                                        <Power size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-5 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-sm">
                    <div className="text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white font-bold">1-5</span> of <span className="text-slate-900 dark:text-white font-bold">45</span></div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl text-slate-600 dark:text-gray-300 font-medium hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl text-slate-600 dark:text-gray-300 font-medium hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Merchant Details Modal */}
            <AnimatePresence>
                {selectedMerchant && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedMerchant(null)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-slate-50 dark:bg-gray-950 w-full max-w-4xl h-full shadow-2xl overflow-y-auto"
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
            </AnimatePresence>

            {/* Deactivation Modal */}
            <AnimatePresence>
                {deactivateId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="bg-red-50 dark:bg-red-900/20 p-6 flex items-center gap-4 border-b border-red-100 dark:border-red-900/30">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-red-900 dark:text-red-200">Deactivate Merchant</h3>
                                    <p className="text-sm text-red-600 dark:text-red-300">This action will suspend access immediately.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Deactivation</label>
                                    <textarea
                                        value={deactivateReason}
                                        onChange={(e) => setDeactivateReason(e.target.value)}
                                        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                                        placeholder="Please detail the reason..."
                                    ></textarea>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button onClick={() => setDeactivateId(null)} className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                                    <button onClick={confirmDeactivate} className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/30 transition-shadow">Deactivate</button>
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
