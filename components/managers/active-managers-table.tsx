"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    Eye,
    Power,
    Ban,
    Search,
    Filter,
    Download,
    UserCheck,
    X,
    Plus,
} from 'lucide-react';
import ManagerDetailsModalContent from '@/components/managers/manager-details-modal-content';
import AddManagerForm from '@/components/managers/add-manager-form';
import { DateRangeFilter } from '@/components/ui/date-range-filter';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import {
    setSearchQuery,
    setStatusFilter,
    setSelectedManager,
    setDeactivateId,
    setDeactivateReason,
    setStartDate,
    setEndDate,
    updateManager,
    Manager,
} from '@/lib/store/slices/managersSlice';

const ActiveManagersTable: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const dispatch = useAppDispatch();
    const {
        managers,
        searchQuery,
        statusFilter,
        selectedManager,
        deactivateId,
        deactivateReason,
        startDate,
        endDate,
    } = useAppSelector((state) => state.managers);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredManagers = managers.filter(manager => {
        const matchesSearch = manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            manager.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || manager.status === statusFilter;

        const matchesDate = (!startDate || (manager.joinedDate && manager.joinedDate >= startDate)) &&
            (!endDate || (manager.joinedDate && manager.joinedDate <= endDate));

        return matchesSearch && matchesStatus && matchesDate;
    });

    const handleDeactivateClick = (id: number) => {
        dispatch(setDeactivateId(id));
        dispatch(setDeactivateReason(""));
    };

    const confirmDeactivate = () => {
        if (!deactivateReason) return alert("Please provide a reason.");
        if (deactivateId) {
            const manager = managers.find((m) => m.id === deactivateId);
            if (manager) {
                dispatch(updateManager({ ...manager, status: 'Inactive' }));
            }
        }
        dispatch(setDeactivateId(null));
    };

    const handleActivate = (id: number) => {
        if (window.confirm("Are you sure you want to activate this manager?")) {
            const manager = managers.find((m) => m.id === id);
            if (manager) {
                dispatch(updateManager({ ...manager, status: 'Active' }));
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="relative z-30 flex flex-col sm:flex-row justify-between items-stretch gap-4 bg-white dark:bg-gray-900/80 backdrop-blur-xl p-1 rounded-xl border border-transparent dark:border-gray-800">

                {/* Search Bar */}
                <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 flex-1 sm:max-w-md">
                    <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-text w-full group-focus-within:bg-gray-50 dark:group-focus-within:bg-gray-800/50">
                        <div className="flex flex-col justify-center w-full">
                            <div className="flex items-center gap-2">
                                <Search className="text-blue-500 shrink-0" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search managers, email, role..."
                                    value={searchQuery}
                                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                    className="bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch">
                

                    {/* Status Filter */}
                    <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[140px]">
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Filter Status</span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Filter size={14} className="text-purple-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 z-10" />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                                {['all', 'Active', 'Inactive'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => dispatch(setStatusFilter(status))}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === status ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        {status === 'all' ? 'All Managers' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Add Manager Button */}
                    <button 
                        onClick={() => setShowAddForm(true)}
                        className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300"
                    >
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent transition-colors w-full h-full">
                            <div className="flex flex-col justify-center w-full h-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
                                <div className="flex items-center gap-2">
                                    <Plus size={14} className="text-blue-500" />
                                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Add Manager</span>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Export Button */}
                    <button className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent transition-colors w-full h-full">
                            <div className="flex flex-col justify-center w-full h-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
                                <div className="flex items-center gap-2">
                                    <Download size={14} className="text-emerald-500" />
                                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Export CSV</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Manager Name</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-center text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredManagers.map((manager) => (
                                <tr
                                    key={manager.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="px-6 py-3 cursor-pointer" onClick={() => dispatch(setSelectedManager(manager))}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/30 text-[10px]">
                                                {manager.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-gray-100 text-xs hover:text-blue-600 transition-colors">{manager.name}</div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400">#{manager.id}</div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); dispatch(setSelectedManager(manager)); }}
                                                    className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline mt-1 font-medium"
                                                >
                                                    <Eye size={10} /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {manager.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400 font-medium">{manager.email}</td>
                                    <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400 font-medium">{manager.phone}</td>
                                    <td className="px-6 py-3 text-center">
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${manager.status === 'Active'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                            }`}>
                                            {manager.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2 min-w-[120px]">
                                            {manager.status === 'Active' ? (
                                                <button
                                                    onClick={() => handleDeactivateClick(manager.id)}
                                                    className="group flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-rose-100 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:border-rose-200 transition-all shadow-sm"
                                                >
                                                    <Ban size={12} className="group-hover:scale-110 transition-transform" />
                                                    <span>Deactivate</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleActivate(manager.id)}
                                                    className="group flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-200 transition-all shadow-sm"
                                                >
                                                    <Power size={12} className="group-hover:scale-110 transition-transform" />
                                                    <span>Activate</span>
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
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Showing <span className="font-bold text-gray-900 dark:text-white">1-{filteredManagers.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredManagers.length}</span></div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Manager Details Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedManager && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
                            onClick={() => dispatch(setSelectedManager(null))}
                        >
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="bg-slate-50 dark:bg-gray-950 w-full max-w-4xl h-full shadow-2xl overflow-y-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                <ManagerDetailsModalContent
                                    manager={selectedManager}
                                    onClose={() => dispatch(setSelectedManager(null))}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Add Manager Form Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowAddForm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col"
                                onClick={e => e.stopPropagation()}
                            >
                                <AddManagerForm onClose={() => setShowAddForm(false)} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Deactivation Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {deactivateId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl px-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 ring-1 ring-black/5"
                            >
                                <div className="bg-white dark:bg-gray-900 p-6 pb-0 flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 flex items-center justify-center text-red-600 dark:text-red-500 shadow-inner">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Deactivate Manager</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">This action will immediately suspend the manager's access to the platform. Are you sure you want to proceed?</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Reason for Deactivation</label>
                                        <textarea
                                            value={deactivateReason}
                                            onChange={(e) => dispatch(setDeactivateReason(e.target.value))}
                                            className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 dark:focus:border-red-500 outline-none resize-none text-sm shadow-sm transition-all placeholder:text-gray-400"
                                            placeholder="Please provide a detailed reason for this action..."
                                            autoFocus
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-3 justify-end pt-2">
                                        <button
                                            onClick={() => dispatch(setDeactivateId(null))}
                                            className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmDeactivate}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 dark:from-red-600 dark:to-red-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-200"
                                        >
                                            Deactivate Manager
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default ActiveManagersTable;
